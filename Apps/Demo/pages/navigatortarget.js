define(["../logic/navigatortarget"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","page_content","page_footer"],
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
                fontSize: "14px"
              }
            },
            header_title:{
                type:"text",
                text:"页面导航目标页面",
                style:{
                    fontSize:14
                }
            },
            page_content:{
                type:"view",
                style:{
                    flex:1
                },
                root:[]
            },

            page_footer:{
                type:"view",
                style:{
                    height:40,
                    backgroundColor:"#fff",
                    borderTop:"1px solid #eee"
                }
            }


        }
    };
});
