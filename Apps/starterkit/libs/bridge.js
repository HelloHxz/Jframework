var Brigdge=function(root){
    var ua = window.navigator.userAgent;
    //桥接器的命名空间
    var ns = {
        _initialized: false,
        // 探测操作系统浏览器
        ios: (/iPhone|iPad|iPod/i).test(ua),
        android: (/Android/i).test(ua),
        // 由于桥的初始化需要时间，不知道是否已经ok，这适用于在开始就要执行的bridge函数
        // 桥接器的ready函数，只在初始化的时候才调用，先把回调函数都追加到一个列表中
        readycallback:[],//readycallback缓存调用函数的数组

    };

    // 构造一个回调函数
    var wrapMethod = function(data){
        // 第一个参数为原生功能调用完成的callback，经常用
        // 第二个参数为原生功能在使用过程中需要调用的回调

        var ret = function(callback, parameters, bridgeCallback) {
            if (ns._initialized) {
                if(!callback) {
                    // the default callback to fullfill bridge's requirement
                    callback = function(responseData){ };
                }
                if(typeof callback === 'object') {
                    parameters = callback;
                    callback = function (responseData) {};
                }
                // 检查是否有回调函数
                if (bridgeCallback && typeof(bridgeCallback) == 'function' && data.parameters && data.parameters.callback) {
                    var fn = data.parameters.callback;
                     //把window对象上注册的函数注册进原生
                    root.WebViewJavascriptBridge.registerHandler(fn, bridgeCallback);
                }
                //兼容老的导航
                if (bridgeCallback && typeof(bridgeCallback) == 'function' ) {
                    bridgeCallback(root.WebViewJavascriptBridge);
                }
                // 检查额外的参数，并且合并
                if (parameters && typeof(parameters) === 'object') {
                    if (data.parameters) {
                        // 合并参数
                        for( var key in parameters) {
                            data.parameters[key] = parameters[key];
                        }
                    } else {
                        data.parameters = parameters;
                    }
                }
                root.WebViewJavascriptBridge.send(JSON.stringify(data), function (responseData) {
                    //转换为js对象
                    callback(JSON.parse(responseData));
                });
            } else {
                //缓存回调
                ns.readycallback.push({func:ret,args:arguments});
                console.log("js bridge has not been initialized yet.");
            }
        };
        return ret;
    };
    // generate function in the namespace
    var generator = function(ns) {
        // 定义桥调用协议
        var methods = {
            //native客户端接口
            client:{
                //隐藏头部导航
                "hiddenMenu" : {
                    function: 'hiddenMenu'
                },
                //关闭webview
                "closePage": {
                    function: 'closePage'
                },
                //设置企业空间标题
                "setHeader": {
                    function: 'navRightItemList'
                },
                //扫码一次
                "scanQRCode": {
                    function: 'scanQRCode',
                    parameters: {
                        type: 0,
                        callback: 'scanQRCodeCallback'
                    }
                },
                //连续扫码
                "scanQRCodeMore": {
                    function: 'scanQRCode',
                    parameters: {
                        type: 1,
                        callback: 'scanQRCodeCallback'
                    }
                },
                //打开新的窗口
                "openWindow": {
                    function:'openWindow'
                },
                "selectDate":{
                    function:'selectDate'
                },
                "selectList":{
                    function:'selectList'
                },
                "selectAttachment":{
                    function:'selectAttachment'
                },
                "selectCity":{
                    function:'selectCity'
                },
                "selectMap":{
                    function:'selectMap'
                },
                "copyText":{
                    function:'copyText'
                },
                "configNavigationBar":{
                    function:'configNavigationBar'
                },
                "share":{
                    function:'share'
                },
                "viewOrDeleteImage":{
                    function:'viewOrDeleteImage'
                },
                "viewImage":{
                    function:'viewImage'
                },
            },
            //企业相关信息接口
            enterprise:{
                "openApp":{
                    function:'openAPP'
                },
                "selectContacts":{
                    function:'selectContacts'
                },
                "callUer":{
                    function:'callUer'
                },
                "bindPhone":{
                    function:'bindPhone'
                },
                "feedReply":{
                    function:'feedReply'
                },

                "sendMemail":{
                    function:'sendMemail'
                },
                "sendMessage":{
                    function:'sendMessage'
                },
                "callUsers":{
                    function:'callUsers'
                },
                "selectGroup":{
                    function:'selectGroup'
                },
                "processAt":{
                    function:'processAt'
                },
                "viewUser":{
                    function:'viewUser'
                },
                "openChatWindow":{
                    function:'openChatWindow'
                },
                "createFeed":{
                    function:'createFeed'
                },
                "previewFile":{
                    function:'previewFile'
                },
                "viewTaskLog":{
                    function:'viewTaskLog'
                },
                "viewTaskUser":{
                    function:'viewTaskUser'
                },
                "createOredit":{
                    function:'createOredit'
                },
                "taskComment":{
                    function:'taskComment'
                },
                "feedDataUpdate":{
                    function:'feedDataUpdate'
                }
            }
        };
        // 根据方法定义生成方法
        for (var category in methods) {
            ns[category] = {};
                for (var method in methods[category]) {
                    var data = methods[category][method];
                    ns[category][method] = wrapMethod(data);
                }

            }
        // other special method
    };
    // 初始化函数
    var connectWebViewJavascriptBridge = function(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    };
    // 初始化JS Bridge
    connectWebViewJavascriptBridge(function(bridge){
        bridge.init(function(message, responseCallback) {});
        // 确保桥接器绑定到window对象
        if(!root.WebViewJavascriptBridge) {
            root.WebViewJavascriptBridge = bridge;
        }
        // 如果有延迟执行回调的情况，执行它
        ns._initialized = true; // 标识为已经初始化
        // 生成函数
        if(ns.readycallback) {
            ns.readycallback.forEach(function(cb){
                if(cb.args.length==0){
                    cb.func();
                }else if(cb.args.length==1){
                    cb.func(cb.args[0]);
                }else if(cb.args.length==2){
                    cb.func(cb.args[0],cb.args[1]);
                }else if(cb.args.length==3){
                    cb.func(cb.args[0],cb.args[1],cb.args[2]);
                }

            });
            ns.readycallback=[]; // 执行完清理掉
        }

    });
    generator(ns);
    // bind methos to window's yyesn object
    root.yyesn = ns;
    //
    return ns;
};
Brigdge(window);
