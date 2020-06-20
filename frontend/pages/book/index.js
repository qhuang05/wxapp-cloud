const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: wx.getStorageSync('userinfo') || {},
      bookList: []
  },

  // 通过扫描二维码添加图书
  scanBook() {
    let self = this;
    wx.scanCode({
        success(res) {
            console.log('isbn码: ', res.result);
            wx.showLoading();
            wx.cloud.callFunction({
                name: 'book',
                data: { isbn: res.result },
                success(resBook) {
                    wx.hideLoading();
                    console.log('bookinfo', resBook);
                    self.addBook(resBook.result);
                }
            })
        }
    })
  },

  // 添加图书到云数据库
  addBook(book) {
      let self = this;
      db.collection('books').add({
          data: book,
          success(res){
              console.log('addBook', res);
              if(res._id){
                  wx.showModal({
                      title: '添加成功',
                      content: `图书《${book.title}》添加成功`,
                  });
                //   self.setData({
                //       bookList: [...self.data.bookList, book.title]
                //   });
                  let len = self.data.bookList.length;
                  self.setData({
                      [`bookList[${len}]`]: book.title
                  });
              }
          }
      })
  },

  // 登录
  onGetUserInfo(e){
      let userInfo = e.detail.userInfo;
      wx.cloud.callFunction({
          name: 'login',
          success: (res) => {
              let {openid, appid, unionid} = res.result;
              userInfo = Object.assign({}, userInfo, {
                  openid,
                  appid,
                  unionid
              });
              wx.setStorageSync('userinfo', userInfo);
              this.setData({
                  'userInfo': userInfo
              });
          }
      });
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