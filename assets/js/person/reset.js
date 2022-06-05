let layer = layui.layer
;(function() {
    // 1、新增校验
    let form = layui.form
    form.verify({
        oldPwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            let oldPwd = $('.layui-form-item [name=old_pwd]').val()
            // alert(oldPwd)
            if(oldPwd === value) {
                return '新密码和老密码不能一致'
            }
        },
        rePwd: function(value) {
            let newPwd = $('.layui-form-item [name=new_pwd]').val()
            if(newPwd !== value) {
                return '二次密码不一致'
            }
        }
    })
})()

// 2、重置

// 3、提交表单
$('.layui-form').on('submit',function(e) {
    e.preventDefault()
    // alert('submit')
    updatePwd($(this))
})

function updatePwd(obj) {
    $.ajax({
        method: 'PATCH',
        url: '/my/updatepwd',
        data: obj.serialize(),
        success: function(res) {
            if(res.code === 0) {
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
                // location.href = '../home/index.html'
            }
            console.log(res)
        }
    })
}
