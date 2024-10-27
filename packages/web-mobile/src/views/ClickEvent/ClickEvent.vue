<template>
  <div id="ClickEvent" class="ClickEvent" @click="dbClick">
    <NavBar :title="`用户操作测试`" />
    <span class="longTab"> 本界面可以测试长按 </span>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, reactive } from "vue";
import NavBar from "../../components/NavBar.vue";

export default {
  components: { NavBar },
  setup() {
    const state = reactive({
      timer: null,
      preLocationX: 0,
      preLocationY: 0,
      endLocationX: 0,
      endLocationY: 0,
    });

    const dbClick = (e) => {
      if (state.timer === null) {
        state.timer = setTimeout(() => {
          state.timer && alert("单击啦");
          state.timer = null;
        }, 300);
      } else {
        alert("双击啦");
        state.timer = null;
      }
    };
    const unloadFn = (e) => {
      console.log(e);
    };
    const LongTab = () => {
      // const element = document.getElementsByClassName("ClickEvent")[0];
      function cb() {
        alert("长按长按");
      }
      function addLongtabListener(target, callback) {
        let timer = 0; // 初始化timer
        target.ontouchstart = (e) => {
          state.preLocationX = e.targetTouches[0].screenX;
          state.preLocationY = e.targetTouches[0].screenY;
          timer = 0; // 重置timer
          timer = setTimeout(() => {
            callback();
            timer = 0;
          }, 380); // 超时器能成功执行，说明是长按
        };
        target.ontouchmove = (e) => {
          clearTimeout(timer); // 如果来到这里，说明是滑动
          //   alert(
          //     "滑动",
          //     e.targetTouches[0].screenX,
          //     e.targetTouches[0].screenY
          //   );
          timer = 0;
        };
        target.ontouchend = (e) => {
          state.endLocationX = e.changedTouches[0].screenX;
          state.endLocationY = e.changedTouches[0].screenY;
          if (state.endLocationX - state.preLocationX > 50) {
            alert("往右滑");
          } else if (state.preLocationX - state.endLocationX > 50) {
            alert("往左滑");
          }
          if (state.endLocationY - state.preLocationY > 50) {
            alert("往下滑");
          } else if (state.preLocationY - state.endLocationY > 50) {
            alert("往上滑");
          }
          if (
            state.preLocationY - state.endLocationY > 50 &&
            state.preLocationY > e.view.screen.height
          ) {
            alert("底部上滑");
          }
          // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
          timer && clearTimeout(timer);
        };
      }
      addLongtabListener(document.getElementById("ClickEvent"), cb);
    };
    onMounted(() => {
      LongTab();
    });

    onBeforeUnmount(() => {});
    return {
      dbClick,
    };
  },
};
</script>

<style>
.ClickEvent {
  min-height: 100vh;
}
.longTab {
  position: absolute;
  left: 50%;
  top: 80%;
  color: rgba(168, 168, 168, 0.918);
  transform: translate(-50%);
}
</style>
