<template>
  <div class="confim-modal">
    <button @click="isOpen = true">打开</button>

    <Teleport to="#footer">
      <div v-if="isOpen">
        <p>信息信息信息信息信息信息信息信息信息信息信息</p>
        <button @click="isOpen = false">取消</button>
      </div>
    </Teleport>
  </div>
  <asyncComponent />
</template>

<script>
import { ref } from 'vue'
import asyncComponent from './components/suspense.vue'

export default {
  components: {
    asyncComponent,
  },
  setup() {
    const isOpen = ref(false)
    return { isOpen }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
