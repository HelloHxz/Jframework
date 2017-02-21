/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils","base"],function(utils,baseClass){

  function gtIOS6() {
    var userAgent = window.navigator.userAgent;
    var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/);
    return ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) >= 6);
}
    function Component(config){
        var _this = this;
        this.isIOS = utils.deviceInfo().isIOS;
        this.hasFixed = false;

        this.isSticky = false;
        var className = "displayflex yy-view";
        if(config.style){
          if(!config.style["alignItems"]&&!config.style["align-items"]){
            // className+= " yy-ai-stretch";
          }
          if(!config.style["justifyContent"]&&!config.style["justify-content"]){
            className+= " yy-jc-flex-start";
          }
          if(!config.style["flexDirection"]&&!config.style["flex-direction"]){
            className+= " yy-fd-column";
          }
        }
        this.LoadMoreWrapper = $("<div style='height:"+utils.getRealHeight(36)+"px' class='yy-loadmore-wrapper displayflex yy-jc-center yy-ai-center flex-h displaynone'></div>");

        Component.baseConstructor.call(this,config);
        this.stickyHeaderIndices = this.config.stickyHeaderIndices;

        _this.isInLoading=false;
        _this.canRefresh = false;

        var pluginPullToRefreshMethodName = this.config.comKey+"_pulltorefresh";

        var pluginCanPullToRefreshMethodName = this.config.comKey+"_canpulltorefresh";
        this.pluginCanPullToRefreshMethod = this.pageview.plugin[pluginCanPullToRefreshMethodName];
        var pluginLoadMoreMethodName = this.config.comKey+"_loadmore";
        this.pluginPullToRefreshMethod = this.pageview.plugin[pluginPullToRefreshMethodName];
        this.pluginLoadMoreMethod = this.pageview.plugin[pluginLoadMoreMethodName];


        var pluginLoadMoreErrorToReload = this.config.comKey+"_reload";
        this.pluginLoadMoreErrorToReloadMethod = this.pageview.plugin[pluginLoadMoreErrorToReload];

        if(this.pluginPullToRefreshMethod){

          this.innerWrapper = $("<div class='yy-view-innerwrapper yy-fd-column"+className+"'></div>");
          this.$el.css({zIndex:1});
          this.$$childrenWrapper = this.innerWrapper;
          this._initLoadFirstErrorDom();
          this._initPullToRefreshDom();
          this.$el.append(this.innerWrapper);

        }

          this._initTouchEvent();


        this.LoadMoreOffsetBottom = utils.getRealHeight(120);


        this.$el.addClass(className);
        config.root = config.root || [];


        this.initLayout(config.$$datasource,null,this.rowInstance,function(){
          _this.childInitOver();
        });


    }
    utils.extends(Component,baseClass);
    Component.prototype.scrollTop = function(val){
      if(val){
        this.$el.scrollTop(val);
      }else{
        return this.$el.scrollTop();
      }
    };

    Component.prototype.hideLoadMore = function () {
      this.LoadMoreWrapper&&this.LoadMoreWrapper.addClass("displaynone");
    };
    Component.prototype.showLoadMore = function () {
      this.LoadMoreWrapper&&this.LoadMoreWrapper.removeClass("displaynone");
    };
    Component.prototype._initPullToRefreshDom = function(){
      var height = utils.getRealHeight(40);
      var fontSize =  utils.getRealWidth(11);
      var iconSize =  utils.getRealWidth(15);
      this.pullLimitHeight = utils.getRealHeight(40);
      this.pullToRefreshWrapper = $("<div style='height:"+height+"px;margin-top:-"+height+"px' class='yy-pull-wrapper'></div>");
      this.pullMessWrapper = $("<div style='height:"+this.pullLimitHeight+"px' class='displayflex yy-jc-center yy-ai-center flex-h yy-pull-mes-wrapper'></div>");
      this.pullArrowIcon =  $("<i style='font-size:"+iconSize+"px' class='yy-pull-arrow'></i>");
      this.pullMesLabel =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>下拉刷新</span>");
      var pullLoadingIcon = $("<div class='preloader yy-pull-loadingicon'></div>");
      this.pullMessWrapper.append(pullLoadingIcon).append(this.pullArrowIcon).append(this.pullMesLabel).appendTo(this.pullToRefreshWrapper);
      this.innerWrapper.append(this.pullToRefreshWrapper);
    }

    Component.prototype._initLoadMoreDom = function(){
      var height = utils.getRealHeight(36);
      var fontSize =  utils.getRealWidth(11);
      var loadMoreIcon = $("<div class='preloader yy-loadmore-loadingicon'></div>");
      this.loadMoreLabel =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>正在加载</span>");
      this.LoadMoreWrapper.append(loadMoreIcon).append(this.loadMoreLabel );
      this.$el.append(this.LoadMoreWrapper);
    }

    Component.prototype._initLoadMoreErrorDom = function(){
      var _this = this;
      var height = utils.getRealHeight(42);
      var fontSize =  utils.getRealWidth(11);
      var iconSize =  utils.getRealWidth(15);
      this.LoadMoreErrorWrapper = $("<div style='height:"+height+"px' class='yy-loadmore-wrapper displayflex yy-jc-center yy-ai-center flex-h displaynone'></div>");
      var loadMoreerrorIcon = $("<i style='font-size:"+iconSize+"px' class='yy-icommon yy-loadmore-erroricon'></i>");
      this.loadErrorLabel =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>网络异常,点击</span>");
      var reloadLabel = $("<span style='font-size:"+fontSize+"px' class='yy-loadmore-reload-babel'>重新加载</span>");
      reloadLabel.bind("click",function(){
        _this.pluginLoadMoreErrorToReloadMethod &&_this.pluginLoadMoreErrorToReloadMethod.call(_this.pageview.plugin,_this,{});
      });
      this.LoadMoreErrorWrapper.append(loadMoreerrorIcon).append(this.loadErrorLabel).append(reloadLabel);
      this.$el.append(this.LoadMoreErrorWrapper);
    }

    Component.prototype._initLoadFirstErrorDom = function(){
      var _this = this;
      var height = utils.getRealHeight(36);
      var fontSize =  utils.getRealWidth(11);
      var iconSize =  utils.getRealWidth(15);
      this.LoadFirstErrorWrapper = $("<div data-mark='loadfirsterror' style='height:"+height+"px' class='yy-loadfirsterror-wrapper displayflex yy-jc-center yy-ai-center flex-h displaynone'></div>");
      var loadFirsterrorIcon = $("<i style='font-size:"+iconSize+"px' class='yy-icommon yy-loadmore-erroricon'></i>");
      this.loadFirstErrorLabel =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>网络异常,尝试再次下拉刷新</span>");
      this.LoadFirstErrorWrapper.append(loadFirsterrorIcon).append(this.loadFirstErrorLabel);
      this.$el.append(this.LoadFirstErrorWrapper);
    }

    Component.prototype._initTouchEvent=function(){
      var _this = this;

      if(this.pluginPullToRefreshMethod){
        var startY = 0,startScrollTop;;
        this.$el.bind("touchstart",function(e){
          if(_this.config.onlyForSticky===true){
            return;
          }
          if(_this.isInLoading){return;}
          _this.isInLoading = false;
          _this.canRefresh = false;
          var touch = e.touches[0];
          startY = touch.pageY;
          startScrollTop = _this.$el.scrollTop();
        });

        this.$el.bind("touchmove",function(e){
          if(_this.config.onlyForSticky===true){
            return;
          }
          if(_this.isInLoading){return;}
          var touch = e.touches[0];
          var curY = touch.pageY;
          var diff = curY-startY;

          if(diff>0){
            if(_this.pluginCanPullToRefreshMethod){
              var Re = _this.pluginCanPullToRefreshMethod.call(_this.pageview.plugin,_this);
              if(Re!==true){
                return;
              }
            }
            var scrollTop = _this.$el.scrollTop();
            if(scrollTop <=0){
              _this.$el.css({"overflow":"hidden"});
              e.preventDefault();
              e.stopPropagation();
              var pullOffsetY = diff-startScrollTop;
              if(pullOffsetY>_this.pullLimitHeight*4){
                _this.pullMesLabel.html("释放更新");
                _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-release-refresh";
                _this.canRefresh = true;
              }else{
                _this.pullMesLabel.html("下拉刷新");
                _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-push-refresh";
                _this.canRefresh = false;
              }
              _this.innerWrapper.css(
                utils.processTransitionTanformStyle("none","translate3d(0,"+(pullOffsetY/3)+"px,0)")
              );

            }
          }

        });

        this.$el.bind("touchend",function(e){
          if(_this.config.onlyForSticky===true){
              _this.resetPullLoadState();
              return;
          }
          if(_this.config.noScroll===true){

          }else{
            _this.$el.css({"overflow-y":"auto"});
          }

          if(_this.isInLoading){return;}
          if(_this.canRefresh){
            _this.setPullLoadingState();
            _this.pluginPullToRefreshMethod && _this.pluginPullToRefreshMethod.call(_this.pageview.plugin,_this,{});
          }else{
            _this.resetPullLoadState();
          }
        });

      }

    }
    Component.prototype.refreshStickyHeaderIndices = function(){
      var _this = this;
      if(this.stickyHeaderIndicesComponent ){
        window.setTimeout(function(){
          _this.navOffsetY = _this.stickyHeaderIndicesComponent.$el[0].offsetTop;
        },150);
      }
    };
    Component.prototype.childInitOver = function(){
      var _this = this;
      var stickyHeaderIndicesComponent;
      if(this.stickyHeaderIndices){
        stickyHeaderIndicesComponent = this.components[this.stickyHeaderIndices];
        this.stickyHeaderIndicesComponent = stickyHeaderIndicesComponent;

        this.stickyHeaderIndicesIndex = stickyHeaderIndicesComponent.$el.index();
      }

      if(this.pluginLoadMoreMethod){
        this._initLoadMoreDom();
        this._initLoadMoreErrorDom();
        this.scrollTimeId = null;
      }
        if(stickyHeaderIndicesComponent!=null&&!this.pluginLoadMoreMethod){
          this.stickyComHeight = stickyHeaderIndicesComponent.$el.height();
           this.isSupportSticky = gtIOS6();
          if(!this.isSupportSticky){
            _this.toFixedComponent(stickyHeaderIndicesComponent);

          }else{
            stickyHeaderIndicesComponent.$el.addClass('sticky');
          }
          this.$el.bind("scroll",function(e){
              if(!this.isSupportSticky){
                _this.toFixedComponent(stickyHeaderIndicesComponent);
            }
          });
        }else if(this.pluginLoadMoreMethod&&stickyHeaderIndicesComponent){

          this.stickyComHeight = stickyHeaderIndicesComponent.$el.height();
          this.isSupportSticky = gtIOS6();
          if(!this.isSupportSticky){
            _this.toFixedComponent(stickyHeaderIndicesComponent);

          }else{
            stickyHeaderIndicesComponent.$el.addClass('sticky');
          }
            this.$el.bind("scroll",function(e){
              _this.triggerLoadMore();
              if(!_this.isSupportSticky){
                _this.toFixedComponent(stickyHeaderIndicesComponent);

              }
            });
        }else if(this.pluginLoadMoreMethod){

            this.$el.bind("scroll",function(e){
                _this.triggerLoadMore();
            });
        }


    };
    Component.prototype.toFixedComponent = function(com){
        if(!this.clientRect){
          this.clientRect = this.$el[0].getBoundingClientRect();
        }

        if(!this.hasFixed){
            this.navOffsetY  = com.$el[0].offsetTop;
        }


        if(this.$el.scrollTop() > this.navOffsetY+20){
            this.hasFixed = true;
          com.$el.addClass('fixed') ;
        }else{
          com.$el.removeClass('fixed');
        }
        // if(this.$el.scrollTop() > this.navOffsetY){
        //   if(this.isSticky===false){
        //     this.$el.css({paddingTop:this.stickyComHeight+"px"});
        //     this.isSticky = true;
        //     com.$el.addClass("sticky");
        //     com.$el.appendTo(this.pageview.$el);
        //   }
        // }else{
        //   if(this.isSticky===true){
        //     this.$el.css({paddingTop:0+"px"});
        //     com.$el.removeClass("sticky");
        //     var oEle = this.$el.children()[this.stickyHeaderIndicesIndex];
        //     if(oEle){
        //       com.$el.insertBefore($(oEle));
        //     }else{
        //       this.$el.append(oEle);
        //     }
        //     this.isSticky = false;
        //   }
        // }
    };
    Component.prototype.triggerLoadMore = function(e){
      var _this = this;
        if(_this.scrollTimeId){window.clearTimeout(_this.scrollTimeId)}
      _this.scrollTimeId = window.setTimeout(function(){
        _this._onScroll(e);
      },80);

    };
    Component.prototype.setPullLoadingState = function(){
      var _this = this;

      if(!_this.pullMesLabel){return;}
      _this.isInLoading = true;
      _this.LoadMoreErrorWrapper&&_this.LoadMoreErrorWrapper.addClass("displaynone");
      _this.LoadFirstErrorWrapper.addClass("displaynone");
      this.loadErrorWrapWhenNoPullRefrsh&&this.loadErrorWrapWhenNoPullRefrsh.addClass("displaynone");
      _this.pullMesLabel.html("正在加载");
      _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-push-refreshing";
      _this.innerWrapper.css(
        utils.processTransitionTanformStyle("transform .2s ease","translate3d(0,"+_this.pullLimitHeight+"px,0)")
      );


    }
    Component.prototype.resetPullLoadState = function(){
      var _this = this;
      if(!_this.pullMesLabel){return;}
      _this.isInLoading = false;
      _this.canRefresh = false;
      // _this.LoadFirstErrorWrapper.addClass("displaynone");
      _this.pullMesLabel.html("下拉刷新");
      _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-push-refresh";
      _this.innerWrapper.css(
        utils.processTransitionTanformStyle("transform .3s ease","translate3d(0,0,0)")
      );

    }

    Component.prototype.setLoadFirstError = function(){
      var _this = this;
      if(this.LoadFirstErrorWrapper){
        this.LoadFirstErrorWrapper.removeClass("displaynone");
      }else{
        if(!this.loadErrorWrapWhenNoPullRefrsh){
          var height = utils.getRealHeight(42);
          var fontSize =  utils.getRealWidth(11);
          var iconSize =  utils.getRealWidth(15);
          this.loadErrorWrapWhenNoPullRefrsh = $("<div style='height:"+height+"px' class='yy-loadmore-wrapper displayflex yy-jc-center yy-ai-center flex-h displaynone'></div>");
          var loadMoreerrorIcon = $("<i style='font-size:"+iconSize+"px' class='yy-icommon yy-loadmore-erroricon'></i>");
          this.loadErrorLabelWhenNoPullRefrsh =  $("<span style='font-size:"+fontSize+"px' class='yy-pull-meslabel'>网络异常,点击</span>");
          var reloadLabel = $("<span style='font-size:"+fontSize+"px' class='yy-loadmore-reload-babel'>重新加载</span>");
          reloadLabel.bind("click",function(){
            _this.pluginLoadMoreErrorToReloadMethod &&_this.pluginLoadMoreErrorToReloadMethod.call(_this.pageview.plugin,_this,{});
          });
          this.loadErrorWrapWhenNoPullRefrsh.append(loadMoreerrorIcon).append(this.loadErrorLabelWhenNoPullRefrsh).append(reloadLabel);
          this.$el.append(this.loadErrorWrapWhenNoPullRefrsh);
        }
        this.loadErrorWrapWhenNoPullRefrsh.removeClass("displaynone");

      }
      this.resetPullLoadState();
    }

    Component.prototype.setCanLoadMore = function(arg){
      if(!this.loadMoreLabel){
        return;
      }
      if(arg&&arg.isReload){
        this.canLoadMore = false;
      }else{
        this.canLoadMore = true;
      }
      this.loadMoreLabel.html("正在加载");
      this.LoadMoreErrorWrapper.addClass("displaynone");
      this.LoadFirstErrorWrapper&&this.LoadFirstErrorWrapper.addClass("displaynone");
      this.loadErrorWrapWhenNoPullRefrsh&&this.loadErrorWrapWhenNoPullRefrsh.addClass("displaynone");
      this.LoadMoreWrapper.removeClass("displaynone yy-loaddone");
    }

    Component.prototype.setHasLoadDone = function(){
      if(!this.loadMoreLabel){
        return;
      }
      this.canLoadMore = false;
      this.loadMoreLabel.html("已显示所有数据");
      this.LoadFirstErrorWrapper&&this.LoadFirstErrorWrapper.addClass("displaynone");

      this.loadErrorWrapWhenNoPullRefrsh&&this.loadErrorWrapWhenNoPullRefrsh.addClass("displaynone");
      this.LoadMoreErrorWrapper.addClass("displaynone");
      this.LoadMoreWrapper.addClass("yy-loaddone").removeClass("displaynone");
    };
    Component.prototype.setHasLoadDone1 = function(){
      var _this = this;
      _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper";
    };

    Component.prototype.setInitLoadMessage = function(){
      if(!this.loadMoreLabel){
        return;
      }
      this.LoadFirstErrorWrapper&&this.LoadFirstErrorWrapper.addClass("displaynone");

      this.loadErrorWrapWhenNoPullRefrsh&&this.loadErrorWrapWhenNoPullRefrsh.addClass("displaynone");
      this.LoadMoreErrorWrapper.addClass("displaynone");
      this.LoadMoreWrapper.addClass("yy-loaddone displaynone");
    };

    Component.prototype.setLoadMoreErrorState = function(){
      this.canLoadMore = false;

      this.resetPullLoadState();
      this.LoadMoreWrapper.addClass("displaynone");
      this.LoadMoreErrorWrapper.removeClass("displaynone");
      this.scrollToBottom();
    }

    Component.prototype.scrollToBottom = function(){
      this.$el.scrollTop(this.$el[0].scrollHeight);
    }




    Component.prototype._onScroll = function(e){
      if(!this.canLoadMore){
        return;
      }
      if(this.$el[0].offsetHeight+this.$el.scrollTop()+this.LoadMoreOffsetBottom>=this.$el[0].scrollHeight){
        this.canLoadMore = false;
        this.pluginLoadMoreMethod.call(this.pageview.plugin,this,{});
      }
    }

    return Component;
});
/**
 * Created by xiaoz on 16/8/13.
 */
