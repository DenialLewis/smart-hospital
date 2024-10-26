import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router'; // Adjust the import path if necessary

const app = createApp(App);
app.use(router); // Register the router
app.mount('#app'); // Mount the Vue instance

axios.interceptors.request.use(
    config => {
      // Customize request config, such as adding headers
      return config;
    },
    error => Promise.reject(error)
  );
  
  axios.interceptors.response.use(
    response => response,
    error => {
      // Handle errors
      return Promise.reject(error);
    }
  );