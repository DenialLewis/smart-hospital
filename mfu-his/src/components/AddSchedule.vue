<template>
  <div class="add-schedule">
    <div class="schedule-card">

      <!-- Scheduling form for doctors -->
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

        <!-- Date and Time selection -->
        <div class="form-group">
          <label>Select the Date</label>
          <input type="date" v-model="selectedDate" required />
        </div>
        <div class="form-group">
          <label>Day of the Month</label>
          <input type="text" :value="dayOfWeek" readonly />
        </div>

        <!-- Time selection with validation -->
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

    <!-- Schedule table showing user schedules -->
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
          <tr v-for="schedule in schedules" :key="schedule.id">
            <td>{{ schedule.day }}</td>
            <td>{{ schedule.date }}</td>
            <td>{{ formatTime(schedule.start_time) }}</td>
            <td>{{ formatTime(schedule.end_time) }}</td>
          </tr>
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
  },
  data() {
    return {
      selectedDate: '',
      startTime: '',
      endTime: '',
      timeError: '',
      successMessage: '',
      userId: localStorage.getItem('userId') || null, // Fetch from storage if not passed as prop
      schedules: [], // Stores the user's schedule for displaying in the table
    };
  },
  computed: {
    dayOfWeek() {
      if (!this.selectedDate) return '';
      const date = new Date(this.selectedDate);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    },
  },
  methods: {
    async submitSchedule() {
      if (!this.selectedDate || !this.startTime || !this.endTime) {
        this.timeError = 'Please fill all fields.';
        return;
      }

      if (this.startTime >= this.endTime) {
        this.timeError = 'End time must be after start time.';
        return;
      } else {
        this.timeError = '';
      }

      if (!this.userId) {
        console.error('User ID is missing.');
        this.timeError = 'User ID is not available. Please log in again.';
        return;
      }

      const scheduleData = {
        data: {
          date: this.selectedDate,
          day: this.dayOfWeek,
          start_time: `${this.startTime}:00.000`,
          end_time: `${this.endTime}:00.000`,
          doctor: this.userId,
        },
      };

      try {
        const response = await axios.post('http://localhost:1337/api/doctor-schedules', scheduleData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        console.log('Schedule created:', response.data);
        this.successMessage = 'Schedule added successfully!';

        // Add the new schedule to the schedules array to display it immediately
        this.schedules.push({
          id: response.data.data.id,
          day: this.dayOfWeek,
          date: this.selectedDate,
          start_time: this.startTime,
          end_time: this.endTime,
        });

        this.resetForm();
      } catch (error) {
        console.error('Error creating schedule:', error);
        this.successMessage = 'There was an error creating the schedule. Please try again.';
      }
    },
    validateTime() {
      if (this.startTime && this.endTime) {
        if (this.startTime >= this.endTime) {
          this.timeError = 'End time must be after the start time.';
        } else {
          this.timeError = '';
        }
      }
    },
    resetForm() {
      this.selectedDate = '';
      this.startTime = '';
      this.endTime = '';
      this.timeError = '';
    },
    async fetchUserSchedules() {
      try {
        const response = await axios.get('http://localhost:1337/api/doctor-schedules', {
          params: {
            filters: {
              doctor: this.userId,
            },
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        this.schedules = response.data.data.map((item) => ({
          id: item.id,
          day: item.attributes.day,
          date: item.attributes.date,
          start_time: item.attributes.start_time,
          end_time: item.attributes.end_time,
        }));
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    },
    formatTime(time) {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  },
  mounted() {
    this.fetchUserSchedules();
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

