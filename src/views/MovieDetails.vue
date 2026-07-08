<template>
  <button @click="router.back()">Retour</button>
  <div>Movie details</div>
  <div>{{ props.id }}</div>
  <pre>
    {{ data }}
  </pre>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useApi'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: String,
})

const { data, execute } = useFetch(`https://api.themoviedb.org/3/movie/${props.id}`)

onMounted(async () => {
  await execute()
})
</script>