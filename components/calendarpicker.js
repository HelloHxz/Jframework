/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","calendar"],function(utils,Calendar){
    var Component = function(config){
        var _this = this;
        config = config||{};
        var wrapper = config.wrapper || document.body;
        this.$el = $("<div class='yy-calendar-picker'></div>");
        this.calendar = new Calendar({
          itemHeight:38
        });
        this.backCover = $("<div class='yy-calendar-picker-bk displaynone'></div>");
        this.backCover.bind("click",function(){
          _this.hide();
        });

        var btnH = utils.getRealHeight("36");

        var btnWrapper = $("<div style='height:"+btnH+"px' class='yy-calendar-picker-btns'></div>");
        var cancelBtn = $("<div style='font-size:"+utils.fontSize15()+"px;line-height:"+btnH+"px' class='yy-calendar-picker-cancelbtn'>取消</div>");
        var okbtn = $("<div style='font-size:"+utils.fontSize15()+"px;line-height:"+btnH+"px' class='yy-calendar-picker-okbtn'>确定</div>");

        okbtn.bind("click",function(){
          config.ok && config.ok({
            date:_this.calendar.selectedTime,
            dateStr:utils.ConvertDateToStr(_this.calendar.selectedTime)
          });
          _this.hide();
        });

        cancelBtn.bind("click",function(){
          _this.hide();
        });
        btnWrapper.append(cancelBtn).append(okbtn);
        this.$el.append(btnWrapper).append(this.calendar.$el);
        $(wrapper).append(this.backCover[0]).append(this.$el);
    }

    Component.prototype.show = function(date){
      this.calendar.setValue(date);
      var _this = this;
      window.setTimeout(function(){
        _this.$el.addClass("yy-calendar-picker-show");
        _this.backCover.removeClass("displaynone");
      },0);
    }
    Component.prototype.hide = function(date){
      this.$el.removeClass("yy-calendar-picker-show");
      this.backCover.addClass("displaynone");
    }


    return Component;
});
