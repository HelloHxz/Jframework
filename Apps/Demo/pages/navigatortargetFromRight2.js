define(["../logic/navigatortarget"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"rgb(224, 224, 224)",
        },
        showPageStyle:{width:"80%",height:"100%"},
        root:["page_content"],
        components:{
            backIcon:{
              type:"icon",
              text:"关闭",
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

            page_content:{
                type:"view",
                style:{
                    flex:1
                },
                root:["backIcon"]
            }


        }
    };
});
