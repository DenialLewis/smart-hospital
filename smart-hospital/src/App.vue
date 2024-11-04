<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
        <div class="logo" @click="goToHomePage" style="cursor: pointer;">
            <img alt="Mfu Logo" src="./assets/Hospital.png" />
        </div>

        <div class="lang-switch">
            <!--search bar-->
            <div class="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    v-model="query"
                    @input="onSearch"
                />
                <img src="@/assets/search.png" alt="Search Icon" class="search-icon" />
            </div>

            <!--chat-->
            <div class="chat-boutton">
                <button class="chat-button" @click="toggleChat">
                    <img src="./assets/chatbox.png" alt="Chat Icon" />
                    <span>{{ translations[currentLang].chat }}</span>
                </button>
            </div>

            <!--patient profile par-->
            <router-link to="/patient-profile">Profile details</router-link>

            
            <!--language choices-->
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
            <!--Profile Dropdown Menu-->
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
                    <button class="dropdown-item" @click="profileDetail">
                    <img src="./assets/profile.png" alt="Login Logo" class="dropdown-icon" />
                    {{ translations[currentLang].profileDetail }}
                    </button>
                    <button class="dropdown-item" @click="Logout">
                    <img src="./assets/create-acc.png" alt="Create Account Icon" class="dropdown-icon" />
                    {{ translations[currentLang].logout }}
                    </button>
                </template>
            </div>
        </div>
    </header>

    <!-- Navigation Tabs -->
   <nav class="nav-tabs">
        <!-- <router-link to="/thai-medicine">Thai Medicine</router-link>
        <router-link to="/chinese-medicine">Chinese Medicine</router-link> -->

        <button class="tab" :class="{'active': showDoctorDropdown }" @click="toggleDoctorDropdown">
            {{ translations[currentLang].doctorSchedule }}
        </button>
        <div v-if="showDoctorDropdown" class="doctor-dropdown">
            <router-link to="/thai-medicine" @click="selectDoctorDepartment(translations[currentLang].departments.thaiMedicine)" >
                <button class="dropdown-item">
                {{ translations[currentLang].departments.thaiMedicine }}
                </button>
            </router-link>
            <router-link to="/chinese-medicine" @click="selectDoctorDepartment(translations[currentLang].departments.chineseMedicine)">
                <button class="dropdown-item" >
                {{ translations[currentLang].departments.chineseMedicine }}
                </button>
            </router-link>
            
            <router-link to="/physical-therapy" @click="selectDoctorDepartment(translations[currentLang].departments.physicalTherapy)">
                <button class="dropdown-item" >
                {{ translations[currentLang].departments.physicalTherapy }}
                </button>
            </router-link>
            
            <router-link to="/opd" @click="selectDoctorDepartment(translations[currentLang].departments.outpatientClinic)">
                <button class="dropdown-item" >
                {{ translations[currentLang].departments.outpatientClinic }}
                </button>
            </router-link>
        </div>


        <router-link to="/appointment" class="tab">
            {{ translations[currentLang].appointments }}
        </router-link>

        <!-- <button class="tab" >
            {{ translations[currentLang].appointments }}
        </button>
        <div v-if="showAppointmentsDropdown" class="appointment-dropdown">
            <button class="dropdown-item" @click="openAppointmentPage(1)">Appointment 1: General Check-up</button>
            <button class="dropdown-item" @click="openAppointmentPage(2)">Appointment 2: Dental Consultation</button>
            <button class="dropdown-item" @click="openAppointmentPage(3)">Appointment 3: Eye Examination</button>
            <button class="dropdown-item" @click="openAppointmentPage(4)">Appointment 4: Pediatric Check-up</button>
        </div> -->

        <button class="tab" :class="{ 'active': showServicesDropdown}" @click="toggleServicesDropdown">
            {{ translations[currentLang].services }}
        </button>
        <div v-if="showServicesDropdown" class="service-dropdown">
            <router-link to="/check-up" @click="toggleServicesDropdown"> <!-- Navigate to Service1.vue -->
            <button class="dropdown-item">
                Service 1: General Check-up
            </button>
        </router-link>
             <button class="dropdown-item" @click="openServicePage(2)">Service 2: Dental Consultation</button>
           
            <router-link to="/check-up" @click="toggleServicesDropdown"> <!-- Navigate to Service1.vue -->
            <button class="dropdown-item">
                Service 3: Eye Examination 
            </button>
        </router-link>
            <!-- <router-link to="/check-up" @click="toggleServicesDropdown"> Navigate to Service1.vue -->
                
            
            <button class="dropdown-item" @click="openServicePage(4)">Service 4: Pediatric Check-up</button>
        </div>
    </nav>

    <router-view/> 
    <footer class="footer">
  <div class="footer-content">
    
    <!-- Contact Information Section -->
    <div class="contact-info">
      <h3>{{ translations[currentLang].contactUs }}</h3>
      
      <!-- Two-Column Layout for Contact Information -->
      <div class="contact-columns">
        
        <!-- Column 1: Address and Phone Information -->
        <div class="contact-column">
          <!-- Address Information -->
          <div class="info-item">
            <img src="@/assets/location-icon.png" alt="Address" class="info-icon" />
            <div class="info-text">
              <p><strong>Mae Fah Luang University Hospital</strong></p>
              <p>333 Village No. 1, Tha Sut Subdistrict, Mueang District</p>
              <p>Chiang Rai Province 57100</p>
            </div>
          </div>

          <!-- Phone Information -->
          <div class="info-item">
            <img src="@/assets/phone-icon.png" alt="Telephone" class="info-icon" />
            <div class="info-text">
              <p><strong>Telephone:</strong> 0 5391 7563, 0 5391 7659</p>
            </div>
          </div>
        </div>

        <!-- Column 2: Email and Business Hours Information -->
        <div class="contact-column">
          <!-- Email Information -->
          <div class="info-item">
            <img src="@/assets/email-icon.png" alt="Email" class="info-icon" />
            <div class="info-text">
              <p><strong>Email:</strong> hospital@mfu.ac.th</p>
            </div>
          </div>

          <!-- Business Hours Information -->
          <div class="info-item">
            <img src="@/assets/hours-icon.png" alt="Business Hours" class="info-icon" />
            <div class="info-text">
              <p>
                <strong>Business days and hours:</strong><br>
                Monday-Friday: 8:00 AM - 8:00 PM<br>
                Saturday: 8:00 AM - 4:00 PM<br>
                <span class="closed-info">(Closed every Sunday and public holidays)</span>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Footer Bottom Section -->
    <div class="footer-bottom">
      <!-- Social Media Links -->
      <div class="social-media">
        <a href="https://www.facebook.com/MFUMedicalCenter?mibextid=LQQJ4d" target="_blank">
          <img src="@/assets/facebook.png" alt="Facebook" class="social-icon" />
        </a>
        <a href="https://www.tiktok.com/@mfumyanmaradmission?_t=8r6KG0ymqjH&_r=1" target="_blank">
          <img src="@/assets/tiktok.png" alt="TikTok" class="social-icon" />
        </a>
        <img src="@/assets/qr.png" alt="QR Code" class="qr-icon" />
      </div>
      
      <!-- Logo -->
      <div class="mh-logo">
        <img src="@/assets/MH_logo.png" alt="MH Logo" />
      </div>
    </div>
    
  </div>
