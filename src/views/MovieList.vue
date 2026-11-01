<template>
  <div>
    <h1>{{ title }}</h1>

    <select v-model="selectedGenre">
      <option :value="null">Tous les genres</option>
      <option v-for="genre in genres?.genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <p v-if="loading">Chargement...</p>
    <template v-else-if="data">
      <div v-for="movie in data.results" :key="movie.id">
        <RouterLink :to="`/movie/${movie.id}`">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.overview }}</p>

          <p>Release year : {{ movie.release_date.slice(0, 4) }}</p>

          <h4>Genre</h4>
          <p>{{ getGenreNames(movie.genre_ids) }}</p>
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
import { watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetch } from "@/composables/useApi";
import { getImageUrl } from "@/utils/image";
import type { MovieResponse, GenreResponse } from "@/types/api";

const props = defineProps<{
  category: "top_rated" | "popular";
}>();

const route = useRoute();
const router = useRouter();

// Nom de la route à laquelle appartient cette instance
const ownRouteName = route.name;

const title = computed(() =>
  props.category === "popular" ? "Popular movies" : "Top rated movies",
);

const currentPage = computed(() => Number(route.query.page) || 1);

const selectedGenre = computed({
  get: () => (route.query.genre ? Number(route.query.genre) : null),
  set: (value: number | null) => {
    router.push({ query: { genre: value ?? undefined } });
  },
});

const goToPage = (page: number) => {
  router.push({ query: { ...route.query, page } });
};

const nextPage = () => goToPage(currentPage.value + 1);
const prevPage = () => goToPage(currentPage.value - 1);

const BASE_URL = "https://api.themoviedb.org/3";

const getUrl = (page: number, genreId: number | null) => {
  const params = new URLSearchParams({
    language: "en-US",
    page: String(page),
  });

  if (props.category === "popular") {
    params.set("sort_by", "popularity.desc");
  } else {
    params.set("sort_by", "vote_average.desc");
    params.set("vote_count.gte", "300");
  }

  if (genreId) params.set("with_genres", String(genreId));
  return `${BASE_URL}/discover/movie?${params}`;
};

const { data: genres, execute: fetchGenres } = useFetch<GenreResponse>(
  `${BASE_URL}/genre/movie/list?language=en`,
);

const getGenreNames = (ids: number[]) =>
  ids
    .map((id) => genres.value?.genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(", ");

onMounted(() => fetchGenres());

const { data, loading, execute } = useFetch<MovieResponse>(getUrl(1, null));

let lastKey = "";

watch(
  [currentPage, selectedGenre],
  () => {
    // Ignore les changements d'URL qui concernent une autre page
    if (route.name !== ownRouteName) return;

    const key = `${currentPage.value}-${selectedGenre.value}`;
    if (key === lastKey) return;
    lastKey = key;

    data.value = null;
    execute(getUrl(currentPage.value, selectedGenre.value));
  },
  { immediate: true },
);
</script>
