<script>
import ProductOption from '../ProductOption.vue';

export default {
  components: { ProductOption }
}
</script>


<template>
  <div class="product_shipping">
    <div class="product_shipping_title">Shipping</div>
    <div class="product_shipping_Item">
      <div class="product_shipping_Item_iconBox">
        <van-icon name="wap-home" color="#ffffff" />
      </div>
      <div class="product_shipping_Item_content"><b>Same Day Delivery</b></div>
      <div class="product_shipping_Item_price raise">R￥20.00</div>
    </div>
    <div class="product_shipping_Item">
      <div class="product_shipping_Item_iconBox">
        <van-icon name="goods-collect" color="#ffffff" />
      </div>
      <div class="product_shipping_Item_content">
        <b>Store Pickup</b><br /><span style="color: #6d6d6d">
          ( 1 hour after payment approval )</span
        >
      </div>
      <div class="product_shipping_Item_price free">Free</div>
    </div>
    <ProductOption :label="`Shipping options`"></ProductOption>
  </div>
</template>


<style lang="less" scoped>
.raise {
}
.free {
    color: #1daa3b;
}
.product_shipping {
  margin: 8px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 10px;
  &_title {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 8px;
  }
  &_Item {
    display: flex;
    margin: 16px 0;
    &_iconBox {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #1daa3b;
      ::v-deep(.van-icon) {
        font-size: 20px;
      }
    }
    &_content {
      flex: 1;
      padding: 0 10px;
      font-size: 14px;
    }
    &_price {
        font-weight: 600;
        font-size: 14px;
    }
  }
}
</style>