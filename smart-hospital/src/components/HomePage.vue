<template>
  <section class="content-section">
    <div>
      <h1>Home လည်းရသွားပါပြီ error မတက်တော့ပါ </h1>
      <h1>Doctor schedule က dropdown ကအကုန်ရသွားပြီ 🙂🙂</h1>
      <h1>မယုံရင်နှိပ်ကြည့်ပါ</h1>
      <h1>Home ကိုပြန်သွားချင်ရင် logo လေးနှိပ်ပါ ပြန်ရသွားပါပြီ</h1>
    </div>
    <div class="ads-container">
      <div v-if="ads.length">
        <div v-for="ad in ads" :key="ad.id" class="ad-card">
          <h2>{{ ad.Ad || 'Ad Title Not Available' }}</h2>
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
        console.log(response.data); // Log the entire response to confirm structure
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
  .ads-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .ad-card {
    border: 1px solid #ddd;
    padding: 10px;
    flex: 0 1 calc(33.33% - 20px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }
  .ad-images-container {
    display: flex;
    gap: 10px;
  }

</style>
