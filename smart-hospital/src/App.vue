<template>
  <div id="app">

    <router-view/> 
    <!-- Header -->
    

    <!-- Navigation Tabs -->
    

    <!-- Hospital Dashboard -->
    <!-- <div v-if="$route.name !== 'thaiMedicine'" class="hospital-dashboard">
      <section class="content-section">
        <h1>This is Home Page</h1>
        <h1>Ads</h1>
        <div class="ads-container">
          <div v-if="ads.length">
            <div v-for="ad in ads" :key="ad.id" class="ad-card">
              <h2>{{ ad.Ad }}</h2>
              <div class="ad-images-container">
                <template v-if="ad.Ads && ad.Ads.length > 0">
                  <img 
                    v-for="(image, index) in ad.Ads" 
                    :key="index"
                    :src="`http://localhost:1337${image.url}`" 
                    alt="Ad Image" 
                    class="ad-image"
                    :style="{ width: '100px', height: 'auto' }" 
                    @error="handleImageError(ad)" 
                  />
                </template>
                <p v-else>No images available for this ad.</p>
              </div>
            </div>
          </div>
          <div v-else>No ads available</div>
        </div>
      </section> -->

      <!-- Footer -->
      <!-- <footer class="footer">
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
      <ChatWindow v-if="isChatOpen" @close-chat="isChatOpen=false" :isOpen="isChatOpen"/> 
    </div>
    <router-view></router-view> -->
    <!-- Modal Components -->
    <!-- <LogIn v-if="showLoginForm" @close="showLoginForm = false" :currentLang="currentLang" />
    <CreateAcc v-if="showCreateAccountForm" @close="showCreateAccountForm = false" :currentLang="currentLang" /> -->

  </div>
</template>



<!-- JS -->
<script>
// import axios from 'axios';
// import LogIn from './components/log_in.vue';
// import CreateAcc from './components/create_acc.vue';
// import ChatWindow from './components/ChatWindow.vue';

