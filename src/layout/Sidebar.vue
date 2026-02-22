<template>
  <aside
    :class="[
      'bg-white border-r transform transition-all duration-300 ease-in-out',

      // Desktop
      'md:relative md:translate-x-0 md:block',
      collapsed ? 'md:w-16' : 'md:w-64',

      // Mobile
      mobileOpen
        ? 'fixed top-0 left-0 h-full w-[80%] translate-x-0 z-50'
        : 'fixed top-0 left-0 h-full w-[80%] -translate-x-full z-50'
    ]"
  >
    <!-- HEADER -->
    <div class="h-12 flex items-center justify-between px-4 border-b">
      <span v-if="!collapsed || mobileOpen" class="font-semibold">
        Store
      </span>

      <!-- Mobile close -->
      <button
        class="md:hidden text-gray-600 hover:text-gray-900"
        @click="$emit('closeMobile')"
      >
        <i class="fa-solid fa-xmark text-2xl"></i>
      </button>

      <!-- Desktop collapse -->
      <button
        class="hidden md:block text-gray-600 hover:text-gray-900"
        @click="$emit('toggle')"
      >
        <i
          :class="collapsed
            ? 'fa-solid fa-angles-right'
            : 'fa-solid fa-angles-left'"
        ></i>
      </button>
    </div>

    <!-- NAVIGATION -->
    <nav class="p-2 space-y-1">

      <!-- Home -->
      <SidebarItem
        icon="fa-house"
        label="Home"
        :collapsed="collapsed"
        to="/"
      />

      <!-- Shops main -->
      <SidebarItem
        icon="fa-store"
        label="Shops"
        :collapsed="collapsed"
        to="/shops"
      />

      <!-- Nested shops -->
      <div
        v-if="shops.length && !collapsed"
        class="ml-8 space-y-1"
      >
        <SidebarItem
          v-for="shop in shops"
          :key="shop.id"
          icon="fa-circle"
          :label="shop.title.rendered"
          :collapsed="false"
          :to="`/shop/${shop.id}`"
          class="text-sm text-gray-600"
        />
      </div>

    </nav>
  </aside>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useShopStore } from '@/stores/shopStore'
import SidebarItem from './SidebarItem.vue'

const props = defineProps(['collapsed', 'mobileOpen'])

const shopStore = useShopStore()

onMounted(() => {
  shopStore.fetchShops()
})

const shops = computed(() => shopStore.shops)
</script>
