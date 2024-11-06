# proxy

使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了Proxy，可以重定义更多的行为，比如
in、delete、函数调用等更多行为。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，ES6 原生提供 Proxy 构造函
数，用来生成 Proxy 实例。我们来看看它的语法：

```js
var proxy = new Proxy(
  {},
  {
    get: function (obj, prop) {
      console.log('设置 get 操作')
      return obj[prop]
    },
    set: function (obj, prop, value) {
      console.log('设置 set 操作')
      obj[prop] = value
    },
  },
)
proxy.time = 35 // 设置 set 操作
console.log(proxy.time) // 设置 get 操作 // 35
// 除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截
// propKey in proxy 的操作，返回一个布尔值。
// 使用 has 方法隐藏某些属性，不被 in 运算符发现
var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  },
}
var target = { _prop: 'foo', prop: 'foo' }
var proxy = new Proxy(target, handler)
console.log('_prop' in proxy) // false
```

# Proxy(可以实现什么功能？)

```js
// let p = new Proxy(target, handler)
let onWatch = (obj, setBind, getBind) => {
    let handler = {
        get(target, property, receiver) {
            getBind(target, property)
            return Reflect.get(target, property, re
   ceiver)
        },
        set(target, property, value, receiver) {
            setBind(value, property)
            return Reflect.set(target, property, va
   lue)
        }
    }
    return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
    obj,
    (v, property) => {
        console.log(`监听到属性${property}改变为
   ${v}`);
    },
    (target, property) => {
        console.log(`'${property}' = ${target[property]}`
        );
    }
)
p.a = 2 // 监听到属性
p.a // 'a' = 2

```

# 对比 Object.defineProperty

```js
const object1 = {}
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
})
object1.property1 = 77
// throws an error in strict mode 严格模式下报错
console.log(object1.property1)
// expected output: 42
```

# different

1. 他们都是做代理，definedProperty 是对 对象中的属性 进行代理，Proxy 是直接把 对象 就代理了.
2. defineProperty 相对于 Proxy , 他所代理的属性 能生成的属性很少(约5.6个) , Proxy的属性很多(约11个) , 配置选项很少 .
3. Proxy支持数组的代理,defineProperty 不支持
4. defineProperty 兼容更好,IE8以上 , Proxy 需要支持ES6的浏览器,比如IE11.
