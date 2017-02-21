/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","base"],function(utils,baseClass){

  var SwiperItem = function(config){
    this.config = config;
    this.$el = $("<div style='"+config.style+"' class='yy-swiper-item-wrapper'></div>");
  }
  SwiperItem.prototype= {
    css:function(css){
      utils.css(this.$el,css);
    }
  }


  var Component = function(config){
    var _this = this;
    this.config = config||{};
    this.$el = $("<div class='yy-swiper-wrapper flex-1'></div>");
    this.itemWrappers = [];
    this.posArr = [0,1,2];
    this.limit = utils.getRealWidth(90);
    this.minOffsetX = config.minOffsetX||0;
    this.tanKeys = utils.getTransitionKeys();
    this.initLayout();
    this.direction = "h";

    this.config.init && this.config.init(this);
  }

  Component.prototype = {
    _posArrGoNext:function(){
      var tem = this.posArr[0] ;
      this.posArr[0] = this.posArr[1];
      this.posArr[1] = this.posArr[2];
      this.posArr[2] = tem;
    },
    _resetPosArr:function(){
      this.posArr = [0,1,2];
    },
    _posArrGoPre:function(){
      var tem = this.posArr[2] ;
      this.posArr[2] = this.posArr[1];
      this.posArr[1] = this.posArr[0];
      this.posArr[0] = tem;
    },
    initLayout:function(){
      var _this = this;
      this.initPos = [0-utils.viewport.width,0,utils.viewport.width];
      for(var i=0;i<3;i++){
        var style = this.tanKeys.transform+":translate3d("+this.initPos[i]+"px,0,0)";
        var swiperItem = new SwiperItem({style:style});
        this.itemWrappers.push(swiperItem);
        this.config.initItem && this.config.initItem(swiperItem,i);
        this.$el.append(swiperItem.$el);
      }


      var startPos,diff,midIsIntransition;
      //midIsIntransition 为了弥补transitinEnd时间差
      _this.isIntransition = false;
      this.$el.bind("touchstart",function(e){
        midIsIntransition = _this.isIntransition;
        if(_this.isIntransition){
          return;
        }
        startPos = e.touches[0].pageX;
      });
      this.$el.bind("touchmove",function(e){


        if(_this.isIntransition||midIsIntransition){
          return;
        }
    
        var curTouch = e.touches[0];
        diff = curTouch.pageX - startPos;
        if(_this.direction ==="h"){
          if(Math.abs(diff)>4){
             e.preventDefault();
             e.stopPropagation();
          }
        }
        _this.setPos("move",diff);
      });
      this.$el.bind("touchend",function(e){
        if(_this.isIntransition||midIsIntransition||!diff||diff==0){
          return;
        }

        if(Math.abs(diff)<_this.limit){
          _this.setPos();
          _this.isIntransition = false;
          return;
        }
        if(diff>0){//向右
          _this.goPre();
        }else{
          _this.goNext();
        }
        diff = 0;
      });
    },
    transitionEnd:function(action){
      this.isIntransition = false;

    },
    goPre:function(){
      //向右滑动 or 向下

      if(this.config.beforeGoPre){
        var re = this.config.beforeGoPre();
        if(re===false){
            this.setPos();
            this.isIntransition = false;
            return;
        }
      }
      var _this = this;
      this.isIntransition = true;
      this._posArrGoPre();
      this.setPos("gopre");
      this.config.onChange && this.config.onChange(
        {
          swiper:this,
          action:"gopre",
          itemWrapper:this.itemWrappers[this.posArr[0]]//itemWrapper 需要重新更新的DOM
        }
      )
      window.setTimeout(function(){
        _this.transitionEnd("gopre");
      },280);
    },
    goNext:function(){
      //向左滑动 or 向上
      if(this.config.beforeGoNext){
        var re = this.config.beforeGoNext();
        if(re===false){
            this.setPos();
            this.isIntransition = false;
            return;
        }
      }
      var _this = this;
      this.isIntransition = true;
      this._posArrGoNext();
      this.setPos("gonext");
      this.config.onChange && this.config.onChange(
        {
          swiper:this,
          action:"gonext",
          itemWrapper:this.itemWrappers[this.posArr[2]]//itemWrapper 需要重新更新的DOM
        }
      )
      window.setTimeout(function(){
        _this.transitionEnd("gonext");
      },280);
    },
    reset:function(){
      this._resetPosArr();
      this.setPos("move",0);
    },
    getMidWrapper:function(){
      return this.itemWrappers[this.posArr[1]];
    },
    getPreWrapper:function(){
      return this.itemWrappers[this.posArr[0]];
    },
    getNextWrapper:function(){
      return this.itemWrappers[this.posArr[2]];
    },
    setPos:function(action,offset){
      var _this = this;

      offset = offset || 0 ;
      for(var i=0;i<3;i++){
        var itemIndex = _this.posArr[i];
        var curItemWrapper = _this.itemWrappers[itemIndex];
        var style = {};
        style[_this.tanKeys.transition] =action=="move"?"none":this.tanKeys.transform +" .35s ease";
        if(action =="gopre"&&i==0){
            style[_this.tanKeys.transition] = "none";
        }
        if(action =="gonext"&&i==2){
            style[_this.tanKeys.transition] = "none";
        }
        style[_this.tanKeys.transform] = "translate3d("+(this.initPos[i]+offset)+"px,0,0)";
        curItemWrapper.css(style);
      }
    }
  }


  return Component;
});
