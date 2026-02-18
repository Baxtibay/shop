<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from '../../layout/Layout.vue'
import Dashboard from '../../pages/Dashboard.vue'

export default {
  components: { Layout, Dashboard }
}
</script>
