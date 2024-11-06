<template>
  <div class="services-container">
    <h1 class="section-title"> General Check-up Services</h1>
    
    <div class="services-grid">
      <!--Physical Examination -->
      <div class="service-card">
        <img :src="require('@/assets/general.png')" alt="Physical Examination" class="service-icon" />

       
        <h2>Physical Examination </h2>
        <p>A general check-up by a doctor</p>
        <div class="service-price">
          <strong>Price:</strong> 300–500 THB
        </div>
       
      </div>
      
      <!--Blood Test -->
      <div class="service-card">
        <img :src="require('@/assets/bloodtest.png')" alt="blood" class="service-icon" />
        <h2>Blood Tests</h2>
        <p>Includes cholesterol, sugar, liver, kidney, and other tests</p>
        <div class="service-price">
          <strong>Price:</strong> 500–1,500 THB
        </div>
       
      </div>
           <!--HIV Screening -->
      
      <div class="service-card">
        <img :src="require('@/assets/HIV.png')" alt="Physical Examination" class="service-icon" />
        <h2>HIV Screening</h2>
        <p>A blood test to check for HIV</p>
        <div class="service-price">
          <strong>Price:</strong>500–1,000 THB
        </div>
       
      </div>

      <!-- Hepatitis Screening -->
      <div class="service-card">
        <img :src="require('@/assets/bacteria.png')" alt="bacteria" class="service-icon" />
        <h2>Hepatitis Screening</h2>
        <p>Tests for hepatitis virus infections (A, B, C)</p>
        <div class="service-price">
          <strong>Price:</strong>  500–1,200 THB
        </div>
       
      </div>

      <!--Electrocardiogram (ECG)  -->
      <div class="service-card">
        <img :src="require('@/assets/ECG.png')" alt="ECG" class="service-icon" />
        <h2>Electrocardiogram</h2>
        <p>Measures heart activity to detect any irregularities</p>
        <div class="service-price">
          <strong>Price:</strong> 700–1,500 THB
        </div>
      
      </div>

      <!-- Vision Test -->
      <div class="service-card">
        <img :src="require('@/assets/Vision.png')" alt="Vision" class="service-icon" />
        <h2>Vision Test </h2>
        <p>Assesses your eye health and clarity of vision.</p>
        <div class="service-price">
          <strong>Price:</strong> 100–300 THB
        </div>
       
      </div>

      <!-- Bone Density Test -->
      <div class="service-card">
        <img :src="require('@/assets/Bone.png')" alt="bone" class="service-icon" />
        <h2>Bone Density Test </h2>
        <p>Evaluates bone health and checks for osteoporosis (often for older adults).</p>
        <div class="service-price">
          <strong>Price:</strong>  800–1,500 THB
        </div>
      
      </div>
       <!-- Urine Analysis -->
      <div class="service-card">
        <img :src="require('@/assets/Urine.png')" alt="Urine" class="service-icon" />
        <h2>Urine Analysis</h2>
        <p>Tests for infections or abnormalities in the urine</p>
        <div class="service-price">
          <strong>Price:</strong> 200–400 THB
        </div>
      </div>

      <!-- Cancer Screening -->
      <div class="service-card">
        <img :src="require('@/assets/Cancer.png')" alt="cancer" class="service-icon" />
        <h2>Cancer Screening </h2>
        <p>Detects early signs of certain cancers</p>
        <div class="service-price">
          <strong>Price:</strong> 1,000–2,000 THB
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