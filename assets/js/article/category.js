; (function () {
    // alert('cat')

    // 1、获取文章分类列表
    getCategoryList()

    let layer = layui.layer
    let form = layui.form
    function getCategoryList() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: function (res) {
                console.log(res)
                if (res.code === 0) {
                    // layer.msg(res.message)
                    // 0: {Id: 1, name: '最新', alias: 'Latest', is_delete: 0}
                    let htmlstr = template('template_category', res)
                    $('#tbody_template').html(htmlstr)
                }
            }
        })
    }

    // 2、事件委托:新增文章的dialog
    let dialog_index = null
    $('.add-category').on('click',function() {
        // alert('add_btn')
        dialog_index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#html_script').html()
        })
    })

    $('body').on('click','.form-add-cancle',function(e) {
        layer.close(dialog_index)
    })
    $('body').on('click','.form-add-confirm',function(e) {
        e.preventDefault()
        console.log($('#form-add').serialize())
        addCategory($('#form-add'))
    })
    function addCategory(obj) {
        $.ajax({
            method: 'post',
            url: '/my/cate/add',
            data: obj.serialize(),
            success: function(res) {
                console.log(res)
                if(res.code === 0) {
                    layer.msg(res.message)
                    layer.close(dialog_index)
                    getCategoryList()
                }
            }
        })
    }

    // 3、编辑
    let dialog_edit_index = null
    $('body').on('click','.article-edit-btn',function() {
        // 弹窗显示
        dialog_edit_index = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#html_script_edit').html()
        })

        // 赋值
        // console.log($(this).parent().siblings()[0].innerHTML)
        // console.log($(this).parent().siblings()[1].innerHTML)
        // $('body').attr('#form-edit [name=name]',$(this).parent().siblings()[0].innerHTML) 
        // $('body').attr('#form-edit [name=alias]',$(this).parent().siblings()[1].innerHTML) 
        // alert($(this).attr('data-id'))
        let articleID = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/cate/list/' + articleID,
            success: function(res) {
                console.log(res)
                form.val('form-edit-filter',res.data)
            }
        })

        // 确定修改
        $('body').on('submit','#form-edit',function(e) {
            // alert('form-edit-confirm')
            e.preventDefault()
            console.log($('#form-edit').serialize())
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res)
                    if(res.code === 0) {
                        // layer.msg(res.message)
                        layer.close(dialog_edit_index)
                        getCategoryList()
                    }
                }

            })
        })


    })
    // 4、删除
    $('body').on('click','.article-delete-btn',function() {
        // alert('delete')
        let id = $(this).attr('data-id')


        layer.confirm('是否删除文章?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.code === 0) {
                        layer.msg(res.message)
                        getCategoryList()
                    }
                }
    
            })
            layer.close(index);
          });

        
    })


})()