// export default {
//   name: "App",
//   data() {
//     return {
//      query: "",
//       showLanguageDropdown: false,
//       showProfileDropdown: false,
//       showDoctorDropdown: false,
//       showAppointmentsDropdown: false,
//       showServicesDropdown: false,
//       showLoginForm: false,
//       showCreateAccountForm: false,
//       isLoggedIn: false, 
//       user: {},
//       currentLang: 'EN',
//       ads: [],
//       translations: {
//         EN: {
//           searchPlaceholder: 'Search...',
//           login: 'Login',
//           createAccount: 'Create Account',
//           profileDetail: 'Profile Details',
//           logout: 'Log Out',
//           homepage: 'Home',
//           doctorSchedule: 'Doctor Schedule',
//           appointments: 'Appointments',
//           services: 'Services',
//           openChatbox: 'Open Chatbox',
//           contactUs: 'Contact Us',
//           hospitalName: 'Mfu Hospital',
//           address: '123 Hospital Rd, City, Country',
//           telephone: '+123 456 7890',
//           email: 'info@mfu-hospital.com',
//           departments: {
//             thaiMedicine: "Department of Thai Traditional Medicine",
//       chineseMedicine: "Department of Chinese Medicine",
//       physicalTherapy: "Physical Therapy Department",
//       outpatientClinic: "Outpatient Clinic"
//     },
//           service: {
//             service1: 'Chat Box'
//           }
//         },
//         ไทย: {
//           searchPlaceholder: 'ค้นหา...',
//           login: 'เข้าสู่ระบบ',
//           createAccount: 'สร้างบัญชี',
//           homepage: 'pai home',
//           doctorSchedule: 'ตารางหมอ',
//           appointments: 'นัดหมาย',
//           services: 'บริการ',
//           openChatbox: 'เปิดแชทบ็อกซ์',
//           contactUs: 'ติดต่อเรา',
//           hospitalName: 'โรงพยาบาล Mfu',
//           address: '123 Hospital Rd, City, Country',
//           telephone: '+123 456 7890',
//           email: 'info@mfu-hospital.com',
//           departments: {
//             thaiMedicine: "แผนกการแพทย์แผนไทย",
//       chineseMedicine: "แผนกการแพทย์แผนจีน",
//       physicalTherapy: "แผนกกายภาพบำบัด",
//       outpatientClinic: "แผนกผู้ป่วยนอก"
//     },
//           service: {
//             service1: 'Chat Box'
//           }
//         },
//         မြန်မာ: {
//           searchPlaceholder: 'ရှာဖွေပါ...',
//           login: 'ဝင်ပါ',
//           createAccount: 'အကောင့်ဖွင့်ပါ',
//           homepage: 'aein thwear mae',
//           doctorSchedule: 'ဆရာဝန်အစီအစဉ်',
//           appointments: 'ချိန်းဆိုချက်များ',
//           services: 'ဝန်ဆောင်မှုများ',
//           openChatbox: 'ချက်ဘော့ကို ဖွင့်မည်',
//           contactUs: 'ဆက်သွယ်ရန်',
//           hospitalName: 'Mfu ဆေးရုံ',
//           address: '123 Hospital Rd, မြို့, နိုင်ငံ',
//           telephone: '+123 456 7890',
//           email: 'info@mfu-hospital.com',
//           departments: {
//             thaiMedicine: "ထိုင်းထူးပြုဆေးရုံ",
//             chineseMedicine: "တရုတ် တိုင်းရင်းဆေး၀ါး ဌာန",
//       physicalTherapy: "ရုပ်ပိုင်းဆိုင်ရာကုထုံးဌာန",
//       outpatientClinic: "ပြင်ပလူနာဌာန"
//     },
//           service: {
//             service1: 'Chat Box'
//           }
//         }
//       }
//     };
//   },
//   mounted() {
//     this.fetchAds();
//   },

//   components: {
//     LogIn,
//     CreateAcc
//   },
//   methods: {



//     goToAppointmentPage() {
//       this.$router.push('/appointment'); // Ensure your route name is 'appointment'
//     },
    
//     toggleLanguageDropdown() {
//       this.showLanguageDropdown = !this.showLanguageDropdown;
//       this.showProfileDropdown = false;
//       this.showDoctorDropdown = false;
//       this.showAppointmentsDropdown = false;
//       this.showServicesDropdown = false;
//     },
//     toggleProfileDropdown() {
//       this.showProfileDropdown = !this.showProfileDropdown;
//       this.showLanguageDropdown = false;
//       this.showDoctorDropdown = false;
//       this.showAppointmentsDropdown = false;
//       this.showServicesDropdown = false;
//     },
//     async login(){
//       try {
//         const response = await axios.post('http://localhost:1337/api/auth/local', {
//           identifier: this.email,
//           password: this.password,
//         });
//         this.user = response.data.user; 
//         this.isLoggedIn = true; 
//         this.showProfileDropdown = false; 
//       } catch (error){
//         console.error('Login failed:', error.response.data.message);
//       }
//     },
//     toggleDoctorDropdown() {
//       this.showDoctorDropdown = !this.showDoctorDropdown;
//       this.showLanguageDropdown = false;
//       this.showProfileDropdown = false;
//       this.showAppointmentsDropdown = false;
//       this.showServicesDropdown = false;
//     },
//     toggleAppointmentsDropdown() {
//       this.showAppointmentsDropdown = !this.showAppointmentsDropdown;
//       this.showDoctorDropdown = false;
//       this.showLanguageDropdown = false;
//       this.showProfileDropdown = false;
//       this.showServicesDropdown = false;
    
