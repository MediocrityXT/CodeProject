// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SearchName:null,
    songlist:{},
    src:null
  },
  inputName:function(e){
    this.setData({
      SearchName:e.detail.value
    })
  },
  search:function(){
    const num = 5 //搜索返回的歌曲数
    let that = this
    let name = this.data.SearchName
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n='+num+'&w='+name+'&format=json',
      success(res) {
        console.log('网络请求到的music数据',res)
        that.setData({
          songlist:res.data.data.song.list
        })
      }
    })
  },
  chooseMusic:function(e){
    let that = this
    let app=getApp()
    console.log('songmid:'+e.currentTarget.dataset.mid)
    wx.request({
      url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22'+e.currentTarget.dataset.mid+'%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D',
      
      success(res) {
        console.log('请求到的歌曲地址',res.data.req_0.data)
        that.setData({
          src:res.data.req_0.data
        })
        let fileName = that.data.src.midurlinfo[0].filename
        let str1=that.data.src.testfilewifi.split('?')
        let vkey = str1[1].split('&')[1]
        console.log(str1)
        let str2 = fileName+'?guid=358840384&'+vkey+'&uin=18585073516&fromtag=66'
       
        let fileUrl = that.data.src.sip[0] + str2
        app.globalData.musicUrl =fileUrl
      }
    })
    
  },
  playMusic:function(musicUrl){
    
    let innerAudio = wx.createInnerAudioContext()
    innerAudio.src = musicUrl
    
    innerAudio.loop = true
    innerAudio.play()
    console.log('歌曲时长'+innerAudio.duration)
    setTimeout(function(){
      innerAudio.pause()
    },10)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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