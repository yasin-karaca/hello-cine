<script setup lang="ts">
import { useFetch } from '@/composables/useApi'
import { onMounted } from 'vue'

const { data, execute } = useFetch('https://api.themoviedb.org/3/genre/movie/list')

onMounted(async () => {
  await execute()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
