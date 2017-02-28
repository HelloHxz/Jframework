define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;

        Component.baseConstructor.call(this,config);
        this.tabPages = {};
        this.$el.addClass("yy-tabbarview");
        this.tabbarWrapper = $("<div class='yy-tabbar flex-h displayflex'></div>");
        this.pageWrapper = $("<div class='yy-tabbbar-pages'></div>");
        var tabbarStyle = config.tabbarStyle;
        if(tabbarStyle){
            utils.css(this.tabbarWrapper,tabbarStyle);
        }
        this.selectedItem = null;
        this.curPageInstance = null;
        var tabLen = this.config.root.length,initTabCount = 0;
        this.initLayout(this.datasource,function(com_instance){
          com_instance.$el.bind("click",function(){
            _this._itemClick(com_instance);
          });
          initTabCount+=1;
          if(initTabCount == tabLen){
            _this.tabdidmount();
          }
          _this.tabbarWrapper.append(com_instance.$el);
        });
        this.$el.append(this.pageWrapper);
        this.tabbarWrapper.appendTo(this.$el);

    }
    utils.extends(Component,baseClass);
    Component.prototype.tabdidmount = function(){
      var firstKey = this.config.root[0];
      var pageKeyFromUrl = this.pageview.params["$$pn"];
      var selectedTabKey = pageKeyFromUrl || firstKey;
      var item = this.components[selectedTabKey]||this.components[firstKey];
      this._itemClick(item,pageKeyFromUrl?true:false);
    },
    Component.prototype._itemClick = function(com_instance,isInit){
      var _this = this;
      if(this.selectedItem === com_instance ){
        alert("点了又点");
        return;
      }
      if(this.selectedItem){
        this.selectedItem.unSelected();
      }
      this.selectedItem = com_instance;
      this.selectedItem.selected();
      if(this.curPageInstance){
        this.curPageInstance.$el.css({"left":"-100%"});
      }
      this.curPageInstance = this.tabPages[com_instance.config.comKey];
      this.pageview.showLoadingProgressbar();
      if(!this.curPageInstance){
        this.pageview.pageManager.getPageConfigByPageKey(com_instance.config.comKey,function(pageConfig){
          _this.curPageInstance = _this.pageview.pageManager.createPageView(pageConfig);
          _this.tabPages[com_instance.config.comKey] = _this.curPageInstance;
          _this.pageWrapper.append(_this.curPageInstance.$el);
          _this.pageview.hideLoadingProgressbar();
        });
      }else{
        this.curPageInstance.$el.css({"left":"0"});
        var onResumeMethod = this.curPageInstance.plugin.onPageResume;
        if (onResumeMethod) {
            onResumeMethod.call(this.curPageInstance.plugin, this.curPageInstance, {
                isForward: false
            });
        }
        this.pageview.hideLoadingProgressbar();
      }

      this.pageview.pageManager.tabSeleced(com_instance.config.comKey,isInit);
    }

    return Component;
});
