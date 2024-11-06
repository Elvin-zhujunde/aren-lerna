class Koa {
  middlewares = []
  use(mid) {
    this.middlewares.push(mid)
  }
}
function action(koaInstance, next) {
  const ctx = {
    a: 1,
  }
  let nextmiddlewareIndex = 1
  function next() {
    const nextmiddleware = koaInstance.middlewares[nextmiddlewareIndex]
    if (nextmiddleware) {
      nextmiddlewareIndex++
      nextmiddleware(ctx, next)
    }
  }
  koaInstance.middlewares[0](ctx, next)
}

const koa = new Koa()

koa.use((ctx, next) => {
  ctx.name = 'zjd'
  console.log(1)
  next()
  console.log(6)
})
koa.use((ctx, next) => {
  console.log(2)
  next()
  console.log(5)
})
koa.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})
action(koa)
