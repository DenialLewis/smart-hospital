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
      <h1>{{ translations[currentLang].createAccountTitle }}</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="name">{{ translations[currentLang].name }}</label>
          <input type="text" id="name" v-model="name" required>
        </div>

        <div class="input-group">
          <label for="email">{{ translations[currentLang].email }}</label>
          <input type="email" id="email" v-model="email" required>
        </div>

        <div class="input-group">
          <label for="password">{{ translations[currentLang].password }}</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <div class="input-group">
          <label for="confirm-password">{{ translations[currentLang].confirmPassword }}</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>

        <button type="submit" class="primary-btn">{{ translations[currentLang].createAccount }}</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  props: ['currentLang'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      translations: {
        EN: {
          createAccountTitle: "Create Account",
          name: "Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          createAccount: "Create Account"
        },
        ไทย: {
          createAccountTitle: "สร้างบัญชี",
          name: "ชื่อ",
          email: "อีเมล",
          password: "รหัสผ่าน",
          confirmPassword: "ยืนยันรหัสผ่าน",
          createAccount: "สร้างบัญชี"
        },
        မြန်မာ: {
          createAccountTitle: "အကောင့်ဖွင့်ပါ",
          name: "နာမည်",
          email: "အီးမေးလ်",
          password: "စကားဝှက်",
          confirmPassword: "စကားဝှက်အတည်ပြုပါ",
          createAccount: "အကောင့်ဖွင့်ပါ"
        }
      }
    };
  },
  methods: {
    goBack() {
      this.$emit('close');
    },
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert(this.translations[this.currentLang].passwordMismatch);
        return;
      }
      alert('Account created successfully!');
      this.$emit('close');
    }
  }
};
</script>


<style scoped>

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
    background: url('@/assets/medcenter.jpeg') center center / cover no-repeat; /* Set background image */
    display: flex;
    align-items: center; /* Center align image vertically */
    justify-content: center; /* Center align image horizontally */
  }

  .full-image {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
  }

  .form-section {
    flex: 1; /* Make form section take up equal space */
    padding: 20px; /* Add some padding for better spacing */
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

  .primary-btn {
    width: 90%;
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    /* margin-top: 20px; */
    margin: 20px auto 0; /* Center the button horizontally */
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
    background-color: #a0a0a0;
    color: #000000;
  }
</style>
