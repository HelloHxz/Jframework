/**
 * Created by xiaoz on 16/8/13.
 */
define(["../logic/pageRepeatDemo"],function(pluginClass){
    return {

        pluginClass:pluginClass,
        style:{
            backgroundColor:"#f0f4f6"
        },
        root:["repeat"],
        components:{
            repeat:{

                type:"repeat",
                className:"page1-repeat",
                // selectedMode:"s",
                root:["repeat_icon","rp_right_icon"],
                items:[
                    {title:"Text",icon:"icomoon_e903"},
                    {title:"Repeat",icon:"icomoon_e903"},
                    {title:"Button&Icon",icon:"icomoon_e904"},
                    {title:"Tabbar",icon:"icomoon_e905"},
                    {title:"ListView",icon:"icomoon_e906"},
                    {title:"Segment",icon:"icomoon_e907"},
                    {title:"ViewPager",icon:"icomoon_e908"},
                    {title:"Popover",icon:"icomoon_e909"},
                    {title:"PopLayer",icon:"icomoon_e900"},
                    {title:"ConditionSelector",icon:"icomoon_e901"},
                    {title:"Calendar",icon:"icomoon_e901"}
                  ],
                style:{
                  backgroundColor:"#fff",
                  flexDirection:"column"
                },
                itemStyle:{
                  backgroundColor:"#fff",
                  padding:"8px 0px",
                  flexDirection:"row",
                },
                splitStyle:{
                    borderTop:"1px solid #e2e8ed",
                    marginLeft:"40px",
                    transform:"scaleY(.5)"
                },
            },
            rp_right_icon:{
              type:"icon",
              iconStyle:{
                fontSize:14
              },
              style:{
                width:"30px",
                height:"30px"
              },
              font:"icomoon_e913"
            },
            repeat_icon:{
              type:"icon",
              font:"icomoon_e901",
              font_bind:"icon",
              text:"MenuItem",
              text_bind:"title",
              textStyle:{
                marginLeft:"5px",
                color:"#8899a6",
                fontSize:"14px"
              },
              textPos:"right",
              style:{
                flex:1,
                width:"130px",
                marginLeft:"7px",
                height:"30px",
                justifyContent:"flex-start"
              },
              iconStyle:{
                fontSize:"24px",
                color:"#8899a6"
              }
            }
        }
    };
});/**
 * Created by xiaoz on 16/8/13.
 */
