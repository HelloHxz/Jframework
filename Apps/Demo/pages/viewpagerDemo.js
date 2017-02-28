define(["../logic/viewpagerDemo"],function(pluginClass){
    return {
        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["page2_header","segment_wrapper","viewpager"],
        components:{
            page2_header:{
                type:"view",
                root:["backIcon","right_icon","header_title"],
                style:{
                    height:"44px",
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
                text:"ViewPager",
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
            segment_wrapper:{
              type:"view",
              root:["segment_ios2"],
              style:{
                height:32,
                backgroundColor:"#fff",
                justifyContent:"flex-start",
                borderBottom:"1px solid #e2e8ed",
                alignItems:"center"
              }
            },
            viewpager:{
              type:"viewpager",
              defaultKey:"viewpageItem1",
              style:{
                flex:1,
                marginTop:6,
                borderTop:"1px solid #e2e8ed",
                backgroundColor:"#fff",
              }
            },

            segment_ios2:{
              type:"segment_ios",
              items:[{title:"全部"},{title:"未审核"},{title:"已审核"}],
              root:["segment_ios_item2"],
              style:{height:24,width:300}
            },
            segment_ios_item2:{
              type:"icon",
              selectedClassName:"yy-sgm-item-selected",
              textStyle:{color:"rgb(0, 147, 255)",fontSize:13,marginLeft:3},
              iconStyle:{color:"rgb(0, 147, 255)",fontSize:16}
            },
        }
    };
});
