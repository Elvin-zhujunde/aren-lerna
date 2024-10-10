<template>
    <router-view></router-view>
</template>

<script setup>
import autofit from "autofit.js"

onMounted(() => {
    console.log("app")
    // autofit.init({
    //     dh: 960, // 设计稿高度
    //     dw: 1920, //设计稿宽度
    //     el: "#app",
    //     callback: res => {
    //         console.log(res)
    //     },
    //     resize: true, // 是否监听resize事件
    //     transition: 0, //过度时间，默认0
    //     delay: 0, //默认0
    //     // ignore: ['.gaodeMap','.leaflet','#someElementClassOrId']
    //     // ignore: [
    //     //     {
    //     //         el: ".gaodeMap", //必填
    //     //         height: "300px", //可选，需注明单位
    //     //         width: "80%", //可选，需注明单位
    //     //         scale: 1.2, //可选：回放程度，基于主元素缩放后的大小
    //     //         fontSize: 26, //可选，如果自定义缩放后文字大小不合适，可以在这里设置文字大小
    //     //     },
    //     // ],
    // })
})
onBeforeMount(() => {
    // autofit && auwtofit.off()
})
</script>
<style lang="less" scoped></style>
