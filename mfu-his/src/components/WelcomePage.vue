<template>
    <div class="welcome-page">
      <!-- Overlay layer for background transparency -->
      <div class="background-overlay"></div>
  
      <div class="button-container">
        <button class="welcome-button">Doctors</button>
        <button class="welcome-button">Medical Staff</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WelcomePage",
  };
  </script>
  
  <style scoped>
  .welcome-page {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/hospital_photo.JPG');
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  
  /* Background overlay for transparency */
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent dark overlay */
    z-index: 1;
  }
  
  .button-container {
    position: relative;
    display: flex;
    gap: 20px;
    z-index: 2; /* Bring buttons above the overlay */
  }
  
  .welcome-button {
    padding: 20px 40px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background-color: #4DAAB3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .welcome-button:hover {
    background-color: #35767c;
  }
  </style>
  