<script>
import ProductInfoItem from './ProductInfoItem.vue';

export default {
  components: { ProductInfoItem }
}
</script>

<template>
  <div class="product_infobar">
    <ProductInfoItem
      type="rate"
      :rateVal="2.5"
      title="100 REVIEWS"
    ></ProductInfoItem>
    <ProductInfoItem
      type="icon"
      title="PRODUCT"
      :describe="`New`"
      icon="passed"
    ></ProductInfoItem>
    <ProductInfoItem type="icon" title="TASLK" icon="gift-o"></ProductInfoItem>
    <ProductInfoItem type="icon" title="SALLKJ" icon="cart-o"></ProductInfoItem>
    <ProductInfoItem type="rate" title="JASLDKJ" :rateVal="4"></ProductInfoItem>
  </div>
</template>

<style lang="less" scoped>
.product_infobar::-webkit-scrollbar {
  width: 0px;
}
.product_infobar {
  padding-top: 16px;
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
}
</style>