import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import FunnelPyramidBasePoint from"./funnelpyramidbase-point";import{BLANK,preDefStr}from"@fusioncharts/core/src/lib";var UNDEF,POINTER="pointer",POSITION_START=preDefStr.POSITION_START,POSITION_END=preDefStr.POSITION_END,POSITION_MIDDLE=preDefStr.POSITION_MIDDLE,ROLLOVER="DataPlotRollOver",ROLLOUT="DataPlotRollOut",EVENTARGS="eventArgs",MOUSEOVER="mouseover",textHAlign={right:POSITION_END,left:POSITION_START,middle:POSITION_MIDDLE,start:POSITION_START,end:POSITION_END,center:POSITION_MIDDLE,undefined:BLANK,BLANK:BLANK};var PyramidPoint=function(_FunnelPyramidBasePoi){_inheritsLoose(PyramidPoint,_FunnelPyramidBasePoi);function PyramidPoint(){return _FunnelPyramidBasePoi.apply(this,arguments)||this}var _proto=PyramidPoint.prototype;_proto.configure=function configure(options){if(options===void 0){options={}}for(var key in options){this[key]=options[key]}this.upperRadiusFactor=0};_proto.getType=function getType(){return"data"};_proto.getName=function getName(){return"pyramidpoint"};_proto.getModifiedCurrentValue=function getModifiedCurrentValue(totalValue){return totalValue+this.y/2};_proto.getRatioK=function getRatioK(context,currentValue){var conf=context.config;return currentValue?currentValue/conf.sumValue:1};_proto.getLowestRadiusFactor=function getLowestRadiusFactor(){return 1};_proto.allocatePosition=function allocatePosition(){};_proto.drawPlots=function drawPlots(){var point=this,index=point.index,datasetStore=point.getLinkedParent(),conf=datasetStore.config,toolTipController=datasetStore.getFromEnv("toolTipController"),value=point.y,displayValue=point.displayValue,chartSliced=conf.isSliced,textDirection=BLANK,chart=datasetStore.getFromEnv("chart"),animationManager=datasetStore.getFromEnv("animationManager"),trackerGroup=chart.getChildContainer("trackerGroup"),dataLabelsGroup=chart.getChildContainer("datalabelsGroup"),graphicsGroup=chart.getChildContainer().plotGroup,sliced,plotItem=point.plot,translateXY,setLink=!!point.link,graphic,tempConfig,trackerObj,Point=conf.pointInContext,distanceAvailed=conf.distanceAvailed,labelAlign=point.labelAline,css=point.appliedStyle,hoverHandler,parentCSS=point.style,setRolloutAttr=point.setRolloutAttr,setRolloverAttr=point.setRolloverAttr,setRolloverProperties=point.rolloverProperties,sliceContext={},textDrawingArgs,labelDrawingConfigArr=datasetStore.config.labelDrawingConfig,pointFill,labelDrawingConfig;if(!(point instanceof PyramidPoint)){tempConfig=point;point=new Point;point.configure(tempConfig);datasetStore.components.data[index]=point}if(conf.prevIs2d&&conf.prevIs2d!==conf.is2d){animationManager.setAnimation({el:graphicsGroup,attr:{opacity:1},component:datasetStore});animationManager.setAnimation({el:dataLabelsGroup,attr:{opacity:1},component:datasetStore})}pointFill=css&&css.color||parentCSS&&parentCSS.color||datasetStore._chartLevelAttr.color;sliced=chartSliced?1:point.isSliced;textDrawingArgs={text:displayValue,direction:textDirection,cursor:setLink?POINTER:BLANK,x:0,y:0,fill:pointFill,"text-anchor":textHAlign[labelAlign]};if(value===null||value===UNDEF||!point.shapeArgs){labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point};return}graphic=point.getGraphicalElement("graphic");trackerObj=point.getGraphicalElement("trackerObj");!setRolloutAttr&&(point.setRolloutAttr=setRolloutAttr={});!setRolloverAttr&&(point.setRolloverAttr=setRolloverAttr={});if(point.hoverEffects){setRolloutAttr.color=point.rawColor;setRolloutAttr.opacity=point.rawAlpha;setRolloutAttr["stroke-width"]=point.borderWidth;setRolloutAttr.stroke=point.borderColor;setRolloverAttr.color=setRolloverProperties.color;setRolloverAttr.opacity=setRolloverProperties.alpha;setRolloverAttr["stroke-width"]=setRolloverProperties.borderWidth;setRolloverAttr.stroke=setRolloverProperties.borderColor;setRolloverAttr.rawBorderColor=setRolloverProperties.rawBorderColor;setRolloverAttr.borderAlpha=setRolloverProperties.borderAlpha}else{setRolloutAttr=point.setRolloutAttr={};setRolloverAttr=point.setRolloverAttr={}}if(!plotItem){point.shapeArgs.graphics=plotItem;hoverHandler=function hoverHandler(evt){var ele=this;ele.data(EVENTARGS,Object.assign(ele.data(EVENTARGS),{isSliced:point.isSliced}));if(evt.type===MOUSEOVER){graphic.attr(point.setRolloverAttr);chart.plotEventHandler(ele,evt,ROLLOVER)}else{graphic.attr(point.setRolloutAttr);chart.plotEventHandler(ele,evt,ROLLOUT)}};point.plot=plotItem={};graphic=datasetStore.pyramidFunnelShape(point.shapeArgs);trackerObj=animationManager.setAnimation({el:"path",container:trackerGroup,component:datasetStore}).on("fc-click",datasetStore.plotMouseUp,sliceContext).hover(hoverHandler,hoverHandler);animationManager.setAnimation({el:graphic,attr:{fill:point.color,"stroke-width":point.borderWidth,stroke:point.borderColor},component:datasetStore});point.addGraphicalElement("graphic",graphic);point.addGraphicalElement("trackerObj",trackerObj);labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point}}else{point.shapeArgs.graphics=graphic;graphic=datasetStore.pyramidFunnelShape(point.shapeArgs);point.addGraphicalElement("graphic",graphic);animationManager.setAnimation({el:graphic,attr:{fill:point.color,"stroke-width":point.borderWidth,stroke:point.borderColor},component:datasetStore});graphic.show();labelDrawingConfigArr[index]=labelDrawingConfig={args:textDrawingArgs,css:css,point:point}}if(conf.showTooltip){toolTipController.enableToolTip(trackerObj,point.toolText)}else{toolTipController.disableToolTip(trackerObj)}plotItem.value=value;plotItem.displayValue=displayValue;plotItem.sliced=!!sliced;plotItem.cursor=setLink?POINTER:BLANK;plotItem.x=point.x;plotItem.index=index;sliceContext.datasetStore=datasetStore;sliceContext.plotItem=plotItem;trackerObj.off("fc-click",datasetStore.slice);!point.doNotSlice&&trackerObj.on("fc-click",datasetStore.slice,sliceContext);labelDrawingConfig.context=sliceContext;labelDrawingConfig.actions={click:datasetStore.slice,hover:[hoverHandler,hoverHandler]};plotItem.dy=0;if(conf.noOfGap){if(distanceAvailed){plotItem._startTranslateY=translateXY="t0,"+distanceAvailed;plotItem.dy=plotItem.distanceAvailed=distanceAvailed}if(conf.slicingGapPosition[point.x]){conf.distanceAvailed-=conf.perGapDistance}}else{plotItem._startTranslateY=translateXY="t0,"+0}animationManager.setAnimation({el:graphic,attr:{transform:translateXY},component:datasetStore});labelDrawingConfig.transform=translateXY;return plotItem};return PyramidPoint}(FunnelPyramidBasePoint);export default PyramidPoint;