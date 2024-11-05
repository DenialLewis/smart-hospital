<!-- <template>
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
                {{ department.attributes.DoctorName || "Unnamed Department" }}
              </a>
            </td>
            <td>{{ department.attributes.Specialization }}</td>
            <td>{{ department.attributes.Time }}</td>
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
          console.log("Fetched data:", JSON.stringify(data, null, 2));
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
  </script> -->

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
          <tr v-for="doctor in doctors" :key="doctor.id">
            <td>
              <a href="#" @click.prevent="showDoctorDetails(doctor)">
                {{ doctor.username || "Unnamed Doctor" }}
              </a>
            </td>
            <td>{{ doctor.specialization }}</td>
            <td>{{ doctor.time }}</td>
            <td>
              <button @click="bookAppointment(doctor)">
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
    name: 'thaiMedicine',
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
        doctors: [], // Array to store doctors for display
      };
    },
    created() {
      this.fetchDepartments();
    },
    methods: {
      // async fetchDepartments() {
      //   try {
      //     const response = await fetch("http://localhost:1337/api/departments?populate=doctors");
      //     const data = await response.json();
      //     console.log("Fetched data:", data);
      //     this.departments = data.data || [];
  
      //     // Extract doctors from each department
      //     this.doctors = this.departments.flatMap(dept => dept.attributes.doctors.data.map(doc => ({
      //       id: doc.id,
      //       username: doc.attributes.username,
      //       specialization: doc.attributes.specialization,
      //       time: doc.attributes.time,
      //     })));
      //   } catch (error) {
      //     console.error("Error fetching departments:", error);
      //   }
      // },
      async fetchDepartments() {
        try {
          const response = await fetch(`http://localhost:1337/api/departments/4?populate=doctors`);
          const data = await response.json();
          console.log("Fetched data:", data);
  
          const departmentData = data.data;
          if (departmentData) {
            this.departments = [departmentData]; // Wrap single department in array for easy handling
            this.doctors = departmentData.attributes.doctors.data.map(doc => ({
              id: doc.id,
              username: doc.attributes.username,
              specialization: doc.attributes.specialization,
              time: doc.attributes.time,
            }));
          }
        } catch (error) {
          console.error("Error fetching department:", error);
        }
      },
      bookAppointment(doctor) {
        alert(`Booking appointment with ${doctor.username}`);
      },
      showDoctorDetails(doctor) {
        alert(`Showing details for ${doctor.username}`);
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
  