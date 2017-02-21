define(["utils","base"],function(utils,baseClass){

    var w = utils.getRealWidth(22);

    var fontSize = utils.getRealWidth(14);
    var unSelectedStyle = {
        width:w,
        height:w,
        border:"1px solid rgb(229, 229, 229)",
        backgroundColor:"#fff",
        fontSize:fontSize
    };

    var SelectedStyle = {
        width:w,
        height:w,
        color:"#fff",
        border:"1px solid rgb(144, 151, 255)",
        backgroundColor:"rgb(144, 151, 255)",
        fontSize:fontSize
    };

    var Component = function(config){
        var _this = this;
        config.style = config.style||{};

        this.uss = utils.simpleExtendObj(utils.clone(unSelectedStyle),config.radioStyle);

        this.uss = utils.simpleExtendObj(this.uss,config.unSelectedRadioStyle||{});

        this.ss = utils.simpleExtendObj(utils.clone(SelectedStyle),config.radioStyle||{});
        this.ss = utils.simpleExtendObj(this.ss,config.selectedRadioStyle||{});
        this.selectedBackgroundColor = this.ss["backgroundColor"]||"#0093ff";

        // delete this.ss["backgroundColor"];
        //
        // var innerWidth = parseInt(this.ss.width)-8;
        // var innerStyle = {
        //   backgroundColor:this.selectedBackgroundColor,
        //   width:innerWidth,
        //   height:innerWidth,
        // };

        Component.baseConstructor.call(this,config);
        this.value = (!this.config.value)?false:true;
        this.$el.addClass("yy-icommon");
        this.$el.addClass("yy-radio-warpper displayflex yy-fd-row yy-jc-center yy-ai-center");
        this.radioDom = $("<div class='yy-radio'></div>");
        // this.radioInnerDom = $("<div  class='yy-radio-inner'></div>");
        this.textDom = $("<div class='yy-radio-text'>"+(this.config.text||"")+"</div>");
        if(this.config.textStyle){
          utils.css(this.textDom,this.config.textStyle);
        }
        // this.radioInnerDom.css(innerStyle);
        // this.radioDom.append(this.radioInnerDom);
        this.$el.append(this.radioDom).append(this.textDom);
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
      utils.css(this.radioDom,this.ss);
        this.$el.addClass("yy-radio-selected");
    };

    Component.prototype.unSelected = function(isFromParent){
      if(isFromParent){
        if(this.config.disableParentSelect){
          return;
        }
      }
      this.value = false;
      utils.css(this.radioDom,this.uss);
        this.$el.removeClass("yy-radio-selected");
    };
    Component.prototype.setValue = function(val) {
      this.value = val;
      if(val){
        this.$el.addClass("yy-radio-selected");
        utils.css(this.radioDom,this.ss);
      }else{
        this.$el.removeClass("yy-radio-selected");
        utils.css(this.radioDom,this.uss);
      }
    }
    return Component;
});
