//index.js
var util = require('../../utils/util.js')
var config = require('../../config')
var qcloud = require('../../vendor/client-sdk/index')

var app = getApp();

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  bindGetUserInfo: function () {
    if (this.data.logged) return
    util.showBusy('正在登录')
    const session = qcloud.Session.get()
    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
          app.globalData.userInfo = res
          wx.switchTab({
            url: '../kaoqin/kaoqin'
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
          app.globalData.userInfo = res
          wx.switchTab({ url: '../kaoqin/kaoqin' })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  }
})
