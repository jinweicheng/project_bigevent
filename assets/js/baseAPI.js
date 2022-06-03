
// jquery的get、post、ajax请求的预处理函数
$.ajaxPrefilter(function(options) {
    alert(1)
    options.url = `http://www.liulongbin.top:3007${options.url}`
    console.log(options.url)
})