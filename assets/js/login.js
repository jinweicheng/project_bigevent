(function() {

    $('.login_btn').on('click',function() {
        // alert('login_btn')
        // 隐藏login显示按钮和内容
        $('.reg_content').hide()
        $('.login_content').show()
    })

    $('.reg_btn').on('click', function() {
        // alert('reg_btn')
         
        // $('.reg_content').hide()
        // $('.reg_btn').hide()

        // // 显示reg按钮和内容
        // $('.login_content').show()
        // $('.login_btn').show()

        $('.login_content').hide()
        $('.reg_content').show()
    })



    // 自定义layui的校验规则
    let form = layui.form
    form.verify({
        password:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repassword: function(value) {
              let pwdvalue = $('.reg_content [name=password]').val()
              if(pwdvalue !== value) {
                  return '二次密码不一致，请再次输入'
              }
          }
    })

    let layer = layui.layer
    // 注册接口
    $('#reg_form').on('submit',function(e) {
        e.preventDefault()
        // alert(1)
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {username: $('.reg_content [name=username').val(),password: $('.reg_content [name=password]').val()},
            success: function(res) {  
                // alert(res.message)
                layer.msg(res.message)
                if(res.status === 0) {
                    console.log(res)
                    // 跳转至登录页面
                    $('.login_btn').click()
                }
            }
        })
    })

    let token = ''
    // 登录接口
    $('#login_form').on('submit',function(e) {
        e.preventDefault()
        let data = {username: $('#login_form [name=username]').val(),password: $('#login_form [name=password]').val()}
        console.log(data)
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status === 0) {
                    localStorage.setItem('token',res.token)
                    layer.msg(res.message)
                    // http://127.0.0.1:5500/service/26-bigEvent/home/index.html
                    location.href = '../home/index.html'
                }
            } 
        })
    })

})()