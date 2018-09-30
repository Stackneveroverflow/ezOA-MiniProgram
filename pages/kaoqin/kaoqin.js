var reqUtil = require('../../utils/requestUtil')
var config = require('../../config')
var util = require('../../utils/util')
var app = getApp()

Page({
  data: {
    //要用JSON对象
    userInfo: {},
    checkStatus: null,
    msg:''
  },

  onLoad: function (options) {
    this.setData({ userInfo: app.globalData.userInfo, checkStatus:"打卡"})
    reqUtil.request({
      url: config.service.checkStatusUrl,
      data: {openid:this.data.userInfo.openId},
      success: res => {
        this.setData({msg:res.msg})
      },
      fail: err => {
        console.log("CheckStatus fail "+err.msg)
      }
    })
  },

  bindCheck: function () {
    wx.getConnectedWifi({
      success: res => {
        const wifi = res.wifi
        reqUtil.request({
          url: config.service.checkUrl,
          data: {
            openid: this.data.userInfo.openId,
            ssid: wifi.SSID,
            bssid: wifi.BSSID
          },
          success: result => {
            this.setData({ msg: result.msg })
          },
          fail: errmsg => {
            util.showModel("打卡失败", errmsg)
          }
        })
      },
      fail: err => {
        util.showModel("打卡失败",请连接指定Wi-Fi)
      }
    })
  },

  bindNavigator: function () {
    wx.navigateTo({
      url: '../kaoqinlog/kaoqinlog',
    })
  }
})