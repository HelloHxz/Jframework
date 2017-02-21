define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        page2_btn1_click:function(sender,params){
            this.pageview.go("page2",{id:Math.random()*1000});
        },
        right_icon_click:function(sender,params){
            this.pageview.go("page2",{id:"192837221"});
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        repeat_icon_init:function(sender,params){
          sender.config.text = sender.config.$$datasource.title;
          sender.config.font = sender.config.$$datasource.icon;
        },
        repeat_change:function(sender,params){
          if(params.item.config.$$datasource.title == "Repeat Demo"){
            this.pageview.go("repeatDemo",{id:"192837221"});
          }
        }
    };
    return pageLogic;
});
