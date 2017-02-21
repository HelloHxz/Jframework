define(["../../../components/calendarpicker"],function(calendarpicker){
    function pageLogic(config){
      this.pageview = config.pageview;
      this.importantdata=[{id:"1","label":"非常重要"},
                   {id:"2","label":"重要"},
                   {id:"3","label":"不重要"},
                   {id:"4","label":"非常不重要"}];
    }
    pageLogic.prototype = {
        right_icon_click:function(sender,params){
        },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        },
        starttime_init:function(sender){
          this.starttime = sender;
        },
        checklist_init:function(sender){
          this.checklist = sender;

        },
        checklist_selected:function(sender,params){
          var Re = [];
          for(var i=0,j=params.selectedValue.length;i<j;i++){
            Re.push(params.selectedValue[i].text);
          }
          this.sourcevalue.setText(Re.join(","));
        },
        radiolist_loaddata:function(sender,params){
         var successCallback = params.success;
         var errorCallback = params.error;
         successCallback(this.importantdata);
        },
        proj_open_switch_change:function(sender,params){
          var value = params.value;
          sender.setValue(value);
        },
        proj_open_switch_init:function(sender,params){
          this.proj_open_switch = sender;
        },
        checklist_loaddata:function(sender,params){
          var data =[{id:"1","text":"交互设计"},
                     {id:"2","text":"视觉设计"},
                     {id:"3","text":"H5前端开发"},
                     {id:"4","text":"Android原生开发"},
                     {id:"5","text":"IOS原生开发"},
                     {id:"6","text":"Client桌面开发"},
                     {id:"7","text":"后台Java开发"}];
          var successCallback = params.success;
          var errorCallback = params.error;
          window.setTimeout(function(){
            successCallback(data);
          },1100);
        },
        radiolist_init:function(sender,params){
          this.radiolist = sender;
          var defaultSelectedData = this.importantdata[0];
          this.radiolist.setSelectedValue([defaultSelectedData]);
        },
        radiolist_selected:function(sender,params){
          this.importantvalue.setText(params.selectedValue[0].label);
        },
        importantvalue_didmount:function(sender,params){
          this.importantvalue = sender;
          var defaultSelectedData = this.importantdata[0];
          this.importantvalue.setText(defaultSelectedData.label);
        },
        importantvalue_click:function(sender,paramas){
          this.radiolist.show();
        },
        sourcevalue_init:function(sender,params){
          this.sourcevalue = sender;
        },
        sourcevalue_click:function(sender,params){
            this.checklist.show();
        },
        starttime_click:function(sender,params){
          var _this = this;
          if(!this.calendarPicker){
            this.calendarPicker = new calendarpicker({
              wrapper:this.pageview.innerWrapper,
              ok:function(re){
                _this.starttime.setText(re.dateStr);
              }
            });
          }
          this.calendarPicker.show(sender.text);
        },
    };
    return pageLogic;
});
