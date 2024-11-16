<template>
  <section class="content-section">
    <!-- Ads Section -->
    <div class="ads-container-wrapper">
      <button v-if="isOverflowing" @click="scrollLeft" class="scroll-button left">&lt;</button>
      <div class="ads-container" ref="adsContainer">
        <template v-for="ad in ads" :key="ad.id">
          <div class="ad-card">
            <h2 class="ad-title">{{ ad.Ad || 'Ad Title Not Available' }}</h2>
            <div class="ad-images-container">
              <template v-if="ad.Ads && ad.Ads.length > 0">
                <img
                  v-for="(image, index) in ad.Ads"
                  :key="index"
                  :src="`http://localhost:1337${image.url}`"
                  alt="Ad Image"
                  class="ad-image"
                  @error="handleImageError(ad)"
                />
              </template>
              <p v-else>No images available for this ad.</p>
            </div>
          </div>
        </template>
      </div>
      <button v-if="isOverflowing" @click="scrollRight" class="scroll-button right">&gt;</button>
    </div>

    
    <!-- Upcoming Appointments Section -->
    <div class="appointments-section">
      <h2>Upcoming Appointments</h2>
      <div class="appointments-list">
        <div class="appointment-card" v-for="appointment in upcomingAppointments" :key="appointment.id">
          <strong>{{ appointment.date }}</strong>
          <p>{{ appointment.first_name }} {{ appointment.last_name }} - {{ appointment.appointment_types }}</p>
          <p>{{ appointment.time }} - {{ appointment.gender }}</p>
          <button @click="cancelAppointment(appointment.id)" class="cancel-button">Cancel Appointment</button>
        </div>
        <div v-if="upcomingAppointments.length === 0" class="no-appointments">No upcoming appointments.</div>
      </div>
    </div>

    <!-- Announcements and Alerts Section -->
    <div class="announcements-section">
      <h2>Announcements</h2>
      <div class="announcement-card" v-for="announcement in announcements" :key="announcement.id">
        <p>{{ announcement.message }}</p>
      </div>
      <div v-if="announcements.length === 0" class="no-announcements">No announcements available.</div>
    </div>

   <!-- Health Tips & News Section -->
  <div class="health-tips-section">
    <h2>Health Tips & News</h2>
    <div class="health-tips-container-wrapper">
      <button v-if="isHealthTipsOverflowing" @click="scrollHealthTipsLeft" class="scroll-button left">&lt;</button>
      <div class="health-tips-container" ref="healthTipsContainer">
        <div
          class="health-tip-card"
          v-for="tip in healthTips"
          :key="tip.id"
          @click="navigateToHealthTip(tip)"
        >
          <h3>{{ tip.title }}</h3>
          <div class="health-tip-images-container" v-if="tip.images && Array.isArray(tip.images) && tip.images.length > 0">
            <img
              v-for="(image, index) in tip.images"
              :key="index"
              :src="image.url"
              alt="Health Tip Image"
              class="health-tip-image"
              @error="handleImageError(tip)"
            />
          </div>
        </div>
      </div>
      <button v-if="isHealthTipsOverflowing" @click="scrollHealthTipsRight" class="scroll-button right">&gt;</button>
    </div>
    <div v-if="healthTips.length === 0" class="no-tips">No health tips available.</div>
  </div>
  </section>
