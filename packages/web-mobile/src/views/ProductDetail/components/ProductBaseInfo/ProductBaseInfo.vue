<script>
import ProductOption from '../ProductOption.vue';

export default {
  props: {
  },
  components: { ProductOption },
}
</script>


<template>
  <div class="product_baseinfo">
    <div class="product_baseinfo_title">Infomation</div>
    <div class="product_baseinfo_content">
      <van-cell-group>
        <van-cell value="Targaryen">
          <template #title>
            <span class="custom-title">Brand</span>
          </template>
        </van-cell>
        <van-cell value="Cat">
          <template #title>
            <span class="custom-title">Name</span>
          </template>
        </van-cell>
        <van-cell value="Black with scarlet ripples">
          <template #title>
            <span class="custom-title">Color</span>
          </template>
        </van-cell>
        <van-cell value="1">
          <template #title>
            <span class="custom-title">Capacity</span>
          </template>
        </van-cell>
        <van-cell value="Shop">
          <template #title>
            <span class="custom-title">Seller</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <ProductOption :label="`Read More`"></ProductOption>
  </div>
</template>


<style lang="less" scoped>
.product_baseinfo {
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
    padding: 4px 0 10px 0;
    .custom-title {
      font-size: 14px;
      font-weight: 600;
      color: #777777;
    }
    ::v-deep(.van-cell__title) {
      flex: none;
    }
    ::v-deep(.van-cell__value) {
      color: #000000;
      font-weight: 600;
    }
  }
}
</style>