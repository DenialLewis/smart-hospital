<template>
    <div>
      <h2>Other Service Appointments</h2>
      <div v-if="loading">Loading...</div>
      <div v-else class="cards-container">
        <div v-for="appointment in appointments" :key="appointment.id" class="card">
          <div class="card-header">
            <h3>{{ appointment.title }} {{ appointment.first_name }} {{ appointment.last_name }}</h3>
            <p><strong>Appointment Type:</strong> {{ appointment.appointment_types }}</p>
          </div>
          <div class="card-body">
            <p><strong>Date:</strong> {{ appointment.date }}</p>
            <p><strong>Day:</strong> {{ appointment.day }}</p>
            <p><strong>Time:</strong> {{ appointment.time }}</p>
            <p><strong>Gender:</strong> {{ appointment.gender }}</p>
            <p><strong>Date of Birth:</strong> {{ appointment.date_of_birth }}</p>
            <p><strong>Phone Number:</strong> {{ appointment.phone_num }}</p>
            <p><strong>Nationality:</strong> {{ appointment.nationality }}</p>
            <p><strong>ID/Passport:</strong> {{ appointment.ncid_passport }}</p>
            <button @click="cancelAppointment(appointment.id)" class="cancel-btn">Cancel Appointment</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PatientInfo',
    data() {
      return {
        appointments: [],
        loading: true,
      };
    },
    methods: {
      async fetchAppointments() {
        try {
          const response = await axios.get('http://localhost:1337/api/other-appointments', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
          });
  
          this.appointments = response.data.data.map(item => ({
            id: item.id,
            ...item.attributes,
          }));
  
          this.loading = false;
        } catch (error) {
          console.error('Error fetching appointments:', error);
          this.loading = false;
        }
      },
      async cancelAppointment(appointmentId) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
          try {
            await axios.delete(`http://localhost:1337/api/other-appointments/${appointmentId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
              },
            });
            // Remove the deleted appointment from the local list
            this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
            alert('Appointment cancelled successfully.');
          } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment. Please try again.');
          }
        }
      },
    },
    mounted() {
      this.fetchAppointments();
    },
  };
  </script>
  <style scoped>
  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
  }
  
  .card {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }
  
  .card-header {
    border-bottom: 1px solid #f4f4f4;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .card-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .card-body p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
  
  .card-body p strong {
    color: #333;
  }
  
  .cancel-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .cancel-btn:hover {
    background-color: #e63939;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .cards-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .cards-container {
      grid-template-columns: 1fr;
    }
  }
  </style>
