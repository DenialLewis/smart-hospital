<template>
    <div class="home-container">
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  }
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height */
  }
  
  .header {
    background-color: #4CAF50; /* Header background color */
    color: white; /* Header text color */
    padding: 15px;
    text-align: center;
  }
  
  .main-content {
    display: flex;
    flex: 1; /* Take the remaining height */
  }
  
  .sidebar {
    width: 200px; /* Fixed width for the sidebar */
    background-color: #f5f5f5; /* Sidebar background color */
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional shadow */
  }
  
  .sidebar ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove padding */
  }
  
  .sidebar li {
    margin: 15px 0; /* Space between links */
  }
  
  .sidebar a {
    text-decoration: none; /* Remove underline */
    color: #333; /* Link color */
  }
  
  .sidebar a:hover {
    color: #4CAF50; /* Change color on hover */
  }
  
  .content {
    flex: 1; /* Take the remaining width */
    padding: 20px; /* Content padding */
  }
  </style>
  