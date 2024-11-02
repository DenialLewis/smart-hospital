import { createRouter, createWebHistory } from 'vue-router';
import thaiMedicine from '../components/thaiMedicine.vue'; // Adjust the path as necessary
import ChatBubble from '../components/ChatBubble.vue';
import appointment from '../components/appointment.vue';
import Profile from '@/components/Profile.vue';
// import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'App', // or whatever component you have
    component: () => import('../App.vue'), // Example for home component
  },
  {
    path: '/thai-medicine',
    name: 'thaiMedicine',
    component: thaiMedicine,
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: appointment, 
  },
  {
    path: '/chat-bot',
    name: 'chatBubble',
    component: ChatBubble,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
