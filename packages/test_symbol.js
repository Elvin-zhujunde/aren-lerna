// 案例一
// let asym = Symbol('nanlv')
// let bsym = Symbol('nanlv')
// console.log(asym == bsym);  // 输出 false

// 案例二
// let asym = Symbol.for('nanlv')
// let bsym = Symbol.for('nanlv')
// console.log(asym == bsym);  // 输出 true

// let s = Symbol.for('nanlv');
// console.log(Symbol.keyFor(s)); // nanlv

import { isIP } from './index'

const sym = Symbol('123')
const obj = {
  [sym]: 'value',
}
// const obj1 = {
//     name: "zjd",
// }
console.log(Object.keys(obj))
console.log(Object.getOwnPropertySymbols(obj))
console.log(obj[sym]) // "value"

class Login {
  constructor(username, password) {
    this.PASSWORD = Symbol('PASSWORD')
    this.username = username
    this[this.PASSWORD] = password
  }

  checkPassword(pwd) {
    // if (this[PASSWORD] == pwd) {
    //     console.log('密码正确')
    // }
    return this[this.PASSWORD] === pwd
    // console.log(this[this[PASSWORD]])
  }
}

const use1 = new Login('zjd', 1234)
use1.checkPassword(1234)

isIP()
