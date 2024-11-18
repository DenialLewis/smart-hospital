<!-- <template>
  <div class="form-wrapper">
    <div class="appointment-container">
      <h1>Manage Appointments</h1>

      <div v-if="loading" class="loading-spinner">
        <p>Loading appointments...</p>
      </div>

      <div v-else>
        <h2>Your Appointments</h2>
        <div v-if="appointments.length > 0" class="appointments-list">
          <div v-for="appointment in appointments" :key="appointment.id" class="appointment-card">
            <h3>Appointment Details</h3>
            <p><strong>Doctor Name:</strong> {{ appointment.attributes.doctor_names?.data[0]?.attributes?.username  || "Not Provided" }}</p>
            <p><strong>Patient Name:</strong> {{ appointment.attributes.first_name }} {{ appointment.attributes.last_name }}</p>
            <p><strong>Symptom:</strong> {{ appointment.attributes.symptom }}</p>
            <p><strong>Date:</strong> {{ formatDate(appointment.attributes.date) }}</p>
            <p><strong>Day:</strong> {{ appointment.attributes.day }}</p>
            <p><strong>Time:</strong> {{ formatTime(appointment.attributes.appointment_time) }}</p>
            <p><strong>Gender:</strong> {{ appointment.attributes.gender }}</p>
            <p><strong>Date of Birth:</strong> {{ formatDate(appointment.attributes.date_of_birth) }}</p>
            <p><strong>Phone:</strong> {{ appointment.attributes.phone_num }}</p>
            <p><strong>Nationality:</strong> {{ appointment.attributes.nationality }}</p>
            <p><strong>NCID/Passport:</strong> {{ appointment.attributes.ncid_passport }}</p>
            <div class="appointment-actions">
              <button class="btn cancel-btn">Cancel Appointment</button>
              <button class="btn reschedule-btn">Reschedule</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No appointments found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AppointmentManaging',
  data() {
    return {
      appointments: [], // Holds the fetched appointment data
      loading: true, // Flag to show loading spinner
    };
  },
  async mounted() {
    await this.fetchAppointments(); // Fetch appointments on component mount
  },
  methods: {
    async fetchAppointments() {
      const token = localStorage.getItem('jwtToken'); // Get JWT token for authentication
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          'http://localhost:1337/api/doctor-appointments?populate=*',
          { headers }
        );
        this.appointments = response.data.data; // Assuming the data is in response.data.data
      } catch (error) {
        console.error('Error fetching appointments:', error.response?.data || error.message);
        alert(`Failed to fetch appointments: ${error.response?.data?.error?.message || "Please try again."}`);
      } finally {
        this.loading = false; // Hide loading spinner after fetching data
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options); // Format date
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`; // Format time
    },
  },
};
</script> -->

<template>
  <div class="form-wrapper">
    <div class="appointment-container">
      <h1>Manage Appointments</h1>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-spinner">
        <p>Loading appointments...</p>
      </div>

      <!-- Appointment List -->
      <div v-else>
        <h2>Your Doctor Appointments</h2>
        <div v-if="appointments.length > 0" class="appointments-list">
          <div v-for="appointment in appointments" :key="appointment.id" class="appointment-card">
            <h3>Appointment Details</h3>
            <p><strong>Doctor Name:</strong> {{ appointment.doctor_names || "Not Provided" }}</p>
            <p><strong>Patient Name:</strong> {{ appointment.first_name }} {{ appointment.last_name }}</p>
            <p><strong>Symptom:</strong> {{ appointment.symptom || "Not Provided" }}</p>
            <p><strong>Date:</strong> {{ formatDate(appointment.date) }}</p>
            <p><strong>Day:</strong> {{ appointment.day }}</p>
            <p><strong>Time:</strong> {{ formatTime(appointment.appointment_time) }}</p>
            <p><strong>Gender:</strong> {{ appointment.gender }}</p>
            <p><strong>Date of Birth:</strong> {{ formatDate(appointment.date_of_birth) }}</p>
            <p><strong>Phone:</strong> {{ appointment.phone_num }}</p>
            <p><strong>Nationality:</strong> {{ appointment.nationality }}</p>
            <p><strong>NCID/Passport:</strong> {{ appointment.ncid_passport }}</p>
            <div class="appointment-actions">
              <button class="btn cancel-btn" @click="cancelAppointment(appointment.id)">Cancel Appointment</button>
              <button class="btn reschedule-btn">Reschedule</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No doctor appointments found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppointmentManaging',
  data() {
    return {
      appointments: [], // Holds the fetched appointment data
      loading: true, // Flag to show loading spinner
    };
  },
  async mounted() {
    await this.fetchAppointments(); // Fetch appointments on component mount
  },
  methods: {
    async fetchAppointments() {
      const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
      if (!userId) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:1337/api/doctor-appointments?populate=*&filters[doctor_names][id][$eq]=${userId}`);
        // Filter appointments where the patient's ID matches the logged-in user
        this.appointments = response.data.data.map(appointment => ({
          id: appointment.id,
          date: appointment.attributes.date,
          day: appointment.attributes.day,
          first_name: appointment.attributes.first_name,
          last_name: appointment.attributes.last_name,
          symptom: appointment.attributes.symptom,
          appointment_time: appointment.attributes.appointment_time,
          gender: appointment.attributes.gender,
          date_of_birth: appointment.attributes.date_of_birth,
          phone_num: appointment.attributes.phone_num,
          nationality: appointment.attributes.nationality,
          ncid_passport: appointment.attributes.ncid_passport,
          doctor_names: appointment.attributes.doctor_names?.data[0]?.attributes?.username || 'Not Provided', // Assuming doctor names are in this structure
        }));
      } catch (error) {
        console.error('Error fetching appointments:', error.response?.data || error.message);
        alert(`Failed to fetch appointments: ${error.response?.data?.error?.message || "Please try again."}`);
      } finally {
        this.loading = false; // Hide loading spinner after fetching data
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options); // Format date
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`; // Format time
    },
    cancelAppointment(appointmentId) {
      // Implement the logic for canceling the appointment (you might need to use axios.delete)
      console.log(`Cancelling appointment with ID: ${appointmentId}`);
    },
  },
};
</script>


<style scoped>
.form-wrapper {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.appointment-container {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.appointment-container h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.appointments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.appointment-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.appointment-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #4a4a4a;
}

.appointment-card p {
  font-size: 14px;
  margin: 5px 0;
  color: #666;
}

.appointment-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.reschedule-btn {
  background-color: #4caf50;
  color: white;
}

.loading-spinner {
  text-align: center;
  font-size: 18px;
  color: #888;
}

@media (max-width: 768px) {
  .appointments-list {
    flex-direction: column;
  }

  .appointment-card {
    width: 100%;
  }
}
</style>
