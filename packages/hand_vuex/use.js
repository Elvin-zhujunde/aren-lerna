Vue.use = function (plugin) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
        return this
    }

    const args = toArray(arguments, 1) // 拿到其他参数
    args.unshift(this) // [this(Vue),xxxx,xxxx]
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
        plugin.apply(plugin, args)
    }
    installedPlugins.push(plugin)
    return this
}

// let Toast = {}
// Toast.install = function(Vue,options) {
//     let opt = {
//         defaultType:'center',//默认显示的位置
//         duration:'1500',//持续时间是1.5秒
//     }
//     for (const property in options) {
//         opt[property] = options[property]
//     }
//     Vue.prototype.$toast = (tips,type)=>{
//         if (type) {
//             opt.defaultType = type
//         }
//         let toastTpl = Vue.extend({
//             template:`<div class="vue-toast toast-${opt.defaultType}">${tips}</div>`
//         })
//         // 将插件挂载到Vue根结点
//         let tpl = new toastTpl().$mount().$el
//         document.body.appendChild(tpl)
//         setTimeout(() => {
//             document.body.removeChild(tpl)
//         }, opt.duration);
//     }
//     //往原型上对应的三个属性字段挂上三个函数
//     ['buttom','center','top'].forEach(type=>{
//         Vue.prototype.$toast[type] = (tips)=>{
//             return Vue.prototype.$toast(tips,type)
//         }
//     })
// }
