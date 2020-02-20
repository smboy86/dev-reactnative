import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{preDefStr,parseTooltext,pluck,getValidValue,pluckNumber,getFirstValue,isIE,HUNDREDSTRING,hasTouch,TOUCH_THRESHOLD_PIXELS,CLICK_THRESHOLD_PIXELS,parseUnsafeString,convertColor,getFirstColor,getFirstAlpha}from"@fusioncharts/core/src/lib";import{_getHoveredPlot as _getHoveredPlot2,_firePlotEvent as _firePlotEvent2,_checkPointerOverErrorBar as _checkPointerOverErrorBar2,removePlots as _removePlots}from"../errorbar2d";import LINEDataset from"@fusioncharts/charts/src/dataset/line";import{addDep}from"@fusioncharts/core/src/dependency-manager";import errorlineErrorAnimation from"./error.animation";import errorlineLineAnimation from"./line.animation";var colorStrings=preDefStr.colors,COLOR_AAAAAA=colorStrings.AAAAAA,ROUND=preDefStr.ROUND,PERCENTAGESTRING=preDefStr.PERCENTAGESTRING,BLANKSTRING="",UNDEF,COMMASPACE=", ",POINTER="pointer",TRACKER_FILL="rgba(192,192,192,"+(isIE?.002:1e-6)+")",M="M",H="H",V="V",math=Math,mathRound=math.round,mathMin=math.min,mathMax=math.max,mathAbs=math.abs,HTP=hasTouch?TOUCH_THRESHOLD_PIXELS:CLICK_THRESHOLD_PIXELS;addDep({name:"errorlineErrorAnimation",type:"animationRule",extension:errorlineErrorAnimation});addDep({name:"errorlineLineAnimation",type:"animationRule",extension:errorlineLineAnimation});var ErrorLineDataset=function(_LINEDataset){_inheritsLoose(ErrorLineDataset,_LINEDataset);function ErrorLineDataset(){var _this;_this=_LINEDataset.call(this)||this;_this.drawCallbackFn=function(state){return function(){if(state==="disappearing"){this.hide()}}};return _this}var _proto=ErrorLineDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"errorLine"};_proto.ErrorValueConfigure=function ErrorValueConfigure(){var dataSet=this,chart=dataSet.getFromEnv("chart"),conf=dataSet.config,parentYAxis=conf.parentYAxis,JSONData=conf.JSONData,setDataArr=JSONData.data,chartAttr=chart.getFromEnv("dataSource").chart,len=dataSet.getFromEnv("xAxis").getTicksLen(),setData,dataObj,config,dataStore=dataSet.components.data,numberFormatter=dataSet.getFromEnv("number-formatter"),toolTipValue,errorBarAlpha,errorBarThickness,setErrorValue,formatedVal,setTooltext,positiveCumulativeErrorTooltext,negativeCumulativeErrorTooltext,positiveErrorToolText,negativeErrorToolText,errorBarShadow,lineThickness=conf.linethickness,maxValue=-Infinity,minValue=Infinity,maxErrorValue,minErrorValue,setValue,errorValue,cumulativeValueOnErrorBar,tooltipSepChar=pluck(chartAttr.tooltipsepchar,COMMASPACE),macroIndices,parserConfig,seriesname,errorInPercent,errorToolText,seriesNameInTooltip=pluckNumber(chartAttr.seriesnameintooltip,1),getTooltext=function getTooltext(setToolText){var toolText;if(!chart.config.showtooltip){toolText=false}else{if(formatedVal===null){toolText=false}else if(setToolText!==UNDEF){macroIndices=[1,2,3,4,5,6,7,99,100,101,102];parserConfig={yaxisName:parseUnsafeString(chartAttr.yaxisname),xaxisName:parseUnsafeString(chartAttr.xaxisname),formattedValue:config.toolTipValue,errorValue:setErrorValue,errorDataValue:config.errorToolTipValue,errorPercentValue:config.errorPercentValue,errorPercentDataValue:config.errorPercentValue,label:config.label};toolText=parseTooltext(setToolText,macroIndices,parserConfig,setData,chartAttr,JSONData)}else{if(seriesNameInTooltip){seriesname=getFirstValue(JSONData&&JSONData.seriesname)}toolText=seriesname?seriesname+tooltipSepChar:BLANKSTRING;toolText+=config.label?config.label+tooltipSepChar:BLANKSTRING}}return toolText},i;conf.errorBarShadow=errorBarShadow=pluckNumber(chartAttr.errorbarshadow,chartAttr.showshadow,1);conf.ignoreEmptyDatasets=pluckNumber(JSONData.ignoreemptydatasets,0);conf.notHalfErrorBar=!pluckNumber(chartAttr.halferrorbar,1);errorBarAlpha=getFirstAlpha(pluck(JSONData.errorbaralpha,chartAttr.errorbaralpha,conf.alpha));conf.errorBarWidth=pluckNumber(JSONData.errorbarwidth,chartAttr.errorbarwidth,5);conf.errorBarColor=convertColor(getFirstColor(pluck(JSONData.errorbarcolor,chartAttr.errorbarcolor,COLOR_AAAAAA)),errorBarAlpha);errorBarThickness=pluckNumber(JSONData.errorbarthickness,chartAttr.errorbarthickness,1);conf.errorBarThickness=errorBarThickness>lineThickness?lineThickness:errorBarThickness;conf.shadowOpacity=errorBarShadow?errorBarAlpha/250:0;conf.errorInPercent=errorInPercent=pluckNumber(JSONData.errorinpercent,chartAttr.errorinpercent);conf.cumulativeValueOnErrorBar=pluckNumber(JSONData.cumulativevalueonerrorbar,chartAttr.cumulativevalueonerrorbar,1);for(i=0;i<len;i++){setData=setDataArr&&setDataArr[i];if(!setDataArr||!setData){continue}dataObj=dataStore[i];config=dataObj&&dataObj.config;if(!dataObj){dataObj=dataStore[i]={graphics:{}}}if(!dataObj.config){config=dataStore[i].config={}}setValue=config.setValue;config.notHalfErrorBar=conf.notHalfErrorBar;setErrorValue=numberFormatter.getCleanValue(setData.errorvalue);config.errorToolTipValue=numberFormatter.dataLabels(setErrorValue,parentYAxis);config.setErrorValue=config.errorValue=errorValue=setErrorValue;config.hasErrorValue=pluckNumber(setData.errorvalue)!==UNDEF?1:0;toolTipValue=config.errorToolTipValue;formatedVal=toolTipValue;setTooltext=getValidValue(parseUnsafeString(pluck(setData.errorplottooltext,JSONData.errorplottooltext,chartAttr.errorplottooltext,formatedVal)));errorToolText=getTooltext(setTooltext);config.errorInPercent=pluckNumber(setData.errorinpercent,errorInPercent,0);config.errorInPercent&&(config.setErrorValue=setErrorValue=pluckNumber((setErrorValue/100*setValue).toFixed(2)));config.cumulativeValueOnErrorBar=cumulativeValueOnErrorBar=pluckNumber(setData.cumulativevalueonerrorbar,conf.cumulativeValueOnErrorBar,1);config.positiveErrorValue=numberFormatter.getCleanValue(pluckNumber(setData.positiveerrorvalue,setData.errorvalue));config.errorInPercent&&config.positiveErrorValue&&(config.positiveErrorValue=pluckNumber((config.positiveErrorValue/100*setValue).toFixed(2)));config.positiveCumulativeErrorValue=setValue+pluckNumber(config.positiveErrorValue,config.setErrorValue);config.negativeErrorValue=numberFormatter.getCleanValue(pluckNumber(setData.negativeerrorvalue,setData.errorvalue));config.errorInPercent&&config.negativeErrorValue&&(config.negativeErrorValue=pluckNumber((config.negativeErrorValue/100*setValue).toFixed(2)));config.negativeCumulativeErrorValue=setValue-pluckNumber(config.negativeErrorValue,config.setErrorValue);config.errorToolTipValue=numberFormatter.dataLabels(setErrorValue,parentYAxis);config.negativeErrorToolTipValue=numberFormatter.dataLabels(config.negativeErrorValue,parentYAxis);config.negativeCumulativeErrorTooltipValue=numberFormatter.dataLabels(config.negativeCumulativeErrorValue,parentYAxis);config.positiveErrorToolTipValue=numberFormatter.dataLabels(config.positiveErrorValue,parentYAxis);config.positiveCumulativeErrorTooltipValue=numberFormatter.dataLabels(config.positiveCumulativeErrorValue,parentYAxis);config.errorPercentValue=mathRound(setErrorValue/setValue*HUNDREDSTRING*HUNDREDSTRING)/HUNDREDSTRING+PERCENTAGESTRING;positiveErrorToolText=negativeErrorToolText=UNDEF;setTooltext=getValidValue(parseUnsafeString(pluck(setData.errorplottooltext,JSONData.errorplottooltext,chartAttr.errorplottooltext,config.positiveErrorToolTipValue)));setTooltext&&config.positiveErrorToolTipValue&&(positiveErrorToolText=getTooltext(setTooltext));setTooltext=getValidValue(parseUnsafeString(pluck(setData.errorplottooltext,JSONData.errorplottooltext,chartAttr.errorplottooltext,config.negativeErrorToolTipValue)));setTooltext&&config.negativeErrorToolTipValue&&(negativeErrorToolText=getTooltext(setTooltext));if(setData.positiveerrorvalue||setData.negativeerrorvalue){config.halfErrorBar=0;config.notHalfErrorBar=true}if(cumulativeValueOnErrorBar){setTooltext=getValidValue(parseUnsafeString(pluck(setData.errorplottooltext,JSONData.errorplottooltext,chartAttr.errorplottooltext,config.positiveCumulativeErrorTooltipValue)));setTooltext&&config.positiveCumulativeErrorTooltipValue&&(positiveCumulativeErrorTooltext=getTooltext(setTooltext));setTooltext=getValidValue(parseUnsafeString(pluck(setData.errorplottooltext,JSONData.errorplottooltext,chartAttr.errorplottooltext,config.negativeCumulativeErrorTooltipValue)));setTooltext&&config.negativeCumulativeErrorTooltipValue&&(negativeCumulativeErrorTooltext=getTooltext(setTooltext))}maxErrorValue=setValue+(config.positiveErrorValue!==null?config.positiveErrorValue:setErrorValue);minErrorValue=setValue-(config.halfErrorBar?0:config.negativeErrorValue<0&&setValue<0?0:config.negativeErrorValue!==null?config.negativeErrorValue:setErrorValue);maxValue=mathMax(maxValue,maxErrorValue,minErrorValue);minValue=mathMin(minValue,maxErrorValue,minErrorValue);if(setErrorValue===null){setErrorValue=UNDEF}config.errorValueArr=[];config.positiveErrorValue===null&&(config.positiveErrorValue=UNDEF);errorValue=-config.positiveErrorValue;config.errorValueArr.push({errorValue:errorValue,tooltext:cumulativeValueOnErrorBar?positiveCumulativeErrorTooltext:positiveErrorToolText||errorToolText,errorEdgeBar:true});config.errorValueArr.push({errorValue:errorValue,tooltext:positiveErrorToolText||errorToolText});if(config.notHalfErrorBar){errorValue=config.negativeErrorValue;config.errorValueArr.push({errorValue:errorValue,tooltext:cumulativeValueOnErrorBar?negativeCumulativeErrorTooltext:negativeErrorToolText||errorToolText,errorEdgeBar:true});config.errorValueArr.push({errorValue:errorValue,tooltext:negativeErrorToolText||errorToolText})}config.toolText=getTooltext(config.setTooltext)}conf.maxValue=maxValue;conf.minValue=minValue};_proto._show=function _show(){var dataSet=this,chart=dataSet.chart,container=dataSet.graphics&&dataSet.graphics.container,dataLabelContainer=dataSet.graphics&&dataSet.graphics.dataLabelContainer,errorGroupContainer=dataSet.graphics&&dataSet.graphics.errorGroupContainer,errorShadowContainer=dataSet.graphics&&dataSet.graphics.errorShadowContainer;chart._chartAnimation();container.lineGroup.show();container.anchorGroup.show();container.anchorShadowGroup.show();container.lineShadowGroup.show();dataLabelContainer.show();dataSet.setState("visible",true);errorGroupContainer&&errorGroupContainer.show();errorShadowContainer&&errorShadowContainer.show();dataSet._conatinerHidden=false;chart._setAxisLimits();dataSet.yAxis.draw();chart._drawDataset()};_proto._hide=function _hide(){var dataSet=this,chart=dataSet.chart;chart._chartAnimation();dataSet.setState("visible",false);chart._setAxisLimits();dataSet.yAxis.draw();chart._drawDataset()};_proto.draw=function draw(){_LINEDataset.prototype.draw.call(this);this.drawErrorValue()};_proto.drawErrorValue=function drawErrorValue(){var dataSet=this,conf=dataSet.config,len=dataSet.getFromEnv("xAxis").getTicksLen(),attr,i,j,k,state,visible=dataSet.getState("visible"),yAxis=dataSet.getFromEnv("yAxis"),dataStore=dataSet.components.data,errorBarThickness=conf.errorBarThickness,setLink,xPos,yPos,dataObj,setValue,config,crispY,crispX,errorPath,errorValPos,errorValuePosFactor,errorValueArr,errorValueObj,errorValue,errorStartPos,errorLen,halfErrorBarW,errorLineElem,plotXpos,trackerTolerance=errorBarThickness>5?errorBarThickness/2:2.5,plotYpos,animationManager=dataSet.getFromEnv("animationManager"),errorTrackerConfig;for(i=0;i<len;i++){dataObj=dataStore[i];config=dataObj&&dataObj.config;setValue=config&&config.setValue;if(dataObj===UNDEF||setValue===UNDEF||setValue===null){if(dataObj&&dataObj.graphics.error){for(j=0;j<dataObj.graphics.error.length;j++){dataObj.graphics.error&&dataObj.graphics.error[j]&&animationManager.setAnimation({el:dataObj.graphics.error[j]||"path",label:"path",component:dataSet,doNotRemove:true,callback:dataSet.drawCallbackFn("disappearing")}).shadow({opacity:0})}}continue}errorTrackerConfig=dataObj.errorTrackerConfig={};errorTrackerConfig.errorTrackerArr=[];errorValueArr=config.errorValueArr;errorTrackerConfig.errorLen=errorLen=errorValueArr.length;!dataObj.graphics.error&&(dataObj.graphics.error=[]);!dataObj.graphics.errorTracker&&(dataObj.graphics.errorTracker=[]);if(config.errorValue===BLANKSTRING||config.errorValue===UNDEF||config.errorValue===null&&config.positiveErrorValue===null&&config.negativeErrorValue===null){for(k=0;k<errorLen;k++){dataObj.graphics.error&&dataObj.graphics.error[k]&&animationManager.setAnimation({el:dataObj.graphics.error[k]||"path",label:"path",component:dataSet,callback:dataSet.drawCallbackFn("disappearing")}).shadow({opacity:0})}continue}setLink=config.setLink;plotXpos=dataObj._xPos;plotYpos=dataObj._yPos;yPos=plotYpos;xPos=plotXpos;dataObj.errorBar&&delete dataObj.errorBar;dataObj.errorBar=[];while(errorLen--){errorLineElem=null;errorTrackerConfig.errorTrackerArr[errorLen]={};errorValueObj=errorValueArr[errorLen];errorTrackerConfig.errorTrackerArr[errorLen].tooltext=errorValueObj.tooltext;errorStartPos=yPos;errorValue=errorValueObj.errorValue;if(errorValue===null||isNaN(errorValue)){if(dataObj.graphics.error&&dataObj.graphics.error[errorLen]){dataObj.graphics.error[errorLen].hide();dataObj.graphics.error[errorLen].shadow({opacity:0})}continue}halfErrorBarW=conf.errorBarWidth/2;errorValuePosFactor=!visible?0:1;errorValPos=plotYpos+(yAxis.getPixel(0)-yAxis.getPixel(1))*errorValue*errorValuePosFactor;crispY=errorValPos;crispX=xPos;crispY=mathRound(errorValPos)+errorBarThickness%2/2;crispX=mathRound(xPos)+errorBarThickness%2/2;dataObj.errorBar[errorLen]||(dataObj.errorBar[errorLen]=[]);if(!errorValueObj.errorEdgeBar){errorPath=[M,crispX,errorStartPos,V,crispY];dataObj.errorBar[errorLen][0]={_xPos:crispX-trackerTolerance,_yPos:crispY<errorStartPos?crispY:errorStartPos,_height:mathAbs(errorStartPos-crispY),_width:2*trackerTolerance,_toolText:errorValueObj.tooltext}}else{errorPath=[M,crispX-halfErrorBarW,crispY,H,crispX+halfErrorBarW];dataObj.errorBar[errorLen][1]={_xPos:crispX-halfErrorBarW-trackerTolerance,_yPos:crispY-trackerTolerance,_height:2*trackerTolerance,_width:2*(halfErrorBarW+trackerTolerance),_toolText:errorValueObj.tooltext}}attr={path:errorPath,stroke:conf.errorBarColor,"stroke-width":errorBarThickness,cursor:setLink?POINTER:BLANKSTRING,"stroke-linecap":ROUND};state=!dataObj.graphics.error[errorLen]&&visible?"appearing":visible?"updating":"disappearing";errorLineElem=dataObj.graphics.error[errorLen]=animationManager.setAnimation({el:dataObj.graphics.error[errorLen]||"path",state:state,attr:attr,label:"path",component:dataSet,container:dataSet.getContainer("errorPlotGroup"),callback:dataSet.drawCallbackFn(state)});state!=="disappearing"&&errorLineElem.show();errorLineElem&&errorLineElem.shadow({opacity:conf.shadowOpacity},dataSet.getContainer("errorShadowGroup"));errorTrackerConfig.errorTrackerArr[errorLen].attr={path:errorPath,stroke:TRACKER_FILL,"stroke-width":errorBarThickness<HTP?HTP:errorBarThickness,cursor:setLink?POINTER:BLANKSTRING}}if(!config.notHalfErrorBar){for(k=2;k<4;k++){dataObj.graphics.error&&dataObj.graphics.error[k]&&animationManager.setAnimation({el:dataObj.graphics.error[k]||"path",label:"path",component:dataSet,doNotRemove:true,callback:dataSet.drawCallbackFn("disappearing")}).shadow({opacity:0})}}}};_proto._firePlotEvent=function _firePlotEvent(eventType,plotIndex,e){_firePlotEvent2.call(this,eventType,plotIndex,e)};_proto._checkPointerOverErrorBar=function _checkPointerOverErrorBar(pX,chartX,chartY){return _checkPointerOverErrorBar2.call(this,pX,chartX,chartY)};_proto._checkPointerOverPlot=function _checkPointerOverPlot(pX,chartX,chartY){var dataSet=this,data=dataSet.components.data[pX],config=data&&data.config,hoverInfo;if(!data){return}hoverInfo=dataSet.isWithinShape(data,pX,chartX,chartY);if(hoverInfo){data.errorBarHovered=false;config.finalTooltext=config.toolText!==false&&config.toolText}else{hoverInfo=dataSet._checkPointerOverErrorBar(pX,chartX,chartY);if(hoverInfo){data.errorBarHovered=true;config.finalTooltext=hoverInfo.toolText}}return hoverInfo};_proto._getHoveredPlot=function _getHoveredPlot(chartX,chartY){return _getHoveredPlot2.call(this,chartX,chartY)};_proto.getCanvasPadding=function getCanvasPadding(){var dataset=this,halfErrorBarW=dataset.config.errorBarWidth*.5,chart=dataset.getFromEnv("chart"),dataLabelStyle=chart.config.dataLabelStyle,data=dataset.components&&dataset.components.data||[],firstData=data[0],lastData=data[data.length-1],dataConf,label,dataAnchorConf,labelDim={},padding,labelSpace,showValue,SmartLabel=chart.getFromEnv("smartLabel"),retrunDimension={paddingLeft:0,paddingRight:0};if(firstData){dataConf=firstData.config;showValue=dataConf.showValue;dataAnchorConf=dataConf&&dataConf.anchorProps||{};if(showValue){label=dataConf.displayValue;SmartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);SmartLabel.setStyle(dataLabelStyle);labelDim=SmartLabel.getOriSize(label)}if(dataConf.setValue){padding=mathMax(pluckNumber(dataAnchorConf.radius,0),halfErrorBarW)+pluckNumber(dataAnchorConf.borderThickness,0);labelSpace=(labelDim.width||0)/2}retrunDimension.paddingLeft=mathMax(padding,labelSpace)}if(lastData){dataConf=lastData.config;showValue=dataConf.showValue;dataAnchorConf=dataConf&&dataConf.anchorProps||{};if(showValue){label=dataConf.displayValue;SmartLabel.setStyle(dataLabelStyle);labelDim=SmartLabel.getOriSize(label)}if(dataConf.setValue){padding=mathMax(pluckNumber(dataAnchorConf.radius,0),halfErrorBarW)+pluckNumber(dataAnchorConf.borderThickness,0);labelSpace=(labelDim.width||0)/2}retrunDimension.paddingRight=mathMax(padding,labelSpace)}return retrunDimension};_proto.removePlots=function removePlots(){_removePlots.call(this)};return ErrorLineDataset}(LINEDataset);export default ErrorLineDataset;