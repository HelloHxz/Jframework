define(["../logic/simplelistview1"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page_header","page_content"],
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
            header_title:{
                type:"text",
                text:"行侧滑以及基本行操作",
                style:{
                  fontSize:14
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
              root:["row_name"],
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
              },
              rowSwipeIcons:["rowDelIcon"]
            },

            rowDelIcon:{
              type:"icon",
              text:"删除",
              font:"icomoon_e903",
              textPos:"bottom",
              iconStyle:{
                fontSize:13,color:"#fff"
              },
              textStyle:{color:"#fff",fontSize:12,marginTop:5},
              style:{
                width:80,
                backgroundColor:"red",
              }
            },
            rowEditIcon:{
              type:"icon",
              text:"编辑",
              textStyle:{color:"#fff",fontSize:12},
              style:{
                width:80,
                backgroundColor:"green",
              }
            },rowOtherIcon:{
              type:"icon",
              text:"其他操作",
              textStyle:{color:"#fff",fontSize:12},
              style:{
                width:80,
                backgroundColor:"orange",
              }
            },

            row_name:{
                type:"text",
                style:{
                    fontSize:13,
                    color:"#333"
                },
                text_bind:"name"
            }
        }
    };
});
