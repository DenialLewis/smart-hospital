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

        <div class="input-group">
          <label for="password">{{ translations[currentLang].password }}</label>
          <input type="password" id="password" v-model="password" required>
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
      errorMessage: '',
      translations: {
        EN: {
          welcomeMessage: "Welcome to Our Hospital",
          accessInfo: "Access your patient history, lab results, future appointments, and more.",
          continueWithEmail: "Continue with email address",
          continueWithPhone: "Continue with phone number",
          continueWithGoogle: "Continue with Google",
          continueWithApple: "Continue with Apple",
          continueWithFacebook: "Continue with Facebook",
          //continueWithX: "Continue with X",
          or: "or",
          email: "Email",
          password: "Password",
          createAccount: "Log In",
          invalidCredentials: "Invalid email or password."
        },
        ไทย: {
          welcomeMessage: "ยินดีต้อนรับสู่โรงพยาบาลของเรา",
          accessInfo: "เข้าถึงประวัติผู้ป่วย ผลการตรวจ ห้องนัดหมายล่วงหน้า และอื่น ๆ",
          continueWithEmail: "ดำเนินการต่อด้วยที่อยู่อีเมล",
          continueWithPhone: "ดำเนินการต่อด้วยหมายเลขโทรศัพท์",
          continueWithGoogle: "ดำเนินการต่อด้วย Google",
          continueWithApple: "ดำเนินการต่อด้วย Apple",
          continueWithFacebook: "ดำเนินการต่อด้วย Facebook",
          continueWithX: "ดำเนินการต่อด้วย X",
          or: "หรือ",
          email: "อีเมล",
          password: "รหัสผ่าน",
          confirmPassword: "ยืนยันรหัสผ่าน",
          createAccount: "สร้างบัญชี",
          invalidCredentials: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"

        },
        မြန်မာ: {
          welcomeMessage: "ကျွန်ုပ်တို့၏ ဆေးရုံမှ ကြိုဆိုပါသည်",
          accessInfo: "သင့်ရဲ့ လူနာမှတ်တမ်း၊ စမ်းသပ်မှုရလဒ်များ၊ လာမယ့် ချိန်းဆိုမှုများ အစရှိသည့်အချက်အလက်များကို ရယူနိုင်ပါသည်။",
          continueWithEmail: "အီးမေးလ်လိပ်စာဖြင့်ဆက်လက်လုပ်ဆောင်ပါ",
          continueWithPhone: "ဖုန်းနံပါတ်ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ",
          continueWithGoogle: "Google ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ",
          continueWithApple: "Apple ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ",
          continueWithFacebook: "Facebook ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ",
          continueWithX: "X ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ",
          or: "သို့မဟုတ်",
          email: "အီးမေးလ်",
          password: "စကားဝှက်",
          confirmPassword: "စကားဝှက်အတည်ပြုပါ",
          createAccount: "အကောင့်ဖွင့်ပါ",
          invalidCredentials: "အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ပါ"
        }
      }
    };
  },
  computed: {
    currentTranslation() {
      // Fallback to 'EN' if the currentLang translation is not found
      return this.translations[this.currentLang] || this.translations.EN;
    }
  },
  methods: {
    goBack() {
      this.$emit('close'); // Close the pop-up when clicked
    },
    
    async submitForm() {
      this.errorMessage = ''; 
      try {
        // Make an API request to Strapi to authenticate the user
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: this.email,
          password: this.password
        });

        console.log(response.data);

        localStorage.setItem('jwtToken', response.data.jwt);
        localStorage.setItem('userId', response.data.user.id);


        // If successful, you can handle the response here
        alert('Login successful!');
        // You can redirect the user or perform further actions
        this.$emit('close'); // Close the login form
      } catch (error) {
        // Handle error response from Strapi
        if (error.response && error.response.status === 401) {
          this.errorMessage = this.translations[this.currentLang].invalidCredentials;
        } else {
          this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
        }
      }
    },



    loginWithEmail() {
      console.log("Logging in with email...");
    },
    loginWithPhone() {
      console.log("Logging in with phone...");
    },
    loginWithGoogle() {
      console.log("Logging in with Google...");
    },
    loginWithApple() {
      console.log("Logging in with Apple...");
    },
    loginWithFacebook() {
      console.log("Logging in with Facebook...");
    },
    loginWithX() {
      console.log("Logging in with X...");
    }
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


  .primary-login-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .divider {
    text-align: center;
    margin: 20px 0;
  }

  .social-login {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .social-btn {
    background: none;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .social-btn i {
    margin-right: 10px;
  }

  .google-btn {
    color: #4285F4;
  }

  .apple-btn {
    color: #000;
  }

  .facebook-btn {
    color: #1877F2;
  }

  .x-btn {
    color: #1DA1F2;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    font-size: 14px;
    font-family:Arial, Helvetica, sans-serif;
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

</style>
