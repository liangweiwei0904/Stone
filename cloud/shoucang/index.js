// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.action);
  if (event.action === "shou") {
    cloud.database().collection("homelist").doc(event.id)
      .update({
        data: {
          shoucang: event.shoucang
        }
      })
      .then(res => {
        console.log("改变收藏状态成功", res);
      })
      .catch(res => {
        console.log("改变收藏状态失败", res);
      })
  }
  else if(event.action === "dian") {
    cloud.database().collection("homelist").doc(event.id)
      .update({
        data: {
          dianzan: event.dianzan
        }
      })
      .then(res => {
        console.log("改变点赞状态成功", res);
      })
      .catch(res => {
        console.log("改变点赞状态失败", res);
      })
  }
  else if(event.action === "ping") {
    cloud.database().collection("homelist").doc(event.id)
      .update({
        data: {
          pinglun: event.pinglun
        }
      })
      .then(res => {
        console.log("评论成功", res);
      })
      .catch(res => {
        console.log("评论失败", res);
      })
  }

}