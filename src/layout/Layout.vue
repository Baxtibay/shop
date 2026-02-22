<template>
  <div class="relative flex h-screen bg-gray-50">

    <!-- 1️⃣ Mobile Overlay -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
      @click="mobileOpen = false"
    />

    <!-- 2️⃣ Sidebar -->
    <Sidebar
      :collapsed="collapsed"
      :mobileOpen="mobileOpen"
      @toggle="collapsed = !collapsed"
      @closeMobile="mobileOpen = false"
    />

    <!-- 3️⃣ Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="h-12 border-b bg-white flex items-center px-4 md:px-6 relative">
        <button
          class="md:hidden mr-3 text-gray-600"
          @click="mobileOpen = true"
        >
          <i class="fa-solid fa-bars text-2xl"></i>
        </button>

        <div class="flex items-center gap-2 font-medium text-gray-700">
          <span>Nalog System</span>

          <span v-if="activeShopName" class="text-gray-400">/</span>

          <span v-if="activeShopName" class="text-blue-600">
            {{ activeShopName }}
          </span>
        </div>

      </header>

      <main class="flex-1 overflow-auto p-4 md:p-8">
        <slot />
      </main>
    </div>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import Sidebar from './Sidebar.vue'

const collapsed = ref(false)
const mobileOpen = ref(false)

const route = useRoute()
const shopStore = useShopStore()

const activeShopName = computed(() => {
  const id = route.params.id
  if (!id) return null

  const shop = shopStore.shops.find(s => s.id == id)
  return shop ? shop.title.rendered : null
})
</script>


