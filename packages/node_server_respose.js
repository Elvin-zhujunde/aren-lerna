const jwt = require('jsonwebtoken')

const CODE = {
  SUCCESS: 200, //成功
  PARAM_ERROR: 10001, //参数错误
  USER_ACCOUNT_ERROR: 20001, //账号或密码错误
  USER_LOGIN_ERROR: 30001, //用户未登录
  BUSINESS_ERROR: 40001, //业务请求失败
  AUTH_ERROR: 50001, //认证失败或token过期
}

module.exports = {
  CODE,
  /*
   *  分页解构封装
   *  @param {number} pageNum
   *  @param {number} pageSize
   * */

  //标记1
  //找了很久的问题，这里之前未解构
  pager({ pageNum = 1, pageSize = 10 }) {
    //强制转数字
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)

    const skipIndex = (pageNum - 1) * pageSize
    return {
      page: {
        pageNum,
        pageSize,
      },
      skipIndex,
    }
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
    // log4js.debug(data)
    return {
      code,
      data,
      msg,
      success: true,
    }
  },
  fail(msg = '', code = CODE.BUSINESS_ERROR, data = '') {
    // log4js.debug(msg)
    return {
      code,
      data,
      msg,
      success: false,
    }
  },
  // 递归拼接菜单树形列表
  getTreeMenu(rootList, id, list) {
    for (let i = 0; i < rootList.length; i++) {
      let item = rootList[i]
      if (String(item.parentId.slice().pop()) == String(id)) {
        list.push(item._doc)
      }
    }
    list.map(item => {
      item.children = []
      this.getTreeMenu(rootList, item._id, item.children)
      if (item.children.length == 0) {
        delete item.children
      } else if (item.children.length > 0 && item.children[0].menuType == 2) {
        // 快速区分按钮和菜单，用于后期做菜单按钮权限控制
        item.action = item.children
      }
    })
    return list
  },
  // 递归拼接部门树形列表
  getTreeDept(rootList, id, list) {
    for (let i = 0; i < rootList.length; i++) {
      let item = rootList[i]
      if (String(item.parentId.slice().pop()) === String(id)) {
        list.push(item._doc)
      }
    }
    list.map(item => {
      item.children = []
      this.getTreeDept(rootList, item._id, item.children)
      if (item.children.length === 0) {
        delete item.children
      }
    })
    return list
  },
  //解密token
  decoded(authorization) {
    if (authorization) {
      let token = authorization.split(' ')[1]
      return jwt.verify(token, 'admin')
    }
    return ''
  },

  // 时间格式化
  formatDate(date, rule) {
    let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k] + '' //强制转字符串
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? val : ('00' + val).substr(val.length))
      }
    }
    return fmt
  },
}
