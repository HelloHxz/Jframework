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
          var _this = this;
          if(sender.config.$$datasource.title == "开通会员"){
            window.setTimeout(function(){
              _this.pageview.ownerPage.hideCurShowPage();
            },400);
            this.pageview.go("repeatentry",{id:"192837221"});
          }
        }
    };
    return pageLogic;
});