</template>
<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      ads: [],
      isOverflowing: false,
      upcomingAppointments: [],
      announcements: [],
      healthTips: [],
      isHealthTipsOverflowing: false,
    };
  },
  mounted() {
    this.fetchAds();
    this.fetchUpcomingAppointments();
    this.fetchAnnouncements();
    this.fetchHealthTips(); // Make sure this method is correctly named
    this.checkOverflow();
    this.checkHealthTipsOverflow();
  },
  methods: {
    async fetchAds() {
      try {
        const response = await axios.get('http://localhost:1337/api/ads?populate=*');
        this.ads = response.data.data.map(ad => ({
          id: ad.id,
          Ad: ad.attributes.Ad || 'Ad Title Not Available', // Accessing the Ad title
          Ads: ad.attributes.Ads ? ad.attributes.Ads.data.map(media => ({
            url: media.attributes.url
          })) : [] // Mapping the media URLs if available
        }));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    },
    async fetchUpcomingAppointments() {
      try {
        const response = await axios.get('http://localhost:1337/api/other-appointments');
        this.upcomingAppointments = response.data.data.map(appointment => ({
          id: appointment.id,
          date: appointment.attributes.date,
          first_name: appointment.attributes.first_name,
          last_name: appointment.attributes.last_name,
          appointment_types: appointment.attributes.appointment_types,
          time: appointment.attributes.time,
          gender: appointment.attributes.gender,
        }));
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      }
    },
    async fetchAnnouncements() {
      try {
        const response = await axios.get('http://localhost:1337/api/announcements');
        this.announcements = response.data.data.map(announcement => ({
          id: announcement.id,
          message: announcement.attributes.message,
        }));
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    },
    async fetchHealthTips() {
      try {
        const response = await axios.get('http://localhost:1337/api/news?populate=*');
        console.log('API Response:', response.data); // Check this in the console
        this.healthTips = response.data.data.map(tip => ({
          id: tip.id,
          title: tip.attributes.Title || 'No Title Available',
          info: tip.attributes.Info || 'No Info Available',
          images: tip.attributes.News && Array.isArray(tip.attributes.News.data)
            ? tip.attributes.News.data.map(newsItem => ({
                url: `http://localhost:1337${newsItem.attributes.url}`
              }))
            : []
        }));
      } catch (error) {
        console.error('Error fetching health tips:', error);
      }
    },
    handleImageError(item) {
      console.log(`Error loading image for: ${item.title || item.Ad}`);
    },
    scrollLeft() {
      this.$refs.adsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.adsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    },
    scrollHealthTipsLeft() {
      this.$refs.healthTipsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    },
    scrollHealthTipsRight() {
      this.$refs.healthTipsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    },
    checkOverflow() {
      const container = this.$refs.adsContainer;
      this.isOverflowing = container.scrollWidth > container.clientWidth;
    },
    checkHealthTipsOverflow() {
      const container = this.$refs.healthTipsContainer;
      this.isHealthTipsOverflowing = container.scrollWidth > container.clientWidth;
    },
    navigateToHealthTip(tip) {
      this.$router.push({
        name: 'HealthTip',
        params: { id: tip.id },
        query: {
          title: tip.title,
          image: tip.images[0]?.url,
          info: tip.info
        }
      });
    },
  },
  updated() {
    this.checkOverflow();
    this.checkHealthTipsOverflow();
  },
};
</script>

<style scoped>
.content-section {
  padding: 20px;
}

.ads-container-wrapper,
.health-tips-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ads-container,
.health-tips-container {
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}

.ads-container::-webkit-scrollbar,
.health-tips-container::-webkit-scrollbar {
  height: 8px;
}

.ads-container::-webkit-scrollbar-thumb,
.health-tips-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.ads-container::-webkit-scrollbar-track,
.health-tips-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: background-color 0.3s;
}

.scroll-button.left {
  left: 10px;
}

.scroll-button.right {
  right: 10px;
}

.scroll-button:hover {
  background-color: #B5DEE0;
}

.ad-card,
.health-tip-card {
  flex: 0 0 auto;
  margin-right: 10px; /* Decrease the right margin */
  border: 1px solid #ddd;
  padding: 10px; /* Decrease the padding */
  border-radius: 8px; /* Slightly reduce the border radius */
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Reduce shadow effect */
  transition: transform 0.3s;
  max-width: 150px; /* Set a maximum width to make the cards smaller */
}

.ad-image,
.health-tip-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px; /* Slightly reduce the border radius */
}


.ad-card:hover,
.health-tip-card:hover {
  transform: scale(1.02);
}

/* Appointment Section Styles */
.appointments-section {
  margin-top: 40px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.appointments-section h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #2a3d52;
  font-weight: 600;
}

.appointments-list {
  display: flex;
  flex-direction: row;  /* Change to row to display horizontally */
  gap: 15px;
  flex-wrap: wrap;  /* Allow wrapping if necessary */
}

.appointment-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  width: 250px;  /* Set a fixed width for each card */
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.appointment-card strong {
  font-size: 1.1em;
  color: #3b3b3b;
}

.appointment-card p {
  font-size: 1em;
  color: #6b6b6b;
}

.appointment-card .appointment-time {
  font-size: 0.9em;
  color: #a5a5a5;
}

.no-appointments {
  text-align: center;
  font-size: 1.1em;
  color: #999;
  font-style: italic;
  margin-top: 20px;
}
/* Add styles for cancel button */
.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c0392b;
}


</style>
