define(["utils", "base", "swiper"],
function(utils, baseClass, swiper) {
  function DayItem(dateInfo, itemStyle,dayWidth,calendar) {
    var _this = this;
    _this.dateInfo = dateInfo;
    this.calendar = calendar;
    this.$el = $("<div date-seed='"+dateInfo.dateStr+"' date-mark='" + dateInfo.mark + "' date-day='" + dateInfo.day + "'  date-month='" + dateInfo.month + "' date-year='" + dateInfo.year + "' class='yy-calendar-day-item displayflex jc-center ai-center yy-calendar-day-item-" + dateInfo.mark + "'></div>");

    var isSelected = utils.ConvertDateToStr(calendar.selectedTime) == _this.dateInfo.dateStr;
    this.dayLabel = $("<div style='font-size:"+utils.fontSize12()+"px;width:"+dayWidth+"px;height:"+dayWidth+"px;line-height:"+dayWidth+"px' class='yy-calendar-day'>"+dateInfo.day +"</div>");
    if(isSelected){
      this.selected();
    }
    this.$el.append(this.dayLabel);
    utils.css(this.$el,itemStyle);

  }
  DayItem.prototype = {
    selected:function(){
      this.dayLabel.addClass("yy-calendar-day-selected");

    },
    unSelected:function(){
      this.dayLabel.removeClass("yy-calendar-day-selected");
    }
  }


  function YearCreator(config) {
    this.config = config;
    this.yearItems = {};
    this.itemWrapper = config.itemWrapper;
    this.calendar = config.calendar;
  }
  YearCreator.prototype = {
    createLaytout: function(startYear) {
      this.yearItems={};
      this.itemWrapper.$el.empty();
      for (var i = 0; i < 12; i++) {
        var year = (startYear + i);
        var yearItem = new YearItem({
          calendar:this.calendar,
          year:year,
          itemHeight : this.config.itemHeight
        });
        this.yearItems[year] = yearItem;
        this.itemWrapper.$el.append(yearItem.$el);
      }
    }
  }

  var YearItem = function(config){
    this.config = config;
    this.calendar = config.calendar;
    var curDate = utils.convertToDate(this.calendar.curDate);
    var isSelected =curDate.getFullYear() == this.config.year;
    this.$el = $("<div  date-year-seed='"+config.year+"' style='height:" + this.config.itemHeight + ";line-height:" + this.config.itemHeight + "' class='yy-calendar-year-item'></div>");
    this.innnerYear = $("<span style='font-size:"+utils.fontSize15()+"px' class='yy-calendar-year'>" + this.config.year + "</span>");
    if(isSelected){
      this.selected();
    }
    this.$el.append(this.innnerYear);
  }
  YearItem.prototype = {

     selected:function(){
       this.innnerYear.addClass("yy-calendar-year-selected");

     },
     unSelected:function(){
       this.innnerYear.removeClass("yy-calendar-year-selected");
     }
  }

  function DaysCreator(config) {
    this.config = config;
    this.itemWrapper = config.itemWrapper;
    this.calendar = config.calendar;
    this.SumDay = 7 * 6;
    this.dayInnerWidth = utils.getRealWidth(23);
    this.dayItems = {};
  }
  DaysCreator.prototype = {
    createLaytout: function(date) {
      var _this = this;
      this.dayItems = {};
      this.date = utils.convertToDate(date);
      this.itemWrapper.$el.empty();
      var DaysArr = this.getDaysArr();
      var itemStyle = {
        "height": this.config.itemHeight + "px",
        "font-size": utils.getRealWidth(14) + "px"
      };
      var docuFrag = document.createDocumentFragment();
      for (var i = 0; i < this.SumDay; i++) {
        var itemData = DaysArr[i];
        var dayItem = new DayItem(itemData, itemStyle,this.dayInnerWidth,this.calendar);
        this.dayItems[itemData.dateStr] = dayItem;
        docuFrag.appendChild(dayItem.$el[0]);
      }

      this.itemWrapper.$el[0].appendChild(docuFrag);
    },
    getDaysArr: function() {
      var Re = [];
      var monthDayCount = utils.getMonthDayCount(this.date);
      var monthInfo = utils.getDateInfo(this.date);
      var firstDayWhichDayInWeek = utils.getMonthFirstDayWhicDayInWeek(this.date);
      var nextMonthCount = this.SumDay - firstDayWhichDayInWeek - monthDayCount;
      if (firstDayWhichDayInWeek > 0) {
        var preMonth = utils.getPreMonth(this.date);
        var preMonthLastDay = utils.getMonthDayCount(preMonth);
        var preMonthInfo = utils.getDateInfo(preMonth);
        for (var i = 0; i < firstDayWhichDayInWeek; i++) {
          var day = (preMonthLastDay - firstDayWhichDayInWeek + i + 1);
          var date = new Date(preMonthInfo.year,preMonthInfo.month-1,day);
          Re.push({
            date:date,
            dateStr :utils.ConvertDateToStr(date),
            year: preMonthInfo.year,
            month: preMonthInfo.month,
            day: day,
            mark: "premonth"
          });
        }
      }
      for (var i = 1; i <= monthDayCount; i++) {
        var date = new Date(monthInfo.year,monthInfo.month-1,i);
        Re.push({
          date:date,
          dateStr :utils.ConvertDateToStr(date),
          year: monthInfo.year,
          month: monthInfo.month,
          day: i,
          mark: "curmonth"
        });
      }
      if (nextMonthCount > 0) {
        var nextMonth = utils.getNextMonth(this.date);
        var nextMonthInfo = utils.getDateInfo(nextMonth);
        for (var i = 1; i <= nextMonthCount; i++) {
          var date = new Date(nextMonthInfo.year,nextMonthInfo.month-1,i);
          Re.push({
            date:date,
            dateStr :utils.ConvertDateToStr(date),
            year: nextMonthInfo.year,
            month: nextMonthInfo.month,
            day: i,
            mark: "nextmonth"
          });
        }
      }
      return Re;
    }
  }
  var MonthArr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  var Component = function(config) {
    var _this = this;
    Component.baseConstructor.call(this, config);
    this.$el.addClass("yy-calendar-wrapper");
    var configItemHieght = this.config.itemHeight;
    if (isNaN(configItemHieght)) {
      configItemHieght = 45;
    }
    this.curDate = config.date||new Date();
    this.selectedTime = new Date(utils.convertToDate(this.curDate).getTime());
    configItemHieght = parseInt(configItemHieght);
    this.itemHeight = utils.getRealHeight(configItemHieght);
    var pluginChangeMethodName = config.comKey + "_change";
    if(this.pageview&&this.pageview.plugin){
      this.pluginChangeMethod = this.pageview.plugin[pluginChangeMethodName];
    }
    this.labelBarHeight = utils.getRealHeight(27);
    var wrapperHeight = this.itemHeight * 6 + this.labelBarHeight;
    this.innerWrapper = $("<div style='height:" + (wrapperHeight) + "px' class='yy-calendar-inner'></div>");
    var isShowYearAndMonthPicker = this.config.isShowYearAndMonthPicker || true;

    if (isShowYearAndMonthPicker) {
      var yearAndMonthPickerHeight = utils.getRealHeight(36);
      wrapperHeight += yearAndMonthPickerHeight;
      this.initYearAndMonthPicker(yearAndMonthPickerHeight, wrapperHeight);
    }
    this.mode = config.mode||"年月日";
    if(this.mode=="年月"){
      this.curShow = "year";
      this.createYearWrapper(wrapperHeight-yearAndMonthPickerHeight);
      this.triggerChange();
    }else{
      this.curShow = "day";
      _this.createDayWraper();
    }
    this.$el.append(this.innerWrapper);

  }
  utils.extends(Component, baseClass);


  Component.prototype.setDateSelected=function(date,node){
    var date = utils.convertToDate(date);
    var year = date.getFullYear();
    var dateStr = utils.ConvertDateToStr(date);
    this.selectedTime = date;
    for(var i=0;i<3;i++){
      var daysCreator = this.Swiper.itemWrappers[i].daysCreator;
      for(var key in daysCreator.dayItems){
        var dayItem = daysCreator.dayItems[key];
        if(dayItem.dateInfo.dateStr == dateStr){
          dayItem.selected();
        }else{
          dayItem.unSelected();
        }
      }
    }
    if(!node){return;}
    var dateMark = node.getAttribute("date-mark");
    if(dateMark =="premonth"){
      this.goPre();
    }else if(dateMark == 'nextmonth'){
      this.goNext();
    }
  }

  Component.prototype.setYearSelected = function(){
    var _this = this;
    var dateInfo = utils.getDateInfo(this.curDate);
    var isInRange = false,oneYear;
    var year =dateInfo.year;
    if(this.yearSwiper){
      for(var i=0;i<3;i++){
        var yearCreator = this.yearSwiper.itemWrappers[this.yearSwiper.posArr[i]].yearCreator;
        for(var key in yearCreator.yearItems){
          var yearItem = yearCreator.yearItems[key];
          oneYear =yearItem.config.year ;
          if(yearItem.config.year == year){
            isInRange = true;
            yearItem.selected();
            if(i==0){
              this.yearSwiper.goPre();
            }else if(i==2){
              this.yearSwiper.goNext();
            }
          }else{
            yearItem.unSelected();
          }
        }
      }
      if(!isInRange){
        if(oneYear>year){
          this.initYearWrapper(year - 3 + 12);
          window.setTimeout(function(){
            _this.yearSwiper.goPre();
          },0);
        }else{
          this.initYearWrapper(year - 3 - 12);
          window.setTimeout(function(){
            _this.yearSwiper.goNext();
          },0);
        }
      }
    }

  }

  Component.prototype.createDayWraper = function() {
    var _this = this;
    new swiper({
      onChange: function(args) {
        if (args.action == "gopre") {
          var curDate = utils.getPreMonth(_this.curDate);
          var preDate = utils.getPreMonth(curDate);
          _this.curDate =utils.getCurMonthFirstDay(curDate);
          _this.triggerChange();
          args.itemWrapper.daysCreator.createLaytout(preDate);
        } else if (args.action == "gonext") {
          var curDate = utils.getNextMonth(_this.curDate);
          var nextDate = utils.getNextMonth(curDate);
          _this.curDate =utils.getCurMonthFirstDay(curDate);
          _this.triggerChange();
          args.itemWrapper.daysCreator.createLaytout(nextDate);
        }
      },
      initItem: function(itemWrapper, index) {
        itemWrapper.daysCreator = new DaysCreator({
          calendar:_this,
          itemWrapper: itemWrapper,
          itemHeight: _this.itemHeight
        })
      },
      init: function(me) {
        _this.Swiper = me;
      }
    });
    var barFontSize = utils.getRealWidth(13);
    var barItemStyle = "style='line-height:" + this.labelBarHeight + "px;font-size:" + barFontSize + "px'";
    var bar = $("<div style='height:" + this.labelBarHeight + "px' class='yy-calendar-bar'><div " + barItemStyle + " class='yy-c-bar-item'>日</div><div " + barItemStyle + " class='yy-c-bar-item'>一</div><div " + barItemStyle + " class='yy-c-bar-item'>二</div><div " + barItemStyle + " class='yy-c-bar-item'>三</div><div " + barItemStyle + " class='yy-c-bar-item'>四</div><div " + barItemStyle + " class='yy-c-bar-item'>五</div><div " + barItemStyle + " class='yy-c-bar-item'>六</div></div>");
    this.dayWrapper = $("<div class='yy-calendar-ymd-wrapper displayflex flex-v'></div>");
    this.dayWrapper.append(bar).append(this.Swiper.$el);

    this.Swiper.$el.bind("click",function(e){
      var node = e.target;
      var dateSeed = node.getAttribute("date-seed");
      while(dateSeed == null){
        node = node.parentNode;
        dateSeed =  node.getAttribute("date-seed");
        if(dateSeed){
          break;
        }
        if(node.tagName.toUpperCase() == "BODY"){
          break;
        }
      }
      _this.setDateSelected(dateSeed,node);
    });

    this.innerWrapper.append(this.dayWrapper);
    this.show();
  }

  Component.prototype.createYearWrapper = function(height) {
    var rowHeight = (height / 4) + "px";
    var _this = this;
    var style = this.curShow =="year"?"":"displaynone";
     this.yearWrapper =  $("<div class='yy-calendar-ymd-wrapper "+style+"'></div>");

    new swiper({
      onChange: function(args) {
        if (args.action == "gopre") {
          _this.curYearWrapperStartYear -= 12;
          args.itemWrapper.yearCreator.createLaytout(_this.curYearWrapperStartYear - 12);
        } else if (args.action == "gonext") {
          _this.curYearWrapperStartYear += 12;
          args.itemWrapper.yearCreator.createLaytout(_this.curYearWrapperStartYear + 12);
        }
      },
      initItem: function(itemWrapper, index) {
        itemWrapper.yearCreator = new YearCreator({
          itemWrapper: itemWrapper,
          itemHeight: rowHeight,
          calendar:_this
        })
      },
      init: function(me) {
        _this.yearSwiper = me;
        me.$el.appendTo(_this.yearWrapper);
        var curDateInfo = utils.getDateInfo(_this.curDate);
        _this.initYearWrapper(curDateInfo.year);
      }
    });

    this.yearWrapper.bind("click",function(e){
      var node = e.target;
      var dateSeed = node.getAttribute("date-year-seed");
      while(dateSeed == null){
        node = node.parentNode;
        dateSeed =  node.getAttribute("date-year-seed");
        if(dateSeed){
          break;
        }
        if(node.tagName.toUpperCase() == "BODY"){
          break;
        }
      }
      var year = parseInt(dateSeed);
      _this.curDate = utils.setDateToYear(_this.curDate,year);
      _this.show(_this.curDate, false);
      _this.curShow = "day";
      _this.dayWrapper && _this.dayWrapper.removeClass("displaynone");
      _this.yearWrapper.addClass("displaynone");
      _this.setYearSelected();
    });

    this.innerWrapper.append(this.yearWrapper);
  }

  Component.prototype.initYearWrapper = function(year) {


    this.yearSwiper.reset();
    this.curYearWrapperStartYear = year - 4;
    this.yearSwiper.itemWrappers[0].yearCreator.createLaytout(year - 4 - 12);
    this.yearSwiper.itemWrappers[1].yearCreator.createLaytout(year - 4);
    this.yearSwiper.itemWrappers[2].yearCreator.createLaytout(year - 4 + 12);
  }
  Component.prototype.initYearAndMonthPicker = function(height, wrapperHeight) {
    var labelFontSize = utils.getRealWidth(18);
    var _this = this;
    var wrapper = $("<div style='height:" + height + "px' class='yy-calendar-ym-picker displayflex flex-h'></div>");
    this.yearLeftIcon = $("<div class='yy-calendar-picker-lefticon' style='width:" + height + "px;height:" + height + "px;line-height:" + height + "px'></div>");
    this.yearLabel = $("<div style='font-size:" + labelFontSize + "px' class='yy-calendar-picker-label displayflex ai-center jc-center flex-1'>2013</div>");
    this.yearLabel.bind("click",
    function() {
      if (!_this.yearWrapper) {
         _this.createYearWrapper(wrapperHeight - height);
      } else {
        // _this.initYearWrapper();
      }
      if (_this.curShow == "day") {
        _this.curShow = "year";
        _this.yearWrapper.removeClass("displaynone");
        _this.dayWrapper && _this.dayWrapper.addClass("displaynone");
      } else if (_this.curShow == "year") {
        _this.curShow = "day";
        _this.dayWrapper && _this.dayWrapper.removeClass("displaynone");
        _this.yearWrapper.addClass("displaynone");
      } else if (_this.curShow == "month") {
        _this.curShow = "year";
        _this.monthWrapper &&  _this.monthWrapper.addClass("displaynone");
        _this.yearWrapper.removeClass("displaynone");
      }
    });

    this.yearLeftIcon.bind("click",
    function() {
      _this.goTo(utils.getPreYear(_this.curDate));
      _this.setYearSelected();
    });

    this.yearRightIcon = $("<div class='yy-calendar-picker-righticon' style='width:" + height + "px;height:" + height + "px;line-height:" + height + "px'></div>");
    this.yearRightIcon.bind("click",
    function() {
      _this.goTo(utils.getNextYear(_this.curDate));

      _this.setYearSelected();
    });

    this.monthLeftIcon = $("<div class='yy-calendar-picker-lefticon' style='width:" + height + "px;height:" + height + "px;line-height:" + height + "px'></div>");
    this.monthLeftIcon.bind("click",
    function() {
      _this.goPre();
      _this.setMonthSelected();
    });
    this.monthLabel = $("<div style='font-size:" + labelFontSize + "px' class='yy-calendar-picker-label displayflex ai-center jc-center flex-1'>2013</div>");

    this.monthLabel.bind("click",
    function() {
      if (!_this.monthWrapper) {
        _this.createMonthWrapper(wrapperHeight - height);
      }
      if (_this.curShow == "day") {
        _this.setMonthSelected();
        _this.curShow = "month";
        _this.monthWrapper.removeClass("displaynone");
        _this.dayWrapper && _this.dayWrapper.addClass("displaynone");
      } else if (_this.curShow == "year") {
        _this.setMonthSelected();
        _this.curShow = "month";
        _this.monthWrapper.removeClass("displaynone");
        _this.yearWrapper && _this.yearWrapper.addClass("displaynone");
      } else if (_this.curShow == "month") {
        _this.curShow = "day";
        _this.monthWrapper && _this.monthWrapper.addClass("displaynone");
        _this.dayWrapper&&_this.dayWrapper.removeClass("displaynone");
      }
    });

    this.monthRightIcon = $("<div class='yy-calendar-picker-righticon' style='width:" + height + "px;height:" + height + "px;line-height:" + height + "px'></div>");
    this.monthRightIcon.bind("click",
    function() {
      _this.goNext();
      _this.setMonthSelected();
    });
    wrapper.append(this.yearLeftIcon).append(this.yearLabel).append(this.yearRightIcon).append(this.monthLeftIcon).append(this.monthLabel).append(this.monthRightIcon);
    this.$el.append(wrapper)
  }

  Component.prototype.createMonthWrapper = function(height) {
    var rowHeight = (height / 4) + "px";
    var _this = this;
    this.monthDict = {};

    this.monthWrapper = $("<div class='yy-calendar-ymd-wrapper displaynone'></div>");
    for (var i = 0; i < 12; i++) {
      var monthItem = $("<div data-month-seed='"+(i+1)+"' style='height:" + rowHeight + ";line-height:" + rowHeight + "' class='yy-calendar-month-item'></div>");
      var monthInner = $("<span class='yy-calendar-month' style='font-size:"+utils.fontSize15()+"px'>"+(MonthArr[i])+"</span>");
      monthItem.append(monthInner);
      if(i+1 == this.curDate.getMonth()+1){
          monthInner.addClass("yy-calendar-month-selected");
      }
      this.monthDict[(i+1).toString()] = monthInner;
      this.monthWrapper.append(monthItem);
    }

    this.monthWrapper.bind("click",function(e){
      var node = e.target;

      var dateSeed = node.getAttribute("data-month-seed");
      while(dateSeed == null){
        node = node.parentNode;
        dateSeed =  node.getAttribute("data-month-seed");
        if(dateSeed){
          break;
        }
        if(node.tagName.toUpperCase() == "BODY"){
          break;
        }
      }
      if(dateSeed){
        _this.curDate = utils.setMonthToDate(_this.curDate,dateSeed);
        _this.show(_this.curDate, false);
        _this.curShow = "day";
        _this.dayWrapper && _this.dayWrapper.removeClass("displaynone");
        _this.monthWrapper.addClass("displaynone");
        _this.setMonthSelected();
      }
    });
    this.innerWrapper.append(this.monthWrapper);
  }

  Component.prototype.setMonthSelected  = function(){
    var month = utils.convertToDate(this.curDate).getMonth()+1;
    this.setYearSelected();
    for(var key in this.monthDict){
      if(month == parseInt(key)){
        this.monthDict[key].addClass("yy-calendar-month-selected");
      }else{
        this.monthDict[key].removeClass("yy-calendar-month-selected");
      }
    }
  }

  Component.prototype.show = function(str, notriggerChange) {

    str = str ||this.curDate|| new Date();
    this.curDate =  utils.convertToDate(str);
    this.Swiper.reset();
    var preDate = utils.getPreMonth(this.curDate);
    this.Swiper.itemWrappers[0].daysCreator.createLaytout(preDate);
    this.Swiper.itemWrappers[1].daysCreator.createLaytout(this.curDate);
    var nextDate = utils.getNextMonth(this.curDate);
    this.Swiper.itemWrappers[2].daysCreator.createLaytout(nextDate);
    if (!notriggerChange) {
      this.triggerChange();
    }
  }
  Component.prototype.triggerChange = function() {
    var curDateInfo = utils.getDateInfo(this.curDate);
    this.monthLabel.html((curDateInfo.month )+"月");
    this.yearLabel.html(curDateInfo.year);
    this.pluginChangeMethod && this.pluginChangeMethod.call(this.pageview.plugin, this, {});
  }
  Component.prototype.goPre = function() {
    this.Swiper.goPre();
  }
  Component.prototype.goNext = function() {
    this.Swiper.goNext();
  }

  Component.prototype.setValue = function(date) {

    date = date || new Date();
    date = utils.convertToDate(date);
    this.selectedTime = date;
    this.goTo(date);
  }

  Component.prototype.goTo = function(date) {
    var _this = this;

    date = date || new Date();
    date = utils.convertToDate(date);
    if (utils.ConvertDateToStr(this.curDate) == utils.ConvertDateToStr(date)) {
      return;
    }
    if (utils.ConvertDateToStr(this.curDate,"yyyy-MM") == utils.ConvertDateToStr(date,"yyyy-MM")) {
      this.setDateSelected(date);
      return;
    }
    this.curDate = date;

    if (this.curDate > date) {
      this.show(utils.getNextMonth(date), true);
      window.setTimeout(function(){
        _this.goPre();
      },0);
    } else {
      this.show(utils.getPreMonth(date), true);
      window.setTimeout(function(){
        _this.goNext();
      },0);
    }
  }
  return Component;
});