</footer>






    <LogIn v-if="showLoginForm" @close="showLoginForm = false" :currentLang="currentLang" />
    <CreateAcc v-if="showCreateAccountForm" @close="showCreateAccountForm = false" :currentLang="currentLang" />
    
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
            user: {},
            currentLang: 'EN',
            ads: [],
            translations: {
                EN: {
                    searchPlaceholder: 'Search...',
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
                    service: {
                        service1: 'Chat Box'
                    }
                },
                ไทย: {
                    searchPlaceholder: 'ค้นหา...',
                    login: 'เข้าสู่ระบบ',
                    createAccount: 'สร้างบัญชี',
                    homepage: 'pai home',
                    doctorSchedule: 'ตารางหมอ',
                    appointments: 'นัดหมาย',
                    services: 'บริการ',
                    openChatbox: 'เปิดแชทบ็อกซ์',
                    contactUs: 'ติดต่อเรา',
                    hospitalName: 'โรงพยาบาล Mfu',
                    address: '123 Hospital Rd, City, Country',
                    telephone: '+123 456 7890',
                    email: 'info@mfu-hospital.com',
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
                    searchPlaceholder: 'ရှာဖွေပါ...',
                    login: 'ဝင်ပါ',
                    createAccount: 'အကောင့်ဖွင့်ပါ',
                    homepage: 'aein thwear mae',
                    doctorSchedule: 'ဆရာဝန်အစီအစဉ်',
                    appointments: 'ချိန်းဆိုချက်များ',
                    services: 'ဝန်ဆောင်မှုများ',
                    openChatbox: 'ချက်ဘော့ကို ဖွင့်မည်',
                    contactUs: 'ဆက်သွယ်ရန်',
                    hospitalName: 'Mfu ဆေးရုံ',
                    address: '123 Hospital Rd, မြို့, နိုင်ငံ',
                    telephone: '+123 456 7890',
                    email: 'info@mfu-hospital.com',
                    departments: {
                        thaiMedicine: "ထိုင်းထူးပြုဆေးရုံ",
                        chineseMedicine: "တရုတ် တိုင်းရင်းဆေး၀ါး ဌာန",
                        physicalTherapy: "ရုပ်ပိုင်းဆိုင်ရာကုထုံးဌာန",
                        outpatientClinic: "ပြင်ပလူနာဌာန"
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
    },
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
        right: 35px;
        position: relative;
        width: 100%;
        max-width: 400px;
    }
    .search-bar input {
        width: 100%;
        padding: 10px 40px 10px 10px;
        border-radius: 20px;
        border: 1px solid #ccc;
        font-size: 16px;
    }
    .search-bar .search-icon {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
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
        top: 60px;
        left: 65px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
    }
    .appointment-dropdown {
        position: absolute;
        top: 60px;
        left: 41%;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
    }
    .service-dropdown {
        position: absolute;
        top: 60px;
        left: 75%;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-top: 3px solid #EBD5A0;
        z-index: 1000;
    }

    .footer {
  background: linear-gradient(135deg, #2C3E50, #34495E);
  padding: 40px 20px;
  color: #fff;
  text-align: center;
}

.contact-info {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.contact-info h3 {
  font-size: 1.5em;
  font-family: Arial, Helvetica, sans-serif;
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
  padding-top: 20px;
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


</style>
