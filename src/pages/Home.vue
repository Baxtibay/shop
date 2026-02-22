<script setup>
import { ref } from 'vue'
import CreateShopModal from '@/components/modals/CreateShopModal.vue'

const showModal = ref(false)
</script>

<template>
  <button
    @click="showModal = true"
    class="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Create Shop
  </button>

  <CreateShopModal 
  v-if="showModal" 
  @close="showModal = false"
  />
</template>
