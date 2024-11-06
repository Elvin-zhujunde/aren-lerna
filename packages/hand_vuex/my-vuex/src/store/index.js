import Vue from 'vue'
import Vuex from './myVuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 1,
    },
    mutations: {
        increase(state, arg) {
            state.num += arg || 100
        },
    },
    actions: {
        asyncIncrease({ commit }, arg) {
            setTimeout(() => {
                commit('increase', arg)
            }, 1000)
        },
    },
    modules: {},
    getters: {
        newNum(state) {
            return state.num * 2
        },
    },
})
