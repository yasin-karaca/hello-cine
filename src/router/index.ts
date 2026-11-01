import { createRouter, createWebHistory } from "vue-router";
import MovieList from "@/views/MovieList.vue";
import MovieDetails from "@/views/MovieDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MovieList,
      props: {
        category: "top_rated",
      },
    },
    {
      path: "/popular",
      name: "popular",
      component: MovieList,
      props: {
        category: "popular",
      },
    },
    {
      path: "/movie/:id",
      name: "details",
      component: MovieDetails,
      props: true,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});

export default router;
