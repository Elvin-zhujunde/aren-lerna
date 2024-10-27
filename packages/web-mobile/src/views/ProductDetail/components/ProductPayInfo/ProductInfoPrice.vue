
<script>
export default {
  props: ['oldprice', 'newprice', 'installment']
}
</script>


<template>
  <div class="product_info_price">
    <div class="product_info_price_oldprice">￥ {{ oldprice }}</div>
    <div class="product_info_price_newprice">￥{{ newprice }}</div>
    <div class="product_info_price_installment">12 × ￥{{ installment }}</div>
  </div>
</template>

<style lang="less" scoped>
.product_info_price {
  padding: 0px 0 16px 0;
  &_oldprice {
    color: #838383e0;
    text-decoration: line-through;
    font-size: 12px;
  }
  &_newprice {
    padding: 2px 0;
    font-size: 20px;
    font-weight: 700;
    font-family: "黑体";
  }
  &_installment {
    color: rgba(48, 48, 48, 0.74);
    font-weight: 600;
    font-size: 12px;
  }
}
</style>