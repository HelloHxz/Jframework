define([],function(){
    function pageLogic(config){
      this.seed = 0;
      this.pageview = config.pageview;

    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        right_icon_click:function(sender,params){
            this.pageview.go("page2",{id:"192837221"});
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        ConditionSelector_menu1_loaddata:function(sender,params){
          var successCallback = params.success;
          var errorCallback = params.error;
          var _this = this;
          var data = [
            {"name":"全部","id":1,"group":"sss"},
            {"name":"用户体验部门","id":1,"group":"sss"},
            {"name":"产品中心团队","id":1,"group":"sss"},
            {"name":"协同事业部深圳研发团队","id":1,"group":"sss"},
            {"name":"产品中心团队","id":1,"group":"sss"},
            {"name":"用户研发部","id":1,"group":"sss"},
            {"name":"产品研发部","id":1,"group":"sss"},
          ];
          window.setTimeout(function(){
            //模拟网路请求失败
            if(_this.seed ===0){
              errorCallback();
              _this.seed +=1;
            } else{
              successCallback(data);
            }
          },1000);
        },
        ConditionSelector_menu0_loaddata:function(sender,params){
          var successCallback = params.success;
          var errorCallback = params.error;
          var data = [
            {"name":"用户体验部门","id":1,"group":"sss"},
            {"name":"产品中心团队","id":1,"group":"sss"},
            {"name":"协同事业部深圳研发团队","id":1,"group":"sss"},
            {"name":"产品中心团队","id":1,"group":"sss"},
            {"name":"用户研发部","id":1,"group":"sss"},
            {"name":"产品研发部","id":1,"group":"深圳"},
            {"name":"北京产品研发部","id":1,"group":"北京"},
            {"name":"北京产品研发部","id":1,"group":"北京"},
            {"name":"广州产品中心团队","id":1,"group":"广州"},
            {"name":"广州用户体验部门","id":1,"group":"广州"},
            {"name":"产品研发部","id":1,"group":"sss"},
          ];
          window.setTimeout(function(){
            successCallback(data);
          },1000);
        },
        ConditionSelector_menu2_loaddata:function(sender,params){
          var successCallback = params.success;
          var errorCallback = params.error;
          var data = [
            {"name":"用户体验部门","id":1,"group":"深圳"},
            {"name":"产品中心团队","id":1,"group":"深圳"},
            {"name":"协同事业部深圳研发团队","id":1,"group":"深圳"},
            {"name":"产品中心团队","id":1,"group":"深圳"},
            {"name":"用户研发部","id":1,"group":"深圳"},
            {"name":"产品研发部","id":1,"group":"深圳"},
            {"name":"北京产品研发部","id":1,"group":"北京"},
            {"name":"北京产品研发部","id":1,"group":"北京"},
            {"name":"广州产品中心团队","id":1,"group":"广州"},
            {"name":"广州用户体验部门","id":1,"group":"广州"},
            {"name":"广州用户研发部","id":1,"group":"广州"},
            {"name":"北京用户研发部","id":1,"group":"北京"},
            {"name":"北京产品中心团队","id":1,"group":"北京"},
            {"name":"上海产品中心团队","id":1,"group":"上海"},
            {"name":"上海用户研发部","id":1,"group":"上海"},
            {"name":"上海产品中心团队","id":1,"group":"上海"},
            {"name":"其它产品中心团队","id":1,"group":"其它"},
            {"name":"其它用户研发部","id":1,"group":"其它"},
            {"name":"其它产品中心团队","id":1,"group":"其它"},
          ];
          window.setTimeout(function(){
            successCallback(data);
          },1000);
        }

    };
    return pageLogic;
});
