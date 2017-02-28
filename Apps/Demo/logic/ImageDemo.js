define([],function(){




    function pageLogic(config){
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        Image4_error:function(){
          this.pageview.showTip({text:"Image4组件图片加载失败",duration:800});
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        }
    };
    return pageLogic;
});
