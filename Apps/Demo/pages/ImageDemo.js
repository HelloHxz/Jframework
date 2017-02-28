define(["../logic/ImageDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },

        root:["page_header","Image1","Image2","Image3","Image4"],
        components:{
            page_header:{
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
                text:"Image控件",
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
            Image1:{
                type:"image",
                src:"http://img02.tooopen.com/images/20160316/tooopen_sy_156105468631.jpg",
                style:{
                    margin:"10px auto",
                    width:"130px"
                }
            },
            Image3:{
                type:"image",
                src:"http://img02.tooopen.com/images/20160316/xxxxxxxxxxxxxx.jpg",
                title:"加载失败",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    w:50,
                    borderRadius:25,
                    margin:"10px auto"
                }
            },
            Image2:{
                type:"image",
                src:"http://img02.tooopen.com/images/20160316/tooopen_sy_156105468631.jpg",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    w:50,
                    borderRadius:25,
                    margin:"10px auto"
                }
            },
            Image4:{
                type:"image",
                src:"http://img02.tooopen.com/images/20160316/1111sxxx.jpg",
                defaultSrc:"./imgs/1.jpg",
                style:{
                    backgroundColor:"#0093ff",
                    color:"#fff",
                    w:50,
                    borderRadius:25,
                    margin:"10px auto"
                }
            },
        }
    };
});
