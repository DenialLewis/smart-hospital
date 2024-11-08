<template>
  <div class="add-schedule">
    <div class="schedule-card">

      <!--scheduling adding forms by the doctors-->
      <form v-if="isLoggedIn" @submit.prevent="submitSchedule">
        <h2>Add Doctor Schedule</h2>

        <!-- Display Doctor Name, Specialization, Department with Username -->
        <div class="form-group">
          <label for="username">Doctor Name</label>
          <input type="text" id="username" :value="username" readonly placeholder="Doctor Name" />
        </div>
        <div class="form-group">
          <label for="specialization">Specialization</label>
          <input type="text" id="specialization" :value="specialization" readonly placeholder="Specialization" />
        </div>
        <div class="form-group">
          <label for="department">Department</label>
          <input type="text" id="department" :value="department" readonly placeholder="Department" />
        </div>

        <!--Doctor filling the date and time-->
        <!--<div class="form-group">
          <label>Available Days</label>
          <div class="day-checkboxes">
            <div v-for="day in days" :key="day" class="checkbox-item">
              <input type="checkbox" :id="day" :value="day" v-model="selectedDays" />
              <label :for="day">{{ day }}</label>
            </div>
          </div>
        </div>-->

        <div class="form-group">
          <label>Select the Date</label>
          <input type="date" v-model="selectedDate" required/>
        </div>
        <div class="form-group">
          <label>Day of the Month</label>
          <input type="text" :value="dayOfWeek" readonly />
        </div>

        <!--making sure end time is after the start time-->
        <div>
          <div class="form-group">
            <label for="startTime">Start Time</label>
            <input type="time" id="startTime" v-model="startTime" @change="validateTime" required />
          </div>
          
          <div class="form-group">
            <label for="endTime">End Time</label>
            <input type="time" id="endTime" v-model="endTime" @change="validateTime" required />
          </div>
          <p v-if="timeError" class="error-message">{{ timeError }}</p>
        </div>

        
        
        <button type="submit" class="submit-button">Submit Schedule</button>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      </form>
      <form v-else class="login-warning">Please Log in First</form>
    </div>
    <div class="schedule-card">
      <table class="schedule-table">
    <thead>
      <tr>
        <th>Day</th>
        <th>Date</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Monday</td>
        <td>2024-11-06</td>
        <td>09:00 AM</td>
        <td>05:00 PM</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>2024-11-07</td>
        <td>09:00 AM</td>
        <td>05:00 PM</td>
      </tr>
      <!-- Add more rows as needed -->
    </tbody>
  </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddSchedule',
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    specialization: {
    type: String,
    required: true,
    },
    department: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: Number,
    //   required: true,
    // },
  },
  data() {
    return {
      // specialization: '',
      // department: '',
      selectedDays: [],
      selectedDate: '',
      startTime: '',
      endTime: '',
      timeError: '',
      successMessage: '',
      // days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      // departments: [
      //   'Department of Thai Traditional Medicine',
      //   'Department of Chinese Medicine',
      //   'Physical Therapy Department',
      //   'Outpatient Clinic',
      // ],
      userId: localStorage.getItem('userId') || null,  // fetch from storage if not passed as prop

    };
  },
  computed: {
    dayOfWeek() {
      if (!this.selectedDate) return ''; // Return empty if no date selected
      
      const date = new Date(this.selectedDate); // Convert the selected date to a Date object
      
      // Define array to map day indices to day names
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      // Return the day name based on the selected date
      return days[date.getDay()];
    }
  },
  methods: {
    // async submitSchedule() {
    //   try {
    //     // Prepare schedule data
    //     const scheduleData = {
    //       day: this.dayOfWeek,
    //       date: this.selectedDate,
    //       start_time: this.startTime,
    //       end_time: this.endTime,
    //       doctor: this.username,
    //     };

    //     // Make API request to save the schedule in Strapi
    //     await axios.post(
    //       'http://localhost:1337/api/doctor-schedules', 
    //       { data: scheduleData },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    //         }
    //       }
    //     );

    //     // Display success message and reset form
    //     this.successMessage = 'Schedule added successfully!';
    //     this.resetForm();
    //   } catch(error){
    //     console.error('Failed to submit schedule:', error);
    //     this.timeError = 'An error occurred. Please try again.';
    //   }
    //   // console.log('Doctor Name:', this.username);
    //   // // console.log('Specialization:', this.specialization);
    //   // // console.log('Department:', this.department);
    //   // console.log('Selected Days:', this.selectedDays);
    //   // console.log('Start Time:', this.startTime);
    //   // console.log('End Time:', this.endTime);

    //   // this.successMessage = 'Schedule added successfully!';
      
    //   // // this.specialization = '';
    //   // // this.department = '';
    //   // this.selectedDays = [];
    //   // this.startTime = '';
    //   // this.endTime = '';
    // },
    async submitSchedule() {
      // Ensure that all required fields are filled
      if (!this.selectedDate || !this.startTime || !this.endTime) {
        this.timeError = 'Please fill all fields.';
        return;
      }

      // Make sure start time is before end time
      if (this.startTime >= this.endTime) {
        this.timeError = 'End time must be after start time.';
        return;
      } else {
        this.timeError = '';
      }

      // Ensure userId is valid and passed
    if (!this.userId) {
      console.error('User ID is missing.');
      this.timeError = 'User ID is not available. Please log in again.';
      return;
    }

      // Prepare the data for the request
      const scheduleData = {
        data: {
          date: this.selectedDate, 
          day: this.dayOfWeek, 
          start_time: `${this.startTime}:00.000`, 
          end_time: `${this.endTime}:00.000`, 
          doctor: this.userId, // Use the logged-in user's ID here
        },
      };

      try {
        // Send the request to Strapi to create the doctor schedule
        const response = await axios.post('http://localhost:1337/api/doctor-schedules', scheduleData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        console.log('Schedule created:', response.data);
        this.successMessage = 'Schedule added successfully!';
        
        // Reset form data after submission
        this.selectedDate = '';
        this.startTime = '';
        this.endTime = '';
      } catch (error) {
        console.error('Error creating schedule:', error);
        this.successMessage = 'There was an error creating the schedule. Please try again.';
      }
    },
    validateTime() {
      // Ensure both times are selected before validating
      if (this.startTime && this.endTime) {
        // Compare start and end times
        if (this.startTime >= this.endTime) {
          this.timeError = 'End time must be after the start time.';
        } else {
          this.timeError = ''; // Clear error if validation passes
        }
      }
    },
    // mounted() {
    //   console.log('Specialization:', this.specialization);
    //   console.log('Department:', this.department);
    // }
    resetForm() {
      this.selectedDate = '';
      this.startTime = '';
      this.endTime = '';
      this.timeError = '';
      this.selectedDays = [];
    }

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


.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th, .schedule-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.schedule-table th {
  background-color:  #6EC5C1;
  color: white;
}

.schedule-table tbody tr:hover {
  background-color: #f1f1f1;
}

.login-warning {
  text-align: center;
  color: #e74c3c;
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

input[readonly] {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.day-checkboxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkbox-item {
  width: 48%;
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

