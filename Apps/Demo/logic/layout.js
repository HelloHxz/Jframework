define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
    };
    return pageLogic;
});
