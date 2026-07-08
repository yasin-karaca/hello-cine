<template>
  <div>
    <h1>Top rated movies</h1>
    <template v-if="data">
      <div v-for="movie in data.results">
        <RouterLink :to="`/movie/${movie.id}`">
          <pre>{{ movie }}</pre>
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        </RouterLink>
      </div>

      <div>
        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>Page {{ currentPage }} / {{ data.total_pages }}</span>
        <button @click="nextPage" :disabled="currentPage === data.total_pages">Suivant</button>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@/composables/useApi'
import { getImageUrl } from '@/utils/image'

const currentPage = ref(1)

const getUrl = (page: number) =>
  `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`

const { data, execute } = useFetch(getUrl(currentPage.value))

watch(currentPage, async (newPage) => {
  await execute(getUrl(newPage))
}, { immediate: true })

const nextPage = () => currentPage.value++
const prevPage = () => currentPage.value--
</script>