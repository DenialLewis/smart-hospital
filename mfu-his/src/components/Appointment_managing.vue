<template>
    <div class="appointments-container">
      <h1 class="page-title">Doctor's Appointments</h1>
  
      <!-- Date Picker to Select Week -->
      <div class="controls-container">
        <div class="date-picker">
          <label for="week-select">Select Week:</label>
          <vue3-datepicker v-model="selectedDate" :format="formatDate" />
        </div>
  
        <!-- Search Bar for Filtering Appointments -->
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by patient name"
            class="search-input"
          />
        </div>
      </div>
  
      <!-- Week Container for Appointments -->
      <div class="week-container">
        <div
          v-for="(dayAppointments, day) in filteredWeekAppointments"
          :key="day"
          class="day-card"
        >
          <h2 class="day-title">{{ day }}</h2>
          <div v-if="dayAppointments.length > 0">
            <ul class="appointments-list">
              <li
                v-for="(appointment, index) in dayAppointments"
                :key="index"
                class="appointment-item"
                @click="openPatientDetails(appointment)"
              >
                <div class="patient-info">
                  <span class="patient-name">{{ appointment.patientName }}</span>
                  <span class="appointment-time">{{ appointment.time }}</span>
                  <button class="status-button" :class="appointment.status">
                    {{ appointment.status }}
                  </button>
                  <button @click.stop="cancelAppointment(index, day)" class="cancel-button">
                    Cancel
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="free-text">No appointments today - Free</p>
          </div>
        </div>
      </div>
  
      <!-- Patient Details Modal -->
      <div v-if="showPatientModal" class="modal-overlay" @click="closePatientModal">
        <div class="modal-content" @click.stop>
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {{ selectedAppointment.patientName }}</p>
          <p><strong>Time:</strong> {{ selectedAppointment.time }}</p>
          <p><strong>Status:</strong> {{ selectedAppointment.status }}</p>
          <button @click="closePatientModal" class="close-modal-button">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Vue3Datepicker from "vue3-datepicker";
  
  export default {
    name: "AppointmentManaging",
    components: {
      Vue3Datepicker,
    },
    data() {
      return {
        selectedDate: new Date(),
        searchQuery: "",
        weekAppointments: {
          Monday: [
            { patientName: "John Doe", time: "10:00 AM", status: "confirmed" },
            { patientName: "Jane Smith", time: "11:30 AM", status: "completed" },
          ],
          Tuesday: [],
          Wednesday: [{ patientName: "Michael Johnson", time: "9:00 AM", status: "canceled" }],
          Thursday: [],
          Friday: [
            { patientName: "Emily Davis", time: "2:00 PM", status: "confirmed" },
            { patientName: "David Brown", time: "3:30 PM", status: "confirmed" },
          ],
          Saturday: [],
          Sunday: [],
        },
        showPatientModal: false,
        selectedAppointment: null,
      };
    },
    computed: {
      filteredWeekAppointments() {
        if (this.searchQuery) {
          const filteredAppointments = {};
          for (const [day, appointments] of Object.entries(this.weekAppointments)) {
            filteredAppointments[day] = appointments.filter((appointment) =>
              appointment.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
          }
          return filteredAppointments;
        }
        return this.weekAppointments;
      },
    },
    methods: {
      formatDate(date) {
        return date.toLocaleDateString("en-GB");
      },
      openPatientDetails(appointment) {
        this.selectedAppointment = appointment;
        this.showPatientModal = true;
      },
      closePatientModal() {
        this.showPatientModal = false;
        this.selectedAppointment = null;
      },
      cancelAppointment(index, day) {
        this.weekAppointments[day].splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  /* General container styles */
  .appointments-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
    font-family: "Roboto", sans-serif;
    background: #f3f6f9;
    border-radius: 8px;
  }
  
  /* Page title */
  .page-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  /* Controls Container */
  .controls-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Date Picker */
  .date-picker label {
    margin-right: 10px;
    color: #333;
    font-weight: 500;
  }
  
  /* Search Bar */
  .search-input {
    width: 100%;
    max-width: 280px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    transition: box-shadow 0.3s;
  }
  
  .search-input:focus {
    box-shadow: 0px 0px 5px rgba(0, 128, 255, 0.5);
  }
  
  /* Week container */
  .week-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 15px;
  }
  
  /* Each day's card */
  .day-card {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .day-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  /* Day title */
  .day-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #2b2b2b;
    margin-bottom: 10px;
  }
  
  /* Appointment list */
  .appointments-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .appointment-item {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fafafa;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .patient-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  /* Patient name and appointment time */
  .patient-name {
    font-weight: bold;
    color: #333;
  }
  .appointment-time {
    font-style: italic;
    color: #666;
  }
  
  /* Status button */
  .status-button {
    padding: 5px 8px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    border: none;
    cursor: default;
  }
  .status-button.confirmed {
    background-color: #4caf50;
  }
  .status-button.completed {
    background-color: #2196f3;
  }
  .status-button.canceled {
    background-color: #f44336;
  }
  
  /* Cancel Button */
  .cancel-button {
    background-color: #ff8a80;
    color: #fff;
    border: none;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-button:hover {
    background-color: #ff5252;
  }
  
  /* Free text when no appointments */
  .free-text {
    font-size: 1rem;
    color: #4caf50;
    text-align: center;
    padding: 8px;
    background-color: #e8f5e9;
    border-radius: 6px;
  }
  
  /* Modal for Patient Details */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .close-modal-button {
    margin-top: 15px;
    padding: 10px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .close-modal-button:hover {
    background-color: #d32f2f;
  }
  </style>
  