/**
 * Created by xiaoz on 16/8/13.
 */

define(["utils", "pageview", "$", "tip"], function(utils, PageView, $, Tip) {


    var isPrevent = false,isReplaceGo = false;

    function PageViewManager() {
        var _this = this;
        this.pages = {};
        this.isForward = true;
        this.isInit = true;
        this.pagekeySeed = 0;
        this.isPrevent = false;
        this.$el = $("<div class='yy-root-view'></div>");
        this.$el.appendTo(document.body);


        window.onhashchange = function() {
            _this.hashChange();
        };
        var touchTarget = null,
            activeClassName = null; //data-activecn
        $(document.body).bind("touchstart", function(e) {
            touchTarget = e.target;
            activeClassName = touchTarget.getAttribute("data-activecn");
            while (touchTarget && !activeClassName && touchTarget.tagName.toUpperCase() != "BODY") {
                touchTarget = touchTarget.parentNode;
                activeClassName = touchTarget.getAttribute("data-activecn");
                if (activeClassName) {
                    break;
                }
            }
            if (touchTarget && activeClassName) {
                $(touchTarget).addClass(activeClassName);
            }
        });
        $(document.body).bind("touchend", function() {
            if (touchTarget && activeClassName) {
                $(touchTarget).removeClass(activeClassName);
            }
            touchTarget = null;
        });


    }

    PageViewManager.prototype = {

        blur: function() {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        },

        showTip: function(config) {
            this.Tip = new Tip(this.$el);
            this.Tip.show(config);
        },

        start: function(config) {
            utils.appConfig = config;
            this.appConfig = config;
            utils.customerComponents = config.customerComponents || {};
            config.baseSize = config.baseSize || {
                "width": 375,
                "height": 667
            };
            utils.baseSize.width = config.baseSize.width;
            utils.baseSize.height = config.baseSize.height;
            this.config = config;
            var toPage = this.getPageNameFromUrl();
            if (!toPage) {
                this.go(config.root, this.getParamsFromUrl());
            } else {
                this.hashChange();
                var pageKeyArr = toPage.split("$$");
                if (pageKeyArr.length == 2) {
                    this.pagekeySeed = parseInt(pageKeyArr[1]);
                }
            }
        },
        showPageKeyDict: {},
        regeistShowPageInRouter: function(pageKey) {
            this.showPageKeyDict[pageKey] = true;
        },
        hashChange: function() {
            var toPage = this.getPageNameFromUrl();
            var fromPageInstance = this.pages[this.fromPage];
            var _this = this;

            if (isPrevent) {
                isPrevent = false;
                // if(this.firstLoadToChangeHash){
                //   if (this.config.routerChange) {
                //        this.config.routerChange({
                //           fromPage: this.fromPage,
                //           toPage: toPage,
                //           isForward: this.isForward,
                //           params: this.getParamsFromUrl()
                //       });
                //   }
                // }
                this.firstLoadToChangeHash = false;

                return;
            }

            if(this.isInit&&toPage === this.appConfig.root){
              this.firstLoadToChangeHash = true;
            }



            if (!this.isForward&&fromPageInstance && this.showPageKeyDict[this.fromPage] === true && fromPageInstance.showpage_wrapper) {
                // 后退的时候 判断是否有 show出的页面  这些页面没有参与路由 需要自己去控制
                var hasMoreShowPage = fromPageInstance.hideCurShowPage();
                if (!hasMoreShowPage) {
                    delete this.showPageKeyDict[this.fromPage];
                    var onResumeMethod = fromPageInstance.plugin.onPageResume;
                    if (onResumeMethod) {
                        onResumeMethod.call(fromPageInstance.plugin, fromPageInstance, {
                            isForward: false
                        });
                    }
                }

                isPrevent = true;
                window.history.go(1);
                return;
            }


            if (fromPageInstance) {
                var beforeleaveMethod = fromPageInstance.plugin.onPageBeforeLeave;
                if (beforeleaveMethod) {
                    var beforeleavePrevent = beforeleaveMethod.call(fromPageInstance.plugin, fromPageInstance, {
                        isForward: this.isForward
                    });
                    if (beforeleavePrevent === false) {
                        isPrevent = true;
                        window.history.go(1);
                        return;
                    }
                }
            }
            // console.log("from : "+this.fromPage+(this.isForward?"前进到":"后退")+toPage);
            if (this.config.routerChange) {
                var routeChangeRe = this.config.routerChange({
                    fromPage: this.fromPage,
                    toPage: toPage,
                    isForward: this.isForward,
                    params: this.getParamsFromUrl()
                });
                if (routeChangeRe === false) {
                    isPrevent = true;
                    window.history.go(1);
                    return;
                }
            }
            var toPageInstance = this.pages[toPage];
            if (fromPageInstance && !toPageInstance) {
                fromPageInstance.showLoadingProgressbar();
            }
            this.blur();
            this._renderNextPage(toPage, this.fromPage, this.isForward, fromPageInstance, function(fromPage, _isForWard, _fromPageInstance) {
                // if(fromPage){
                //     var fromPageInstance = _this.pages[fromPage];
                //     if(fromPageInstance){
                //         var fromClassName ="yy-pageview displayflex "+(_isForWard? "left-out":"right-out");
                //         fromPageInstance.$el[0].className = fromClassName;
                //     }
                // }
                // if(_fromPageInstance){
                //    _fromPageInstance.hideLoadingProgressbar();
                // }
                if (_isForWard) {
                    if(isReplaceGo){
                        isReplaceGo = false;
                         _this.pages[fromPage].destory();
                        delete _this.pages[fromPage];
                    }
                    _this.fromPage = toPage;
                } else {
                    window.setTimeout(function() {
                        if (fromPage&&_this.pages[fromPage]) {
                            _this.pages[fromPage].destory();
                            delete _this.pages[fromPage];
                        }
                        _this.fromPage = toPage;
                    }, 300);
                }
            }, function(_fromPageInstance) {
                isPrevent = true;
                window.history.go(-1);
                if (_fromPageInstance) {
                    _fromPageInstance.hideLoadingProgressbar();
                }
            });


            if(this.firstLoadToChangeHash){

              var p = this.getParamsFromUrl()||{};
              p._r = (new Date().valueOf());
              this.go(this.appConfig.root,p);
              isPrevent = true;
            }




        },
        _renderNextPage: function(pageKey, fromPage, isForward, fromPageInstance, success, error) {
            var _this = this;
            var pageInstance = this.pages[pageKey];

            var fromClassName = "yy-pageview displayflex " + (isForward ? "left-out" : "right-out");
            if (fromPageInstance) {
                fromPageInstance.hideLoadingProgressbar();
            }

            if (!pageInstance) {
                _this.getPageConfigByPageKey(pageKey, function(pageConfig) {
                    pageConfig.prePageView = isForward ? fromPageInstance : null;
                    var pageInstance = _this.createPageView(pageConfig);
                    _this.pages[pageKey] = pageInstance;
                    _this.$el.append(pageInstance.$el);
                    if (_this.isInit) {
                        _this.isForward = false;
                        //yy-pageview-show
                        pageInstance.Enter("yy-pageview displayflex yy-pageview-show", _this.isInit);
                        _this.isInit = false;

                    } else {
                        window.setTimeout(function() {

                            pageInstance.Enter("yy-pageview displayflex " + (_this.isForward ? "right-in" : "left-in"), _this.isInit);
                            if (fromPageInstance) {
                                fromPageInstance.$el[0].className = fromClassName;
                            }


                            _this.isForward = false;
                        }, 40);

                    }

                    success(fromPage, isForward, fromPageInstance);
                }, function(e) {
                    if (error) {
                        error(fromPageInstance);
                    }

                });
            } else {
                if (!this.isForward) {
                    var toClassName = "yy-pageview displayflex left-in";
                    pageInstance.$el[0].className = toClassName;
                    var onResumeMethod = pageInstance.plugin.onPageResume;
                    if (onResumeMethod) {
                        onResumeMethod.call(pageInstance.plugin, pageInstance, {
                            isForward: false
                        });
                    }
                }

                if (fromPageInstance) {
                    fromPageInstance.$el[0].className = fromClassName;
                }

                success(fromPage, isForward, fromPageInstance);
                this.isForward = false;
            }
        },
        createPageView: function(pageConfig) {
            return new PageView(pageConfig);
        },
        getPageNameFromUrl: function() {
            var nameArr = window.location.hash.split("#");
            // if (nameArr.length != 2) {
            //     return this.rootPageKey;
            // }
            var s = nameArr[1];
            if(!s){
              return this.rootPageKey;
            }
            var sArr = s.split("?");
            return sArr[0];
        },
        getParamsStrFromUrl: function() {
            var Arr = window.location.href.split("?");
            var str = Arr[Arr.length - 1];
            if (!str) {
                return null;
            }
            var str_arr = str.split("#");
            return str_arr[0];
        },
        getParamsFromUrl: function() {
            var paraStr = this.getParamsStrFromUrl();
            if (!paraStr) {
                return null;
            }
            var re = {};
            var paramsArr = paraStr.split("&");
            for (var i = 0, j = paramsArr.length; i < j; i++) {
                var key_value_arr = paramsArr[i].split("=");
                if (key_value_arr.length == 2) {
                    re = re || {};
                    re[key_value_arr[0]] = key_value_arr[1];
                } else if (key_value_arr.length > 2) {
                    var pk = key_value_arr.shift();
                    re[pk] = key_value_arr.join("=");
                }
            }
            return re;
        },
        tabSeleced: function(pagename, isInit) {
            if (!isInit) {
                isPrevent = true;
            }
            var params = this.getParamsFromUrl() || {};
            params.$$pn = pagename;
            var paramsArr = [];
            for (var key in params) {
                paramsArr.push(key + "=" + params[key]);
            }
            var pageKey = this.getPageNameFromUrl();
            if (paramsArr.length > 0) {
                location.replace(location.href.split("#")[0] + '#' + pageKey + "?" + paramsArr.join("&"));
            } else {
                location.replace(location.href.split("#")[0] + '#' + pageKey);
            }
        },
        goBack: function() {
            this.isForward = false;
            window.history.go(-1);
        },
        go: function(pageKey, params) {
            this.isForward = true;
            isPrevent = false;
            if (this.isInit) {
                this.rootPageKey = pageKey;

            } else {

            }
            params = params || {};
            var paramsArr = [];
            for (var key in params) {
                paramsArr.push(key + "=" + params[key]);
            }
            pageKey = this._getUniquePageKey(pageKey);
            if (paramsArr.length > 0) {
                location.hash = pageKey + "?" + paramsArr.join("&");
            } else {
                location.hash = pageKey;
            }

        },
        replaceGo: function(pageKey, params) {
            this.isForward = true;
            isPrevent = false;
            if (this.isInit) {
                this.rootPageKey = pageKey;

            } else {

            }
            params = params || {};
            var paramsArr = [];
            for (var key in params) {
                paramsArr.push(key + "=" + params[key]);
            }
            pageKey = this._getUniquePageKey(pageKey);
            isReplaceGo = true;
            if (paramsArr.length > 0) {
                location.replace(location.href.split("#")[0] + '#' + pageKey + "?" +  paramsArr.join("&"));
            } else {
                location.replace(location.href.split("#")[0] + '#' + pageKey);
            }

        },
        _getUniquePageKey: function(pagekey) {
            var hasSameKeyInStack = false;
            for (var key in this.pages) {
                var key_arr = key.split("$$");
                if (key_arr[0] == pagekey) {
                    this.pagekeySeed += 1;
                    hasSameKeyInStack = true;
                    break;
                }
            }
            return hasSameKeyInStack ? (pagekey + "$$" + this.pagekeySeed) : pagekey;
        },
        _getPageConfigSuccess: function(pageKey, pageConfig, success) {
            pageConfig = utils.copy(pageConfig);
            pageConfig.type = "pageview";
            pageConfig.pageKey = pageKey;
            pageConfig.$$params = this.getParamsFromUrl();
            pageConfig.$$pageManager = this;
            success(pageConfig);
        },
        getPageConfigByPageKey: function(pageKey, success, error) {
            var _this = this;
            var page_path = "./pages/" + pageKey.split("$$")[0];
            var _pageConfig = utils.getPageConfigByPagePath(page_path);
            if (_pageConfig) {
                this._getPageConfigSuccess(pageKey, _pageConfig, success);
                return;
            }
            // var randomPath = page_path+".js?t="+(new Date()).valueOf();//避免网络断开请求失败后 无论是否再次联网都失败
            require([page_path], function(pageConfig) {
                pageConfig = utils.setPageConfigByPagePath(page_path, pageConfig);
                _this._getPageConfigSuccess(pageKey, pageConfig, success);
            }, function(e) {
                console.error(e);
                if (error) {
                    error(pageKey);
                }
            });
        }

    };
    return new PageViewManager();
});
