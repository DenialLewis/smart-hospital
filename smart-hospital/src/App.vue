<template>
  <div id="app">
    <header class="header">
      <div class="logo">
        <img alt="Mfu Logo" src="./assets/Hospital.png" @click="goToHomePage" style="cursor: pointer;"/>
      </div>
      <!-- <div class="search-lang">
        <input type="text" class="search-bar" :placeholder="translations[currentLang].searchPlaceholder" />
        <div>
          <ChatBubble @open-chat="isChatOpen = true" />
        </div>
      </div> -->
      <div class="lang-switch">
        <div class="lang-dropdown" @click="toggleLanguageDropdown">
          <span>{{ currentLang }}</span>
          <img
            :src="showLanguageDropdown ? require('@/assets/up_arr.png') : require('@/assets/down_arr.png')"
            alt="Dropdown Arrow Icon"
            class="down-arrow"
          />
        </div>
        <!-- Language Dropdown Menu -->
        <div v-if="showLanguageDropdown" class="dropdown-menu">
          <button v-if="currentLang !== 'EN'" @click="setLanguage('EN')" class="dropdown-item">
            <img src="./assets/uk.png" alt="English Icon" class="dropdown-icon" /> EN
          </button>
          <button v-if="currentLang !== 'ไทย'" @click="setLanguage('ไทย')" class="dropdown-item">
            <img src="./assets/th.png" alt="Thai Icon" class="dropdown-icon" /> ไทย
          </button>
          <button v-if="currentLang !== 'မြန်မာ'" @click="setLanguage('မြန်မာ')" class="dropdown-item">
            <img src="./assets/mm.png" alt="Myanmar Icon" class="dropdown-icon" /> မြန်မာ
          </button>
        </div>
        <!-- Profile Dropdown -->
        <div class="profile-container" @click="toggleProfileDropdown">
          <img src="./assets/profile.png" alt="Profile Icon" />
          <img
            :src="showProfileDropdown ? require('@/assets/up_arr.png') : require('@/assets/down_arr.png')"
            alt="Dropdown Arrow Icon"
            class="down-arrow"
          />
        </div>
        <div v-if="showProfileDropdown" class="dropdown-menu">
          <button class="dropdown-item" @click="openLoginForm">
            <img src="./assets/profile.png" alt="Login Logo" class="dropdown-icon" />
            {{ translations[currentLang].login }}
          </button>
          <button class="dropdown-item" @click="openCreateAccountForm">
            <img src="./assets/create-acc.png" alt="Create Account Icon" class="dropdown-icon" />
            {{ translations[currentLang].createAccount }}
          </button>
        </div>
      </div>
    </header>
    <nav class="nav-tabs">
      <button class="tab" :class="{ 'active': showDoctorDropdown }" @click="toggleDoctorDropdown">
        {{ translations[currentLang].doctorSchedule }}
      </button>
      <button class="tab">{{ translations[currentLang].appointments }}</button>
      <button class="tab">{{ translations[currentLang].services }}</button>
      <!-- Doctor Dropdown -->
      <div v-if="showDoctorDropdown" class="doctor-dropdown">
        <router-link to="/thai-medicine">
          <button class="dropdown-item" @click="selectDoctorDepartment(translations[currentLang].departments.thaiMedicine)">
            {{ translations[currentLang].departments.thaiMedicine }}
          </button>
        </router-link>
        <button class="dropdown-item" @click="selectDoctorDepartment(translations[currentLang].departments.chineseMedicine)">
          {{ translations[currentLang].departments.chineseMedicine }}
        </button>
        <button class="dropdown-item" @click="selectDoctorDepartment(translations[currentLang].departments.physicalTherapy)">
          {{ translations[currentLang].departments.physicalTherapy }}
        </button>
        <button class="dropdown-item" @click="selectDoctorDepartment(translations[currentLang].departments.outpatientClinic)">
          {{ translations[currentLang].departments.outpatientClinic }}
        </button>
      </div>
    </nav>
    
    <!-- Main Dashboard -->
    <div v-if="$route.name !== 'thaiMedicine'" class="hospital-dashboard">

      <!-- 1. Header Section -->
      <!-- 2. Navigation Section -->
      

      <!-- 3. Content Section -->
      <section class="content-section">
        <h1>Ads</h1>
        <div v-if="ads.length">
          <div v-for="ad in ads" :key="ad.id" class="ad-card">
            <h2>{{ ad.Ad }}</h2>
            <img 
              v-if="ad.Ads && ad.Ads.length > 0" 
              :src="`http://localhost:1337${ad.Ads[0].url}`" 
              alt="Ad Image" 
              class="ad-image"
              @error="handleImageError(ad)" 
            />
            <p v-else>No image available for this ad.</p>
          </div>
        </div>
        <div v-else>
          No ads available
        </div>
      </section>

      <!-- 4. Footer Section -->
      <footer class="footer">
        <div class="contact-info">
          <p><strong>{{ translations[currentLang].contactUs }}</strong></p>
          <p>{{ translations[currentLang].hospitalName }}</p>
          <p>{{ translations[currentLang].address }}</p>
          <p>{{ translations[currentLang].telephone }}</p>
          <p>{{ translations[currentLang].email }}</p>
        </div>
        <div class="footer-bottom">
          <div class="social-media">
            <img src="./assets/facebook.png" alt="Facebook" class="social-icon" />
            <img src="./assets/tiktok.png" alt="TikTok" class="social-icon" />
            <img src="./assets/qr.png" alt="QR Code" class="qr-icon" />
          </div>
          <div class="mh-logo">
            <img src="./assets/MH_logo.png" alt="MH Logo" />
          </div>
        </div>
      </footer>

      <!-- 5. ChatWindow -->
      <ChatWindow v-if="isChatOpen" @close-chat="isChatOpen = false" :isOpen="isChatOpen" />
    </div>


    <router-view></router-view>
    <!-- Login form as pop-up modal -->
    <LogIn v-if="showLoginForm" @close="showLoginForm = false" :currentLang="currentLang" />
    <CreateAcc v-if="showCreateAccountForm" @close="showCreateAccountForm = false" :currentLang="currentLang" />
  </div>
