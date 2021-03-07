const DB=wx.cloud.database().collection("list");
let age="";
let id="";
Page({
  
  data:{
    name:"",
    imgUrl:"",
    videoUrl:"",
    ExcelUrl:"",
    WordUrl:"",
    List:[],
    list:[]
    },
  // 添加姓名
  add_name(e){
    this.setData({
      name:e.detail.value
    });
    console.log(this.data.name);
    
  },
  // 添加年龄
  add_age(e){
    age=e.detail.value;
    console.log(age);
  },
  //添加数据
  handleADD(){
    DB.add({
      data:{
        name:this.data.name,
        age:age,
      },
      success(res){
        console.log("添加成功");
      },
      fail(res){
        console.log("添加失败");
      }
    })
  },
  //查询数据
  handleFind(){
    DB.get({
      success(res){
        console.log("查询数据成功");
      }
    })
  },
  //要删除的id
  handleId(e){
    id=e.detail.value;
    console.log(id);
  },
  //删数据
  handleDel(){
    DB.doc(id).remove({
      success(res){
        console.log(删除成功);
      }
    })
  },
  //更改后的年龄
  handleAge(e){
    age=e.detail.value;
  },
  //更新数据
  handleUPD(){
    DB.doc(id).update({
      data:{
        age:age
      },
      success(res){
        console.log("更新成功");
      }
    })
    
  },

  //第一个云函数
  qiuhe(){
    wx.cloud.callFunction({
      name:"add",
      data:{
        a:1,
        b:2
      },
      success(res){
        console.log("请求成功",res);
      },
      fail(res){
        console.log("请求失败",res);
      }
    })
  },
  //获取用户的openid
  getopenid(){
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        console.log("获取用户openid成功",res.result.openid);
      },
      fail(res){
        console.log("获取用户openid失败",res);
      }
    })
  },
  //数据库获取数据
  shujuku(){
    wx.cloud.database().collection("user").get({
      success(res){
        console.log("获取数据成功",res);
      },
      fail(res){
        console.log("获取数据失败",res);
      }
    })
  },
  //云函数获取数据
  yunhanshu(){
    wx.cloud.callFunction({
      name:"getdata",
      success(res){
        console.log("云函数获取数据成功",res);
      },
      failres(){
        console.log("云函数获取数据失败",res);
      }
    })
  },
  //上传文件
  upload(){
    let that=this;
    console.log("点击了选择");
    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime()+'my-photo.png',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res);
            that.setData({
              imgUrl:res.fileID
            })
          },
        })
      },
    })
  },

  //上传视频
  uploadVideo(){
    let that=this;
    console.log("选择视频");
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,  //视频时长，单位：秒
      camera: 'back',
      success(res1) {
        console.log("选择视频成功",res1.tempFilePath)
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime()+'video.mp4',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: res1.tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功', res);
            that.setData({
              videoUrl:res.fileID
            })
            console.log(videoUrl);
            
          },
          fail(res){
            console.log("上传失败",res);
        
          }
        })
      },
      fail(res){
        console.log("选择视频失败",res);
      }
    })
  },
  //上传excel文件
  uploadExcel(){
    let that=this;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles;
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: '表格.doc',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFiles[0].path,
          // 成功回调
          success: res => {
            console.log('上传成功', res);
            that.setData({
              WordUrl:res.fileID
            })
          },
        })
      }
    })
  },

  //下载excel文件
  downloadExcel(){
    //console.log(this.WordUrl);
    wx.cloud.downloadFile({
      fileID: 'cloud://lwwldx-5g8powrn59ec579e.6c77-lwwldx-5g8powrn59ec579e-1305123697/表格.doc',
      
      success: res => {
        // get temp file path
        console.log(res.tempFilePath);
        //打开excel文件
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail(res){
console.log(res);
console.log(fileID);
          }
        })
      },
      fail: err => {
        // handle error
        console.log(err);
      }
    })
  },

  //database遍历list数组并输出，最多20条数据
  outputList(){
    let that =this;
    wx.cloud.database().collection("list").get({
      success(res){
        //console.log(res);
        that.setData({
          List:res.data
        })
      }
    })
  },

  //yun云函数遍历数组并输出，最多100条数据
  YunList(){
    let that=this;
    wx.cloud.callFunction({
      name:"YunList",
      success(res){
        that.setData({
          list:res.result.data
        }),
        console.log("请求成功",res);
      },
      fail(res){
        console.log("请求失败",res);
      }

    })
  }
})
