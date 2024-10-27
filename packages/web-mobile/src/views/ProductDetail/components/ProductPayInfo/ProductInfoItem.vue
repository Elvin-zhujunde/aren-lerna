<script>
import { reactive, toRefs } from 'vue'
export default {
  props: {
    type: {
      type: String,
    },
    rateVal: {
      type: Number,
      default: 1
    },
    icon: {
      type: String
    },
    title: {
      type: String,
      default: 'title'
    },
    describe: {
      type: String,
      default: 'describe'
    },
  },
  setup () {
    const state = reactive({
      types: 'rate'
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<template>
  <div class="product_infoitem">
    <div class="product_infoitem_wrapper">
      <div class="title">{{ title }}</div>
      <div class="status status_rate" v-if="type === 'rate'">{{ rateVal }}</div>
      <div class="status status_icon" v-if="type === 'icon'">
        <van-icon :name="icon" />
      </div>
      <div class="describe">
        <van-rate
          allow-half
          color="rgb(34, 34, 34)"
          v-if="type === 'rate'"
          readonly
        />
        <div v-if="type === 'icon'" class="discribe_text">
          {{ describe }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.product_infoitem:first-child{
  padding: 0;
  padding-right: 15px;
}
.product_infoitem {
  text-align: center;
  display: inline-block;
  padding: 0 15px;
  .product_infoitem_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      height: 10px;
      font-size: 10px;
      color: #adadad;
      font-weight: 600;
    }

    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      padding-top: 5px;
    }
    .status_rate {
      font-weight: 600;
      font-size: 14px;
    }
    .status_icon {
      ::v-deep(.van-icon) {
        font-size: 14px;
        color: #1a1a1a;
        font-weight: 600;
      }
    }
    .describe {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      ::v-deep(.van-icon) {
        font-size: 10px;
      }
      .discribe_text {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
        height: 20px;
      }
      // font-size: 15px;
    }
  }
}
</style>