$(() => {
  let $addForm = $('#addForm')
    $addForm.submit(e => {
    e.preventDefault();
    let btn = $addForm.find('button[type="submit"]')
    btn.attr('disabled',true)
    $.post($addForm.attr('action'),$addForm.serialize(),(data, status) => {
      let msg
      if(status === 'success'){
        msg = data.code + data.msg
        if(data.code === 1){
          setTimeout(() => {
            window.location.reload()
          },1000)
        }
      } else {
        msg = '请求失败'
      }
      mdui.snackbar({
        message:data.msg,
        timeout:1000
      })
      btn.attr('disabled',false)
    })
  })
})