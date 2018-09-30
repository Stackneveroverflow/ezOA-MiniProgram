//app.js
var qcloud = require('./vendor/client-sdk/index')
var config = require('./config')

App({
  onLaunch:function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  globalData:{
    userInfo:null
  }
})