<template>
    <div class="login-container">
      <div class="form-column">
        <h1>Login Page</h1>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div class="image-column">
       <img />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // Handle the login logic here
        console.log("Logging in with:", this.email, this.password);
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    height: 100vh;
  }
  
  .form-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: #f5f5f5; /* Light background for the form column */
  }
  
  .image-column {
    flex: 1;
    background-image: url('/Users/minthutanaing/PlatformFinalPJ/smart-hospital/mfu-his/src/assets/105A6491-min.JPG');
    background-size: cover;
    background-position: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50; /* Green background for button */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049; /* Darker green on hover */
  }
  </style>
  