<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup-content">
        <h2>Book Appointment</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppointmentPopup',
    props: {
      doctor: Object,
      isVisible: Boolean
    },
    methods: {
      closePopup() {
        this.$emit('update:isVisible', false);
      },
      confirmBooking() {
        this.$emit('bookAppointment', this.doctor);
        this.$emit('update:isVisible', false);
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background: white;
    padding: 2rem;
    border-radius: 5px;
    width: 300px;
    text-align: center;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  