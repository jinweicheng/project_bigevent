let form = layui.form
let layer = layui.layer
;(function() {
    
    let form = layui.form
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称名字不能超过6个字符'
            }
        }
    })

    // 1、获取用户信息
    getUserInfo()
})()

// 1、获取用户的信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if(res.code === 0) {
                renderUserInfo(res.data)
                return layer.msg('获取用户信息成功！')
            }
            return layer.msg('获取用户信息失败！')
        }
    })
}

// 渲染信息
function renderUserInfo(data) {
    
    // console.log(data.username)
    // $('.layui-card [name=username').html(data.username || '')
    // $('.layui-card [name=nickname]').html(data.nickname || '')
    // $('.layui-card [name=email]').html(data.email || '')  
    // $('.layui-card [name=username').html('data.username')
    // $('.layui-card [name=nickname]').html('data.nickname')
    // $('.layui-card [name=email]').html('data.email')  

    // form的快速赋值
    let form = layui.form
    form.val('formUserInfo',data)
}

// 2、修改用户信息
$('.layui-form').on('submit',function(e) {
    // alert('submit')
    e.preventDefault()
    // e.preventDefault()
    // console.log($(this).serialize())
    modifyUserInfo($(this).serialize())

})

function modifyUserInfo(data) {
    $.ajax({
        method: 'PUT',
        url: '/my/userinfo',
        data: data,
        success: function(res) {
            if(res.code === 0) {

                window.parent.getUserInfo()
                // console.log()
                return layer.msg('修改用户信息成功!')
                // 调用父类的方法
                // window.parent.getUserInfo()
            }
            return layer.msg('修改用户信息失败!')
        }

    })
}

// 3、重置用户信息
$('.resetbtn').on('click',function(e) {
    // alert('resetbtn')
    e.preventDefault()
    getUserInfo()
})



