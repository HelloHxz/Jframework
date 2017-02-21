define([],function(){
    return {
        init:function(PM){
            PM.start({
                host:"http://localhost:3333/",
                root:"page1",

                customerComponents:{
                  workcentercalendar:"./components/workcentercalendar"
                },
                routerChange:function(){
                }
            });

        }
    };
});
