define(["../logic/repeat3"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
          backgroundColor:"#f0f3f4"
        },
        root:["page_header","content_wrapper","toolbar"],
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
              root:[]
            },
            toolbar:{
              type:"repeat",
              root:[""]
            },

          }

    };
});
