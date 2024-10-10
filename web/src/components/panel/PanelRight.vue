<template>
    <div class="main-right-panel">
        <div class="growthTrend-type-panel">
            <slot></slot>
        </div>
        <LeftOutlined
            v-if="value"
            @click="toggle()"
            class="collapse-btn"
        />
        <RightOutlined
            v-else
            @click="toggle()"
            class="collapse-btn"
        />
    </div>
</template>

<script setup>
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
const [value, toggle] = useToggle(true)
const rightPx = computed(() => (value.value ? "-400px" : "0px"))
function onCollapse() {}
</script>
<style lang="less" scoped>
.main-right-panel {
    position: fixed;
    right: v-bind(rightPx);
    top: 55px;
    z-index: 50;
    width: 400px;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
    z-index: 10;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    transition: 1s;
}

.growthTrend-type-panel {
    height: 100%;
    display: flex;
    flex-direction: column;

    // background: #fff;
    // .box-border-background-style();
}
.collapse-btn {
    position: absolute;
    width: 20px;
    height: 80px;
    left: -20px;
    top: 50%;
    transform: translate(0, -50%);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
}
</style>
