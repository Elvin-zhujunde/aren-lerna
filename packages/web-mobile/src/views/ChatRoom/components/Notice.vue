<script>
export default {
  setup() {},
}
</script>
<template>
  <div class="notice-wrapper">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
        <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
        <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>
<style lang='less' scoped>
.notice-wrapper {
  width: 375px;
  height: 44px;
  font-size: 12px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>