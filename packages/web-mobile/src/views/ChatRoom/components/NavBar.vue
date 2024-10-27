<script>
import router from '../../../router'

export default {
  props: {
    title: {
      default: '默认聊天室',
      type: String,
    },
  },
  setup () {
    const clickLeft = () => {
      console.log('clickLeft')
      router.go(-1);
    }
    const clickRight = () => {
      console.log('clickRight')
    }

    return {
      clickLeft,
      clickRight,
    }
  },
}
</script>
<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar-content">
      <div class="nav-bar_left" @click="clickLeft()">
        <van-icon name="arrow-left" />
      </div>
      <div class="nav-bar_title">{{ title }}</div>
      <div class="nav-bar_right" @click="clickRight()">
        <van-icon name="ellipsis" />
      </div>
    </div>
  </div>
</template>
<style lang='less' scoped>
.nav-bar-wrapper {
  height: 44px;
  width: 375px;
  padding: 0 10px;
  .nav-bar-content {
    display: flex;
    align-items: center;
    line-height: 44px;
    font-size: 16px;

    .nav-bar_left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
    }
    .nav-bar_title {
      flex: 1;
      font-family: "微软雅黑";
      font-weight: 600;
      text-align: center;
    }
    .nav-bar_right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
    }
  }
}
</style>