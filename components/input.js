define(["utils", "base"], function (utils, baseClass) {

    var Component = function (config) {
        var _this = this;
        Component.baseConstructor.call(this, config);
        this.config.style = this.config.style || {};
        this.$el.addClass("displayflex yy-input flex-h");
        var mode = this.config.mode || "text";
        var placeholder = this.config.placeholder || "";
        var isInForm = config.isInForm;
        var temMode = mode === "number" ? "text" : mode;
        this.input = $("<input class='yy-flex-1' placeholder='" + placeholder + "' type='" + temMode + "' />");
        var inputStyle = {
            fontSize: this.config.style.fontSize || "13px",
            color: this.config.style.color || "black",
            textAlign: this.config.style.textAlign || "left"
        };
        if (this.config.value || this.config.value === 0) {
            this.input.val(this.config.value);
        }
        utils.css(this.input, inputStyle);
        if (isInForm === true) {
            this.Form = $("<form action=''></form>");
            this.Form.bind("submit", function (e) {

                var formSubmitName = config.comKey + "_formsubmit";
                var formSubmitNameMethod = _this.pageview.plugin[formSubmitName];
                if (formSubmitNameMethod) {
                    !_this.disabled && formSubmitNameMethod && formSubmitNameMethod.call(_this.pageview.plugin, _this, {e: e});
                }

                e.preventDefault();
                return false;
            });
            this.Form.append(this.input);
            this.$el.append(this.Form);

        } else {
            this.$el.append(this.input);

        }
        var method_compositionendname = config.comKey + "_compositionend";
        var method_compositionend = _this.pageview.plugin[method_compositionendname];
        if (method_compositionend) {
            this.$el.on('input', function (e) {
                if (_this.$el.prop('comStart')) return;    // 中文输入过程中不截断
                !_this.disabled && method_compositionend && method_compositionend.call(_this.pageview.plugin, _this, {e: e});
            }).on('compositionstart', function () {
                _this.$el.prop('comStart', true);
            }).on('compositionend', function (e) {
                _this.$el.prop('comStart', false);
                !_this.disabled && method_compositionend && method_compositionend.call(_this.pageview.plugin, _this, {e: e});
            });
        }


        var method_name = config.comKey + "_keydown";
        var method_keydown = _this.pageview.plugin[method_name];
        //
        if (mode === "number") {
            this.$el.on('input', function (e) {
                var curValu = _this.input.val();

                if (e.keyCode === 190) {
                    if (curValu.indexOf(".") >= 0) {
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        return;
                    }
                }
                if(isNaN(curValu)){
                    curValu = curValu.replace(/[^0-9\.]/g, '');
                    _this.setValue(curValu);
                }

            });
            this.$el.bind("keydown", function (e) {
                var curValu = _this.input.val();
                if (e.keyCode === 190) {
                    if (curValu.indexOf(".") >= 0) {
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        return;
                    }
                }
                if(!(e.keyCode==190)&&!(e.keyCode==46)&&!(e.keyCode==8)&&!(e.keyCode==37)&&!(e.keyCode==39)&&!((e.keyCode>=48&&e.keyCode<=57)||(e.keyCode>=96&&e.keyCode<=105))){
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    return;
                }

                !_this.disabled && method_keydown && method_keydown.call(_this.pageview.plugin, _this, {e: e});
            });
            this.input.on('compositionstart', function (e) {
                var curValu = _this.input.val();

                if(isNaN(curValu)){
                    curValu = curValu.replace(/[^0-9\.]/g, '');
                    _this.setValue(curValu);
                }


            });
            this.input.on('compositionend', function (e) {
                var curValu = _this.input.val();

                if(isNaN(curValu)){
                    curValu = curValu.replace(/[^0-9\.]/g, '');
                    _this.setValue(curValu);
                }
            });
        }
        if (method_keydown && mode !== "number") {
            this.$el.bind("keydown", function (e) {

                !_this.disabled && method_keydown && method_keydown.call(_this.pageview.plugin, _this, {e: e});

            });
        }

        var keyUpName = config.comKey + "_keyup";
        var keyUpMethod = _this.pageview.plugin[keyUpName];
        if (keyUpMethod) {
            this.$el.bind("keyup", function (e) {
                !_this.disabled && keyUpMethod && keyUpMethod.call(_this.pageview.plugin, _this, {e: e});
            });
        }


        var focus_name = config.comKey + "_focus";
        var focus_nameMethod = _this.pageview.plugin[focus_name];
        if (focus_nameMethod) {
            this.input.bind("focus", function (e) {
                !_this.disabled && focus_nameMethod && focus_nameMethod.call(_this.pageview.plugin, _this, {e: e});
            });
        }

        var blur_name = config.comKey + "_blur";
        var blur_nameMethod = _this.pageview.plugin[blur_name];
        if (blur_nameMethod) {
            this.input.bind("blur", function (e) {
                !_this.disabled && blur_nameMethod && blur_nameMethod.call(_this.pageview.plugin, _this, {e: e});
            });
        }
    }

    utils.extends(Component, baseClass);

    Component.prototype.getValue = function () {

        var value = $.trim(this.input.val());
       if(this.config.mode!=="number"){
           value =value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\uD800-\uDBFF]|[\uDC00-\uDFFF]/g, "");
           this.setValue(value);
       }


        return $.trim(value);
    };
    Component.prototype.setValue = function (val) {
        this.input.val(val);
    };
    Component.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
        if (this.disabled) {
            this.input.attr("disabled", "disabled");
            this.$el.addClass(this.disabledClassName);
        } else {
            this.input.removeAttr("disabled");
            this.$el.remove(this.disabledClassName);
        }
    };
    Component.prototype.focus = function (val) {
        var _this = this;
        _this.input.focus();
    };

    Component.prototype.blur = function () {
        var _this = this;
        _this.input.blur();
    };
    return Component;
});
