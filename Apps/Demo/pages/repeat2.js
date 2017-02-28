define(["../logic/repeat2"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
          backgroundColor:"#f0f3f4"
        },
        root:["page_header","content_wrapper"],
        components:{
            page_header:{
                type:"view",
                root:["backIcon","header_title"],
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
            header_title:{
                type:"text",
                style:{
                  fontSize:14
                },
                text:"Repeat控件"
            },
            right_icon:{
                type:"icon",
                font:"icomoon_e90e",
                style:{
                    position:"absolute",
                    right:"10px",
                    color:"rgb(0, 147, 255)",
                    top:"6px",
                    width:"30px",
                    height:"30px",
                },
                iconStyle:{
                    fontSize:"20px"
                }
            },
            content_wrapper:{
              type:"view",
              style:{
                flex:1,
                overflowY:"auto"
              },
              root:["repeat"]
            },
            repeat:{
                type:"repeat",
                className:"demo-repeat-2",
                root:["repeat_icon","rp_right_icon"],
                items:[
                    {label:"页面导航示例",icon:"FontAwesome_f0f6"},
                    {label:"Text",icon:"FontAwesome_f0f6"},
                    {label:"Repeat",icon:"FontAwesome_f01e"},
                    {label:"Button",icon:"FontAwesome_f205"},
                    {label:"ViewPager",icon:"FontAwesome_f076"},
                    {label:"Popover",icon:"icomoon_e900"},
                    {label:"PopLayer",icon:"icomoon_e900"},
                    {label:"ConditionSelector",icon:"FontAwesome_f290"},
                    {label:"Calendar",icon:"FontAwesome_f073"}
                  ],
                style:{
                  backgroundColor:"#fff",
                  flexDirection:"column",
                  borderBottom:"1px solid #e2e8ed",
                },
                itemStyle:{
                  backgroundColor:"#fff",
                  padding:"6px 0px",
                  flexDirection:"row",
                },
                splitStyle:{
                    borderTop:"1px solid #e2e8ed",
                    marginLeft:"40px",
                    transform:"scaleY(.5)"
                },
            },
            rp_right_icon:{
              type:"icon",
              iconStyle:{
                fontSize:14
              },
              style:{
                width:"30px",
                height:"30px"
              },
              font:"icomoon_e913"
            },
            repeat_icon:{
              type:"icon",
              font_bind:"icon",
              text_bind:"label",
              textStyle:{
                marginLeft:"8px",
                color:"#8899a6",
                fontSize:"14px"
              },
              textPos:"right",
              style:{
                flex:1,
                width:"130px",
                marginLeft:"7px",
                height:"30px",
                justifyContent:"flex-start"
              },
              iconStyle:{
                fontSize:"22px",
                marginLeft:4,
                width:30,
                color:"#8899a6"
              }
            }
          }

    };
});
