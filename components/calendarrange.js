/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","base","./calendar"],function(utils,baseClass,calendar){
    var Component = function(config){
        var _this = this;
        Component.baseConstructor.call(this,config);

    }

    utils.extends(Component,baseClass);

    return Component;
});
