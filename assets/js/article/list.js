;(function() {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    // 1、获取文章列表的数据
    let params = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    // 获取文章的列表数据
    getArticleList()
    function getArticleList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: params,
            success: function(res) {
                if(res.code === 0) {
                    // layer.msg(res.message)
                    let htmlstr = template('template-script',res)
                    $('tbody').html(htmlstr)
                    renderPage(res.total)
                }
            }
        })
    }
    // 时间格式化
    template.defaults.imports.dateFomart = function(date) {
        let dt = new Date(date)
        let year = paddZero(dt.getFullYear())
        let month = paddZero(dt.getMonth() + 1)
        let day = paddZero(dt.getDate())
        let hour = paddZero(dt.getHours())
        let minute = paddZero(dt.getMinutes())
        let second = paddZero(dt.getSeconds())
        return `${year}-${month}-${day} ${hour}:${minute}:${second}}`
    }
    function paddZero(str) {
        return str.length > 9? str: `0${str}`
    }


    // 2、获取所有分类的数据
    getCategorys()
    function getCategorys() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: function(res) {
                if(res.code === 0) {
                    // console.log(res)
                    let htmlstr = template('template-category-script',res)
                    // console.log(htmlstr)
                    $('[name=cate_id]').html(htmlstr)
                    // 注意重新渲染机制：因为没有监听
                    form.render()
                    // layer.msg(res.message)
                }
            }
        })
    }


    // 3、点击筛选
    $('#form-filter-fnc').on('submit',function(e) {
        e.preventDefault()    
        let category = $('[name=cate_id').val()
        let status = $('[name=state').val()
        params.cate_id = category
        params.state = status
        getArticleList()
    })


    // 4、分页数据显示
    function renderPage(count) {
        // alert(count)
        laypage.render({
            elem: 'pagebox',
            count: count,
            limit: params.pagesize,
            curr: params.pagenum,
            layout: ['count','limit','prev', 'page', 'next','skip'],
            limits: [2,3,5,10,20],
            jump: function(obj, renderfirst) {
                params.pagenum = obj.curr
                params.pagesize = obj.limit
                if(!renderfirst) {
                    getArticleList()
                    console.log(1)
                }
            }
        })
    }

    // 点击编辑
    let dialog_edit_index = null
    $('body').on('click','#form-edit',function() {
        // alert('edit')
        let id = $(this).attr('data-id')
        alert('没有权限编辑')

        // 弹窗显示
        // dialog_edit_index = layer.open({
        //     type: 1,
        //     title: '修改文章分类',
        //     area: ['500px', '260px'],
        //     content: $('#template-edit-script').html()
        // })

        // $.ajax({
        //     method: 'get',
        //     url: '/my/article',
        //     data: {id: id},
        //     success: function(res) {
        //         if(res.status === 0) {
        //             // layer.msg(res.message)
        //             // getArticleList()
        //         }
        //     }
        // })

    })
    // 点击删除
    $('body').on('click','#form-delete',function() {
        // alert('delete')

        let id = $(this).attr('data-id')
        return alert('没有权限删除')
        layer.confirm('是否要删除发布的文章?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete',
                data: {id: id},
                success: function(res) {
                    if(res.code === 0) {
                        layer.msg(res.message)
                        getArticleList()
                    }
                }
            })
            layer.close(index);
          }); 


    })
})()