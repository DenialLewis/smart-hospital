<template>
  <div class="login-container">

    <!-- Close Icon -->
    <button aria-label="Close account form" class="close-btn" @click="goBack">
      <span class="close-icon">✖</span>
    </button>

    <!-- Image Section -->
    <div class="image-section">
      <img :src="require('@/assets/Hpic.png')" alt="Welcome Image" class="welcome-image" />
    </div>

    <!-- Login Form Section -->
    <div class="form-section">
      <h1>{{ translations[currentLang].welcomeMessage }}</h1>
      <p>{{ translations[currentLang].accessInfo }}</p>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="email">{{ translations[currentLang].email }}</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group password-group">
          <label for="password">{{ translations[currentLang].password }}</label>
          <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" required>
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
        <button type="submit" class="primary-btn">{{ translations[currentLang].createAccount }}</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'LogIn',
  props: {
    currentLang: {
      type: String,
      required: true,
      default: 'EN' // Provide a default language in case it's not passed properly
    }
  },
  data() {
    return {
      email: '',
      password: '',
      passwordVisible: false, // New data property for password visibility
      errorMessage: '',
      translations: {
        EN: {
          welcomeMessage: "Welcome to Our Hospital",
          accessInfo: "Access your patient history, lab results, future appointments, and more.",
          email: "Email",
          password: "Password",
          createAccount: "Log In",
          invalidCredentials: "Invalid email or password."
        },
        ไทย: {
          welcomeMessage: "ยินดีต้อนรับสู่โรงพยาบาลของเรา",
          accessInfo: "เข้าถึงประวัติผู้ป่วย ผลการตรวจ ห้องนัดหมายล่วงหน้า และอื่น ๆ",
          email: "อีเมล",
          password: "รหัสผ่าน",
          createAccount: "สร้างบัญชี",
          invalidCredentials: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        },
        မြန်မာ: {
          welcomeMessage: "ကျွန်ုပ်တို့၏ ဆေးရုံမှ ကြိုဆိုပါသည်",
          accessInfo: "သင့်ရဲ့ လူနာမှတ်တမ်း၊ စမ်းသပ်မှုရလဒ်များ၊ လာမယ့် ချိန်းဆိုမှုများ အစရှိသည့်အချက်အလက်များကို ရယူနိုင်ပါသည်။",
          email: "အီးမေးလ်",
          password: "စကားဝှက်",
          createAccount: "အကောင့်ဖွင့်ပါ",
          invalidCredentials: "အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ပါ"
        }
      }
    };
  },
  methods: {
    goBack() {
      this.$emit('close'); // Close the pop-up when clicked
    },

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; // Toggle the password visibility
    },
    
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
        this.$emit('login-success'); // Emit the event here
        alert('Login successful!');
        this.$emit('close');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = this.translations[this.currentLang].invalidCredentials;
        } else {
          this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
        }
      }
    },
  }
};
</script>

<style scoped>
  .login-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5); /* Adjust shadow for better contrast */
    width: 400px; /* Set width as needed */
  }

  body {
    overflow: hidden; /* Prevent the background from scrolling when the modal is open */
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 18px;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .close-btn:hover {
    background-color: #a0a0a0;
    color: #000000;
  }

  .image-section {
    text-align: center;
  }

  .welcome-image {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  }

  .form-section {
    margin-top: 20px;
  }

  .form-section h1 {
    font-family: Arial, Helvetica, sans-serif; 
  }

  .form-section p {
    font-family: Arial, Helvetica, sans-serif; 
  }

  .primary-btn {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px auto 0; /* Center the button horizontally */
    display: block;
    transition: background-color 0.3s ease;
  }

  .primary-btn:hover {
    background-color: #0056b3;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 5px;
    color: #666;
  }

  .input-group input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    display: block; /* Make input a block element */
    margin: 0 auto; /* Center input horizontally */
  }

  .input-group input:focus {
    border-color: #007BFF;
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
    margin-top: 7px;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    color: black; /* Color for the eye icon */
  }

  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
