import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import HomeView from '../views/HomeView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import GenreLeaderBoard from '@/views/GenreLeaderBoard.vue'
import FavoritePage from '@/views/FavoritePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SearchView
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView
    },
    {
      path: '/leaderboard/:genreId', // Define route with dynamic genreId parameter
      component: GenreLeaderBoard,
      name: 'LeaderboardDetail',
      props: true, // Allow genreId to be passed as a prop to the component
    },
    {
      path: '/favorite',
      component: FavoritePage,
      name: 'Favorite',    
      props: true,
    }
    
  ]
})

export default router
