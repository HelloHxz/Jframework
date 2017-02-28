define(["../logic/segmentDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","contentview"],
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
                text:"Segment"
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
            contentview:{
                type:"view",
                style:{
                  borderTop:"1px solid #e2e8ed",
                  flex:1,
                  paddingBottom:10,
                  overflowY:"auto",
                  marginTop:6,
                  backgroundColor:"#fff"
                },
                root:[
                  "segment_ios","segment_ios2","segment_ios3","segment_ios4","segment_android","segment_android2","segment_android3",
                  "segment_android4","segment_android5"
                ]
            },
            segment_ios:{
              type:"segment_ios",
              items:[{title:"全部"},{title:"未审核"},{title:"已审核"}],
              root:["segment_ios_item"],
              style:{height:24,width:300,margin:"15px auto"}
            },
            segment_ios_item:{
              type:"text",
              text_bind:"title",
              text:"test",
              selectedClassName:"yy-sgm-item-selected",
              style:{color:"rgb(0, 147, 255)",fontSize:13}
            },
            segment_android:{
              type:"segment_android",
              items:[{title:"全部"},{title:"未审核"},{title:"已审核"}],
              root:["segment_android_item"],
              style:{height:30,marginTop:"30px"}
            },
            segment_android_item:{
              type:"text",
              text:"test",
              text_bind:"title",
              selectedClassName:"yy-sgm-item-selected-android",
              style:{color:"#8899a6",fontSize:13}
            },
            segment_ios2:{
              type:"segment_ios",
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_ios_item2"],
              style:{height:24,width:300,margin:"15px auto"}
            },
            segment_ios_item2:{
              type:"icon",
              font:"icomoon_e910",
              text:"test",
              font_bind:"icon",
              text_bind:"title",
              selectedClassName:"yy-sgm-item-selected",
              textStyle:{color:"rgb(0, 147, 255)",fontSize:13,marginLeft:3},
              iconStyle:{color:"rgb(0, 147, 255)",fontSize:19}
            },
            segment_android2:{
              type:"segment_android",
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_android_item2"],
              style:{height:34,marginTop:"30px",backgroundColor:"#f5f5f5"}
            },
            segment_android_item2:{
              type:"icon",
              font:"icomoon_e910",
              font_bind:"icon",
              text_bind:"title",
              text:"test",
              selectedClassName:"yy-sgm-item-selected-android",
              textStyle:{color:"#8899a6",fontSize:13,marginLeft:3},
              iconStyle:{color:"#8899a6",fontSize:19}
            },
            segment_ios3:{
              type:"segment_ios",
              selectedIndex:1,
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_ios_item3"],
              style:{height:42,width:300,margin:"15px auto"}
            },
            segment_ios_item3:{
              type:"icon",
              font:"icomoon_e910",
              text_bind:"title",
              font_bind:"icon",
              text:"test",
              textPos:"bottom",
              selectedClassName:"yy-sgm-item-selected",
              textStyle:{color:"rgb(0, 147, 255)",fs:12},
              iconStyle:{color:"rgb(0, 147, 255)",fontSize:19}
            },
            segment_android3:{
              type:"segment_android",
              selectedIndex:1,
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_android_item3"],
              style:{height:42,marginTop:"30px"}
            },
            segment_android_item3:{
              type:"icon",
              font:"icomoon_e910",
              font_bind:"icon",
              text_bind:"title",
              text:"test",
              textPos:"bottom",
              selectedClassName:"yy-sgm-item-selected-android",
              textStyle:{color:"#8899a6",fontSize:12},
              iconStyle:{color:"#8899a6",fontSize:19}
            },
            segment_ios4:{
              type:"segment_ios",
              selectedIndex:2,
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_ios_item4"],
              style:{height:26,width:300,margin:"15px auto"}
            },
            segment_ios_item4:{
              type:"icon",
              font:"icomoon_e914",
              font_bind:"icon",
              selectedClassName:"yy-sgm-item-selected",
              iconStyle:{color:"rgb(0, 147, 255)",fontSize:19}
            },
            segment_android4:{
              type:"segment_android",
              selectedIndex:2,
              items:[{title:"全部",icon:"FontAwesome_f0c9"},{title:"未审核",icon:"FontAwesome_f006"},{title:"已审核",icon:"FontAwesome_f005"}],
              root:["segment_android_item4"],
              style:{height:40,marginTop:"30px"}
            },
            segment_android_item4:{
              type:"icon",
              font:"icomoon_e914",
              font_bind:"icon",
              selectedClassName:"yy-sgm-item-selected-android",
              iconStyle:{color:"#8899a6",fontSize:19}
            },
            segment_android5:{
              type:"segment_android",
              items:[{title:"全部"},{title:"未审核"},{title:"已审核"},{title:"已审核"},{title:"已审核"},{title:"已审核"},{title:"已审核"}],
              root:["segment_android_item5"],
              style:{height:40,marginTop:"30px",backgroundColor:"rgb(249, 249, 249)"},
              itemStyle:{width:100}
            },
            segment_android_item5:{
              type:"text",
              text:"test",
              text_bind:"title",
              selectedClassName:"yy-sgm-item-selected-android",
              style:{color:"#8899a6",fontSize:13,textAlign:"center"}
            },
        }
    };
});
