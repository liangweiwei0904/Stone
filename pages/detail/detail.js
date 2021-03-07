let ID = ""
// let content = ""
// let pinglun = []
Page({
  data: {
    detail: "",
    pinglun:[],
    content:""
  },
  //页面加载时访问数据库
  onLoad(options) {
    ID = options._id
    console.log(ID);
    const DB = wx.cloud.database().collection("homelist");
    DB.doc(options._id).get()
      .then(res => {
        console.log("成功", res);
        this.setData({
          detail: res.data
        })
        if (res.data.pinglun) {
          //页面加载时把数据库的这条新闻的评论数组取出来放在本地pinglun里
          // pinglun = res.data.pinglun;
          this.setData({
            pinglun:res.data.pinglun,
          })
        }
      })
      .catch(res => {
        console.log("失败", res);
      })
  },
  //点击收藏
  handleshoucang() {
    this.setData({
      'detail.shoucang': !this.data.detail.shoucang
    }),
      wx.cloud.callFunction({
        name: "shoucang",
        data: {
          id: ID,
          shoucang: this.data.detail.shoucang,
          action: "shou"
        },
        success(res) {
          console.log("成功收藏", res);
        }
      })

  },
  //点击点赞
  handledianzan() {
    this.setData({
      'detail.dianzan': !this.data.detail.dianzan
    }),
      wx.cloud.callFunction({
        name: "shoucang",
        data: {
          id: ID,
          dianzan: this.data.detail.dianzan,
          action: "dian"

        },
        success(res) {
          console.log("成功点赞", res);
        }
      })
  },

  //获取输入框内容
  handleInput(e) {
    this.setData({
      content : e.detail.value
    })
    
  },

  //发表评论按钮
  submit_remark() {
    if (this.data.content) {
      let pinglunItem = {};
      pinglunItem.name = "梁维维";
      pinglunItem.content = this.data.content;
      //获取到输入框中的评论内容
      //并将其插入到本地pinglun数组里
     
      this.data.pinglun.push(pinglunItem);
      wx.showLoading({
        title: "正在发表",
      });
      //更新数据库评论的内容
      wx.cloud.callFunction({
        name: "shoucang",
        data: {
          id: ID,
          action: "ping",
          pinglun: this.data.pinglun
        },
      })
      .then(res=>{
        this.setData({
          pinglun:this.data.pinglun,
          content:""
        }),
        wx.hideLoading();
      })
    }
  }
})

