define(["../logic/index"], function(pluginClass) {
    var Re = {
        pluginClass: pluginClass,
        style: {
            backgroundColor: "#f0f3f4"
        },
        root: ["page_header","page_content"],
        components: {
            page_header:{
                type:"view",
                style:{
                    height:50,
                    borderBottom:"1px solid #eee",
                    backgroundColor:"#fff",
                    justifyContent:"center",
                    alignItems:"center"
                },
                root:["page_header_title"]
            },
            page_header_title:{
                type:"text",
                text:"首页",
                style:{
                    fontSize:14
                }
            },
            page_content: {
                type: "view",
                style: {
                    flex: 1,
                    overflowY: "auto"
                },
                root: []
            },
        },

    };
    return Re;
});
