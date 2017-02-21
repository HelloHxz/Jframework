define([],function(){


    function pageLogic(config){
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        header_title_init:function(sender,params){
          this.header_title = sender;
        },
        right_icon_click:function(sender,params){
            this.pageview.go("page2",{id:"192837221"});
        },
        viewcontent_pulltorefresh:function(sender,params){
          var _this = this;
          this.header_title.showLoading();
          this.header_title.setText("文本控件的Loading效果");
          window.setTimeout(function(){
            _this.header_title.hideLoading();
            _this.header_title.setText("文本");
            sender.resetPullLoadState();
          },2000);
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        }
    };
    return pageLogic;
});
