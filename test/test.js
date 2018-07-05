// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   xm:"",
   xh:"",
   tele:""
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
  
  },
  inputxm:function(e){
    var  _this = this;
    console.log(e.detail.value);
    _this.setData({
        xm:e.detail.value
    });
  },
  inputxh: function (e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      xh: e.detail.value
    });
  },
  inputph: function (e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      tele: e.detail.value
    });
  },
  go(){
    var _this = this;
    wx.showLoading({
      title: '检查资格ing...',
    });
    if (_this.data.xm != "" && _this.data.xh != "" && _this.data.tele != "")
    {
      wx.login({
        success:function(res){
          wx.hideLoading();
          wx.request({
            url:host+'isFirst.php',
            data:{
              code:res.code,
              name: _this.data.xm,
              stunum: _this.data.xh,
              phone: _this.data.tele
            },
            header: { "content-type":"application/www-form-urlencode"},
            success:function(res){
              //console.log(res);
              if(res.data.code>0)
              {
                var str = 'xm= ' + _this.data.xm + '&xh=' + _this.data.xh + '&xtele=' + _this.data.tele+'&openid='+res.data.open_id;
                wx.navigateTo({
                  url: '../../pages/prize/prize?' + str,
                  success: function () {
                    console.log("跳转成功");
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              } else if (res.data.code==-1){
                wx.showModal({
                  title: '抽奖次数已用完！',
                  content: '抽奖次数已用完！',
                })
              }else if(res.data.code==-3)
              {
                wx.showModal({
                  title: '格式错误',
                  content: '请检查学号格式是否正确',
                })
              }
              else
              {
                wx.showModal({
                  title: 'sorry',
                  content: '您的缺勤次数多于3次，无法参与抽奖',
                })
              }
            }
          })
        }
      })
    }else{
      wx.hideLoading();
      wx.showModal({
        title: 'tip',
        content: '输入姓名学号及联系方式，中奖后通知你哦~',
      })
    }
  }
})