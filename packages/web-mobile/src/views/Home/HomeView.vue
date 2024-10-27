
<script>
import { reactive, toRefs } from 'vue';
import routes from "@/router/routes.js";
import FunctionBar from './components/FunctionBar.vue';
export default {
  setup () {
    const state = reactive({
      pullRefreshConfig: {
        count: 0,
        loading: false,
        route: []
      }
    });
    state.route = routes;
    const onRefresh = () => {
      setTimeout(() => {
        state.pullRefreshConfig.loading = false;
      }, 1000);
    };
    return {
      ...toRefs(state),
      onRefresh,
    };
  },
  components: {  FunctionBar }
};
</script>
<template>
  <FunctionBar :route="route"></FunctionBar>
</template>

<style>
</style>