
<script setup>
import { onMounted } from '@vue/runtime-core';
import NavBar from '../../components/NavBar.vue';

onMounted(() => {
  // 获取可视区域的高度
  let viewHeight = document.documentElement.clientHeight;

  function lazyload() {
    // 获取到页面上的所有的img
    // 判断某个img是否进入可视区域
    // 如果进入，就把它自身的data-original的值取出来放到src里面
    let eles = document.querySelectorAll('img[data-original][lazyload]');
    // console.log(eles);
    eles.forEach((item) => {
      let rect = item.getBoundingClientRect(); // 用于一次性获取某个容器相对于浏览器窗口的上下左右的位置
      // console.log(rect);
      if (rect.top < viewHeight  && rect.bottom >= 0) {
        // 进入可视区域
        item.src = item.dataset.original;
        item.removeAttribute('data-original');
        item.removeAttribute('lazyload');
      }
    });
  }
  lazyload();
  // 鼠标滚动时执行lazyload函数
  document.addEventListener('scroll', lazyload);
});
</script>

<template>
  <NavBar :title="`懒加载`"></NavBar>
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=2581522032,2615939966&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1417505637,1247476664&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=3659156856,3928250034&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1416385889,2308474651&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1599162854,1822154160&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=1476844859,894832600&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=3728410568,989468460&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
  <img
    src=""
    lazyload="true"
    data-original="https://t7.baidu.com/it/u=3696285528,2808863331&fm=193&f=GIF"
    alt=""
    class="image-item"
  />
</template>



<style>
.image-item {
  width: 100%;
  display: block;
  margin-bottom: 50px;
}
</style>