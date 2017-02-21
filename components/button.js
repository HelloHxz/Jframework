/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        Component.baseConstructor.call(this,config);
        var title = config.text||config.title || "按钮";
        var mode = config.mode || "1";
        var className = "displayflex yy-btn "+"yy-btn-"+mode;
        this.$el.addClass(className);
        this.$el.html(title);



    }

    utils.extends(Component,baseClass);

    return Component;
});
