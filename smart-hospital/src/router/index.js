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
import Service2 from '@/components/Service2.vue';
import Service3 from '@/components/Service3.vue';
import Service4 from '@/components/Service4.vue';
import HealthTip from '@/components/HealthTip.vue'; 
import PendingRequest from '@/components/PendingRequest.vue';




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
    {path: '/dental-consult', name: 'Service2', component: Service2},
    {path: '/eye-exam', name: 'Service3', component: Service3},
    {path: '/pediatric', name: 'Service4', component: Service4},
    {path: '/patient-profile', name: 'PatientProfile', component: PatientProfile, meta:{requiresAuth: true}},
    {path: '/health-tip', name: 'HealthTip', component: HealthTip},
    {path: '/health-tip/:id', name: 'healthtip', component: () => import('../components/HealthTip.vue')},
    {path: '/pending', name:'PendingRequest', component: PendingRequest} 
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
