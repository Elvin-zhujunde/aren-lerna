<template>
    <div class="layout">
        <div class="layout-header">
            <LayoutMenu></LayoutMenu>
        </div>
        <div class="layout-content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue"
</script>

<style lang="less" scoped>
.layout {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .layout-content {
        flex: 1;
        // position: relative;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
