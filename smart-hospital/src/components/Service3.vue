<template>
  <div class="services-container">
    <h1 class="section-title">Eyes Examination</h1>
   
    <div class="services-grid">
     
      <div class="service-card">
        <img :src="require('@/assets/eyetest.png')" alt="eyetest" class="service-icon" />
        <h2>Refraction Test</h2>
        <p>Determines the lens prescription for glasses or contacts</p>
        <div class="service-price">
          <strong>Price:</strong> 1,000–1,500 THB
        </div>
      </div>




      <!-- Teeth Cleaning -->
      <div class="service-card">
        <img :src="require('@/assets/medical.png')" alt="medical" class="service-icon" />
        <h2>Slit-Lamp Examination</h2>
        <p>Provides a detailed view of the eye's front parts (cornea, iris, lens)</p>
        <div class="service-price">
          <strong>Price:</strong> 1,500–2,500 THB
        </div>
      </div>




      <!-- Dental X-ray -->
      <div class="service-card">
        <img :src="require('@/assets/eyeball.png')" alt="Dental X-ray" class="service-icon" />
        <h2>Intraocular Pressure Test (Tonometry)</h2>
        <p>Measures eye pressure to screen for glaucoma</p>
        <div class="service-price">
          <strong>Price:</strong> 1,000–2.000 THB
        </div>
      </div>




      <!-- Tooth Extraction -->
      <div class="service-card">
        <img :src="require('@/assets/field.png')" alt="field" class="service-icon" />
        <h2>Visual field test </h2>
        <p>Checks peripheral vision for potential issues like glaucoma</p>
        <div class="service-price">
          <strong>Price:</strong> 1,500–3,000 THB
        </div>
      </div>




     




     
     
        <!-- <img :src="require('@/assets/braces-consultation.png')" alt="Braces Consultation" class="service-icon" /> -->
        <!-- <h2>Braces Consultation</h2>
        <p>Consultation for dental braces to straighten teeth and correct bite issues</p>
        <div class="service-price">
          <strong>Price:</strong> 500–1,500 THB
        </div>
      </div> -->




     
     
        <!-- <img :src="require('@/assets/gum-treatment.png')" alt="Gum Treatment" class="service-icon" /> -->
        <!-- <h2>Gum Treatment</h2>
        <p>Treatment for gum diseases, such as gingivitis and periodontitis</p>
        <div class="service-price">
          <strong>Price:</strong> 600–1,200 THB
        </div>
      </div> -->




     
     
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
