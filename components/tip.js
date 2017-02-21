/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils"],function(utils){

  var Tip = function(outWrapper){
    var _this = this;
    outWrapper = outWrapper||$(document.body);

    this.tipWrapper = $("<div class='yy-tip displayflex jc-center ai-center displaynone'></div>");
    this.textDom = $('<div class="yy-tip-text displaynone"></div>');
    this.backCover = $('<div class="yy-tip-backcover displaynone"></div>');
    this.backCover.bind("click",function(){
      _this.clickBackCover();
    });
    this.tipWrapper.append(this.textDom);
    outWrapper.append(this.tipWrapper).append(this.backCover);
    this.hideTimeoutId = null;
  }

  Tip.prototype={
    show:function(config){
      var _this = this;
      this.textPos = config.textPos ||"bottom";
      if(this.textPos == "left" || this.textPos == "right"){
        this.tipWrapper.addClass("flex-h");
      }else{
        this.tipWrapper.addClass("flex-v");
      }
      var pos = config.pos ||"center";
      this.config = config;
      this.hideTimeoutId&&window.clearTimeout(this.hideTimeoutId);
      config = config||{};
      var style = config.style ;
      if(style){
        this.tipWrapper.css(utils.processStyle(style));
      }
      this._setText(config.text,config.textStyle);
      this._setIcon(config.font,config.iconStyle);

      if(!this.config.withoutBackCover){
        this.backCover.removeClass("displaynone");
      }
      this.startClass = "yy-tip-ani-"+pos+"-start"
      this.tipWrapper.removeClass("displaynone").addClass(this.startClass);

      window.setTimeout(function(){
        _this.endClass = "yy-tip-ani-"+pos+"-end"
        _this.tipWrapper.addClass(_this.endClass);
      },3);

      if(config.duration&&!isNaN(config.duration)){
        this.hideTimeoutId = window.setTimeout(function(){
          _this.hide();
        },
       parseInt(config.duration));
      }
    },
    _setText:function(text,textStyle){
      if(text){
        this.textDom.removeClass("displaynone");
        if(textStyle){
          this.textDom.css(utils.processStyle(textStyle));
        }
        this.textDom.html(text);
      }else{
        this.textDom.addClass("displaynone");
      }
    },
    _setIcon:function(font,iconStyle){
      this.iconDom && this.iconDom.remove();
      var font_family,font_code;
      font = font||"";
      var font_arr = font.split("_");
      if(font_arr.length==2){
          font_family = font_arr[0];
          font_code = font_arr[1];
          this.iconDom = $('<i class="yy-tip-icon displayflex jc-center ai-center yy-icon-code displaynone" data-icon="&#x'+font_code+';"></i>');

          if(iconStyle){
            this.iconDom.css( utils.processStyle(iconStyle) );
          }
          this.iconDom.removeClass("displaynone");
          this.iconDom.css({"font-family":font_family});
          if(this.textPos == "top" || this.textPos == "left"){
            this.iconDom.appendTo(this.tipWrapper);
          }else{
            this.iconDom.insertBefore(this.textDom);
          }
      }else{
        this.icomDom&&this.iconDom.addClass("displaynone");
      }
    },
    clickBackCover:function () {
      if(this.config.clickNoHide){
        return;
      }
      this.hideTimeoutId&&window.clearTimeout(this.hideTimeoutId);
      this.hide();
    },
    hide:function(){
      var _this = this;
      this.tipWrapper.removeClass(this.endClass);
      window.setTimeout(function(){
        _this.tipWrapper.addClass("displaynone").removeClass(_this.startClass);
        _this.tipWrapper.remove();
        _this.backCover.remove();
      },300);
      _this.backCover.addClass("displaynone");
    }
  }

  return Tip;

});
