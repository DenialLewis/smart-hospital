<!-- <template>
    <div> this is patient profile </div>
</template>

<script>
export default {
    name: 'PatientProfile'
}
</script> -->

<template>
    <div v-if="users && users.length">
      <h1>All Patient Profiles</h1>
      <div v-for="user in users" :key="user.id" class="user-profile">
        <h2>{{ user.username }}</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- Add more fields as necessary -->
      </div>
    </div>
    <div v-else>
      <p>Loading profiles...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PatientProfiles',
    data() {
      return {
        users: null,
      };
    },
    async created() {
      const token = localStorage.getItem('jwtToken');
      console.log('Stored JWT:', token); // Check that this logs a valid token
  
      if (token) {
        try {
          // Fetch all user profiles
          const response = await axios.get('http://localhost:1337/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching user profiles:', error);
        }
      } else {
        console.error('No JWT token found in localStorage');
      }
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    margin-bottom: 20px;
  }
  </style>
