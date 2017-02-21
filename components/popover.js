/*
  {
  type:"popover",
  style:{},
  animate:{
  mode:"1"
}

},
}
*/

define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        config.noNeedSetStyle = true;
        config.style = config.style || {};
        config.arrowStyle = config.arrowStyle || {};
        config.arrowStyle = config.arrowStyle || "16px";
        config.arrowStyle.backgroundColor = config.arrowStyle.backgroundColor||"rgba(0,0,0,.9)";
        config.arrowStyle.height = config.arrowStyle.height || "14px";
        config.arrowStyle.width = config.arrowStyle.height;
        if(!config.style.width){
          config.style.width = "120px";
        }
        if(!config.style.height){
          config.style.height = "200px";
        }
        Component.baseConstructor.call(this,config);
        this.width_int = parseInt(this.config.style.width);
        this.height_int = parseInt(this.config.style.height);
        this.$el.addClass("yy-popover");
        config.arrowStyle["transform"] = 'rotate(45deg)';
        config.arrowStyle["-webkit-transform"] = 'rotate(45deg)';
        this.animateAction = "0";//slide gradient
        if(config.animate){
          this.animateAction = config.animate.mode;
        }

        this.offset = config.offset || {x:0,y:0};
        var x = this.offset.x || 0;
        var y = this.offset.y || 0;
        this.offset.x = parseInt(x);
        this.offset.y = parseInt(y);

        this.arrow_width_int = parseInt(config.arrowStyle.width);
        this.arrow = $("<div class='yy-pop-arrow'></div>");
        this.bkCover = $("<div class='yy-pop-bk displaynone'></div>");
        utils.css(this.arrow,config.arrowStyle);
        this.contentWrapper = $("<div class='displayflex yy-pop-content'></div>");
        this.$$childrenWrapper = this.contentWrapper;
        utils.css(this.contentWrapper,this.config.style);
        this.$el.append(this.arrow).append(this.contentWrapper);
        if(config.bkCoverStyle){
            utils.css(this.bkCover,config.bkCoverStyle);
        }
        this.bkCover.appendTo(this.pageview.$$childrenWrapper);

        this.bkCover.bind("click",function(){
          _this.hide();
        });
        this.initLayout(config.$$datasource);
    }

    utils.extends(Component,baseClass);
    Component.prototype.getHeight = function(){
      return this.$el.height();
    },
    Component.prototype.hide = function(){
      var _this = this;
      if(this.animateAction!="0"&&this.animateAction!="1"){
        this.$el.css({opacity:0});
        window.setTimeout(function(){
          _this.$el.css({visibility:"hidden"});
        },300);
      }else{
        this.$el.css(this.hidePos);
      }
      _this.bkCover.addClass("displaynone");

    }
    Component.prototype.show = function(target,param){
      param = param || {};
      var _this = this;
      var posDirection = param.direction;
      if(!target){return};
      var Rect= target.getClientRect();
      if(!posDirection){
        if(Rect.top>this.getHeight()+this.arrow_width_int){
          //说明上方空间充足
          posDirection = "top";
        }else if(utils.viewport.height-Rect.bottom>this.getHeight()+this.arrow_width_int){
          //下方空间充足
          posDirection = "bottom";
        }
      }

      var pos = {
        visibility:"visible",
        transition: "transform .3s ease"
      }
      this.hidePos = {};
      if(posDirection == "top"){
        var top_int = (Rect.top-this.getHeight()-this.arrow_width_int);
        pos.top = top_int+"px";
        if(this.animateAction=="0"){
          //无效果
          this.hidePos["visibility"] = "hidden";
        }else if(this.animateAction=="1"){
          //滑入
          this.hidePos["transform"] = "translate3d(0,"+(utils.viewport.height-top_int)+"px,0)";
          pos["transform"] = "translate3d(0,"+(utils.viewport.height-top_int)+"px,0)"
        }else{
          //渐变

          pos["transition"] = "opacity .3s ease";
          this.hidePos["visibility"] = "hidden";
          pos["opacity"] = "0"
          pos["transform"] = "translate3d(0,0,0)"
        }
      }
      else if(posDirection == "bottom"){
        var top_int =Rect.bottom+this.arrow_width_int/2;
        pos.top = top_int+"px";
        if(this.animateAction=="0"){
          this.hidePos["visibility"] = "hidden";
          //无效果
        }else if(this.animateAction=="1"){
          //滑入
          this.hidePos["transform"] = "translate3d(0,"+(0-this.getHeight()-top_int-10)+"px,0)";
          pos["transform"] = "translate3d(0,"+(0-this.getHeight()-top_int-10)+"px,0)"
        }else{
          //渐变
          pos["transition"] = "opacity .3s ease";
          this.hidePos["visibility"] = "hidden";
          pos["opacity"] = "0"
          pos["transform"] = "translate3d(0,0,0)"
        }
      }
      pos.left = (Rect.left+Rect.width/2-this.width_int/2+this.offset.x);
      var diffLeft = pos.left+this.width_int - utils.viewport.width;
      if(diffLeft>0){
        pos.left = pos.left - diffLeft-6;
      }
      if(pos.left<0){
        pos.left = 6;
      }

      var arrowStyle = {
        left:(Rect.left+Rect.width/2-this.arrow_width_int/2-pos.left)+"px",
      };
      if(posDirection == "bottom"){
        arrowStyle["border-top-left-radius"] = "4px";
        arrowStyle.top = "-"+(this.arrow_width_int/2)+"px";
      }else{
        arrowStyle["border-bottom-right-radius"] = "4px";
        arrowStyle.bottom = "-"+(this.arrow_width_int/2)+"px";
      }
      utils.css(this.arrow,arrowStyle);
      utils.css(this.$el,pos);
      this.bkCover.removeClass("displaynone");
      if(this.animateAction=="0"){
        //无效果
          _this.$el.css({visibility:"visible"});
        // _this.$el.css({translate3d:"translate3d(0,0,0)"});
      }else if(this.animateAction=="1"){
        //滑入
        window.setTimeout(function(){
          _this.$el.css({transform:"translate3d(0,0,0)"});
        },0);
      }else{
        //渐变
        window.setTimeout(function(){
          _this.$el.css({opacity:"1"});
        },0);
      }

    }
    return Component;
});
