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
        repeat_icon_init:function(sender,params){
          sender.config.text = sender.config.$$datasource.title;
          sender.config.font = sender.config.$$datasource.icon;
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        repeat_change:function(sender,params){
          if(params.item.config.$$datasource.title == "Repeat Demo"){
            this.pageview.go("repeatDemo",{id:"192837221"});
          }
        }
    };
    return pageLogic;
});
