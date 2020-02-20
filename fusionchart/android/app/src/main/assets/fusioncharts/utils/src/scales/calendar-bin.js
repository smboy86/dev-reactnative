import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScaleCalendar from"./calendar";import{getFloorOfDate,modifyDate}from"../scale-utils";import pluckNumber from"../pluck-number";import{getFilterdTimeFormat}from"../time-bucket";import timeConverter from"../time-converter";var DEFAULT_THRESHOLD_PIXELS=4,MAJOR="major",MINOR="minor",CONTEXT="context",YEAR="year",BLANK="",MONTH_MID=14,DAY_MID=11,DAY_1=1e3*60*60*24,DAY_30=DAY_1*30,DAY_365=DAY_1*365,MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],CONTEXT_SEQ=["day","month","year"],dayCount=[31,28,31,30,31,30,31,31,30,31,30,31],showMonthInDayTick=true,domainToMajorIntervalRatio=[{ratio:4,index:8},{ratio:3,index:7},{ratio:2.5,index:6},{ratio:2,index:5},{ratio:1.5,index:4},{ratio:1,index:3},{ratio:.67,index:2},{ratio:.33,index:1},{ratio:0,index:0}],copyScaleBin=function copyScaleBin(sourceScale,targetScale){return targetScale.setInterpolate(sourceScale.getInterpolate()).setClamp(sourceScale.getClamp()).setDomain(sourceScale.getDomain()).setRange(sourceScale.getRange()).setThresholdIntervals(sourceScale.thresholdIntervals).setBinMin(sourceScale.getBinMin()).setRangeThreshold(sourceScale._threshold)},validate=function validate(x){return x!==null&&!isNaN(x)},niceMinorTickIndex=function niceMinorTickIndex(value){var i,len=domainToMajorIntervalRatio.length,inverse=1/value;if(inverse>4){return Infinity}for(i=0;i<len;i++){if(inverse>domainToMajorIntervalRatio[i].ratio){return domainToMajorIntervalRatio[i].index}}},contextChange=function contextChange(startDate,endDate,index,thresholdIntervals,utc){var start=getFloorOfDate(new Date(startDate),thresholdIntervals[index][0].name(),thresholdIntervals[index][1],utc),end=getFloorOfDate(new Date(endDate),thresholdIntervals[index][0].name(),thresholdIntervals[index][1],utc);if(+start!==+end){return[start,end]}return false},dateAPI=function dateAPI(date,param,utc){return date["get"+utc+param]()},formatDate=function formatDate(x){return(x<10?"0"+x:x)+""},isLeapYear=function isLeapYear(x){if(x%4===0){if(x%100===0){if(x%400===0){return true}return false}return true}return false},getNumberOfDay=function getNumberOfDay(year,month){if(month===1&&isLeapYear(year)){return 29}return dayCount[month]},getFullDate=function getFullDate(date,type){return MONTHS[dateAPI(date,"Month",type)]+" "+formatDate(dateAPI(date,"Date",type))+", "+dateAPI(date,"FullYear",type)},getFullTime=function getFullTime(date,type){return formatDate(dateAPI(date,"Hours",type))+":"+formatDate(dateAPI(date,"Minutes",type))+":"+formatDate(dateAPI(date,"Seconds",type))};var ScaleCalendarBin=function(_ScaleCalendar){_inheritsLoose(ScaleCalendarBin,_ScaleCalendar);function ScaleCalendarBin(year,month,week,day,hour,minute,second,millisecond){var _this;_this=_ScaleCalendar.call(this,year,month,week,day,hour,minute,second,millisecond)||this;_this._type=BLANK;return _this}var _proto=ScaleCalendarBin.prototype;_proto.getType=function getType(){return this._type};_proto.showPlotOverTick=function showPlotOverTick(){var scale=this,curBin=scale._getRangeThreshold(),minBin=scale.getBinMin();if((minBin[0].name()==="millisecond"||CONTEXT_SEQ.indexOf(curBin[0].name())>-1)&&curBin[1]===1){return true}return false};_proto.getBinBounds=function getBinBounds(pixel,firstTimeStamp){if(firstTimeStamp===void 0){firstTimeStamp=0}var scale=this,scaleType=scale.getType(),curBin=scale._getRangeThreshold(),binLength=curBin[2],i,len,d=scale.getDomainValue(pixel),pX=(d.getTime()-firstTimeStamp)/binLength,curYear=dateAPI(d,"FullYear",scaleType),curMonth=dateAPI(d,"Month",scaleType),curDate=dateAPI(d,"Date",scaleType),curHours=dateAPI(d,"Hours",scaleType),startDate,endDate,nextYear=0;if(curBin[0].name()==="month"){for(i=0;i<12;i+=curBin[1]){if(curMonth>=i&&curMonth<i+curBin[1]){if(scale.showPlotOverTick()){if(curDate>MONTH_MID){i+=1}}break}}startDate=+new Date(d.getFullYear()+nextYear,i,1);endDate=+new Date(d.getFullYear()+nextYear,i+curBin[1],1)}else if(curBin[0].name()==="day"&&scale.showPlotOverTick()){for(i=0,len=getNumberOfDay(curYear,curMonth);i<=len;i++){if(i===curDate){if(curHours>DAY_MID){i+=1}break}}startDate=+new Date(d.getFullYear(),curMonth,i);endDate=+new Date(d.getFullYear(),curMonth,i+1)}else{var floorPx=Math.floor(pX),ceilPx=Math.ceil(pX);if(floorPx===ceilPx){floorPx=Math.floor(floorPx-.5);ceilPx=Math.ceil(ceilPx+.5)}binLength<=1&&pX===-1&&(pX=0);startDate=+firstTimeStamp+floorPx*binLength;endDate=+firstTimeStamp+ceilPx*binLength}return{startDate:startDate,endDate:endDate}};_proto.getBinIndex=function getBinIndex(curTimeStamp,startTimeStamp){var scale=this,curBin=scale._getRangeThreshold(),showPlotOverTick=scale.showPlotOverTick(),squareOff=showPlotOverTick?Math.round:Math.floor,yearsInBetween,startTime=new Date(startTimeStamp),curTime=new Date(curTimeStamp),startMonth,curMonth,startYear,curYear,index,binLength=curBin[2];if(curBin[0].name()==="year"){return squareOff(curBin[0].count(startTimeStamp,curTimeStamp)/curBin[1])}else if(curBin[0].name()==="month"){startYear=dateAPI(startTime,"FullYear",scale.getType());curYear=dateAPI(curTime,"FullYear",scale.getType());startMonth=dateAPI(startTime,"Month",scale.getType());curMonth=dateAPI(curTime,"Month",scale.getType());yearsInBetween=Math.max(0,curYear-startYear-1);if(startYear===curYear){index=Math.floor(curMonth/curBin[1])-Math.floor(startMonth/curBin[1])}else{index=yearsInBetween*12/curBin[1];index+=12/curBin[1]-Math.floor(startMonth/curBin[1]);index+=Math.floor(curMonth/curBin[1])}if(showPlotOverTick&&curTime.getDate()>MONTH_MID){index++}return index}return squareOff((curTimeStamp-startTimeStamp)/binLength)};_proto.getRangeValue=function getRangeValue(startValue,endValue){if(typeof endValue==="undefined"){return _ScaleCalendar.prototype.getRangeValue.call(this,startValue)}if(this.showPlotOverTick()){return _ScaleCalendar.prototype.getRangeValue.call(this,startValue)}return(_ScaleCalendar.prototype.getRangeValue.call(this,startValue)+_ScaleCalendar.prototype.getRangeValue.call(this,endValue))/2};_proto.calculateIndexOfIntervals=function calculateIndexOfIntervals(){var scale=this,intervalIndexMap,thresholdIntervals=scale.thresholdIntervals,i,len=thresholdIntervals.length;scale.intervalIndexMap=intervalIndexMap={};for(i=len-1;i>=0;i--){intervalIndexMap[thresholdIntervals[i][0].name()]=i}};_proto.getNiceMinorTickInterval=function getNiceMinorTickInterval(majorIndex,gap){if(majorIndex===0){return-1}var scale=this,thresholdIntervals=scale.thresholdIntervals,i,domain=scale.getDomain(),minDiff=scale._getRangeThreshold()[2],density,curIntervalName=thresholdIntervals[majorIndex-1][0].name(),len,minAllowedMinorBinIndex,divisible=[];for(i=0,len=thresholdIntervals.length;i<len;i++){if(thresholdIntervals[i][2]>=minDiff){minAllowedMinorBinIndex=i;break}}for(i=majorIndex-1;i>=minAllowedMinorBinIndex;i--){if(thresholdIntervals[i][0].name()!==curIntervalName){break}if(!(thresholdIntervals[i][2]%minDiff)){divisible.push(i)}}density=Math.min(niceMinorTickIndex((domain[1]-domain[0])/gap),divisible.length-1);return pluckNumber(divisible[density],-1)};_proto.getNiceMajorTickInterval=function getNiceMajorTickInterval(curMajorIndex,dayInMajor){if(dayInMajor===void 0){dayInMajor=false}var scale=this,thresholdIntervals=scale.thresholdIntervals,i,len=thresholdIntervals.length,curBin=scale._getRangeThreshold(),minDiff=curBin[2],scaleMode=scale.getMode();if(scaleMode==="random"){if(!dayInMajor&&thresholdIntervals[curMajorIndex][0].name()==="day"&&(thresholdIntervals[curMajorIndex][1]>1||thresholdIntervals[curMajorIndex][2]>minDiff)){for(i=curMajorIndex;i<len;i++){if(thresholdIntervals[i][0].name()!=="day"&&minDiff<thresholdIntervals[i][2]){return i}}}else{for(i=curMajorIndex;i<len;i++){if(thresholdIntervals[i][2]>minDiff){return i}}}}else{if(thresholdIntervals[curMajorIndex][1]!==1||thresholdIntervals[curMajorIndex][2]<=minDiff){for(i=curMajorIndex;i<len;i++){if(thresholdIntervals[i][1]===1&&thresholdIntervals[i][2]>minDiff){return i}}}}return curMajorIndex};_proto.generateContextTicks=function generateContextTicks(curMajorIndex,coincideWithMajor){if(coincideWithMajor===void 0){coincideWithMajor=false}var scale=this,thresholdIntervals=scale.thresholdIntervals,intervalIndexMap=scale.intervalIndexMap,domain=scale.getDomain(),start=domain[0],end=domain[1],majorIntervalName=thresholdIntervals[curMajorIndex][0].name(),desiredContextInterval=CONTEXT_SEQ[CONTEXT_SEQ.indexOf(majorIntervalName)+1],j,len=thresholdIntervals.length,dayStartIndex=intervalIndexMap.day,contextOfStart,contextOfEnd,contextIndex=-1,context,contextTickAr=[];if(coincideWithMajor){contextIndex=curMajorIndex}else{if(majorIntervalName==="day"&&showMonthInDayTick){desiredContextInterval=YEAR}for(j=Math.max(curMajorIndex,dayStartIndex);j<len;j++){if(thresholdIntervals[j][0].name()===desiredContextInterval){contextIndex=j;break}}}if(contextIndex>-1){contextOfStart=getFloorOfDate(new Date(start),thresholdIntervals[contextIndex][0].name(),thresholdIntervals[contextIndex][1],scale.getType());if(context=contextChange(new Date(start),new Date(end),contextIndex,thresholdIntervals,scale.getType())){contextOfEnd=context[1];context=contextOfEnd-thresholdIntervals[contextIndex][2];while(context>=+start){contextTickAr.push(new Date(context));context-=thresholdIntervals[contextIndex][2]}+start!==+contextOfStart&&contextTickAr.push(new Date(contextOfStart));contextTickAr.reverse();contextTickAr.push(new Date(contextOfEnd))}else{contextTickAr.push(contextOfStart)}scale._timeFormat.context=thresholdIntervals[contextIndex][0].name()}return contextTickAr};_proto.getMajorIntervalGap=function getMajorIntervalGap(index,majorIndexAr){var ticks=this,thresholdIntervals=ticks.thresholdIntervals;if(thresholdIntervals[index][0].name()==="month"){return DAY_30}else if(thresholdIntervals[index][0].name()==="year"){return DAY_365}return majorIndexAr[1]-majorIndexAr[0]};_proto.ticks=function ticks(skipInfo,dayInMajor){if(skipInfo===void 0){skipInfo={}}var scale=this,i,j,len,thresholdIntervals=scale.thresholdIntervals,domain=scale.getDomain(),majorIndex,majorIntervalName,minorIndex,majorTicksAr,minorTicksAr,minorTicksArLen,isMajortickInDomain=false,contextTickAr=[],tickValue,start=domain[0],end=domain[1],timeGap,tickAr=[],tickType=[],timeFormat,scaleType=scale.getType();if(!validate(start)||!validate(end)){scale._tickType=[];return[]}scale._timeFormat=timeFormat={};timeGap=end-start+1;for(i=len=thresholdIntervals.length-1;i>=0;i--){if(Math.floor(timeGap/thresholdIntervals[i][2])>1){majorIndex=scale.getNiceMajorTickInterval(i,dayInMajor);majorIntervalName=thresholdIntervals[majorIndex][0].name();start=getFloorOfDate(new Date(start),majorIntervalName,thresholdIntervals[majorIndex][1],scaleType);end=modifyDate(new Date(end),majorIntervalName,thresholdIntervals[majorIndex][1],false,scaleType);end=getFloorOfDate(new Date(end),majorIntervalName,thresholdIntervals[majorIndex][1],scaleType);majorTicksAr=thresholdIntervals[majorIndex][0].range(+start,+end+thresholdIntervals[majorIndex][2],thresholdIntervals[majorIndex][1]);timeFormat.major=majorIntervalName;for(j=0;j<majorTicksAr.length;j++){if(+majorTicksAr[j]>=+domain[0]&&+majorTicksAr[j]<=+domain[1]){isMajortickInDomain=true}}contextTickAr=scale.generateContextTicks(majorIndex,!isMajortickInDomain)||[];break}}if(!majorTicksAr){scale._tickType=[];return tickAr}if(thresholdIntervals[majorIndex][0].name()==="year"&&majorTicksAr.length>10){minorIndex=-1}else{minorIndex=scale.getNiceMinorTickInterval(majorIndex,scale.getMajorIntervalGap(majorIndex,majorTicksAr))}for(i=0,len=majorTicksAr.length;i<len-1;i++){tickAr.push(majorTicksAr[i]);tickType.push(MAJOR);if(minorIndex>-1&&!skipInfo.minor){minorTicksAr=thresholdIntervals[minorIndex][0].range(+majorTicksAr[i],+majorTicksAr[i+1]+1,thresholdIntervals[minorIndex][1]);timeFormat.minor=thresholdIntervals[minorIndex][0].name();for(j=0,minorTicksArLen=minorTicksAr.length;j<minorTicksArLen;j++){tickValue=+minorTicksAr[j];if(j===minorTicksArLen-1&&minorTicksArLen>1){if((+majorTicksAr[i+1]-tickValue)/(tickValue-+minorTicksAr[j-1])<.5){continue}}if(tickValue!==+majorTicksAr[i]&&tickValue!==+majorTicksAr[i+1]){tickAr.push(minorTicksAr[j]);tickType.push(MINOR)}}}}tickAr.push(majorTicksAr[len-1]);tickType.push(MAJOR);if(contextTickAr.length&&!skipInfo.context){for(i=0,len=contextTickAr.length;i<len;i++){tickAr.push(contextTickAr[i]);tickType.push(CONTEXT)}}scale._tickType=tickType;return tickAr};_proto.setDomain=function setDomain(domain){var _ref;if(domain===void 0){domain=[]}var scale;domain[0]>domain[1]&&(_ref=[domain[0],domain[1]],domain[1]=_ref[0],domain[0]=_ref[1],_ref);scale=_ScaleCalendar.prototype.setDomain.call(this,domain);return scale};_proto.nice=function nice(interval,count){var scale=_ScaleCalendar.prototype.nice.call(this,interval,count);this._computeRangeThreshold(DEFAULT_THRESHOLD_PIXELS);return scale};_proto.getFormattedTime=function getFormattedTime(dateInfo,customFormat){if(dateInfo===void 0){dateInfo={}}var scale=this,thresHold=scale._getRangeThreshold(),currentGrouping,timeFormat1,timeFormat2,dateRange=dateInfo.dateRange,timeFormatter,type=dateInfo.type,d1,d2,d1Str,d2Str,isSameDay,isSameMonth,isSameYear,multiplier=thresHold[1],scaleType=scale.getType();if(type==="crossline"||type==="tooltip"){currentGrouping=thresHold[0].name();if(customFormat&&customFormat[currentGrouping]){timeFormat1=timeFormat2=customFormat[currentGrouping];timeFormatter=scaleType==="UTC"?timeConverter.utcFormatter(timeFormat1):timeConverter.formatter(timeFormat1);d1Str=timeFormatter.format(new Date(dateRange.startDate));if(multiplier>1){timeFormatter=scaleType==="UTC"?timeConverter.utcFormatter(timeFormat2):timeConverter.formatter(timeFormat1);d2Str=timeFormatter.format(new Date(dateRange.endDate));return d1Str+" - "+d2Str}return d1Str}timeFormat1=timeFormat2=getFilterdTimeFormat("%b %d, %Y, %I:%M:%S.%L %p",currentGrouping);if(currentGrouping==="hour"){timeFormat1=timeFormat1.replace(/%M/,"");timeFormat2=timeFormat2.replace(/%M/,"")}timeFormat1=timeFormat1.replace(/[:|.]*[\s]/g," ");timeFormat2=timeFormat2.replace(/[:|.]*[\s]/g," ");if(!timeFormat1.match(/%I/)){dateRange.endDate-=1;timeFormat1=timeFormat1.replace(/%p/,"");timeFormat2=timeFormat2.replace(/%p/,"")}d1=new Date(dateRange.startDate);d2=new Date(dateRange.endDate);isSameDay=dateAPI(d1,"Date",scaleType)===dateAPI(d2,"Date",scaleType);isSameMonth=dateAPI(d1,"Month",scaleType)===dateAPI(d2,"Month",scaleType);isSameYear=dateAPI(d1,"FullYear",scaleType)===dateAPI(d2,"FullYear",scaleType);if(multiplier>1){if(isSameYear){if(isSameMonth){if(isSameDay){if(!timeFormat1.match(/%I/)){timeFormat1=timeFormat1.replace(/%b/,"%B");timeFormat2=BLANK}else{timeFormat1=timeFormat1.replace(/%p/,"");timeFormat2=timeFormat2.replace(/%b/,"");timeFormat2=timeFormat2.replace(/%d/,"");timeFormat2=timeFormat2.replace(/%Y/,"")}}else{timeFormat1=timeFormat1.replace(/%Y/,"");if(!timeFormat1.match(/%I/)){timeFormat2=timeFormat2.replace(/%b/,"");timeFormat1=timeFormat1.replace(/%b/,"%B")}}}else{if(multiplier!==1){timeFormat1=timeFormat1.replace(/%Y/,"")}}}}else{if(!timeFormat1.match(/%I/)){timeFormat1=timeFormat1.replace(/%b/,"%B")}}timeFormat1=timeFormat1.trim();timeFormat2=timeFormat2.trim();timeFormat1=timeFormat1.replace(/^[,|\s|:]*/,"").replace(/(\W+$)/,"").replace(/([,]+[\s]*[,]+)|([\s]+[,]+)/g,",");timeFormat2=timeFormat2.replace(/^[,|\s|:]*/,"").replace(/(\W+$)/,"").replace(/([,]+[\s]*[,]+)|([\s]+[,]+)/g,",");if(!timeFormat2||multiplier===1){timeFormatter=scaleType==="UTC"?timeConverter.utcFormatter(timeFormat1):timeConverter.formatter(timeFormat1);d1Str=timeFormatter.format(new Date(dateRange.startDate));return d1Str.trim()}timeFormatter=scaleType==="UTC"?timeConverter.utcFormatter(timeFormat1):timeConverter.formatter(timeFormat1);d1Str=timeFormatter.format(new Date(dateRange.startDate));timeFormatter=scaleType==="UTC"?timeConverter.utcFormatter(timeFormat2):timeConverter.formatter(timeFormat2);d2Str=timeFormatter.format(new Date(dateRange.endDate));return(d1Str+" - "+d2Str).trim()}else if(type==="CRS"){d1Str=getFullDate(dateRange.startDate,scaleType)+(dateInfo.showTimeInLabel?", "+getFullTime(dateRange.startDate,scaleType):"");d2Str=getFullDate(dateRange.endDate,scaleType)+(dateInfo.showTimeInLabel?", "+getFullTime(dateRange.endDate,scaleType):"");return(d1Str+" - "+d2Str).trim()}};_proto.setBinMin=function setBinMin(minBin){this.minBin=minBin;return this};_proto.getBinMin=function getBinMin(){return this.minBin};_proto.setRangeThreshold=function setRangeThreshold(threshold){this._threshold=threshold;return this};_proto._getRangeThreshold=function _getRangeThreshold(){return this._threshold};_proto.setMode=function setMode(mode){this.mode=mode};_proto.getMode=function getMode(){return this.mode};_proto.setThresholdIntervals=function setThresholdIntervals(intervals){this.thresholdIntervals=intervals;this.calculateIndexOfIntervals();return this};_proto.copy=function copy(){return copyScaleBin(this,new ScaleCalendarBin)};return ScaleCalendarBin}(ScaleCalendar);export{modifyDate,getFloorOfDate,copyScaleBin};export default ScaleCalendarBin;