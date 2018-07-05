// pages/prize/prize.js
var xm;
var xh;
var xtele;
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    an_zhuanp:{},
    start:"start",
    height:"500px"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    xm = options.xm;
    xh = options.xh;
    xtele = options.xtele;
    openid = options.openid;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.screenHeight+"px"
        })
      },
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
  
  },
  start:function(){
    var n = 1;
    var _this = this;
    var timer=setInterval(function(){
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: "ease",
      });
      animation.rotate(360 * n).step();
      _this.setData({
        an_zhuanp: animation.export()
      });
      n++;
    },100);
    setTimeout(function(){
      clearInterval(timer);
      timer=null;
      var animation = wx.createAnimation({
        duration:1000,
        timingFunction:"ease",
      });
      var deg = 0;
      wx.request({
        url: host+'getPrice.php',
        data:{
          phone:xtele,
          stunum:xh,
          name :xm,
          openid:openid
        },
        header: { "content-type": "application/www-form-urlencode" },
        method: 'get',
        success: function (res) {
          console.log(res);
         deg = res.data;
         animation.rotate(deg).step();
        _this.setData({
        an_zhuanp: animation.export(),  
        start:null
      });
      if (deg == 60) {
       wx.showModal({
        title: '恭喜获得一等奖一份',
        content: '恭喜获得一等奖一份',
       })
      }else if(deg==240){
        wx.showModal({
          title: '恭喜获得二等奖一份',
          content: '恭喜获得二等奖一份',
        })
      } else if (deg == 180 || deg == 0){
        wx.showModal({
          title: '恭喜获得三等奖一份',
          content: '恭喜获得三等奖一份',
        })
      }else{
        wx.showModal({
          title: '很遗憾',
          content: '很遗憾',
        })
      }
        }
      })
    },3000);
  }
})