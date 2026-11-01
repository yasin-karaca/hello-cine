<template>
  <button @click="router.back()">Retour</button>
  <div>Movie details</div>
  <div>{{ props.id }}</div>
  <template v-if="data">
    <img :src="getImageUrl(data.backdrop_path)" :alt="data.title" />
    <img :src="getImageUrl(data.poster_path)" :alt="data.title" />
  </template>
</template>

<script setup lang="ts">
import { useFetch } from "@/composables/useApi";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getImageUrl } from "@/utils/image";
import type { MovieDetails } from "@/types/api";

const router = useRouter();

const props = defineProps({
  id: String,
});

const { data, execute } = useFetch<MovieDetails>(`https://api.themoviedb.org/3/movie/${props.id}`);

onMounted(async () => {
  await execute();
});
</script>
