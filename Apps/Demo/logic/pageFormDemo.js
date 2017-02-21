define([],function(){
    function pageLogic(config){
      this.pageview = config.pageview;
      // console.log(this.pageview.params);
      this.config = config;
    }
    pageLogic.prototype = {
        right_icon_init:function(sender){
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
            this.viewpager.showItem("repeat_wrapper");
          }else if(params.item.datasource.title=="表单"){
            this.viewpager.showItem("form_wrapper");
          }else{
            this.viewpager.showItem("repeat_wrapper");
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
        },
        repeat_itemclick:function(sender,params){
          var title = sender.datasource.title;
          if(title== "Repeat"){
            this.pageview.go("repeatDemo",{id:"192837221"});
          }else if(title=="Tabbar"){
            this.pageview.go("TabbarDemo",{id:"12121"});//"$$pn":"message",
          }else if(title=="CTEST"){
            this.pageview.go("workcenter",{id:"12121"});//"$$pn":"message",
          }
          else if(title=="Button&Icon"){
            this.pageview.go("ButtonDemo",{id:"192837221"});
          }else if(title == "ListView"){
            this.pageview.go("ListViewDemo",{type:"list"});
          }else if(title == "Segment"){
            this.pageview.go("segmentDemo",{type:"segment"});
          }else if(title == "ViewPager"){
            this.pageview.go("viewpagerDemo",{arg:"viewpager",arg1:"1"});
          }else if(title == "Popover"){
            this.pageview.go("popoverDemo",{arg:"popover",arg1:"2"});
          }else if(title == "PopLayer"){
            this.pageview.go("poplayerDemo",{arg:"poplayer",arg1:"4"});
          }else if(title == "ConditionSelector"){
            this.pageview.go("ConditionSelector",{arg:"conditionselector",arg1:"6"});
          }else if(title == "Calendar"){
            this.pageview.go("CalendarDemo",{arg:"calendar",arg1:"6"});
          }else if(title == "Text"){
            this.pageview.go("TextDemo",{arg:"text",arg1:"61"});
          }
        }
    };
    return pageLogic;
});
