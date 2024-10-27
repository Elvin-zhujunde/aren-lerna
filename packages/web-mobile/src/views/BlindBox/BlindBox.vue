
<script>
import NavBar from "../../components/NavBar.vue";
export default {
  components: { NavBar }
};
</script>
<template>
  <NavBar :title="`爱情盲盒`"></NavBar>
  <div class="wrapper"></div>
</template>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: calc(100vh - 46px);
  background: #cccccc;
  overflow: hidden;
}
</style>