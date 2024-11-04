<template>
  <section class="content-section">
    <h1>Home လည်းရသွားပါပြီ error မတက်တော့ပါ </h1>
    <h1>Doctor schedule က dropdown ကအကုန်ရသွားပြီ 🙂🙂</h1>
    <h1>မယုံရင်နှိပ်ကြည့်ပါ</h1>
    <h1>Home ကိုပြန်သွားချင်ရင် logo လေးနှိပ်ပါ ပြန်ရသွားပါပြီ</h1>
    <h1>Login နဲ့ Create Acc မှာ password ကို seen and Unseen လုပ်ထားတယ်</h1>
    <h1>Login ဝင်လိုက်ရင် button တွေပြောင်းသွားပြီ</h1>
    <h1>Dropdown ပေါ် cursor ချလိုက်ရင် တန်းပီး drop down ကျပြီ</h1>

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
    };
  },
  mounted() {
    this.fetchAds();
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
    handleImageError(ad) {
      console.log(`Error loading image for ad: ${ad.Ad}`);
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
  width: 40px; /* Set equal width and height for a circular shape */
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%; /* Makes the button circular */
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
</style>
