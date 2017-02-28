define(["../logic/popoverDemo"],
function(pluginClass) {
  return {
    pluginClass: pluginClass,
    style: {
      backgroundColor: "#f0f4f6"
    },
    root: ["page_header", "contentview","bottomToolBar","morePopover"],
    components: {
      page_header: {
        type: "view",
        root: ["backIcon","right_icon", "header_title"],
        style: {
          height: "44px",
          borderBottom: "1px solid #e2e8ed",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center"
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
      header_title: {
        type: "text",
        text: "Popover控件",
        style:{
          fontSize:14
        }
      },
      right_icon: {
        type: "icon",
        font: "icomoon_e90e",
        style: {
          position: "absolute",
          right: "10px",
          color: "rgb(0, 147, 255)",
          top: "6px",
          width: "30px",
          height: "30px",
        },
        iconStyle: {
          fontSize: "20px"
        }
      },
      contentview: {
        type: "view",
        style: {
          flex: 1,
          backgroundColor: "#f0f4f6",
        }
      },
      bottomToolBar:{
        type:"view",
        style:{
          height:34,
          flexDirection:"row",
          backgroundColor:"#fff",
          alignItems:"center"
        },
        root:["buttonGroup","splitline","moreBtn"]
      },
      splitline:{
        type:"view",
        style:{
          borderLeft:"1px solid rgb(220, 220, 220)",
          height:14
        }
      },
      buttonGroup:{
        type:"repeat",
        items:[{label:"回复",icon:"icomoon_e904"},
        {label:"下载",icon:"FontAwesome_f0ed"},{label:"转发",icon:"FontAwesome_f08e"}],
        root:["toolbarIcon"],
        style:{
          flex:1,
          alignItems:"center"
        },
        itemStyle:{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
          height:30,
        },
        splitStyle:{
          borderLeft:"1px solid rgb(220, 220, 220)",
          height:12
        }
      },
      toolbarIcon:{
        type:"icon",
        font_bind:"icon",
        text_bind:"label",
        style:{flex:1},
        iconStyle:{
          color:"#0093ff",
          fontSize:14
        },
        textStyle:{
          color:"#0093ff",
          marginLeft:5,
          fontSize:12
        }
      },
      moreBtn:{
        type:"icon",
        font:"FontAwesome_f141",
        iconStyle:{
          color:"#0093ff",
          fontSize:15
        },
        style:{
          height:30,
          width:80
        }
      },
      morePopover:{
        type:"popover",
        root:["moreRepeat"],
        animate:{mode:"2"},
        bkCoverStyle:{
          backgroundColor:"rgba(230, 230, 230, 0.2)"
        },
        arrowStyle:{
          backgroundColor:"#fff",
          zIndex:2,
          "-webkit-box-shadow":"9px 8px 13px #9C9C9C",
          "box-shadow":"9px 8px 13px #9C9C9C",
        },
        style:{
          "-webkit-box-shadow":"0px 8px 13px #9C9C9C",
          "box-shadow":"0px 8px 13px #9C9C9C",
          width:72,
          backgroundColor:"#fff",
          height:140,
          borderRadius:"7px"
        }
      },
      moreRepeat:{
        type:"repeat",
        items:[{title:"完成"},{title:"转发"},{title:"编辑"},{title:"删除"}],
        root:["moreRepeat_icon"],
        style:{
          flexDirection:"column",
          flex:1
        },
        itemStyle:{
          flex:1,
          justifyContent:"center",
          alignItems:"stretch"
        }
      },
      moreRepeat_icon:{
        type:"icon",
        text:"测试",
        text_bind:"title",
        style:{flex:1},
        textStyle:{
          fontSize:12,
          color:"#292f33"
        }
      }
    }
  };
});
