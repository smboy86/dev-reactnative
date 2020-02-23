import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{pluckNumber,hasTouch,TOUCH_THRESHOLD_PIXELS,CLICK_THRESHOLD_PIXELS,hashify}from"@fusioncharts/core/src/lib";import LineDataset from"../line";import{addDep}from"@fusioncharts/core/src/dependency-manager";import zoomlineAnimation from"./index.animation";var POINTER="pointer",DEFAULT_CURSOR="default",DATAPLOTCLICK="dataplotclick",HTP=hasTouch?TOUCH_THRESHOLD_PIXELS:CLICK_THRESHOLD_PIXELS;addDep({name:"zoomlineAnimation",type:"animationRule",extension:zoomlineAnimation});var ZoomLineDataset=function(_LineDataset){_inheritsLoose(ZoomLineDataset,_LineDataset);function ZoomLineDataset(){return _LineDataset.apply(this,arguments)||this}var _proto=ZoomLineDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"zoomLine"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LineDataset.prototype.__setDefaultConfig.call(this);this.config.skipIgnorerIndices=[];this.config.showPeakData=0;this.config.showTerminalValidData=0;this.config.minPeakDataLimit=null;this.config.maxPeakDataLimit=null};_proto._plotConfigure=function _plotConfigure(i,setData,newDataSetLen){_LineDataset.prototype._plotConfigure.call(this,i,setData,newDataSetLen);var dataset=this,conf=dataset.config,value=dataset.components.data[i].config.setValue,len=newDataSetLen||dataset.getFromEnv("xAxis").getTicksLen(),showTerminalValidData=conf.showTerminalValidData,showPeakData=conf.showPeakData,peakDataLowerBound=conf.maxPeakDataLimit,peakDataUpperBound=conf.minPeakDataLimit,selectDataAtIntersection=peakDataLowerBound<peakDataUpperBound,selectDataAtUnion=peakDataLowerBound>peakDataUpperBound,isValueWithinBounds=value>peakDataLowerBound&&value<peakDataUpperBound,isValueBeyondBounds=value>peakDataLowerBound||value<peakDataUpperBound;if(showPeakData){if(selectDataAtIntersection&&isValueWithinBounds){conf.skipIgnorerIndices.push(i)}else if(selectDataAtUnion&&isValueBeyondBounds){conf.skipIgnorerIndices.push(i)}}if(showTerminalValidData&&i===len-1)conf.skipIgnorerIndices.push(i)};_proto.drawPlots=function drawPlots(){var dataset=this,xAxis=dataset.getFromEnv("xAxis"),viewPortConfig=dataset.getFromEnv("chartConfig").viewPortConfig;if(xAxis.getPixel(viewPortConfig.step)-xAxis.getPixel(0)>=viewPortConfig.amrd){_LineDataset.prototype.drawPlots.call(this)}else{dataset.hideAllAnchors()}};_proto._setConfigure=function _setConfigure(newDataset,newIndex){var dataSet=this,conf=dataSet.config,chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,cdef=chart.getFromEnv("dataSource").chart,JSONData=dataSet.config.JSONData;conf.drawanchors=pluckNumber(cdef.drawanchors,cdef.showanchors,1);conf.anchorradius=pluckNumber(JSONData.anchorradius,cdef.anchorradius,conf.linethickness+2);conf.showTerminalValidData=pluckNumber(chartConfig.showTerminalValidData,0);conf.showPeakData=pluckNumber(chartConfig.showPeakData,0);if(conf.showPeakData&&(chartConfig.maxPeakDataLimit||chartConfig.minPeakDataLimit)){conf.maxPeakDataLimit=pluckNumber(chartConfig.maxPeakDataLimit,Number.MIN_SAFE_INTEGER);conf.minPeakDataLimit=pluckNumber(chartConfig.minPeakDataLimit,Number.MAX_SAFE_INTEGER)}_LineDataset.prototype._setConfigure.call(this,newDataset,newIndex)};_proto.configureAttributes=function configureAttributes(datasetJSON){_LineDataset.prototype.configureAttributes.call(this,datasetJSON);var pgsw,conf,pin={},dataSet=this,cdef=dataSet.getFromEnv("chart").getFromEnv("dataSource").chart;conf=dataSet.config;pgsw=conf.linethickness+pluckNumber(cdef.pinlinethicknessdelta,1);pin["stroke-width"]=pgsw>0&&pgsw||0;pin["stroke-dasharray"]=[3,2];pin.stroke=hashify(conf.linecolor);pin["stroke-opacity"]=conf.alpha/100;pin["stroke-linejoin"]=conf["stroke-linejoin"]="round";pin["stroke-linecap"]=conf["stroke-linecap"]="round";conf.pin=pin;conf.animation=false;conf.transposeanimduration=0;conf.defaultPadding={left:0,right:0}};_proto.drawLabel=function drawLabel(){return this};_proto.isWithinShape=function isWithinShape(pointObj,pX,x,y){var anchorProps,config,radius,borderThickness,dataset,dataStore,dragTolerance,xPos,yPos,dx,dy,diff,hoverEffects;if(!pointObj){return}anchorProps=pointObj.config.anchorProps;config=pointObj.config;borderThickness=anchorProps.borderThickness;dataset=this;dataStore=dataset.components.data;dragTolerance=pluckNumber(config.dragTolerance,0);xPos=pointObj._xPos;yPos=pointObj._yPos;if(yPos!==null){hoverEffects=pointObj.config.hoverEffects;radius=Math.max(anchorProps.radius,hoverEffects&&hoverEffects.anchorRadius||0,HTP)+borderThickness/2;dx=x-xPos;dy=y-yPos;diff=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));if(diff<=radius||diff<=dragTolerance){return{pointIndex:pX,hovered:true,pointObj:dataStore[pX]}}return false}};_proto.hideAllAnchors=function hideAllAnchors(){var dataset=this,dataStore=dataset.components.data,dsLen=dataStore.length,dataObj,i,ii;for(i=0,ii=dsLen;i<ii;i++){dataObj=dataStore[i];if(dataObj&&dataObj.graphics){dataObj.graphics.element&&dataObj.graphics.element.hide()}}};_proto._firePlotEvent=function _firePlotEvent(eventType,plotIndex,e){var dataset=this,chart=dataset.getFromEnv("chart"),components=dataset.components,dataStore=components.data,toolTipController=dataset.getFromEnv("toolTipController"),data=dataStore[plotIndex],setElement=data.graphics.element,toolTip=dataset.config.currentToolTip,noCrossline=!chart.config.useCrossline,config,eventArgs,setLink;config=data.config;setLink=config.setLink;eventArgs=config.eventArgs;switch(eventType){case"fc-mouseover":noCrossline&&dataset._decideTooltipType(plotIndex,e);dataset._rolloverResponseSetter(chart,data,e);setLink&&(setElement.node.style.cursor=POINTER);break;case"fc-mouseout":toolTipController.hide(toolTip);dataset._rolloutResponseSetter(chart,data,e);setLink&&(setElement.node.style.cursor=DEFAULT_CURSOR);break;case"fc-click":chart.plotEventHandler(setElement,e,DATAPLOTCLICK,eventArgs);break;case"fc-mousemove":noCrossline&&dataset._decideTooltipType(plotIndex,e)}};_proto.calculateScrollRange=function calculateScrollRange(){var dataSet=this,conf=dataSet.config,xAxis=dataSet.getFromEnv("xAxis"),catLen=xAxis.getTicksLen(),step=dataSet.getFromEnv("chartConfig").viewPortConfig.step||1;conf.scrollMinVal=Math.max(Math.round(xAxis.getVisibleConfig().minValue),0)-step;conf.scrollMaxVal=Math.min(Math.round(xAxis.getVisibleConfig().maxValue)+1,catLen)+step;conf.scrollMinValForLabel=Math.max(Math.round(xAxis.getVisibleConfig().minValue),0)-step;conf.scrollMaxValForLabel=Math.min(Math.round(xAxis.getVisibleConfig().maxValue)+1,catLen)+step;conf.scrollMinVal-=conf.scrollMinVal%step;conf.scrollMinValForLabel-=conf.scrollMinValForLabel%step};return ZoomLineDataset}(LineDataset);export default ZoomLineDataset;