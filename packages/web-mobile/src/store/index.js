import { defineStore } from 'pinia'
export const mainStore = defineStore('main', {
    // state 类似组件的data选项，函数形式返回对象
    state: () => {
        return {
            coder:'zjd',
            ws:{}
        }
    },
    getters: {},
    actions: {}
})  