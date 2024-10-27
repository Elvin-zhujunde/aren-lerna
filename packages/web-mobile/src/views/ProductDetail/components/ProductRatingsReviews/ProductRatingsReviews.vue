<script>
import { reactive, toRefs } from 'vue';
import ProductOption from '../ProductOption.vue';

export default {
  props: {
    rateVal: {
      type: Number,
      default: 4
    }
  },
  setup () {
    const state = reactive({
      value: 2
    })
    return {
      ...toRefs(state)
    }
  },
  components: { ProductOption },
}
</script>


<template>
  <div class="product_ratingsreviews">
    <div class="product_ratingsreviews_title">ratings & reviews</div>
    <div class="product_rating_item">
      <div class="product_rating_item_num">3.9</div>
      <div class="product_rating_item_rate">
        <van-rate
          color="rgba(56, 20, 187, 0.792)"
          void-icon="star"
          :count="rateVal"
        />
      </div>
      <div class="product_rating_item_totalRate">{{ 155 }} ratings</div>
    </div>
    <div class="product_review_item">
      <div class="product_review_item_title">Will this Cat meow ?</div>
      <div class="product_review_item_rate">
        <van-rate
          v-model="value"
          color="#000000"
          void-icon="star"
          :count="2"
        />
      </div>
      <div class="product_review_item_content">
        　　A week ago, my best friend gave me a lovely cat. I love it very
        much. It is special. Its fur is black not yellow. So I call it little
        black. It has the same taste with me. We all like eating fish. So, after
        it comes to my home, nearly every meal will appear fish. I like playing
        with it. It always makes me laugh. Every morning, it will wake me up. It
        brings much happiness for me.
      </div>
    </div>
    <ProductOption :label="`All reviews`"></ProductOption>
  </div>
</template>


<style lang="less" scoped>
.product_ratingsreviews {
  margin: 8px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 10px;
  &_title {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 8px;
  }
  .product_rating_item {
    border-radius: 8px;
    width: 100%;
    text-align: center;
    background-color: #e7e6e6e0;
    margin: 8px 0 4px 0;

    &_num {
      font-size: 26px;
      font-weight: 600;
      padding-top: 15px;
    }
    &_rate {
      padding: 4px 0;
      ::v-deep(.van-icon) {
        font-size: 16px;
      }
    }
    &_totalRate {
      font-size: 12px;
      padding-bottom: 10px;
      font-weight: 600;
      color: #3f3f3f;
    }
  }
  .product_review_item {
    margin: 24px 0 16px 0;
    &_title {
      font-weight: 600;
    }
    &_rate {
        padding-top: 3px;
        ::v-deep(.van-icon){
            font-size: 13px;
        }
    }
    &_content {
      margin: 4px 0 10px 0;
      overflow: hidden; // 溢出隐藏
      text-overflow: ellipsis; // 溢出用省略号显示
      display: -webkit-box; // 作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
      -webkit-line-clamp: 3; // 显示的行数
      font-weight: 500;
      font-size: 15px;
      color: #575757;
    }
  }
}
</style>