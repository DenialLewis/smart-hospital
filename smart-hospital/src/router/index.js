import { createRouter, createWebHistory } from 'vue-router';
import thaiMedicine from '../components/thaiMedicine.vue'; 
import ChatBubble from '../components/ChatBubble.vue';
import HomePage from '@/components/HomePage.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/thai-medicine', name:'thaiMedicine', component: thaiMedicine},
    {path: '/chat-bot', name: 'chatBubble', component: ChatBubble},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
