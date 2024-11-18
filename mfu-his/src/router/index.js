import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import HomePage from '@/components/HomePage.vue';
import AppointmentManaging from '@/components/Appointment_managing.vue';
import PatientInfo from '@/components/PatientInfo.vue';
import AddSchedule from '@/components/AddSchedule.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/log-in', name: 'LoginPage', component: LoginPage}, 
    {path: '/appointment-managing', name: 'AppointmentManaging', component: AppointmentManaging}, 
    {path: '/patient-info', name: 'PatientInfo', component: PatientInfo}, 
    {
      path: '/add-schedule',
      name: 'AddSchedule',
      component: AddSchedule,
      props: route => ({ isLoggedIn: route.params.loggedIn }), // Pass loggedIn state as prop
      beforeEnter: (to, from, next) => {
        // Check if the user is logged in
        const loggedIn = localStorage.getItem('jwtToken') !== null;
        if (!loggedIn) {
          next(false); // Cancel navigation
        } else {
          next(); // Allow navigation
        }
      },
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
