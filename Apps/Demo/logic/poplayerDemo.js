define([],function(){
    function pageLogic(config){
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        page2_btn2_click:function(sender,params){
          this.poplayer.show();
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        page2_btn3_click:function(){
            this.poplayerOne.show();
        },
        poplayerOne_btn2_click:function(){
            this.poplayerOne.hide();
        },
        poplayerOne_init: function (sender) {
            this.poplayerOne = sender;
        },
        cancelIcon_click:function(sender,params){
          this.poplayer.hide();
        },
        sharePoplayer_init:function(sender,params){
          this.poplayer = sender;
        },
        shareRepeat_itemclick:function(sender,params){
          this.pageview.showTip({
            text:sender.datasource.title,
            duration:700
          });
          this.poplayer.hide();
        }
    };
    return pageLogic;
});
