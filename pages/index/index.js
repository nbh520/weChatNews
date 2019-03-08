//index.js
//获取应用实例
const app = getApp()
// let url = 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html' //网易新闻
Page({
  data: {
    newsArr: [],    // 首页新闻
    pullRefresh: false, // 下拉刷新
    pullRefreshSuccess: false, //下拉刷新成功
    local: {},   // 本地信息
    videoArr: [], //视频列表
    currentTab: 0,
    navbar: ['推荐', '视频', '本地'],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //切换推荐/视频/本地
  bindSwitch: function(e){
    this.loadLocation(e)
    
   

    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //下拉刷新
  onPullDownRefresh: function(e){
    //下拉刷新推荐
    if (!this.data.currentTab){
      wx.showToast({
        title: 'loadding...',
        icon: 'loading'
      })
      this.refreshSuccess().then(res => {
        console.log("刷新成功")
        this.setData({
          pullRefreshSuccess: true
        })
      })
    }
  },
  refreshSuccess: function(){
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html',
        method: 'GET',
        success: res => {
          wx.stopPullDownRefresh({
            success: () => {
              resolve()
            }
          })
        }
      })
      
    })
  },
  //加载视频资源
  loadVideo(){
    //获取视频信息
    wx.request({
      url: 'http://baobab.kaiyanapp.com/api/v4/tabs/selected',
      method: 'GET',
      success: res => {
        let resultArr = res.data.itemList
        resultArr = resultArr.filter(item => {
          return item.type === 'video'
        })
        this.setData({
          videoArr: resultArr
        })
      }
    })
  },
  //加载新闻资源
  loadNews(){
    let _this = this
    //今日头条
    // wx.request({
    //   url: 'http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1',
    //   method:"get",
    //   success: res => {
    //     let newsData = res.data.data
    //     console.log(newsData[0].source_url)
    //     newsData.map(item => {
    //       if (item.abstract.length > 44)
    //         return item.abstract = item.abstract.slice(0,44) + '...'
    //       })
    //     newsData.map(item => {
    //       return item.source_url = 'https://www.toutiao.com' + item.source_url
    //     })
    //     _this.setData({
    //       newsArr: newsData
    //     })
    //     console.log(newsData)
    //   }
    // })
    //网易
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html',
      method: 'GET',
      success: res => {
        let result
        //获取到真正需要的数据
        for (let i in res.data) {
          result = res.data[i]
        }
        //对新闻内容进行删除和修改 保证每条新闻可以正常显示内容
        result = result.filter(index => {
          return index.digest !== ''
        })
        //添加作者头像
        result.forEach(item => {
          item.media_avatar_url = 'http://www.163.com/favicon.ico'
        })
        //优化评论数显示
        result.map(item => {
          if (item.replyCount > 10000)
            return item.replyCount = '1w+'
          if (item.replyCount > 10000)
            return item.replyCount = '10w+'
        })
        // 将获取的信息传值到页面上
        _this.setData({
          newsArr: result
        })
      }
    })
  },
  //加载本地资源
  loadLocation(e){
    if (e.currentTarget.dataset.idx === 2 && !app.globalData.locationInfo.latitude) {
      app.getLocation(() => {
        if (app.globalData.locationInfo.latitude) {
          const latitude = app.globalData.locationInfo.latitude
          const longitude = app.globalData.locationInfo.longitude
          //获取天气信息
          wx.request({
            url: 'http://t.weather.sojson.com/api/weather/city/101280601',
            method: 'GET',
            success: res => {
              console.log(res.data)
              let weather = {
                city: res.data.cityInfo.city,
                temperature: res.data.data.wendu, //温度
                pm: res.data.data.pm10,   // pm 值
                quality: res.data.data.quality, //空气质量
                humidity: res.data.data.humidity, //湿度
                type: res.data.data.forecast[0].type, //天气类型 ===晴
                notice: res.data.data.forecast[0].notice, //天气提示话语 ==愿你拥有比阳光明媚的心情
              }
              //获取壁纸
              wx.request({
                // weather.type ----> 天气类型，可替换深圳，但值为大雨时 搜索不到相关壁纸
                url: 'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=' + '深圳' + '&start=0&count=1',
                method: 'GET',
                success: res => {
                  if (res.data.data[0].url_mid)
                    weather.wallpaper = res.data.data[0].url_mid || 'http://p15.qhimg.com/t019c4fd29b1b8f69b5.jpg'
                  console.log(res.data)
                  this.setData({
                    local: weather
                  })
                }
              })

            }
          })
        }
      })
    }
  },
  onLoad: function () {
    this.loadNews();
    this.loadVideo();
  }

})
