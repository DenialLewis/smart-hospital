<template>
    <div class="add-schedule">
      <div class="schedule-card">
        <h2 v-if="isLoggedIn">Add Doctor Schedule</h2>
        <div v-else class="login-warning">Please Log in First</div>
        <form v-if="isLoggedIn" @submit.prevent="submitSchedule">
          <div class="form-group">
            <label for="doctorName">Doctor Name</label>
            <input type="text" id="doctorName" v-model="doctorName" placeholder="Enter doctor name" required />
          </div>
          <div class="form-group">
            <label for="specialization">Specialization</label>
            <input type="text" id="specialization" v-model="specialization" placeholder="Enter specialization" required />
          </div>
          <div class="form-group">
            <label for="scheduleDay">Schedule Day</label>
            <select id="scheduleDay" v-model="scheduleDay" required>
              <option value="" disabled>Select a day</option>
              <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="scheduleTime">Schedule Time</label>
            <input type="time" id="scheduleTime" v-model="scheduleTime" required />
          </div>
          <button type="submit" class="submit-button">Submit Schedule</button>
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddSchedule',
    props: {
      isLoggedIn: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        doctorName: '',
        specialization: '',
        scheduleDay: '',
        scheduleTime: '',
        successMessage: '',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      };
    },
    methods: {
      submitSchedule() {
        console.log('Doctor Name:', this.doctorName);
        console.log('Specialization:', this.specialization);
        console.log('Schedule Day:', this.scheduleDay);
        console.log('Schedule Time:', this.scheduleTime);
        this.successMessage = 'Schedule added successfully!';
        this.doctorName = '';
        this.specialization = '';
        this.scheduleDay = '';
        this.scheduleTime = '';
      },
    },
  };
  </script>
   <style scoped>
   .add-schedule {
     display: flex;
     justify-content: center;
     align-items: center;
     min-height: 100vh;
     background-color: #f5f8fa;
   }
   
   .schedule-card {
     background: white;
     padding: 20px 30px;
     border-radius: 12px;
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
     width: 100%;
     max-width: 400px;
   }
   
   h2 {
     text-align: center;
     color: #34495e;
     margin-bottom: 20px;
   }
   
   .login-warning {
     text-align: center;
     color: #e74c3c; /* Red color for warning */
     font-weight: bold;
   }
   
   .form-group {
     margin-bottom: 15px;
   }
   
   label {
     display: block;
     margin-bottom: 8px;
     font-weight: bold;
     color: #34495e;
   }
   
   input[type="text"],
   input[type="time"],
   select {
     width: 100%;
     padding: 10px;
     border: 1px solid #dcdcdc;
     border-radius: 8px;
     transition: border-color 0.3s;
   }
   
   input[type="text"]:focus,
   input[type="time"]:focus,
   select:focus {
     border-color: #6EC5C1;
     outline: none;
   }
   
   .submit-button {
     width: 100%;
     padding: 10px;
     background-color: #6EC5C1;
     color: white;
     border: none;
     border-radius: 8px;
     font-size: 16px;
     font-weight: bold;
     cursor: pointer;
     transition: background-color 0.3s;
   }
   
   .submit-button:hover {
     background-color: #55a8e0;
   }
   
   .success-message {
     margin-top: 15px;
     color: #28a745;
     text-align: center;
     font-weight: bold;
   }
   </style>
   