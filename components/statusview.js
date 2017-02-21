
/*
  {
  type:"statusview",
  defaultKey:"row_title",
  withicon:"row_title_icon",
  style:{

}
},
components:{
  row_title
  row_title_icon:
}
*/
define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        Component.baseConstructor.call(this,config);
        this.$el.addClass ("yy-statusview displayflex");
        this.selectedKey =config.selectedKey|| config.defaultKey;
        this.components={};
        this.change(this.selectedKey);
    }

    utils.extends(Component,baseClass);
    
    Component.prototype.change = function(statusKey){
      var _this = this;
      if(_this.curComponent){
        _this.curComponent.$el.addClass("displaynone");
      }
      var com = _this.components[statusKey];
      if(com){
        com.$el.removeClass("displaynone");
        _this.curComponent = com;
        return;
      }
      if(statusKey&&statusKey!="null"){
        this.curStatusKey = statusKey;
        this.getComponentInstanceByComKey(statusKey,this.datasource,this.rowInstance,function(com_instance){
          _this.components[statusKey] = com_instance;
          _this.curComponent = com_instance;
          if(statusKey!==_this.curStatusKey){
            com_instance.$el.addClass("displaynone");
          }
          _this.$el.append(com_instance.$el);
        },function(){

        });
      }
    }
    return Component;
});
