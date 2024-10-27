<script>
export default {
  props: {
    label: {
      type: String,
      default: 'options'
    }
  }
}
</script>

<template>
  <div class="product_option">
    <div class="product_option_label">{{ label }}</div>
    <div class="product_option_icon"><van-icon name="arrow" color="#3814bb" /></div>
  </div>
</template>

<style lang="less" scoped>
.product_option {
  display: flex;
  align-items: center;
  justify-content: space-between;
    padding: 8px 0 0 0;
  &_label {
    font-size: 16px;
    color: #3814bb;
    font-weight: 700;
  }
}
</style>