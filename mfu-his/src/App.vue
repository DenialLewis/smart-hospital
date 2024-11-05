<template>
  <div id="app">
    <header>
      <div class="logo-container">
        <!-- Display the hospital logo -->
        <img src="@/assets/hospital_logo.png" alt="Hospital Logo" class="hospital-logo" />
      </div>
      <div class="title-container">
        <!-- Display the hospital information system text -->
        <h1>MFU Hospital Information System</h1>
      </div>
    </header>
    <WelcomePage />
  </div>
</template>

<script>
import WelcomePage from './components/WelcomePage.vue';

export default {
  name: 'App',
  components: {
    WelcomePage,
  },
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

/* Header styles */
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #4DAAB3; /* Updated color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
</style>
