define([],function(){
    function pageLogic(config){
      this.pageview = config.pageview;
      // console.log(this.pageview.params);
      this.config = config;
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        onPageLoad:function(){
            var goto = this.pageview.params.goto;
            if(goto){
                this.pageview.go(goto);
            }
        },
        right_icon_init:function(sender){
        },
        onPageBeforeLeave: function (sender, params) {
            if (params.isForward !== true) {
                try{
                    window.parent.go(-1);
                }catch(e){

                }
                return false;
            }
        },
        header_lefticon_click:function(sender,params){
          this.config.pageview.showPage({
            pageKey:"userinfo",
            mode:"fromLeft1",
            inRouter:false
          });
        },
        viewpager_init:function(sender,params){
          this.viewpager = sender;
        },
        header_segment_change:function(sender,params){
          if(params.item.datasource.title=="常规"){
            this.viewpager.showItem("page1Repeat");
          }else if(params.item.datasource.title=="综合"){
            this.viewpager.showItem("pageFormDemo");
          }else{
            this.viewpager.showItem("page1Repeat");
          }
        },
        searchinput_click:function(sender,params){
          this.config.pageview.showPage({
            pageKey:"SearchPageDemo",
            mode:"fromBottom"
          });
        },
        formsearchinput_click:function(sender,params){
          this.config.pageview.showPage({
            pageKey:"SearchPageDemo",
            mode:"fromBottom"
          });
        },
        form_wrapper_pulltorefresh:function(sender,params){
          window.setTimeout(function(){
            sender.resetPullLoadState();
          },2000);
        },
        repeat_wrapper_pulltorefresh:function(sender,params){
          window.setTimeout(function(){
            sender.resetPullLoadState();
          },3000);
        },
        right_icon_click:function(sender,params){
            this.toppopover.show(sender);
        },
        toppopover_init:function(sender,params){
          this.toppopover = sender;
        },
        popover_repeat_itemclick:function(sender,params){
          this.pageview.showTip({
            text:sender.datasource.title,
            duration:1000,
          });
          this.toppopover.hide();
        },
        formrepeat_itemclick:function(sender,params){
          var title = sender.datasource.title;
          if(title=="Form"){
            this.pageview.go("FormDemo",{testparams:"192837221"});
          }else if(title=="TimePicker"){
            this.pageview.go("timepicker",{testparams:"192837221"});
          }
        }

    };
    return pageLogic;
});
