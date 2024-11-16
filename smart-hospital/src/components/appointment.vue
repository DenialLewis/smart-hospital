<template>
    <div class="form-wrapper">
        <div class="appointment-container">
            <h1>Make an Appointment</h1>
    
            <!-- Type of Appointment Selection-->
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

            <!--Fields for Doctor Appointment-->
            <section v-if="selectedAppointmentType === 'Doctor Appointment'" class="doctor-appointment"> 
                <h2>Select a department</h2>
                <!-- <select v-model="selectedDepartment">
                    <option disabled value="">Please select a department</option>
                    <option v-for="department in departments" :key="department.id" :value="department.department_name">
                        {{ department.department_name }}
                    </option>
                </select> -->

                <select v-model="selectedDepartment">
                    <option disabled value="">Please select a department</option>
                    <option>Thai Medicine</option>
                    <option>Chinese Medicine</option>
                    <option>Physical Therapy</option>
                    <option>Out Patient Department</option>
                </select>

                <h2></h2>
                <button @click="confirmRequest" class="btn-submit">Confirm request</button>

            </section>
    
            <!-- Fields for Health Checkup, Vaccination, or Consultation -->
            <section v-if="selectedAppointmentType === 'Health Checkup' || selectedAppointmentType === 'Vaccination' || selectedAppointmentType === 'Consultation'" class="other-appointment">
                <h2>Select Date</h2>
                <input type="date" :min="minDate" v-model="selectedDate"/>

                <h2>Select a Time Slot</h2>
                <select v-model="selectedTimeSlot">
                    <option disabled value="">select a time</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                </select>

                <h2>Patient Information</h2>
                <label>Title</label>
                <select v-model="patientInfo.title">
                    <option disabled value="">Select your title</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                </select>

                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" v-model="patientInfo.firstName" />

                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" v-model="patientInfo.lastName"/>

                <label>Gender</label>
                <select v-model="patientInfo.gender">
                    <option disabled value="">Select your gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <label>Date of Birth</label>
                <input type="date" :max="minDate" v-model="patientInfo.dob" />

                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" v-model="patientInfo.phone"/>

                <label>Nationality</label>
                <select v-model="patientInfo.nationality">
                    <option disabled value="">Please select your nationality</option>
                    <option v-for="nationality in nationalities" :key="nationality" :value="nationality">
                        {{ nationality }}
                    </option>
                </select>

                <label>National ID or Passport Number</label>
                <input type="text" placeholder="Enter your ID or Passport number" v-model="patientInfo.idNumber"/>

                <!-- Submit Button -->
                 <h2></h2>
                <button @click="submitAppointment" class="btn-submit">Confirm request</button>
            </section>

            
        </div>
    </div>
</template>



  
<script>
import axios from 'axios'; 
export default {
    name: 'appointment',
    data() {
        const today = new Date();
        const minDate = today.toISOString().split("T")[0]; // Minimum date is today

        return {
            selectedAppointmentType: '',
            selectedFieldOfMedicine: '',
            selectedDepartment: '',
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
            username: '',
            //departments: [],

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
            ]
        };
    },
    computed: {
        formattedDate() {
        // if (!this.selectedDate) return '';

        // const date = new Date(this.selectedDate);
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const day = String(date.getDate()).padStart(2, '0');
        // const year = date.getFullYear();

        // return `${month}/${day}/${year}`;
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

        // Fetch departments from Strapi
        // try {
        //     const response = await axios.get('http://localhost:1337/api/departments');
        //     this.departments = response.data.data.map(item => item.attributes); // Assuming Strapi response structure
        // } catch (error) {
        //     console.error('Error fetching departments:', error);
        // }
    },
    methods: {
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
                alert('Appointment submitted successfully!');
            } catch (error) {
                console.error('Error submitting appointment:', error.response?.data || error.message);
                alert(`Failed to submit appointment: ${error.response?.data?.error?.message || "Please try again."}`);
            }
            // Appointment submission logic
            //this.$router.push({ name: 'PendingRequest' });
        },
        confirmRequest() {
            // Check the selected department and navigate accordingly
            if (this.selectedDepartment === 'Thai Medicine') {
                this.$router.push('/thai-medicine');
            } else if (this.selectedDepartment === 'Chinese Medicine') {
                this.$router.push('/chinese-medicine');
            } else if (this.selectedDepartment === 'Physical Therapy') {
                this.$router.push('/physical-therapy');
            } else if (this.selectedDepartment === 'Out Patient Department') {
                this.$router.push('/opd');
            } else {
                alert('Please select a department');
            }
        }
    }
};
</script>



<style scoped>
.form-wrapper {
    display: flex;
    justify-content: center;
    padding: 50px;
    background-color: #f3f4f6;
    font-family: Arial, sans-serif; 
}

.appointment-container {
    width: 100%;
    max-width: 700px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    margin: 20px auto;
}

h1, h2 {
    color: #2b2b2b;
    font-weight: 600;
    margin-bottom: 15px;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
}

.appointment-type,
.doctor-appointment,
.other-appointment
{
    margin-bottom: 25px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    background-color: #fafafa;
    transition: background-color 0.3s ease;
}

.appointment-type:hover,
.medicine-field:hover,
.doctor-selection:hover,
.date-selection:hover,
.time-slot:hover,
.symptoms:hover,
.patient-info:hover {
    background-color: #d7e7ec;
}

select,
input[type="text"],
input[type="tel"],
input[type="date"],
textarea {
    width: 95%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin-top: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
}

textarea {
    resize: vertical;
    min-height: 80px;
}

label {
    display: block;
    margin-top: 10px;
    font-weight: 500;
    color: #4b4b4b;
}

.doctor-options label,
.time-slot div label {
    display: inline-block;
    margin: 8px 0;
    color: #333;
    font-weight: 500;
}

.time-slot div {
    margin-bottom: 15px;
}

.btn-submit {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #007acc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
}

.btn-submit:hover {
    background-color: #005fa3;
}
</style>

