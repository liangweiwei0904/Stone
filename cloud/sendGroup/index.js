const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.cloudbase.sendSms({
        env: 'lwwldx-5g8powrn59ec579e',
        content: event.content,
        // path: '/index.html',
        phoneNumberList: [
          "+86"+event.list
        ]
      })
    return result
  } catch (err) {
    return err
  }
}
