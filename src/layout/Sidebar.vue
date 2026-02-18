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
    <div class="h-12 flex items-center justify-between px-4 border-b">
      <span v-if="!collapsed" class="font-semibold">
        Store
      </span>

      <button
        class="text-gray-500 hover:text-gray-800 text-lg"
        @click="$emit('toggle')"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <nav class="p-2 space-y-1">
      <SidebarItem icon="fa-house" label="Home" :collapsed="collapsed" to="/" />
      <div class="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed">
        <i class="fa-solid fa-store w-5"></i>
        <span v-if="!collapsed">Shops</span>
      </div>

      <div class="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed">
        <i class="fa-solid fa-calendar-days w-5"></i>
        <span v-if="!collapsed">Monthly Plans</span>
      </div>

    </nav>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

export default {
  props: ['collapsed', 'mobileOpen'],
  components: { SidebarItem }
}
</script>
