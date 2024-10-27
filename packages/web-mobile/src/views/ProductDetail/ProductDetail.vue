<script>
import ProductNavBar from './components/ProductNavBar.vue'
import ProductInfoCard from './components/ProductPayInfo/ProductInfoCard.vue';
import ProductShipping from './components/ProductShipping/ProductShipping.vue';
import ProductBuy from './components/ProductBuy/ProductBuy.vue';
import ProductAbout from './components/ProductAbout/ProductAbout.vue';
import ProductBaseInfo from './components/ProductBaseInfo/ProductBaseInfo.vue';
import ProductRatingsReviews from './components/ProductRatingsReviews/ProductRatingsReviews.vue';
import ProductMightLike from './components/ProductMightLike/ProductMightLike.vue';


export default {
  components: {
    ProductNavBar,
    ProductInfoCard,
    ProductShipping,
    ProductBuy,
    ProductAbout,
    ProductBaseInfo,
    ProductRatingsReviews,
    ProductMightLike
  },
  setup () { },
};
</script>
<template>
  <ProductNavBar :title="`UI源自抖音：@新壳教育 `"></ProductNavBar>
  <!-- :class="{'gray':true}" -->
  <div class="product" >
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="i in 4" :key="i">
        <van-image
          width="100%"
          height="100%"
          fit="fill"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <ProductInfoCard></ProductInfoCard>
    <ProductShipping></ProductShipping>
    <ProductBuy></ProductBuy>
    <ProductAbout></ProductAbout>
    <ProductBaseInfo></ProductBaseInfo>
    <ProductRatingsReviews></ProductRatingsReviews>
    <ProductMightLike></ProductMightLike>
  </div>
</template>

<style lang="less" scoped>
.gray {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
.product {
  background-color: rgba(155, 155, 155, 0.1);
  padding: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 400px;
  text-align: center;
  ::v-deep(.van-image) {
    padding: 0 2px;
    img {
      border-radius: 8px;
    }
  }
}
</style>