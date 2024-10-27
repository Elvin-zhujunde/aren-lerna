<template>
    <!-- vue3中模版结构可以没有根标签 -->
    <div class="father">
        <div class="child">
            <teleport to="body">
                <input
                    type="text"
                    v-model="keyword"
                />
                <h3>{{ keyword }}</h3>
            </teleport>
        </div>
        <Suspense>
            <!-- v-slot:default,默认要渲染的组件 -->
            <template v-slot:default>
                <Child :msg="keyword"></Child>
            </template>
            <!-- v-slot:fallback里面写组件加载过程中需要显示的内容 -->
            <template v-slot:fallback>
                <div>
                    <h3>加载中，请稍等。。。</h3>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { defineAsyncComponent } from "vue"
const Child = defineAsyncComponent(() =>
    import("./ChildVue.vue")
) //动态引入

const keyword = ref("123")
</script>
