// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()  //获取数据库的引用

// 云函数入口函数
exports.main = async (event, context) => {
  let check = db.collection("musicmood").where({
    music:event.music,
    openid:event.openid
  }).get()
  console.log(check)
  if(check){
    await db.collection("musicmood").where({
      music:event.music,
      openid:event.openid
    }).remove()
  }
  return await db.collection("musicmood").add({
      data:{
        music:event.music,
        openid:event.openid,
        time:event.timeSample,
        resonance:event.resonanceSample,
        feeling:event.feelingSample
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
  
}