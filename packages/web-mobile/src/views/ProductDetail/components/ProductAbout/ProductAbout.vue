<script>
import ProductOption from '../ProductOption.vue';

export default {
  props: {
    content: {
      type: String,
      default: "Cats are very cute animals,they are very special as well. It has pointy ears,round eyes,little claws,and short but soft fur.Cats like eating fish and mice. They like to keep themselves clean,they do that by licking their fur. We should love cat,because cats are our friends,too."
    }
  },
  components: { ProductOption },
}
</script>


<template>
  <div class="product_about">
    <div class="product_about_title">About</div>
    <div class="product_about_content">{{content}}</div>
    <ProductOption :label="`Read More`"></ProductOption>
  </div>
</template>


<style lang="less" scoped>


.product_about {
  margin: 8px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 10px;
  &_title {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 8px;
  }
  &_content {
    margin: 4px 0 10px 0;
    overflow: hidden; // 溢出隐藏
    text-overflow: ellipsis; // 溢出用省略号显示
    display: -webkit-box; // 作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
    -webkit-line-clamp: 5; // 显示的行数
    font-weight: 500;
    font-size: 15px;
    font-family: "隶体";
  }
}
</style>