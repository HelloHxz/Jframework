define(["utils"],function(utils){

  var TPCell = function(config){
    var itemHeight = config.root.itemHeight;
    this.$el = $("<div style='height:"+itemHeight+"px' class='yy-tp-cell'>1</div>");
  }

  var TPColumnWrapper = function(config){
    this.config = config;

    this.itemHeight = config.root.itemHeight;
    this.$el = $("<div class='yy-tp-column yy-flex-1'></div>");
    this.innerWrapper = $("<div data-math='"+Math.random()*10+"' class='yy-tp-column-inner'></div>");
    this.innerWrapper.appendTo(this.$el);
    this.tanKeys = utils.getTransitionKeys();
    this.initLayout();



    this.diff = 0;
    this.startPosY = 0;
    this.posY = 0;
    this.selectedIndex = 0;
  }
  TPColumnWrapper.prototype = {
    initLayout:function(){
      for(var i=0;i<20;i++){
        var tc = new TPCell(this.config);
        this.innerWrapper.append(tc.$el);
      }

    },
    touchStart:function(e){
      this.startPosY = e.touches[0].pageY;
      this.diff = 0;
    },
    touchMove:function(e){
      e.preventDefault();
      e.stopPropagation();
      var curTouch = e.touches[0];
      this.diff = curTouch.pageY - this.startPosY;
      this.curY = this.posY + this.diff;

      var style ={};
      style[this.tanKeys.transition] = "none";
      style[this.tanKeys.transform] = "translate3d(0,"+this.curY+"px,0)";
      this.innerWrapper.css(style);
    },
    touchEnd:function(){
      this.posY = this.curY;
      if(this.diff>0){//向右
        console.log("向下");
      }else{
        console.log("向上");
      }
    }
  };


    var Component = function(config){
        var _this = this;
        var wrapper = config.wrapper || $(document.body);
        this.$el = $("<div class='yy-tp-wrapper'></div>");
        this.itemHeight =parseInt(utils.getRealHeight(36)) ;
        var bodyHeight = this.itemHeight * 4;
        this.body = $("<div style='height:"+bodyHeight+"px' class='yy-tp-body displayflex yy-fd-row'></div>");

        this.columns = [];
        for(var i=0;i<3;i++){
          var TC = new TPColumnWrapper({root:this});
          this.columns.push(TC);
          this.body.append(TC.$el);
        }

        var indicatorWrapper = $("<div style='height:"+this.itemHeight+"px;top:"+this.itemHeight+"px' class='yy-tp-indicator'></div>");
        this.body.append(indicatorWrapper);

        this.$el.append(this.body);

        wrapper.append(this.$el);

        this.initEvent();
    }
    Component.prototype ={
      initEvent:function(){
        var _this = this;
        this.body.bind("touchstart",function(e){
          _this.curTouchColumnIndex = Math.floor(e.touches[0].pageX*_this.columns.length/(utils.viewport.width));
          _this.columns[_this.curTouchColumnIndex].touchStart(e);
        });
        this.body.bind("touchmove",function(e){
          _this.columns[_this.curTouchColumnIndex].touchMove(e);
        });
        this.body.bind("touchend",function(){
          _this.columns[_this.curTouchColumnIndex].touchEnd();
        });
      }
    }


    return Component;
});
