const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(fn) {
  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if (this.state === PENDING) {
      // 更改Promise状态
      this.state = RESOLVED
      //   赋值
      this.value = value
      //   执行成功回调
      this.resolvedCallbacks.map(cb => cb(value))
    }
  }

  function reject(value) {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.value = value
      this.rejectedCallbacks.map(cb => cb(value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : err => {
          throw err
        }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }

  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}

Promise.prototype.myAll = function (promises) {
  let res, rej
  let p = new Promise((resolve, reject) => {
    res = resolve()
    rej = reject()
  })
  let arr = []
  let count = 0
  for (const pItem of promises) {
    Promise.resolve(pItem).then(data => {
      arr[count] = data
      count--
      if (count === 0) {
        res(arr)
      }
    }, rej)
    count++
  }
  // 判断 传入的参数是一个可迭代对象
  if (count === 0) {
    res([])
  }
  return p
}

Promise.myAll([1, 2, 2, 3, 4]).then(res => {
  console.log(res)
})
