<template>
    <div class="services-container">
      <h1 class="section-title">Dental Consultation Services</h1>
      
      <div class="services-grid">
        <!-- Dental Consultation -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/dental-consultation.png')" alt="Dental Consultation" class="service-icon" /> -->
          <h2>Dental Consultation</h2>
          <p>Consult with a professional dentist for general dental care and advice.</p>
          <div class="service-price">
            <strong>Price:</strong> 500–1,000 THB
          </div>
        </div>
  
        <!-- Teeth Cleaning -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/teeth-cleaning.png')" alt="Teeth Cleaning" class="service-icon" /> -->
          <h2>Teeth Cleaning</h2>
          <p>Professional cleaning to remove plaque and tartar, and maintain oral hygiene.</p>
          <div class="service-price">
            <strong>Price:</strong> 600–1,200 THB
          </div>
        </div>
  
        <!-- Dental X-ray -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/dental-xray.png')" alt="Dental X-ray" class="service-icon" /> -->
          <h2>Dental X-ray</h2>
          <p>X-ray imaging to check for cavities, root issues, and bone health.</p>
          <div class="service-price">
            <strong>Price:</strong> 400–800 THB
          </div>
        </div>
  
        <!-- Tooth Extraction -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/tooth-extraction.png')" alt="Tooth Extraction" class="service-icon" /> -->
          <h2>Tooth Extraction</h2>
          <p>Removal of decayed or damaged teeth, performed by a dentist.</p>
          <div class="service-price">
            <strong>Price:</strong> 1,000–2,500 THB
          </div>
        </div>
  
        <!-- Fillings
        <div class="service-card">
          <img :src="require('@/assets/dental-fillings.png')" alt="Fillings" class="service-icon" /> -->
          <!-- <h2>Fillings</h2>
          <p>Restorative dental procedures to fill cavities and restore tooth functionality.</p>
          <div class="service-price">
            <strong>Price:</strong> 800–1,500 THB
          </div>
        </div>
  
        Root Canal Treatment
        <div class="service-card">
          <img :src="require('@/assets/root-canal.png')" alt="Root Canal Treatment" class="service-icon" />
          <h2>Root Canal Treatment</h2>
          <p>Procedure to save a damaged or infected tooth by removing the pulp.</p>
          <div class="service-price">
            <strong>Price:</strong> 2,000–4,000 THB
          </div>
        </div> -->
  
        <!-- Dental Braces Consultation -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/braces-consultation.png')" alt="Braces Consultation" class="service-icon" /> -->
          <h2>Braces Consultation</h2>
          <p>Consultation for dental braces to straighten teeth and correct bite issues.</p>
          <div class="service-price">
            <strong>Price:</strong> 500–1,500 THB
          </div>
        </div>
  
        <!-- Gum Treatment -->
        <div class="service-card">
          <!-- <img :src="require('@/assets/gum-treatment.png')" alt="Gum Treatment" class="service-icon" /> -->
          <h2>Gum Treatment</h2>
          <p>Treatment for gum diseases, such as gingivitis and periodontitis.</p>
          <div class="service-price">
            <strong>Price:</strong> 600–1,200 THB
          </div>
        </div>
  
        <!-- Cosmetic Dentistry -->
        <!-- <div class="service-card">
          <img :src="require('@/assets/cosmetic-dentistry.png')" alt="Cosmetic Dentistry" class="service-icon" /> -->
          <!-- <h2>Cosmetic Dentistry</h2>
          <p>Procedures to improve the appearance of your teeth and smile.</p>
          <div class="service-price">
            <strong>Price:</strong> 1,500–5,000 THB
          </div> -->
        <!-- </div> -->
        
      </div>
    </div>
  </template>
  
  <style scoped>
  .services-container {
    max-width: 1200px;
    margin: auto;
    padding: 50px;
    text-align: center;
  }
  
  .section-title {
    font-size: 2em;
    color: #3a77b4;
    margin-bottom: 50px;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Change to 3 columns per row */
    gap: 80px;
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
    padding: 30px;
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
  
  p {
    color: #555;
    margin-bottom: 10px;
  }
  </style>
  