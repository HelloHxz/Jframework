define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        Component.baseConstructor.call(this,config);
        this.mode = config.mode || "bottom";
        var className = "displayflex yy-poplayer yy-poplayer-"+this.mode;
        this.showClassName = "yy-poplayer-"+this.mode+"-show";
        this.hideClassName = "yy-poplayer-"+this.mode+"-hide";
        this.bkCover = $("<div class='yy-poplayer-bk displaynone'></div>");
        if(config.bkCoverStyle){
            this.bkCover.css(config.bkCoverStyle);
        }
        this.bkCover.appendTo(this.pageview.$$childrenWrapper);
        this.bkCover.bind("click",function(){
          _this.hide();
        });
        this.$el.addClass(className);
        this.initLayout(this.datasource);
    }
    utils.extends(Component,baseClass);

    Component.prototype.show = function(){
      this.bkCover.removeClass("displaynone");
      this.$el.removeClass(this.hideClassName).addClass(this.showClassName);
    }
    Component.prototype.hide = function(){
      this.bkCover.addClass("displaynone");
      this.$el.removeClass(this.showClassName).addClass(this.hideClassName);
    }
    return Component;
});
