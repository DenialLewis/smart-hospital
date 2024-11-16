<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup-content">
        <button 
          aria-label="Close account form" 
          class="close-btn" 
          @click="closePopup"
        >
          <span class="close-icon">✖</span>
        </button>
        <h2>Book Appointment</h2>
        <!-- Your other appointment content goes here -->
        <button @click="confirmBooking">Confirm Appointment</button>
      </div>
    </div>
</template>
  
  
<script>
export default {
  name: 'AppointmentPopUp',
  props: {
    doctor: Object,
    isVisible: Boolean
  },
  methods: {
    closePopup() {
      // Emit an event to close the popup
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
  position: relative; /* This ensures the close button is positioned relative to the popup */
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

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.close-btn:hover {
  background-color: #B5DEE0;
  color: #000000;
}
</style>
