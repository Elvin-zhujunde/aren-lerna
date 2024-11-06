<template>
  <Suspense>
    <template #default>
      <asyncVue :timeout="3000" />
    </template>
    <template #fallback>
      <h1>加载中……</h1>
    </template>
  </Suspense>
</template>

<script>
import asyncVue from './async.vue'

export default {
  components: {
    asyncVue,
  },
}
</script>

<style></style>
