let Code = ""
Page({
  data: {
    phone: "",
    code: ""
  },
  //获取手机号
  handlePhone(e) {
    // let len=e.detail.value
    // console.log(len);
    if (e.detail.value.length == 11) {
      this.setData({
        phone: e.detail.value
      })
    }
  },

  //获取短信验证码（非企业账号不可实现）
  send() {
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入11位的合法手机号',
      });
    }
    else {
      Code = this.generateMixed(4);
      console.log(Code);
      //调用云函数
      wx.cloud.callFunction({
        name: "sendSms",
        data: {
          phone: this.data.phone,
          content: Code
        }
      })
        .then(res => {
          console.log("成功发送", res);
        })
        .catch(res => {
          console.log("发送失败", res);
        })
    }
  },

  generateMixed(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 9);
      res += chars[id];
    }
    return res;
  },
  //获取用户输入的验证码
  handleCode(e) {
    this.setData({
      code: e.detail.value
    })
  },


  //验证登录
  login() {
    if (this.data.code == Code) {
      console.log("登陆成功");
      wx.showToast({
        title: '登录成功',
        icon:'none'
      });
      wx.redirectTo({
        url: '/pages/user/user',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
    else {
      console.log("验证码错误");
    }
  }
})