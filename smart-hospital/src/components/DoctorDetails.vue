<template>
  <div>
    <h1>This is the Doctor Details page for Doctor ID: {{ doctorId }}</h1>
    <div v-if="doctor">
      
      <div class="doctor-image-container" v-if="doctor.Profile && doctor.Profile.length > 0">
        <img 
          :src="`http://localhost:1337${doctor.Profile[0].url}`" 
          alt="Doctor's Profile Image" 
          class="doctor-image"
        />
      </div>
      
      <p v-else>No profile image available for this doctor.</p>
      <h2>{{ doctor.DoctorName }}</h2>
      <p><strong>Specialization:</strong> {{ doctor.Specialization }}</p>
      <p><strong>Available Time:</strong> {{ doctor.Time }}</p>
    </div>
    <div v-else>
      <p>Loading doctor details...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorDetails',
  data() {
    return {
      doctor: null,
      loading: true,
    };
  },
  computed: {
    doctorId() {
      return this.$route.params.doctorId;
    },
  },
  async mounted() {
    try {
      const response = await fetch(`http://localhost:1337/api/department-of-chineses?populate=*`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      
      // Assuming there's only one doctor in the response data
      this.doctor = data.data[0]; // Directly accessing the first element
      
      // If you want to find the doctor by ID, uncomment the following:
      // this.doctor = data.data.find(doc => doc.id === Number(this.doctorId));
      
      if (!this.doctor) {
        console.error('Doctor not found for ID:', this.doctorId);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
<style scoped>
.doctor-image-container {
  display: flex;
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
  margin: 20px 0; /* Add some space above and below the image */
}

.doctor-image {
  max-width: 150px; /* Set a maximum width for the image */
  width: 100%; /* Make it responsive */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px; /* Optional: Add rounded corners for a smoother look */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
}
</style>
