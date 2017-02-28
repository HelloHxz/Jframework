define([],function(){
    function pageLogic(config){
      this.seed = 0;
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        简单的九宫格_click:function(){
            this.pageview.go("repeat1");
        },
        menu例子_click:function(){
            this.pageview.go("repeat2");
        },
        工具栏_click:function(){
            this.pageview.go("popoverDemo");
        },
        单选ListView_click:function(){
            this.pageview.go("simplelistview3");
        },
        backIcon_click:function(){
            this.pageview.goBack();
        }

    };
    return pageLogic;
});
