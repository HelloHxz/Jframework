/**
 * Created by xiaoz on 16/8/13.
 */
define(["utils", "tip"], function (utils, Tip) {


    var Component = function (config) {
        var _this = this;
        this.pageview = config.$$pageview || this;
        this.loaderHtml = "<div class='spinner center'>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "<div class='spinner-blade'></div>" +
            "</div>";

        this.disabled = false;

        this.parent = config.$$parent;
        this.datasource = config.$$datasource || [];
        this.rowInstance = config.$$rowInstance;
        if (config.ref) {
            if (this.rowInstance) {
                this.rowInstance.refs = this.rowInstance.refs || {};
                this.rowInstance.refs[config.comKey] = this;
            } else {
                this.pageview.refs[config.comKey] = this;
            }
        }
        var className = config.className || "";
        this.selectedClassName = config.selectedClassName;
        config.tagName = config.tagName || "DIV";
        var activeClassName = config.activeClassName ? "data-activecn='" + config.activeClassName + "'" : "";
        this.$el = $("<" + config.tagName + " " + activeClassName + " data-comname='" + config.comKey + "' class='" + className + "'></" + config.tagName + ">");
        config = this._processConfig(config);
        this.config = config;
        this.components = {};
        if (config.type == "repeat" || config.type == "listview") {
            this.components = [];
        }

        if (config.comKey) {
            this.$el.addClass(config.comKey);
        }

        var pluginName = this.config.comKey + "_init";
        if (config.type === "repeatitem") {
            pluginName = this.parent.config.comKey + "_iteminit";
        } else if (config.type === "listrow") {
            pluginName = this.parent.config.comKey + "_rowinit";
        }


        if (this.config.type === "pageview") {
            // 实现拆分JSON的功能
            var children = this.config.children;
            if (children && children instanceof Array) {
                for (var i = 0, j = children.length; i < j; i++) {
                    var childConfig = children[i].components;
                    if (childConfig) {
                        for (var key in childConfig) {
                            var com_config = utils.copy(childConfig[key]);

                            for (var attrKey in com_config) {
                                if (attrKey.length >= 5) {
                                    if (attrKey.substring(attrKey.length - 5).toUpperCase() == "STYLE") {
                                        com_config[attrKey] = this.processStyle(com_config[attrKey], BaseSize);
                                    }
                                }
                            }

                            this.config.components[key] = com_config;

                        }
                    }
                }
            }
        }


        if (this.pageview.plugin && this.pageview.plugin[pluginName]) {
            var method = this.pageview.plugin[pluginName];

            if (method) {

                method.call(this.pageview.plugin, this);
            }
        }

        var style = config.style;
        if (!config.noNeedSetStyle) {
            if (style && config.type != "pageview" && config.type != "segment") {
                utils.css(this.$el, style);
            }
        }
        this.disabledClassName = config.disabledClassName || "yy-disabled";
        if (this.disabled) {
            this.setDisabled(true);
        }

        if (config.comKey) {
            var method_name = config.comKey + "_click";
            var method_click = _this.pageview.plugin[method_name];
            if (method_click) {
                this.$el.bind("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    !_this.disabled && method_click && method_click.call(_this.pageview.plugin, _this, {e: e});
                });
            }

            var tap_name = config.comKey + "_tap";
            var method_tap = _this.pageview.plugin[tap_name];
            if (method_tap) {
                this.$el.bind("singleTap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    !_this.disabled && method_tap && method_tap.call(_this.pageview.plugin, _this, {e: e});
                });
            }
        }


    };

    Component.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
        if (this.disabled) {
            this.$el.addClass(this.disabledClassName);
        } else {
            this.$el.removeClass(this.disabledClassName);
        }
    };

    Component.prototype._processConfig = function (config) {
        for (var key in config) {
            var key_arr = key.split("_");
            if (key_arr.length == 2 && key_arr[1] == "bind") {
                var value = config[key];
                var attrName = key_arr[0];
                var val_type = typeof(value);
                if (val_type == "string") {
                    config[attrName] = getValueByPath(this.datasource, value.split("."));
                } else if (val_type == "object") {
                    for (var key1 in value) {
                        var attrName1 = key1;
                        var bind_val = getValueByPath(this.datasource, value[key1].split("."));
                        // if(bind_val){
                        config[attrName] = config[attrName] || {};
                        config[attrName][attrName1] = bind_val;
                        // }
                    }
                }
            }
        }
        return config;
    };

    function getValueByPath(data, path) {
        if (!data) {return null;}
        var r = data;
        for (var i = 0, j = path.length; i < j; i++) {
            var pathkey = path[i];
            r = r[pathkey];
            if (!r && r != 0) {
                r = null;
                break;
            }
        }
        return r;
    }


    Component.prototype.selected = function (isFromParent) {

        if (isFromParent) {
            if (this.config.disableParentSelect) {
                return;
            }
        }
        this.isSelected = true;
        if (this.selectedClassName && this.selectedClassName !== "") {
            this.$el.addClass(this.selectedClassName);
        }

        for (var key in this.components) {
            this.components[key].selected(true);
        }
    };


    Component.prototype.unSelected = function (isFromParent) {
        if (isFromParent) {
            if (this.config.disableParentSelect) {
                return;
            }
        }
        this.isSelected = false;
        if (this.selectedClassName && this.selectedClassName !== "") {
            this.$el.removeClass(this.selectedClassName);
        }

        for (var key in this.components) {
            this.components[key].unSelected(true);
        }
    };

    Component.prototype.getUniqueKey = function () {
        return this.pageview.config.pageKey + "" + this.config.comKey;
    };


    /*
     {
     text:"", null或者为“”的时候不显示text
     icon:"icomoon_e905", null 的时候不显示
     iconStyle:{},
     textStyle:{},
     hideTime:2000, ms
     backCover:{

     },//null 的时候不显示遮罩
     }

     */
    Component.prototype.showTip = function (config) {
        this.Tip = new Tip(this.$el);
        this.Tip.show(config);
    };

    Component.prototype._prepareComponent = function (com_key, datasource, rowInstance) {
        var com_config = utils.clone(this.pageview.config.components[com_key]);
        var com_type = com_config.type;
        var com_class = utils.getComponentInstance(com_type);
        com_config.$$pageview = this.pageview;
        com_config.$$rowInstance = rowInstance;
        com_config.$$parent = this;
        com_config.comKey = com_key;
        com_config.$$datasource = datasource;
        var com_instance = null;
        try {
            com_instance = new com_class(com_config, null);
        } catch (e) {
            console.log(e);
            console.log(com_config);
        }
        var pluginName = com_key + "_didmount";
        if (this.pageview.plugin) {
            var method = this.pageview.plugin[pluginName];
            if (method) {
                method.call(this.pageview.plugin, com_instance);
            }
        }
        if (this.pageview.componentsInitActions[com_key]) {
            this.pageview.componentsInitActions[com_key](com_instance);
            delete this.pageview.componentsInitActions[com_key];
        }
        return com_instance;
    };

    Component.prototype._initComponents = function (config, datasource, customInitLayout, rowInstance) {
        for (var i = 0, j = config.root.length; i < j; i++) {
            var com_key = config.root[i];
            var com_instance = this._prepareComponent(com_key, datasource, rowInstance);
            if (config.isContainer || config.type == "repeat") {
                this.components.push = com_instance;
                customInitLayout(com_instance);
            } else if (config.type == "tabbarview") {
                this.components[com_key] = com_instance;
                customInitLayout(com_instance);
            } else {
                this.components[com_key] = com_instance;
            }
        }

        return this.components;
    };

    Component.prototype.getClientRect = function () {
        return this.$el[0].getBoundingClientRect();
    };


    Component.prototype.getComponentInstanceByComKey = function (com_key, datasource, rowInstance, success, error) {
        var _this = this;
        this.loadFiles([com_key], this.pageview || this, function () {
            var com_instance = _this._prepareComponent(com_key, datasource, rowInstance);
            success(com_instance);
        }, function () {
            if (error) {error();}
        });
    };

    Component.prototype.initLayout = function (datasource, customInitLayout, rowInstance, initSuccess) {
        var _this = this;
        if (this.config.root && this.config.root.length > 0) {
            this.loadFiles(this.config.root, this.pageview || this, function () {
                if (customInitLayout) {
                    _this._initComponents(_this.config, datasource, customInitLayout, rowInstance);
                } else {
                    _this._initComponents(_this.config, datasource, null, rowInstance);
                    for (var i = 0, j = _this.config.root.length; i < j; i++) {
                        var com_instance = _this.components[_this.config.root[i]];
                        var root = _this.$$childrenWrapper || _this.$el;
                        if (com_instance === null) {
                            console.log(_this.config.root[i]);
                            console.log(_this.config.root);
                            console.log(_this.components);
                        }

                        if (com_instance.config.type === "checklist" || com_instance.config.type === "radiolist") {
                            _this.pageview.$el.append(com_instance.$el);
                        } else {
                            root.append(com_instance.$el);
                        }

                        var splitLine;
                        if (_this.config.splitStyle) {
                            if (_this.config.root.length > 1 && i != _this.config.root.length - 1) {
                                splitLine = $("<div></div>");
                                com_instance.splitLine = splitLine;
                                utils.css(splitLine, _this.config.splitStyle, true);
                                root.append(splitLine);
                            }
                        }
                    }
                }

                initSuccess && initSuccess();

                if (_this.config.type == "pageview") {
                    var pageload = _this.plugin.onPageLoad;
                    pageload && pageload.call(_this.plugin, _this);
                }

            }, function () {

            });
        }

    };

    Component.prototype.setBadge = function (text, style) {
        if (!this.$$badge) {
            this.$$badge = $("<div class='displayflex jc-center ai-center yy-badge displaynone'></div>");
            style = style || {};
            var height = style.width || style.height || 16;
            style["min-width"] = style.height = height;
            delete style["width"];
            style = utils.processStyle(style);
            style["border-radius"] = parseInt(style.height) / 2 + "px";
            utils.css(this.$$badge, style);
            this.$el.append(this.$$badge);
        }
        if (!text) {
            this.$$badge.addClass("displaynone");
        } else {
            this.$$badge.html(text).removeClass("displaynone");
        }
    };

    Component.prototype.showLoading = function (config) {
        var _this = this;
        config = config || {};
        this.loadingConfig = config;
        if (!this.$$loadingWrapper) {
            if (!config.timeout || isNaN(config.timeout)) {
                config.timeout = 7000;
            }
            this.loadingtimeout = parseInt(config.timeout) || 7000;
            var className = "displaynone yy-loading-bk displayflex yy-jc-center yy-ai-center ";
            if (config.style) {
                if (!(config.style.alignItems || config.style["align-items"])) {
                    className += "yy-ai-center";
                }
            }
            this.$$loadingWrapper = $("<div class='" + className + "'></div>");
            if (config.style) {
                utils.css(this.$$loadingWrapper, config.style);
            }

            var wrapper = $("<div class='yy-loading-wrapper yy-fd-column displayflex yy-jc-center yy-ai-center'>" + this.loaderHtml + "</div>");

            this.loadingText = $("<span class='yy-loading-text'></span>");
            wrapper.append(this.loadingText);
            this.$$loadingWrapper.append(wrapper);
            this.$el.append(this.$$loadingWrapper);
        }

        this.loadingText.html(config.text || "正在努力加载");

        this.startLoadingTimeout(config);

        this.$$loadingWrapper.removeClass("displaynone");
    };

    Component.prototype.showLoadingError = function () {
        var _this = this;
        if (this.$$loadingWrapper) {

            if (this.loadingTimeId) {
                window.clearTimeout(this.loadingTimeId);
            }
            if (!_this.loadingConfig.reLoadCallBack) {
                // _this.pageview.showTip({
                //   text:"操作超时!",
                //   duration:1000
                // });
                _this.hideLoading(true);
                return;
            }

            if (!_this.loadingErrorWrapper) {
                _this.loadingErrorWrapper = _this._createErrorDom(function () {
                    _this.$$loadingWrapper.removeClass("yy-loading-wrapper-error");
                    _this.loadingErrorWrapper.addClass("displaynone");
                    _this.loadingTimeId = null;
                    _this.startLoadingTimeout(_this.loadingConfig);
                    _this.loadingConfig.reLoadCallBack && _this.loadingConfig.reLoadCallBack();
                });
                _this.loadingErrorWrapper.appendTo(_this.$$loadingWrapper);
            }
            _this.$$loadingWrapper.addClass("yy-loading-wrapper-error");
            _this.loadingErrorWrapper.removeClass("displaynone");
        }
    };

    Component.prototype.startLoadingTimeout = function (config) {
        var _this = this;
        if (!this.loadingTimeId) {
            this.loadingTimeId = window.setTimeout(function () {

                // TODO 后台接口不稳定，暂时屏蔽出错页面
                // _this.showLoadingError();

                _this.hideLoading();
            }, this.loadingtimeout);
        }
    };

    Component.prototype._createErrorDom = function (callback) {
        var _this = this;
        var fontSize = utils.getRealWidth(11);
        var iconSize = utils.getRealWidth(20);
        var loadErrorWrapper = $("<div style='height:100px' class='yy-loadmore-wrapper displayflex jc-center ai-center flex-h displaynone'></div>");
        var loadErrorIcon = $("<i style='font-size:" + iconSize + "px' class='yy-icommon yy-loadmore-erroricon'></i>");
        var loadErrorLabel = $("<span style='font-size:" + fontSize + "px' class='yy-pull-meslabel'>网络异常,点击</span>");
        var reloadLabel = $("<span style='font-size:" + fontSize + "px' class='yy-loadmore-reload-babel'>重新加载</span>");
        reloadLabel.bind("click", function () {
            callback();
        });
        loadErrorWrapper.append(loadErrorIcon).append(loadErrorLabel).append(reloadLabel);
        return loadErrorWrapper;
    },

        Component.prototype.hideLoading = function (isSuccess) {

            if (isSuccess === false) {
                this.showLoadingError();
                return;
            }
            if (this.loadingTimeId) {
                window.clearTimeout(this.loadingTimeId);
                this.loadingTimeId = null;
            }
            this.$$loadingWrapper && this.$$loadingWrapper.addClass("displaynone");
        };

    Component.prototype.loadFiles = function (comkey_arr, pageviewInstance, success, error) {
        var fileCount = comkey_arr.length, successCount = 0;
        var _this = this;
        for (var i = 0; i < fileCount; i++) {
            (function (_fileCount, index, com_name) {
                var com_config = pageviewInstance.config.components[com_name];
                utils.getComponentClass(com_config, function (comClass) {
                    successCount += 1;
                    if (successCount == _fileCount) {
                        success();
                    }

                }, function () {
                    error();
                });
            })(fileCount, i, comkey_arr[i]);
        }
    };
    return Component;
});
