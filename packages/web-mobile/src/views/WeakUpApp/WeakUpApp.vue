<template>
  <NavBar :title="`唤醒app`"/>
  <van-grid :column-num="2" :gutter="0" clickable>
    <van-grid-item
      v-for="item in configList"
      :key="item.appEName"
      :text="item.appCName"
      @click="weakUpApp(item)"
    />
  </van-grid>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import weakUpAppApi from "../../utils/h5WeakupApp.js";
export default {
  components: { NavBar },
  setup() {
    const route = useRoute();
    const { openApp } = weakUpAppApi;
    const state = reactive({
      changeCode: "123",
      configList: [
        {
          appCName: "支付宝",
          appEName: "Alipay",
          urlScheme: `alipay://`,
          downLoadUrl: "https://www.alipay.com/",
          universalLink: ``
        },
        {
          appCName: "微信",
          appEName: "WeChat",
          urlScheme: `weixin://`,
          downLoadUrl:
            "https://itunes.apple.com/cn/app/id1422958471?l=zh&ls=1&mt=8",
          universalLink: ``
        },
        {
          appCName: "淘宝",
          appEName: "taobao",
          urlScheme: `taobao://`,
          downLoadUrl: "",
          universalLink: ``
        },
        {
          appCName: "QQ",
          appEName: "MQq",
          urlScheme: `mqq://`,
          downLoadUrl: "https://im.qq.com/download/",
          universalLink: ``
        },
        {
          appCName: "海康云耀",
          appEName: "Hikyun",
          urlScheme: `intent://open.yy`,
          downLoadUrl: "https://www.me-app.net/Fy2t",
          universalLink: ``
        }
      ]
    });
    // console.log(route);
    const weakUpApp = (configItem) => {
      openApp(configItem);
      return;
    };
    onMounted(() => {});
    return {
      ...toRefs(state),
      weakUpApp
    };
  }
};
</script>

<style lang="less" scoped>
.testItem {
  margin: 20px 0;
}
</style>