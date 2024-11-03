<!-- <template> 
  <div>
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
  </div>
</template>

<script>
export default{
  name: 'HomePage',
  mounted() {
    this.fetchAds();
  },
  methods: {
    async fetchAds() {
      try {
        const response = await axios.get('http://localhost:1337/api/ads?populate=*'); // Ensure to populate media
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
</style> -->


<template>
<div>
  <h1>THis is home </h1>
  <h1>Home ကို comment ပေးပြီးခနဖြုတ်ထားတယ် 
    Home က error ဖြစ်နေလို့ </h1>
    <h1> 
      Doctor schedule က dropdown ကအကုန်ရသွားပြီ 🙂🙂</h1>
      <h1>မယုံရင်နှိပ်ကြည့်ပါ</h1>
      <h1>Home ကိုပြန်သွားချင်ရင် logo လေးနှိပ်ပါ ပြန်ရသွားပါပြီ</h1>
</div>
</template>


<script>
export default{
  name: 'HomePage'
}
</script>