<template>
  <div class="login-popup">
    <div class="login-box">
      <span class="close-button" @click="$emit('close')">&times;</span>
      <div class="login-header">
        <img src="@/assets/hospital_logo.png" alt="MFU Hospital Logo" class="logo" />
        <h2>MFU Hospital Information System</h2>
        <p>Hello Doctor! Please Login First</p>
      </div>
      <div class="form-section">
        <form @submit.prevent="submitForm">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group password-group">
            <label for="password">Password</label>
            <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" required />
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
              <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
                <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
                <path d="M12 15l2.5-2.5L12 10m0 0l-2.5 2.5L12 10zm0 5c-2.5 0-5-3-5-3m10 0c0 0-2.5 3-5 3"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
                <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
                <path d="M1 1l22 22m-5-11c0 2.5-2.5 5-5 5-2.5 0-5-2.5-5-5"></path>
              </svg>
            </button>
          </div>
          <button type="submit" class="login-submit">Login</button>
        </form>
      </div>
      <div class="additional-links">
        <a href="#">Forgot Password?</a> | <a href="#">Create Account</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      passwordVisible: false,
      errorMessage: '',
    };
  },
  methods: {
  async submitForm() {
    this.errorMessage = ''; 
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: this.email,
        password: this.password
      });
      console.log(response.data);
      localStorage.setItem('jwtToken', response.data.jwt);
      localStorage.setItem('userId', response.data.user.id);
      this.$emit('login-success', response.data.user.username); // Emit the username
      alert('Login successful!');
      this.$emit('close');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.errorMessage = this.translations[this.currentLang].invalidCredentials;
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
  },
}
};
</script>

<style scoped>
/* Full-screen overlay */
.login-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url("@/assets/background.png") no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Login box styling */
.login-box {
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

.login-header {
  margin-bottom: 20px;
}

.logo {
  width: 120px;
  height: 60px;
  margin-bottom: 10px;
}

h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

p {
  color: #777;
  font-size: 14px;
}

/* Input fields */
.input-group {
  position: relative;
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Submit button */
.login-submit {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.login-submit:hover {
  background-color: #45a049;
}

/* Additional links */
.additional-links {
  margin-top: 15px;
  font-size: 14px;
}

.additional-links a {
  color: #4CAF50;
  text-decoration: none;
}

.additional-links a:hover {
  text-decoration: underline;
}
.password-group {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 10px;
    top: 35%;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }

  .eye-icon {
    margin-top: 40px;
    width: 20px;
    height: 20px;
    color: black;
  }

  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
