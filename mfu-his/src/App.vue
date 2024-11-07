<template>
  <div id="app">
    <header>
      <div class="logo-container">
        <img src="@/assets/hospital_logo.png" alt="Hospital Logo" class="hospital-logo" />
      </div>
      <div class="title-container">
        <h1>MFU Hospital Information System</h1>
      </div>
    </header>
    <div class="home-container">
      <div class="main-content">
        <nav :class="['sidebar', { 'sidebar-closed': !sidebarOpen }]">
          <button class="toggle-button" @click="toggleSidebar">
            <i :class="sidebarOpen ? 'fas fa-angle-left' : 'fas fa-angle-right'"></i>
          </button>
          <h2 v-if="sidebarOpen && loggedIn">Welcome, Dr. {{ username }}!</h2>
          <h2 v-else-if="sidebarOpen">Welcome! Please Log In</h2>
          <button class="login-button" @click="toggleLogin" v-if="sidebarOpen">
            <i :class="loggedIn ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
            {{ loggedIn ? 'Logout' : 'Login' }}
          </button>
          <ul v-if="sidebarOpen">
            <li><router-link to="/appointment-managing"><i class="fas fa-calendar-alt"></i> Appointments</router-link></li>
            <li><router-link to="/patient-info"><i class="fas fa-user-injured"></i> Patients Info</router-link></li>
            <li><router-link to="/billing-collection"><i class="fas fa-money-bill-wave"></i> Hospital Fees</router-link></li>
            <li><router-link to="/add-schedule"><i class="fas fa-user-clock"></i> Add Doctor Schedule</router-link></li>
          </ul>
        </nav>
        <div class="content">
          <router-view :is-logged-in="loggedIn" :username="username" :specialization="specialization" :department="department"/>
        </div>
      </div>
    </div>
    <LoginPage v-if="showLoginPopup" @close="showLoginPopup = false" @login-success="handleLoginSuccess"/>
  </div>

</template>

<script>
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    LoginPage,
  },
  data() {
    return {
      showLoginPopup: false,
      loggedIn: false,
      username: '',
      specialization: '',
      department: '',
      sidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleLogin() {
      if (this.loggedIn) {
        this.handleLogout();
      } else {
        this.showLoginPopup = true;
      }
    },
    async handleLoginSuccess(username, specialization, department) {
      this.loggedIn = true;
      this.username = username;
      this.specialization = specialization;
      this.department = department;
      this.showLoginPopup = false;

      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:1337/api/users/${userId}?populate=departments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        const userData = await response.json();

        // Make sure specialization and department are properly stored
        this.specialization = specialization || userData.specialization;
        this.department = department || (userData.departments && userData.departments[0].department_name) || '';
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    handleLogout() {
      this.loggedIn = false;
      this.username = '';
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#app {
  font-family: 'Roboto', Arial, sans-serif;
  color: #34495e;
  background-color: #f5f8fa;
}

header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(135deg, #B5DEE0, #6EC5C1);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  border-radius: 8px;
}

.logo-container {
  margin-right: 10px;
}

.hospital-logo {
  height: 45px;
}

.title-container h1 {
  font-size: 22px;
  font-weight: bold;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
}

.sidebar-closed {
  width: 60px;
  padding: 10px;
}

.sidebar h2 {
  font-size: 18px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 25px;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.sidebar-closed h2 {
  opacity: 0;
}

.sidebar ul {
  list-style: none;
  width: 100%;
  padding: 0;
}

.sidebar li {
  width: 100%;
  margin: 10px 0;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  color: #34495e;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.sidebar a:hover {
  background-color: #e1f5fe;
  color: #1fa2ff;
}

.toggle-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #6EC5C1;
  cursor: pointer;
  margin-bottom: 20px;
}

.sidebar-closed .login-button,
.sidebar-closed ul {
  display: none;
}

.login-button {
  background-color: #6EC5C1;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #55a8e0;
}

/* Content Area */
.content {
  flex: 1;
  padding: 30px;
  background-color: #f5f8fa;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.home-container {
  display: flex;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  margin: 20px;
}
</style>




