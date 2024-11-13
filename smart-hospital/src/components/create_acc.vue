<template>
  <div class="create-account-container">
    <!-- Close Icon -->
    <button aria-label="Close account form" class="close-btn" @click="goBack">
      <span class="close-icon">✖</span>
    </button>

    <!-- Image Section -->
    <div class="image-section">
      <img class="full-image" />
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <h1 v-if="translations[currentLang]">{{ translations[currentLang].createAccountTitle }}</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="name">{{ translations[currentLang]?.name }}</label>
          <input type="text" id="name" v-model="name" required>
        </div>

        <div class="input-group">
          <label for="email">{{ translations[currentLang]?.email }}</label>
          <input type="email" id="email" v-model="email" required>
        </div>

        <div class="input-group password-group">
          <label for="password">{{ translations[currentLang]?.password }}</label>
          <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" required>
          <button type="button" class="toggle-password" @click="togglePasswordVisibility('password')">
            <!-- Visible password icon -->
            <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
              <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
              <path d="M12 15l2.5-2.5L12 10m0 0l-2.5 2.5L12 10zm0 5c-2.5 0-5-3-5-3m10 0c0 0-2.5 3-5 3"></path>
            </svg>
            <!-- Hidden password icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
              <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
              <path d="M1 1l22 22m-5-11c0 2.5-2.5 5-5 5-2.5 0-5-2.5-5-5"></path>
            </svg>
          </button>
        </div>

        <div class="input-group password-group">
          <label for="confirm-password">{{ translations[currentLang]?.confirmPassword }}</label>
          <input :type="confirmPasswordVisible ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword" required>
          <button type="button" class="toggle-password" @click="togglePasswordVisibility('confirmPassword')">
            <svg v-if="confirmPasswordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
              <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
              <path d="M12 15l2.5-2.5L12 10m0 0l-2.5 2.5L12 10zm0 5c-2.5 0-5-3-5-3m10 0c0 0-2.5 3-5 3"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
              <path d="M1 12c0 0 5-9 11-9s11 9 11 9-5 9-11 9-11-9-11-9z"></path>
              <path d="M1 1l22 22m-5-11c0 2.5-2.5 5-5 5-2.5 0-5-2.5-5-5"></path>
            </svg>
          </button>
        </div>

        <button type="submit" class="primary-btn">{{ translations[currentLang]?.createAccount }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    currentLang: {
      type: String,
      default: 'EN' // Default language if none is provided
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
      translations: {
        EN: {
          createAccountTitle: "Create Account",
          name: "Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          createAccount: "Create Account",
          passwordMismatch: "Passwords do not match"
        },
        ไทย: {
          createAccountTitle: "สร้างบัญชี",
          name: "ชื่อ",
          email: "อีเมล",
          password: "รหัสผ่าน",
          confirmPassword: "ยืนยันรหัสผ่าน",
          createAccount: "สร้างบัญชี",
          passwordMismatch: "รหัสผ่าน"
        },
        မြန်မာ: {
          createAccountTitle: "အကောင့်ဖွင့်ပါ",
          name: "နာမည်",
          email: "အီးမေးလ်",
          password: "စကားဝှက်",
          confirmPassword: "စကားဝှက်အတည်ပြုပါ",
          createAccount: "အကောင့်ဖွင့်ပါ",
          passwordMismatch: "စကားဝှက်များမတူညီပါ"
        }
      }
    };
  },
  methods: {
    goBack() {
      this.$emit('close');
    },
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert(this.translations[this.currentLang].passwordMismatch);
        return;
      }
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
          username: this.name,
          email: this.email,
          password: this.password,
        });
        alert('Account created successfully!');
        this.$emit('account-created');
        this.$emit('close');
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      } catch (error) {
        console.error('Error creating account:', error.response.data);
        alert('Failed to create account. Please try again.');
      }
    },
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.passwordVisible = !this.passwordVisible;
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    }
  }
};
</script>

<style scoped>
 .primary-btn {
    width:200px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px auto 0;
    display: block;
    transition: background-color 0.3s ease;
  }

.primary-btn:hover {
    background-color: #0056b3;
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
    background-color: #B5DEE0;
    color: #000000;
  }
.create-account-container {
  display: flex;
  width: 80%;
  max-width: 900px;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.image-section {
  flex: 1;
  background: url('@/assets/medcenter.jpeg') center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-image {
  width: 100%;
  height: auto;
}

.form-section {
  flex: 1;
  padding: 20px;
}

.form-section h1 {
  font-family: Arial, Helvetica, sans-serif;
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
  font-size: 14px;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

.eye-icon {
    margin-top: 20px;
    margin-right: 10px;
    width: 25px;
    height: 20px;
    color: black;
  }
</style>
