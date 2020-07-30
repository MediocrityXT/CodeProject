
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicUrl:null,
    isPlaying:false,
    audioDuration:'0:00',
    audioCurrent:'0:00',
    sliderTime:0,
    resonance:0,
    feeling:50,
    index:0,
    resonanceSample:[],
    feelingSample:[],
    timeSample:[],
    openid:null
  },

  onShow: function (options) {
    let app = getApp()
    //app.globalData.musicUrl='cloud://musiccloud-pdsi7.6d75-musiccloud-pdsi7-1302639995/test.mp3'
    this.setData({
      musicUrl:app.globalData.musicUrl 
    })
    
    this.registerAudioContext()  //都是长时间持续的监听函数
    this.FirstPlayMusic()
    
  },
  getMood:function(){
    const db = wx.cloud.database()
    db.collection("musicmood").where({
      music:this.data.musicUrl,
      openid:this.data.openid
    }).get()
    .then(res=>{
      this.setData({
        timeSample:res.data[0].time,
        resonanceSample:res.data[0].resonance,
        feelingSample:res.data[0].feeling
      })
    })
    .catch(err=>{
      console.log(err)
    })
    
  },
  chooseUser:function(){
      this.getOpenId()
      let inter = setInterval(()=>{    //用定时器多次实验实现异步
        if(this.data.openid){
          this.getMood()
          clearInterval(inter)
        }
      },100)
  },
  getOpenId:function(){
    let that = this
    wx.cloud.callFunction({
      name:'login',
      data:{},
      success:res=>{
        console.log('【login云函数】'+res.result.openid)
        that.setData({
          openid:res.result.openid
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  desample:function(){
    let index = this.data.index
    let timeSample = this.data.timeSample
    if(index == timeSample.length) return  //index不能超过Sample长度
    let resonanceSample = this.data.resonanceSample
    let feelingSample = this.data.feelingSample
    
    if(timeSample[index]<=innerAudioContext.currentTime){
      this.setData({
        resonance:resonanceSample[index],
        feeling:feelingSample[index]
      })
      this.setData({
        index:index+1
      })
    }
  },
  registerAudioContext:function(){
    let that = this
    innerAudioContext.onCanplay(() => {
      innerAudioContext.duration; //必须写，不然获取不到。。。
    })
    innerAudioContext.onTimeUpdate((res)=>{      //随着时间变化 取样  但是这个函数发生的时间间隔不稳定，目前还没有找到解决办法
      that.setData({
        audioDuration: that.format(innerAudioContext.duration),
        audioCurrent: that.format(innerAudioContext.currentTime),
        sliderTime: innerAudioContext.currentTime/innerAudioContext.duration * 100
      });
      that.desample()
      //console.log('取样于'+innerAudioContext.currentTime)
    })
    innerAudioContext.onPlay((res) => {
      that.setData({
        isPlaying:true
      })
      console.log('onPlay触发'+res)
    })
    innerAudioContext.onPause((res) => {
      that.setData({
        isPlaying:false
      })
      console.log('onPause触发'+res)
    })
    innerAudioContext.onEnded((res) => {
      that.setData({
        isPlaying: false
      })
      console.log('播放结束' + res);
    })
    innerAudioContext.onError((res) => {
      // 播放音频失败的回调
      console.log('播放音频失败' + res);
    })
    innerAudioContext.onStop((res) => {
      that.setData({
        isPlaying: false
      })
      console.log('播放终止stop' + res);
    })
  },
  setAudioSrc:function(){
    let that = this
    return new Promise(function(resolve,reject){
      innerAudioContext.src = that.data.musicUrl
      innerAudioContext.loop = true
    })
  },
  FirstPlayMusic:function(){
    let that = this
    Promise.resolve()      //异步 先赋值再播放
    .then(this.setAudioSrc())
    .then(function(){
      that.play()
    })
  },
  play:function(){
    if(!this.data.isPlaying){
      innerAudioContext.play()
    }
  },
  pause:function(){
    if(this.data.isPlaying){
      innerAudioContext.pause()
    }
  },

  format:function(origin){
    let time=origin.toFixed(0)
    let second = time%60
    let minute = (time-second)/60
    if(second<10){
      return minute+':0'+second
    }
    else{
      return minute+':'+second
    } 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    innerAudioContext.stop()
    innerAudioContext.destroy()
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