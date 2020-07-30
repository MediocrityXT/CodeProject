// pages/uploader/uploader.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getMusic1:function(){
    let app=getApp()
    app.globalData.musicUrl='cloud://musiccloud-pdsi7.6d75-musiccloud-pdsi7-1302639995/test.mp3'
    wx.navigateBack({
      delta: 1,
    })
  },
  getMusic2:function(){
    let app=getApp()
    app.globalData.musicUrl='cloud://musiccloud-pdsi7.6d75-musiccloud-pdsi7-1302639995/test2.mp3'
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  upload:function(){
    
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