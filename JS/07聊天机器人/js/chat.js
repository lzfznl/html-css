$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  $('#btnSend').on('click',function(){
    let text = $('#ipt').val().trim()
    if(text.length <= 0){
      return $('#ipt').val() = ''
    }
     // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
    $('#talk_list').append(`<li class="right_word"><img src="img/person02.png" /><span>${text}</span></li>`)
    $('#ipt').val('')
    // 重置滚动条的位置
    resetui()
    // 发起请求，获取聊天内容
    getMsg(text)
  })

  // 获取聊天机器人发送回来的消息
  function getMsg(text){
    $.ajax({
      method:'GET',
      url:'https://v.api.aa1.cn/api/yiyan/index.php',
      // url:'https://freegpt.one/backend-api/conversation',
      // data:{
      //   readyState:4,
      //   responseText:text,
      //   status:200,
      //   statusText:'parserror'
      // },
      success:function(res){
        // if(res.status === 200){
        //   // 接受聊天消息
        //   let msg = res.data.info.text
        //   // 重置滚动条的位置
        //   resetui()
        //   // 调用getVoice函数，把文件转为语音
        //   getVoice(msg)
        // }
        let msg = res.replace('<p>','').replace('</p>','')
        console.log(res,msg)
        $('#talk_list').append(`<li class="left_word"><img src="img/person01.png" /><span>${msg}</span></li>`)
        // 重置滚动条的位置
        resetui()
        getVoice(msg)
      }
    })
  }

  // 把文字转化为语音进行播放
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://tts.youdao.com/fanyivoice',
      data: {
        le:'zh',
        keyfrom:'speaker-target',
        word: text,
      },
      success: function (res) {
        console.log(res)
        if (res.status === 200) {
          // 播放语音
          // $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  // 为文本框绑定 keyup 事件
  $('#ipt').on('keyup', function (e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13) {
      // console.log('用户弹起了回车键')
      $('#btnSend').click()
    }
  })
})