define(["utils","base"],function(utils,baseClass){

    var w = utils.getRealWidth(20);
    var borderRadius = utils.getRealWidth(4);
    var fontSize = utils.getRealWidth(14);
    var unSelectedStyle = {
        width:w,
        height:w,
        borderRadius:borderRadius,
        border:"1px solid rgb(229, 229, 229)",
        backgroundColor:"#fff",
        fontSize:fontSize
    };

    var SelectedStyle = {
        width:w,
        height:w,
        borderRadius:borderRadius,
        border:"1px solid #0093ff",
        color:"#fff",
        backgroundColor:"#0093ff",
        fontSize:fontSize
    };

    var Component = function(config){
        var _this = this;
        config.style = config.style||{};

        this.uss = utils.simpleExtendObj(utils.clone(unSelectedStyle),config.style);

        this.uss = utils.simpleExtendObj(this.uss,config.unSelectedStyle||{});

        this.ss = utils.simpleExtendObj(utils.clone(SelectedStyle),config.selectedStyle||{});
        this.ss = utils.simpleExtendObj(this.ss,config.selectedStyle||{});

        this.value = config.value;

        Component.baseConstructor.call(this,config);
        this.$el.addClass("yy-checkbox yy-icommon");
        this.setValue(this.value);
        this.$el.bind("click",function(){
          _this.change();
        });

        var changeMethodName = this.config.comKey+"_change";
        this.changeMethod = this.pageview.plugin[changeMethodName];
    }

    utils.extends(Component,baseClass);

    Component.prototype.change = function(){
      if(this.changeMethod){
        this.changeMethod.call(this.pageview.plugin,this,{value:!this.value});
      }
    };
    Component.prototype.selected = function(isFromParent){
      if(isFromParent){
        if(this.config.disableParentSelect){
          return;
        }
      }
      this.value = true;
      utils.css(this.$el,this.ss);
      this.$el.addClass("yy-checkbox-selected");
    };

    Component.prototype.unSelected = function(isFromParent){
      if(isFromParent){
        if(this.config.disableParentSelect){
          return;
        }
      }
      this.value = false;
      utils.css(this.$el,this.uss);
        this.$el.removeClass("yy-checkbox-selected");
    };
    Component.prototype.setValue = function(val) {
      this.value = val;
      if(val){
        this.$el.addClass("yy-checkbox-selected");
        utils.css(this.$el,this.ss);
      }else{
        this.$el.removeClass("yy-checkbox-selected");
        utils.css(this.$el,this.uss);
      }
    }
    return Component;
});
