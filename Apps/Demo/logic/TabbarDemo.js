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
        contacts_init:function(sender,params){
          sender.setBadge("3",{
            right:20,
            width:15,
            top:1
          });
        }
    };
    return pageLogic;
});
