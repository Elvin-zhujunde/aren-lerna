<template>
  <NavBar :title="`合成事件`"></NavBar>
  <van-cell-group inset>
    <van-field
      id="input1"
      v-model="value1"
      label="未使用合成"
      @input="onInput1"
      placeholder="请输入"
    />
    <van-field
      id="input2"
      v-model="value2"
      label="使用合成"
      placeholder="请输入"
    />
  </van-cell-group>
</template>

<script>
import { ref, reactive, toRefs } from "@vue/reactivity";
import NavBar from "../../components/NavBar.vue";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    const state = reactive({
      value1: "",
      value2: "",
      iscomposition: false
    });
    const doSearch = () => {
      console.log(state.value2);
    };
    onMounted(() => {
      const input2 = document.querySelector("#input2");
      input2.addEventListener("input", (e) => {
        if (!state.iscomposition) {
          doSearch();
        }
      });
      input2.addEventListener("compositionstart", (e) => {
        state.iscomposition = true;
      });
      input2.addEventListener("compositionend", (e) => {
        state.iscomposition = false;
        doSearch();
      });
    });
    const onInput1 = () => {
      console.log(state.value1);
    };
    const onInput2 = (e) => {
      console.log(e);
    };
    return {
      ...toRefs(state),
      onInput1,
      onInput2
    };
  },
  components: { NavBar }
};
</script>

<style>
</style>