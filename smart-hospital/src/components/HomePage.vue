<template>
    <div >
        <section class="content-section">
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
            <div v-else>
                No ads available
            </div>
            </div>
        </section>
    </div>
    
</template>

<script>
  export default {
    name: 'HomePage'
  };
</script>