//     },
//     toggleServicesDropdown() {
//       this.showServicesDropdown = !this.showServicesDropdown;
//       this.showAppointmentsDropdown = false;
//       this.showDoctorDropdown = false;
//       this.showLanguageDropdown = false;
//       this.showProfileDropdown = false;
//     },
//     setLanguage(lang) {
//       this.currentLang = lang;
//       this.showLanguageDropdown = false;
//     },
//     openLoginForm() {
//       this.showLoginForm = true;
//       this.showProfileDropdown = false;
//     },
//     openCreateAccountForm() {
//       this.showCreateAccountForm = true;
//       this.showProfileDropdown = false;
//     },
//     profileDetail() {
//       alert('this is profile details');
//     },
//     Logout(){
//       alert('this is log out'); 
//     },
//     selectDoctorDepartment(department) {
//       if (department === this.translations[this.currentLang].departments.thaiMedicine) {
//         this.$router.push({ name: 'thaiMedicine' });
//       }
//       this.showDoctorDropdown = false;
//     },
//     goToHomePage() {
//       this.$router.push({ name: 'App' }); // Ensure that 'home' route is defined in your router.
//     },
//     async fetchAds() {
//       try {
//         const response = await axios.get('http://localhost:1337/api/ads?populate=*'); // Ensure to populate media
//         console.log(response.data); // Log the entire response to check the structure
//         this.ads = response.data.data; // Adjust this according to your actual response
//         this.logAdImageUrls();
//       } catch (error) {
//         console.error('Error fetching ads:', error);
//       }
//     },
//     logAdImageUrls() {
//       if (this.ads.length) {
//         this.ads.forEach(ad => {
//           // Log to see the structure of each ad
//           console.log(ad);
//           if (ad.Ads && ad.Ads.length > 0) {
//             console.log(`Ad Image URL: http://localhost:1337${ad.Ads[0].url}`);
//           }
//         });
//       } else {
//         console.log('No ads available.');
//       }
//     },
//     handleImageError(ad) {
//       console.log(`Error loading image for ad: ${ad.Ad}`);
//       // You could also set a default image or perform any other error handling
//     }
//   }
// };
</script>

<!-- CSS -->
<style scoped>
  .hospital-dashboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

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

  .search-bar {
    right: 35px;
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-bar input {
  width: 100%;
  padding: 10px 40px 10px 10px; /* Add space for the icon */
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
    color: black; 
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
    color: black;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .tab.active {
    color: black;
    border-top: 3px solid #EBD5A0; /* Highlighted top border */
  }

  .tab:hover {
    color: #B5DEE0; /* Changed to #B5DEE0 */
  }


  /* Doctor Dropdown */
  .doctor-dropdown {
    position: absolute;
    top: 60px; /* Adjusted to appear below the nav bar */
    left: 65px;
    background-color: #ffffff; /* Background color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-top: 3px solid #EBD5A0; /* Highlighted border color */
    z-index: 1000;
  }
  .appointment-dropdown {
    position: absolute;
    top: 60px; /* Adjusted to appear below the nav bar */
    left: 41%;
    background-color: #ffffff; /* Background color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-top: 3px solid #EBD5A0; /* Highlighted border color */
    z-index: 1000;
  }
  .service-dropdown {
    position: absolute;
    top: 60px; /* Adjusted to appear below the nav bar */
    left: 75%;
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
.ads-container {
  display: flex; /* Use flexbox to align ads side by side */
  flex-wrap: wrap; /* Allow wrapping to next line if necessary */
  gap: 20px; /* Space between ad cards */
}

.ad-card {
  border: 1px solid #ddd; /* Optional: style the ad card */
  padding: 10px; /* Optional: space inside the ad card */
  flex: 0 1 calc(33.33% - 20px); /* Responsive width: adjust as needed */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow for depth */
}

.ad-images-container {
  display: flex; /* Flexbox for image layout */
  gap: 10px; /* Space between images */
}

.ad-image {
  width: 100px; /* Set width for images */
  height: auto; /* Maintain aspect ratio */
}


</style>
