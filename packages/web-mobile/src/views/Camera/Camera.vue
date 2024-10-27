<template>
  <video id="video" width="375" height="300" autoplay muted></video>
  <van-button @click="takePhotos()">拍照</van-button>
  <canvas id="canvas" width="1280" height="720"></canvas>
</template>

<script>
import { onMounted, reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      aVideo: null, // the actual video element (from the HTML5 Media Source Extensions)
      aCanvas: null, // the canvas element (from the HTML5 canvas Extension)
      ctx: null, // the canvas 2d context (from the HTML5 2D Context Extension)
    });

    const noStream = function (err) {
      console.log('摄像头打开失败！');
      console.error(err);
    };
    const takePhotos = function () {
      state.ctx.drawImage(aVideo, 0, 0, 1280, 720); //将获取视频绘制在画布上
    };

    onMounted(() => {
      state.aVideo = document.getElementById('video');
      state.aCanvas = document.getElementById('canvas');
      state.ctx = state.aCanvas.getContext('2d');

      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia; //获取媒体对象（摄像头）
      navigator.getUserMedia(
        {
          video: {
            width: { ideal: 1280 }, //分辨率宽
            height: { ideal: 720 }, //分辨率高
            frameRate: { ideal: 30, max: 30 }, //帧率
          },
          audio: true,
        },
        function (stream) {
          video.srcObject = stream;
          console.log(video.srcObject);
          video.onerror = function () {
            stream.stop();  
          };
          stream.onended = noStream;
          video.onloadedmetadata = function () {
            console.log('摄像头成功打开！');
          };
        },
        noStream
      );
    });
    return {
      takePhotos,
    };
  },
};
</script>

<style>
</style>