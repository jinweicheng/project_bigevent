; (function () {

    // 初始化富文本编辑器
    initEditor()

    // 2-1. 初始化图片裁剪器
    var $image = $('#image')
    // 2-2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 2-3. 初始化裁剪区域
    $image.cropper(options)
    // 2-4、选择图片
    $('.btn-chose-img').on('click', function () {
        $('#files').click()

        $('#files').on('change', function (e) {
            let files = e.target.files
            if (files.length == 0) {
                return
            }
            var file = files[0]
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })
    })

    // 发布文章的提交操作
    let textbtn = '已发布'
    $('.btn-publish').on('click', function () {
        textbtn = '已发布'
    })

    $('.btn-save').on('click', function () {
        textbtn = '草稿'
    })

    // form提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', textbtn)

        // 图片二进制
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log(blob)
                fd.append('test', 12)
                fd.append('cover_img', blob)

                // 打印formdata数据
                fd.forEach(function (value, key) {
                    console.log(key, value)
                })

                $.ajax({
                    type: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    // form表单提交的必须添加非属性
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        console.log(res)
                        if (res.code === 0) {
                            layer.msg(res.message)
                            // location.href = '../home/index.html'
                        }
                    }
                })
            })





    })
})()