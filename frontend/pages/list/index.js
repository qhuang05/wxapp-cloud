const utils = require('../../utils/util.js')
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageSize: 4,
    page:1
  },

  getList(){
    db.collection('books')
    .orderBy('create_time', 'desc')
    .skip((this.data.page-1) * this.data.pageSize)
    .limit(this.data.pageSize)
    .get()
    .then(res => {
      let newData = res.data.map(v=>{
        v.create_time = utils.formatTime(new Date(v.create_time));
        return v;
      })
      this.setData({
        'list': [...this.data.list, ...newData]
      })
    })
    .catch(err => {

    })
  },

  getTime(time){
    return utils.formatTime(new Date(time));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
    this.setData({
      'page': ++this.data.page
    }, ()=>{     
      this.getList();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})