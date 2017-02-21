define(["utils","base"],function(utils,baseClass){

    var Item = function(config){
      this.itemData = config.itemData;
      this.parent = config.parent;//this.primaryKey
      if(typeof(this.parent.primaryKey)==="string"){
        this.key =this.itemData[this.parent.primaryKey];
      } else if(this.parent.primaryKey instanceof Array){
        var Re =[];
        for(var i=0,j= this.parent.primaryKey.length;i<j;i++){
          Re.push(this.itemData[this.parent.primaryKey[i]]);
        }
        this.key = Re.join("_");
      }else{
        console.error("checklist控件primaryKey属性 错误的数据类型");
      }
      // this.itemData["$$selectedkey"] = this.key;
      this.$el = $("<div data-key='"+this.key+"' class='yy-checklist-item yy-icommon' style='height:"+config.parent.itemHeight+"px;line-height:"+config.parent.itemHeight+"px;font-size:"+utils.fontSize13()+"px'>"+(config.itemData[config.parent.labelKey]||"")+"</div>");
    };

    Item.prototype = {
      selected:function(){
        this.$el.addClass("yy-checklist-item-selected");
      },
      unSelected:function(){
        this.$el.removeClass("yy-checklist-item-selected");
      }
    };

    var Component = function(config){
        var _this = this;
        Component.baseConstructor.call(this,config);
        var labelHeight = utils.getRealHeight("38");
        this.itemHeight = utils.getRealHeight("48");

        this.canbeNull = config.canbeNull || false;
        this.selectedValue = [];
        this.$el.addClass("yy-checklist");
        this.items = [];
         this.selectedValue = this.config.selectedValue||[];
        this.primaryKey = this.config.primaryKey;
        if(!this.primaryKey){
          console.error(this.config.comKey +"控件没有指定primaryKey数据的主键");
        }
        this.loadWrapper = $("<div class='yy-cs-loading-wrapper displayflex jc-center ai-center'><div class='preloader'></div></div>");
        this.backCoverLayer = $("<div class='yy-cl-coverlayer displaynone'></div>");
        var titleWrapper = $("<div style='height:"+labelHeight+"px;font-size:"+utils.fontSize(16)+"px;line-height:"+labelHeight+"px' class='displayflex jc-between ai-center yy-cl-title-wrapper'></div>");

        this.backCoverLayer.bind("touchmove",function(e){
          e.preventDefault();
          e.stopPropagation();
        });
        this.CancelBtn = $("<div  class='yy-checklist-btn'>取消</div>");
        this.OkBtn = $("<div class='yy-checklist-btn yy-checklist-okbtn'>确定</div>");

        titleWrapper.append(this.CancelBtn).append(this.OkBtn);

        this.CancelBtn.bind("click",function(){
          _this.cancel();
        });

        this.OkBtn.bind("click",function(){
          _this.OK();
        });

        this.listWrapper = $("<div style='max-height:"+(this.itemHeight*6.7)+"px;' class='yy-cl-list-wrapper'></div>");
        this.listWrapper.append(this.loadWrapper);
    
        this.pageview.$el.append(this.backCoverLayer);
        this.$el.append(titleWrapper).append(this.listWrapper);
        this.labelKey = this.config.labelKey || "text";
        this.backCoverLayer.bind("click",function(){
          _this.cancel();
        });
        if(utils.deviceInfo().isIOS){
            this.listWrapper.bind("singleTap",function(e){
              _this.itemClick(e);
            });
        }else{
            this.listWrapper.bind("click",function(e){
              _this.itemClick(e);
            });
        }


        var selectedMethodName = this.config.comKey+"_selected";
        this.selectedMethod = this.pageview.plugin[selectedMethodName];

    }

    utils.extends(Component,baseClass);

    Component.prototype.OK = function(){
      if(this.selectedValue.length==0&&!this.canbeNull){
        return;
      }
      this.originalSelectedValue= utils.copy(this.selectedValue);
      this.hide();
      this.selectedMethod && this.selectedMethod.call(this.pageview.plugin,this, {
        selectedValue:this.selectedValue
      });
    };

    Component.prototype.cancel  =function(){
      this.hide();
      if(this.originalSelectedValue){
        this.setItemSelected(this.originalSelectedValue,true);
      }
    };

    Component.prototype._getPrimaryValue = function(data){
      var key = "";
      if(typeof(this.primaryKey)=="string"){
        key = data[this.primaryKey];
      } else if(this.primaryKey instanceof Array){
        var Re =[];
        for(var i=0,j= this.primaryKey.length;i<j;i++){
          Re.push(data[this.primaryKey[i]]);
        }
        key = Re.join("_");
      }else{
        console.error("checklist控件primaryKey属性 错误的数据类型");
      }
      return key;
    },

    Component.prototype.itemClick = function(e){
      var dataKey = e.target.getAttribute("data-key");
      if(dataKey){
        var item = null;
        for(var i=0,j=this.items.length;i<j;i++){
          if(dataKey==this.items[i].key){
            item = this.items[i];
            break;
          }
        }
        if(item){

          var index = this.selectedValue.indexOf(item.itemData);
          if(index>=0){
            this.selectedValue.splice(index,1);
          }else{
            this.selectedValue.push(item.itemData);
          }
          if(this.selectedValue.length == 0 && !this.canbeNull){
            this.OkBtn.addClass("yy-disabled");
          }else{
            this.OkBtn.removeClass("yy-disabled");
          }
          this.setItemSelected(this.selectedValue);
        }
      }
    };

    Component.prototype.show = function(){
      var _this =this;
      this.$el.addClass("yy-checklist-show");
      this.backCoverLayer.removeClass("displaynone");
      this.init();
    };

    Component.prototype.setItemSelected = function(data,isInit){
      // this.selectedValue = data;
      for(var n=0,m=this.items.length;n<m;n++){
        var item = this.items[n];
        item.unSelected();
      }
        this.selectedValue = [];

      if(data.length>0){

      for(var i=0,j=data.length;i<j;i++){
            var pv = this._getPrimaryValue(data[i]);
            for(var n=0,m=this.items.length;n<m;n++){
              var item = this.items[n];
              if(item.key == pv){
                item.selected();
                this.OkBtn.removeClass("yy-disabled");
                this.selectedValue.push(item.itemData);
              }
            }
          }
      }

      if(isInit){
        this.originalSelectedValue= utils.copy(this.selectedValue);
      }

    };

    Component.prototype.setSelectedValue = function(data){
      this.selectedValue = [];
      if(!(data instanceof Array)){
        console.error("checklist setSelectedValue方法必须是数组");
      }
      if(this.items){
        this.setItemSelected(data,true);
      }else{
        this._midSelectedValue = data;
      }
    };

    Component.prototype.createItems = function(data){
        this.dataSource = data;
        this.items = [];
        this.selectedValue = this.config.selectedValue||[];
        this.listWrapper.empty();
        var len = this.dataSource.length;
        for(var i=0,j=len;i<j;i++){
          var itemData = this.dataSource[i];
          var item = new Item({
            itemData:itemData,
            parent:this
          });
          this.listWrapper.append(item.$el);
          this.items.push(item);
          if(len>1&&i!=len-1){
            this.listWrapper.append("<div class='yy-checklist-line'></div>");
          }
        }

        if(this._midSelectedValue){
          this.setItemSelected(this._midSelectedValue,true);
          this._midSelectedValue = null;
        }
        if(this.selectedValue.length>0){
          this.OkBtn.removeClass("yy-disabled");
        }else{
          this.OkBtn.addClass("yy-disabled");
        }
         this.setSelectedValue(this.config.selectedValue||[]);
        //yy-checklist-item-selected
    };

    Component.prototype.init = function(){
      var _this = this;
      if(!this.dataSource){
        _this.loadWrapper.removeClass("displaynone");
        if(_this.loadErrorWrapper){
          _this.loadErrorWrapper.addClass("displaynone");
        }
        _this.OkBtn.addClass("yy-disabled");
        this.loadData (function(data){

          _this.OkBtn.removeClass("yy-disabled");
          _this.loadWrapper.addClass("displaynone");
          if(_this.loadErrorWrapper){
            _this.loadErrorWrapper.addClass("displaynone");
          }
          _this.createItems(data);
        },function(){
          if(!_this.loadErrorWrapper){
            _this.initLoadErrorDom();
          }
          _this.loadErrorWrapper.removeClass("displaynone");
          _this.loadWrapper.addClass("displaynone");
        });
      }
    };

    Component.prototype.loadData = function(success,error){
      if(this.dataSource){
        success(this.dataSource);
        return;
      }
      var methodName = this.config.comKey+"_loaddata";
      var method = this.pageview.plugin[methodName];
      method && method.call(this.pageview.plugin,this,  {
          success:success,
          error:error
        });

    };

    Component.prototype.initLoadErrorDom = function(){
      var _this = this;
      var fontSize =  utils.getRealWidth(11);
      var iconSize =  utils.getRealWidth(20);
      this.loadErrorWrapper = $("<div style='height:100px' class='yy-loadmore-wrapper displayflex jc-center ai-center flex-h'></div>");
      var loadErrorIcon = $("<i style='font-size:"+iconSize+"px' class='yy-icommon yy-loadmore-erroricon'></i>");
      var loadErrorLabel =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>网络异常,点击</span>");
      var reloadLabel = $("<span style='font-size:"+fontSize+"px' class='yy-loadmore-reload-babel'>重新加载</span>");
      reloadLabel.bind("click",function(){
        _this.init();
      });
      this.loadErrorWrapper.append(loadErrorIcon).append(loadErrorLabel).append(reloadLabel);
      this.listWrapper.append(this.loadErrorWrapper);
    };

    Component.prototype.hide = function(){
      this.$el.removeClass("yy-checklist-show");
      this.backCoverLayer.addClass("displaynone");
    };
    return Component;
});
