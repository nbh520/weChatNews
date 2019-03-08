// pages/newsContent/newsContent.js
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsLoadding: true, // 新闻加载前
    newsData: {}, //新闻数据  ----标题&内容
    newsComment: [], //新闻评论
    url: '', //当前url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.reportUrl
    })
    wx.request({
      url: app.globalData.requestUrl + 'article/getArticleContent',
      method: 'GET',
      data: {
        url: options.reportUrl
      },
      success: res => {
        let data = res.data.data
        console.log(res)
        data.reportTime = options.reportTime
        data.reportUser = options.reportUser
        data.reportUserImage = options.reportUserImage
        let _this = this
        let article =  data.content.replace(/data-src/g,"src")
        WxParse.wxParse('article', 'html', article ,_this,5)
        this.setData({
          newsData: data,
          newsLoadding: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})