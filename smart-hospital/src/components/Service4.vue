<template>
  <div class="services-container">
    <h1 class="section-title"> Padiatric Check-up</h1>
   
    <div class="services-grid">
      <!--Physical Examination -->
      <div class="service-card">
        <img :src="require('@/assets/skin.png')" alt="Physical Examination" class="service-icon" />
         <h2>Skin Examination</h2>
        <p>Addresses skin conditions like eczema, rashes, and birthmarks</p>
        <div class="service-price">
          <strong>Price:</strong> 500–1,500 THB
        </div>
       
      </div>
     
     
      <div class="service-card">
        <img :src="require('@/assets/vaccination.png')" alt="blood" class="service-icon" />
        <h2>Vaccination and Immunization</h2>
        <p>Age-appropriate vaccines for protextion against common childhood diseases</p>
        <div class="service-price">
          <strong>Price:</strong> 500–3,000 THB
        </div>
       
      </div>
           
     
      <div class="service-card">
        <img :src="require('@/assets/mildstone.png')" alt="Physical Examination" class="service-icon" />
        <h2>Development Milestone Assessment</h2>
        <p>Evaluates motor skills, speech, and social interactions to ensure healthy development</p>
        <div class="service-price">
          <strong>Price:</strong>1,000–2,000 THB
        </div>
       
      </div>




     
      <div class="service-card">
        <img :src="require('@/assets/diet.png')" alt="bacteria" class="service-icon" />
        <h2>Nutritional and Growth Counseling</h2>
        <p>Guidence on diet, nutrition and healthy weight management</p>
        <div class="service-price">
          <strong>Price:</strong>  100–150 THB
        </div>
       
      </div>




     
      <div class="service-card">
        <img :src="require('@/assets/heart.png')" alt="ECG" class="service-icon" />
        <h2>Heart Health Monitoring</h2>
        <p>Checking for irregular heartbeats</p>
        <div class="service-price">
          <strong>Price:</strong> 500–1,500 THB
        </div>
     
      </div>




     
      <div class="service-card">
        <img :src="require('@/assets/hear.png')" alt="Vision" class="service-icon" />
        <h2>Hearing Impairment Screening</h2>
        <p>Advanced auditory tests using specialized equipment</p>
        <div class="service-price">
          <strong>Price:</strong> 200–500 THB
        </div>
       
      </div>




     
     
    </div>
  </div>
</template>




<style scoped>
.services-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  text-align: center;
}




.section-title {
  font-size: 2em;
  color: #3a77b4;
  margin-bottom: 20px;
}




.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Change to 3 columns per row */
  gap: 20px;
}




@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns per row on smaller screens */
  }
}




@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr; /* 1 column per row on extra small screens */
  }
}




.service-card {
  padding: 20px;
  background-color: #ffffff;
  border: 2px solid #c8d6e5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  font-family: Arial, Helvetica, sans-serif;
}




.service-card:hover {
  transform: translateY(-5px);
}




.service-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
}




h2 {
  color: #3a77b4;
  font-weight: bold;
  margin-bottom: 10px;
}




.service-price {
  font-size: 1em;
  color: #333;
  margin-top: 10px;
}




.more-link {
  display: block;
  margin-top: 10px;
  color: #3a77b4;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}




.more-link:hover {
  color: #0066cc;
}




p {
  color: #555;
  margin-bottom: 10px;
}
</style>
