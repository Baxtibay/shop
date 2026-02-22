<script setup>
import { ref } from 'vue'
import { useShopStore } from '@/stores/shopStore'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['close'])

const name = ref('')
const shopStore = useShopStore()
const toast = useToast()

async function submit() {
  if (!name.value.trim()) {
    toast.error('Shop nomini kiriting')
    return
  }

  try {
    await shopStore.createShop(name.value)

    toast.success('Shop muvaffaqiyatli yaratildi ✅')
    name.value = ''
    emit('close')

  } catch (e) {
    toast.error('Xatolik yuz berdi')
  }
}
</script>

<template>
  <BaseModal @close="$emit('close')">
    <h2 class="text-lg font-semibold mb-4">Create Shop</h2>

    <div class="flex items-center">
      <input
        v-model="name"
        class="border w-full p-2 mr-4 focus:outline-none"
        placeholder="Shop nomi"
      />

      <button
        @click="submit"
        :disabled="shopStore.loading"
        class="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <svg
          v-if="shopStore.loading"
          class="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none"
          />
        </svg>

        {{ shopStore.loading ? 'Creating...' : 'Create' }}
      </button>
    </div>
  </BaseModal>
</template>
