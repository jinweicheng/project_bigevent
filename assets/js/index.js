;(function() {
    // 1、获取用户信息
    getUserInfo()

    // 2、退出登录
    $('.class-exit').on('click',function() {
        exitAccount()
    })
})()

// 1、获取用户信息
function getUserInfo() {   
    let layer = layui.layer
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            layer.msg(res.message)
            if(res.code === 0) {
                console.log(res)
                // let htmlstr = template('art_template',res)
                // $('#userAvatar').html(htmlstr)
                // return res
                return renderUserInfo(res.data)
            }
            return layer.msg('获取用户基本信息失败！')
            // return {status: 1,message: '获取用户基本信息失败！',data:null}
        },
        error: function(err) {

        },

        // // 当身份认证失败的时候
        // complete: function(res) {
        //     console.log(res)
        //     // responseJSON: {status: 1, message: '身份认证失败！'}
        //     if(res.responseJSON.status === 1) {
        //         localStorage.removeItem('token')
        //         location.href = '../home/login.html'
        //     }
        // }

    })
}

// 渲染用户信息
function renderUserInfo(data) {
    // let img = $('#userInfo img')
    // let i = $('#userInfo i')
    let name = data.nickname || data.username
    
    let firststr = name.charAt(0).toUpperCase()
    // alert(firststr)
    $('#userInfo i').html(firststr)
    $('#userInfo span').html(`欢迎回来：${name}`)  
    if(data.user_pic !== null) {
        $('#userInfo img').attr('src',data.user_pic)
        $('#userInfo img').show()
        $('#userInfo i').hide()
    } else {
        $('#userInfo img').hide()
        $('#userInfo i').show()
    }
}

// 2、退出用户信息
function exitAccount() {
    let layer = layui.layer
    //eg1
    layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '../home/login.html'
        layer.close(index);
    });

}