define([],function(){
    function pageLogic(){
    }
    pageLogic.prototype = {
        page2_btn1_click:function(sender,params){
            this.pageview.go("page2",{id:Math.random()*1000});
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        page2_btn2_click:function(sender,params){
            console.log(sender.pageview);
        }
    };
    return pageLogic;
});
