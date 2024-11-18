<template>
  <div v-if="doctors && doctors.length" class="scheduletable">
    <h1>{{ translations[currentLang].departmentTitle }}</h1>
    <table>
      <thead>
        <tr>
          <th>{{ translations[currentLang].doctorId }}</th>
          <th>{{ translations[currentLang].doctorName }}</th>
          <th>{{ translations[currentLang].specialization }}</th>
          <th>{{ translations[currentLang].date }}</th>
          <th>{{ translations[currentLang].day }}</th>
          <th>{{ translations[currentLang].startTime }}</th>
          <th>{{ translations[currentLang].endTime }}</th>
          <th>{{ translations[currentLang].bookNow }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in doctors" :key="doctor.id">
          <td>{{ doctor.userId }}</td>
          <td>{{ doctor.username || "Unnamed Doctor" }}</td>
          <td>{{ doctor.specialization || "N/A" }}</td>
          <td>{{ doctor.schedule.date }}</td>
          <td>{{ doctor.schedule.day }}</td>
          <td>{{ doctor.schedule.start_time }}</td>
          <td>{{ doctor.schedule.end_time }}</td>
          <td>
            <button @click="openPopup(doctor)">
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

  <!-- Popup Component -->
  <AppointmentPopUp 
    :doctor="selectedDoctor" 
    :isVisible="isPopupVisible" 
    @update:isVisible="isPopupVisible = $event"
    @bookAppointment="bookAppointment" />

</template>

<script>
import AppointmentPopUp from './AppointmentPopUp.vue';
export default {
  name: 'thaiMedicine',
  components: {
    AppointmentPopUp, 
  },
  data() {
    return {
      currentLang: 'EN',
      translations: {
        EN: {
          departmentTitle: "Department of Thai Traditional Medicine",
          doctorId: "id",
          doctorName: "Doctor Name",
          specialization: "Specialization",
          date: "Date",
          day: "Day",
          startTime: "Start Time",
          endTime: "End Time",
          bookNow: "Book Now",
        },
        TH: {
          departmentTitle: "แผนกการแพทย์แผนไทย",
          doctorName: "ชื่อแพทย์",
          specialization: "ความชำนาญ",
          date: "วันที่",
          day: "วัน",
          startTime: "เวลาที่เริ่ม",
          endTime: "เวลาสิ้นสุด",
          bookNow: "จองตอนนี้",
        },
      },
      doctors: [], // Array to store doctors with their schedules
      isPopupVisible: false, // State to control the visibility of the popup
      selectedDoctor: null, // Doctor selected for the appointment
    };
  },
  created() {
    this.fetchDepartments();
  },
  methods: {
    async fetchDepartments() {
      try {
        // Fetch doctor schedules with populated departments
        const response = await fetch('http://localhost:1337/api/doctor-schedules?populate=doctor.departments');
        const data = await response.json();

        if (data.data) {
          // Filter schedules to only include doctors from the "Thai Medicine" department
          this.doctors = data.data
            .filter(schedule =>
              schedule.attributes.doctor.data.attributes.departments.data.some(
                department => department.attributes.department_name === 'Thai Medicine'
              )
            )
            .map(schedule => ({
              id: schedule.id,
              userId: schedule.attributes.doctor.data.id,
              username: schedule.attributes.doctor.data.attributes.username,
              specialization: schedule.attributes.doctor.data.attributes.specialization,
              schedule: {
                date: schedule.attributes.date,
                day: schedule.attributes.day,
                start_time: schedule.attributes.start_time,
                end_time: schedule.attributes.end_time,
              },
            }));

            

        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },
    openPopup(doctor) {
      alert(`Selected Schedule Info:\n\nID: ${doctor.id}\nSelected doctor id: ${doctor.userId}\n Name: ${doctor.username}\nSpecialization: ${doctor.specialization}\nDate: ${doctor.schedule.date}\nDay: ${doctor.schedule.day}\nStart Time: ${doctor.schedule.start_time}\nEnd Time: ${doctor.schedule.end_time}`);

      this.selectedDoctor = doctor;
      this.isPopupVisible = true;
    },
    bookAppointment(doctor) {
      alert(`Appointment confirmed with Dr. ${doctor.username}`);
      this.isPopupVisible = false; // Close the popup after booking
    },
  },
};
</script>



<style scoped>
.scheduletable {
  font-family: Arial, Helvetica, sans-serif;
  height: 40vh;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-bottom: 2rem;
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
  font-family: Arial, Helvetica, sans-serif;
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

