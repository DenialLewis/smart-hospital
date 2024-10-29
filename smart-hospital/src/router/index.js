import { createRouter, createWebHistory } from 'vue-router';
import thaiMedicine from '../components/thaiMedicine.vue'; // Adjust the path as necessary
import ChatBubble from '../components/ChatBubble.vue';
import appointment from '../components/appointment.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage', // or whatever component you have
    component: HomePage, // Example for home component
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
