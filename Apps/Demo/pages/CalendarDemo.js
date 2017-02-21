define(["../logic/CalendarDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","page_content"],
        components:{
            page2_header:{
                type:"view",
                root:["backIcon","right_icon","header_title"],
                style:{
                    height:"44px",
                    borderBottom:"1px solid #e2e8ed",
                    backgroundColor:"#fff",
                    justifyContent:"center",
                    alignItems:"center"
                }
            },
            backIcon:{
              type:"icon",
              text:"返回",
              style:{
                position: "absolute",
                left: "0px",
                color: "rgb(0, 147, 255)",
                top: "7px",
                width: "50px",
                height: "30px",
              },
              textStyle: {
                fontSize: "15px"
              }
            },
            right_icon:{
              type:"icon",
              text:"今天",
              style:{
                position: "absolute",
                right: "0px",
                color: "rgb(0, 147, 255)",
                top: "7px",
                width: "50px",
                height: "30px",
              },
              textStyle: {
                fontSize: "15px"
              }
            },
            header_title:{
                type:"text",
                text:"日历",
                style:{
                  fontSize:14
                }
            },
            page_content:{
              type:"view",
              root:["calendar","showclendarIcon"],
              style:{
                flex:1
              }
            },
            calendar:{
              type:"calendar",
              itemHeight:36
            },
            showclendarIcon:{
              type:"icon",
              style:{
                marginTop:10
              },
              text:"点击显示日历"
            }


        }
    };
});
