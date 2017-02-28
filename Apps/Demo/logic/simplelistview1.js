define(["../common/data"],function(DemoData){
    function pageLogic(config){
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        backIcon_click:function(){
            this.pageview.goBack();
        },

        //page_content 组件声明事件 让该组件具备下拉刷新的功能
        page_content_pulltorefresh:function(sender,params){
            //刷新的时候执行加载第一页的数据
            this.listview.loadFirstPageData();
        },
        //page_content 组件声明事件 让该组件具备上拉加载更多的功能
        page_content_loadmore:function(sender,params){
            //上拉
            this.listview.loadNextPageData();
        },
        page_content_reload:function(sender){
          //当网络失败的时候 显示错误信息  提供再次加载的时机
          //重新调用列表重新加载方法
          this.listview.reload();
        },
        //列表初始化 保留列表对象的引用
        listview_init:function(sender){
            this.listview = sender;
        },
        //列表实例话完成后 调用开始加载数据
        listview_didmount:function(sender){
            sender.loadFirstPageData();
        },
        //列表返回数据的时候 如果获取成功则返回数据中的数组
        //失败的时候则直接return false;界面会显示重新加载的界面
        listview_parsedata:function(sender,params){
            var result = params.data;
            if(result.code!==0){
                return false;
            }
            return result.data;
        },

        rowDelIcon_click:function(sender,params){
            //得到当前行的行对象ListRow实例
            var rowInstance = sender.rowInstance;
            //调用ListRow的实例方法
            rowInstance.delete();

            this.pageview.showTip({text:"删除",duration:900});
        },
        listview_getrowswipeicons:function(sender,params){
            //获取到当前行的数据
          var rowDataSource = sender.datasource;
          // or  sender.rowInstance.datasource
          //简单根据数据显示不同的按钮
          if(rowDataSource.status===0){
            return ["rowEditIcon","rowDelIcon"];
          }else if(rowDataSource.status==1){
            return ["rowOtherIcon"];
          }else{
            return ["rowEditIcon","rowOtherIcon"];
          }
        },
        rowOtherIcon_click:function(sender,params){
            var rowInstance = sender.rowInstance;
            this.pageview.showTip({text:"做其他的操作",duration:900});
            rowInstance.closeSwipe();
        },
        rowEditIcon_click:function(sender,params){
            //获取到行实例
            var rowInstance = sender.rowInstance;
            //获取到行数据
            var rowDataSource = sender.datasource;
            //修改行数据
            rowDataSource.name = "修改之后的名称";
            //重新绑定行数据
            rowInstance.rebind(rowDataSource);
            //关闭行侧滑
            rowInstance.closeSwipe();
            this.pageview.showTip({text:"修改成功",duration:900});
        },
        //demo演示的时候 因为没有部署后台 所以为了显示效果 直接定义了一个很简单的数据模拟
        listview_demo演示:function(sender,params){
            return DemoData.getListData(params.params);
        }

    };
    return pageLogic;
});
