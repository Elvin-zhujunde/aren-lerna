// Proxy(可以实现什么功能？)
// let p = new Proxy(target, handler)
const onWatch = (obj, setBind, getBind) => {
  const handler = {
    get(target, property, receiver) {
      getBind(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
  }
  return new Proxy(obj, handler)
}

const obj = { a: 1 }
const p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  },
)
p.a = 2 // 监听到属性
p.a // 'a' = 2
