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
        contentWrapper_pulltorefresh:function(sender,params){
          window.setTimeout(function(){
            sender.resetPullLoadState();
          },2000);
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
    };
    return pageLogic;
});
