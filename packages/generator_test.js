// function* test() {
//   console.log(1);
//   console.log(2);
//   yield console.log(3);
//   console.log(4);
//   console.log(5);
//   yield console.log(6);
//   console.log(7);
// }
// const it = test(); // 只会返回一个遍历器,迭代器
// it.next(); // 1,2,3
// it.next(); // 1,2,3,4,5,6

function* foo(x) {
  const y = 2 * (yield x + 1)
  const z = yield y / 3
  return x + y + z
}

const i = foo(5) // 返回的是迭代器
console.log(i.next()) // { value: 6, done: false } 说明 yield(x+1)的值是6
console.log(i.next(12)) // { value: 8, done: false } 说明 yield(x+1)的值被改成了12，然后才有了下次的yield(y/3) = 8
console.log(i.next())
