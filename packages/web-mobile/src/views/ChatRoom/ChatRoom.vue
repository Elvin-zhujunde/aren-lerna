<script>
import { Toast } from "vant";
import { onMounted, reactive, toRefs } from "vue";
import NavBar from "./components/NavBar.vue";
import Notice from "./components/Notice.vue";
import { initWebSocket } from "@/api/ws/index.js";
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import EmojiPop from "./popComponents/EmojiPop.vue";
export default {
  setup() {
    const store = mainStore();
    const state = reactive({
      emojiShow: false,
      userinfo: {
        headImg:
          "http://118.178.235.143:3000/upload_09aa61e7d7372605853afaee9d3e4698.jpg",
        username: "zjd"
      },
      // 发送的信息
      message: "",
      //webSocket 链接
      ws: {},
      messageList: [],
      roomConfig: {
        userCount: 0
      },
      operationBarList: []
    });
    const scrollToBottom = () => {
      let el = document.getElementById("chatroom");
      el.scrollTop = el.scrollHeight;
    };
    const sendMessage = () => {
      // 判空输入框
      if (state.message === "") {
        Toast({
          message: "发送信息不能为空！",
          position: "bottom"
        });
        return;
      }
      // 非法字符检测
      let params = {
        sender: {
          headImg:
            "http://118.178.235.143:3000/upload_09aa61e7d7372605853afaee9d3e4698.jpg",
          username: "zjd"
        },
        message: state.message
      };
      state.ws.send(JSON.stringify({ type: "message", message: params }));
      state.message = "";
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    };
    const initWslistener = () => {
      state.ws.onopen = function () {
        state.ws.send(
          JSON.stringify({
            type: "connect",
            userinfo: state.userinfo
          })
        );
        Toast.fail("服务器连接成功");
      };

      state.ws.onclose = function (e) {};
      state.ws.onerror = function () {
        Toast.fail("服务器error");
      };

      state.ws.onmessage = function (e) {
        //接收服务器返回的数据
        let resData = JSON.parse(e.data);
        console.log("接收服务器返回的数据 =====>", resData);
        state.messageList = resData.chat;
      };
    };
    onMounted(() => {
      state.ws = initWebSocket();
      initWslistener();
      console.log(store.$state);
    });
    return {
      ...toRefs(state),
      sendMessage
    };
  },
  components: { NavBar, Notice, EmojiPop }
};
</script>
<template>
  <NavBar></NavBar>
  <Notice></Notice>
  <div class="chat-room-wrapper">
    <div id="chatroom" class="chat-room_list">
      <div
        class="chat-room_item"
        v-for="(item, index) in messageList"
        :key="index"
      >
        <div
          class="chat-room_item_them"
          v-if="item.sender.username !== userinfo.username"
        >
          <img class="headImg" :src="item.sender.headImg" alt="" />
          <div class="bubble-box">
            {{ item.message }}
          </div>
        </div>
        <div class="chat-room_item_me" v-else>
          <div class="bubble-box">
            {{ item.message }}
          </div>
          <img class="headImg" :src="item.sender.headImg" alt="" />
        </div>
      </div>
    </div>

    <div class="chat-input">
      <van-field
        autosize
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="请输入要发送的信息"
      >
        <template #button>
          <van-button size="small" @click="sendMessage()" type="primary"
            >发送</van-button
          >
        </template>
      </van-field>
      <van-grid icon-size="12" :border="false" :column-num="5">
        <van-grid-item icon="plus"></van-grid-item>
        <van-grid-item icon="smile-o" @click="emojiShow = true"></van-grid-item>
        <van-grid-item icon="photo-o"></van-grid-item>
        <van-grid-item icon="upgrade"></van-grid-item>
        <van-grid-item icon="music-o"></van-grid-item>
      </van-grid>
      <div class="popGroup">
        <EmojiPop v-show="emojiShow"></EmojiPop>
      </div>
    </div>
  </div>
</template>
<style lang='less' scoped>
::v-deep(.van-field__control) {
  padding: 0 5px;
}

::v-deep(.van-cell) {
  padding: 5px;
}

.chat-room-wrapper {
  width: 100%;
  height: 550px;
  .chat-room_list {
    height: 539px;
    overflow-y: scroll;
    padding: 10px 10px;
    .chat-room_item {
      .chat-room_item_them {
        display: flex;
        margin-bottom: 20px;
        .bubble-box {
          max-width: 70vw;
          padding: 10px;
          border-radius: 10px;
          position: relative;
          word-break: break-all;
          font-size: 14px;
          margin-left: 15px;
          white-space: pre-line;

          // background-color: #dddddd;
          background-color: @bubble-color;
          box-shadow: 0px 1px 10px #d4d5d6;
        }
        .bubble-box::before {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 8px solid;
          border-color: transparent @bubble-color transparent transparent;
          left: -16px;
          top: 12px;
        }
      }
      .chat-room_item_me {
        display: flex;
        justify-content: end;
        margin-bottom: 20px;
        .bubble-box {
          max-width: 70vw;
          padding: 10px;
          border-radius: 10px;
          position: relative;
          word-break: break-all;
          font-size: 14px;
          margin-right: 15px;
          white-space: pre-line;

          // background-color: #dddddd;
          background-color: @bubble-color;
          box-shadow: 0px 1px 10px #d4d5d6;
        }
        .bubble-box::before {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 8px solid;
          border-color: transparent transparent transparent @bubble-color;
          right: -16px;
          top: 12px;
        }
      }
    }
  }
  .chat-input {
    // height: 44px;
    background-color: #f1f1f1;
    position: fixed;
    width: 375px;
    bottom: 0;
    background: #ffffff;
  }
  .headImg {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
}
</style>