</template>



<!-- JS -->
<script>
import axios from 'axios';
import LogIn from './components/log_in.vue';
import CreateAcc from './components/create_acc.vue';

export default {
  data() {
    return {
      showLanguageDropdown: false,
      showProfileDropdown: false,
      showDoctorDropdown: false,
      showLoginForm: false,
      showCreateAccountForm: false,
      currentLang: 'EN',
      ads: [],
      translations: {
        EN: {
          searchPlaceholder: 'Search...',
          login: 'Login',
          createAccount: 'Create Account',
          doctorSchedule: 'Doctor Schedule',
          appointments: 'Appointments',
          services: 'Services',
          contactUs: 'Contact Us',
          hospitalName: 'Mfu Hospital',
          address: '123 Hospital Rd, City, Country',
          telephone: '+123 456 7890',
          email: 'info@mfu-hospital.com',
          departments: {
            thaiMedicine: "Department of Thai Traditional Medicine",
            chineseMedicine: "Department of Chinese Medicine",
            physicalTherapy: "Physical Therapy Department",
            outpatientClinic: "Outpatient Clinic"
          },
        },
        ไทย: { /* Thai translations */ },
        မြန်မာ: { /* Myanmar translations */ }
      }
    };
  },
  mounted() {
    this.fetchAds();
  },

  components: {
    LogIn,
    CreateAcc
  },
  methods: {
    toggleLanguageDropdown() { this.showLanguageDropdown = !this.showLanguageDropdown; },
    toggleProfileDropdown() { this.showProfileDropdown = !this.showProfileDropdown; },
    toggleDoctorDropdown() { this.showDoctorDropdown = !this.showDoctorDropdown; },
    setLanguage(lang) { this.currentLang = lang; this.showLanguageDropdown = false; },
    openLoginForm() { this.showLoginForm = true; },
    openCreateAccountForm() { this.showCreateAccountForm = true; },
    selectDoctorDepartment(department) { console.log(`Selected department: ${department}`); },
    goToHomePage() {
      this.$router.push({ name: 'App' }); // Ensure that 'home' route is defined in your router.
    },
    async fetchAds() {
      try {
        const response = await axios.get('http://localhost:1337/api/ads');
        console.log(response.data); // Log the entire response to check the structure
        this.ads = response.data.data; // Adjust this according to your actual response
        this.logAdImageUrls();
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    },

    logAdImageUrls() {
      if (this.ads.length) {
        this.ads.forEach(ad => {
          // Log to see the structure of each ad
          console.log(ad);
          if (ad.Ads && ad.Ads.length > 0) {
            console.log(`Ad Image URL: http://localhost:1337${ad.Ads[0].url}`);
          }
        });
      } else {
        console.log('No ads available.');
      }
    },

    handleImageError(ad) {
      console.log(`Error loading image for ad: ${ad.Ad}`);
      // You could also set a default image or perform any other error handling
    }
  }
};
</script>







<!-- CSS -->
<style scoped>
.hospital-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the body takes at least the full viewport height */
  justify-content: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
  margin-left: 0;
  height: 70px;
}

