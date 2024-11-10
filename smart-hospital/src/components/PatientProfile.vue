<!-- <template>
    <div> this is patient profile </div>
</template>

<script>
export default {
    name: 'PatientProfile'
}
</script> -->

<template>
  <div>
    <h1>This is the user details of the logged-in user</h1>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
    </div>
    <div v-else>
      <p>No user logged in.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientProfiles',
  data() {
    return {
      user: null,  // This will hold the user details
    };
  },
  mounted() {
    // Retrieve user data from localStorage
    const userId = localStorage.getItem('userId');
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('User ID from localStorage:', userId);  // Check if it's correct
  console.log('JWT Token from localStorage:', jwtToken);  // Check if it's correct

  if (userId && jwtToken) {
    this.fetchUserDetails(userId, jwtToken);
  } else {
    console.log('No user is logged in');
  }
  },
  methods: {
    async fetchUserDetails(userId, token) {
      try {
        const response = await axios.get(`http://localhost:1337/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('User details:', response.data); 
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
  }
};
</script>

  
  
