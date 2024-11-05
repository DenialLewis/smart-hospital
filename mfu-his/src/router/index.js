import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import HomePage from '@/components/HomePage.vue';
import AppointmentManaging from '@/components/Appointment_managing.vue';
import BillingCollection from '@/components/Billing_Collection.vue';
import PatientInfo from '@/components/PatientInfo.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/log-in', name: 'LoginPage', component: LoginPage}, 
    {path: '/appointment-managing', name: 'AppointmentManaging', component: AppointmentManaging}, 
    {path: '/billing-collection', name: 'BillingCollection', component: BillingCollection}, 
    {path: '/patient-info', name: 'PatientInfo', component: PatientInfo}, 

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
