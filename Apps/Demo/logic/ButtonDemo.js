define([],function(){


  var tipConfigs = [
    {
      text:"操作成功",
      font:"FontAwesome_f00c",
      textPos:"right",
      duration:2000,
      pos:"top",
      // clickNoHide:true,
      textStyle:{
        marginLeft:5
      },
      iconStyle:{
        w:30,
        fontSize:18,
        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      },
      style:{
        width:"100%",
        height:40
      }
    },{
      text:"验证码错误,请重新输入",
      withoutBackCover:true,
      duration:1000,
      style:{
        width:200
      }
    },{
      text:"操作失败",
      font:"icomoon_e901",
      textStyle:{
        marginTop:4
      },
      iconStyle:{
        fontSize:33,
        borderRadius:"100%",
        color:"red"
      }
    },{
      text:"操作成功",
      textStyle:{
          marginTop:5
      },
      font:"FontAwesome_f00c",
      iconStyle:{
        w:30,
        fontSize:18,
        borderRadius:"100%",
        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      }
    },{
      text:"操作成功",
      textStyle:{
          marginTop:5
      },
      duration:2000,
      font:"FontAwesome_f00c",
      iconStyle:{
        w:30,
        fontSize:18,
        borderRadius:"100%",
        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      }
    },{
      text:"操作成功",
      pos:"top",
      textStyle:{
          marginLeft:5
      },
      textPos:"right",
      duration:2000,
      font:"FontAwesome_f00c",
      iconStyle:{
        w:30,
        fontSize:18,
        borderRadius:"100%",
        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      }
    },{
      text:"操作成功",
      pos:"bottom",
      textStyle:{
          marginLeft:5
      },
      textPos:"right",
      duration:2000,
      font:"FontAwesome_f00c",
      style:{
        height:32
      },
      iconStyle:{
        w:22,
        fontSize:14,

        backgroundColor:"rgb(15,198,96)",
        color:"#fff"
      }
    }
  ];


    function pageLogic(config){
      this.pageview = config.pageview;
    }
    pageLogic.prototype = {
        // right_icon_didmount:function(sender){
        // },
        right_icon_click:function(sender,params){
            this.pageview.go("page2",{id:"192837221"});
        },
        page2_btn1_click:function(){
          var seed = parseInt(parseInt(Math.random()*600000)%6);
          console.log(seed);
          this.pageview.showTip(tipConfigs[seed]);
        },
        page2_btn2_click:function(sender){
          this.pageview.showTip(tipConfigs[3]);
        },
        page2_btn6_click:function(){
            alert("s");
        },
        page2_btn3_click:function(sender){
            this.pageview.showTip(tipConfigs[5]);
          },
           page2_btn4_click:function(sender){
              this.pageview.showTip(tipConfigs[1]);
            },
            page2_btn5_click:function(sender){
                this.pageview.showTip(tipConfigs[6]);
              },
        backIcon_click:function(sender,params){
          this.pageview.goBack();
        }
    };
    return pageLogic;
});
