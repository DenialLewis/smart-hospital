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

            <div class="form-container"> 
                <div class="schedule-info-section">
                    <h3>Schedule information</h3>

                    <div class="row"> 
                        <div class="column">
                            <label>Doctor Name</label>
                            <input type="text" :value="doctor.username" disabled>
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="column">
                            <label>Date</label>
                            <!-- <input type="date" :min="minDate" v-model="selectedDate"/> -->
                            <input type="text" :value="doctor.schedule.date" disabled />
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <label>Day</label>
                            <input type="text" :value="doctor.schedule.day" disabled /> 
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="column">
                            <label>Appointment time</label>
                            <input type="text" :value="doctor.schedule.start_time" disabled />
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <label>Write your symptom</label>
                            <textarea type="text" placeholder="Describe any symptoms or concerns..." v-model="symptoms" ></textarea>
                        </div>
                    </div>
                
                </div>

                <div class="patient-info-section">
                    <h3>Patient Information</h3>
                    <!-- Title and Gender Side by Side -->
                    <div class="row">
                        <div class="column">
                            <label>Title</label>
                            <select v-model="patientInfo.title">
                                <option disabled value="">Select your title</option>
                                <option>Mr.</option>
                                <option>Mrs.</option>
                                <option>Ms.</option>
                            </select>
                        </div>
                        <div class="column">
                            <label>Gender</label>
                            <select v-model="patientInfo.gender">
                                <option disabled value="">Select your gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <!-- First Name and Last Name Side by Side -->
                    <div class="row">
                        <div class="column">
                            <label>First Name</label>
                            <input type="text" placeholder="Enter your first name" v-model="patientInfo.firstName" />
                        </div>
                        <div class="column">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter your last name" v-model="patientInfo.lastName"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <label>Date of Birth</label>
                            <input type="date" :max="minDate" v-model="patientInfo.dob" />
                        </div>
                        <div class="column">
                            <label>Phone Number</label>
                            <input type="tel" placeholder="Enter your phone number" v-model="patientInfo.phone"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <label>Nationality</label>
                            <select v-model="patientInfo.nationality">
                                <option disabled value="">Please select your nationality</option>
                                <option v-for="nationality in nationalities" :key="nationality" :value="nationality">
                                    {{ nationality }}
                                </option>
                            </select>
                        </div>
                        <div class="column">
                            <label>National ID or Passport Number</label>
                            <input type="text" placeholder="Enter your ID or Passport number" v-model="patientInfo.idNumber"/>
                        </div>
                    </div>
                </div>

            </div>

            
            

            <!-- Submit Button -->
            <h2></h2>
            <button @click="submitAppointment" class="btn-submit">Submit Appointment</button>
        </div>
    </div>
</template>

  
  
<script>
import axios from 'axios';
export default {
    name: 'AppointmentPopUp',
    data() {
        const today = new Date();
        const minDate = today.toISOString().split("T")[0];
        return {
            selectedDate: '', 
            selectedTimeSlot: '',
            symptoms: '',
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
            username: '',

            nationalities: [
                "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", 
                "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", 
                "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "Bruneian", 
                "Bulgarian", "Burkinabe", "Burundian", "Burmese", "Cabo Verdean", "Cambodian", "Cameroonian", "Canadian", "Central African", 
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
            ], 
            doctor: this.$props.doctor 
        }
    },
    props: {
        doctor: {
            type: Object,
            required: true
        },
        isVisible: Boolean
    },
    computed: {
        formattedDate() {
            const d = new Date(date);
            return d.toISOString().split("T")[0]; 
        }
    },
    async mounted() {
        // Fetch the user's username on component mount if they're logged in
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:1337/api/users/${userId}`);
                this.username = response.data.username;
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        }
       
    },
    methods: {
        closePopup() {
            // Emit an event to close the popup
            this.$emit('update:isVisible', false);
        },
        async submitAppointment() {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };
                const appointmentData = {
                    appointment_types: this.selectedAppointmentType,
                    date: this.selectedDate,
                    day: new Date(this.selectedDate).toLocaleDateString('en-US', { weekday: 'long' }),
                    time: `${this.selectedTimeSlot}:00.000`,
                    title: this.patientInfo.title,
                    first_name: this.patientInfo.firstName,
                    last_name: this.patientInfo.lastName,
                    gender: this.patientInfo.gender,
                    date_of_birth: this.patientInfo.dob,
                    phone_num: this.patientInfo.phone,
                    nationality: this.patientInfo.nationality,
                    ncid_passport: this.patientInfo.idNumber,
                    username: userId,
                };

                const response = await axios.post('http://localhost:1337/api/other-appointments', { data: appointmentData }, {headers});
                this.$emit('update:isVisible', false);
                alert('Appointment submitted successfully!');
            } catch (error) {
                console.error('Error submitting appointment:', error.response?.data || error.message);
                alert(`Failed to submit appointment: ${error.response?.data?.error?.message || "Please try again."}`);
            }
            
        },
    }
};
</script>

  
<style scoped>
/* Popup overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Popup content container */
.popup-content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  width: 900px;
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Close button styling */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

/* Form headings */
h2 {
  margin: 1.5rem 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
}

/* Input fields */
input[type="text"],
input[type="date"],
input[type="tel"],
select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #4CAF50;
}

/* Labels */
label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.3rem;
  display: inline-block;
}

/* Submit button */
.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #45a049;
}

/* Add spacing between form elements */
.popup-content input,
.popup-content select,
.popup-content button {
  margin-top: 0.5rem;
}

/* Add hover effects for buttons */
button:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

/* Flex container for two columns */
.form-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

/* Schedule and Patient Info Sections */
.schedule-info-section, .patient-info-section {
  flex: 1;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.column label {
  margin-bottom: 0.3rem;
}

.column select,
.column input {
  width: 90%;
}

/* Adjust spacing and responsiveness */
@media (max-width: 600px) {
  .row {
    flex-direction: column;
  }
}
</style> 

