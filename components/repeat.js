define(["utils", "base"], function (utils, baseClass) {
    var RepeatItem = function (config) {
        var _this = this;
        this.datasource = config.$$datasource;

        this.parent = config.$$parent;
        if (config.style) {
            if (!config.style["flexDirection"] && !config.style["flex-direction"]) {
                config.style.flexDirection = "column";
                config.style.webkitFlexDirection = "column";
            }
        }
        if (this.parent.useFloatToWrap) {
            config.style["float"] = "left";
            config.style["display"] = "inline-block";
        }
        RepeatItem.baseConstructor.call(this, config);
        if (!this.parent.rowMarkSeed) {
            this.parent.rowMarkSeed = 0;
        }
        this.parent.rowMarkSeed += 1;

        this.itemMark = "item" + this.parent.rowMarkSeed;
        this.$el.attr("data-role", "repeatitem");

        this.$el.attr("item-mark", this.itemMark);
        var className = this.parent.useFloatToWrap ? "yy-repeatitem" : "displayflex yy-repeatitem";
        this.$el.addClass(className);
        this.$el.bind("click", function () {
            if (_this.parent.status === "edit") {
                return;
            }
            _this.parent._itemClick(_this);
        });
        this.initLayout(config.$$datasource, null, this);
    }

    utils.extends(RepeatItem, baseClass);

    RepeatItem.prototype.select = function () {
        if (this.parent.selectedMode === "m") {
            var index = this.parent.selectedItems.indexOf(this);
            if (index >= 0) {
                this.parent.selectedItems.splice(index, 1);
                this.unSelected();
            } else {
                this.parent.selectedItems.push(this);
                this.selected();
            }
        } else {
            var beforeSelectedRow = this.parent.selectedItems[0];
            beforeSelectedRow && beforeSelectedRow.unSelected();
            this.parent.selectedItems[0] = this;
            this.selected();
        }
    };
    RepeatItem.prototype.delegate = function (com_key, action) {
        var com_instance = this.refs[com_key];
        if (com_instance) {
            action(com_instance);
        } else {
            if (!this.config.components[com_key].ref) {
                console.log("请务必在" + com_key + "控件上设置ref:true");
            }
            this.componentsInitActions[com_key] = action;
        }
    };

    RepeatItem.prototype.showPlaceHolder = function () {
        if (!this.placeHolder) {
            this.placeHolder = $("<div class='yy-repeat-placeholder displaynone'></div>");
            this.$el.append(this.placeHolder);
        }
        this.placeHolder.removeClass("displaynone");
    };

    RepeatItem.prototype.moveTo = function (index) {
        if (index === null || index === undefined) {
            return;
        }
        var thisIndex = this.parent.components.indexOf(this);

        if (thisIndex == index) {
            return;
        }

        var nextItem = this.parent.components[index];
        if (nextItem) {
            this.$el.insertBefore(nextItem.$el);
            this.parent.components.splice(thisIndex, 1);
            this.parent.datasource.splice(thisIndex, 1);
            var realIndex = index;
            if (thisIndex < index) {
                realIndex -= 1;
            }
            this.parent.components.splice(realIndex, 0, this);
            this.parent.datasource.splice(realIndex, 0, this.datasource);
        } else {
            this.parent.components.splice(thisIndex, 1);
            this.parent.datasource.splice(thisIndex, 1);
            this.parent.components.push(this);
            this.parent.datasource.push(this.datasource);
            if (!this.parent.subComponent) {
                this.$el.appendTo(this.parent.$el);
            } else {
                this.$el.insertBefore(this.parent.subComponent.$el);
            }
        }
    };


    RepeatItem.prototype.hidePlaceHolder = function () {
        this.placeHolder.addClass("displaynone");
    };

    RepeatItem.prototype.remove = function (isAnimation) {
        var _this = this;
        var index = this.parent.datasource.indexOf(this.datasource);
        var com_index = this.parent.components.indexOf(this);
        if (index >= 0) {
            this.parent.datasource.splice(index, 1);
        }
        if (com_index >= 0) {
            this.parent.components.splice(com_index, 1);
        }
        if (this.splitLine) {
            this.splitLine.remove();
        }
        if (!isAnimation) {
            _this.$el.remove();
        } else {
            this.$el.css({height: (this.$el.height() + 1) + "px"});
            window.setTimeout(function () {
                _this.$el.css({
                    transition: "height .12s linear",
                    "-webkit-transition": "height .12s linear",
                    "height": "0px"
                });
            }, 40);
            window.setTimeout(function () {
                _this.$el.remove();
            }, 345);
        }

    };

    RepeatItem.prototype.rebind = function (data) {
        this.$el.empty();
        this.datasource = data;
        this.initLayout(data, null, this);
    };

    var Component = function (config) {
        var _this = this;
        this.initSourceLength = 0;
        var style = config.style || {};
        this.useFloatToWrap = !utils.isSupportFlexWrap() && (style["flexWrap"] == "wrap" || style["flex-wrap"] == "wrap");
        this.selectedItems = [];
        this.splitStyle = config.splitStyle;
        if (config.subComponent) {
            config.$$pageview.config.components[config.subComponent].ref = true;
        }
        Component.baseConstructor.call(this, config);
        this.subComponentInBefore = this.config.subComponentInBefore === true;
        this.datasource = [];
        var className = this.useFloatToWrap ? "yy-repeat " : "displayflex yy-repeat ";
        this.$el.addClass(className);
        this.selectedMode = config.selectedMode;
        this.subComponent = null;
        this.init();
        this.hasAttachSortEvent = false;
    }
    utils.extends(Component, baseClass);


    Component.prototype.setLeftOpen = function () {
        if (this.status === "edit") {
            this.setLeftClose();
            this.showOrHideSubComponent(true);
            return;
        }
        this.status = "edit";

        this.showOrHideSubComponent(false);
        this.$el.addClass(this.showBlockClassNameDict["left"]);

    };

    Component.prototype.eachItem = function (callback) {
        for (var i = 0, j = this.components.length; i < j; i++) {
            var re = callback(this.components[i], i);
            if (re === false) {
                break;
            }
        }
    };

    Component.prototype.clearSelectAll = function () {
        var _this = this;
        this.selectedItems = [];
        this.eachItem(function (item) {
            item.unSelected();
        });
    };

    Component.prototype.selectAllItems = function () {
        var _this = this;
        this.selectedItems = [];
        this.eachItem(function (item) {
            item.selected();
            _this.selectedItems.push(item);
        });
    };

    Component.prototype.setLeftRightOpen = function () {
        if (this.status === "edit") {
            this.setLeftRightClose();
            this.showOrHideSubComponent(true);
            return;
        }
        this.status = "edit";

        this.showOrHideSubComponent(false);
        this.$el.addClass((this.showBlockClassNameDict["left"] || "") + " " + (this.showBlockClassNameDict["right"] || ""));
    };

    Component.prototype.setLeftRightClose = function () {
        this.status = "";
        this.$el.removeClass((this.showBlockClassNameDict["left"] || "") + " " + (this.showBlockClassNameDict["right"] || ""));
    };
    Component.prototype.setLeftClose = function () {
        this.status = "";
        this.$el.removeClass(this.showBlockClassNameDict["left"]);
    };

    Component.prototype.setRightOpen = function () {
        if (this.status === "edit") {
            this.setRightClose();
            this.showOrHideSubComponent(true);
            return;
        }
        this.status = "edit";

        this.showOrHideSubComponent(false);
        this.$el.addClass(this.showBlockClassNameDict["right"]);

    };
    Component.prototype.setRightClose = function () {
        this.status = "";
        this.$el.removeClass(this.showBlockClassNameDict["right"]);
    };

    Component.prototype.initLeftRightBlock = function () {
        this.initBlock(this.config.leftBlock, "left");
        this.initBlock(this.config.rightBlock, "right");
    };

    Component.prototype.initBlock = function (blockConfig, leftorRight) {
        if (!blockConfig) {
            return;
        }
        if (!blockConfig.key || !blockConfig.width) {
            console.error("listview 的" + leftorRight + "Block配置需要包括key和widt属性");
        }
        try {
            blockConfig.width = parseInt(blockConfig.width);
        } catch (e) {

        }
        if (isNaN(blockConfig.width)) {
            console.error("listview 的" + leftorRight + "Block的widt属性必须为数值");
        }
        blockConfig.width = utils.getRealWidth(blockConfig.width);
        var key = this.getUniqueKey() + leftorRight;
        this.$el.addClass(key);
        if (!this.showBlockClassNameDict) {
            this.showBlockClassNameDict = {};
        }

        this.showBlockClassNameDict[leftorRight] = key + "_show" + leftorRight;

        utils.createStyleSheet(key, "." + blockConfig.key + " {transition:width .3s ease;-webkit-transition:width .3s ease;} ." + this.showBlockClassNameDict[leftorRight] + " ." + blockConfig.key + " {width:" + blockConfig.width + "px !important;}");

    };

    Component.prototype.init = function () {
        var _this = this;

        var items = this.config.items || [];
        this.initSourceLength = items.length;
        for (var i = 0, j = items.length; i < j; i++) {
            this.addItem(items[i], i, j);
        }

        if (this.config.subComponent) {
            this.getComponentInstanceByComKey(this.config.subComponent, this.datasource, null, function (comInstance) {
                    _this.$el.append(comInstance.$el);
                    _this.subComponent = comInstance;
                },
                function () {});
        }

        if (this.config.nodata) {
            this.getComponentInstanceByComKey(this.config.nodata, null, null, function (comInstance) {
                    _this.$el.append(comInstance.$el);
                    if (_this.components.length > 0) {
                        comInstance.$el.addClass("displaynone");
                    }
                    _this.noDataDom = comInstance;
                },
                function () {});
        }

        this.initLeftRightBlock();
    };


    Component.prototype.showOrHideSubComponent = function (isShow) {
        if (this.config.subComponent) {
            this.pageview.do(this.config.subComponent, function (target) {
                if (isShow) {
                    target.$el.removeClass("displaynone");
                } else {
                    target.$el.addClass("displaynone");
                }
            });
        }
    };

    Component.prototype.empty = function () {
        for (var i = this.components.length - 1; i >= 0; i--) {
            this.components[i].remove();
        }
        this.datasource = [];
        this.components = [];
    };

    Component.prototype.bindData = function (data) {
        var _this = this;
        this.empty();


        if (data && (data instanceof Array) && data.length > 0) {
            if (this.noDataDom) {
                this.noDataDom.$el.addClass("displaynone");
                this.showOrHideSubComponent(true);
            } else {
                this.showOrHideSubComponent(true);
            }
            this.initSourceLength = data.length;
            for (var i = 0, j = data.length; i < j; i++) {
                this.addItem(data[i], i, j);
            }
        } else {
            if (this.noDataDom) {
                this.noDataDom.$el.removeClass("displaynone");
            }
            if (this.config.subComponentAlwaysShow) {
                this.showOrHideSubComponent(true);
            } else {
                this.showOrHideSubComponent(false);
            }
        }
    };


    Component.prototype.getItem = function (callback) {
        for (var i = 0, j = this.components.length; i < j; i++) {
            var item = this.components[i];
            if (callback(item)) {
                return item;
                break;
            }
        }
        return null;
    },

        Component.prototype.insertItem = function (itemData, index) {
            this.noDataDom && this.noDataDom.$el.addClass("displaynone");
            this.addItem(itemData, index);
        };


    Component.prototype.getTargetItem = function (e, isSort) {
        var target = e.target;
        var sortHandler = this.config.sortHandle;
        var hasTouchSortHandler = false;
        var itemMark = target.getAttribute("item-mark");
        if (sortHandler) {
            if (target.getAttribute("data-comname") != sortHandler) {
                itemMark = null;
            } else {
                hasTouchSortHandler = true;
            }
        }
        while (!itemMark && target.tagName.toUpperCase() !== "BODY") {

            target = target.parentNode;
            if (sortHandler) {
                if (target.getAttribute("data-comname") == sortHandler) {
                    hasTouchSortHandler = true;
                }
            }
            itemMark = target.getAttribute("item-mark");

            if (itemMark) {
                if (sortHandler) {
                    if (!hasTouchSortHandler) {
                        itemMark = null;
                    }
                }
                break;
            }
        }
        var Re = null;
        if (itemMark) {
            for (var i = 0, j = this.components.length; i < j; i++) {
                var item = this.components[i];
                if (item.itemMark === itemMark) {
                    Re = item;
                    break;
                }
            }
        }
        return Re;
    }

    Component.prototype.startSort = function () {
        var _this = this, curItem;
        var parent = this.parent;


        var sortEndMethod;
        if (this.pageview.plugin) {
            var sortEndMethodName = this.config.comKey + "_sortend";

            sortEndMethod = this.pageview.plugin[sortEndMethodName];
        }

        this.isInSort = true;
        var targetStartPos = null, touchStartX, touchStartY, diffX, diffY, cloneItem;
        if (!this.hasAttachSortEvent) {
            this.hasAttachSortEvent = true;

            this.$el.bind("touchstart", function (e) {
                curItem = _this.getTargetItem(e, true);
                _this.repeatOffsetY = _this.$el.offset().top;
                diffX = 0;
                diffY = 0;
                if (!curItem || !_this.isInSort) {return;}
                targetStartPos = curItem.$el.position();
                var touches = e.touches[0];
                touchStartX = touches.pageX;
                touchStartY = touches.pageY;

                cloneItem = curItem.$el.clone();
                if (parent) {
                    scrollTop = parent.$el[0].scrollTop;
                }

                cloneItem.css({
                    position: "absolute",
                    zIndex: 50,
                    left: (targetStartPos.left) + "px",
                    top: (targetStartPos.top) + "px"
                });
                curItem.showPlaceHolder();
                _this.$el.append(cloneItem);
            });
            this.$el.bind("touchmove", function (e) {
                if (!curItem || !_this.isInSort) {return;}
                var touches = e.touches[0];
                e.preventDefault();
                e.stopPropagation();
                var curX = touches.pageX;
                var curY = touches.pageY;
                diffX = curX - touchStartX;
                diffY = curY - touchStartY;
                var scrollTop = 0;
                if (parent) {
                    scrollTop = parent.$el[0].scrollTop;
                }
                if (Math.abs(parseInt(curY)) % 3 == 1) {
                    var index = _this.getItemIndexByPosY(curY + scrollTop - (scrollTop + _this.repeatOffsetY));
                    curItem.moveTo(index);
                }
                //left:(targetStartPos.left+diffX)+"px"
                var y = diffY + targetStartPos.top;
                y = y < 0 ? 0 : y;
                cloneItem.css({position: "absolute", zIndex: 50, top: (y) + "px"});
            });
            this.$el.bind("touchend", function (e) {
                if (!curItem || !_this.isInSort) {return;}

                sortEndMethod && sortEndMethod.call(_this.pageview.plugin, this, {});
                curItem.hidePlaceHolder();
                cloneItem.remove();
                cloneItem = null;
            });
        }
    };

    Component.prototype.endSort = function () {
        this.isInSort = false;
    };


    Component.prototype.getItemIndexByPosY = function (y) {
        var sum = 0, re;
        var len = this.components.length;
        for (var i = 0, j = len; i < j; i++) {
            var item = this.components[i];
            var height = item.$el.height();
            if (y > sum && y < sum + height / 2) {
                re = i;
                break;
            }
            if (y >= sum + height / 2 && y < sum + height) {
                re = i + 1;
                break;
            }

            sum += height;
        }
        return re;

    };


    Component.prototype.addItem = function (itemdata, index, initSourceLength) {
        var isInsert = false;
        if (index === undefined || index === null || index < 0 || index >= this.datasource.length) {
            index = this.datasource.length;
            this.datasource.push(itemdata);
        } else {
            this.datasource.splice(index, 0, itemdata);
            isInsert = true;
        }

        var item_instance = new RepeatItem({
            type: "repeatitem",
            root: this.config.root,
            style: this.config.itemStyle,
            $$pageview: this.pageview,
            $$datasource: itemdata,
            $$parent: this,
            index: index,
            selectedClassName: this.config.itemSelectedClassName
        });

        var splitLine;
        if (this.splitStyle) {
            if (this.components.length > 0) {
                splitLine = $("<div></div>");
                item_instance.splitLine = splitLine;
                utils.css(splitLine, this.splitStyle);
            }
        }

        if (isInsert) {
            this.components.splice(index, 0, item_instance);
        } else {
            this.components.push(item_instance);
        }


        if (isInsert) {
            var nextCom = this.components[index + 1];
            if (index !== 0) {
                splitLine && splitLine.insertBefore(nextCom.$el);
            }
            item_instance.$el.insertBefore(nextCom.$el);
            if (index === 0) {
                splitLine && splitLine.insertBefore(nextCom.$el);
            }
        } else {
            if (!this.subComponent) {

                splitLine && this.$el.append(splitLine);
                this.$el.append(item_instance.$el);
            } else {
                if (this.subComponentInBefore) {

                    splitLine && this.$el.append(splitLine);
                    this.$el.append(item_instance.$el);
                } else {
                    splitLine && splitLine.insertBefore(this.subComponent.$el);
                    item_instance.$el.insertBefore(this.subComponent.$el);
                }

            }
        }


    }


    Component.prototype._itemClick = function (itemInstance) {
        var pluginName = this.config.comKey + "_itemclick";
        if (this.pageview.plugin) {
            var method = this.pageview.plugin[pluginName];
            if (itemInstance.disabled) {
                return;
            }
            method && method.call(this.pageview.plugin, itemInstance, {index: itemInstance.$el.index()});
        }
        this.config.$$itemClick && this.config.$$itemClick(itemInstance);
    }

    return Component;
});
