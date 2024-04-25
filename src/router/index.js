import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnimationLetter from '../views/AnimationLetters.vue'


const routes = [
  { path: '/', name: 'home', component: HomeView},
  { path: '/animation', name: 'animation', component: AnimationLetter},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
