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
          <p>{{ appointment.doctor }} - {{ appointment.department }}</p>
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
      <div class="health-tip-card" v-for="tip in healthTips" :key="tip.id">
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
    };
  },
  mounted() {
    this.fetchAds();
    this.fetchUpcomingAppointments();
    this.fetchAnnouncements();
    this.fetchHealthTips(); // Make sure this method is correctly named
    this.checkOverflow();
  },
  methods: {
    async fetchAds() {
      try {
        const response = await axios.get('http://localhost:1337/api/ads?populate=*');
        this.ads = response.data.data.map(ad => ({
          id: ad.id,
          Ad: ad.Ad,
          Ads: ad.Ads || []
        }));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    },
    async fetchUpcomingAppointments() {
      try {
        const response = await axios.get('http://localhost:1337/api/appointments?populate=*');
        this.upcomingAppointments = response.data.data.map(appointment => ({
          id: appointment.id,
          date: appointment.attributes.date,
          doctor: appointment.attributes.doctor,
          department: appointment.attributes.department,
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
        console.log('API Response:', response.data); // Check your API response
        this.healthTips = response.data.data.map(tip => ({
          id: tip.id,
          title: tip.Title,
          info: tip.Info,
          images: tip.News ? tip.News.map(news => ({
            url: `http://localhost:1337${news.url}`
          })) : [] // Default to an empty array if News is undefined
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
    checkOverflow() {
      const container = this.$refs.adsContainer;
      this.isOverflowing = container.scrollWidth > container.clientWidth;
    },
  },
  updated() {
    this.checkOverflow();
  },
};
</script>

<style scoped>
.content-section {
  padding: 20px;
}

.ads-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ads-container {
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}

.ads-container::-webkit-scrollbar {
  height: 8px;
}

.ads-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.ads-container::-webkit-scrollbar-track {
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

.ad-card {
  flex: 0 0 auto;
  margin-right: 15px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.ad-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.ad-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.ad-images-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.ad-image {
  width: 120px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.appointments-section,
.announcements-section,
.health-tips-section {
  margin-top: 30px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.appointments-list {
  display: flex;
  flex-direction: column;
}

.appointment-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.announcement-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.health-tip-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.health-tip-images-container {
  display: flex;
  gap: 10px;
}

.health-tip-image {
  width: 120px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.no-appointments,
.no-announcements,
.no-tips {
  text-align: center;
  color: #888;
}
</style>
