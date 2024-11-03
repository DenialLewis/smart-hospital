<template>
  <section class="content-section">
    <div class="ads-container">
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
  </section>
</template>
<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      ads: [],
    };
  },
  mounted() {
    this.fetchAds();
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
  },
};
</script>

<style scoped>
.content-section {
  padding: 20px;
}

.ads-container {
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;
  -ms-overflow-style: none;
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
