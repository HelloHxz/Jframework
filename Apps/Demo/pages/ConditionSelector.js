define(["../logic/ConditionSelector"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","contentWrapper"],
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
                fontSize: "14px"
              }
            },
            header_title:{
                type:"text",
                text:"ConditionSelector",
                style:{
                  fontSize:14
                }
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
            contentWrapper:{
              type:"view",
              root:["ConditionSelector"],
              style:{flex:1,backgroundColor:"#f0f4f6"}
            },
            ConditionSelector:{
              type:"conditionselector",
              style:{
                backgroundColor:"#fff",
                borderBottom:"1px solid #e2e8ed"
              },
              items:["按距离","按分类","按销售"],
              menu1LabelKey:"name",
              menu0LabelKey:"name",
              menu2LabelKey:"name",
              menu0Mode:"multi",
              menu2Mode:"group",
              menu2GroupKey:"group",
              menu2LeftStyle:{
                width:90,
              },
              menu1Style:{
                maxHeight:400
              },
              menu2Style:{
                bottom:0
              },
              menu0Style:{
                maxHeight:300
              },
              menu0Col:2
            }
        }
    };
});
