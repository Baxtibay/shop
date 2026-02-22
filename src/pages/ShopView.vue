<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboardStore'
import CreateMonthlyModal from '@/components/modals/CreateMonthlyModal.vue'
import { computed } from 'vue'
import ShopActions from '@/components/ShopActions.vue'

const route = useRoute()
const store = useDashboardStore()
const showCreate = ref(false)

const todayTotal = computed(() => {
  if (!store.items || !store.items.length) return 0

  return store.items.reduce((sum, item) => {
    return sum + Number(item.amount)
  }, 0)
})

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      store.loadDashboard(id)
    }
  },
  { immediate: true }
)

function format(n) {
  return Number(n).toLocaleString()
}
</script>

<template>
  <div v-if="store.loading">Loading...</div>

  <div v-else>

    <!--  No Monthly -->
    <div v-if="!store.monthly">

      <p class="text-gray-500 mb-4">
        Bu shop uchun hali monthly plan yaratilmagan
      </p>

      <button
        @click="showCreate = true"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Monthly
      </button>

      <CreateMonthlyModal
        v-if="showCreate"
        @close="showCreate = false"
      />

    </div>

    <!-- Monthly available -->
    <div v-else>

      <div class="flex justify-between items-center mt-2">
        <div class="mb-6 flex-1">
          <h2 class="text-xl font-bold mb-2">
            {{ format(store.monthly.amount) }} so'm
          </h2>
          <p>To'langan: {{ format(store.monthly.total_paid) }}</p>
          <p>Qolgan: {{ format(store.monthly.remaining) }}</p>
          <div class="w-full bg-gray-200 h-3 rounded mt-2">
            <div
              class="bg-green-500 h-3 rounded transition-all duration-300"
              :style="{ width: store.monthly.progress + '%' }"
            ></div>
          </div>
          <p class="mt-1 text-sm">
            {{ store.monthly.progress.toFixed(1) }}%
          </p>
        </div>
        <!-- Total daily amount -->
        <div class="flex justify-between items-center mt-3">

          <div class="flex-1 mr-6">
            <div class="w-full bg-gray-200 h-3 rounded">
              <div
                class="bg-green-500 h-3 rounded transition-all duration-300"
                :style="{ width: store.monthly.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="text-right">
            <div class="text-xs text-gray-400">
              Bugungi reja
            </div>
            <div class="text-lg font-bold text-green-600">
              {{ format(todayTotal) }} so'm
            </div>
          </div>

        </div>
      </div>

      <!-- SHOP ACTIONS -->
      <div class="mt-8 border-t pt-6">
        <ShopActions :shopId="Number(route.params.id)" />
      </div>

      <!-- Daily -->
      <div v-if="store.items.length">

        <h3 class="font-semibold mb-3">Bugungi reja</h3>

        <div
          v-for="item in store.items"
          :key="item.id"
          class="flex items-center justify-between border p-2 rounded mb-2"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="item.is_checked"
              @change="store.toggle(item)"
            />
            <span>{{ format(item.amount) }}</span>
          </div>
        </div>

      </div>

      <div v-else class="text-gray-500">
        Bugungi plan mavjud emas
      </div>

    </div>
  </div>
</template>