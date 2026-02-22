<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanStore } from '@/stores/planStore'
import { useToast } from 'vue-toastification'

const rawAmount = ref('')
const loading = ref(false)

const route = useRoute()
const planStore = usePlanStore()
const toast = useToast()

/* ================================
   FORMAT
================================ */

function formatNumber(value) {
  if (!value) return ''
  return value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const amount = computed({
  get() {
    return formatNumber(rawAmount.value)
  },
  set(value) {
    rawAmount.value = value.replace(/\D/g, '')
  }
})

/* ================================
   GENERATE
================================ */

async function generate() {
  if (!rawAmount.value) {
    toast.error("Summani kiriting")
    return
  }

  const shopId = route.params.id

  if (!shopId) {
    toast.error("Shop aniqlanmadi")
    return
  }

  try {
    loading.value = true

    await planStore.createMonthly(shopId, rawAmount.value)

    toast.success("Monthly plan muvaffaqiyatli yaratildi")

    rawAmount.value = ''

  } catch (error) {
    console.error(error)
    toast.error("Nimadur xato ketdi")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal>
    <h2 class="text-lg font-semibold mb-4">Create Monthly</h2>

    <div class="flex items-center">
      <input
        v-model="amount"
        inputmode="numeric"
        class="border w-full p-2 mr-4 focus:outline-none"
        placeholder="Masalan: 10,000,000"
        :disabled="loading"
      />

      <button
        @click="generate"
        class="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        :disabled="loading"
      >
        <span v-if="!loading">Generate</span>

        <span v-else class="flex items-center gap-2">
          <svg
            class="animate-spin h-4 w-4 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Generating...
        </span>
      </button>
    </div>
  </BaseModal>
</template>