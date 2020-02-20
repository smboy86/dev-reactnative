import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import FunnelPyramidBasePoint from"./funnelpyramidbase-point";import{BLANK,preDefStr}from"@fusioncharts/core/src/lib";var UNDEF,POINTER="pointer",POSITION_START=preDefStr.POSITION_START,POSITION_END=preDefStr.POSITION_END,POSITION_MIDDLE=preDefStr.POSITION_MIDDLE,textHAlign={right:POSITION_END,left:POSITION_START,middle:POSITION_MIDDLE,start:POSITION_START,end:POSITION_END,center:POSITION_MIDDLE,undefined:BLANK,BLANK:BLANK},EVENTARGS="eventArgs",MOUSEOVER="mouseover",ROLLOVER="DataPlotRollOver",ROLLOUT="DataPlotRollOut";var FunnelPoint=function(_FunnelPyramidBasePoi){_inheritsLoose(FunnelPoint,_FunnelPyramidBasePoi);function FunnelPoint(){return _FunnelPyramidBasePoi.apply(this,arguments)||this}var _proto=FunnelPoint.prototype;_proto.configure=function configure(options){if(options===void 0){options={}}for(var key in options){this[key]=options[key]}this.upperRadiusFactor=1};_proto.getType=function getType(){return"data"};_proto.getName=function getName(){return"funnelpoint"};_proto.getModifiedCurrentValue=function getModifiedCurrentValue(){return UNDEF};_proto.getRatioK=function getRatioK(context,currentValue,valueRadiusIncrementRatio,totalValue,maxValue){var point=this,conf=context.config,nonStreamlinedData=!conf.streamLinedData,useSameSlantAngle=conf.useSameSlantAngle;return nonStreamlinedData?.2+valueRadiusIncrementRatio*totalValue:point.y?useSameSlantAngle?point.y/maxValue:Math.sqrt(point.y/maxValue):1};_proto.getLowestRadiusFactor=function getLowestRadiusFactor(context,maxValue){var point=this,conf=context.config,nonStreamlinedData=!conf.streamLinedData,useSameSlantAngle=conf.useSameSlantAngle;return nonStreamlinedData?.2:point.y?useSameSlantAngle?point.y/maxValue:Math.sqrt(point.y/maxValue):1};_proto.allocatePosition=function allocatePosition(){};_proto.drawPlots=function drawPlots(){var point=this,index=point.index,datasetStore=point.getLinkedParent(),toolTipController=datasetStore.getFromEnv("toolTipController"),conf=datasetStore.config,value=point.y,displayValue=point.displayValue,chartSliced=conf.isSliced,labelAlign=point.labelAline,css=point.appliedStyle,parentCSS=point.style,textDirection=BLANK,chart=datasetStore.getFromEnv("chart"),trackerGroup=chart.getChildContainer("trackerGroup"),sliced,plotItem=point.plot,translateXY,setLink=!!point.link,graphic,trackerObj,hoverHandler,distanceAvailed=conf.distanceAvailed,labelDrawingConfigArr=datasetStore.config.labelDrawingConfig,animationManager=datasetStore.getFromEnv("animationManager"),setRolloutAttr=point.setRolloutAttr,setRolloverAttr=point.setRolloverAttr,setRolloverProperties=point.rolloverProperties,sliceContext={},pointFill,labelDrawingConfig,textDrawingArgs;sliced=chartSliced?1:point.isSliced;pointFill=css&&css.color||parentCSS&&parentCSS.color||datasetStore._chartLevelAttr.color;textDrawingArgs={text:displayValue,direction:textDirection,cursor:setLink?POINTER:BLANK,x:0,y:0,fill:pointFill,"text-anchor":textHAlign[labelAlign]};if(value===null||value===UNDEF||!point.shapeArgs){labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point};return}graphic=point.getGraphicalElement("graphic");trackerObj=point.getGraphicalElement("trackerObj");!setRolloutAttr&&(point.setRolloutAttr=setRolloutAttr={});!setRolloverAttr&&(point.setRolloverAttr=setRolloverAttr={});if(point.hoverEffects){setRolloutAttr.color=point.rawColor;setRolloutAttr.opacity=point.rawAlpha;setRolloutAttr["stroke-width"]=point.borderWidth;setRolloutAttr.stroke=point.borderColor;setRolloverAttr.color=setRolloverProperties.color;setRolloverAttr.opacity=setRolloverProperties.alpha;setRolloverAttr["stroke-width"]=setRolloverProperties.borderWidth;setRolloverAttr.stroke=setRolloverProperties.borderColor;setRolloverAttr.rawBorderColor=setRolloverProperties.rawBorderColor;setRolloverAttr.borderAlpha=setRolloverProperties.borderAlpha}else{setRolloutAttr=point.setRolloutAttr={};setRolloverAttr=point.setRolloverAttr={}}if(!plotItem){point.shapeArgs.graphics=plotItem;hoverHandler=function hoverHandler(evt){var ele=this;ele.data(EVENTARGS,Object.assign(ele.data(EVENTARGS),{isSliced:point.isSliced}));if(evt.type===MOUSEOVER){graphic.attr(point.setRolloverAttr);chart.plotEventHandler(ele,evt,ROLLOVER)}else{graphic.attr(point.setRolloutAttr);chart.plotEventHandler(ele,evt,ROLLOUT)}};point.plot=plotItem={};graphic=datasetStore.pyramidFunnelShape(point.shapeArgs).attr({fill:point.color,"stroke-width":point.borderWidth,stroke:point.borderColor});trackerObj=animationManager.setAnimation({el:"path",container:trackerGroup,component:datasetStore}).on("fc-click",datasetStore.plotMouseUp,sliceContext).hover(hoverHandler,hoverHandler);point.addGraphicalElement("graphic",graphic);point.addGraphicalElement("trackerObj",trackerObj);labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point}}else{point.shapeArgs.graphics=graphic;graphic=datasetStore.pyramidFunnelShape(point.shapeArgs);point.addGraphicalElement("graphic",graphic);graphic=animationManager.setAnimation({el:graphic,attr:{fill:point.color,"stroke-width":point.borderWidth,stroke:point.borderColor},component:datasetStore});point.addGraphicalElement("graphic",graphic);graphic.show();labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point}}if(conf.showTooltip){toolTipController.enableToolTip(trackerObj,point.toolText)}else{toolTipController.disableToolTip(trackerObj)}plotItem.value=value;plotItem.displayValue=displayValue;plotItem.sliced=!!sliced;plotItem.cursor=setLink?POINTER:BLANK;plotItem.x=point.x;plotItem.index=index;sliceContext.datasetStore=datasetStore;sliceContext.plotItem=plotItem;trackerObj.off("fc-click",datasetStore.slice);!point.doNotSlice&&trackerObj.on("fc-click",datasetStore.slice,sliceContext);labelDrawingConfig.context=sliceContext;labelDrawingConfig.actions={click:datasetStore.slice,hover:[hoverHandler,hoverHandler]};plotItem.dy=0;if(conf.noOfGap){if(distanceAvailed){plotItem._startTranslateY=translateXY="t0,"+distanceAvailed;plotItem.dy=plotItem.distanceAvailed=distanceAvailed}if(conf.slicingGapPosition[point.x]){conf.distanceAvailed-=conf.perGapDistance}}else{plotItem._startTranslateY=translateXY="t0,"+0}animationManager.setAnimation({el:graphic,attr:{transform:translateXY},component:datasetStore});labelDrawingConfig.transform=translateXY;return plotItem};return FunnelPoint}(FunnelPyramidBasePoint);export default FunnelPoint;