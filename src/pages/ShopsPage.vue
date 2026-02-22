<script setup>
import { computed, onMounted } from 'vue'
import { useShopStore } from '@/stores/shopStore'
import { useRouter } from 'vue-router'

const shopStore = useShopStore()
const router = useRouter()

onMounted(() => {
  if (!shopStore.shops.length) {
    shopStore.fetchShops()
  }
})

const shops = computed(() => shopStore.shops)

function openShop(id) {
  router.push(`/shop/${id}`)
}
</script>

<template>
  <div class="space-y-4">

    <h2 class="text-xl font-semibold">Your Shops</h2>

    <div v-if="!shops.length" class="text-gray-500">
      Hali sizda shop yaratilmagan.
    </div>

    <div
      v-for="shop in shops"
      :key="shop.id"
      @click="openShop(shop.id)"
      class="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <div class="flex items-center gap-3">
        <i class="fa-solid fa-store text-gray-500"></i>
        <span>{{ shop.title.rendered }}</span>
      </div>
    </div>

  </div>
</template>
