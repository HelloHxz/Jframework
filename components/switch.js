define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        config.style = config.style||{};
        var defalutHeight = utils.getRealHeight(28);
        var defalutWidth  = utils.getRealWidth(48);
        var height = config.style.height || defalutHeight;
        var width = config.style.width || defalutWidth;
        this.height =isNaN(height)?defalutHeight:parseInt(height);
        this.width =isNaN(width)?defalutWidth:parseInt(width);
        config.style.height = this.height+"px";
        config.style.width = this.width +"px";
        config.style.borderRadius = (this.height/2) +"px";

        var pointWidth = (this.height-2);
        this.switchPoint = $("<div class='yy-swith-pointer'></div>");
        this.pointerStartStyle = {
          top:"1px",
          left:"1px",
          right:(this.width-pointWidth-1)+"px",
          bottom:"1px"
        };

        this.pointerEndStyle = {
          top:"1px",
          left:(this.width-pointWidth-1)+"px",
          right:"1px",
          bottom:"1px"
        };



        Component.baseConstructor.call(this,config);


        this.value = this.config.value;
        this.switchPoint.appendTo(this.$el);
        this.$el.addClass("yy-swith");
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
    Component.prototype.getValue = function(){
      return this.value;
    };
    Component.prototype.setValue = function(val) {
      this.value = val;
      if(val){
        this.switchPoint.css(this.pointerEndStyle);
        this.$el.addClass("yy-swith-selected");
      }else{
        this.switchPoint.css(this.pointerStartStyle);
        this.$el.removeClass("yy-swith-selected");
      }
    }
    return Component;
});
