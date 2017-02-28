define(["md5"],
    function (md5) {
        var componentClassDict = {};
        var pageConfigDict = {};
        var colorMap = {};


        var keyDict = {
            "w": true,
            "borderRadius": true,
            "maxHeight": true,
            "lineHeight": true,
            "line-height": true,
            "max-height": true,
            "maxWidth": true,
            "max-width": true,
            "minWidth": true,
            "min-width": true,
            "minHeight": true,
            "min-height": true,
            "fs": true,//不参与适配的fontSize
            "top": true,
            "left": true,
            "right": true,
            "bottom": true,
            "fontSize": true,
            "font-size": true,
            "width": true,
            "height": true,
            "padding": true,
            "paddingTop": true,
            "paddingRight": true,
            "paddingLeft": true,
            "paddingBottom": true,
            "padding-bottom": true,
            "padding-top": true,
            "padding-left": true,
            "padding-right": true,
            "margin": true,
            "marginTop": true,
            "marginRight": true,
            "marginLeft": true,
            "marginBottom": true,
            "margin-bottom": true,
            "margin-top": true,
            "margin-left": true,
            "margin-right": true
        };


        var keys = {
            "flexShrink": "yy-fs-",
            "flexDirection": "yy-fd-",
            "flex-direction": "yy-fd-",
            "flex-shrink": "yy-fs-",
            "justifyContent": "yy-jc-",
            "justify-content": "yy-jc-",
            "align-items": "yy-ai-",
            "alignItems": "yy-ai-",
            "alignContent": "yy-ac-",
            "align-content": "yy-ac-",
            "alignSelf": "yy-as-",
            "align-self": "yy-as-",
            "flex-wrap": "yy-fw-",
            "flexWrap": "yy-fw-",
            "flex": "yy-flex-"
        };


        function isNeedConvert(str) {
            return str.substring(str.length - 1) == "%" || str == "auto";
        }

        function convertAdaptationValueByWidth(val, screenSize) {
            val = parseInt(val);
            var bl = (screenSize.width / Re.baseSize.width);
            // bl = bl<1?1:bl;
            bl = bl > 1.5 ? 1.5 : bl;
            if (screenSize.width > 1000) {
                bl = 1;
            }
            return parseInt((bl) * val);
        }

        function convertAdaptationValueByHeight(val, screenSize) {
            val = parseInt(val);
            var bl = (screenSize.height / Re.baseSize.height);
            bl = bl < 1 ? 1 : bl;
            bl = bl > 1.5 ? 1.5 : bl;
            return parseInt((bl) * val);
        }

        function convertAdaptationValue(key, val, index, len, screenSize, style) {

            if (len === 1) {
                //fontsize width height
                if (key == "fontSize" || key == "font-size") {

                    val = parseInt(val);
                    var bl = (screenSize.width / Re.baseSize.width);
                    // bl = bl<1?1:bl;
                    bl = bl > 1.5 ? 1.5 : bl;
                    if (screenSize.width > 1000) {
                        bl = 1;
                    }
                    bl = bl < 1 ? 1 : bl;
                    return parseInt((bl) * val);
                }

                if (key == "width" || key == "left" || key == "right" || key == "maxWidth" || key == "marginLeft" || key == "marginRight" || key == "max-width" || key == "minWidth" || key == "min-width") {
                    return convertAdaptationValueByWidth(val, screenSize);
                } else if (key == "height" || key == "top" || key == "marginBottom" || key == "marginTop" || key == "bottom" || key == "maxHeight" || key == "max-height" || key == "lineHeight" || key == "line-height" || key == "minHeight" || key == "min-height") {
                    return convertAdaptationValueByHeight(val, screenSize);
                }
                return convertAdaptationValueByWidth(val, screenSize);
            }
            if (index === 0 || index === 2) {
                return convertAdaptationValueByHeight(val, screenSize);
            }
            if (index === 1 || index === 3) {
                return convertAdaptationValueByWidth(val, screenSize);
            }
            return convertAdaptationValueByWidth(val, screenSize);
        }

        function processStyleValue(key, val_arr, screenSize, style) {
            var Re = [];
            if ((val_arr.length > 1 && val_arr.length < 4) || key == "padding" || key == "margin") {
                //padding or  margin
                if (val_arr.length == 1) {
                    var val_item = val_arr[0];
                    val_arr = [val_item, val_item, val_item, val_item];
                } else if (!val_arr[2]) {
                    val_arr[2] = val_arr[0];
                    val_arr[3] = val_arr[1];
                } else if (!val_arr[3]) {
                    val_arr[3] = val_arr[1];
                }
            }
            for (var i = 0, j = val_arr.length; i < j; i++) {
                var val = val_arr[i];
                if (!isNeedConvert(val)) {
                    val = convertAdaptationValue(key, val, i, j, screenSize, style) + "px";
                }
                Re.push(val);
            }
            return Re.join(" ");
        }

        var translateKeys = null;
        var fontSize12 = null, fontSize13, fontSize14, fontSize15, fontsizemapping = {};
        var p, isSupportFlexWrap;
        var Re = {
            isSupportFlexWrap: function () {
                if (!p) {
                    p = document.createElement("p");
                    isSupportFlexWrap = p.style.flexWrap || p.style.webkitFlexWrap;
                    if (isSupportFlexWrap === "") {
                        isSupportFlexWrap = true;
                    } else {
                        isSupportFlexWrap = false;
                    }
                }
                return isSupportFlexWrap;
            },
            fontSize: function (size) {
                if (!fontsizemapping[size.toString()]) {
                    fontsizemapping[size.toString()] = this.getRealWidth(size);
                }
                return fontsizemapping[size.toString()];
            },
            fontSize12: function () {
                if (!fontSize12) {
                    fontSize12 = this.getRealWidth(12);
                }
                return fontSize12;
            },
            fontSize13: function () {
                if (!fontSize13) {
                    fontSize13 = this.getRealWidth(13);
                }
                return fontSize13;
            },
            fontSize14: function () {
                if (!fontSize14) {
                    fontSize14 = this.getRealWidth(14);
                }
                return fontSize14;
            },
            fontSize15: function () {
                if (!fontSize15) {
                    fontSize15 = this.getRealWidth(15);
                }
                return fontSize15;
            },
            AutoResizeImage: function (maxWidth, maxHeight, objImg, type) {

                var img = new Image();
                img.src = objImg.src;
                img.onload = function () {
                    var hRatio;
                    var wRatio;
                    var Ratio = 1;
                    var w = img.width;
                    var h = img.height;
                    wRatio = maxWidth / w;
                    hRatio = maxHeight / h;
                    if (maxWidth === 0 && maxHeight === 0) {
                        Ratio = 1;
                    } else if (maxWidth === 0) { //
                        if (hRatio < 1) Ratio = hRatio;
                    } else if (maxHeight === 0) {
                        if (wRatio < 1) Ratio = wRatio;
                    } else if (wRatio < 1 || hRatio < 1) {
                        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                    }
                    if (type === "1") {

                        if (Ratio < 1) {

                            if (w >= h) {
                                w = "auto";
                                h = "100%";

                            } else {
                                w = "100%";
                                h = "auto";
                            }

                        }
                        var size = {
                            w: (w === "100%" || w === "auto" ? w : w + "px"),
                            h: (h === "100%" || h === "auto" ? h : h + "px")
                        };
                        objImg.style.width = size.w;
                        objImg.style.height = size.h;

                    } else {
                        if (Ratio < 1) {
                            w = w * Ratio;
                            h = h * Ratio;
                        }
                        objImg.height = h;
                        objImg.width = w;
                    }

                };
            },
            getImgBg: function (str) {
                str = str || '';
                if (str in colorMap) return colorMap[str];

                var c = md5(str).charAt(0).toLowerCase();
                var color = ['#29d4ff', '#1594ff', '#ffa92f', '#b587fa', '#06cf86', '#fa6771', '#73d51c', '#8991ff'];
                var bg = color['abcdefghijklmnopqrstuvwxyz0123456789'.indexOf(c) % color.length];

                colorMap[str] = bg;
                return bg;
            },
            getImgTitle: function (str) {
                try {
                    str = str || '';
                    return /[\u4e00-\u9fa5]/.test(str) ? str.substr(-2) : str.substr(0, 2);
                } catch (e) {
                    return str;
                }

            },

            deviceInfo: function () {
                if (this._deviceInfo !== undefined) {
                    return this._deviceInfo;
                }
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                this._deviceInfo = {
                    isAndroid: isAndroid,
                    isIOS: isIOS
                };
                return this._deviceInfo;
            },
            getPicSize: function (maxWidth, maxHeight, w, h) {
                var hRatio;
                var wRatio;
                var Ratio = 1;
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;

                if (maxWidth === 0 && maxHeight === 0) {
                    Ratio = 1;
                } else if (maxWidth === 0) { //
                    if (hRatio < 1) Ratio = hRatio;
                } else if (maxHeight === 0) {
                    if (wRatio < 1) Ratio = wRatio;
                } else if (wRatio < 1 || hRatio < 1) {
                    Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                }

                if (Ratio < 1) {

                    if (w >= h) {
                        w = "auto";
                        h = "100%";

                    } else {
                        w = "100%";
                        h = "auto";
                    }

                }

                return {
                    w: (w === "100%" || w === "auto" ? w : w + "px"),
                    h: (h === "100%" || h === "auto" ? h : h + "px")
                };
            },
            convertStrToDate: function (str) {
                if (!str) {
                    return new Date();
                }
                var str_arr = str.split(" ");
                var yearmonthday = str_arr[0];
                var hourminsecond = str_arr[1] || "";
                var hourminsecond_arr = hourminsecond.split(":");
                var yearmonthday_arr = yearmonthday.split("-");
                if (yearmonthday_arr.length != 3) {
                    yearmonthday_arr = yearmonthday.split("/");
                }
                if (yearmonthday_arr.length != 3) {
                    return new Date();
                }
                if (!hourminsecond) {
                    return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2]);
                }
                return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2], hourminsecond_arr[0] || 0, hourminsecond_arr[1] || 0, hourminsecond_arr[2] || 0);

            },
            getPreMonth: function (date) {
                var dateInfo = this.getDateInfo(date);
                var nextMonth = new Date(dateInfo.year, dateInfo.month - 1, 0);
                return nextMonth;
            },
            getCurMonthFirstDay: function (date) {
                date = this.convertToDate(date);
                var dateInfo = this.getDateInfo(date);
                return new Date(dateInfo.year, dateInfo.month - 1, 1);
            },
            getPreYear: function (date) {
                var dateInfo = this.getDateInfo(date);
                var preYear = new Date(dateInfo.year - 1, dateInfo.month - 1, 1);
                return preYear;
            },
            setDateToYear: function (date, year) {
                var dateInfo = this.getDateInfo(date);
                var preYear = new Date(year, dateInfo.month - 1, 1);
                return preYear;
            },
            setMonthToDate: function (date, month) {
                month = parseInt(month);
                var dateInfo = this.getDateInfo(date);
                return new Date(dateInfo.year, month - 1, 1);
            },
            getNextYear: function (date) {
                var dateInfo = this.getDateInfo(date);
                var nextYear = new Date(dateInfo.year + 1, dateInfo.month - 1, 1);
                return nextYear;
            },
            getNextMonth: function (date) {
                var dateInfo = this.getDateInfo(date);
                var nextMonth = new Date(dateInfo.year, dateInfo.month + 1, 0);
                return nextMonth;
            },
            getMonthFirstDayWhicDayInWeek: function (date) {
                date = this.convertToDate(date);
                var d = new Date(date.getFullYear(), date.getMonth(), 1);
                return d.getDay();
            },
            getDateWhichDayInWeek: function (date) {
                date = this.convertToDate(date);
                return date.getDay();
            },
            timestampToDate: function (timestamp) {
                if (!timestamp) return new Date();

                // 特殊处理php时间戳
                if (timestamp.length === 10) {
                    timestamp = timestamp * 1000;
                }
                return new Date(parseInt(timestamp));
            },
            ConvertDateToStr: function (date, formart) {
                date = this.convertToDate(date);
                var info = this.getDateInfo(date);
                info.month = info.month < 10 ? "0" + info.month : info.month;
                info.day = info.day < 10 ? "0" + info.day : info.day;
                info.min = info.min < 10 ? "0" + info.min : info.min;
                info.second = info.second < 10 ? "0" + info.second : info.second;
                info.hour = info.hour < 10 ? "0" + info.hour : info.hour;
                // if(formart == "yyyy-MM-dd"){
                //   return info.year+"-"+info.month+"-"+info.day;
                // }

                // if(formart == "yyyy-MM"){
                //   return info.year+"-"+info.month;
                // }
                // if(formart == "yyyy-MM-dd hh:mm:ss"){
                //   return info.year+"-"+info.month+"-"+info.day+" "+info.hour+":"+info.min+":"+info.second;
                // }

                if (formart == "yyyy-MM-dd") {
                    return info.year + "-" + info.month + "-" + info.day;
                } else if (formart == "yyyy-MM") {
                    return info.year + "-" + info.month;
                } else if (formart == "yyyy-MM-dd hh:mm:ss") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min + ":" + info.second;
                } else if (formart == "MM-dd hh:mm") {
                    return info.month + "-" + info.day + " " + info.hour + ":" + info.min;
                } else if (formart == "hh:mm") {
                    return info.hour + ":" + info.min;
                } else if (formart == "MM-dd week") {
                    return info.month + "-" + info.day + " " + info.week;
                } else if (formart == "yyyy-MM-dd weekFullStr") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.weekFullStr;
                } else if (formart == "yyyy-MM-dd week") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.week;
                } else if (formart == "yyyy-MM-dd hh:mm") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min;
                } else if (formart == "yyyy年MM月dd日") {
                    return info.year + "年" + info.month + "月" + info.day + "日";
                } else if (formart === "all") {
                    return {
                        "yyyy-MM-dd": info.year + "-" + info.month + "-" + info.day,
                        "yyyy年MM月dd日": info.year + "年" + info.month + "月" + info.day + "日"
                    };
                }

                return info.year + "-" + info.month + "-" + info.day;
            },
            getMonthDayCount: function (date) {
                date = this.convertToDate(date);
                var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                return newDate.getDate();
            },
            convertToDate: function (date) {
                try {
                    if (date instanceof Date) {
                        return date;
                    } else if (!isNaN(date)) {
                        return this.timestampToDate(date);
                    } else if (typeof(date) == "string") {
                        return this.convertStrToDate(date);
                    }
                } catch (e) {
                    return new Date();
                }

                return new Date();
            },
            _processtime: function (num) {
                return (num < 10 ? ("0" + num) : num);
            },
            weekArr: ["日", "一", "二", "三", "四", "五", "六"],
            getDateInfo: function (date) {
                date = this.convertToDate(date);
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var second = date.getSeconds();
                var week = date.getDay();
                var timestamp = date.getTime();

                return {
                    year: date.getFullYear(),
                    month: month,
                    weekStr: this.weekArr[week],
                    week: this.weekArr[week],
                    weekFullStr: "星期" + this.weekArr[week],
                    monthStr: this._processtime(month),
                    day: day,
                    dayStr: this._processtime(day),
                    hour: hour,
                    hourStr: this._processtime(hour),
                    min: min,
                    minStr: this._processtime(min),
                    second: second,
                    secondStr: this._processtime(second),
                    timestamp: timestamp
                };
            },
            viewport: {
                width: null, height: null
            },

            getUrl: function (url) {
                if (url.indexOf("http") >= 0 || url.indexOf("https") >= 0) {
                    return url;
                }
                var host = this.appConfig.host;
                if (!host) {
                    console.error("请在app.js中指定host属性");
                }

                host = $.trim(host);
                url = $.trim(url);
                if (host.substring(host.length - 1) == "/") {
                    host = host.substring(0, host.length - 1);
                }
                if (url.substring(0, 1) == "/") {
                    url = url.substring(1);
                }

                return host + "/" + url;
            },
            createStyleSheet: function (id, str) {
                if (document.getElementById(id)) {
                    return;
                }
                var style = document.createElement('style');
                style.type = 'text/css';
                style.id = id;
                style.innerHTML = str;
                document.getElementsByTagName('head')[0].appendChild(style);
            },
            timestampToDateInfo: function (timestamp) {
                var date;
                try {
                    timestamp = parseFloat(timestamp);
                    date = new Date(timestamp);
                } catch (e) {
                    date = new Date();
                }
                return this.getDateInfo(date);

            },
            timestampToTimeStr: function (timestamp) {
                var Re = "";
                try {
                    timestamp = parseFloat(timestamp);
                    var date = new Date(timestamp);
                    var now = new Date();
                    var time = now.getTime();
                    var dateInfo = this.getDateInfo(date);
                    var nowDateInfo = this.getDateInfo(now);
                    time = parseInt((time - timestamp) / 1000);
                    var s;
                    if (time < 10 * 1) {

                        Re = '刚刚';
                    } else if (10 * 1 < time && time < 60 * 1) {
                        Re = time + '秒前';
                    } else if ((time < 60 * 60) && (time >= 60 * 1)) {
                        s = Math.floor(time / 60);
                        Re = s + "分钟前";
                    } else if (nowDateInfo.year === dateInfo.year && nowDateInfo.day === dateInfo.day && nowDateInfo.month === dateInfo.month) {
                        Re = "今天 " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    }
                    else if (nowDateInfo.year === dateInfo.year) {
                        Re = dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    }
                    else {
                        Re = dateInfo.year + "-" + dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    }
                } catch (e) {

                }
                return Re;
            },
            _isBadAndroid: null,
            isBadAndroid: function () {
                if (this._isBadAndroid !== null) {
                    return this._isBadAndroid;
                }
                var appVersion = window.navigator.appVersion;
                if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
                    var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
                    if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
                        this._isBadAndroid = parseFloat(safariVersion[1]) < 535.19;
                    } else {
                        this._isBadAndroid = true;
                    }
                } else {
                    this._isBadAndroid = false;
                }
                return this._isBadAndroid;
            },
            processHTMLMethod2: function (str) {
                var test = $("<div></div>");
                test.html(str);
                var imageDoms = test.find("img");

                var originalText = test.html();

                imageDoms.replaceWith("");
                var curText = test.text();

                return {
                    originalText: originalText,
                    imageDoms: imageDoms,
                    curText: curText
                };
            },
            processHTML: function (str, callback) {
                var test = $("<div></div>");
                test.html(str);
                var imageDoms = test.find("img");


                var cloneDom = $("<div></div>");
                cloneDom.html(str);

                var cloneDoms = cloneDom.find("img");

                if (callback) {
                    callback(cloneDoms);
                    callback(imageDoms);
                }


                imageDoms.replaceWith("");
                var curText = test.text();

                return {
                    dom: cloneDom,
                    originalTextDom: test,
                    imageDoms: imageDoms,
                    curText: curText
                };
            },
            ajax: function (config) {
                var _this = this;
                var pageviewInstance = config.pageviewInstance;

                var beforeSendAjax = _this.appConfig.beforeSendAjax;
                if (beforeSendAjax) {
                    beforeSendAjax(config);
                }
                var ajaxConfig = {
                    type: config.type,
                    url: this.getUrl(config.url),
                    timeout: config.timeout || 7000,
                    data: config.data,
                    success: function (data) {
                        var responseMethod = _this.appConfig.onAjaxResponse;
                        if (responseMethod) {
                            responseMethod({isSuccess: true, data: data, config: config});
                        }

                        if (config.success) {
                            config.success(data);
                        }
                    },
                    error: function (e) {
                        var responseMethod = _this.appConfig.onAjaxResponse;
                        if (responseMethod) {
                            responseMethod({isSuccess: false, e: e, config: config, data: {code: -1000, msg: "服务器错误"}});
                        }
                        if (config.error) {
                            config.error(e);
                        }
                    }
                };
                if (config.contentType) {
                    ajaxConfig.contentType = config.contentType;
                    ajaxConfig.dataType = "json";
                } else {
                    ajaxConfig.contentType = "application/x-www-form-urlencoded";
                }
                $.ajax(ajaxConfig);
            },
            concat: function (baseConfig, part, namespace) {
                if (!namespace) {
                    console.error("合并页面配置的时候没有指定namespace");
                }
                baseConfig.components = baseConfig.components || {};
                for (var key in part) {
                    var real_key = namespace + key;
                    if (baseConfig.components[real_key]) {
                        console.error(real_key + " 已经存在原有的页面中 请不要重复控件的Key");
                    }
                    var com_config = part[key];
                    var com_root = com_config.root;
                    if (com_root) {
                        for (var i = 0, j = com_root.length; i < j; i++) {
                            com_root[i] = namespace + com_root[i];
                        }
                    }
                    baseConfig.components[real_key] = part[key];
                }
                return baseConfig;
            },
            getTransitionKeys: function () {
                if (translateKeys) {
                    return translateKeys;
                }
                var testStyle = document.createElement("DIV").style;
                var me = {};
                if ("-webkit-transform" in testStyle) {
                    me.transitionend = "webkitTransitionEnd";
                    me.transform = "-webkit-transform";
                    me.transition = "-webkit-transition";
                }
                else {
                    me.transitionend = "transitionend";
                    me.transform = "transform";
                    me.transition = "transition";
                }
                translateKeys = me;
                return me;
            },
            baseSize: {width: 375, height: 667},
            getRealWidth: function (wv) {
                wv = parseInt(wv);
                var bl = (this.viewport.width / this.baseSize.width);
                // bl = bl<1?1:bl;
                bl = bl > 1.5 ? 1.5 : bl;
                if (this.viewport.width > 1000) {
                    bl = 1;
                }
                return parseInt((bl) * wv);
            },
            getRealHeight: function (hv) {
                hv = parseInt(hv);
                var bl = (this.viewport.height / this.baseSize.height);
                bl = bl < 1 ? 1 : bl;
                bl = bl > 1.5 ? 1.5 : bl;
                return parseInt((bl) * hv);
            },
            _initScrennSize: function () {
                if (!this.viewport.width) {
                    this.viewport.width = window.screen.width > 700 ? document.body.offsetWidth : window.screen.width;
                    if (window.screen.width > 700) {
                        this.viewport.height = document.body.offsetHeight;
                    } else {
                        this.viewport.height = window.screen.height;
                    }
                }

            },
            processStyle: function (style, screenSize) {
                style = this.clone(style);
                this._initScrennSize();
                if (!screenSize) {
                    screenSize = this.viewport;
                }

                style = style || {};
                for (var key in style) {
                    var val = style[key].toString();
                    if (keyDict[key]) {
                        var val_arr = val.split(" ");
                        if (key == "fs") {
                            style.fontSize = parseInt(val) + "px";
                            delete style.fs;
                        } else if (key == "w") {
                            delete style.width;
                            delete style.height;
                            style.height = style.width = convertAdaptationValueByWidth(style.w, screenSize) + "px";
                            delete style.w;
                        } else {
                            style[key] = processStyleValue(key, val_arr, screenSize, style);
                        }
                    }
                }
                return style;
            },

            processPageConfig: function (pageConfig) {
                var BaseSize;
                if (!this.viewport.width) {
                    this._initScrennSize();
                }
                if (pageConfig.showPageStyle) {
                    var s_w = pageConfig.showPageStyle.width || "100%";
                    var s_h = pageConfig.showPageStyle.height || "100%";
                    s_w = s_w.toString();
                    s_h = s_h.toString();
                    if (s_w.substring(s_w.length - 1) == "%") {
                        s_w = parseInt(s_w) / 100 * this.viewport.width;
                    } else {
                        s_w = parseInt(s_w) * this.viewport.width;
                    }

                    if (s_h.substring(s_h.length - 1) == "%") {
                        s_h = parseInt(s_h) / 100 * this.viewport.height;
                    } else {
                        s_h = parseInt(s_h) * this.viewport.height;
                    }
                    BaseSize = {width: s_w, height: s_h};
                } else {
                    BaseSize = this.viewport;
                }
                if (pageConfig.style) {
                    pageConfig.style = this.processStyle(pageConfig.style, BaseSize);
                }
                if (pageConfig.components) {
                    for (var key in pageConfig.components) {
                        var com_config = this.clone(pageConfig.components[key]);
                        for (var attrKey in com_config) {
                            if (attrKey.length >= 5) {
                                if (attrKey.substring(attrKey.length - 5).toUpperCase() == "STYLE") {
                                    com_config[attrKey] = this.processStyle(com_config[attrKey], BaseSize);
                                }
                            }
                        }
                        pageConfig.components[key] = com_config;
                    }
                }
                return pageConfig;
            },
            setPageConfigByPagePath: function (pagePath, pageConfig) {
                if (!pageConfig.isNoAdaptScreen) {
                    pageConfig = this.processPageConfig(pageConfig);
                }
                pageConfigDict[pagePath] = pageConfig;
                return pageConfig;
            },
            getPageConfigByPagePath: function (pagePath) {
                return pageConfigDict[pagePath];
            },
            getComponentInstance: function (com_type) {
                return componentClassDict[com_type];
            },
            customerComponents: {},
            getComponentClass: function (config, success, error) {
                var type = config.type;
                var com_class = componentClassDict[type];
                if (com_class) {
                    success(com_class);
                    return;
                }
                var com_path = Re.customerComponents[type];
                if (com_path) {

                } else {
                    com_path = "../../components/" + type.toLowerCase();
                }
                require([com_path],
                    function (comClass) {
                        componentClassDict[type] = comClass;
                        success(comClass);
                    },
                    function () {
                        error(config);
                    });

            },
            clone: function (json) {
                var json_str = JSON.stringify(json);
                return JSON.parse(json_str);
            },
            getClassByStyle: function (css) {
                var Re = [];
                for (var key in css) {
                    var prefix = keys[key];

                    if (prefix) {
                        var value = css[key];
                        Re.push(prefix + value);
                    }
                }
                return Re;
            },
            css: function (com, cssobj, isAdapte) {
                if (!cssobj) {
                    return;
                }
                var Re = this.getClassByStyle(cssobj);
                if (Re.length > 0) {
                    com.addClass(Re.join(" "));
                }
                if (isAdapte) {
                    cssobj = this.processStyle(cssobj);
                }
                com.css(cssobj);
            },
            simpleExtendObj: function (obj1, obj2) {
                obj1 = obj1 || {};
                obj2 = obj2 || {};
                for (var key in obj2) {
                    obj1[key] = obj2[key];
                }
                return obj1;
            },
            processTransitionStyle: function (transition) {
                return {
                    transition: transition,
                    "-webkit-transition": transition
                };
            },
            processTransformStyle: function (transform) {
                return {
                    transform: transform,
                    "-webkit-transform": transform,
                };
            },
            //transition:"transform .2s ease",transform:"translate3d(0,0,0)"
            processTransitionTanformStyle: function (transition, transform) {
                return {
                    // transition:transition,
                    "-webkit-transition": transition,
                    // transform:transform,
                    "-webkit-transform": transform,
                };
            },
            addDay: function (date, count) {
                date = this.convertToDate(date);
                return new Date(date.setDate(date.getDate() + count));//获取AddDayCount天后的日期
            },
            compareDate: function (date1, date2, formartStr) {
                formartStr = formartStr || "yyyy-MM-dd";
                date1 = this.ConvertDateToStr(date1, formartStr);
                date2 = this.ConvertDateToStr(date2, formartStr);
                return this.compareTime(date1, date2);
            },
            compareTime: function (date1, date2) {
                date1 = this.convertToDate(date1);
                date2 = this.convertToDate(date2);
                if (date1 > date2) {
                    return 1;
                }
                if (date1 - date2 === 0) {
                    return 0;
                }
                return -1;
            },

            deleteEmoji: function (str) {
                return str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            },

            copy: function (from, to) {
                // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object-in-javascript
                if (from === null || from === undefined || typeof from != "object") return from;
                if (from.constructor != Object && from.constructor != Array) return from;
                if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean) return new from.constructor(from);

                to = to || new from.constructor();

                for (var name in from) {
                    to[name] = typeof to[name] == "undefined" ? this.copy(from[name], null) : to[name];
                }

                return to;
            },
            extends: function (subClass, baseClass) {
                //http://www.codeproject.com/Articles/303796/How-to-Implement-Inheritance-in-Javascript
                function inheritance() {}

                inheritance.prototype = baseClass.prototype;
                subClass.prototype = new inheritance();
                subClass.prototype.constructor = subClass;
                subClass.baseConstructor = baseClass;
                subClass.superClass = baseClass.prototype;
            },
            isEmail: function (str) {
                var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!isemail.test(str)) {
                    return false;
                } else {
                    return true;
                }
            },
            // 座机
            isPhone: function (para) {
                if (!para) {
                    return "请输入手机号";
                }
                var phone_area = /^0\d{2,3}-?\d{7,8}$/;
                var phone_noarea = /^\d{7,8}$/;
                if (!phone_area.test(para) || !phone_noarea.test(para)) {
                    return false;
                } else {
                    return true;
                }
            },
            // 手机
            isMobile: function (para) {
                if (!para) {
                    return "请输入手机号";
                }
                var mobile = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;

                if (!mobile.test(para)) {
                    return false;
                } else {
                    return true;
                }
            },
            // 是否超链接
            isRealURL: function (url) {
                var url_express = /(^(https?:\/\/)?(\w+\.)+[a-zA-Z]+$)/;
                if (url_express.test(url)) {
                    return true;
                }
                return false;
            }
        };
        return Re;
    });
