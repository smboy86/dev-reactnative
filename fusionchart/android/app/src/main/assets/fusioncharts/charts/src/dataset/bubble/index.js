import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScatterDataset from"../scatter";import{TOUCH_THRESHOLD_PIXELS,CLICK_THRESHOLD_PIXELS,pluck,pluckNumber,toRaphaelColor,hasTouch,getValidValue,preDefStr,parseUnsafeString,parseTooltext,getFirstValue,getLightColor,getPointColor,getFirstColor,BLANKSTRING}from"@fusioncharts/core/src/lib";import KdTree from"../_internal/kdtree";import{addDep}from"@fusioncharts/core/src/dependency-manager";import bubbleAnimation from"./index.animation";var UNDEF,HTP=hasTouch?TOUCH_THRESHOLD_PIXELS:CLICK_THRESHOLD_PIXELS,EVENTARGS="eventArgs",DEFAULT_MIN_RADIUS_FOR_VALUE=0,SETROLLOVERATTR=preDefStr.setRolloverAttrStr,SETROLLOUTATTR=preDefStr.setRolloutAttrStr,ROLLOUT="DataPlotRollOut",HUNDREDSTRING="100",math=Math,mathRound=math.round,mathMin=math.min,mathMax=math.max;addDep({name:"bubbleAnimation",type:"animationRule",extension:bubbleAnimation});var BubbleDataset=function(_ScatterDataset){_inheritsLoose(BubbleDataset,_ScatterDataset);function BubbleDataset(){return _ScatterDataset.apply(this,arguments)||this}var _proto=BubbleDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"bubble"};_proto.configureAttributes=function configureAttributes(datasetJSON){if(!datasetJSON){return false}this.trimData(datasetJSON);this.config.JSONData=datasetJSON;var dataset=this,chart=dataset.getFromEnv("chart"),rawDataObj=chart.getFromEnv("dataSource"),chartAttr=rawDataObj.chart,JSONData=dataset.config.JSONData,conf=dataset.config,setDataArr=JSONData.data||[],len,i,dataObj,dataStore,setColor,setAlpha,colorM=dataset.getFromEnv("color-manager"),index=dataset.index,numberFormatter=dataset.getFromEnv("number-formatter"),tooltipSepChar=pluck(parseUnsafeString(chartAttr.tooltipsepchar),", "),formatedVal,enableAnimation,setData,config,toolText,hoverEffects,seriesname,parserConfig,macroIndices,label,setDisplayValue,isHoverColorString,hColorsLoop,hColorsLen,infMin=-Infinity,infMax=+Infinity,xMax=infMin,xMin=infMax,yMax=infMin,yMin=infMax,zMax=infMin,zMin=infMax,colorObj,highLight,quickEnabled,highlightColors;conf.seriesname=parseUnsafeString(JSONData.seriesname);conf.includeinlegend=pluckNumber(JSONData.includeinlegend,conf.seriesname?1:0);conf.anchorBgColor=getFirstColor(pluck(JSONData.color,JSONData.plotfillcolor,chartAttr.plotfillcolor,colorM.getPlotColor(index)));conf.showPlotBorder=pluckNumber(JSONData.showplotborder,chartAttr.showplotborder,1);conf.anchorBorderThickness=conf.showPlotBorder?pluckNumber(JSONData.plotborderthickness,chartAttr.plotborderthickness,1):0;conf.anchorBorderColor=getFirstColor(pluck(JSONData.plotbordercolor,chartAttr.plotbordercolor,"666666"));conf.plotFillAlpha=pluck(JSONData.plotfillalpha,JSONData.bubblefillalpha,chartAttr.plotfillalpha,HUNDREDSTRING);conf.plotBorderAlpha=pluck(JSONData.plotborderalpha,chartAttr.plotborderalpha,"95");conf.negativeColor=pluck(chartAttr.negativecolor,"FF0000");conf.is3d=pluckNumber(chartAttr.use3dlighting,JSONData.is3d,chartAttr.is3d)!==0;conf.bubbleScale=pluckNumber(chartAttr.bubblescale,1);conf.showTextOutline=pluckNumber(chartAttr.textoutline,0);conf.minBubbleRadius=pluckNumber(chartAttr.minbubbleradius);conf.minRadiusForValue=pluckNumber(JSONData.minradiusforvalue,chartAttr.minradiusforvalue,DEFAULT_MIN_RADIUS_FOR_VALUE);conf.clipBubbles=pluckNumber(chartAttr.clipbubbles,1);conf.enableAnimation=enableAnimation=pluckNumber(chartAttr.animation,chartAttr.defaultanimation,1);conf.animation=!enableAnimation?false:{duration:pluckNumber(chartAttr.animationduration,1)*1e3};conf.showTooltip=pluckNumber(chartAttr.showtooltip,1);conf.transposeAnimation=pluckNumber(chartAttr.transposeanimation,enableAnimation);conf.transposeAnimDuration=pluckNumber(chartAttr.transposeanimduration,.2)*1e3;conf.seriesNameInTooltip=pluckNumber(chartAttr.seriesnameintooltip,1);conf.rotateValues=pluckNumber(chartAttr.rotatevalues)?270:0;conf.showHoverEffect=pluckNumber(chartAttr.plothovereffect,chartAttr.showhovereffect,UNDEF);conf.showValues=conf.showvalues=pluckNumber(JSONData.showvalues,chartAttr.showvalues,0);dataStore=dataset.components.data=dataset.components.data||(dataset.components.data=[]);len=setDataArr.length;conf.fillColor=conf.is3d?toRaphaelColor(getPointColor(conf.anchorBgColor,conf.plotFillAlpha)):toRaphaelColor({color:conf.anchorBgColor,alpha:conf.plotFillAlpha});conf.strokeColor=toRaphaelColor({color:conf.anchorBorderColor,alpha:conf.plotFillAlpha});for(i=0;i<len;i++){setData=setDataArr[i];dataObj=dataStore[i]=dataStore[i]||(dataStore[i]={});!dataObj.graphics&&(dataObj.graphics={});config=dataObj.config={};config.x=numberFormatter.getCleanValue(setData.x);config.y=numberFormatter.getCleanValue(setData.y);config.z=numberFormatter.getCleanValue(setData.z,true);config.setValue={x:config.x,y:config.y,z:config.z};config.dataLabelStyle=dataset._configureDataLabelStyle(setData);config._x=config.x;config._y=config.y;config._z=config.z;config.showValue=pluckNumber(setData.showvalue,conf.showValues,0);config.plotShowValue=pluckNumber(setData.showvalue);config.plotMinRadiusForValue=pluckNumber(setData.minradiusforvalue,conf.minRadiusForValue);config.anchorProps={};label=config.label=config.x;config.setLink=getValidValue(setData.link);conf.max=zMax=mathMax(zMax,config.z||0);conf.min=zMin=mathMin(zMin,config.z||0);config.is3d=pluckNumber(setData.is3d,conf.is3d)!==0;xMax=mathMax(xMax,config.x);xMin=mathMin(xMin,config.x);yMax=mathMax(yMax,config.y);yMin=mathMin(yMin,config.y);setColor=config.color=getFirstColor(pluck(setData.color,setData.z<0?conf.negativeColor:conf.anchorBgColor));setAlpha=config.alpha=pluck(setData.alpha,conf.plotFillAlpha);config.colorObj=colorObj=config.is3d?getPointColor(setColor,setAlpha):{color:setColor,alpha:setAlpha};config.setDisplayValue=setDisplayValue=parseUnsafeString(pluck(setData.displayvalue,setData.name,setData.label));formatedVal=config.formatedVal=config.y===null?config.y:numberFormatter.dataLabels(config.y);config.displayValue=pluck(setDisplayValue,config.formatedVal);config.setTooltext=getValidValue(parseUnsafeString(pluck(setData.tooltext,JSONData.plottooltext,chartAttr.plottooltext)));if(!conf.showTooltip){toolText=false}else{if(formatedVal===null){toolText=false}else if(config.setTooltext!==UNDEF){macroIndices=[4,5,6,7,8,9,10,11,12,13,118];parserConfig={yDataValue:formatedVal,xDataValue:numberFormatter.xAxis(label),yaxisName:parseUnsafeString(chartAttr.yaxisname),xaxisName:parseUnsafeString(chartAttr.xaxisname),zDataValue:numberFormatter.dataLabels(config.z)};toolText=parseTooltext(config.setTooltext,macroIndices,parserConfig,setData,chartAttr,JSONData)}else{if(conf.seriesNameInTooltip){seriesname=getFirstValue(JSONData&&JSONData.seriesname)}toolText=seriesname?seriesname+tooltipSepChar:BLANKSTRING;toolText+=label?numberFormatter.xAxis(label)+tooltipSepChar:BLANKSTRING;toolText+=formatedVal;toolText+=setData.z?tooltipSepChar+numberFormatter.formatValue(setData.z):BLANKSTRING}}config.toolText=toolText;hoverEffects=config.hoverEffects={};if(conf.showHoverEffect!==0){quickEnabled=hoverEffects.enabled=pluck(setData.hoveralpha,JSONData.hoveralpha,chartAttr.bubblehoveralpha,setData.hovercolor,JSONData.hovercolor,JSONData.bubblehovercolor,chartAttr.bubblehovercolor,setData.borderhovercolor,JSONData.borderhovercolor,chartAttr.plotborderhovercolor,setData.borderhoveralpha,JSONData.borderhoveralpha,chartAttr.plotborderhoveralpha,setData.hoverscale,JSONData.bubblehoverscale,chartAttr.bubblehoverscale,setData.borderhovercolor,JSONData.borderhovercolor,chartAttr.plotborderhovercolor,setData.borderhoverthickness,JSONData.borderhoverthickness,chartAttr.plotborderhoverthickness,setData.negativehovercolor,JSONData.negativeColor,chartAttr.negativecolor,setData.is3donhover,chartAttr.plotfillhovercolor,JSONData.is3donhover,chartAttr.is3donhover,UNDEF)!==UNDEF;hoverEffects.negativeColor=pluck(setData.negativehovercolor,JSONData.negativehovercolor,chartAttr.negativehovercolor,conf.negativeColor);hoverEffects.is3d=pluckNumber(setData.is3donhover,JSONData.is3donhover,chartAttr.is3donhover,config.is3d);hoverEffects.color=pluck(setData.hovercolor,JSONData.hovercolor,JSONData.bubblehovercolor,chartAttr.plotfillhovercolor,chartAttr.bubblehovercolor,config.is3d?colorObj.FCcolor.color:setColor);hoverEffects.color=hoverEffects.negativeColor&&setData.z<0?hoverEffects.negativeColor:hoverEffects.color;hoverEffects.scale=pluck(setData.hoverscale,JSONData.hoverscale,JSONData.bubblehoverscale,chartAttr.bubblehoverscale,1);hoverEffects.color=getFirstColor(hoverEffects.color);config.hoverColor=hoverEffects.color;hoverEffects.alpha=pluck(setData.hoveralpha,JSONData.hoveralpha,chartAttr.plotfillhoveralpha,chartAttr.bubblehoveralpha,setAlpha);hoverEffects.borderColor=pluck(setData.borderhovercolor,JSONData.borderhovercolor,chartAttr.plotborderhovercolor,conf.anchorBorderColor);hoverEffects.borderAlpha=pluck(setData.borderhoveralpha,JSONData.borderhoveralpha,chartAttr.plotborderhoveralpha,hoverEffects.alpha,conf.plotBorderAlpha);hoverEffects.borderThickness=pluckNumber(setData.borderhoverthickness,JSONData.borderhoverthickness,chartAttr.plotborderhoverthickness,conf.anchorBorderThickness);hoverEffects.color=hoverEffects.is3d?getPointColor(hoverEffects.color,hoverEffects.alpha):{FCcolor:{color:hoverEffects.color,alpha:hoverEffects.alpha}};if(quickEnabled&&conf.showHoverEffect){highLight=0}else{highLight=conf.showHoverEffect}if(highLight===1){isHoverColorString=typeof hoverEffects.color==="string";highlightColors=isHoverColorString?hoverEffects.color.split(/\s{0,},\s{0,}/):hoverEffects.color.FCcolor.color.split(/\s{0,},\s{0,}/);hColorsLen=highlightColors.length;for(hColorsLoop=0;hColorsLoop<hColorsLen;hColorsLoop++){highlightColors[hColorsLoop]=getLightColor(highlightColors[hColorsLoop],70)}if(isHoverColorString){hoverEffects.color=highlightColors.join(",")}else{hoverEffects.color.FCcolor.color=highlightColors.join(",")}}if(quickEnabled===false){hoverEffects.enabled=Boolean(conf.showHoverEffect)}}else{hoverEffects.enabled=false}}conf.xMax=xMax;conf.xMin=xMin;conf.yMin=yMin;conf.yMax=yMax;dataset.setState("dirty",true);dataset.setState("visible",pluckNumber(JSONData.visible,!Number(JSONData.initiallyhidden),1)===1);chart.config.showLegend&&dataset._addLegend();dataset.setState("dirty",true)};_proto._getHoveredPlot=function _getHoveredPlot(x,y){var res=this.config.dataTree.getNeighbour({x:x,y:y},true,"circle");if(res){return{pointIndex:res.index||res.i,hovered:true,pointObj:res.data}}};_proto._hoverPlotAnchor=function _hoverPlotAnchor(dataObj,state,hoverEnabled){var dataset=this,animationManager=dataset.getFromEnv("animationManager"),graphic=dataObj.graphics,setElem=graphic.element,hoverAttr=state===ROLLOUT?setElem.data(SETROLLOUTATTR):setElem.data(SETROLLOVERATTR);if(hoverEnabled&&setElem){animationManager.setAnimationState&&animationManager.setAnimationState(state===ROLLOUT?"mouseOut":"mouseOver");animationManager.setAnimation({el:setElem,attr:hoverAttr,component:dataset})}};_proto._addLegend=function _addLegend(){var dataset=this,chart=dataset.getFromEnv("chart"),conf=dataset.config,legend=chart.getChildren("legend")[0],legendItem,config;if(conf.includeinlegend){config={enabled:conf.includeInLegend,anchorSide:1,type:dataset.type,label:conf.seriesname};legendItem=legend.getItem(dataset.config.legendItemId);if(!legendItem){dataset.config.legendItemId=legend.createItem(dataset);legendItem=legend.getItem(dataset.config.legendItemId);dataset.addExtEventListener("fc-click",(function(){legendItem.itemClickFn()}),legendItem)}else{legendItem.configure({style:legend.config.itemStyle,hiddenStyle:legend.config.itemHiddenStyle,datasetVisible:legend.config.datasetVisible,hoverStyle:legend.config.itemHoverStyle})}legendItem.configure(config);legendItem.setStateCosmetics("default",{symbol:{fill:conf.fillColor,rawFillColor:conf.anchorBgColor,rawStrokeColor:conf.anchorBorderColor,stroke:conf.strokeColor}});if(!dataset.getState("visible")){legendItem.setLegendState("hidden")}else{legendItem.removeLegendState("hidden")}}else if(dataset.config.legendItemId){legend.disposeItem(dataset.config.legendItemId)}};_proto.getBubbleRadius=function getBubbleRadius(zValue){var dataset=this,mathSqrt=math.sqrt,dsConfig=dataset.config,bubbleScale=dsConfig.bubbleScale,minBubbleRadius=dsConfig.minBubbleRadius,chartConfig=dataset.getFromEnv("chartConfig"),radiusLimit=mathMin(chartConfig.canvasHeight,chartConfig.canvasWidth)/8,chartLimits=this.getLinkedParent().getDataLimitRange(),zMax=chartLimits.zMax,sqrtMaxZ=mathSqrt(zMax),sqrtBubbleZ=mathSqrt(zValue),bubbleRadius;bubbleRadius=mathRound(sqrtBubbleZ*radiusLimit/sqrtMaxZ)*bubbleScale||0;if(minBubbleRadius){bubbleRadius=mathMax(bubbleRadius,minBubbleRadius)}return bubbleRadius};_proto.createCoordinates=function createCoordinates(){var dataset=this,dsComponents=dataset.components,dsData=dsComponents.data,yAxis=dataset.getFromEnv("yAxis"),yBase=yAxis.getAxisBase(),yBasePos=yAxis.getPixel(yBase),xAxis=dataset.getFromEnv("xAxis"),isVertical=xAxis.config.isVertical,dataObj,config,previousY,i,Px,Py,Pb,len=dsData.length,dataStore=dsComponents.data;for(i=0;i<len;i++){dataObj=dataStore[i];config=dataObj&&dataObj.config;if(dataObj===UNDEF){continue}previousY=config._b;Px=xAxis.getPixel(config._x);Py=yAxis.getPixel(config._y);Pb=previousY?yAxis.getPixel(previousY):yBasePos;if(dataset.getName()==="bubble"){config.r=dataset.getBubbleRadius(config._z);config.showValue=config.plotShowValue!==UNDEF?+config.plotShowValue:config.r>=config.plotMinRadiusForValue?dataset.config.showValues:false}if(isVertical){config._Px=Py;config._Py=Px;config._Pby=Py;config._Pbx=Pb}else{config._Px=Px;config._Py=Py;config._Pby=Pb;config._Pbx=Px}}};_proto.parsePlotAttributes=function parsePlotAttributes(set,index){var dataset=this,JSONData=dataset.config.JSONData,chart=dataset.getFromEnv("chart"),chartConfig=chart.config,conf=dataset.config,bubbleRadius,yPos,xPos,i=index,config,visible=dataset.getState("visible"),toolText,x,y,z,setLink,displayValue,hoverEffects={},setRolloutAttr,eventArgs,borderThickness=conf.anchorBorderThickness,kdTreeArr=[];config=set.config;x=pluckNumber(config.x,i);y=config.y;z=config.z;setLink=config.setLink;displayValue=config.displayValue;toolText=config.toolText;config.finalTooltext=config.toolText;hoverEffects=config.hoverEffects;if(y!==null){eventArgs=config.eventArgs||(config.eventArgs={});eventArgs.index=i;eventArgs.link=setLink;eventArgs.value=y;eventArgs.y=y;eventArgs.x=x;eventArgs.z=z;eventArgs.displayValue=displayValue;eventArgs.toolText=toolText;eventArgs.id=dataset.userID;eventArgs.datasetIndex=dataset.config.index;eventArgs.datasetName=JSONData.seriesname;eventArgs.visible=visible;eventArgs.color=config.color;eventArgs.alpha=config.alpha;eventArgs.is3dOnHover=hoverEffects.is3d;eventArgs.hoverScale=hoverEffects.scale;eventArgs.use3dLighting=config.is3d;eventArgs.hoverColor=config.hoverColor;eventArgs.hoverAlpha=hoverEffects.alpha;yPos=config._Py;xPos=config._Px;bubbleRadius=config.r;kdTreeArr.push({x:xPos,y:yPos,r:bubbleRadius});setRolloutAttr=config.setRolloutAttr={fill:toRaphaelColor(config.colorObj),"stroke-width":conf.anchorBorderThickness,stroke:toRaphaelColor({color:conf.anchorBorderColor,alpha:conf.plotBorderAlpha}),r:bubbleRadius};if(hoverEffects.enabled!==false){config.setRolloverAttr={fill:toRaphaelColor(hoverEffects.color),"stroke-width":hoverEffects.borderThickness,stroke:toRaphaelColor({color:hoverEffects.borderColor,alpha:hoverEffects.borderAlpha}),r:bubbleRadius*hoverEffects.scale}}config.props={element:{attr:{cx:xPos,cy:visible?yPos:chartConfig.canvasBottom+bubbleRadius,r:bubbleRadius||0,fill:toRaphaelColor(config.colorObj),"stroke-width":conf.anchorBorderThickness,visibility:visible,stroke:setRolloutAttr.stroke}}};config.trackerConfig||(config.trackerConfig={});config.trackerConfig.trackerRadius=mathMax(bubbleRadius+(borderThickness||0/2),HTP);set._xPos=xPos;set._yPos=yPos}};_proto.allocatePosition=function allocatePosition(){var dataset=this,set,i,ln,xPos,yPos,plotConfig,r,setDataArr=dataset.components.data,kdTreeArr=[];dataset.createCoordinates();for(i=0,ln=setDataArr.length;i<ln;i+=1){set=setDataArr[i];dataset.parsePlotAttributes(set,i);dataset.parseLabelAttributes(set,i);if(set){plotConfig=set.config;xPos=plotConfig._Px;yPos=plotConfig._Py;r=plotConfig.r||0;kdTreeArr.push({x:xPos,y:yPos,index:i,data:set,r:r})}}this.config.dataTree=(new KdTree).buildKdTree(kdTreeArr)};_proto.getCanvasPadding=function getCanvasPadding(){var dataset=this,conf=dataset.config||(dataset.config={}),components=dataset.components||{},chartConfig=dataset.getFromEnv("chartConfig"),rotateValues=chartConfig.rotatevalues,xAxis=dataset.getFromEnv("xAxis"),dataLabelStyle=dataset.getFromEnv("dataLabelStyle"),data=components.data||[],dataLen=data.length,firstData=conf.leftMostData||data[0],lastData=conf.rightMostData||data[data.length-1],radiusLimit=mathMin(chartConfig.canvasHeight,chartConfig.canvasWidth)/8,sqrtMaxZ,firstDataChangeFlag=1,secondDataChangeFlag=1,radiusFactor,configAttr,configAttrFirst,configAttrLast,dataConf,zMax=chartConfig.zMax,sqrtBubbleZ,minPoint,bubbleScale=conf.bubbleScale,i,xReduced,xReducedFirst,xReducedLast,label,bubbleRadius,bubbleRadiusVal,axisRange=xAxis.config.axisRange,xAxisMax=axisRange.max,xAxisMin=axisRange.min,endPixel=xAxis.getPixel(xAxisMax),startPixel=xAxis.getPixel(xAxisMin),labelDimEnd={},labelDimStart={},maxPoint,SmartLabel=dataset.getFromEnv("smartLabel"),returnDimension={paddingLeft:0,paddingRight:0},labelWidth=0;sqrtMaxZ=Math.sqrt(zMax);radiusFactor=radiusLimit/sqrtMaxZ;for(i=0;i<dataLen;i++){configAttr=data[i].config;configAttrFirst=firstData.config;configAttrLast=lastData.config;sqrtBubbleZ=Math.sqrt(configAttr.z);bubbleRadius=Math.round(sqrtBubbleZ*radiusFactor)*bubbleScale||0;bubbleRadiusVal=xAxis.getValue(bubbleRadius)-xAxisMin;xReduced=configAttr.x-bubbleRadiusVal/2;if(firstDataChangeFlag===1){sqrtBubbleZ=Math.sqrt(configAttrFirst.z);bubbleRadius=Math.round(sqrtBubbleZ*radiusFactor)*bubbleScale||0;bubbleRadiusVal=xAxis.getValue(bubbleRadius)-xAxisMin;xReducedFirst=configAttrFirst.x-bubbleRadiusVal/2}if(secondDataChangeFlag===1){sqrtBubbleZ=Math.sqrt(configAttrLast.z);bubbleRadius=Math.round(sqrtBubbleZ*radiusFactor)*bubbleScale||0;bubbleRadiusVal=xAxis.getValue(bubbleRadius)-xAxisMin;xReducedLast=configAttrLast.x-bubbleRadiusVal/2}firstDataChangeFlag=0;secondDataChangeFlag=0;if(xReducedFirst>xReduced){firstData=data[i];firstDataChangeFlag=1}if(xReducedLast<xReduced){lastData=data[i];secondDataChangeFlag=1}}SmartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);SmartLabel.setStyle(dataLabelStyle);if(firstData&&firstData.config.showValue){dataConf=firstData.config;label=dataConf.displayValue;labelDimStart=SmartLabel.getOriSize(label);labelWidth=rotateValues?labelDimStart.height:labelDimStart.width;minPoint=xAxis.getPixel(dataConf.x)-labelWidth*.5;if(startPixel>minPoint){returnDimension.paddingLeft=startPixel-minPoint}}if(lastData&&lastData.config.showValue){dataConf=lastData.config;label=dataConf.displayValue;labelDimEnd=SmartLabel.getOriSize(label);labelWidth=rotateValues?labelDimEnd.height:labelDimEnd.width;maxPoint=xAxis.getPixel(dataConf.x)+labelWidth*.5;if(endPixel<maxPoint){returnDimension.paddingRight=maxPoint-endPixel}}return returnDimension};_proto.drawPlots=function drawPlots(){var dataset=this,setElem,setElemCheck,hotElem,animationManager=dataset.getFromEnv("animationManager"),set,i,ln,config,setDataArr=dataset.components.data,containers=dataset.getContainer(),visible=dataset.getState("visible"),dataLabelContainer=dataset.getContainer("labelGroup"),animCallBack=function animCallBack(){if(visible===false){containers.plotGroup.hide();containers.commonElemsGroup.hide();dataLabelContainer&&dataLabelContainer.hide();dataset._containerHidden=true}},y,hoverEffects={},label;for(i=0,ln=setDataArr.length;i<ln;i+=1){set=setDataArr[i];config=set.config;y=config.y;setElem=set.graphics.element;hoverEffects=config.hoverEffects;hotElem=set.graphics.hotElement;label=set.graphics.label;if(y!==null){setElemCheck=set.graphics.element;setElem=animationManager.setAnimation({el:setElemCheck||"circle",attr:config.props.element.attr,label:"circle",callback:animCallBack,component:dataset,container:containers.plotGroup});if(!setElemCheck){set.graphics.element=setElem}setElem.show();setElem.data("hoverEnabled",hoverEffects.enabled).data(SETROLLOVERATTR,config.setRolloverAttr).data(SETROLLOUTATTR,config.setRolloutAttr).data("anchorRadius",config.r).data("anchorHoverRadius",config.r);setElem&&setElem.data(EVENTARGS,config&&config.eventArgs)}else{setElem&&setElem.hide();hotElem&&hotElem.hide();label&&label.hide()}setElem&&(setElem.isDrawn=true)}};_proto.getDataLimits=function getDataLimits(){var dataset=this,chart=dataset.getFromEnv("chart"),chartConfig=chart.config,conf=dataset.config,maxValue=conf.yMax,minValue=conf.yMin,infMin=-Infinity,infMax=+Infinity,transposeAxis=chartConfig.transposeAxis,xMin=conf.xMin,xMax=conf.xMax,zMax=conf.max,zMin=conf.min,regressionPoints=dataset.getRegressionPoints();if(dataset.getState("visible")===false&&transposeAxis){maxValue=infMin;minValue=infMax;xMin=infMax;xMax=infMin}if(regressionPoints){maxValue=Math.max(maxValue,regressionPoints.max);minValue=Math.min(minValue,regressionPoints.min);xMax=Math.max(xMax,regressionPoints.xMax);xMin=Math.min(xMin,regressionPoints.xMin)}return{max:maxValue,min:minValue,xMin:xMin,xMax:xMax,zMax:zMax,zMin:zMin}};return BubbleDataset}(ScatterDataset);export default BubbleDataset;