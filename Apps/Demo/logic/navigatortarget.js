define([],function(){
    function pageLogic(config){
        this.pageviewInstance = config.pageview;
        //获取到url参数
        this.urlParams = this.pageviewInstance.params;
        this.seed = 0;
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
            this.pageviewInstance.goBack();
        }
    };
    return pageLogic;
});
