define(["utils", "base"], function (utils, baseClass) {
    var Component = function (config) {
        var _this = this;

        Component.baseConstructor.call(this, config);

        this.$el.addClass("displayflex yy-icon yy-ai-center yy-jc-center");

        var font = this.config.font || "";
        var font_arr = font.split("_");
        this.text = this.config.text;
        var style = this.config.style;
        var iconStyle = this.config.iconStyle;
        var iconClassName = this.config.iconClassName;
        var textStyle = this.config.textStyle;


        var textPos = this.config.textPos || "right";
        this.iconDom = null;
        this.textDom = null;
        this.title = this.config.title || "";
        var font_family, font_code;

        if (font_arr.length == 2) {
            font_family = font_arr[0];
            font_code = font_arr[1];
            utils.css(this.$el, {fontFamily: font_family});
            this.iconDom = $('<i class="yy-icon-code" data-code="' + font_code + '" data-icon="&#x' + font_code + ';"></i>');
            if (iconStyle) {
                utils.css(this.iconDom, iconStyle);
            }
            if (iconClassName) {
                this.iconDom.addClass(iconClassName);
            }
        }


        if (this.config.src !== null && this.config.src !== undefined) {
            var preErrorImagesrc = "";
            var image = new Image();
            this.iconDom = $('<div class="yy-icon-img"></div>');
            if (iconStyle) {
                utils.css(this.iconDom, iconStyle);
            }
            if (iconClassName) {
                this.iconDom.addClass(iconClassName);
            }
            image.onerror = function () {

                var imgOnErrorMethodName = _this.config.comKey +"_error";
                var imgOnErrorMethod = _this.pageview.plugin[imgOnErrorMethodName];

                if (_this.title.length > 0) {
                    var title = utils.getImgTitle(_this.title);
                    _this.iconDom.html(title);
                    _this.iconDom.addClass("displayflex yy-ai-center yy-jc-center");
                    _this.iconDom.css({
                        color: "#fff",
                        fontSize: utils.fontSize(13),
                        backgroundColor: utils.getImgBg(title)
                    });
                    if(imgOnErrorMethod){
                      imgOnErrorMethod.call(_this.pageview.plugin,_this,{});
                    }
                    return;
                }
                if (config.defaultSrc) {
                    if (preErrorImagesrc === config.defaultSrc) {
                        _this.img.classList.add("displaynone");
                        return;
                    }
                    preErrorImagesrc = config.defaultSrc;
                    image.src = config.defaultSrc;
                    if(imgOnErrorMethod){
                      imgOnErrorMethod.call(_this.pageview.plugin,_this,{});
                    }
                }
            };
            image.src = this.config.src;
            this.iconDom.append(image);
        }


        if (this.text || this.text == 0) {
            this.text = (this.text === null || this.text === undefined) ? "" : this.text;

            this.textDom = $("<span class='yy-icon-text yy-text-box'>" + this.text + "</span>");
            if (this.config.numberofline) {
                this.textDom[0].style["-webkit-line-clamp"] = this.config.numberofline;
            }
            if (textStyle) {
                utils.css(this.textDom, textStyle);
            }
        }

        if (textPos == "left" || textPos == "top") {
            this.textDom && this.$el.append(this.textDom);
            this.iconDom && this.$el.append(this.iconDom);
        } else {
            this.iconDom && this.$el.append(this.iconDom);
            this.textDom && this.$el.append(this.textDom);
        }
        if (this.iconDom) {
            if (textPos == "left" || textPos == "right") {
                this.$el.addClass("flex-h");
            } else {
                this.$el.addClass("flex-v");
            }
        }

        this.originalStatus = {font: font, text: this.config.text};

    }

    utils.extends(Component, baseClass);

    Component.prototype.changeStatus = function (key) {
        var statusInfo = this.originalStatus;
        if (key && key !== "" && this.config.status) {
            statusInfo = this.config.status[key] || this.originalStatus;
        }

        this.status = key;

        if (statusInfo.font) {
            var font_arr = statusInfo.font.split("_");
            if (font_arr.length != 2) {
                return;
            }
            var font_family = font_arr[0];
            var font_code = font_arr[1];
            var newDom = $('<i class="yy-icon-code" data-code="' + font_code + '" data-icon="&#x' + font_code + ';"></i>');
            utils.css(newDom, {fontFamily: font_family});

            this.iconDom.replaceWith(newDom);
            this.iconDom = newDom;
            if (this.config.iconStyle) {
                utils.css(this.iconDom, this.config.iconStyle);
            }
        }

        var text = statusInfo.text || "";
        this.setText(text);

    };
    Component.prototype.setIcon = function (iconCode, style) {
        var font_arr = iconCode.split("_");
        if (font_arr.length != 2) {
            return;
        }
        var font_family = font_arr[0];
        var font_code = font_arr[1];
        var newDom = $('<i class="yy-icon-code" data-code="' + font_code + '" data-icon="&#x' + font_code + ';"></i>');
        utils.css(newDom, {fontFamily: font_family});
        this.iconDom.replaceWith(newDom);
        this.iconDom = newDom;
        if (this.config.iconStyle) {
            var iconStyle = utils.clone(this.config.iconStyle);
            if (style) {
                for (var key in style) {
                    iconStyle[key] = style[key];
                }
            }
            utils.css(this.iconDom, iconStyle);
        }

    };
    Component.prototype.setText = function (text) {
        this.text = text;
        this.textDom.html(text);
    };
    Component.prototype.getText = function (text) {
        return this.text;
    }
    Component.prototype.setAttribute = function (attr, val) {
        this.$el.attr(attr, val);
        this.textDom && this.textDom.attr(attr, val);
        this.iconDom && this.iconDom.attr(attr, val);
    }


    return Component;
});
