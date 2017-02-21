define(["../logic/poplayerDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","page2_btn2","page2_btn3","sharePoplayer","poplayerOne"],
        components:{

            page2_btn3:{
                type:"button",
                title:"Click Me"
            },


            poplayerOne:{
                type:"poplayer",
                mode:"bottom",
                bkCoverStyle:{
                    backgroundColor:"rgba(0, 0, 0, 0.63)"
                },
                style:{
                    width:"100%",
                    backgroundColor:"#f0f4f6",
                    flexDirection:"column"
                },
                root:["poplayerOne_btn","poplayerOne_btn1","poplayerOne_btn2"]
            },
            poplayerOne_btn:{
                type:"text",
                style:{
                    height:45,
                    backgroundColor:"#fff",
                    justifyContent:"center"
                },
                text:"删除"
            },
            poplayerOne_btn1:{
                type:"text",
                text:"确定",
                style:{
                    height:45,
                    color:"red",
                    borderTop:"1px solid #eee",
                    backgroundColor:"#fff",
                    justifyContent:"center"
                }
            },
            poplayerOne_btn2:{
                type:"text",
                text:"取消",
                style:{
                    height:45,
                    marginTop:10,
                    backgroundColor:"#fff",
                    justifyContent:"center"
                }
            },












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
                text:"Poplayer"
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
            sharePoplayer:{
              type:"poplayer",
              root:["shareTitleWrapper","shareMidWrapper","cancelIcon"],
              mode:"bottom",
              bkCoverStyle:{
                backgroundColor:"rgba(0, 0, 0, 0.63)"
              },
              style:{
                height:260,
                width:"100%",
                backgroundColor:"#f0f4f6",
                flexDirection:"column"
              }
            },
            shareTitleWrapper:{
              type:"view",
              style:{
                height:28,
                justifyContent:"center",
                alignItems:"center"
              },
              root:["shareTitle"]
            },
            shareMidWrapper:{
              type:"view",
              style:{
                flex:1,
              },
              root:["shareRepeat"]
            },
            cancelIcon:{
              type:"icon",
              text:"取消",
              style:{
                height:38,
                backgroundColor:"#fff"
              },
              textStyle:{
                fontSize:13,
                color:"#292f33"
              }
            },
            shareTitle:{
              type:"text",
              text:"－分享给朋友－",
              style:{
                color:"#8899a6",
                fontSize:12
              }
            },
            page2_btn2:{
                type:"button",
                mode:"2",
                style:{
                    fontSize:13,
                    height:32,
                    margin:"12px auto"
                }
            },
            shareRepeat:{
              type:"repeat",
              items:[
                {"title":"微信",icon:"icomoon_e903",color:"rgb(4,197,116)"},
                {"title":"朋友圈",icon:"icomoon_e908",color:"rgb(159,119,241)"},
                {"title":"QQ",icon:"icomoon_e909",color:"rgb(24,215,254)"},
                {"title":"空间",icon:"icomoon_e907",color:"rgb(250,196,30)"},
                {"title":"新浪微博",icon:"icomoon_e906",color:"rgb(249,80,99)"},
                {"title":"链接",icon:"icomoon_e905",color:"rgb(15,212,186)"}
              ],
              style:{
                flexWrap:"wrap",
                margin:"0 auto",
                width:310,
              },

              itemStyle:{
                width:"25%",
                height:90,
                alignItems:"center",
                justifyContent:"center"
              },
              root:["shareIcon"]
            },
            shareIcon:{
              type:"icon",
              text:"分享",
              text_bind:"title",
              font_bind:"icon",
              iconStyle_bind:{
                color:"color"
              },
              iconStyle:{
                w:54,
                display:"flex",
                fontSize:27,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#fff",
                borderRadius:"100%",
              },
              textStyle:{
                marginTop:8,
                color:"#292f33"
              },
              font:"icomoon_e914",
              textPos:"bottom"
            }
        }
    };
});
