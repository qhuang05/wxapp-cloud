// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookInfo: ''
  },

  // 通过扫描二维码添加图书
  scanBook() {
    let self = this;
    wx.scanCode({
        success(res) {
            console.log('isbn码: ', res.result);
            wx.cloud.callFunction({
                name: 'book',
                data: {
                    isbn: res.result
                },
                success(resBook) {
                    console.log('book', resBook);
                    self.setData({ bookInfo: JSON.stringify(resBook.result.bookInfo) });
                }
            })
        }
    })
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