/**
 * show(key)
 * key 是控件的值  或者是页面的值
 *
 */
define(["utils", "base"],
function(utils, baseClass) {
  var viewPagerItem = function(config) {
    viewPagerItem.baseConstructor.call(this, config);
    this.$el.addClass("displayflex yy-viewpager-item");
    this.contentInstance = config.contentInstance;
    this.$el.append(config.contentInstance.$el);
  }

  utils.extends(viewPagerItem, baseClass);

  viewPagerItem.prototype.hide = function(){
    utils.css(this.$el,{display:"none"});
  }

  viewPagerItem.prototype.show = function(){
    utils.css(this.$el,{display:"block"});
  }
  function Component(config) {
    var _this = this;
    Component.baseConstructor.call(this, config);
    this.autoHeight = config.autoHeight;

    this.$el.addClass("yy-viewpager");
    if(this.autoHeight){
       this.$el.addClass("yy-autoheight-viewpager");
    }
    this.height = 0;
    this.items = {};
    this.paramsDict = {};
    var defaultKey = config.defaultKey;
    if(!defaultKey){
      console.error("viewpager控件为提供defalutKey属性");
    }
    this.curPageViewItem = null;
    this._getViewPagerItem(defaultKey,this.config.params||{},function(pvItem){

      _this.curPageViewItem = pvItem;
    },function(){

    });
  }

  utils.extends(Component, baseClass);

  Component.prototype._createViewPagerItem = function(key, type, contentInstance, success) {
    var _this = this;
    var vpi = new viewPagerItem({
      type: "viewpageritem",
      contentType: type,
      contentInstance: contentInstance,
      $$pageview: this.pageview,
      $$datasource: this.datasource,
      $$parent: this
    });
    this.items[key] = vpi;
    this.$el.append(vpi.$el);

    success(vpi);
  }



  Component.prototype.showItem = function(key,itemData) {
    //key可以是页面的Key 或者是控件的Key
    var _this = this;
    this.paramsDict[key] = itemData;
    this._getViewPagerItem(key,itemData,function(pvItem){
      if(_this.curPageViewItem){
          _this.curPageViewItem.contentInstance.plugin.onHideItem&&_this.curPageViewItem.contentInstance.plugin.onHideItem(_this,itemData);
          _this.curPageViewItem.hide();
      }
      _this.curPageViewItem = pvItem;
      _this.curPageViewItem.contentInstance.plugin.onShowItem&&_this.curPageViewItem.contentInstance.plugin.onShowItem(_this,itemData);
      _this.curPageViewItem.show();


    },function(){

    });

  }



  Component.prototype._getViewPagerItem = function(key,itemData, success, error) {
    var _this = this;
    var item = this.items[key];
    if (item) {
      if(item.contentInstance.plugin){
        item.contentInstance.viewpagerParams = itemData;
        var ResumeMethod = item.contentInstance.plugin.onPageResume;
        if(ResumeMethod){
          ResumeMethod.call(item.contentInstance.plugin,item.contentInstance,{});
        }
      }
      success(item);
      return;
    }
    var pageKey = key.split("_")[0];
    var com_config = this.pageview.config.components[pageKey];
    // if (!com_config) {
    this.pageview.pageManager.getPageConfigByPageKey(pageKey,
      function(pageConfig) {
        pageConfig.viewpagerParams = itemData;
        pageConfig.viewpager = _this;
        pageConfig.fullPageKey = key;
        var page_instance = _this.pageview.pageManager.createPageView(pageConfig);
        _this._createViewPagerItem(key, "pageview", page_instance, success)
      },
      function() {
        error && error();
      })
    // } else {
    //   this.getComponentInstanceByComKey(key, this.datasource,this.rowInstance,
    //   function(com_instance) {
    //     _this._createViewPagerItem(key, "component", com_instance, success)
    //   },
    //   function() {
    //     error && error();
    //   })
    // }

  }

  return Component;
});
/**
 * Created by xiaoz on 16/8/13.
 */
