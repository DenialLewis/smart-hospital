<template>
    <div class="form-wrapper">
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
  
        <!-- Field of Medicine Selection (Only for Doctor Appointment) -->
        <section v-if="selectedAppointmentType === 'Doctor Appointment'" class="medicine-field">
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
  
        <!-- Doctor Selection (Only for Doctor Appointment) -->
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
                    <option v-for="doctor in filteredDoctors" :key="doctor.id" :value="doctor.name">
                        {{ doctor.name }} - {{ doctor.specialty }}
                    </option>
                </select>
            </div>
        </section>
  
        <!-- Date Selection (Always shown) -->
        <section class="date-selection">
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
  
        <!-- Symptoms Text Area (Only for Doctor Appointment) -->
        <section v-if="selectedAppointmentType === 'Doctor Appointment' && selectedTimeSlot" class="symptoms">
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
  
            <!-- Nationality Dropdown -->
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
    </div>
  </template>
  
  <script>
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
          doctors: [
              { id: 1, name: 'Dr. John Smith', specialty: 'Cardiology' },
              { id: 2, name: 'Dr. Emily Johnson', specialty: 'Neurology' },
              { id: 3, name: 'Dr. Michael Williams', specialty: 'Orthopedics' },
              { id: 4, name: 'Dr. Sarah Brown', specialty: 'Pediatrics' },
              { id: 5, name: 'Dr. David Lee', specialty: 'Dermatology' },
              { id: 6, name: 'Dr. Olivia Wilson', specialty: 'General Surgery' },
              { id: 7, name: 'Dr. Rachel Adams', specialty: 'Dentistry' },
              { id: 8, name: 'Dr. Mark Taylor', specialty: 'Dentistry' }
          ],
  
          nationalities: [
              "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", 
              "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", 
              "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "Bruneian", 
              "Bulgarian", "Burkinabe", "Burundian", "Cabo Verdean", "Cambodian", "Cameroonian", "Canadian", "Central African", 
              "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", 
              "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Ecuadorian", "Egyptian", "Salvadoran", "Equatorial Guinean", 
              "Eritrean", "Estonian", "Eswatini", "Ethiopian", "Fijian", "Finnish", "French", "Gabonese", "Gambian", "Georgian", 
              "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", 
              "Honduran", "Hungarian", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", 
              "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kosovar", 
              "Kuwaiti", "Kyrgyzstani", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtenstein", "Lithuanian", 
              "Luxembourger", "Macanese", "Madagascar", "Malawian", "Malaysian", "Maldivian", "Malian", "Malta", "Marshallese", 
              "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mozambican", 
              "Namibian", "Nauruan", "Nepali", "New Zealander", "Nicaraguan", "Nigerian", "Niuean", "Norwegian", "Omani", "Pakistani",
              "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Philippine", "Polish", "Portuguese", 
              "Qatari", "Romanian", "Russian", "Rwandan", "Saint Kitts and Nevis", "Saint Lucian", "Samoan", "San Marinese", 
              "Sao Tomean", "Saudi", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", 
              "Slovene", "Solomon Islands", "Somali", "South African", "South Korean", "South Sudanese", "Spanish", "Sri Lankan", 
              "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajikistani", "Tanzanian", 
              "Thai", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", 
              "Uzbekistani", "Vanuatu", "Venezuelan", "Vietnamese", "Yemenite", "Zambian", "Zimbabwean"
          ]
      };
    },
    computed: {
      filteredDoctors() {
          return this.doctors.filter(doctor => doctor.specialty === this.selectedFieldOfMedicine);
      },
      canSubmit() {
          return this.selectedAppointmentType && this.selectedTimeSlot && this.patientInfo.firstName && this.patientInfo.lastName && this.patientInfo.phone;
      }
    },
    methods: {
      submitAppointment() {
          // Appointment submission logic
          this.$router.push({ name: 'PendingRequest' });
      }
    }
  };
  </script>

<style scoped>
.form-wrapper {
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #f9f9f9; /* Optional background color */
}

.appointment-container {
    width: 100%; /* Takes full width up to the max-width */
    max-width: 700px; /* Set max width for the form */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin: 20px auto; /* Auto margins to center horizontally */
}

h1, h2 {
    color: #333;
}

/* Outer section styling */
.appointment-type,
.medicine-field,
.doctor-selection,
.date-selection,
.time-slot,
.symptoms,
.patient-info {
    margin-bottom: 40px; /* Increased margin for more space between sections */
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

/* Highlight on hover for outer sections only */
.appointment-type:hover,
.medicine-field:hover,
.doctor-selection:hover,
.date-selection:hover,
.time-slot:hover,
.symptoms:hover,
.patient-info:hover {
    background-color: #B5DEE0;
}

/* Remove highlight effect from inner fields */
.appointment-type input,
.medicine-field input,
.doctor-selection input,
.date-selection input,
.time-slot input,
.symptoms input,
.patient-info input,
.appointment-type select,
.medicine-field select,
.doctor-selection select,
.date-selection select,
.time-slot select,
.symptoms select,
.patient-info select,
.appointment-type textarea,
.medicine-field textarea,
.doctor-selection textarea,
.date-selection textarea,
.time-slot textarea,
.symptoms textarea,
.patient-info textarea {
    background-color: white !important;
    box-shadow: none !important;
    transition: none;
}

/* Input field styling */
select,
input[type="text"],
input[type="tel"],
input[type="date"],
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
.date-selection {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling for date selection */
.date-selection label {
    width: 100%;
    text-align: left;
    margin-bottom: 8px;
}

.date-selection input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Styling for radio buttons and labels */
.doctor-options label {
    display: block;
    margin: 5px 0;
}

/* Specific adjustments for some fields */
.specific-doctor select,
.patient-info select,
.patient-info input {
    margin-top: 10px;
}
</style>
