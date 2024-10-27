<script>
import { reactive, toRefs } from "vue";
import NavBar from "../../components/NavBar.vue";
export default {
  components: { NavBar },
  setup() {
    const state = reactive({
      overlayShow: false,
      fileList: [],
    });

    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      state.overlayShow = true;
    };

    return {
      ...toRefs(state),
      afterRead,
    };
  },
};
</script>
<template>
  <NavBar :title="`图片剪切`" rightIcon="photo-o"></NavBar>
  <div class="wrapper">
    <van-uploader
      :preview-image="false"
      :show-upload="true"
      v-model="fileList"
      :after-read="afterRead"
    >
      <van-button icon="plus" type="primary">上传文件</van-button>
    </van-uploader>
  </div>
  <van-overlay :show="overlayShow">
    <van-icon
      name="cross"
      size="26"
      color="#4d4d4d"
      style="position: absolute; right: 20px; top: 20px"
      @click.stop="overlayShow = false"
    />
    <div class="photo-cut-wrapper" @click.stop>
      <img :src="fileList[0].content" alt="" />
    </div>
  </van-overlay>
</template>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: calc(100vh - 46px);
  overflow: hidden;
}
.photo-cut-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(138, 138, 138);
  width: 100vw;
  height: 100vh;
  img {
    width: 100%;
  }
}
</style>
