<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav>
    <RouterLink to="/">Top rated</RouterLink>
    <RouterLink to="/popular">Popular</RouterLink>
  </nav>

  <RouterView v-slot="{ Component }">
    <KeepAlive include="MovieList">
      <component :is="Component" :key="route.name" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
.router-link-exact-active {
  font-weight: bold;
}
</style>
