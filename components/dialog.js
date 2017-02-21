/*

 {
 title:"",
 style:{},
 titleStyle:{},
 contentTextStyle:{},
 contentText:"",
 contentKey:"",
 btnDirection:"column",
 buttons:[
 {
 text:"知道了",
 callBack:function(){

 }
 },
 {
 text:"提交"
 }
 ]

 }

 */
define(["utils","base"],function(utils,baseClass){
    var Component = function(config){
        var _this = this;
        var wrapper = config.wrapper || $(document.body);
        var mode = config.mode || 1;
        this.dialogBackCover = $("<div style='visibility: hidden;' class='yy-dialog-bk'></div>");
        this.dialogWrapper = $("<div class='yy-dialog-wrapper yy-dialog-effect-"+mode+" yy-dialog-hide'></div>");
        var dialogInner = $("<div class='yy-dialog-inner'></div>");
        var dialogBody = $("<div class='yy-dialog-body'></div>");
        var btnDirection = config.btnDirection === "row"? "yy-fd-row":"yy-fd-column";
        var dialogBtnWrapper = $("<div class='yy-dialog-btn-wrapper displayflex "+btnDirection+"'></div>");
        this.dialogBackCover.bind("click",function(){
            _this.hide();
        });

        var title = config.title||"";
        this.titleDom = $("<div class='yy-dialog-title'>"+title+"</div>");
        this.bodyContentDom = $("<div class='yy-dialog-content'></div>");

        var createContentCallBack = config.createContent;
        if(createContentCallBack){
            createContentCallBack(this.bodyContentDom);
        }else{
            var contentText = config.contentText;
            this.contentTextDom = $("<div class='yy-dialog-content-text'>"+contentText+"</div>");
            this.bodyContentDom.append(this.contentTextDom);
        }
        dialogBody.append(this.titleDom).append(this.bodyContentDom);

        if(config.buttons){

            for(var i=0,j=config.buttons.length;i<j;i++){
                var btn = config.buttons[i];
                var title =btn.title||"按钮";
                var style = btn.style;
                var callBack = btn.onClick;
                (
                    function(_titile,_style,_dialogBtnWrapper,_callBack,_this){
                        var btn = $("<div class='yy-dialog-btn yy-flex-1 displayflex yy-jc-center yy-ai-center'>"+_titile+"</div>");
                        if(_style){
                            utils.css(btn,_style);
                        }
                        if(_callBack){
                            btn.bind("click",function(e){
                                _callBack();
                            });
                        }
                        _dialogBtnWrapper.append(btn);
                    }
                )(title,style,dialogBtnWrapper,callBack,this);
            }
        }

        dialogInner.append(dialogBody).append(dialogBtnWrapper)
        this.dialogWrapper.append(dialogInner);
        wrapper.append(this.dialogWrapper).append(this.dialogBackCover);

    }



    Component.prototype.show =function(){
        var _this = this;
        this.dialogWrapper.css({"visibility":"visible"});
        this.dialogBackCover.css({"visibility":"visible"});
        this.dialogBackCover.addClass("yy-dialog-bk-show");
        window.setTimeout(function(){
            _this.dialogWrapper.removeClass("yy-dialog-hide").addClass("yy-dialog-show");
        },1);
    };

    Component.prototype.hide = function(){
        var _this = this;
        this.dialogWrapper.removeClass("yy-dialog-show").addClass("yy-dialog-hide");
        this.dialogBackCover.removeClass("yy-dialog-bk-show");
        window.setTimeout(function(){
            _this.dialogWrapper.css({"visibility":"hidden"});
            _this.dialogBackCover.css({"visibility":"hidden"});
        },200);
    }


    return Component;
});