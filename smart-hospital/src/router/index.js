import { createRouter, createWebHistory } from 'vue-router';
import ThaiMedicine from '@/components/ThaiMedicine.vue'; 
import ChatBubble from '../components/ChatBubble.vue';
import HomePage from '@/components/HomePage.vue';
import ChineseMedicine from '@/components/ChineseMedicine.vue';
import PhysicalTherapy from '@/components/PhysicalTherapy.vue';
import Opd from '@/components/Opd.vue';
import Appointment from '@/components/Appointment.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/thai-medicine',  name: 'thaiMedicine', component: ThaiMedicine},
    {path: '/chat-bot', name: 'chatBubble', component: ChatBubble},
    {path: '/chinese-medicine', name: 'chineseMedicine', component: ChineseMedicine},
    {path: '/physical-therapy', name: 'physicalTherapy', component: PhysicalTherapy},
    {path: '/opd', name: 'opd', component: Opd},
    {path: '/appointment', name: 'appointment', component: Appointment}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
