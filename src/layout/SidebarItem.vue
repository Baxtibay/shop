<template>
  <RouterLink
    :to="to"
    class="flex items-center gap-3 px-3 py-2 rounded-md transition group"
    :class="isActive ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'"
  >
    <i
      :class="[
        'fa-solid',
        icon,
        'w-5',
        isActive ? 'text-gray-900' : 'text-gray-500'
      ]"
    ></i>

    <span
      v-if="!collapsed"
      class="text-sm whitespace-nowrap"
    >
      {{ label }}
    </span>
  </RouterLink>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  props: ['icon', 'label', 'collapsed', 'to'],
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)

    return { isActive }
  }
}
</script>
