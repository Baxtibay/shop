<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useShopStore } from '@/stores/shopStore'
import { updateMonthly } from '@/api/shops'

const props = defineProps({
  shopId: Number
})

const router = useRouter()
const dashboardStore = useDashboardStore()
const shopStore = useShopStore()

const newName = ref('')
const rawAmount = ref('')
const loading = ref(false)

/* ================================
   FORMAT FUNCTION
================================ */

function formatNumber(value) {
  if (!value) return ''
  return value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const newAmount = computed({
  get() {
    return formatNumber(rawAmount.value)
  },
  set(value) {
    rawAmount.value = value.replace(/\D/g, '')
  }
})

/* ================================
   RENAME
================================ */

async function handleRename() {
  if (!newName.value) return

  loading.value = true
  await shopStore.renameShop(props.shopId, newName.value)
  loading.value = false

  newName.value = ''
}

/* ================================
   UPDATE MONTHLY
================================ */

async function handleUpdateMonthly() {
  if (!dashboardStore.monthly) return
  if (!rawAmount.value) return

  loading.value = true

  await updateMonthly(dashboardStore.monthly.id, rawAmount.value)
  await dashboardStore.loadDashboard(props.shopId)

  loading.value = false
  rawAmount.value = ''
}

/* ================================
   DELETE
================================ */

async function handleDelete() {
  if (!confirm('Shopni o‘chirishni tasdiqlaysizmi?')) return

  loading.value = true
  await shopStore.removeShop(props.shopId)
  loading.value = false

  router.push('/shops')
}
</script>

<template>
  <div class="border p-4 rounded mt-6 bg-gray-50 space-y-4">

    <h3 class="font-semibold">Shop sozlamalari</h3>

    <!-- Rename -->
    <div class="flex flex-col md:flex-row gap-4 mt-2">

  <!-- Rename -->
  <div class="flex flex-col sm:flex-row gap-2 w-full">
      <input
        v-model="newName"
        placeholder="Yangi shop nomi"
        class="border p-2 rounded w-full sm:flex-1 outline-none focus:outline-none"
      />
      <button
        @click="handleRename"
        class="bg-blue-600 text-white px-3 py-2 rounded w-full sm:w-auto"
      >
        Nomini o‘zgartirish
      </button>
    </div>

    <!-- Update Monthly -->
    <div
      v-if="dashboardStore.monthly"
      class="flex flex-col sm:flex-row gap-2 w-full"
    >
      <input
        v-model="newAmount"
        inputmode="numeric"
        placeholder="Yangi monthly summa"
        class="border p-2 rounded w-full sm:flex-1 outline-none focus:outline-none"
      />
      <button
        @click="handleUpdateMonthly"
        class="bg-green-600 text-white px-3 py-2 rounded w-full sm:w-auto"
      >
        Oylikni yangilash
      </button>
    </div>

    </div>

    <!-- Delete -->
    <div>
      <button
        @click="handleDelete"
        class="bg-red-600 text-white px-3 py-2 rounded"
      >
        Shopni o‘chirish
      </button>
    </div>

  </div>
</template>