// pages/PGpaihao/PGpaihao.js
let PaiHaoDB=wx.cloud.database().collection("PaiHao")
let key = ""
let number = ""
Page({
  data:{
    PaiHaoInfo:""
  },
  onLoad(){
    this.GetMyNumber();
  },
  handleBTNpaihao() {
    console.log("用户点击了排号");
    //查询已经排到多少位
    PaiHaoDB
      .where({
        key: key
      })
      .count()
      .then(res => {
        console.log("查询成功", res);
        number = res.total+1;
        //将排号信息上传到数据库
        PaiHaoDB
          .add({
            data: {
              key: key,
              number: number
            }
          })
          .then(res => {
            console.log("排号成功", res);
            this.GetMyNumber();
          })
          .catch(res => {
            console.log("排号失败", res);
          })
      })
      .catch(res => {
        console.log("查询失败", res);
      })
  },
  //查询当前排号信息
  GetMyNumber(){
    PaiHaoDB
    .where({
      key:this.getdate(),
    })
    .get()
      .then(res=>{
        let len=res.data.length;
        let obj=res.data[len-1];
        console.log("获取排号信息成功",obj.number);
        this.setData({
          PaiHaoInfo:"您当前的排号是："+obj.number
        })
      })
      .catch(res=>{
        console.log("获取排号信息失败",res);
      })
  },

  //获取当前年月日
  getdate() {
    let date = new Date();
    let Year = date.getUTCFullYear();
    //小程序默认月份是从0开始的
    let Month = date.getMonth() + 1;
    let Day = date.getDate();
    key = "" + Year + "年" + Month + "月" + Day + "日";
    console.log(key);
    return key;
  },
})