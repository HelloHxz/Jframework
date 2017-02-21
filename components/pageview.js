
/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","base"],function(utils,baseClass){






  var showpageInitStyle = {
    fromLeft1:{"zIndex":5,left:"0",top:0,transform:"translate3d(-100%,0,0)","-webkit-transform":"translate3d(-100%,0,0)"},
    fromLeft2:{"zIndex":101,left:"0",top:0,transform:"translate3d(-100%,0,0)","-webkit-transform":"translate3d(-100%,0,0)"},
    fromLeft3:{left:0,top:0,"zIndex":5,transform:"translate3d(0,0,0)","-webkit-transform":"translate3d(0,0,0)"},
    fromRight1:{"zIndex":5,right:"0",top:0,transform:"translate3d(100%,0,0)","-webkit-transform":"translate3d(100%,0,0)"},
    fromRight2:{"zIndex":101,right:"0",top:0,transform:"translate3d(100%,0,0)","-webkit-transform":"translate3d(100%,0,0)"},
    fromRight3:{"zIndex":5,right:0,top:0,transform:"translate3d(0,0,0)","-webkit-transform":"translate3d(0,0,0)"},
    opacity:{left:"0",top:0},
    fromBottom:{"zIndex":101,left:"0",bottom:"0",transform:"translate3d(0,100%,0)","-webkit-transform":"translate3d(0,100%,0)"},
    // fromBottom1:{left:"0",top:0},
  };
  var innerPageInitClass = {
    fromLeft1:"yy-init-left",
    fromLeft2:"yy-init-left",
    fromLeft3:"yy-init-left",
    fromRight1:"yy-init-right",
    fromRight2:"yy-init-right",
    fromRight3:"yy-init-right",
    opacity:"yy-init-left",
    // fromTop:{left:"0",top:0},
    fromBottom:"yy-init-bottom",
    // fromBottom1:{left:"0",top:0},
  };
    function Component(config){
        var _this = this;
        this.refs = {};
        this.dialogsBks = {};
        this.dialogs = {};
        this.componentsInitActions={};
        Component.baseConstructor.call(this,config);

        this.viewpagerParams = config.viewpagerParams;
        config.root = config.root||[];
        this.params = config.$$params;
        this.showPageParams = config.showPageParams||{};
        this.prePageView = config.prePageView;
        this.pageManager = config.$$pageManager;
        this.config = config;
        this.innerPages = {};
        this.innerPagesWrappers = {};
         if(config.pluginClass){
          try{
            this._preparePlugin(config.pluginClass);
          }catch(e){
            console.log(e);
          }
        }
        this.components = {};
        var style = config.style;

        this.$el.addClass("yy-pageview displayflex");
        this.showPageBackCover = $("<div role='showPageBackCover' class='yy-backcover displaynone'></div>");
        this.innerWrapper = $("<div class='displayflex yy-page-inner'></div>");
        this.$$childrenWrapper = this.innerWrapper ;
        this.$el.append(this.innerWrapper).append(this.showPageBackCover);
        if(style){
            this.innerWrapper.css(style);
        }

        this.showPageBackCover.bind("click",function(){
          _this.hideCurShowPage();
        });

        this.initLayout();

    }
    utils.extends(Component,baseClass);

    Component.prototype._preparePlugin = function(controllerClass){
        this.plugin = new controllerClass({"pageview":this});
        var children = this.config.children;
        if(children && children instanceof Array && children.length>0){
            for(var i=0,j=children.length;i<j;i++){
                var pluginClass = children[i].pluginClass;
                if(pluginClass){
                    var pluginPart = new pluginClass();
                    this.plugin  = $.extend(true,this.plugin,pluginPart);
                }
            }
        }
    };

    Component.prototype.regeistPageDestory = function(){
    };
    Component.prototype.destory = function(){

        this.$el.remove();
    };

    Component.prototype.showDialog = function (key,config) {
        var _this = this;

        config =config||{};
        var dialog = this.dialogs[key];
        if(dialog){
            this.dialogs[key].addClass("yy-dialog-show");
            this.dialogsBks[key].removeClass("displaynone");
            window.setTimeout(function(){
                _this.dialogs[key].css({visibility:"visible"});
            },20);
            return;
        }
        var datasource = config.datasource;
        this.getComponentInstanceByComKey(key, datasource, null, function (com_instance) {
            var dialogWrapper = $("<div style='visibility: hidden;' class='yy-dialog-out-wrap displayflex yy-ai-center yy-jc-center'></div>");
            if(config.zIndex){
              dialogWrapper.css({zIndex:config.zIndex+1});
            }
            var dialogInnerWrap = $("<div class='yy-dialog-inner-wrap'></div>");
            _this.dialogs[key] = dialogWrapper;
            dialogInnerWrap.append(com_instance.$el);
            dialogWrapper.append(dialogInnerWrap);
            dialogWrapper.appendTo(document.body);

            var dialogBK = $("<div class='yy-page-dialog-bk'></div>");
            if(config.zIndex){
              dialogBK.css({zIndex:config.zIndex});
            }
            _this.dialogsBks[key]  = dialogBK;
            dialogBK.appendTo(document.body);
            window.setTimeout(function(){
                 dialogWrapper.css({visibility:"visible"});
                dialogWrapper.addClass("yy-dialog-show");
            },20);
        }, function (e) {
        })
    };

    Component.prototype.hideDialog = function (key) {
        // this.dialogs[key].remove();
        var _this = this;
        this.dialogsBks[key].addClass("displaynone");
        this.dialogs[key].removeClass("yy-dialog-show");
        window.setTimeout(function(){
          _this.dialogs[key].css({visibility:"hidden"});
        },200);

        // this.dialogsBks[key].remove();
    };

    Component.prototype.ajax = function(config){
      config.pageviewInstance = this;
      utils.ajax(config);
    };

    Component.prototype.Enter = function(className,isInit){
      var _this = this;
      this.$el[0].className =className;
      if(!isInit){
          this.$el[0].addEventListener("webkitAnimationEnd", function(){
          if(_this.pageManager.getPageNameFromUrl()===_this.config.pageKey){
            var onPageShowMethod = _this.plugin["onPageEnter"];
            onPageShowMethod && onPageShowMethod.call(_this.plugin);
          }
        });
      }else{
         if(_this.pageManager.getPageNameFromUrl()===_this.config.pageKey){
            var onPageShowMethod = _this.plugin["onPageEnter"];
            onPageShowMethod && onPageShowMethod.call(_this.plugin);
          }
      }
    };

    Component.prototype.bindShowPageEnterEvent = function(){
      var _this = this;
      this.$el[0].parentNode.addEventListener("webkitTransitionEnd", function(){
        if(!_this.$$isshow){  return;}
            var onPageShowMethod = _this.plugin["onPageEnter"];
            onPageShowMethod && onPageShowMethod.call(_this.plugin);
      });
    };



    Component.prototype.hideCurShowPage = function(){
      var _this = this;
      this.pageManager.blur();
      if(this.showpageInstance.showpageInstance){
        this.showpageInstance.hideCurShowPage();
        return true;
      }
      if(this.showpage_wrapper){
        var pageCloseMethod =this.showpageInstance.plugin["onPageBeforeLeave"]|| this.showpageInstance.plugin["onPageClose"];
        if(pageCloseMethod){
            var Re = pageCloseMethod.call(this.showpageInstance.plugin);
            if(Re===false){
                return true;
            }
        }
        this.showpageInstance.$$isshow = false;

        var mode = this.showpage_wrapper.attr("data-mode");
        this.showPageBackCover.addClass("displaynone");
        this.innerWrapper[0].className=("displayflex yy-page-inner "+innerPageInitClass[mode]+"-im ");
        window.setTimeout(function(){
          _this.innerWrapper.css(
            utils.processTransitionTanformStyle("none","translate3d(0,0,0)")
          );
        },300);
        if(mode == "fromLeft1"||mode == "fromLeft2"){
          this.showpage_wrapper.css(
            utils.processTransformStyle("translate3d(-100%,0,0)")
          );
        }else if(mode == "fromRight1"||mode == "fromRight2"){
          this.showpage_wrapper.css(
            utils.processTransformStyle("translate3d(100%,0,0)")
          );
        }else{
            var hideStyle = showpageInitStyle[mode]||{};
             if(mode == "fromRight3"||mode == "fromLeft3"){
                 hideStyle.display = "none";
             }
          this.showpage_wrapper.css(hideStyle);
        }
      }

      var onPageResumeMethod = this.showpageInstance.plugin.onPageResume;
      onPageResumeMethod && onPageResumeMethod.call(this.plugin);
      this.showpage_wrapper = null;
      this.showpageInstance = null;
      return false;
    }


    Component.prototype.do = function(com_key,action){
      var com_instance = this.refs[com_key];
      if(com_instance){
        action(com_instance);
      }else{
        if(!this.config.components[com_key].ref){
          console.error("请务必在"+com_key+"控件上设置ref:true");
        }
        this.componentsInitActions[com_key] = action;
      }
    };

    Component.prototype.delegate = function(com_key,action){
      this.do(com_key,action);
    };




    Component.prototype.showLoadingProgressbar = function(){
      var _this = this;
      if(!this.loadingProgreessbar){
        this.loadingProgreessbarWrapper = $("<div class='yy-loading-pbw displaynone'></div>");
        this.loadingProgreessbar =  $("<div class='yy-loading-pb'></div>");
        this.loadingProgreessbarWrapper.append(this.loadingProgreessbar);
        this.loadingProgreessbarWrapper.appendTo(this.$el);
      }
      this.loadingProgreessbarWrapper.removeClass("displaynone");
      window.setTimeout(function(){
        _this.loadingProgreessbar.css({width:"90%"});
      },6);
    }
    Component.prototype.hideLoadingProgressbar = function(){
      if(this.loadingProgreessbar){
        this.loadingProgreessbar.css({width:"0%"});
        this.loadingProgreessbarWrapper.addClass("displaynone");
      }
    };

    Component.prototype.close = function(){
      if(this.ownerPage){
        this.ownerPage.hideCurShowPage();
      }
    };

    Component.prototype.showPage = function(config){
        if(!config||!config.pageKey){
          return;
        }

        /*
          {
          pageKey:"page",
          params:{},
          mode:""
           当前page为 page1 弹出的page page2
          1. fromLeft1 page2从左边滑入 然后page1 也偏移page2的宽度
          2. fromLeft2 page2从左边滑入 page1不动
          3. fromLeft3 page2在page1的底部不动 page1从左边滑动page2的宽度

          4. fromRight1 page2从右边滑入 然后page1 也偏移page2的宽度
          5. fromRight2 page2从右边滑入 然后page1不动
          6. fromRight3 page2在page1的底部不动 page1从右边滑入page2的宽度

          7. fromTop page2 从上边滑入 page1 不动

          8. fromBottom page2从下边滑入page1不动
          9. fromBottom1 page2从下边滑入page1缩小


        }
        */
        this.pageManager.blur();
        if(config.inRouter !== false){
          this.pageManager.regeistShowPageInRouter(this.config.pageKey);
        }

        var _this = this;
        var mode = config.mode || "fromLeft1";

        this.showpage_wrapper = this.innerPagesWrappers[config.pageKey];
        this.showpageInstance = this.innerPages[config.pageKey];
        this.showLoadingProgressbar();
        if(this.showpage_wrapper&&(config.nocache===undefined||!config.nocache)){
          this.hideLoadingProgressbar();
          if(mode==="fromLeft3"||mode==="fromRight3"){
              this.showpage_wrapper.css({display:"block"});
          }
          this._showpageAnimate(config,this.showpage_wrapper,this.showpageInstance);
        }else{
          this.pageview.pageManager.getPageConfigByPageKey(config.pageKey,function(pageConfig){
            var params = config.params||{};
            pageConfig.showPageParams = params;
            var page_instance = _this.pageview.pageManager.createPageView(pageConfig);
            page_instance.$el.addClass("yy-pageview-show");

            page_instance.ownerPage = _this;
            _this.hideLoadingProgressbar();
            _this.showpageInstance = page_instance;
            _this.innerPages[config.pageKey] = page_instance;
            _this.showpage_wrapper = $("<div class='yy-showpage'></div>");
            var wrapperStyle = pageConfig.showPageStyle || {width:"100%",height:"100%"};
            if(wrapperStyle){
              delete wrapperStyle["top"];
              delete wrapperStyle["right"];
              delete wrapperStyle["left"];
              delete wrapperStyle["bottom"];
            }
            _this.showpage_wrapper.attr("data-mode",mode);
            var width = wrapperStyle.width || "100%";
            var height = wrapperStyle.height || "100%";
            wrapperStyle = wrapperStyle||{};

            var initStyle = showpageInitStyle[mode] || showpageInitStyle["fromLeft1"];

            initStyle = utils.clone(initStyle);
            _this.showpage_wrapper.attr("data-width",width);
            _this.showpage_wrapper.attr("data-height",height);
            var showStyle = utils.simpleExtendObj(wrapperStyle,initStyle)||{};
            if(mode==="fromLeft3"||mode==="fromRight3"){
                showStyle.display="block";
            }
            _this.showpage_wrapper.css(showStyle);
            _this.innerPagesWrappers[config.pageKey] = _this.showpage_wrapper;
            _this.showpage_wrapper.append(page_instance.$el);

            _this.$el.append(_this.showpage_wrapper);

            page_instance.bindShowPageEnterEvent();

            _this._showpageAnimate(config,_this.showpage_wrapper,page_instance);




          },function(){

          });
        }

    }

    Component.prototype.goBack = function(){
        this.pageManager.goBack();
    };

    Component.prototype.go = function(pageKey,params){
      params = params||{};
      var beforeGoMethod  =this.pageManager.appConfig.beforeGo;
      if(beforeGoMethod){
        beforeGoMethod({params:params,pageviewInstance:this});
      }
      this.pageManager.go(pageKey,params);
    };

    Component.prototype.replaceGo = function(pageKey,params){
       params = params||{};
      var beforeGoMethod  =this.pageManager.appConfig.beforeGo;
      if(beforeGoMethod){
        beforeGoMethod({params:params,pageviewInstance:this});
      }
        this.pageManager.replaceGo(pageKey,params);
    };
    Component.prototype._showpageAnimate = function(config,showpageWrapper,pageInstance){
      var _this = this;
      var delay = 12;
      pageInstance.$$isshow = true;
      var width = showpageWrapper.attr("data-width");
      var mode = showpageWrapper.attr("data-mode");
      this.innerWrapper[0].className=("displayflex yy-page-inner "+innerPageInitClass[mode]);
      if(mode == "fromLeft1"||mode == "fromLeft2"){
        this.showPageBackCover.removeClass("displaynone").css({
          "left":width,
          "right":0
        });
        window.setTimeout(function(){
          if(mode == "fromLeft1"){
            var aniStyle =  utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d("+width+",0,0)");
            aniStyle["box-shadow"]="0px 0px 13px 1px #929292";
              _this.innerWrapper.css(
                aniStyle
              );
          }
          showpageWrapper.css(
            utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d(0,0,0)")
          );
        },delay);
      }
      if(mode=="fromLeft3"){
        this.showPageBackCover.removeClass("displaynone").css({
          "left":width,
           "right":0
        });
        var aniStyle =  utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d("+width+",0,0)");
        aniStyle["box-shadow"]="0px 0px 13px 1px #929292";
        window.setTimeout(function(){
          _this.innerWrapper.css(
            aniStyle
          );
        },delay);
      }

      if(mode == "fromRight1"||mode == "fromRight2"){

        this.showPageBackCover.removeClass("displaynone").css({
          "right":width,
          "left":0
        });

        window.setTimeout(function(){
          var aniStyle =  utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d(-"+width+",0,0)");
          aniStyle["box-shadow"]="0px 0px 13px 1px #929292";
          if(mode == "fromRight1"){
              _this.innerWrapper.css(
                aniStyle
              );
          }
          showpageWrapper.css(
            utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d(0,0,0)")
          );
        },delay);
      }
      if(mode=="fromRight3"){
        this.showPageBackCover.removeClass("displaynone").css({
          "right":width,
           "left":0
        });
        var aniStyle =  utils.processTransitionTanformStyle("transform .3s cubic-bezier(.05, .69, .14, 1)","translate3d(-"+width+",0,0)");
        aniStyle["box-shadow"]="0px 0px 13px 1px #929292";
        window.setTimeout(function(){
          _this.innerWrapper.css(
            aniStyle
          );
        },delay);
      }

      if(mode == "fromBottom"){
        var height = showpageWrapper.attr("data-height");
        this.showPageBackCover.removeClass("displaynone").css({
          "left":"0","top":"0"
        });
        window.setTimeout(function(){
          showpageWrapper.css(
            utils.processTransitionTanformStyle("transform .2s cubic-bezier(.05, .69, .14, 1)","translate3d(0,0,0)")
          );
        },delay);
      }
    }

    return Component;

});
