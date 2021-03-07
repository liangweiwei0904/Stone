// pages/100data/100data.js
let totalNum=-1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },


  //加载数据
  getListData() {
    wx.showLoading({
      title: '加载中',
    });
    let len = this.data.list.length;
    if(len==totalNum){
      wx.showToast({
        title: '数据已加载完毕',
      });
    }
    console.log(len);
    wx.cloud.database().collection("list")
      .skip(len)
      .get()
      .then(res => {
        wx.hideLoading();
        this.setData({
          list: this.data.list.concat(res.data)
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据总条数
    wx.cloud.database().collection("list").count()
      .then(res => {
        console.log("总条数", res);
        totalNum=res.total;
        console.log(totalNum);
      })
    this.getListData();
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
    this.getListData();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})