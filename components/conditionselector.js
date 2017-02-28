define(["utils", "base"], function (utils, baseClass) {

    var BarItem = function (config) {
        var _this = this;
        this.rootInstance = config.parent;
        this.index = config.index;
        this.item = config.item;
        this.$el = $("<div class='displayflex yy-cs-item'></div>");
        this.titleDom = $("<span style='font-size:" + this.rootInstance.itemFontSize + "'>" + this.item + "</span>");
        this.itemDom = $("<div></div>");
        if (this.rootInstance.config.mode === 1) {
            this.itemDom.append(this.titleDom).append("<i></i>");
            this.itemDom.addClass("yy-conditionselector-approve");
            this.$el.append(this.itemDom);
        } else {
            this.$el.append(this.titleDom).append("<i></i>");
        }

        this.$el.appendTo(this.rootInstance.$el);
        this.$el.bind("click", function () {
            _this.rootInstance.itemClick(_this);
        });
    }

    BarItem.prototype = {
        selected: function () {
            this.$el.addClass("yy-cs-item-selected");
        },
        unSelected: function () {
            this.$el.removeClass("yy-cs-item-selected");
        }
    }

    var SelectorItem = function (config) {
        var _this = this;
        this.isMulti = config.isMulti;
        this.parent = config.parent;
        this.barItemInstance = config.barItemInstance;
        this.rootInstance = config.rootInstance;
        this.index = this.barItemInstance.index;
        this.data = config.itemData;
        //menu1LabelKey
        var configLabelKey = "menu" + this.index + "LabelKey";
        var LabelKey = this.rootInstance.config[configLabelKey];
        if (!LabelKey) {
            alert("程序配置错误" + this.rootInstance.config.comKey + "未配置 :" + configLabelKey);
        }
        //menu0Col
        var className = "yy-cs-selector-item"
        if (this.isMulti) {
            var configColKey = "menu" + this.index + "Col";
            var Col = this.rootInstance.config[configColKey];
            className = "yy-cs-muselector-item"
            if (Col) {
                Col = parseInt(Col);
                if (Col == 2) {
                    className = "yy-cs-muselector-item yy-cs-muselector-item2"
                }
            }
        }

        // className = "displayflex "+className+" jc-start ai-center";
        this.$el = $("<div class='" + className + "'><span class='yy-cs-selector-span' style='font-size:" + this.rootInstance.itemFontSize + "'>" + (this.data[LabelKey] || "") + "</span></div>");
        this.$el.css({height: this.rootInstance.itemHeight, lineHeight: this.rootInstance.itemHeight});
        this.$el.bind("click", function () {
            _this.parent.itemClick(_this);
        });
    }

    SelectorItem.prototype = {
        selected: function () {
            var className = this.isMulti ? "yy-cs-muselector-item-selected" : "yy-cs-selector-item-selected";
            this.$el.addClass(className);
        },
        unSelected: function () {
            var className = this.isMulti ? "yy-cs-muselector-item-selected" : "yy-cs-selector-item-selected";
            this.$el.removeClass(className);
        }
    }


    var GroupSelectorLeftItem = function (config) {
        var _this = this;
        this.parent = config.parent;
        this.index = config.index;
        this.title = config.title;
        this.rootInstance = config.rootInstance;

        this.$el = $("<div style='font-size:" + this.rootInstance.itemFontSize + "' class='displayflex yy-cs-selector-leftitem flex-h jc-start ai-center'>" + this.title + "</div>");
        this.$el.css({height: this.rootInstance.itemHeight});
        this.$el.bind("touchstart", function () {
            _this.parent.leftItemClick(_this);
        });
    }

    GroupSelectorLeftItem.prototype = {
        selected: function () {
            this.$el.addClass("yy-cs-selector-leftitem-selected");
        },
        unSelected: function () {
            this.$el.removeClass("yy-cs-selector-leftitem-selected");
        }
    }

    var MultiSelector = function (config) {
        this.$el = $("<div class='displayflex yy-cs-multiselector flex-v'></div>");
        this.listWrapper = $("<div class='displayflex yy-cs-multiselector-list flex-h'></div>");
        this.btnWrapper = $("<div class='displayflex yy-cs-multiselector-bottom flex-h'></div>");
        this.btnWrapper.css({"height": utils.getRealHeight(40) + "px"});
        var _this = this;
        this.rootInstance = config.rootInstance;
        this.barItemInstance = config.barItemInstance;
        this.dropDownInstance = config.dropDownInstance;
        this.index = this.barItemInstance.index;
        this.data = config.data;
        this.items = [];
        this.selectedItems = [];

        var style = this.rootInstance.config["menu" + this.index + "Style"];
        if (style) {
            var mh = style["maxHeight"] || style["max-height"];
            if (mh) {
                this.listWrapper.css({"maxHeight": mh});
            }
        }

        for (var i = 0, j = this.data.length; i < j; i++) {
            var itemData = this.data[i];
            var itemInstance = new SelectorItem(
                {
                    rootInstance: this.rootInstance,
                    barItemInstance: this.barItemInstance,
                    dropDownInstance: this.dropDownInstance,
                    parent: this,
                    itemData: itemData,
                    isMulti: true
                }
            );
            this.items.push(itemInstance);
            this.listWrapper.append(itemInstance.$el);
        }

        var ResetBtn = $("<div class='displayflex yy-cs-btn jc-center ai-center'>重置</div>");
        var OKBtn = $("<div class='displayflex yy-cs-btn yy-cs-ok-btn jc-center ai-center'>确定</div>");
        this.btnWrapper.append(ResetBtn).append(OKBtn);
        ResetBtn.bind("click", function () {
            _this.reset();
        });
        this.$el.append(this.listWrapper).append(this.btnWrapper);

    }

    MultiSelector.prototype = {
        reset: function () {
            for (var i = 0, j = this.selectedItems.length; i < j; i++) {
                this.selectedItems[i].unSelected();
            }
            this.selectedItems = [];
        },
        itemClick: function (itemInstance) {
            var index = this.selectedItems.indexOf(itemInstance);
            if (index >= 0) {
                itemInstance.unSelected();
                this.selectedItems.splice(index, 1);
            } else {
                itemInstance.selected();
                this.selectedItems.push(itemInstance);
            }
        }
    }

    var SingleSelector = function (config) {
        this.$el = $("<div class='displayflex yy-cs-selector flex-v'></div>");
        var _this = this;
        this.rootInstance = config.rootInstance;
        this.barItemInstance = config.barItemInstance;
        this.dropDownInstance = config.dropDownInstance;
        this.index = this.barItemInstance.index;
        this.data = config.data;
        this.items = [];
        var style = this.rootInstance.config["menu" + this.index + "Style"];
        if (style) {
            var mh = style["maxHeight"] || style["max-height"];
            if (mh) {
                this.$el.css({"maxHeight": mh});
            }
        }

        for (var i = 0, j = this.data.length; i < j; i++) {
            var itemData = this.data[i];
            var itemInstance = new SelectorItem(
                {
                    rootInstance: this.rootInstance,
                    barItemInstance: this.barItemInstance,
                    dropDownInstance: this.dropDownInstance,
                    parent: this,
                    itemData: itemData
                }
            );
            this.items.push(itemInstance);
            this.$el.append(itemInstance.$el);
        }

    }

    SingleSelector.prototype = {
        itemClick: function (itemInstance) {
            var methodName = this.rootInstance.config.comKey + "_menu" + this.index + "_itemClick";
            var method = this.rootInstance.pageview.plugin[methodName];
            if (this.curSelectedItem) {
                this.curSelectedItem.unSelected();
            }
            this.curSelectedItem = itemInstance;
            this.curSelectedItem.selected();
            method && method.call(this.rootInstance.pageview.plugin, this);
        }
    }

    var GroupSingleSelector = function (config) {
        this.config = config;
        this.rootInstance = config.rootInstance;
        this.barItemInstance = config.barItemInstance;
        this.index = this.barItemInstance.index;
        this.dropDownInstance = config.dropDownInstance;
        this.$el = $("<div class='displayflex yy-cs-selector flex-h'></div>");
        //munu2GroupKey

        this.leftWrapper = $("<div class='displayflex yy-cs-selector-left flex-v'></div>");
        this.rightWrapper = $("<div class='yy-cs-selector-right'></div>");
        var style = this.rootInstance.config["menu" + this.index + "Style"];
        if (style) {
            var mh = style["maxHeight"] || style["max-height"];
            if (mh) {
                this.$el.css({"maxHeight": mh});
                this.rightWrapper.css({"maxHeight": mh});
                this.leftWrapper.css({"maxHeight": mh});
            }
        }
        // var leftStyle = config.rootInstance
        var leftStyleKey = "menu" + config.index + "LeftStyle";
        var leftStyle = config.rootInstance.config[leftStyleKey];
        var groupConfigKey = "menu" + config.index + "GroupKey";
        this.groupKey = config.rootInstance.config[groupConfigKey];
        if (!this.groupKey) {
            alert("程序配置错误" + this.rootInstance.config.comKey + "未配置 :" + groupConfigKey);
        }
        if (leftStyle) {
            utils.css(this.leftWrapper, leftStyle);
        }
        this.leftItems = [];
        this.$el.append(this.leftWrapper).append(this.rightWrapper);
        this._processData(this.config.data);
        this.rightMenuWrapperDict = {};
        this._initLeftLayout();
    }
    GroupSingleSelector.prototype = {
        leftItemClick: function (leftItemInstance) {
            if (this.curLeftSelectedItem) {
                this.curLeftSelectedItem.unSelected();
            }
            this.curLeftSelectedItem = leftItemInstance;
            leftItemInstance.selected();
            this.showRightMenu();
        },
        itemClick: function (itemInstance) {
            if (this.curSelectedItem) {
                this.curSelectedItem.unSelected();
            }
            this.curSelectedItem = itemInstance;
            this.curSelectedItem.selected();
        },
        showRightMenu: function () {
            var index = this.curLeftSelectedItem.index.toString();
            var rightMenuWrapper = this.rightMenuWrapperDict[index];
            if (!rightMenuWrapper) {
                rightMenuWrapper = this._initRightMenuWrapper(parseInt(index) - 1);
                this.rightMenuWrapperDict[index] = rightMenuWrapper;
            }
            if (this.curRightMenuWrapper) {
                this.curRightMenuWrapper.addClass("displaynone");
            }
            this.curRightMenuWrapper = rightMenuWrapper;
            this.curRightMenuWrapper.removeClass("displaynone");

        },
        _initRightMenuWrapper: function (index) {
            var rightMenuWrapper = $("<div class='displayflex flex-v yy-cs-selector-right-menuwrapper displaynone'></div>");
            var rightData = this.rightDataArrArr[index];
            if (rightData) {
                for (var i = 0, j = rightData.length; i < j; i++) {
                    var itemData = rightData[i];
                    var itemInstance = new SelectorItem(
                        {
                            rootInstance: this.rootInstance,
                            barItemInstance: this.barItemInstance,
                            dropDownInstance: this.dropDownInstance,
                            parent: this,
                            itemData: itemData
                        }
                    );
                    // this.items.push(itemInstance);
                    rightMenuWrapper.append(itemInstance.$el);
                }
            }
            this.rightWrapper.append(rightMenuWrapper);
            return rightMenuWrapper;
        },
        _initLeftLayout: function () {
            var arr = ["全部"].concat(this.leftDataArr);
            for (var i = 0, j = arr.length; i < j; i++) {
                var title = arr[i];
                var itemInstance = new GroupSelectorLeftItem(
                    {
                        rootInstance: this.rootInstance,
                        barItemInstance: this.barItemInstance,
                        dropDownInstance: this.dropDownInstance,
                        parent: this,
                        index: i,
                        title: title
                    }
                );
                this.leftItems.push(itemInstance);
                this.leftWrapper.append(itemInstance.$el);
            }

            // this.curLeftSelectedItem = this.leftItems[0];
            // this.curLeftSelectedItem.selected();
            // this.showRightMenu();
            this.leftItemClick(this.leftItems[0]);

        },
        _processData: function (data) {
            this.leftDataArr = [], this.rightDataArrArr = [];
            for (var i = 0, j = data.length; i < j; i++) {
                var itemData = data[i];
                var groupValue = itemData[this.groupKey];
                if (!groupValue) {
                    alert("程序配置错误" + this.rootInstance.config.comKey + " 数据源中 没有相关的分类字段:" + this.groupKey);
                    break;
                }
                var leftDataIndex = this.leftDataArr.indexOf(groupValue);
                if (leftDataIndex < 0) {
                    this.leftDataArr.push(groupValue);
                    leftDataIndex = this.leftDataArr.length - 1;
                    this.rightDataArrArr.push([]);
                }
                var rightDataArr = this.rightDataArrArr[leftDataIndex];
                if (!rightDataArr) {
                    rightDataArr = [];
                    this.rightDataArrArr[leftDataIndex] = rightDataArr;
                }
                rightDataArr.push(itemData);

            }
        }
    }

    var DropDown = function (config) {
        var _this = this;
        this.rootInstance = config.rootInstance;
        this.barItemInstance = config.barItemInstance;
        this.index = this.barItemInstance.index.toString();
        this.DropDownWrapper = config.parent;
        this.hasInit = false;
        this.isLoading = false;
        this.$el = $("<div class='yy-cs-item-dropdown' style='min-height:100px'></div>");
        this.loadWrapper = $("<div class='yy-cs-loading-wrapper displayflex jc-center ai-center displaynone'><div class='preloader'></div></div>");
        this.$el.append(this.loadWrapper);
        var style = this.rootInstance.config["menu" + this.index + "Style"];
        if (style) {
            utils.css(this.$el, style);
        } else {
            this.$el.css({height: "100px"});
        }
        this.DropDownWrapper.$innerWrapper.append(this.$el);
    }

    DropDown.prototype = {
        show: function (isAnimate) {
            var _this = this;
            var style = isAnimate ?
                utils.processTransitionTanformStyle("transform .3s ease", "translate3d(0,0,0)")
                :
                utils.processTransitionTanformStyle("none", "translate3d(0,0,0)");
            if (isAnimate) {
                window.setTimeout(function () {
                    _this.$el.css(style);
                }, 0);
            } else {
                this.$el.css(style);
            }
            if (!this.hasInit && !this.isLoading) {
                this.init();
            }

        },
        initLoadErrorDom: function () {
            var _this = this;
            this.loadErrorWrapper = this.rootInstance._createErrorDom(function () {
                _this.init();
            });
            this.$el.append(this.loadErrorWrapper);
        },
        init: function () {
            var _this = this;
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            this.loadWrapper.removeClass("displaynone");
            _this.loadErrorWrapper && _this.loadErrorWrapper.addClass("displaynone");
            this.loadData(
                function (data) {
                    _this.loadWrapper.addClass("displaynone");
                    _this.dataSource = data;
                    _this.isLoading = false;
                    _this.initLayout(_this.dataSource);
                },
                function (arg) {
                    if (!_this.loadErrorWrapper) {
                        _this.initLoadErrorDom();
                    }
                    _this.loadWrapper.addClass("displaynone");
                    _this.loadErrorWrapper.removeClass("displaynone");
                    _this.isLoading = false;
                });
        },
        initLayout: function (data) {
            //munu2Mode
            var ModeKey = "menu" + this.index + "Mode";
            // mode : single group multi
            var mode = this.rootInstance.config[ModeKey] || "single";
            var config = {
                data: data,
                index: this.index,
                rootInstance: this.rootInstance,
                dropDownInstance: this,
                barItemInstance: this.barItemInstance
            };
            if (mode == "single") {
                this.selector = new SingleSelector(config);
            } else if (mode == "group") {
                this.selector = new GroupSingleSelector(config);
            } else if (mode == "multi") {
                this.selector = new MultiSelector(config);
            } else {
                this.selector = new SingleSelector(config);
            }
            this.$el.append(this.selector.$el);
            this.hasInit = true;
        },
        loadData: function (success, error) {
            if (this.dataSource) {
                success(this.dataSource);
                return;
            }
            var methodName = this.rootInstance.config.comKey + "_menu" + this.index + "_loaddata";
            var method = this.rootInstance.pageview.plugin[methodName];
            method && method.call(this.rootInstance.pageview.plugin, this, {
                success: success,
                error: error
            });

        },
        hide: function (isAnimate) {
            var style = isAnimate ?
                    utils.processTransitionTanformStyle("transform .3s ease", "translate3d(0,-100%,0)")
                    :
                    utils.processTransitionTanformStyle("none", "translate3d(0,-100%,0)")
                ;
            this.$el.css(style);
        }
    }

    var DropDownWrapper = function (config) {
        var _this = this;
        this.parent = config.parent;
        this.isShow = false;
        this.DropDowns = {};
        this.$el = $("<div class='yy-cs-dropdown'></div>");
        this.$innerWrapper = $("<div class='yy-cs-dropdown-inner'></div>");
        this.$el.append(this.$innerWrapper);
        this.curDropDown = null;
        this.$innerWrapper.bind("click", function (e) {
            _this._hideSelf(e);
        });
        this.parent.pageview.$el.closest('.yy-root-view').children('.yy-pageview').append(this.$el);

    }

    DropDownWrapper.prototype = {
        _hideSelf: function (e) {
            if (e.target.className == "yy-cs-dropdown-inner") {
                this.hide();
            }
        },
        show: function (barItemInstance) {
            var _this = this;
            if (!this.isShow) {
                var parentRect = this.parent.$el[0].getBoundingClientRect();
                var style = {"top": parentRect.bottom, left: 0, bottom: 0, right: 0, display: "block"};
                this.$el.css(style);
                this.isShow = true;
            }
            var index = barItemInstance.index.toString();
            var wantToShowDropDown = this.DropDowns[index];
            if (!wantToShowDropDown) {
                wantToShowDropDown = new DropDown({
                    parent: this,
                    rootInstance: this.parent,
                    barItemInstance: barItemInstance
                });
                this.DropDowns[index] = wantToShowDropDown;
            }
            if (this.curDropDown) {
                if (this.curDropDown === wantToShowDropDown) {
                    this.curDropDown.barItemInstance.unSelected();
                    this.curDropDown.hide(true);
                    this.curDropDown = null;
                    this.hide();
                } else {
                    this.curDropDown.hide(false);
                    this.curDropDown.barItemInstance.unSelected();
                    this.curDropDown = wantToShowDropDown;
                    this.curDropDown.show(false);
                    this.curDropDown.barItemInstance.selected();
                }
            } else {
                this.curDropDown = wantToShowDropDown;
                this.curDropDown.barItemInstance.selected();
                this.curDropDown.show(true);
            }
        },
        hide: function () {
            var _this = this;
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            if (this.curDropDown) {
                this.curDropDown.barItemInstance.unSelected();
                this.curDropDown.hide(true);
            }
            this.curDropDown = null;
            window.setTimeout(function () {
                _this.$el.css({display: "none"});
            }, 300)
        }
    }


    var Component = function (config) {
        var _this = this;
        Component.baseConstructor.call(this, config);
        this.itemHeight = config.itemHeight || utils.getRealHeight(40) + "px";
        this.itemFontSize = config.itemFontSize || utils.getRealWidth(12) + "px";
        this.$el.addClass("displayflex yy-condition-selector flex-h");
        this.items = config.items || ["全部"];
        this.initBarItem();
    }

    utils.extends(Component, baseClass);

    Component.prototype.hideDropDown = function () {
        if (this.dpdWrapper!==undefined) {
            this.dpdWrapper.hide();
        }
    };
    Component.prototype.showDropDown = function (itemInstance) {
        if (!this.dpdWrapper) {
            this.dpdWrapper = new DropDownWrapper({
                parent: this
            });
        }
        this.dpdWrapper.show(itemInstance);
    }

    Component.prototype.itemClick = function (itemInstance) {
        this.showDropDown(itemInstance);
    }
    Component.prototype.initBarItem = function () {
        var barItemStyle = this.config.barItemStyle;
        for (var i = 0, j = this.items.length; i < j; i++) {
            var bitem = new BarItem({
                parent: this,
                item: this.items[i],
                index: i
            });
        }
    }

    return Component;
});
