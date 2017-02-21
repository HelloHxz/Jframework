define(["../logic/simplelistview2"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","page_content"],
        components:{
            page_header:{
                type:"view",
                root:["backIcon","header_title","header_right_text"],
                style:{
                    height:"44px",
                    borderBottom:"1px solid #e2e8ed",
                    backgroundColor:"#fff",
                    justifyContent:"center",
                    alignItems:"center"
                }
            },
            header_title:{
                type:"text",
                text:"多选",
                style:{
                  fontSize:14
                }
            },
            header_right_text:{
                ref:true,
                type:"text",
                style:{
                    position:"absolute",
                    right:10,
                    top:12,
                    fontSize:14,
                    color:"rgb(0, 147, 255)"
                },
                preText:"已选(",
                nextText:")项",
                textStyle:{
                    color:"gray"
                },
                text:"0"
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
            page_content:{
                type:"view",
                root:["listview"],
                style:{
                  flex:1,
                  overflowY:"auto",
                  backgroundColor:"#fff"
                }
            },
            listview:{
              type:"listview",
              selectedMode:"m",
              root:["row_wrap"],
              ajaxConfig:{
                  url:"/getlistdata",
                  type:"GET",
                  pageSize:20,
                  pageNumKey:"pageNum",
                  data:{
                    pageSize:20
                },
              },
              style:{
                flexDirection:'column',
                paddingLeft:8,
              },
              rowStyle:{
                paddingTop:15,
                paddingBottom:15,
                borderBottom:"1px solid #eee",
                flexDirection:'column'
              }
            },

            row_wrap:{
                type:"view",
                style:{
                    flexDirection:"row"
                },
                root:["row_checkicon","row_name"]
            },
            row_checkicon:{
                type:"icon",
                selectedClassName:"list-checkicon-selected",
                font:"FontAwesome_f1db",
                style:{
                    width:30
                },
                iconStyle:{
                    color:"rgb(0, 147, 255)",
                    fontSize:23
                }
            },
            row_name:{
                type:"text",
                style:{
                    fontSize:13,
                    color:"#333",
                    flex:1
                },
                text_bind:"name"
            }
        }
    };
});