.search-lang {
  display: flex;
  align-items: center;
}

.search-bar {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 25px;
  width: 250px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.lang-switch {
  margin-left: 15px;
  display: flex;
  align-items: center;
  position: relative;
}

.lang-dropdown, .profile-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.lang-switch span {
  font-weight: bold;
  margin-left: 8px;
  color: #003d73; 
}

.lang-switch img, .profile-container img {
  height: 24px;
  width: 24px;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-top: 3px solid #EBD5A0; /* Highlighted border color */
  z-index: 1000;
  padding: 0; /* Ensure no extra padding around the menu */
}

.dropdown-item {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  text-align: left;
  color: #333;
  display: flex;
  align-items: center;
  width: 100%; /* Ensures the button takes full width */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #B5DEE0; /* Hover background color */
  color: #ffffff; /* Hover text color */
}

/* For icon color in dropdown buttons */
.dropdown-icon {
  height: 20px;
  width: 20px;
  margin-right: 10px; /* Space between icon and text */
  transition: filter 0.3s ease; /* Smooth transition for icon */
}

.dropdown-item:hover .dropdown-icon {
  filter: brightness(0) invert(1); /* Changes the icon color to white on hover */
}



/* Navigation Tabs */
.nav-tabs {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff; /* Background color */
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative; /* Ensures dropdown is positioned correctly */
}

.tab {
  background: none;
  border: none;
  color: #003d73;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.tab.active {
  color: #003d73;
  border-top: 3px solid #EBD5A0; /* Highlighted top border */
}

.tab:hover {
  color: #B5DEE0; /* Changed to #B5DEE0 */
}


/* Doctor Dropdown */
.doctor-dropdown {
  position: absolute;
  top: 60px; /* Adjusted to appear below the nav bar */
  left: 0;
  background-color: #ffffff; /* Background color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-top: 3px solid #EBD5A0; /* Highlighted border color */
  z-index: 1000;
}

.dropdown-item:hover {
  background-color: #B5DEE0; /* Hover background color */
  color: #ffffff; /* Hover text color */
}

.dropdown-item:last-of-type {
  border-bottom: none;
}
/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
  flex: 1; /* Allows content grid to take up remaining space */
}

.content-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s;
}

.content-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


.social-media {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.social-icon {
  height: 24px;
  width: 24px;
}

.qr-icon {
  height: 100px;
  width: 100px; 
}
.down-arrow {
  transition: transform 0.3s ease; /* Smooth transition for arrow rotation */
}
/* Footer */
.footer {
  background-color: #B5DEE0;
  color: #003d73;
  padding: 20px;
  display: flex;
  justify-content: space-between; /* Space between contact info and images */
  align-items: center;
  flex-wrap: wrap;
  
}

.contact-info {
  text-align: left;
  max-width: 600px; /* Adjust as needed */
  margin-right: 20px; /* Space between contact info and images */
}

.footer-bottom {
  display: flex;
  align-items: center;
  gap: 20px;
}

.mh-logo img {
  height: 80px;
  width: auto;
}
.ad-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 10px;
}

.ad-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}



</style>
