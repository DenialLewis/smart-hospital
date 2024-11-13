<template>
  <div class="patient-profile">
    <h2>Patient Profile</h2>
    <div v-if="user">
      <!-- Profile Picture Section (Clickable to upload) -->
      <div class="profile-picture-container">
        <div v-if="user.profile_picture">
          <!-- Profile Picture displayed as a circle -->
          <img 
            :src="user.profile_picture.url" 
            alt="Profile Picture" 
            class="profile-img" 
            @click="triggerFileInput" />
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          @change="onFileChange" 
          style="display: none;" 
        />
      </div>

      <!-- User Details Section -->
      <div class="user-details">
        <p><strong>Name:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone || 'Not provided' }}</p>
        <p><strong>Address:</strong> {{ user.address || 'Not provided' }}</p>
        <p><strong>Date of Birth:</strong> {{ user.birthday || 'Not provided' }}</p>
      </div>
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
      selectedFile: null, // The file to upload
    };
  },
  created() {
    this.loadUserDetails();
  },
  methods: {
    async loadUserDetails() {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token stored after login
      if (!token) {
        // Redirect to login page if no token is found
        this.$router.push({ name: "Login" });
        return;
      }
      try {
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
    triggerFileInput() {
      // Trigger the file input click when the image is clicked
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.uploadProfilePicture();
    },
    async uploadProfilePicture() {
      if (!this.selectedFile) {
        alert("Please select a file first.");
        return;
      }
      const token = localStorage.getItem("jwtToken");
      const formData = new FormData();
      formData.append("files", this.selectedFile);

      try {
        // Upload the profile picture to Strapi's media library
        const uploadResponse = await axios.post("http://localhost:1337/api/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the first file is the profile picture
        const uploadedImage = uploadResponse.data[0];

        // Now update the user profile with the uploaded image's ID
        const userUpdateResponse = await axios.put(`http://localhost:1337/api/users/me`, {
          profile_picture: uploadedImage.id, // Link the uploaded image ID to the user
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the local user data with the new profile picture
        this.user.profile_picture = uploadedImage;

        alert("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload profile picture:", error.response ? error.response.data : error);
        alert("Failed to upload profile picture. Please try again.");
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

.profile-picture-container {
  text-align: center;
  margin-bottom: 20px;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Circular frame for profile image */
  object-fit: cover; /* Ensures the image fits within the circle */
  cursor: pointer;
  border: 2px solid #007bff; /* Optional: Adds a border around the image */
}

input[type="file"] {
  display: none;
}

.user-details {
  text-align: left;
  font-size: 16px;
  line-height: 1.6;
}
</style>
