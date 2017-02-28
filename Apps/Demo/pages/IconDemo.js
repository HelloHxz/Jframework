define(["../logic/IconDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },

        root:["paga_header","page_content"],
        components:{
            paga_header:{
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
            page_content:{
              type:"view",
              style:{
                flex:1,
                overflow:"auto"
              },
              root:["Icon1","Icon2","Icon3","Icon4","Icon5","Icon6","Icon7","Icon8","Icon9"]
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
                text:"Icon控件",
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
            Icon1:{
                type:"icon",
                text:"文本",
                font:"FontAwesome_f1b3",
                style:{
                    margin:"10px auto",
                    width:"130px"
                },
                textStyle:{
                  color:"#333",
                  marginLeft:5
                },
                iconStyle:{
                  color:"green"
                }
            },
            Icon2:{
                type:"icon",
                text:"Click Me",
                font:"FontAwesome_f1b3",
                textStyle:{
                  marginLeft:4
                },
                style:{
                    margin:"10px auto",
                    borderRadius:4,
                    padding:"4 8",
                    border:"1px solid red",
                    color:"red"
                }
            },
            Icon3:{
              type:"icon",
              text:"文本",
              textPos:"bottom",
              font:"FontAwesome_f1b3",
              style:{
                  margin:"10px auto",
                  width:"130px",
                  color:"#333"
              }
            },
            Icon4:{
              type:"icon",
              text:"文本",
              textPos:"left",
              font:"FontAwesome_f1b3",
              textStyle:{
                marginRight:4
              },
              style:{
                  margin:"10px auto",
                  width:"130px",
                  color:"#333"
              }
            },
            Icon5:{
              type:"icon",
              text:"文本",
              textPos:"top",
              font:"FontAwesome_f1b3",
              style:{
                  margin:"10px auto",
                  width:"130px",
                  color:"#333"
              }
            },
            Icon6:{
              type:"Icon",
              font:"FontAwesome_f1b3",
              style:{
                  margin:"10px auto",
                  color:"#fff"
              },
              iconStyle:{
                w:54,
                display:"flex",
                borderRadius:27,
                backgroundColor:"blue",
                fontSize:20,
                justifyContent:"center",
                alignItems:"center",
              }
            },
            Icon7:{
              type:"Icon",
              font:"FontAwesome_f1b3",
              style:{
                  margin:"10px auto",
              },
              text:"文本",
              textPos:"bottom",
              textStyle:{
                marginTop:5,
                color:"#333"
              },
              iconStyle:{
                color:"#fff",
                w:54,
                display:"flex",
                borderRadius:27,
                backgroundColor:"blue",
                fontSize:20,
                justifyContent:"center",
                alignItems:"center",
              }
            },
            Icon8:{
              type:"Icon",
              src:"http://img02.tooopen.com/images/20160316/tooopen_sy_156105468631.jpg",
              defaultSrc:"./imgs/1.jpg",
              style:{
                  margin:"10px auto",
              },
              text:"文本",
              textPos:"bottom",
              textStyle:{
                marginTop:5,
                color:"#333"
              },
              iconStyle:{
                color:"#fff",
                w:54,
                overflow:"hidden",
                display:"flex",
                borderRadius:27,
                backgroundColor:"blue",
                fontSize:20,
                justifyContent:"center",
                alignItems:"center",
              }
            },
            Icon9:{
              type:"Icon",
              src:"http://img02.tooopen.com/images/20160316/xxxxxxxxx.jpg",
              title:"失败",
              style:{
                  margin:"10px auto",
              },
              text:"文本",
              textPos:"bottom",
              textStyle:{
                marginTop:3,
                color:"#333"
              },
              iconStyle:{
                color:"#fff",
                w:54,
                overflow:"hidden",
                display:"flex",
                borderRadius:27,
                backgroundColor:"blue",
                fontSize:20,
                justifyContent:"center",
                alignItems:"center",
              }
            },


        }
    };
});
