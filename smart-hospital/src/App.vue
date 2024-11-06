<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="logo" @click="goToHomePage" style="cursor: pointer;">
        <img alt="Mfu Logo" src="./assets/Hospital.png" />
      </div>
      <div class="lang-switch">
       <!-- Search Bar -->
       <div class="search-bar">
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search..."
    @focus="showDropdown = true"
    @input="filterOptions"
    @keydown.enter="executeSearch"
  />
  <button class="search-icon-btn" @click="executeSearch">
    <img src="./assets/search.png" alt="Search" class="search-icon" />
  </button>
  <ul v-if="showDropdown && filteredOptions.length" class="dropdown-list">
    <li
      v-for="option in filteredOptions"
      :key="option.value"
      @mousedown="selectOption(option)"
      class="dropdown-item"
    >
      {{ option.label }}
    </li>
  </ul>
</div>
        <!-- Chat Button -->
        <div class="chat-boutton">
          <button class="chat-button" @click="toggleChat">
            <img src="./assets/chatbox.png" alt="Chat Icon" />
            <span>{{ translations[currentLang].chat }}</span>
          </button>
        </div>
       
        <!-- Language Choices -->
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
        <!-- Profile -->
        <div class="profile-container" @click="toggleProfileDropdown">
          <img src="./assets/profile.png" alt="Profile Icon" />
          <img
            :src="showProfileDropdown ? require('@/assets/up_arr.png') : require('@/assets/down_arr.png')"
            alt="Dropdown Arrow Icon"
            class="down-arrow"
          />
        </div>
        <!-- Profile Dropdown Menu -->
        <div v-if="showProfileDropdown" class="dropdown-menu">
          <template v-if="!isLoggedIn">
            <button class="dropdown-item" @click="openLoginForm">
              <img src="./assets/profile.png" alt="Login Logo" class="dropdown-icon" />
              {{ translations[currentLang].login }}
            </button>
            <button class="dropdown-item" @click="openCreateAccountForm">
              <img src="./assets/create-acc.png" alt="Create Account Icon" class="dropdown-icon" />
              {{ translations[currentLang].createAccount }}
            </button>
          </template>
          <template v-else>
            <router-link to="/patient-profile" class="dropdown-item">
              <img src="./assets/profile.png" alt="Profile Logo" class="dropdown-icon" />
              {{ translations[currentLang].profileDetail }}
            </router-link>
            <button class="dropdown-item" @click="logout">
              <img src="./assets/logout.png" alt="Logout Icon" class="dropdown-icon" />
              {{ translations[currentLang].logout }}
            </button>
          </template>
        </div>
      </div>
    </header>
    <!-- Navigation Tabs -->
    <nav class="nav-tabs">
      <router-link to="/" class="tab">
        {{ translations[currentLang].homepage }}
      </router-link>
      <div @mouseenter="showDoctorDropdown = true, showServicesDropdown = false" @mouseleave="showDoctorDropdown = false">
        <button class="tab" :class="{ 'active': showDoctorDropdown }">
          {{ translations[currentLang].doctorSchedule }}
        </button>
        <div v-if="showDoctorDropdown" class="doctor-dropdown">
          <router-link to="/thai-medicine" @click="selectDoctorDepartment(translations[currentLang].departments.thaiMedicine)">
            <button class="dropdown-item">{{ translations[currentLang].departments.thaiMedicine }}</button>
          </router-link>
          <router-link to="/chinese-medicine" @click="selectDoctorDepartment(translations[currentLang].departments.chineseMedicine)">
            <button class="dropdown-item">{{ translations[currentLang].departments.chineseMedicine }}</button>
          </router-link>
          <router-link to="/physical-therapy" @click="selectDoctorDepartment(translations[currentLang].departments.physicalTherapy)">
            <button class="dropdown-item">{{ translations[currentLang].departments.physicalTherapy }}</button>
          </router-link>
          <router-link to="/opd" @click="selectDoctorDepartment(translations[currentLang].departments.outpatientClinic)">
            <button class="dropdown-item">{{ translations[currentLang].departments.outpatientClinic }}</button>
          </router-link>
        </div>
      </div>
      <router-link to="/appointment" class="tab">
        {{ translations[currentLang].appointments }}
      </router-link>
      <div @mouseenter="showServicesDropdown = true, showDoctorDropdown = false" @mouseleave="showServicesDropdown = false">
        <button class="tab" :class="{ 'active': showServicesDropdown }">
          {{ translations[currentLang].services }}
        </button>
        <div v-if="showServicesDropdown" class="service-dropdown">
          <router-link to="/check-up" @click="toggleServicesDropdown">
            <button class="dropdown-item">Service 1: General Check-up</button>
          </router-link>
          <router-link to="/dental-consult" @click="toggleServicesDropdown">
            <button class="dropdown-item">Service 2: Dental Consultation</button>
          </router-link>
          <router-link to="/eye-exam" @click="toggleServicesDropdown">
            <button class="dropdown-item">Service 3: Eye Examination</button>
          </router-link>
          <router-link to="/pediatric" @click="toggleServicesDropdown">
            <button class="dropdown-item">Service 4: Pediatric Check-up</button>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="footer">
      <div class="footer-content">
        <!-- Contact Information Section -->
        <div class="contact-info">
          <h3>{{ translations[currentLang].contactUs }}</h3>
          <div class="contact-columns">
            <div class="contact-column">
              <div class="info-item">
                <img src="@/assets/location-icon.png" alt="Address" class="info-icon" />
                <div class="info-text">
                  <p><strong>{{ translations[currentLang].hospitalName }}</strong></p>
                  <p>{{ translations[currentLang].address }}</p>
                </div>
              </div>
              <div class="info-item">
                <img src="@/assets/phone-icon.png" alt="Telephone" class="info-icon" />
                <div class="info-text">
                  <p><strong>{{ translations[currentLang].telephone }}</strong></p>
                </div>
              </div>
            </div>
            <div class="contact-column">
              <div class="info-item">
                <img src="@/assets/email-icon.png" alt="Email" class="info-icon" />
                <div class="info-text">
                  <p><strong>{{ translations[currentLang].email }}</strong></p>
                </div>
              </div>
              <div class="info-item">
                <img src="@/assets/hours-icon.png" alt="Business Hours" class="info-icon" />
                <div class="info-text">
                  <p>
                    <strong>{{ translations[currentLang].businessHoursTitle || 'Business days and hours:' }}</strong><br />
                    {{ translations[currentLang].businessHours || 'Monday-Friday: 8:00 AM - 8:00 PM<br>Saturday: 8:00 AM - 4:00 PM<br>(Closed every Sunday and public holidays)' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="social-media">
            <a href="https://www.facebook.com/MFUMedicalCenter?mibextid=LQQJ4d" target="_blank">
              <img src="@/assets/facebook.png" alt="Facebook" class="social-icon" />
            </a>
            <a href="https://www.tiktok.com/@mfumyanmaradmission?_t=8r6KG0ymqjH&_r=1" target="_blank">
              <img src="@/assets/tiktok.png" alt="TikTok" class="social-icon" />
            </a>
            <img src="@/assets/qr.png" alt="QR Code" class="qr-icon" />
          </div>
          <div class="mh-logo">
            <img src="@/assets/MH_logo.png" alt="MH Logo" />
          </div>
        </div>
      </div>
    </footer>
    <LogIn
      v-if="showLoginForm"
      @close="showLoginForm = false"
      @login-success="handleLoginSuccess"
    />
    <CreateAcc
      v-if="showCreateAccountForm"
      @close="showCreateAccountForm = false"
      @create-account-success="handleCreateAccountSuccess"
    />
    <ChatBox v-if="showChat" @close="toggleChat" />
    <Search v-if="showSearch" @close="toggleSearch" />
  </div>
</template>
<!-- JS -->
<script>
  import axios from 'axios';
  import LogIn from './components/log_in.vue';
  import CreateAcc from './components/create_acc.vue';
  import ChatWindow from './components/ChatWindow.vue';
  export default {
      name: 'App',
      data() {
          return {
              query: "",
              showLanguageDropdown: false,
              showProfileDropdown: false,
              showDoctorDropdown: false,
              showAppointmentsDropdown: false,
              showServicesDropdown: false,
              showLoginForm: false,
              showCreateAccountForm: false,
              isLoggedIn: false,
              showDropdown: false,
              user: {},
              options: [
                  { value: 1, label: 'Apple' },
                  { value: 2, label: 'Banana' },
                  { value: 3, label: 'Cherry' },
                  { value: 4, label: 'Date' },
                  { value: 5, label: 'Elderberry' },
                  { value: 6, label: 'Fig' },
                  { value: 7, label: 'Grape' },
              ],
              filteredOptions: [],
              currentLang: 'EN',
              ads: [],
              translations: {
                  EN: {
                      login: 'Login',
                      createAccount: 'Create Account',
                      profileDetail: 'Profile Details',
                      logout: 'Log Out',
                      homepage: 'Home',
                      doctorSchedule: 'Doctor Schedule',
                      appointments: 'Appointments',
                      services: 'Services',
                      openChatbox: 'Open Chatbox',
                      contactUs: 'Contact Us',
                      hospitalName: 'Address',
                      address: '333 Moo 1, Tha Sut Subdistrict, Mueang District, Chiang Rai Province 57100',
                      telephone: 'Tel. 0-5391-6000, 0-5391-7034',
                      email: 'pr@mfu.ac.th',
                      departments: {
                          thaiMedicine: "Department of Thai Traditional Medicine",
                          chineseMedicine: "Department of Chinese Medicine",
                          physicalTherapy: "Physical Therapy Department",
                          outpatientClinic: "Outpatient Clinic"                          },
                      service: {
                          service1: 'Chat Box'
                      }
                  },
                  ไทย: {
            login: 'เข้าสู่ระบบ',
            createAccount: 'สร้างบัญชี',
            homepage: 'หน้าแรก',
            doctorSchedule: 'ตารางหมอ',
            appointments: 'การนัดหมาย',
            services: 'บริการ',
            openChatbox: 'เปิดแชทบ็อกซ์',
            contactUs: 'ติดต่อเรา',
            hospitalName: 'โรงพยาบาล Mfu',
            address: '333 ,หมู่ที่1 ,ตําบลท่าสด ,อําเภอเมือง ,จังหวัดเชียงราย ,57100',
            telephone: '0-5391-6000,0-5391-7034',
                      email: 'pr@mfu.ac.th',
                      departments: {
                          thaiMedicine: "แผนกการแพทย์แผนไทย",
                          chineseMedicine: "แผนกการแพทย์แผนจีน",
                          physicalTherapy: "แผนกกายภาพบำบัด",
                          outpatientClinic: "แผนกผู้ป่วยนอก"
                      },
                      service: {
                          service1: 'Chat Box'
                      }
                  },
                  မြန်မာ: {
                      login: 'လော့အင် ဝင်ပါ',
                      createAccount: 'အကောင့်ဖွင့်ပါ',
                      homepage: 'အိမ်စာမျက်နှာ',
                      doctorSchedule: 'ဆရာဝန် အချိန်ဇယား',
                      appointments: 'ချိန်းဆိုချက်များ',
                      services: 'ဝန်ဆောင်မှုများ',
                      openChatbox: 'ချက်ဘော့ကိုဖွင့်မည်',
                      contactUs: 'ဆက်သွယ်ရန်',
                      hospitalName: 'လိပ်စာ',
                      address: '၃၃၃ မူး ၁, သစွတ် မြို့နယ်, မောင်း ခရိုင်ခွဲ, ချင်းရိုင် ခရိုင် ၅၇၁၀၀',
                      telephone: 'ဖုန်း  ၀-၅၃၉၁-၆၀၀၀, ၀-၅၃၉၁-၇၀၃၄ ',
                      email: 'pr@mfu.ac.th',
                      departments: {
                          thaiMedicine: "ထိုင်း တိုင်းရင်းဆေးဝါး ဌာန",
                          chineseMedicine: "တရုတ် တိုင်းရင်းဆေး၀ါး ဌာန",
                          physicalTherapy: "ရုပ်ပိုင်းဆိုင်ရာကုထုံး ဌာန",
                          outpatientClinic: "ပြင်ပလူနာ ဌာန"
                      },
                      service: {
                          service1: 'Chat Box'
                      }
                }
            }
        };
    },
    components: {
        LogIn,
        CreateAcc
    },
    watch: {
    searchQuery() {
      this.filterOptions();
    }
  },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'HomePage' });
        },
       
        toggleLanguageDropdown() {
            this.showLanguageDropdown = !this.showLanguageDropdown;
            this.showProfileDropdown = false;
            this.showDoctorDropdown = false;
            this.showAppointmentsDropdown = false;
            this.showServicesDropdown = false;
        },
        toggleProfileDropdown() {
            this.showProfileDropdown = !this.showProfileDropdown;
            this.showLanguageDropdown = false;
            this.showDoctorDropdown = false;
            this.showAppointmentsDropdown = false;
            this.showServicesDropdown = false;
        },
        toggleDoctorDropdown() {
            this.showDoctorDropdown = !this.showDoctorDropdown;
            this.showLanguageDropdown = false;
            this.showProfileDropdown = false;
            this.showAppointmentsDropdown = false;
            this.showServicesDropdown = false;
        },
        toggleAppointmentsDropdown() {
            this.showAppointmentsDropdown = !this.showAppointmentsDropdown;
            this.showDoctorDropdown = false;
            this.showLanguageDropdown = false;
            this.showProfileDropdown = false;
            this.showServicesDropdown = false;
        },
        toggleServicesDropdown() {
            this.showServicesDropdown = !this.showServicesDropdown;
            this.showAppointmentsDropdown = false;
            this.showDoctorDropdown = false;
            this.showLanguageDropdown = false;
            this.showProfileDropdown = false;
        },
        setLanguage(lang) {
            this.currentLang = lang;
            this.showLanguageDropdown = false;
        },
        openLoginForm() {
            this.showLoginForm = true;
            this.showProfileDropdown = false;
        },
        openCreateAccountForm() {
            this.showCreateAccountForm = true;
            this.showProfileDropdown = false;
        },
        profileDetail() {
            alert('this is profile details');
        },
        Logout(){
            alert('this is log out');
        },
        selectDoctorDepartment(department) {
            if (department === this.translations[this.currentLang].departments.thaiMedicine) {
                this.$router.push({ name: 'thaiMedicine' });
            }
            this.showDoctorDropdown = false;
        },
        goToAppointmentPage() {
            this.$router.push('/appointment');
        },
        handleLogin() {
      this.isLoggedIn = true;
    },
    handleLoginSuccess() {
      this.isLoggedIn = true;
      this.showLoginForm = false;
    },
    handleAccountCreated() {
      this.isLoggedIn = true;
      this.showCreateAccountForm = false;
    },
    handleClickOutside(event) {
              const searchBar = this.$refs.searchBar;
              if (searchBar && !searchBar.contains(event.target)) {
                  this.showDropdown = false;
              }
          },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
    },
    closeDropdowns() {
      this.showDoctorDropdown = false;
      this.showServicesDropdown = false;
    },
    filterOptions() {
      const query = this.searchQuery.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(query)
      );
    },
    selectOption(option) {
      this.searchQuery = option.label;
      this.showDropdown = false;
      this.executeSearch(); // Optional: perform search immediately
    },
   
    executeSearch() {
      if (this.searchQuery) {
        console.log("Searching for:", this.searchQuery);
        // Execute your search functionality here, e.g., navigate to results page
      }
    },
    },
    mounted() {
    // Initialize filteredOptions with all options initially
    this.filteredOptions = this.options;
  }
}
</script>
<!-- CSS -->
<style scoped>
    .header {
        top: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 1000;
        align-items: center;
        justify-content: space-between;
        display:flex;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .logo img {
        margin-left: 0;
        height: 70px;
    }
    .lang-switch {
        margin-left: 15px;
        display: flex;
        align-items: center;
        position: relative;
    }
    .lang-switch span {
        font-weight: bold;
        margin-left: 8px;
        color: black;
    }
    .lang-switch img, .profile-container img {
        height: 24px;
        width: 24px;
    }
    .lang-dropdown, .profile-container {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .search-bar {
  display: flex;
  align-items: center;
  position: relative;
}
.search-bar input[type="text"] {
  width: 300px;
  padding: 8px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.search-icon-btn {
  border: none;
  background-color: #ccc;
  padding: 8px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
.search-icon {
  width: 20px;
  height: 20px;
}
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}
.dropdown-item {
  padding: 8px;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #f1f1f1;
}
    .chat-button {
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 10px;
        display: flex;
        align-items: center;
    }
    .chat-button img {
        width: 40px;
        height: 40px;
    }
    .chat-button:hover {
        filter: brightness(0.9);
    }
    .dropdown-menu {
        position: absolute;
        top: 30px;
        right: 0;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
        padding: 0;
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
        width: 100%;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    .dropdown-item:hover {
        background-color: #B5DEE0;
        color: #ffffff;
    }
    .dropdown-icon {
        height: 20px;
        width: 20px;
        margin-right: 10px;
        transition: filter 0.3s ease;
    }
    .dropdown-item:hover .dropdown-icon {
        filter: brightness(0) invert(1);
    }
    .down-arrow {
        transition: transform 0.3s ease;
    }
   
    .nav-tabs {
        display: flex;
        justify-content: space-around;
        background-color: #ffffff;
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
    }
    .tab {
        background: none;
        border: none;
        color: black;
        font-size: 16px;
        padding: 10px 20px;
        cursor: pointer;
        transition: color 0.3s;
    }
    .tab.active {
        color: black;
        border-top: 3px solid #EBD5A0;
    }
    .tab:hover {
        color: #B5DEE0;
    }
    .doctor-dropdown {
        position: absolute;
        top: 50px;
        left: 25%;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
    }
    .service-dropdown {
        position: absolute;
        top: 50px;
        left: 80%;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
    }
    .footer {
  background: linear-gradient(135deg, #2C3E50, #34495E);
  padding: 20px 10px;
  color: #fff;
  text-align: center;
}
.contact-info {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.contact-info h3 {
  font-size: 1.5em;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 2px;
  margin-bottom: 15px;
  color: #B5DEE0;
}
.contact-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 15px;
}
.contact-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.info-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;
}
.info-icon {
  width: 30px;
  height: 30px;
  filter: brightness(0.8);
  flex-shrink: 0;
}
.info-text {
  text-align: left;
}
.info-text p {
  margin: 0;
  font-size: 0.95em;
  line-height: 1.5;
  color: #e0e0e0;
}
.info-text strong {
  color: #B5DEE0;
}
.closed-info {
  color: #FFB6C1;
  font-style: italic;
  display: block;
  margin-top: 5px;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 20px;
}
.social-media {
  display: flex;
  gap: 20px;
}
.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  transition: transform 0.3s, background-color 0.3s;
}
.social-icon:hover {
  transform: scale(1.1);
  background-color: #B5DEE0;
}
.qr-icon {
  width: 80px;
  height: 80px;
}
.mh-logo img {
  width: 220px;
}
.popular-search, .search-history {
  margin: 10px 0;
}
h4 {
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.dropdown {
  border: 1px solid #ccc;
  background: white;
  padding: 10px;
  position: absolute;
  width: 200px; /* Adjust width as needed */
  z-index: 10;
}
</style>
