define(["utils","../../../components/calendarpicker"],function(utils,calendarpicker){


    function pageLogic(config){
      var _this =this;
      this.pageview = config.pageview;
      this.calendarPicker = new calendarpicker({
        wrapper:this.pageview.innerWrapper,
        ok:function(re){
          _this.pageview.showTip({
            text:re.dateStr,
            duration:1000
          });
        }
      });
    }
    pageLogic.prototype = {
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        showclendarIcon_init:function(sender){
          this.showclendarIcon = sender;
        },
        showclendarIcon_click:function(){
          this.calendarPicker.show();
        },
        calendar_init:function(sender){
          this.calendar = sender;
        },
        calendar_change:function(sender,params){
          if(this.header_title){
            this.header_title.setText(utils.ConvertDateToStr(sender.curDate,"yyyy-MM"));
          }
        },
        right_icon_click:function(){
          this.calendar.setValue(new Date());
        },
        header_title_init:function(sender){
          this.header_title = sender;
        }
    };
    return pageLogic;
});
