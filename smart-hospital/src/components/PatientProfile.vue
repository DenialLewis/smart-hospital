<template>
  <div class="patient-profile">
    <h2>Patient Profile</h2>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone || 'Not provided' }}</p>
      <p><strong>Address:</strong> {{ user.address || 'Not provided' }}</p>
      <p><strong>Date of Birth:</strong> {{ user.dob || 'Not provided' }}</p>
      <!-- Add other relevant details here -->
    </div>
    <div v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PatientProfile",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.loadUserDetails();
  },
  methods: {
    async loadUserDetails() {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT token stored after login
        if (!token) {
          console.error("User not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data; // Set user data from Strapi's response
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    },
  },
};
</script>

<style scoped>
.patient-profile {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 50%;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
}
</style>
