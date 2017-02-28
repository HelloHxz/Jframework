define(["utils"], function(utils) {
    return {
        init: function(PM) {
            PM.start({

                host: "http://xx.xx.xx.xx:7004/clist/",
                customerComponents: {

                },
                root: "index",
                baseSize: {
                    width: 375,
                    height: 667
                },
                beforeSendAjax: function(config) {
                },
                beforeGo: function(config) {

                },
                onAjaxResponse: function(params) {

                },
                routerChange: function(arg) {
                
                }
            });

        }
    };
});
