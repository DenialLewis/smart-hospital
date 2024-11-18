<template>
    <div class="health-tip-detail">
      <h1 class="title">{{ title }}</h1>
      <img :src="image" alt="Health Tip Image" class="health-tip-image" v-if="image" />
      <p class="info">{{ info }}</p> <!-- Display the info here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'HealthTip',
    data() {
      return {
        title: this.$route.query.title,
        image: this.$route.query.image,
        info: this.$route.query.info // Retrieve info from the query
      };
    },
    mounted() {
      // If you need to fetch more details based on the ID
      // this.fetchHealthTipDetail(this.$route.params.id);
    },
  };
  </script>
  
  <style scoped>
  .health-tip-detail {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 800px; /* Set a max width for the detail view */
    margin: 20px auto; /* Center the card */
    padding: 20px;
    background-color: #ffffff; /* Background color */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  .title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px; /* Font size for the title */
    font-weight: bold; /* Bold title */
    color: #333333; /* Darker color for the title */
    margin-bottom: 15px; /* Space below the title */
  }
  
  .health-tip-image {
    margin:auto;
    max-width: 100%; /* Responsive image */
    height: 300px; /* Maintain aspect ratio */
    border-radius: 8px; /* Rounded corners for the image */
    margin-bottom: 15px; /* Space below the image */
  }
  
  .info {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px; /* Font size for the info text */
    line-height: 1.5; /* Increase line height for readability */
    color: #555555; /* Lighter color for the info text */
  }
  </style>
  