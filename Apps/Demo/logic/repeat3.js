define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        right_icon_click:function(sender,params){
            this.pageview.go("page2",{id:"192837221"});
        },
        repeat_itemclick:function(sender,params){
          var title = sender.datasource.title;
          this.pageview.showTip({text:title,duration:800});
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
    };
    return pageLogic;
});
