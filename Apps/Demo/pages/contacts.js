define(["../logic/contacts"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","page2_btn1","page2_btn2"],
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
                text:"通讯录"
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
                title:"跳转到下一页",
                style:{
                    margin:"10px auto",
                    width:"130px"
                }
            },
            page2_btn2:{
                type:"button",
                mode:"2",
                style:{
                    margin:"10px auto"
                }
            }
        }
    };
});
