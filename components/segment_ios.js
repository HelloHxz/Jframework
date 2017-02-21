
define(["utils","base"],function(utils,baseClass){
  var SegmentItem = function(config){
    var _this = this;
    config.style = config.style||{};
    if(!config.style["flexDirection"]&&!config.style["flex-direction"]){
      config.style.flexDirection="column";
    }
    if(!config.style["alignItems"]&&!config.style["align-items"]){
      config.style.alignItems="center";
    }
    if(!config.style["justifyContent"]&&!config.style["justify-content"]){
      config.style.justifyContent="center";
    }
    config.style.flex = 1;
    config.style.height = config.style.height || "25px";
    SegmentItem.baseConstructor.call(this,config);
    this.$el.addClass("displayflex yy-segmentitem");
    this.$el.bind("click",function(){
      _this.parent._itemClick(_this);
    });
    this.initLayout(config.$$datasource);
  }

  utils.extends(SegmentItem,baseClass);

  SegmentItem.prototype.render = function(){

  }

  var Component = function(config){
    var _this = this;
    config.itemStyle = config.itemStyle||{};
    config.style = config.style || {};
    config.style.width =config.style.width|| "300px";
    config.style.border =config.style.border || "1px solid rgb(0, 147, 255)";
    config.style.borderRadius =config.style.borderRadius || "4px";
    var height = config.itemStyle.height || config.style.height || "25px";
    config.itemStyle.height = height;
    delete config.style.height;
    Component.baseConstructor.call(this,config);
    this.$el.addClass("displayflex yy-sgm-ios flex-h");
    this.selectedMode = config.selectedMode;
    this.selectedIndex = config.selectedIndex ||0;
    this.selectedItems ;
    this.components=[];
    this.dataSource =[];
    this.splitStyle = config.splitStyle ||{borderLeft:"1px solid rgb(0, 147, 255)",height:height,width:0};
    this.init();
  }
  utils.extends(Component,baseClass);

  Component.prototype.init=function(){
    var items = this.config.items||[];
    for(var i= 0,j=items.length;i<j;i++){
        this.addItem(items[i]);
    }
  }
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
      selectedClassName:this.config.itemSelectedClassName||"yy-sgm-ios-selected"
    });
    this.components.push(item_instance);
    if(this.components.length == this.selectedIndex+1){
      this.selectedItems = item_instance;
      item_instance.selected();
    }

    this.$el.append(item_instance.$el);
    if(this.components.length>0&&this.components.length<this.config.items.length){
      var splitLine = $("<div></div>");
      utils.css(splitLine,this.splitStyle);
      this.$el.append(splitLine);
    }
  }
  Component.prototype._itemClick=function(itemInstance){
    if(this.selectedItems === itemInstance){
      // alert("点了又点");
      var pluginName = this.config.comKey+"_selectedagin";
      if(this.pageview.plugin&&this.pageview.plugin[pluginName]){
        var method = this.pageview.plugin[pluginName];
        method && method.call(this.pageview.plugin,this,{item:itemInstance,});
      }
    }else{
      if(this.selectedItems){
        this.selectedItems.unSelected();
      }
      this.selectedItems = itemInstance;
      this.selectedItems.selected();

      var pluginName = this.config.comKey+"_change";
      if(this.pageview.plugin&&this.pageview.plugin[pluginName]){
        var method = this.pageview.plugin[pluginName];
        method && method.call(this.pageview.plugin,this,{item:itemInstance});
      }


      var itemData = itemInstance.datasource;
      var key  = itemData.key;
      var viewpagerInstance = this.pageview.refs[this.config.viewpager];

      if(viewpagerInstance && key){
        viewpagerInstance.showItem(key);
      }

    }



  }

    return Component;
});
