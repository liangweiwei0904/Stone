Page({
  data:{
    homelist:[],
    id:""
  },
  //页面加载时访问数据库
  onShow(){
    wx.cloud.database().collection("homelist").get()
      .then(res=>{
        this.setData({
          homelist:res.data
        })
      })
      .catch(res=>{
        console.log("错误",res);
      })
  },

  //获取数组id，并根据id显示字段
  Todetail(e){
    this.setData({
      id:e.currentTarget.dataset.id
    }),
    wx.navigateTo({
      url: '/pages/detail/detail?_id='+this.data.id
    });
  }
})