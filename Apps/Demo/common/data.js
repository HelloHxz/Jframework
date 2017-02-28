define([], function () {
    var hasError = false;
    var Re = {
        getListData:function(params){
            var pageNum = params.pageNum;
            var pageSize = params.pageSize;
            var data = [];
            for(var i=0;i<pageSize;i++){
                data.push({
                    name:"正文标题第"+(pageNum)+"页第"+(i+1)+"条数据",
                    desc:"描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本第"+(pageNum)+"页第"+(i+1)+"条数据",
                    id:"xxx",
                    time:"2012-12-12",
                    status:i%3
                });
            }
            if(pageNum==3||pageNum==6){
                if(hasError==false){
                    hasError = true;
                    return null;
                }else{
                    hasError = false;
                }

            }

            return data;
        }
    };
    return Re;
});
