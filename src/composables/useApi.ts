import { ref } from 'vue'

export function useFetch<T>(initialUrl: string) {
  const apiKey = import.meta.env.VITE_API_KEY
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function execute(url: string = initialUrl) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}