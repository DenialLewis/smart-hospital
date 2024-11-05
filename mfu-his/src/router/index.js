import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/components/WelcomePage.vue';


const routes = [
    {path: '/', name: 'WelcomePage', component: WelcomePage}, 

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
