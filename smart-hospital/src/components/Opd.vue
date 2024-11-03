<template>
    <div v-if="departments && departments.length">
      <h1>{{ translations[currentLang].departmentTitle }}</h1>
      <table>
        <thead>
          <tr>
            <th>{{ translations[currentLang].doctorName }}</th>
            <th>{{ translations[currentLang].specialization }}</th>
            <th>{{ translations[currentLang].availableTime }}</th>
            <th>{{ translations[currentLang].bookNow }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="department in departments" :key="department.id">
            <td>
              <a href="#" @click.prevent="showDoctorDetails(department)">
                {{ department.DoctorName || "Unnamed Department" }}
              </a>
            </td>
            <td>{{ department.Specialization }}</td>
            <td>{{ department.Time }}</td>
            <td>
              <button @click="bookAppointment(department)">
                {{ translations[currentLang].bookNow }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="nodoc">
      <h1>{{ translations[currentLang].departmentTitle }}</h1>
      <h3>No Doctors are Available</h3>
      <h3>Sorry</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'opd',
    data() {
      return {
        currentLang: 'EN',
        translations: {
          EN: {
            departmentTitle: "Outpatient Clinic",
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
      };
    },
    created() {
      this.fetchDepartments();
    },
    methods: {
      async fetchDepartments() {
        try {
          const response = await fetch("http://localhost:1337/api/opds");
          const data = await response.json();
          console.log("Fetched data:", data);
          this.departments = data.data || [];
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      },
      bookAppointment(doctor) {
        alert(`Booking appointment with ${doctor.DoctorName}`);
      },
      showDoctorDetails(doctor) {
        alert(`Showing details for ${doctor.DoctorName}`);
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  a {
    color: #1a73e8;
    text-decoration: none;
    cursor: pointer;
  }
  
  a:hover {
    text-decoration: underline;
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
  
  /* Centering styles for nodoc message */
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
  