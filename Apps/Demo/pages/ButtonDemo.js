define(["../logic/ButtonDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },

        root:["page2_header","page2_btn1","page2_btn2","page2_btn4","page2_btn5","page2_btn3","page2_btn6"],
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
            header_title:{
                type:"text",
                text:"Button控件",
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
            page2_btn1:{
                type:"button",
                title:"Button",
                style:{
                    margin:"10px auto",
                    width:"130px"
                }
            },
            page2_btn2:{
                type:"button",
                text:"Click Me",
                style:{
                    margin:"10px auto",
                    border:"1px solid red",
                    color:"red"
                }
            },
            page2_btn3:{
                type:"button",
                text:"点击",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    margin:"10px auto",
                    borderRadius:"15px"
                }
            },
            page2_btn4:{
                type:"button",
                text:"点击",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    w:50,
                    borderRadius:25,
                    margin:"10px auto"
                }
            },
            page2_btn5:{
                type:"button",
                text:"点击",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    margin:"10px auto",
                    height:40,
                    width:100
                }
            },
            page2_btn6:{
                type:"button",
                text:"点击",
                style:{
                    borderRadius:0,
                    borderColor:"#eee",
                    borderLeftWidth:0,
                    fontSize:15,
                    borderRightWidth:0,
                    height:43,
                    marginTop:"10px",
                    width:"100%"
                }
            }
        }
    };
});
