
// jquery的get、post、ajax请求的预处理函数
$.ajaxPrefilter(function(options) {

    // 1、为有权限的接口增加headers参数
    if(options.url.startsWith('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        // alert('包含/my')
    }

    // 2、url路径拼接
    options.url = `http://www.liulongbin.top:3008${options.url}`
    // options.url = `http://ajax.frontend.itheima.net${options.url}`
    


    // 3、为全局挂载complete函数
    options.complete = function(res) {
        console.log(res,options.url)
        // responseJSON: {status: 1, message: '身份认证失败！'}
        if(res.responseJSON.code === 1 && res.responseJSON.message.includes('身份认证失败')) {
            localStorage.removeItem('token')
            location.href = '../home/login.html'
        }
    }
    // console.log(options.url)
})