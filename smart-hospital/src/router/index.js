import { createRouter, createWebHistory } from 'vue-router';
import ThaiMedicine from '@/components/ThaiMedicine.vue'; 
import ChatBubble from '../components/ChatBubble.vue';
import HomePage from '@/components/HomePage.vue';
import ChineseMedicine from '@/components/ChineseMedicine.vue';
import PhysicalTherapy from '@/components/PhysicalTherapy.vue';
import Opd from '@/components/Opd.vue';
import Appointment from '@/components/Appointment.vue';
import DoctorDetails from '../components/DoctorDetails.vue';
import PatientProfile from '@/components/PatientProfile.vue';
import Service1 from '@/components/Service1.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/thai-medicine',  name: 'thaiMedicine', component: ThaiMedicine},
    {path: '/chat-bot', name: 'chatBubble', component: ChatBubble},
    {path: '/chinese-medicine', name: 'chineseMedicine', component: ChineseMedicine},
    {path: '/physical-therapy', name: 'physicalTherapy', component: PhysicalTherapy},
    {path: '/doctor-details/:doctorId', name: 'DoctorDetails', component: DoctorDetails},
    {path: '/opd', name: 'opd', component: Opd},
    {path: '/appointment', name: 'appointment', component: Appointment},
    {path: '/patient-profile', name: 'PatientProfile', component: PatientProfile},
    {path: '/check-up', name: 'Service1', component: Service1},
    {path: '/patient-profile', name: 'PatientProfile', component: PatientProfile, meta:{requiresAuth: true}}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
      next({ name: 'LogIn' }); // Redirect to login page
  } else {
      next();
  }
});

export default router;
