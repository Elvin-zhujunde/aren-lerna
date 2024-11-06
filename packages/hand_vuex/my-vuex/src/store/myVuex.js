import Vue from 'vue'

class Store {
    constructor(options) {
        //   state
        this.vm = new Vue({
            data: {
                state: options.state,
            },
        })
        // getters实现
        let getters = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                },
            })
        })

        // mutations
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = arg => {
                mutations[mutationName](this.state, arg)
            }
        })

        // actions
        let actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = arg => {
                actions[actionName](this, arg)
            }
        })
    }

    commit = (method, arg) => {
        this.mutations[method](arg)
    }
    dispatch(method, arg) {
        this.actions[method](arg)
    }

    get state() {
        // this.$store.state.num
        return this.vm.state
    }
}

let install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                // 这是根组件
                this.$store = this.$options.store
            } else {
                // 子组件
                this.$store = this.$parent && this.$parent.$store
            }
        },
    })
}

let Vuex = {
    Store,
    install,
}

export default Vuex
