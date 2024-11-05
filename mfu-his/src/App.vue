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
        <nav class="sidebar">
          <h1 v-if="loggedIn">Hello! Doctor {{ username }}</h1>
          <h1 v-else>Hello Doctor! Please Login First</h1>
          <button class="login-button" @click="toggleLogin">
            {{ loggedIn ? 'Logout' : 'Login' }}
          </button>
          <ul>
            <li><router-link to="/appointment-managing">Appointments</router-link></li>
            <li><router-link to="/patient-info">Patients Info</router-link></li>
            <li><router-link to="/billing-collection">Hospital Fees</router-link></li>
          </ul>
        </nav>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>

    <LoginPage v-if="showLoginPopup" @close="showLoginPopup = false" @login-success="handleLoginSuccess" />
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
      username: '', // Store the username here
    };
  },
  methods: {
    toggleLogin() {
      if (this.loggedIn) {
        this.handleLogout();
      } else {
        this.showLoginPopup = true;
      }
    },
    handleLoginSuccess(username) {
      this.loggedIn = true;
      this.username = username; // Set the username when login is successful
      this.showLoginPopup = false;
    },
    handleLogout() {
      this.loggedIn = false;
      this.username = ''; // Clear the username on logout
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
    },
  },
};
</script>

<style>
/* Basic App Styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.login-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
}

.login-button:hover {
  background-color: #45a049;
}

/* Header styles */
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #4DAAB3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo-container {
  margin-right: 20px;
}

.hospital-logo {
  height: 60px;
  width: auto;
}

.title-container h1 {
  font-size: 24px;
  color: white;
  font-weight: 600;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #bebebe;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar a:hover {
  color: #4CAF50;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
