
<script>
export default {

}
</script>
<template>
  <div class="product_buy">
    <div class="product_buy_select">
      <van-cell title="Quantity"  is-link :value="`01`" />
    </div>
    <div class="product_buy_btn">
      <van-button color="rgba(56, 20, 187, 0.792)"  round block>Buy Now</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.product_buy {
  margin: 8px 0;
  background-color: #fff;
  // background-color: #3814bbcb;
  border-radius: 8px;
  padding: 16px 20px;
  &_select {
    ::v-deep(.van-cell) {
      background: #e7e6e6e0;
      border-radius: 8px;
      color: #000;
      .van-cell__title {
        font-weight: 600;
      }
    }
  }
  &_btn {
    padding-top: 16px;
  }
}
</style>