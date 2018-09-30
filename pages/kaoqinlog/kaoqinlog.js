var reqUtil = require('../../utils/requestUtil')
var config = require('../../config')
var app = getApp()

Page({
  data: {
    listData:null
  },

  onLoad: function() {
    reqUtil.request({
      url: config.service.getCheckLogUrl,
      data: { openid: app.globalData.userInfo.openId },
      success: res => {
        this.setData({ listData: res })
      },
      fail: err => {
        console.log("getCheckLog fail " + err.msg)
      }
    })
  }
})