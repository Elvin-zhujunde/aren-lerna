<template>
    <div class="child">
        <div>我是子组件</div>
        <h1>{{ msg }}</h1>
        <h3>{{ sum }}</h3>
    </div>
</template>

<script>
import { ref } from "vue"
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    setup() {
        const sum = ref(0)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(sum)
            }, 3000)
            if (sum.value != 0) {
                setTimeout(() => {
                    reject(sum)
                }, 3000)
            }
        })
    },
}
</script>
<style scoped>
.child {
    padding: 10px;
    background-color: #e8f;
}
</style>
