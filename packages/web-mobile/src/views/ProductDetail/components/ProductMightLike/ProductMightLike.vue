<script>
import ProductOption from '../ProductOption.vue';

export default {
  props: {

  },
  components: { ProductOption },
}
</script>


<template>
  <div class="product_mightLike">
    <div class="product_mightLike_title">You might also like</div>
    <div class="product_mightLike_list">
      <div class="product_mightLike_item">
        <div class="product_mightLike_item_left">
          <van-image
            fit="fill"
            radius="8px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="product_mightLike_item_right">
          <div class="product_mightLike_item_name">
            Lightbringer Sword - Orginal (Gasoline)
          </div>
          <div class="product_mightLike_item_price">￥ 179</div>
          <div class="product_mightLike_item_installment">6 × ￥29.83</div>
        </div>
      </div>
      <div class="product_mightLike_item">
        <div class="product_mightLike_item_left">
          <van-image
            fit="fill"
            radius="8px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="product_mightLike_item_right">
          <div class="product_mightLike_item_name">
            Lightbringer Sword - Orginal (Gasoline)
          </div>
          <div class="product_mightLike_item_price">￥179</div>
          <div class="product_mightLike_item_installment">6 × ￥29.83</div>
        </div>
      </div>
      <div class="product_mightLike_item">
        <div class="product_mightLike_item_left">
          <van-image
            fit="fill"
            radius="8px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="product_mightLike_item_right">
          <div class="product_mightLike_item_name">
            Lightbringer Sword - Orginal (Gasoline)
          </div>
          <div class="product_mightLike_item_price">￥ 179</div>
          <div class="product_mightLike_item_installment">6 × ￥29.83</div>
        </div>
      </div>
    </div>
    <ProductOption :label="`Explore more`"></ProductOption>
  </div>
</template>


<style lang="less" scoped>
.product_mightLike {
  margin: 8px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 10px;
  &_title {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 8px;
  }
  &_list {
    padding-bottom: 8px;
  }
  &_item {
    display: flex;
    padding: 16px 0;
    border-bottom: 2px solid #e4e1e1;
    &_left {
      width: 80px;
      ::v-deep(.van-image__img) {
        width: 80px;
        height: 80px;
      }
    }
    &_right {
      margin-left: 15px;
      padding-bottom: 5px;
      display: flex;
      flex-direction: column;
    }
    &_name {
      font-size: 15px;
      font-weight: 600;
    }
    &_price {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: end;
      font-size: 14px;
      font-weight: 800;
      font-family: "黑体";
    }
    &_installment {
      font-size: 11px;
      margin-top: 2px;
      margin-left: 2px;
      color: #746a6a;
    }
  }
}
</style>