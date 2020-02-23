import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";import{utcMillisecond,utcSecond,utcMinute,utcHour,utcDay,utcWeek,utcMonth,utcYear}from"@fusioncharts/utils/src/time-intervals/utc";import{timeMillisecond,timeSecond,timeMinute,timeHour,timeDay,timeWeek,timeMonth,timeYear}from"@fusioncharts/utils/src/time-intervals";import{pluckNumber,pluck,BLANKSTRING,parseUnsafeString}from"@fusioncharts/core/src/lib";import TimeConverter from"@fusioncharts/utils/src/time-converter";var UNDEF;var GUTTER_5=5,GUTTER_8=8,GUTTER_14=14,M="M",v="v",DIV="<div>",WHITE_HEX="#ffffff",MINIMAL="minimal",RADIUS="1.5",ROLLOVER="timeMarkerRollOver",ROLLOUT="timeMarkerRollOut",CLICK="timeMarkerClick";function isValidUnit(unit){switch(unit){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":case"millisecond":return true;default:return false}}function getInterVal(unit,isUTC){switch(unit){case"year":return isUTC?utcYear:timeYear;case"quarter":return isUTC?utcMonth:timeMonth;case"month":return isUTC?utcMonth:timeMonth;case"week":return isUTC?utcWeek:timeWeek;case"day":return isUTC?utcDay:timeDay;case"hour":return isUTC?utcHour:timeHour;case"minute":return isUTC?utcMinute:timeMinute;case"second":return isUTC?utcSecond:timeSecond;case"millisecond":return isUTC?utcMillisecond:timeMillisecond}}function isWithinMarker(timeMarker,chartX,chartY,marker){var hovered=false,dimensions=marker.markerDim,hoveredMarkerDim,returnObj,i,len;for(i=0,len=dimensions.length;i<len;i++){if(chartX>=dimensions[i].x&&chartX<=dimensions[i].x+dimensions[i].width&&chartY>=dimensions[i].y&&chartY<=dimensions[i].y+dimensions[i].height){hovered=true;timeMarker.config.previouslyHoveredIndex=marker.index;hoveredMarkerDim=dimensions[i];break}}returnObj={pointIndex:marker.index,hovered:hovered,pointObj:{hoveredMarkerDim:hoveredMarkerDim,index:hovered&&i},previouslyHoveredIndex:timeMarker.config.previouslyHoveredIndex,component:timeMarker};return returnObj}var TimeInstanceMarker=function(_SmartRenderer){_inheritsLoose(TimeInstanceMarker,_SmartRenderer);function TimeInstanceMarker(){return _SmartRenderer.apply(this,arguments)||this}var _proto=TimeInstanceMarker.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_SmartRenderer.prototype.__setDefaultConfig.call(this);this.config.defaultStyle={text:{fill:"#808080","font-size":"11px","font-weight":"normal","font-style":"normal","vertical-align":"middle","text-anchor":"middle","fill-opacity":"1","stroke-opacity":"1",opacity:1},marker:{fill:"#f8b8b7",opacity:1,stroke:"#666666",r:2,"stroke-width":"1","stroke-dasharray":"none","fill-opacity":"1","stroke-opacity":"1"}};this.config.hoveredMarkerIndex=UNDEF;this.config.hoveredDomainIndex=UNDEF;this.config.lastHoveredMarkerIndex=UNDEF;this.config.lastHoveredDomainIndex=UNDEF;this.config.previouslyHoveredIndex=UNDEF;this.config.hoveredFromOutside=false;this.config.hoveredLabelFill=WHITE_HEX;this.config.hoveredMarkerRadius=RADIUS;this.config.valueArr=[];this.config.textArr=[];this.config.styleArr=[];this.config.domainArr=[];this.config.repeatationArr=[];this.config.markerDetails=[];this.config.type=MINIMAL};_proto.getHoveredMarker=function getHoveredMarker(chartXArg,chartYArg){var timeMarker=this,chartX=chartXArg,chartY=chartYArg,selfConfig=timeMarker.config,canvas=timeMarker.getLinkedParent(),translationObj=canvas.getTranslation(),hoverDetails,markerDetails=selfConfig.markerDetails,i;chartX-=translationObj.x;chartY-=translationObj.y;for(i=markerDetails.length-1;i>=0;i--){hoverDetails=isWithinMarker(timeMarker,chartX,chartY,markerDetails[i]);if(hoverDetails.hovered){break}}return hoverDetails};_proto.setHoverInEffect=function setHoverInEffect(hoveredMarkerIndex,hoveredDomainIndex,hoveredFromOutside){var timeMarker=this,chart=timeMarker.getFromEnv("chart");timeMarker.setData({hoveredMarkerIndex:hoveredMarkerIndex,hoveredDomainIndex:hoveredDomainIndex,hoveredFromOutside:hoveredFromOutside},true);chart.fireEvent("timeInstanceMarkerHovered",{senderTimeMarker:timeMarker,hoveredMarkerIndex:hoveredMarkerIndex,hoveredDomainIndex:hoveredDomainIndex,hoveredFromOutside:true})};_proto.setHoverOutEffect=function setHoverOutEffect(){var timeMarker=this,config=timeMarker.config,chart=timeMarker.getFromEnv("chart");timeMarker.setData({lastHoveredMarkerIndex:config.hoveredMarkerIndex,lastHoveredDomainIndex:config.hoveredDomainIndex,hoveredMarkerIndex:UNDEF,hoveredDomainIndex:UNDEF},true);chart.fireEvent("timeInstanceMarkerHovered",{senderTimeMarker:timeMarker,hoveredMarkerIndex:UNDEF,hoveredDomainIndex:UNDEF,hoveredFromOutside:true})};_proto.fireMarkerEvents=function fireMarkerEvents(type,hoverMarkerIndex,hoverDomainIndex){var timeMarker=this,config=timeMarker.config,valueArr=config.valueArr,domainArr=config.domainArr,repeatArr=config.repeatationArr,markerIndex,domainIndex,chart=timeMarker.getFromEnv("chart"),dateFormatter,startMS,isUTC=timeMarker.getFromEnv("isUTC"),timeFormat,eventToBeFired;switch(type){case"fc-mouseover":eventToBeFired=ROLLOVER;markerIndex=hoverMarkerIndex;domainIndex=hoverDomainIndex;break;case"fc-mouseout":markerIndex=config.lastHoveredMarkerIndex;domainIndex=config.lastHoveredDomainIndex;if(markerIndex!==UNDEF&&domainIndex!==UNDEF){eventToBeFired=ROLLOUT}break;case"fc-click":eventToBeFired=CLICK;markerIndex=hoverMarkerIndex;domainIndex=hoverDomainIndex;break}if(eventToBeFired){timeFormat=valueArr[markerIndex].timeFormat;dateFormatter=isUTC?TimeConverter.utcFormatter(timeFormat):TimeConverter.formatter(timeFormat);startMS=+domainArr[markerIndex][domainIndex];chart.fireChartInstanceEvent(eventToBeFired,{start:startMS,startText:dateFormatter.format(startMS),end:UNDEF,endText:BLANKSTRING,formatter:timeFormat,type:valueArr[markerIndex].type,label:repeatArr[markerIndex][domainIndex].labels})}};_proto.getToolTextConfiguration=function getToolTextConfiguration(toolTextArr){var timeMarker=this,_timeMarker$getFromEn=timeMarker.getFromEnv("tooltipStyle"),headerStyle=_timeMarker$getFromEn.header,bodyStyle=_timeMarker$getFromEn.body,totalWidth=2*GUTTER_5+2*GUTTER_8+GUTTER_14,totalHeight=6*GUTTER_5+2*GUTTER_8,smartLabel=timeMarker.getFromEnv("smartLabel"),returnObj={},i,len,smartText;smartLabel.setStyle({"font-size":headerStyle["font-size"],"font-family":headerStyle["font-family"],"font-weight":headerStyle["font-weight"]});smartText=smartLabel.getOriSize(toolTextArr[0]);totalWidth+=smartText.width;totalHeight+=smartText.height;returnObj.header="<div style='margin: 5px;'>"+toolTextArr[0]+"</div>";returnObj.body=DIV;smartLabel.setStyle({"font-size":bodyStyle["font-size"],"font-family":bodyStyle["font-family"],"font-weight":bodyStyle["font-weight"]});if(toolTextArr.length>2){returnObj.body+="</br>";for(i=1,len=toolTextArr.length;i<len;i++){if(toolTextArr[i]){smartText=smartLabel.getOriSize(toolTextArr[i]);totalHeight+=smartText.height;totalWidth=Math.max(totalWidth,smartText.width);returnObj.body+="<div style= 'margin: 5px;'>"+i+". "+toolTextArr[i]+"</div>"}}}else if(toolTextArr.length===2){if(toolTextArr[1]){smartText=smartLabel.getOriSize(toolTextArr[1]);totalHeight+=smartText.height;totalWidth=Math.max(totalWidth,smartText.width);returnObj.body+="<div style= 'margin: 5px;'>"+toolTextArr[1]+"</div>"}}returnObj.body+="</div>";returnObj.dimensions={width:totalWidth,height:totalHeight};return returnObj};_proto.reCalculateDimension=function reCalculateDimension(i,j,lineHeight){var timeMarker=this,selfConfig=timeMarker.config,value=selfConfig.domainArr[i][j],xScale=timeMarker.config.xScale,canvasConfig=timeMarker.getLinkedParent().config,canvasPadding=canvasConfig.padding,leftPadding=canvasPadding.left,rightPadding=canvasPadding.right,topPadding=canvasPadding.top,bottomPaddding=canvasPadding.bottom,startRangeValue=xScale.getRangeValue(value),markerDim=selfConfig.markerDetails[i].markerDim[j],x=startRangeValue-lineHeight/2-leftPadding+rightPadding,y=canvasConfig.canvasBGTop+canvasConfig.canvasBGHeight-lineHeight/2-topPadding+bottomPaddding,width=2*lineHeight/2,height=2*lineHeight/2;markerDim.x=x;markerDim.y=y;markerDim.width=width;markerDim.height=height;markerDim.thresholdX=x<canvasConfig.canvasBGLeft?x-canvasConfig.canvasBGLeft:x+width>canvasConfig.canvasBGLeft+canvasConfig.canvasBGWidth?x+width-(canvasConfig.canvasBGLeft+canvasConfig.canvasBGWidth):0;markerDim.thresholdY=lineHeight/2};_proto.getMarkerDimension=function getMarkerDimension(value,lineHeight){var timeMarker=this,xScale=timeMarker.config.xScale,canvasConfig=timeMarker.getLinkedParent().config,canvasPadding=canvasConfig.padding,leftPadding=canvasPadding.left,rightPadding=canvasPadding.right,topPadding=canvasPadding.top,bottomPaddding=canvasPadding.bottom,startRangeValue=xScale.getRangeValue(value),x=startRangeValue-lineHeight/2-leftPadding+rightPadding,y=canvasConfig.canvasBGTop+canvasConfig.canvasBGHeight-lineHeight/2-topPadding+bottomPaddding,width=2*lineHeight/2,height=2*lineHeight/2;return{x:x,y:y,width:width,height:height,thresholdX:x<canvasConfig.canvasBGLeft?x-canvasConfig.canvasBGLeft:x+width>canvasConfig.canvasBGLeft+canvasConfig.canvasBGWidth?x+width-(canvasConfig.canvasBGLeft+canvasConfig.canvasBGWidth):0,thresholdY:lineHeight/2}};_proto.getMarkerAndLabelConfiguration=function getMarkerAndLabelConfiguration(index,mergedStyle){var timeMarker=this,selfConfig=timeMarker.config,xScale=timeMarker.config.xScale,xScaleDomain=xScale.getDomain(),value=selfConfig.valueArr[index],repeat=value.repeat,domainArr,lineHeight=parseFloat(mergedStyle.text["line-height"]);selfConfig.markerDetails[index].markerDim=[];selfConfig.markerDetails[index].index=index;selfConfig.domainArr[index]=[];if(!repeat&&+value.start>=+xScaleDomain[0]&&+value.start<=+xScaleDomain[1]){selfConfig.domainArr[index].push(value.start);selfConfig.markerDetails[index].markerDim.push(timeMarker.getMarkerDimension(value.start,lineHeight))}else if(repeat){selfConfig.domainArr[index]=domainArr=timeMarker.getAllValidDomains(value.start,value.repeat);if(domainArr.length){domainArr.forEach((function(domain){selfConfig.markerDetails[index].markerDim.push(timeMarker.getMarkerDimension(domain,lineHeight))}))}}};_proto.getAllValidDomains=function getAllValidDomains(startValueArg,repeatConfig){var timeMarker=this,startValue=startValueArg,scale=timeMarker.config.xScale,totalDomain=scale.getDomain(),domainArr=[];if(+startValue<+totalDomain[0]&&repeatConfig.multiplier>0){while(+startValue<+totalDomain[0]){startValue=repeatConfig.interval.offset(startValue,repeatConfig.multiplier)}}while(+startValue<=+totalDomain[1]){domainArr.push(startValue);startValue=repeatConfig.interval.offset(startValue,repeatConfig.multiplier)}return domainArr};_proto.configureAttributes=function configureAttributes(obj){if(obj===void 0){obj={}}_SmartRenderer.prototype.configureAttributes.call(this,obj);var timeMarker=this,config=timeMarker.config,styleArr=[],textArr=[],isUTC=timeMarker.getFromEnv("isUTC"),valueArr=[],valueObj,parser,startValue,unit,timeFormat,getStyleDef=timeMarker.getFromEnv("getStyleDef"),chartDefaultTextStyle=timeMarker.getFromEnv("textStyle"),baseTextStyle=timeMarker.getFromEnv("baseTextStyle"),timeMarkerConf=obj.timeMarker||[],i,len,marker,styles,textStyle,markerStyle,markerHoverStyle,markerBoxStyle,markerNotchStyle,markerLineStyle,userMarkerHoverStyle,defaultMergeTextStyle=Object.assign({},chartDefaultTextStyle,config.defaultStyle.text,baseTextStyle);for(i=0,len=timeMarkerConf.length;i<len;i++){marker=timeMarkerConf[i];if(!marker.start||marker.start===BLANKSTRING){continue}timeFormat=pluck(marker.timeformat,obj.defaultFormat);parser=isUTC?TimeConverter.utcParser(timeFormat):TimeConverter.parser(timeFormat);startValue=parser.parse(marker.start);if(!startValue){continue}valueObj={start:startValue,startString:marker.start,timeFormat:timeFormat,type:marker.type||config.type};if(marker.repeat&&marker.repeat.unit&&Math.floor(+marker.repeat.multiplier)!==0&&isValidUnit(unit=marker.repeat.unit.toLowerCase())){valueObj.repeat={interval:getInterVal(unit,isUTC),multiplier:(unit==="quarter"?3:1)*pluckNumber(marker.repeat.multiplier,1)}}styles=marker.style||{};valueArr.push(valueObj);textStyle=Object.assign({},defaultMergeTextStyle,{},getStyleDef(styles.text));markerStyle=Object.assign({},config.defaultStyle.marker,getStyleDef(styles.marker));userMarkerHoverStyle=getStyleDef(styles["marker:hover"]);markerHoverStyle=Object.assign({},markerStyle,userMarkerHoverStyle);markerBoxStyle=Object.assign({},markerStyle,getStyleDef(styles["marker-box"]));markerNotchStyle=Object.assign({},markerStyle,getStyleDef(styles["marker-notch"]));markerLineStyle=Object.assign({},markerStyle,getStyleDef(styles["marker-line"]));styleArr.push({text:textStyle,"text:hover":Object.assign({},textStyle,getStyleDef(styles["text:hover"])),marker:markerStyle,"marker:hover":markerHoverStyle,"marker-box":markerBoxStyle,"marker-box:hover":Object.assign({},markerBoxStyle,userMarkerHoverStyle,getStyleDef(styles["marker-box:hover"])),"marker-notch":markerNotchStyle,"marker-notch:hover":Object.assign({},markerNotchStyle,userMarkerHoverStyle,getStyleDef(styles["marker-notch:hover"])),"marker-line":markerLineStyle,"marker-line:hover":Object.assign({},markerLineStyle,userMarkerHoverStyle,getStyleDef(styles["marker-line:hover"]))});textArr.push(pluck(parseUnsafeString(marker.label),""))}if(obj.xScale)config.xScale=obj.xScale;config.hoveredMarkerIndex=obj.hoveredMarkerIndex;config.hoveredDomainIndex=obj.hoveredDomainIndex;config.lastHoveredMarkerIndex=obj.lastHoveredMarkerIndex;config.lastHoveredDomainIndex=obj.lastHoveredDomainIndex;config.hoveredFromOutside=obj.hoveredFromOutside;if(obj.timeMarker){config.valueArr=valueArr;config.styleArr=styleArr;config.textArr=textArr}};_proto.createToolipConfiguration=function createToolipConfiguration(){var timeMarker=this,selfConfig=timeMarker.config,markerDetails=selfConfig.markerDetails,totalDomain=selfConfig.domainArr,repeatationArr=selfConfig.repeatationArr,valueArr=selfConfig.valueArr,domainArr,timeFormat,isUTC=timeMarker.getFromEnv("isUTC"),dateFormatter,dateLabel,toolText=[],i,j;for(i=0;i<totalDomain.length;i++){domainArr=totalDomain[i];timeFormat=valueArr[i].timeFormat;dateFormatter=isUTC?TimeConverter.utcFormatter(timeFormat):TimeConverter.formatter(timeFormat);for(j=0;j<domainArr.length;j++){toolText=[];dateLabel=dateFormatter.format(domainArr[j]);toolText=toolText.concat([dateLabel],repeatationArr[i][j].labels);markerDetails[i].markerDim[j].toolTextArr=toolText}}};_proto.getRepeatationArr=function getRepeatationArr(){var timeMarker=this,selfConfig=timeMarker.config,domainArr=selfConfig.domainArr,textArr=selfConfig.textArr,markerDetails=selfConfig.markerDetails,currIndex,sliceIndex,repeatationArr=[],convertedDomainArr,domainValues,value,i,j;for(i=0;i<domainArr.length;i++){domainValues=domainArr[i];repeatationArr[i]=[];for(j=0;j<domainValues.length;j++){currIndex=i;value=domainValues[j];repeatationArr[i][j]={domainValue:value,labels:[],markerDimIndex:j};textArr[i]&&repeatationArr[i][j].labels.push(textArr[i]);while(currIndex+1<domainArr.length){convertedDomainArr=domainArr[currIndex+1].map((function(domain){return+domain}));if((sliceIndex=convertedDomainArr.indexOf(+value))!==-1){textArr[currIndex+1]&&repeatationArr[i][j].labels.push(textArr[currIndex+1]);domainArr[currIndex+1]=domainArr[currIndex+1].filter((function(domainValue){return+domainValue!==+value}));markerDetails[currIndex+1].markerDim=markerDetails[currIndex+1].markerDim.filter((function(domainValue,index){return index!==sliceIndex}))}currIndex++}}}return repeatationArr};_proto.draw=function draw(){var timeMarker=this,selfConfig=timeMarker.config,values=selfConfig.valueArr,styleArr=selfConfig.styleArr,i,len;timeMarker.addGraphicalElement({el:"group",container:{id:"thermo",label:"thermo",isParent:true},component:timeMarker,label:"timeMarkerHoverGroup",attr:{name:"time-marker-hover-elem-group"},id:"timeMarker"});timeMarker.addGraphicalElement({el:"group",container:{id:"thermo",label:"thermo",isParent:true},component:timeMarker,label:"timeMarker",attr:{name:"time-marker-group"},id:"timeMarker"});selfConfig.markerDetails=[];for(i=0,len=values.length;i<len;i++){selfConfig.markerDetails[i]={};timeMarker.getMarkerAndLabelConfiguration(i,styleArr[i])}selfConfig.repeatationArr=timeMarker.getRepeatationArr();timeMarker.createToolipConfiguration();timeMarker.drawTimeMarkers();timeMarker.drawTimeMarkerLabels()};_proto.drawTimeMarkers=function drawTimeMarkers(){var timeMarker=this,selfConfig=timeMarker.config,markerDetails=selfConfig.markerDetails,markerArr,markerDim,isHovered,type,parentConfig=timeMarker.getLinkedParent().config,padding=parentConfig.padding,styleArr=selfConfig.styleArr,lineHeight,style,i,j;for(i=0;i<markerDetails.length;i++){markerArr=markerDetails[i].markerDim;type=selfConfig.valueArr[i].type;for(j=0;j<markerArr.length;j++){isHovered=i===selfConfig.hoveredMarkerIndex&&j===selfConfig.hoveredDomainIndex;style=styleArr[i];lineHeight=parseFloat(isHovered?style["text:hover"]["line-height"]:style.text["line-height"],10);if(lineHeight!==parseFloat(style.text["line-height"],10)){timeMarker.reCalculateDimension(i,j,lineHeight)}markerDim=markerArr[j];if(isHovered||type==="full"){timeMarker.addGraphicalElement({el:"path",attr:{path:[M,markerDim.x+markerDim.width/2,markerDim.y+markerDim.height/2,v,-parentConfig.canvasBGHeight],opacity:isHovered?style["marker-line:hover"].opacity:style["marker-line"].opacity},container:{label:"timeMarkerHoverGroup"},id:"time-instance-marker-path-"+i+j,css:isHovered?style["marker-line:hover"]:style["marker-line"],component:timeMarker,label:"path"});timeMarker.addGraphicalElement({el:"circle",attr:{cx:markerDim.x+markerDim.width/2,cy:parentConfig.canvasTop+selfConfig.hoveredMarkerRadius+padding.bottom-padding.top,r:selfConfig.hoveredMarkerRadius,opacity:isHovered?style["marker-notch:hover"].opacity:style["marker-notch"].opacity},container:{label:"timeMarkerHoverGroup"},css:isHovered?style["marker-notch:hover"]:style["marker-notch"],id:"time-instance-marker-circle-"+i+j,component:timeMarker,label:"path"})}timeMarker.addGraphicalElement({el:"rect",attr:{x:markerDim.x,y:markerDim.y,width:markerDim.width,height:markerDim.height,opacity:isHovered?style["marker-box:hover"].opacity:style["marker-box"].opacity},container:{label:"timeMarker"},css:isHovered?style["marker-box:hover"]:style["marker-box"],id:"time-instance-marker-rect-"+i+j,component:timeMarker,label:"rect"})}}};_proto.drawTimeMarkerLabels=function drawTimeMarkerLabels(){var timeMarker=this,selfConfig=timeMarker.config,markerDetails=selfConfig.markerDetails,markerDim,repeatArr=selfConfig.repeatationArr,repeatConfig,isHovered,repeatDetails,labelLength,styleArr=selfConfig.styleArr,i,j;for(i=0;i<repeatArr.length;i++){repeatConfig=repeatArr[i];for(j=0;j<repeatConfig.length;j++){repeatDetails=repeatConfig[j];isHovered=i===selfConfig.hoveredMarkerIndex&&j===selfConfig.hoveredDomainIndex;if((labelLength=repeatDetails.labels.length)>1){markerDim=markerDetails[i].markerDim[repeatDetails.markerDimIndex];timeMarker.addGraphicalElement({el:"text",attr:{x:markerDim.x+markerDim.width/2,y:markerDim.y+markerDim.height/2,text:labelLength,opacity:isHovered?styleArr[i]["text:hover"].opacity:styleArr[i].text.opacity},container:{label:"timeMarker"},css:isHovered?styleArr[i]["text:hover"]:styleArr[i].text,id:"time-instance-marker-text-"+i+j,component:timeMarker,label:"text"},true)}}}};_proto.getType=function getType(){return"timeMarker"};_proto.getName=function getName(){return"timeInstanceMarker"};return TimeInstanceMarker}(SmartRenderer);export default TimeInstanceMarker;