<template>
  <div class="appointment-container">
      <h1>Make an Appointment</h1>

      <!-- Type of Appointment Selection -->
      <section class="appointment-type">
          <h2>What kind of appointment are you making?</h2>
          <select v-model="selectedAppointmentType">
              <option disabled value="">Please select an appointment type</option>
              <option>Doctor Appointment</option>
              <option>Health Checkup</option>
              <option>Vaccination</option>
              <option>Consultation</option>
          </select>
      </section>

      <!-- Field of Medicine Selection -->
      <section v-if="selectedAppointmentType" class="medicine-field">
          <h2>Select the Field of Medicine</h2>
          <select v-model="selectedFieldOfMedicine">
              <option disabled value="">Please select a field</option>
              <option>General Medicine</option>
              <option>Dentistry</option>
              <option>Pediatrics</option>
              <option>Ophthalmology</option>
              <option>Dermatology</option>
              <option>Cardiology</option>
          </select>
      </section>

      <!-- Doctor Selection -->
      <section v-if="selectedFieldOfMedicine" class="doctor-selection">
          <h2>Would you like a specific doctor or a recommendation?</h2>
          <div class="doctor-options">
              <label>
                  <input type="radio" value="specific" v-model="doctorPreference">
                  Choose a specific doctor
              </label>
              <label>
                  <input type="radio" value="recommended" v-model="doctorPreference">
                  Get a recommended doctor
              </label>
          </div>

          <!-- Specific Doctor Selection -->
          <div v-if="doctorPreference === 'specific'" class="specific-doctor">
              <label for="doctorSelect">Choose a Doctor</label>
              <select v-model="selectedDoctor">
                  <option disabled value="">Select a doctor</option>
                  <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.name">
                      {{ doctor.name }} - {{ doctor.specialty }}
                  </option>
              </select>
          </div>
      </section>

      <!-- Date Selection -->
      <section v-if="selectedFieldOfMedicine" class="date-selection">
          <h2>Select Date</h2>
          <input type="date" v-model="selectedDate" :min="minDate" />
      </section>

      <!-- Time Slot Selection -->
      <section v-if="selectedDate" class="time-slot">
          <h2>Select a Time Slot</h2>
          <h3>Morning</h3>
          <div>
              <label>
                  <input type="radio" value="09:00 - 10:00" v-model="selectedTimeSlot"> 09:00 - 10:00
              </label>
              <label>
                  <input type="radio" value="10:00 - 11:00" v-model="selectedTimeSlot"> 10:00 - 11:00
              </label>
              <label>
                  <input type="radio" value="11:00 - 12:00" v-model="selectedTimeSlot"> 11:00 - 12:00
              </label>
          </div>
          <h3>Afternoon</h3>
          <div>
              <label>
                  <input type="radio" value="13:00 - 14:00" v-model="selectedTimeSlot"> 13:00 - 14:00
              </label>
              <label>
                  <input type="radio" value="14:00 - 15:00" v-model="selectedTimeSlot"> 14:00 - 15:00
              </label>
              <label>
                  <input type="radio" value="15:00 - 16:00" v-model="selectedTimeSlot"> 15:00 - 16:00
              </label>
          </div>
      </section>

      <!-- Symptoms Text Area -->
      <section v-if="selectedTimeSlot" class="symptoms">
          <h2>Describe Your Symptoms (Optional)</h2>
          <textarea v-model="symptomsDescription" placeholder="Describe any symptoms or concerns..."></textarea>
      </section>

      <!-- Patient Information Section -->
      <section v-if="selectedTimeSlot" class="patient-info">
          <h2>Patient Information</h2>
          <label>Title</label>
          <select v-model="patientInfo.title">
              <option disabled value="">Select your title</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
          </select>
          

          <label>First Name</label>
          <input type="text" v-model="patientInfo.firstName" placeholder="Enter your first name" />

          <label>Last Name</label>
          <input type="text" v-model="patientInfo.lastName" placeholder="Enter your last name" />

          <label>Gender</label>
          <select v-model="patientInfo.gender">
              <option disabled value="">Select your gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
          </select>

          <label>Date of Birth</label>
          <input type="date" v-model="patientInfo.dob" :max="minDate" />

          <label>Phone Number</label>
          <input type="tel" v-model="patientInfo.phone" placeholder="Enter your phone number" />

          <<!-- Nationality Dropdown -->
          <label>Nationality</label>
          <select v-model="patientInfo.nationality">
              <option disabled value="">Please select your nationality</option>
              <option v-for="nationality in nationalities" :key="nationality" :value="nationality">
                  {{ nationality }}
              </option>
          </select>
        
          <label>National ID or Passport Number</label>
          <input type="text" v-model="patientInfo.idNumber" placeholder="Enter your ID or Passport number" />
      
        </section>

      <!-- Submit Button -->
      <button v-if="canSubmit" @click="submitAppointment" class="btn-submit">
          Confirm request
      </button>
  </div>
