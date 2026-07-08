<template>
  <div>
    <h1>Top rated movies</h1>
    <template v-if="data">
      <div v-for="movie in data.results" :key="movie.id">
        <RouterLink :to="`/movie/${movie.id}`">
          <h2>{{ movie.title }}</h2>

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

const { data, execute } = useFetch<MovieResponse>(getUrl(currentPage.value))

watch(currentPage, async (newPage) => {
  await execute(getUrl(newPage))
}, { immediate: true })

const nextPage = () => currentPage.value++
const prevPage = () => currentPage.value--

export interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
}

export interface MovieResponse {
  results: Movie[]
  total_pages: number
  total_results: number
  page: number
}
</script>