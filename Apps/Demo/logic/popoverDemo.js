define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
      toolbarIcon_init:function(sender,params){
      
      },
      morePopover_init:function(sender,params){
        this.morePopver = sender;
      },

      backIcon_click:function(sender,params){
        this.pageview.goBack();
      },
      moreBtn_click:function(sender,params){
        this.morePopver.show(sender);
      },
      moreRepeat_icon_init:function(sender,params){
        if(sender.datasource.title=="删除"){
          sender.config.textStyle.color = "red";
        }
      },
      buttonGroup_itemclick:function(sender,params){
        this.morePopver.show(sender);
      }
    };
    return pageLogic;
});
