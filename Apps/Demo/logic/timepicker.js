define(["../../../components/timepicker"],function(timepicker){
    function pageLogic(config){
      this.pageview = config.pageview;
      var t  = new timepicker({
        wrapper:this.pageview.$el
      });

    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },

    };
    return pageLogic;
});
