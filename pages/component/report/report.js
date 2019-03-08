// pages/component/report/report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reportTitle: String,
    reportContent: String,
    reportImage: String,
    reportUser: String,
    reportUserImage: String,
    reportUrl: String,
    reportTime: String,
    reportReply: String,
    reportAwesome: String,
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    isAwesome: false, //是否赞同

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到新闻详情页
    bindGoNewsContent: function (e) {
      let reportUrl = this.data.reportUrl
      let reportTime = this.data.reportTime
      let reportUserImage = this.data.reportUserImage
      let reportUser = this.data.reportUser
      wx.navigateTo({
        // url: '../newsContent/newsContent?reportUrl=' + reportUrl + '&reportTime=' + reportTime,
        url: `../newsContent/newsContent?reportUrl=${reportUrl}&reportTime=${reportTime}&reportUserImage=${reportUserImage}&reportUser=${reportUser}`
      })
    },
    //点赞
    bindAwesome:function(){
      if (!this.data.isAwesome){
        this.setData({
          isAwesome: true,
          reportAwesome: parseInt(this.data.reportAwesome) + 1
        })
      }else{
        this.setData({
          isAwesome: false,
          reportAwesome: parseInt(this.data.reportAwesome) - 1
        })
      }
      
      console.log()
    }
  }
})
