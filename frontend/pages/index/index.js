Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0,
    wxOpenid: '',
    wxAppid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.cloud.callFunction({
        name: 'sum',
        data: { a: 10, b:20 }
    }).then(res => {
        self.setData({
          'sum': res.result.sum
        });
    }).catch(err => {
        console.log('error', err);
    })

    wx.cloud.callFunction({
        name: 'login',
        success(res){
            // console.log('login', res);
            self.setData({
                'wxOpenid': res.result.openid,
                'wxAppid': res.result.appid
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
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})