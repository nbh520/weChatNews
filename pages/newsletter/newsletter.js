// pages/newsletter/newsletter.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://cms-bucket.ws.126.net/2019/03/11/d52200223af84a1c9a63783597a861ef.jpeg',
      'http://cms-bucket.ws.126.net/2019/03/11/7aecb58ac3974a7c800821e16cf225d1.png',
      'http://cms-bucket.ws.126.net/2019/03/11/1a7f5d3af569444197bbf26da4cd5b3a.png'
    ],
    newsArr: [],
    todayTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前时间
    this.getTodayTime();
    //加载当前新闻
    this.getCurrentNews();
  },

  //获取实时新闻
  getCurrentNews(){
    wx.request({
      url: app.globalData.requestUrl + 'article/getCurrentNews',
      success: res => {
        let data = res.data.data
        data.forEach(item => {
          item.lmodify = item.lmodify.slice(11, item.lmodify.length)
        })
        data.sort(this.sortBy('lmodify',false))
        this.setData({
          newsArr: data
        })
      }
    })
  },
  //根据数组里的某一个对象进行排序
  sortBy(attr, rev) {
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = (rev) ? 1 : -1;
    }
    return function (a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    }
  },
  //获取今天时间
  getTodayTime(){
    let date = new Date();
    let day = date.getDay();
    let week = ['天','一', '二', '三', '四', '五', '六']
    let time = `${date.getMonth() + 1}月${date.getDate()}日 · 星期${week[day]}`
    this.setData({
      todayTime: time
    })
  },
  //分享给好友
  bindShareFriend(){

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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})