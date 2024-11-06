<template>
    <div class="appointments-container">
      <h1 class="page-title">Doctor's Appointments</h1>
      <div class="week-container">
        <div v-for="(dayAppointments, day) in weekAppointments" :key="day" class="day-card">
          <h2 class="day-title">{{ day }}</h2>
          <div v-if="dayAppointments.length > 0">
            <ul class="appointments-list">
              <li v-for="(appointment, index) in dayAppointments" :key="index" class="appointment-item">
                <div class="patient-info">
                  <span class="patient-name">{{ appointment.patientName }}</span>
                  <span class="appointment-time">{{ appointment.time }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="free-text">No appointments today - Free</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppointmentManaging',
    data() {
      return {
        weekAppointments: {
          Monday: [
            { patientName: 'John Doe', time: '10:00 AM' },
            { patientName: 'Jane Smith', time: '11:30 AM' },
          ],
          Tuesday: [],
          Wednesday: [
            { patientName: 'Michael Johnson', time: '9:00 AM' },
          ],
          Thursday: [],
          Friday: [
            { patientName: 'Emily Davis', time: '2:00 PM' },
            { patientName: 'David Brown', time: '3:30 PM' },
          ],
          Saturday: [],
          Sunday: [],
        },
      };
    },
  };
  </script>
  
  <style scoped>
  /* General container styles */
  .appointments-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }
  
  /* Page title */
  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #2b2b2b;
  }
  
  /* Week container */
  .week-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  /* Each day's card */
  .day-card {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* Hover effect for the cards */
  .day-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  /* Day title */
  .day-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #2b2b2b;
  }
  
  /* Appointment list */
  .appointments-list {
    list-style-type: none;
    padding: 0;
  }
  
  .appointment-item {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .patient-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .patient-name {
    font-weight: bold;
    color: #333;
  }
  
  .appointment-time {
    font-style: italic;
    color: #888;
  }
  
  /* Free text when no appointments */
  .free-text {
    font-size: 1.2rem;
    color: #4CAF50;
    text-align: center;
    font-weight: bold;
    padding: 10px;
    background-color: #f1f8e9;
    border-radius: 6px;
    margin-top: 20px;
  }
  </style>
  