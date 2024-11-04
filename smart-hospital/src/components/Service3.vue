<template>
    <div class="service1-container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      
      <h2>What to Expect During Your Check-up</h2>
      <ul>
        <li>Complete physical examination</li>
        <li>Vital signs assessment (blood pressure, heart rate, etc.)</li>
        <li>Blood tests as needed</li>
        <li>Discussion of your medical history</li>
        <li>Recommendations for follow-up or referrals</li>
      </ul>
  
      <h2>Frequently Asked Questions</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <h3>{{ faq.question }}</h3>
        <p>{{ faq.answer }}</p>
      </div>
      
      <router-link to="/appointment" class="btn-appointment">Book an Appointment</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'General Check-up',
        description: 'A general check-up is a comprehensive assessment of your health, aimed at identifying any potential issues and ensuring your overall well-being.',
        faqs: [
          {
            question: 'How often should I get a check-up?',
            answer: 'It is generally recommended to have a check-up at least once a year, but it may vary based on your health needs.'
          },
          {
            question: 'What should I bring to my appointment?',
            answer: 'Please bring any medications you are currently taking, your insurance card, and a list of any health concerns you wish to discuss.'
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .service1-container {
    padding: 20px;
  }
  
  h1 {
    color: #333;
  }
  
  h2 {
    color: #555;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  
  .faq-item {
    margin-top: 10px;
  }
  
  .btn-appointment {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  </style>