define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
      segment_ios_item2_init:function(sender,params){
        sender.config.text = sender.datasource.title;
        sender.config.font = sender.datasource.icon;
      },
      backIcon_click:function(sender,params){
        this.pageview.goBack();
      },
      viewpager_init :function(sender,params){
        this.viewpager = sender;
      },
      segment_ios2_change:function(sender,params){
        if(params.item.datasource.title=="未审核"){
          this.viewpager.showItem("viewpageItem3");
        }else if(params.item.datasource.title=="全部"){
          this.viewpager.showItem("viewpageItem1");
        }else{
          this.viewpager.showItem("viewpageItem2");
        }
      }
    };
    return pageLogic;
});
