define([],function(){
    var Component = function(config){

    };
    Component.prototype.init = function(){
        //动态写入样式

        //引入第三方库
    }
    Component.prototype.refresh = function(){

    }
    Component.prototype.render = function(){
        alert("render method");
    }


    return Component;
});


usecache_text.js

function Plugin(C){
    this.text = "";
    this.render = function(render){};
    this.init = function(render){};
}
