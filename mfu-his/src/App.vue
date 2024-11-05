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
          <h1>I'm a Doctor Here</h1>
          <button class="login-button" @click="handleLogin">Login</button>
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

  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    handleLogin() {
      // Add your login logic here
      console.log('Login button clicked');
      // For example, redirect to the login page
      this.$router.push('/login'); // Adjust this based on your routing structure
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.login-button {
  background-color: #4CAF50; /* Green background */
  color: white; /* White text color */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px; /* Padding */
  cursor: pointer; /* Pointer cursor on hover */
  margin-bottom: 20px; /* Space below the button */
  width: 100%; /* Full width */
}

.login-button:hover {
  background-color: #45a049; /* Darker green on hover */
}


/* Header styles */
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #4DAAB3; /* Updated color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.home-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height */
  }
/* Logo styling */
.logo-container {
  margin-right: 20px;
}

.hospital-logo {
  height: 60px;
  width: auto;
}

/* Title styling */
.title-container h1 {
  font-size: 24px;
  color: white;
  margin: 0;
  font-weight: 600;
}
.main-content {
    display: flex;
    flex: 1; /* Take the remaining height */
  }

.sidebar {
    width: 200px; /* Fixed width for the sidebar */
    background-color: #bebebe; /* Sidebar background color */
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional shadow */
  }
  
  .sidebar ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove padding */
  }
  
  .sidebar li {
    margin: 15px 0; /* Space between links */
  }
  
  .sidebar a {
    text-decoration: none; /* Remove underline */
    color: #333; /* Link color */
  }
  
  .sidebar a:hover {
    color: #4CAF50; /* Change color on hover */
  }

  .content {
    flex: 1; /* Take the remaining width */
    padding: 20px; /* Content padding */
  }
</style>
