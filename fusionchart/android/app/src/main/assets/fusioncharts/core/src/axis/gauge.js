import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import GaugePolarNumeric from"./gauge-polar-numeric";import{toPrecision,pluckNumber}from"../lib";import difference from"@fusioncharts/utils/src/scale-utils/array/diff";import{addDep}from"../dependency-manager";import gaugeAnimation from"./gauge.animation";import LinearScale from"@fusioncharts/utils/src/scales/linear";import{setAxisDimention,getPixel,_drawLabel,_parseLabel}from"./common-api";addDep({name:"gaugeAnimation",type:"animationRule",extension:gaugeAnimation});var GaugeAxis=function(_GaugePolarNumeric){_inheritsLoose(GaugeAxis,_GaugePolarNumeric);function GaugeAxis(){var _this;_this=_GaugePolarNumeric.call(this)||this;_this.config.scale=new LinearScale;_this.config.labelMap=[];_this.config.prevIntervalArr=[];_this.config.prevTicksMap=[];return _this}var _proto=GaugeAxis.prototype;_proto.getName=function getName(){return"gaugeAxis"};_proto.getLabelPos=function getLabelPos(value,opt){var axis=this,axisConfig=axis.config,canvas=axisConfig.canvas,chart=axis.getFromEnv("chart"),chartConfig=chart.config,canvasTop=canvas.canvasTop||chartConfig.canvasTop,canvasBottom=canvas.canvasBottom||chartConfig.canvasBottom,canvasLeft=canvas.canvasLeft||chartConfig.canvasLeft,isVertical=axisConfig.isVertical,isOpposit=pluckNumber(axisConfig.isOpposit),canvasRight=canvas.canvasRight||chartConfig.canvasRight,axisPadding=axisConfig.labelPadding,posObj={x:0,y:0},addCategoryPadding;if(isVertical){posObj.x=isOpposit?canvasRight+axisPadding:canvasLeft-axisPadding;posObj.y=addCategoryPadding?axis.getPixel(value,opt)+addCategoryPadding:axis.getPixel(value,opt)}else{posObj.x=axis.getPixel(value,opt);posObj.y=isOpposit?canvasTop-axisPadding:canvasBottom+axisPadding;if(addCategoryPadding){posObj.y+=addCategoryPadding}}return posObj};_proto._drawComponents=function _drawComponents(){var axis=this,axisConfig=axis.config;axisConfig.drawTick&&axis._drawTick();axisConfig.drawLabels&&axis._drawLabel()};_proto._drawTick=function _drawTick(){var axis=this,axisConfig=axis.config,axisRange=axisConfig.axisRange,isVertical=axisConfig.isVertical,isOpposit=pluckNumber(axisConfig.isOpposit),drawTick=axisConfig.drawTick,drawTickMinor=axisConfig.drawTickMinor,placeTicksInside=pluckNumber(axisConfig.placeTicksInside),canvasDim=axis.getLinkedItem("canvas").getEffectiveDimensions(),canvasTop=canvasDim.top,canvasBottom=canvasTop+canvasDim.height,canvasLeft=canvasDim.left,canvasRight=canvasLeft+canvasDim.width,max=axisRange.max,min=axisRange.min,animationManager=axis.getFromEnv("animationManager"),ticks=axisConfig.ticks,ticksLen=ticks.length,axisAxisLineContainer=axisConfig.axisAxisLineContainer,map=[],present,path,minorTickValues=axisConfig.minorTicks,lineElement,tickElement,minorTickObj,majorTickObj,connectorObj,statPix,endPixMajor,endPixMinor,tickMarkConnecterPath,i,j,tickValue,minorTickValue,diff,removingElement,ln,getPath=function getPath(value,startPix,endPix){var pxVal=axis.getPixel(value,{wrtVisible:true});return isVertical?["M",startPix,pxVal,"L",endPix,pxVal]:["M",pxVal,startPix,"L",pxVal,endPix]};majorTickObj={stroke:axisConfig.majorTMColor,"stroke-width":axisConfig.majorTMThickness,"stroke-linecap":"round",opacity:1};connectorObj={stroke:axisConfig.majorTMColor,"stroke-width":axisConfig.majorTMThickness,"stroke-linecap":"round"};minorTickObj={stroke:axisConfig.minorTMColor,"stroke-width":axisConfig.minorTMThickness,"stroke-linecap":"round",opacity:1};if(axisConfig.lines.isDraw&&drawTick){if(isVertical){if(isOpposit){if(!placeTicksInside){statPix=canvasRight+axisConfig.tickMarkDistance;endPixMajor=statPix+axisConfig.majorTMHeight;endPixMinor=statPix+axisConfig.minorTMHeight}else{statPix=canvasRight-axisConfig.tickMarkDistance;endPixMajor=statPix-axisConfig.majorTMHeight;endPixMinor=statPix-axisConfig.minorTMHeight}}else{if(!placeTicksInside){statPix=canvasLeft-axisConfig.tickMarkDistance;endPixMajor=statPix-axisConfig.majorTMHeight;endPixMinor=statPix-axisConfig.minorTMHeight}else{statPix=canvasLeft+axisConfig.tickMarkDistance;endPixMajor=statPix+axisConfig.majorTMHeight;endPixMinor=statPix+axisConfig.minorTMHeight}}}else{if(!isOpposit){if(!placeTicksInside){statPix=canvasBottom+axisConfig.tickMarkDistance;endPixMajor=statPix+axisConfig.majorTMHeight;endPixMinor=statPix+axisConfig.minorTMHeight}else{statPix=canvasBottom-axisConfig.tickMarkDistance;endPixMajor=statPix-axisConfig.majorTMHeight;endPixMinor=statPix-axisConfig.minorTMHeight}}else{if(!placeTicksInside){statPix=canvasTop-axisConfig.tickMarkDistance;endPixMajor=statPix-axisConfig.majorTMHeight;endPixMinor=statPix-axisConfig.minorTMHeight}else{statPix=canvasTop+axisConfig.tickMarkDistance;endPixMajor=statPix+axisConfig.majorTMHeight;endPixMinor=statPix+axisConfig.minorTMHeight}}}if(axisConfig.drawTickMarkConnector){if(isVertical){tickMarkConnecterPath=["M",statPix,axis.getPixel(min),"L",statPix,axis.getPixel(max)]}else{tickMarkConnecterPath=["M",axis.getPixel(min),statPix,"L",axis.getPixel(max),statPix]}}else{tickMarkConnecterPath=["M0,0"]}connectorObj.path=tickMarkConnecterPath;lineElement=axis.getGraphicalElement("axisLinePath");present=!!lineElement;lineElement=animationManager.setAnimation({el:lineElement||"path",attr:connectorObj,container:axisAxisLineContainer,component:axis,label:"path"});map.push("axisLinePath");if(!present){axis.addGraphicalElement("axisLinePath",lineElement)}for(i=0;i<ticksLen;i+=1){tickValue=ticks[i];path=getPath(tickValue,statPix,endPixMajor);majorTickObj.path=path.toString();map.push(tickValue);tickElement=axis.getGraphicalElement(tickValue);present=!!tickElement;tickElement=animationManager.setAnimation({el:tickElement||"path",data:{path:path.slice(),value:tickValue},attr:majorTickObj,container:axisAxisLineContainer,component:axis,label:"path"});if(!present){axis.addGraphicalElement(tickValue,tickElement)}}if(drawTickMinor){for(j=0;j<minorTickValues.length;j+=1){minorTickValue=minorTickValues[j];path=getPath(minorTickValue,statPix,endPixMinor);minorTickObj.path=path.toString();map.push(minorTickValue);tickElement=axis.getGraphicalElement(minorTickValue);present=!!tickElement;tickElement=animationManager.setAnimation({el:tickElement||"path",data:{path:path.slice(),value:minorTickValue},attr:minorTickObj,component:axis,container:axisAxisLineContainer,label:"path"});if(!present){axis.addGraphicalElement(minorTickValue,tickElement)}}}}diff=difference(axisConfig.prevTicksMap,map);for(i=0,ln=diff.length;i<ln;i++){removingElement=axis.getGraphicalElement(diff[i]);removingElement&&axis.removeGraphicalElement(removingElement)}axisConfig.prevTicksMap=map};_proto.placeAxis=function placeAxis(_maxLimit){var axis=this,chart=axis.getFromEnv("chart"),maxLimit=_maxLimit,scale=axis.getScale(),smartLabel=chart.getFromEnv("smartLabel"),axisConfig=axis.config,axisRange=axisConfig.axisRange,isVertical=axisConfig.isVertical,isOpposit=pluckNumber(axisConfig.isOpposit),labelStyle=axisConfig.labels.style,increment=axisRange.tickInterval,placeTicksInside=pluckNumber(axisConfig.placeTicksInside),placeValuesInside=pluckNumber(axisConfig.placeValuesInside),max=axisRange.max,min=axisRange.min,upperLimitDisplay,lowerLimitDisplay,maxTextSize=0,maxTickLength=0,maxText="",ret,text,i,counter,leftLimit,avalW,avalH,numDimention,dimention,intervalWidth,tempText,maxNumericVal,minNumericVal,labelLineHeight=axisConfig.labels.style.lineHeight,labelObj,numberFormatterFn,numberFormatter=axis.getFromEnv("number-formatter"),upperLimitDisplayDimention,lowerLimitDisplayDimention;if(isVertical){scale.setRange([chart.config.canvasTop,chart.config.canvasBottom])}else{scale.setRange([chart.config.canvasLeft,chart.config.canvasRight])}ret={left:0,right:0,top:0,bottom:0};if(maxLimit<=0){return ret}axisConfig.labels.isDraw=true;axisConfig.labels.drawNumericVal=true;axisConfig.labels.drawNormalVal=axisConfig.showTickValues;axisConfig.labels.drawLimitVal=axisConfig.showLimits;axisConfig.lines.isDraw=true;axisConfig.labels.step=axisConfig.tickValueStep;axisConfig.labelPadding=0;smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);smartLabel.setStyle({fontSize:labelStyle.fontSize,fontFamily:labelStyle.fontFamily,lineHeight:labelStyle.lineHeight,fontWeight:labelStyle.fontWeight});if(!axis.components){axis.components={};axis.components.labels=[]}if(axisConfig.drawTick&&axisConfig.showTickMarks&&axisConfig.lines.isDraw){maxLimit-=axisConfig.tickMarkDistance;maxTickLength=Math.max(axisConfig.minorTMHeight,axisConfig.majorTMHeight);if(!placeTicksInside){if(maxTickLength>maxLimit){axisConfig.lines.isDraw=false;leftLimit=maxLimit+axisConfig.tickMarkDistance;leftLimit=maxLimit}else{if(isVertical){if(isOpposit){ret.right+=maxTickLength+axisConfig.tickMarkDistance}else{ret.left+=maxTickLength+axisConfig.tickMarkDistance}}else{if(isOpposit){ret.top+=maxTickLength+axisConfig.tickMarkDistance}else{ret.bottom+=maxTickLength+axisConfig.tickMarkDistance}}leftLimit=maxLimit-maxTickLength;if(!placeValuesInside){axisConfig.labelPadding=axisConfig.tickMarkDistance+maxTickLength}}}else{leftLimit=maxLimit+axisConfig.tickMarkDistance;if(placeValuesInside){axisConfig.labelPadding=axisConfig.tickMarkDistance+maxTickLength}}}else{axisConfig.lines.isDraw=false;leftLimit=maxLimit}leftLimit-=axisConfig.tickValueDistance;if(axisConfig.drawLabels&&(axisConfig.showTickValues||axisConfig.showLimits)){intervalWidth=Math.abs(axis.getPixel(min)-axis.getPixel(min+increment))/2;axisConfig.labelPadding+=axisConfig.tickValueDistance;leftLimit-=axisConfig.tickValueDistance;numberFormatterFn=numberFormatter.scale;for(i=min+increment,counter=0;i<max;i+=increment){text=""+numberFormatterFn.call(numberFormatter,toPrecision(i,10));numDimention=smartLabel.getOriSize(text);axis.components.labels[counter]={config:{width:numDimention.width,height:numDimention.height,props:{label:{attr:{text:text}}}}};counter++;if(text.length>maxTextSize){maxText=text;maxTextSize=text.length}}numDimention=smartLabel.getOriSize(maxText);if(isVertical){if(numDimention.width>leftLimit){axisConfig.labels.drawNumericVal=false;!axisConfig.upperLimitDisplay&&!axisConfig.lowerLimitDisplay&&(axisConfig.labels.isDraw=false);maxText="";numDimention=smartLabel.getOriSize(maxText)}}else{if(numDimention.height>leftLimit){axisConfig.labels.drawNumericVal=false;!axisConfig.upperLimitDisplay&&!axisConfig.lowerLimitDisplay&&(axisConfig.labels.isDraw=false);maxText="";numDimention=smartLabel.getOriSize(maxText)}}avalW=isVertical?leftLimit:intervalWidth;avalH=isVertical?intervalWidth:leftLimit;if(axisConfig.showLimits){maxNumericVal=numberFormatterFn.call(numberFormatter,max);minNumericVal=numberFormatterFn.call(numberFormatter,min);upperLimitDisplay=axisConfig.upperLimitDisplay||""+maxNumericVal;lowerLimitDisplay=axisConfig.lowerLimitDisplay||""+minNumericVal;upperLimitDisplayDimention=smartLabel.getOriSize(upperLimitDisplay);if(upperLimitDisplayDimention.width>numDimention.width){tempText=smartLabel.getSmartText(upperLimitDisplay,avalW,avalH);if(upperLimitDisplay===maxNumericVal&&tempText.text===tempText.oriText||axisConfig.labels.drawNumericVal){maxText=upperLimitDisplay;numDimention=upperLimitDisplayDimention}}lowerLimitDisplayDimention=smartLabel.getOriSize(lowerLimitDisplay);if(lowerLimitDisplayDimention.width>numDimention.width){tempText=smartLabel.getSmartText(lowerLimitDisplay,avalW,avalH);if(lowerLimitDisplay===minNumericVal&&tempText.text===tempText.oriText||axisConfig.labels.drawNumericVal){maxText=lowerLimitDisplay}}if(maxText===""){if(smartLabel.getOriSize(axisConfig.upperLimitDisplay).width>smartLabel.getOriSize(axisConfig.lowerLimitDisplay).width){maxText=upperLimitDisplay}else{maxText=lowerLimitDisplay}numDimention=smartLabel.getOriSize(maxText)}}else{axisConfig.labels.drawLimitVal=false}if(!isVertical){for(i=min;i<=max;i+=increment){dimention=smartLabel.getSmartText(maxText,avalW,avalH);if(dimention.text===""){avalW+=intervalWidth}else{break}}}else{dimention=smartLabel.getSmartText(maxText,avalW,avalH)}dimention=smartLabel.getSmartText(maxText,avalW,avalH);axisConfig.labelMaxW=Math.max(dimention.width,numDimention.width);axisConfig.labelMaxH=Math.max(dimention.height,numDimention.height);if(!placeValuesInside&&axisConfig.labels.isDraw){if(isVertical){axisConfig.labelMaxW=Math.min(axisConfig.labelMaxW,leftLimit);if(isOpposit){ret.right+=axisConfig.labelMaxW+axisConfig.tickValueDistance}else{ret.left+=axisConfig.labelMaxW+axisConfig.tickValueDistance}}else{axisConfig.labelMaxH=Math.min(axisConfig.labelMaxH,leftLimit);if(isOpposit){ret.top+=axisConfig.labelMaxH+axisConfig.tickValueDistance}else{ret.bottom+=axisConfig.labelMaxH+axisConfig.tickValueDistance}}}else{axisConfig.labelPadding=-axisConfig.labelPadding}if(axisConfig.labels.drawLimitVal){if(labelLineHeight){if(labelLineHeight.indexOf("px")!==-1){labelLineHeight=parseFloat(labelLineHeight.replace("px",""))}}if(axisConfig.upperLimitDisplay){numDimention=smartLabel.getSmartText(axisConfig.upperLimitDisplay,axisConfig.labelMaxW,axisConfig.labelMaxH+labelLineHeight/2)}else{text=""+numberFormatterFn.call(numberFormatter,toPrecision(max,10));numDimention=smartLabel.getOriSize(text)}axis.components.labels[counter]={config:{width:numDimention.width,height:numDimention.height,props:{label:{attr:{text:numDimention.text}}}}};if(axisConfig.lowerLimitDisplay){numDimention=smartLabel.getSmartText(axisConfig.lowerLimitDisplay,axisConfig.labelMaxW,axisConfig.labelMaxH+labelLineHeight/2)}else{text=""+numberFormatterFn.call(numberFormatter,toPrecision(min,10));numDimention=smartLabel.getOriSize(text)}labelObj={config:{width:numDimention.width,height:numDimention.height,props:{label:{attr:{text:numDimention.text}}}}};axis.components.labels.unshift(labelObj)}}else{axisConfig.labels.isDraw=false}axisConfig.spaceTaken=ret;return ret};_proto.hide=function hide(){var axis=this,axisConfig=axis.config;if(!axisConfig.axisContainer){return}axisConfig.axisLabelContainerTop.hide();axisConfig.axisContainer.hide();axisConfig.axisTrendLabelContainer.hide();axisConfig.axisAxisLineContainer.hide()};_proto.show=function show(){var axis=this,axisConfig=axis.config;if(!axisConfig.axisContainer){return}axisConfig.axisLabelContainerTop.show();axisConfig.axisContainer.show();axisConfig.axisTrendLabelContainer.show();axisConfig.axisAxisLineContainer.show()};_proto._computeTranslation=function _computeTranslation(){if(this)return 0};return GaugeAxis}(GaugePolarNumeric);GaugeAxis.prototype.setAxisDimention=setAxisDimention;GaugeAxis.prototype.getPixel=getPixel;GaugeAxis.prototype._parseLabel=_parseLabel;GaugeAxis.prototype._drawLabel=_drawLabel;export default GaugeAxis;