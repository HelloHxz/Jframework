require.config({
    waitSeconds:0,
    baseUrl:"./",
    shim: {
      $:{
          exports: 'zepto'
      }
    },
    paths: {
        $:"../../libs/zepto",
        md5:"../../libs/md5",
        utils:"../../js/utils",
        base:"../../components/base",
        pageview:"../../components/pageview",
        pm:"../../js/pageViewManager",
        swiper:"../../components/swiper",
        calendar:"../../../components/calendar",
        tip:"../../components/tip"
    }
});



require(["app","pm","$"], function(app,PM,$){
    if(!app.init){
        console.error("app.js 未提供init方法");
    }
    app.init(PM);
});
