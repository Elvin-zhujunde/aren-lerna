
<script>
import ProductOption from '../ProductOption.vue';
import ProductInfoBar from './ProductInfoBar.vue';
import ProductInfoPrice from './ProductInfoPrice.vue';

export default {
  components: { ProductInfoBar, ProductInfoPrice, ProductOption }

}
</script>
<template>
  <div class="product_info_bar">
    <div class="product_name">TarGaryen Cat</div>
    <ProductInfoBar></ProductInfoBar>
    <ProductInfoPrice
      :oldprice="19999.99"
      :newprice="9999.99"
      :installment="833.33"
    ></ProductInfoPrice>
    <ProductOption :label="`PayMent methods`"></ProductOption>
  </div>
</template>
  
<style lang="less" scoped>
.product_info_bar {
  margin: 16px 0 8px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 10px;
}
.product_name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}
</style>