</template>

<<script>
export default {
  data() {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0]; // Minimum date is today

    return {
        selectedAppointmentType: '',
        selectedFieldOfMedicine: '',
        doctorPreference: '',
        selectedDoctor: '',
        selectedDate: '',
        selectedTimeSlot: '',
        symptomsDescription: '',
        minDate: minDate,
        patientInfo: {
            title: '',
            firstName: '',
            lastName: '',
            gender: '',
            dob: '',
            phone: '',
            nationality: '',
            idNumber: ''
        },
        nationalities: [
            "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", 
            "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", 
            "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "Bruneian", 
            "Bulgarian", "Burkinabe", "Burundian", "Cabo Verdean", "Cambodian", "Cameroonian", "Canadian", "Central African", 
            "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", 
            "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Ecuadorian", "Egyptian", "Salvadoran", "Equatorial Guinean", 
            "Eritrean", "Estonian", "Eswatini", "Ethiopian", "Fijian", "Finnish", "French", "Gabonese", "Gambian", "Georgian", 
            "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean", "Guinea-Bissauan", "Guyanese", "Haitian", 
            "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", 
            "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kiribati", "North Korean", "South Korean", "Kuwaiti", 
            "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Basotho", "Liberian", "Libyan", "Liechtenstein", "Lithuanian", 
            "Luxembourgish", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", 
            "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Montenegrin", "Moroccan", 
            "Mozambican", "Namibian", "Nauruan", "Nepali", "Dutch", "New Zealander", "Nicaraguan", "Nigerien", "Nigerian", 
            "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", 
            "Filipino", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Kitts and Nevis", 
            "Saint Lucian", "Saint Vincentian", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Senegalese", "Serbian", 
            "Seychellois", "Sierra Leonean", "Singaporean", "Slovak", "Slovene", "Solomon Islander", "Somali", "South African", 
            "South Sudanese", "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swedish", "Swiss", "Syrian", "Taiwanese", 
            "Tajik", "Tanzanian", "Thai", "Timorese", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", 
            "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", "Emirati", "British", "Uruguayan", "Uzbek", "Vanuatuan", 
            "Vatican", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
        ],
        doctors: [
            { id: 1, name: 'Dr. John Smith', specialty: 'General Medicine' },
            { id: 2, name: 'Dr. Emily Doe', specialty: 'Pediatrics' },
            { id: 3, name: 'Dr. Sarah Lee', specialty: 'Dentistry' },
            { id: 4, name: 'Dr. Michael Brown', specialty: 'Ophthalmology' },
        ]
    };
  },
  computed: {
    canSubmit() {
        // Check if all the necessary fields are filled
        return (
            this.selectedAppointmentType &&
            this.selectedFieldOfMedicine &&
            this.selectedDate &&
            this.selectedTimeSlot &&
            this.patientInfo.firstName &&
            this.patientInfo.lastName &&
            this.patientInfo.phone &&
            this.patientInfo.nationality &&
            this.patientInfo.idNumber
        );
    }
  },
  methods: {
      submitAppointment() {
          // Handle appointment submission (e.g., API call or redirect)
          alert(`Appointment submitted successfully for ${this.selectedDate} at ${this.selectedTimeSlot}!\nPatient: ${this.patientInfo.firstName} ${this.patientInfo.lastName}`);
      }
  }
};
</script>

<style scoped>
.appointment-container {
  padding: 20px;
}

h1 {
  color: #333;
}

section {
  margin-bottom: 20px;
}

select, input[type="date"], input[type="text"], input[type="tel"], .btn-submit, textarea {
  padding: 10px;
  margin-top: 10px;
  width: 100%;
}

textarea {
  width: 100%;
  min-height: 80px;
  resize: vertical;
}

.doctor-options label {
  display: inline-block;
  margin-right: 15px;
}

.time-slot div {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.btn-submit {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>