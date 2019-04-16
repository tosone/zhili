const app = getApp();

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    selected: {},
    users: [],
    histories: []
  },
  onLoad: function() {
    this.refresh();
  },
  onPullDownRefresh: function() {
    this.refresh();
  },
  refresh: function() {
    const db = wx.cloud.database();
    db.collection('user').get({
      success: res => {
        this.setData({
          users: res.data
        });
        db.collection('history').get({
          success: res => {
            this.setData({
              histories: res.data
            });

            for (let history of this.data.histories) {
              history.start = {
                original: history.start,
                show: this.showDate(history.start)
              };
              history.end = {
                original: history.end,
                show: this.showDate(history.end)
              };

              this.data.selected[history._id] = "unselected";

              let users = [];
              for (let index in history.users) {
                for (let user of this.data.users) {
                  if (user._id === history.users[index]) {
                    users.push(user);
                  }
                }
              }
              history.users = users;
            }

            this.setData({
              selected: this.data.selected,
              histories: this.data.histories
            });
            console.log(this.data);
            wx.stopPullDownRefresh();
          },
          fail: err => {
            console.log(err);
            wx.showToast({
              title: '网络错误，请下拉刷新',
              icon: 'loading',
              duration: 2000
            });
          }
        });
      },
      fail: err => {
        console.log(err);
        wx.showToast({
          title: '网络错误，请下拉刷新',
          icon: 'loading',
          duration: 2000
        });
      }
    });
  },
  showDate: function(date) {
    let d = new Date(date);
    return d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate()
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getuserinfo: function(res) {
    console.log(JSON.parse(res.detail.rawData));
  },
  longPress: function(e) {
    wx.vibrateShort({});

    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res);
          // 获取到js_code, 可继续调用接口换取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxa7e37e6854699813',
              secret: 'e4c49f915b2e2880dcf76556b07191c0',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function(res) {
              console.log(res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     app.globalData.openid = res.result.openid;
    //     console.log(res.result)
    //   },
    //   fail: err => {
    //     console.error(err)
    //   }
    // });

    if (this.data.selected[e.currentTarget.dataset["id"]] == "selected") {
      this.data.selected[e.currentTarget.dataset["id"]] = "unselected"
    } else {
      this.data.selected[e.currentTarget.dataset["id"]] = "selected"
    }
    this.setData({
      selected: this.data.selected
    });
  }
});