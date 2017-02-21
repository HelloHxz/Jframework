define(["../logic/TextDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","viewcontent"],
        components:{
            page2_header:{
                type:"view",
                root:["backIcon","right_icon","header_title"],
                style:{
                    height:"44px",
                    zIndex:"10",
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
                text:"文本",
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
            viewcontent:{
              type:"view",
              style:{
                flex:1,
                backgroundColor:"#fff"
              },
              root:["text_1","text_2","text_3"]
            },
            text_3:{
                type:"text",
                numberofline:2,
                style:{
                    marginTop:20,
                    fontSize:13
                },
                text:"长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本"
            },
            text_2:{
                type:"text",
                text:"100",
                nextTextStyle:{
                    color:"gray",
                    fontSize:12,
                    marginLeft:3
                },
                nextText:"元",
                style:{
                    marginTop:20,
                },
                textStyle:{
                    color:"green"
                },
                preText:"&#165;",
                preTextStyle:{
                    color:"red",
                    fontSize:12
                }
            },
            text_1:{
              type:"text",
              text:"下拉一下",
              style:{
                marginTop:5,
                textIndent:4,
                paddingBottom:5,
                fontSize:13,
                color:"#999999",
                borderBottom:"1px solid #f3f4f5"
              }
            }

        }
    };
});
