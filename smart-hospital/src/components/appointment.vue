<template>
    <div v-if="departments && departments.length">
      <h1>{{ translations[currentLang].departmentTitle }}</h1>
      <form @submit.prevent="submitForm">
        <div v-for="department in departments" :key="department.id" class="department-form-section">
          <h2>{{ department.DoctorName || "Unnamed Department" }}</h2>
          <p><strong>{{ translations[currentLang].specialization }}:</strong> {{ department.Specialization }}</p>
          <p><strong>{{ translations[currentLang].availableTime }}:</strong> {{ department.Time }}</p>
  
          <label>
            <strong>{{ translations[currentLang].doctorName }}:</strong>
            <input type="text" v-model="appointmentDetails.doctorName" :placeholder="department.DoctorName" readonly />
          </label>
  
          <label>
            <strong>{{ translations[currentLang].specialization }}:</strong>
            <input type="text" v-model="appointmentDetails.specialization" :placeholder="department.Specialization" readonly />
          </label>
  
          <label>
            <strong>{{ translations[currentLang].availableTime }}:</strong>
            <input type="text" v-model="appointmentDetails.availableTime" :placeholder="department.Time" readonly />
          </label>
  
          <label>
            <strong>{{ translations[currentLang].bookNow }}:</strong>
            <button type="submit" @click="bookAppointment(department)">
              {{ translations[currentLang].bookNow }}
            </button>
          </label>
        </div>
      </form>
    </div>
  
    <div v-else class="nodoc">
      <h1>{{ translations[currentLang].departmentTitle }}</h1>
      <h3>No Doctors are Available</h3>
      <h3>Sorry</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Appointment',
    data() {
      return {
        currentLang: 'EN',
        translations: {
          EN: {
            departmentTitle: "Department of Thai Traditional Medicine",
            doctorName: "Doctor Name",
            specialization: "Specialization",
            availableTime: "Available Time",
            bookNow: "Book Now",
          },
          TH: {
            departmentTitle: "แผนกการแพทย์แผนไทย",
            doctorName: "ชื่อแพทย์",
            specialization: "ความชำนาญ",
            availableTime: "เวลาที่ให้บริการ",
            bookNow: "จองตอนนี้",
          },
        },
        departments: [],
        appointmentDetails: {
          doctorName: '',
          specialization: '',
          availableTime: '',
        }
      };
    },
    created() {
      this.fetchDepartments();
    },
    methods: {
      async fetchDepartments() {
        try {
          const response = await fetch("http://localhost:1337/api/department-of-thais");
          const data = await response.json();
          console.log("Fetched data:", data);
          this.departments = data.data || [];
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      },
      bookAppointment(department) {
        this.appointmentDetails = {
          doctorName: department.DoctorName,
          specialization: department.Specialization,
          availableTime: department.Time,
        };
      },
      submitForm() {
        alert(`Booking appointment with Dr. ${this.appointmentDetails.doctorName}`);
      }
    },
  };
  </script>
  
  <style scoped>
  .department-form-section {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin: 0.5rem 0;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .nodoc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .nodoc h1, .nodoc h3 {
    margin: 0.5rem 0;
  }
  </style>
  