let content=""
let phonesArr=""
Page({
  //获取短信内容
  handleContent(e) {
    content=e.detail.value;
  },
  //获取群发的手机号
  handlePhoneNums(e) {
    phonesArr=e.detail.value;
  },

  //群发短信按钮
  send(){
    //1剔除回车键
    phonesArr=phonesArr.replace(/[\r\n]/g,"");
    //2切割字符串
    let list=phonesArr.split('*');
    console.log("切割以后的手机号",list);
    //3给手机号+86
    for(var i=0;i<list.length;i++){
      list[i]='+86'+list[i];
    }
    console.log("加了86之后的手机号",list);
    wx.cloud.callFunction({
      name:"sendGroup",
      data:{
        content:content,
        list:list
      }
    })
    .then(res=>{
      console.log("群发的内容",res);
    })
  }
})