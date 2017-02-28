define([],function(){
    function pageLogic(config){
      this.seed = 0;
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        简单的ListView_click:function(){
            this.pageview.go("simplelistview");
        },
        ListViewDemoBtn_click:function(){
            this.pageview.go("listviewdemo");
        },
        行侧滑ListView_click:function(){
            this.pageview.go("simplelistview1");
        },
        多选ListView_click:function(){
            this.pageview.go("simplelistview2");
        },
        单选ListView_click:function(){
            this.pageview.go("simplelistview3");
        },
        综合ListView_click:function(){
            this.pageview.go("ListViewDemo");
        },
        backIcon_click:function(){
            this.pageview.goBack();
        }

    };
    return pageLogic;
});
