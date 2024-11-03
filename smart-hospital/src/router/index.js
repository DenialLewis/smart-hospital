import { createRouter, createWebHistory } from 'vue-router';
import thaiMedicine from '../components/thaiMedicine.vue'; 
import ChatBubble from '../components/ChatBubble.vue';
import appointment from '../components/appointment.vue';
import Profile from '@/components/Profile.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NoLayout from '@/layouts/NoLayout.vue';
import HomePage from '@/components/HomePage.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout, 
    children: [
      {path: '/', name: 'HomePage', component: HomePage}, 
      {path: '/thai-medicine', name:'thaiMedicine', component: thaiMedicine},
      {path: '/chat-bot', name: 'chatBubble', component: ChatBubble},
    ]
  },
  {
    path: '/new-page',
    component: NoLayout, 
    children: [
      {path: '/profile', name: 'profile', component: Profile}
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
