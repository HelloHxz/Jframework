define(["../logic/repeat1"],function(pluginClass){
    return {
        pluginClass:pluginClass,
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
                overflowY:"auto",
                backgroundColor:"#fff"
              },
              root:["app_repeat"]
            },

            app_repeat: {
                type: "repeat",
                ref: true,
                className: "app-repeat",
                style: {
                    flexWrap: "wrap"
                },
                items:[],
                itemStyle: {
                    width: "33.3%",
                    height: 110,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "1px solid #eee",
                    padding: "0 6px 0 6px"
                },

                root: ["app_repeat_icon"]
            },
            app_repeat_icon: {
                type: "icon",
                font_bind: "logo",
                className: "app-repeat",
                iconStyle: {
                    fontSize: 40
                },
                iconStyle_bind:{
                  color:"color"
                },
                textStyle: {
                    fontSize: "12px",
                    color: "#666666",
                    marginTop: 9
                },
                text_bind: "name",
                textPos: "bottom"
            }

          }

    };
});
