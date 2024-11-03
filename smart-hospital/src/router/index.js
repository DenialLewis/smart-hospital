import { createRouter, createWebHistory } from 'vue-router';
import ThaiMedicine from '@/components/ThaiMedicine.vue'; 
import ChatBubble from '../components/ChatBubble.vue';
import HomePage from '@/components/HomePage.vue';
import ChineseMedicine from '@/components/ChineseMedicine.vue';

const routes = [
    {path: '/', name: 'HomePage', component: HomePage}, 
    {path: '/thai-medicine',  component: ThaiMedicine},
    {path: '/chat-bot', name: 'chatBubble', component: ChatBubble},
    {path: '/chinese-medicine', component: ChineseMedicine},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
