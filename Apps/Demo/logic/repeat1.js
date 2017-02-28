define([],function(){
    function pageLogic(config){
        this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        app_repeat_didmount:function(sender){
          var _this = this;
          var DemoData = [
            {logo:"FontAwesome_f092",name:"名称",color:"orange"},
            {logo:"FontAwesome_f092",name:"名称",color:"orange"},
            {logo:"FontAwesome_f092",name:"名称",color:"orange"},
            {logo:"FontAwesome_f1cc",name:"名称",color:"orange"},
            {logo:"FontAwesome_f1d2",name:"git",color:"red"},
            {logo:"FontAwesome_f082",name:"facebook",color:"rgb(55, 75, 176)"},
            {logo:"FontAwesome_f092",name:"名称",color:"orange"},
            {logo:"FontAwesome_f092",name:"名称",color:"orange"},
            {logo:"FontAwesome_f067",name:"",color:"#bbb"},

          ];
          var len = DemoData.length;
          if (len > 0) {
              var n = len % 3;
              if (n !== 0) {
                  n = 3 - n;
              }
              for (var i = 0; i < n; i++) {
                  DemoData.push({});
              }
          }
          this.pageview.showLoading({text:"正在加载"});
          window.setTimeout(function(){
            sender.bindData(DemoData);
            _this.pageview.hideLoading(true);
          },1000);
        },
        contentWrapper_pulltorefresh:function(sender,params){
          window.setTimeout(function(){
            sender.resetPullLoadState();
          },2000);
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
    };
    return pageLogic;
});
