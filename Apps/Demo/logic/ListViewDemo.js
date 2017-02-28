define(["../common/data"],function(DemoData){
    function pageLogic(config){
      this.seed = 0;
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        listview_init:function(sender){
          this.listview = sender;
        },
        listview_didmount:function(){
          this.listview.loadFirstPageData();
        },
        header_title_init:function(sender){
          this.header_title = sender;
        },
        listview_beforeload:function(sender,params){

        },
        listview_parsedata:function(sender,params){
          // this.header_title.hideLoading();
          var result = params.data;
          console.log(result);
          if(result.code!==0){
              return false;
          }
          return result.data;
        },
        listview_getrowswipeicons:function(sender,params){
          var R = sender.rowindex%3;
          if(R===0){
            return ["rowSwipeOtherIcon","rowDelIcon"];
          }else if(R==1){
            return ["rowSwipeOtherIcon","rowSetReadIcon"];
          }else{
            return ["rowDelIcon"];
          }
        },
        rowDelIcon_click:function(sender,params){
          // sender.rowInstance.closeSwipe();
          sender.rowInstance.delete();
          this.pageview.showTip({
            text:"删除成功",
            pos:"bottom",
            textStyle:{
                marginLeft:5
            },
            textPos:"right",
            duration:1000,
            withoutBackCover:true,
            font:"icomoon_e913",
            style:{
              height:32
            },
            iconStyle:{
              w:20,
              fontSize:14,
              backgroundColor:"rgb(15,198,96)",
              color:"#fff"
            }
          });

        },
        listview_afterload:function(sender,params){
        },
        pageContentView_reload:function(sender){
          this.listview.reload();
        },
        pageContentView_init:function(sender,params){
          this.pageContentView =sender;
        },
        pageContentView_pulltorefresh:function(sender,params){
          // this.header_title.showLoading();
          this.listview.ajaxConfig.params = {
            pageIndex:0,
            R:parseInt(Math.random()*1000)
          };
          this.listview.loadFirstPageData();

        },
        pageContentView_loadmore:function(sender,params){
          this.listview.ajaxConfig.params = {
            pageIndex:1,
            R:parseInt(Math.random()*1000)
          };
          this.listview.loadNextPageData();
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        row_title_status_init:function(sender,para){
          if(sender.datasource.status==1){
            sender.config.selectedKey = "row_title_icon";
          }
        },
        listview_rowclick:function(sender,params){
          // sender.selected();
        },
        //demo演示的时候 因为没有部署后台 所以为了显示效果 直接定义了一个很简单的数据模拟
        listview_demo演示:function(sender,params){
            return DemoData.getListData(params.params);
        }


    };
    return pageLogic;
});
