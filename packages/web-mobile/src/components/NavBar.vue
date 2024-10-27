
<script>
import { Toast } from 'vant';

export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  setup () {
    const onClickLeft = () => history.back();
    const onClickRight = () => Toast('按钮');
    return {
      onClickLeft,
      onClickRight,
    };
  },
};
</script>
<template>
  <van-nav-bar
    :title="title"
    :fixed="true"
    placeholder
    safe-area-inset-top
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <van-icon name="arrow-left" size="18" />
    </template>
  </van-nav-bar>
</template>

<style>
</style>