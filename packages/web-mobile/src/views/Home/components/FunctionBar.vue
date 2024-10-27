

<script>

export default {
  props: ['route'],
  setup (props) {
  }
}
</script>
<template>
  <van-grid clickable :column-num="3">
    <van-grid-item
      v-for="(item, index) in route"
      :key="index"
      :icon="item.meta.icon"
      :text="item.meta.name"
      :to="item.path"
      :class="{ none: !item.meta.isFunc }"
    />
  </van-grid>
</template>
<style>
.none {
  display: none;
}
</style>