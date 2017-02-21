
define(["utils","base"],function(utils,baseClass){
  var SegmentItem = function(config){
    var _this = this;

    this.index = config.index;
    config.style = config.style||{};
    if(!config.style["flexDirection"]&&!config.style["flex-direction"]){
      config.style.flexDirection="column";
      config.style.webkitFlexDirection="column";
    }
    if(!config.style["alignItems"]&&!config.style["align-items"]){
      config.style.alignItems="center";
      config.style.webkitAlignItems="center";
    }
    if(!config.style["justifyContent"]&&!config.style["justify-content"]){
      config.style.justifyContent="center";
      config.style.webkitJustifyContent="center";
    }

    if(!config.style.width){
      config.style.flex = 1;
      config.style.webkitFlex = 1;
    }
    config.style.height = config.style.height || "25px";
    SegmentItem.baseConstructor.call(this,config);
    this.$el.addClass("displayflex yy-segmentitem-android");
    this.$el.bind("click",function(){
      if(_this.disabled){
        return;
      }
      _this.parent._itemClick(_this);
    });
    this.childHasInited = false;
    this.initLayout(config.$$datasource,null,null,function(){
      _this.childHasInited = true;
      if(_this.wantToSelected===true){
        _this.selected();
        _this.wantToSelected = false;
      }
    });
  }

  utils.extends(SegmentItem,baseClass);

  SegmentItem.prototype.initSetSelected = function(){
    if(this.childHasInited){
      this.selected();
    }else{
      this.wantToSelected = true;
    }
  }

  var Component = function(config){
    var _this = this;
    config.itemStyle = config.itemStyle||{};
    config.style = config.style || {};
    config.style.width =config.style.width|| "100%";
    var height = config.itemStyle.height || config.style.height || "25px";
    config.itemStyle.height = height;
    delete config.style.height;
    Component.baseConstructor.call(this,config);

    this.$el.css({height:height});
    this.$el.addClass("yy-sgm-android");
    this.$innerWraper = $("<div class='displayflex yy-sgm-android-inner flex-h'></div>");
    this.indicator = $("<div class='yy-sgm-indicator'></div>");
    this.selectedMode = config.selectedMode;
    this.selectedIndex = parseInt(config.selectedIndex) ||0;
    this.selectedItems ;
    this.components=[];
    this.dataSource =[];
    this.splitStyle = config.splitStyle;

    this.offsetX = 0;




    this.$innerWraper.appendTo(this.$el);
    this.init();
  }
  utils.extends(Component,baseClass);

  Component.prototype.init=function(){
    var _this = this;
    this.getdata(function(data){
      _this.createItems(data);
      },
      function(){

      });

  };
  Component.prototype.createItems = function(data){
    var indicatorStyle =this.config.indicatorStyle|| {};
    this.itemCount = data.length;
    if(!this.config.itemStyle.width){
      this.itemWidth_int = 100/data.length;
      this.itemWidth = this.itemWidth_int+"%";
      indicatorStyle.left = this.itemWidth_int*this.selectedIndex+"%";
      indicatorStyle.width = this.itemWidth_int+"%";
      this.$innerWraper.css({"width":"100%"});
    }else{
      this.itemWidth_int = parseFloat(this.config.itemStyle.width);
      this.itemWidth = this.itemWidth_int+"px";
      indicatorStyle.left = this.itemWidth_int*this.selectedIndex+"px";
      indicatorStyle.width = this.itemWidth_int+"px";
      this.maxWidth = this.itemWidth_int*this.itemCount;
      this.$innerWraper.css({"width":(this.maxWidth+3)+"px"});
      this.initEvent();
    }

    this.indicator.css(indicatorStyle);
    this.$innerWraper.append(this.indicator);
     for(var i= 0,j=data.length;i<j;i++){
        this.addItem(data[i]);
    }
  };


  Component.prototype.getdata = function(success,error){
    if(this.config.items){
      success(this.config.items);
      return;
    }
    var getdataname = this.config.comKey+"_getdata";
    var getdatamethod = this.pageview.plugin[getdataname];
    if(getdatamethod){
      getdatamethod.call(this.pageview.plugin,this,{
        success:function(data){
          success(data);
        },
        error:function(){
          error();
        }
      });
    }
  };
  Component.prototype.addItem=function(itemdata){
    this.dataSource.push(itemdata);
    //
    var item_instance = new SegmentItem({
      type:"segmentitem",
      root:this.config.root,
      style:this.config.itemStyle,
      $$pageview:this.pageview,
      $$datasource:itemdata,
      $$parent:this,
      index:this.components.length,
      selectedClassName:this.config.itemSelectedClassName
    });
    this.components.push(item_instance);

    if(this.components.length == this.selectedIndex+1){
      this.selectedItems = item_instance;
      item_instance.initSetSelected();
    }


    this.$innerWraper.append(item_instance.$el);
    if(this.splitStyle){
      if(this.components.length>0&&this.components.length<this.config.items.length){
        var splitLine = $("<div></div>");
        utils.css(splitLine,this.splitStyle);
        this.$innerWraper.append(splitLine);
      }
    }
  }
  Component.prototype._itemClick=function(itemInstance){
    var nochange = this.selectedItems === itemInstance;
    var pluginName = this.config.comKey+"_change";
    if(this.pageview.plugin&&this.pageview.plugin[pluginName]){
      var method = this.pageview.plugin[pluginName];
      if(method){
        var cancel = method.call(this.pageview.plugin,this,{item:itemInstance,nochange:nochange});
        if(cancel){
          return;
        }
      }
    }

    if(nochange){
      // alert("点了又点");
    }else{
      if(this.selectedItems){
        this.selectedItems.unSelected();
      }
      this.selectedItems = itemInstance;
      this.selectedItems.selected();
      if(!this.config.itemStyle.width){
        this.indicator.css({left:this.itemWidth_int *itemInstance.index+"%"});
      }else{
        this.indicator.css({left:this.itemWidth_int *itemInstance.index+"px"});
        // this.$el.scrollLeft( this.itemWidth_int *itemInstance.index);
        if(itemInstance.index!=this.itemCount-1){
          var x = this.itemWidth_int *(itemInstance.index-2);
          x = x<0?0:x;
          if(itemInstance.index!=0){
            x = x+30;
          }else{
            x = 0;
          }
          this.offsetX = 0-x;
          this.$innerWraper.css(
            utils.processTransformStyle("translate3d(-"+(x)+"px,0,0)")
          );
        }
      }
    }




    var itemData = itemInstance.datasource;
    var key  = itemData.key;
    var viewpagerInstance = this.pageview.refs[this.config.viewpager];

    if(viewpagerInstance && key){
      viewpagerInstance.showItem(key);
    }
  };
  Component.prototype.initEvent = function(){
    var startX = 0,diff=0,x=0,startTime;
    var _this = this;
    var sw = utils.viewport.width;

    var maxOffsetX = this.maxWidth - sw;
    maxOffsetX = maxOffsetX<=0?0:maxOffsetX;
    this.$el.bind("touchstart",function(e){
      var touch = e.touches[0];
      startX = touch.pageX;
      diff = 0;
      startTime = new Date().valueOf();
    });
    this.$el.bind("touchmove",function(e){
       var touch = e.touches[0];
       var curX = touch.pageX;
       diff =curX-startX ;
       x = diff+_this.offsetX;
       var css =
            utils.processTransformStyle("translate3d("+(x)+"px,0,0)");
        css.transition = "none";
        css.webkitTransition = "none";
       _this.$innerWraper.css(css);

    });
    this.$el.bind("touchend",function(e){
      var endTime = new Date().valueOf();
      var diffT = endTime - startTime;
      var o =0;
        //右
      if(diffT<400){
        o = maxOffsetX*(1-Math.abs(diff)/sw);
      }
      if(diff>0){
        x +=o;
      }else{
         x -=o;
      }

      if(x>0){
        x = 0;
      }
      if(x<0-maxOffsetX){
        x = 0-maxOffsetX;
      }
       _this.offsetX = x;
       diffT +=200;
      var css =
            utils.processTransformStyle("translate3d("+(x)+"px,0,0)");
      css.transition = "transform "+diffT+"ms ease";
      css.webkitTransition = "transform "+diffT+"ms ease";

      _this.$innerWraper.css(css);
    });
  };

    return Component;
});
