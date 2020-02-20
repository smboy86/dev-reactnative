import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{getMouseCoordinate,extend2,pluckNumber,parseUnsafeString,pluck,UNDEF,convertColor,getFirstColor}from"@fusioncharts/core/src/lib";import MSLine from"../msline";import ZoomLineDataset from"../../dataset/zoomline";import datasetFactory from"../../factories/zoomline-dataset";import{priorityList}from"@fusioncharts/core/src/schedular";import{scrollTo}from"../_internal/utils/scroll-apis";import{symbolList}from"../_internal/utils/iconsymbol";import{getDep}from"@fusioncharts/core/src/dependency-manager";var userAgent=window.navigator.userAgent,Raphael=getDep("redraphael","plugin"),doc=window.doc,isIE=/msie/i.test(userAgent)&&!window.opera,TRACKER_FILL="rgba(192,192,192,"+(isIE?.002:1e-6)+")",toFloat=window.parseFloat,PIPE="|",PX="px",toInt=window.parseInt,BLANK="",math=Math,mathMax=math.max,mathMin=math.min,mathCeil=math.ceil,mathFloor=math.floor,CHART_STR="Zoomable and Panable Multi-series Line Chart",ZOOMLINE_STR="zoomline",ZOOM_STR="zoom",count=0,fireMouseEvent=function fireMouseEvent(eventName,domElement,eventInit){var event,mouseEventInit=eventInit;if(!domElement||!eventName){return}if(!mouseEventInit){mouseEventInit={}}if(mouseEventInit.originalEvent){mouseEventInit=mouseEventInit.originalEvent}if(mouseEventInit.touches){mouseEventInit=mouseEventInit.touches[0]}if(domElement.dispatchEvent){if(MouseEvent){event=new MouseEvent(eventName,{bubbles:!!mouseEventInit.bubbles,cancelable:!!mouseEventInit.cancelable,clientX:mouseEventInit.clientX||mouseEventInit.pageX&&mouseEventInit.pageX-doc.body.scrollLeft-doc.documentElement.scrollLeft||0,clientY:mouseEventInit.clientY||mouseEventInit.pageY&&mouseEventInit.pageY-doc.body.scrollTop-doc.documentElement.scrollTop||0,screenX:mouseEventInit.screenX||0,screenY:mouseEventInit.screenY||0,pageX:mouseEventInit.pageX||0,pageY:mouseEventInit.pageY||0})}else if(doc.createEvent){event=doc.createEvent("HTMLEvents");event.initEvent(eventName,!!mouseEventInit.bubbles,!!mouseEventInit.cancelable)}event.eventName=eventName;event&&domElement.dispatchEvent(event)}else if(doc.createEventObject&&domElement.fireEvent){event=doc.createEventObject();event.eventType=eventName;event.eventName=eventName;domElement.fireEvent("on"+eventName,event)}},_isWithinCanvas=function isWithinCanvas(e,chart){var chartConfig=chart.get("config"),mousePos=getMouseCoordinate(chart.get("linkedItems","container"),e,chart),chartX=mousePos.chartX,chartY=mousePos.chartY,minX=chartConfig.canvasLeft,minY=chartConfig.canvasTop,maxX=chartConfig.canvasLeft+chartConfig.canvasWidth,maxY=chartConfig.canvasHeight+chartConfig.canvasTop;mousePos.insideCanvas=false;mousePos.originalEvent=e;if(chartX>minX&&chartX<maxX&&chartY>minY&&chartY<maxY){mousePos.insideCanvas=true}return mousePos};Raphael.addSymbol(symbolList);var ZoomLine=function(_MSLine){_inheritsLoose(ZoomLine,_MSLine);ZoomLine.getName=function getName(){return"ZoomLine"};ZoomLine.includeInputOptions=function includeInputOptions(){return["DragZoomIn","DragPin","ZoomResetButton","ZoomOutButton"]};function ZoomLine(){var _this;_this=_MSLine.call(this)||this;_this.zoomX=true;_this.hasScroll=true;_this.eiMethods={zoomOut:function zoomOut(callback){var chart=this.apiInstance,canvas=chart.getChildren&&chart.getChildren("canvas")[0],inputManager=canvas&&canvas.getChildren("inputManager"),output;inputManager=inputManager&&inputManager[0];if(!chart||!inputManager){return}chart.addJob("zoomOut"+count++,(function(){output=inputManager.zoomOut();if(typeof callback==="function"){callback(output)}}),priorityList.postRender)},zoomTo:function zoomTo(startIndex,endIndex,callback){var chartInstance=this,chart=chartInstance.apiInstance,canvas=chart.getChildren&&chart.getChildren("canvas")[0],inputManager=canvas&&canvas.getChildren("inputManager"),output;if(startIndex===UNDEF||endIndex===UNDEF){return}inputManager=inputManager&&inputManager[0];if(!chart||!inputManager){return}if(callback){chart.addJob("zoomTo"+count++,(function(){output=inputManager.zoomTo(startIndex,endIndex);if(typeof callback==="function"){callback(output)}}),priorityList.postRender)}else{return inputManager.zoomTo(startIndex,endIndex)}},resetChart:function resetChart(){var chart=this.apiInstance,canvas=chart.getChildren&&chart.getChildren("canvas")[0],inputManager=canvas&&canvas.getChildren("inputManager"),_helperFn=function _helperFn(){inputManager.resetChart()};inputManager=inputManager&&inputManager[0];if(!chart||!inputManager){return}chart.addJob("resetChart"+count++,_helperFn,priorityList.postRender)},setZoomMode:function setZoomMode(yes){var chart=this.apiInstance,canvas=chart.getChildren&&chart.getChildren("canvas")[0],inputManager=canvas&&canvas.getChildren("inputManager");inputManager=inputManager&&inputManager[0];if(!chart||!inputManager){return}chart.addJob("setZoomMode"+count++,(function(){inputManager.setZoomMode(yes)}),priorityList.postRender)},getViewStartIndex:function getViewStartIndex(callback){var chart=this.apiInstance,axis,minValue,startIndex;if(callback){chart.addJob("getViewStartIndex"+count++,(function(){if(typeof callback==="function"){axis=chart.getChildren("xAxis")[0];minValue=axis.getVisibleConfig().minValue;startIndex=Math.ceil(minValue);callback(startIndex===0?0:startIndex)}}),priorityList.postRender)}else{axis=chart.getChildren("xAxis")[0];minValue=axis.getVisibleConfig().minValue;startIndex=Math.ceil(minValue);return startIndex===0?0:startIndex}},getViewEndIndex:function getViewEndIndex(callback){var chart=this.apiInstance,axis,maxValue;if(callback){chart.addJob("getViewEndIndex"+count++,(function(){if(typeof callback==="function"){axis=chart.getChildren("xAxis")[0];maxValue=axis.getVisibleConfig().maxValue;callback(Math.floor(maxValue))}}),priorityList.postRender)}else{axis=chart.getChildren("xAxis")[0];maxValue=axis.getVisibleConfig().maxValue;return Math.floor(maxValue)}}};_this.eiMethods.scrollTo=scrollTo;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=ZoomLine.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_MSLine.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.defaultDatasetType=ZOOMLINE_STR;config.showValues=0;config.zeroplanethickness=1;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.enablemousetracking=true;config.skipAttr=true;config.canvasborderthickness=1;config.showvalues=0};_proto.getName=function getName(){return"ZoomLine"};_proto.parseChartAttr=function parseChartAttr(dataObj){_MSLine.prototype.parseChartAttr.call(this,dataObj);var chart=this,config=chart.config,jsonData=dataObj||chart.getFromEnv("dataSource"),chartAttrs=jsonData.chart;config.useCrossline=Number(chartAttrs.usecrossline)||chartAttrs.usecrossline===UNDEF?1:0;config.drawTrendRegion=0};_proto.getInputConfigurations=function getInputConfigurations(){var iapi=this,config=iapi.config,hookFn=function hookFn(dsi,dei){iapi.addJob("inputZoom",(function(){var info=config.viewPortConfig;info.dsi=dsi;info.dei=dei;iapi.updateManager();iapi.getChildren("xAxis")[0].prepareAttributes()}),priorityList.configure)},dragendFn=function dragendFn(){return hookFn(arguments.length<=1?undefined:arguments[1],arguments.length<=2?undefined:arguments[2])},inputComponents={dragZoomIn:{scaleX:true,scaleY:false,drawButton:false,boxStyle:{stroke:config.zoomPaneStroke,fill:config.zoomPaneFill,"stroke-width":0},catZoomLimit:2,skipGraphics:true,dragendFn:dragendFn},zoomResetButton:{hookFn:hookFn,tooltext:config.btnResetChartTooltext},zoomOutButton:{hookFn:hookFn,tooltext:config.btnZoomOutTooltext},dragPin:{orientation:"horizontal",attr:{stroke:config.zoomPaneStroke,fill:config.zoomPaneFill,"stroke-width":0},skipGraphics:!config.allowPinMode,pinAttr:{"stroke-width":0,stroke:"none",fill:config.pinPaneFill,"shape-rendering":"crisp"},strokeWidth:0,tooltext:config.showToolBarButtonTooltext&&config.btnSwitchToPinModeTooltext||BLANK}};return inputComponents};_proto._setCategories=function _setCategories(){var iapi=this,config=iapi.config,dataObj=iapi.getFromEnv("dataSource"),chartDef=dataObj.chart||{},xAxis=iapi.getChildren("xAxis"),tempArr,data,j,len,cdm=config.cdm,cdmchar=config.cdmchar,category=dataObj.categories&&dataObj.categories[0].category||[];config.cdm=cdm=pluckNumber(chartDef.compactdatamode,0);config.cdmchar=cdmchar=pluck(chartDef.dataseparator,PIPE);if(cdm||typeof category==="string"){if(category.split){tempArr=category.split(cdmchar);data=[];for(j=0,len=tempArr.length;j<len;j+=1){data.push({label:tempArr[j]})}iapi.config.categories=dataObj.categories[0].category=data}}xAxis[0].setAxisPadding(0,0);xAxis[0].setTickValues(data||category)};_proto.isWithinCanvas=function isWithinCanvas(e,chart){return _isWithinCanvas.call(this,e,chart)};_proto.highlightPoint=function highlightPoint(showHover,cx,cy,point,index,toolText){var chart=this,chartConfig=chart.config,animationManager=chart.getFromEnv("animationManager"),chartComponents=chart.components,chartGraphics=chart.graphics,isHover=Number(showHover),trackerCheck=chartGraphics.tracker,tracker,datasetObj=chartComponents.dataset[index],datasetConfig=datasetObj&&datasetObj.config,radius=datasetObj&&datasetConfig.zoomedRadius||0,hoverCosmetics=datasetObj&&datasetConfig.hoverCosmetics,fill=hoverCosmetics&&hoverCosmetics.fill,borderColor=hoverCosmetics&&hoverCosmetics.borderColor,borderThickness=hoverCosmetics&&hoverCosmetics.borderThickness,plotEventHandlerCallback={click:function click(e){chart.plotEventHandler(this,e)},hoverIn:function hoverIn(e){chart.plotEventHandler(this,e,"dataplotRollover")},hoverOut:function hoverOut(e){chart.plotEventHandler(this,e,"dataplotRollout")}};if(!trackerCheck){tracker=chartGraphics.tracker=animationManager.setAnimation({el:"circle",attr:{cx:0,cy:0,r:radius,fill:isHover?fill:TRACKER_FILL,stroke:isHover?borderColor:TRACKER_FILL,"stroke-width":isHover?borderThickness:0,"clip-rect":chartConfig.canvasLeft+","+chartConfig.canvasTop+","+chartConfig.canvasWidth+","+chartConfig.canvasHeight},container:chartGraphics.trackerGroup,component:chart}).on("fc-click",plotEventHandlerCallback.click).hover(plotEventHandlerCallback.hoverIn,plotEventHandlerCallback.hoverOut)}point&&tracker.data("eventArgs",{x:point.x,y:point.y,tooltip:point.tooltip,link:point.link});chartConfig.lastHoveredPoint=point;chart.getFromEnv("toolTipController").enableToolTip(tracker,toolText);tracker.transform("t"+(cx+chartConfig.canvasLeft)+","+(cy+chartConfig.canvasTop));point&&fireMouseEvent("mouseover",tracker&&tracker.node,chartConfig.lastMouseEvent)};_proto.configureAttributes=function configureAttributes(dataObj){_MSLine.prototype.configureAttributes.call(this,dataObj);var style,iapi=this,jsonData=iapi.getFromEnv("dataSource"),chartDef=jsonData.chart||{},colorManager=iapi.getFromEnv("color-manager"),canvasBorderColor=colorManager.getColor("canvasBorderColor"),bntTooltext=pluckNumber(chartDef.showtoolbarbuttontooltext,1),config;config=iapi.config;style=config.style;config.stepZoom=400/(100-pluckNumber(chartDef.stepzoom,25));if(config.stepZoom<=2){config.stepZoom=1.9}extend2(config,{useRoundEdges:pluckNumber(chartDef.useroundedges,0),zoomType:"x",canvasPadding:pluckNumber(chartDef.canvaspadding,0),scrollColor:getFirstColor(pluck(chartDef.scrollcolor,colorManager.getColor("altHGridColor"))),scrollShowButtons:!!pluckNumber(chartDef.scrollshowbuttons,1),scrollHeight:pluckNumber(chartDef.scrollheight,16)||16,scrollBarFlat:pluckNumber(chartDef.flatscrollbars,0),allowPinMode:pluckNumber(chartDef.allowpinmode,1),skipOverlapPoints:pluckNumber(chartDef.skipoverlappoints,1),showToolBarButtonTooltext:bntTooltext,btnResetChartTooltext:bntTooltext?pluck(chartDef.btnresetcharttooltext,"Reset Chart"):"",btnZoomOutTooltext:bntTooltext?pluck(chartDef.btnzoomouttooltext,"Zoom out one level"):"",btnSwitchToZoomModeTooltext:bntTooltext?pluck(chartDef.btnswitchtozoommodetooltext,"<strong>Switch to Zoom Mode</strong><br/>Select a subset of data to zoom "+"into it for detailed view"):"",btnSwitchToPinModeTooltext:bntTooltext?pluck(chartDef.btnswitchtopinmodetooltext,"<strong>Switch to Pin Mode</strong><br/>Select a subset of data and compare "+"with the rest of the view"):"",pinPaneFill:convertColor(pluck(chartDef.pinpanebgcolor,canvasBorderColor),pluckNumber(chartDef.pinpanebgalpha,15)),zoomPaneFill:convertColor(pluck(chartDef.zoompanebgcolor,"#b9d5f1"),pluckNumber(chartDef.zoompanebgalpha,30)),zoomPaneStroke:convertColor(pluck(chartDef.zoompanebordercolor,"#3399ff"),pluckNumber(chartDef.zoompaneborderalpha,80)),showPeakData:pluckNumber(chartDef.showpeakdata,0),maxPeakDataLimit:pluckNumber(chartDef.maxpeakdatalimit,chartDef.maxpeaklimit,null),minPeakDataLimit:pluckNumber(chartDef.minpeakdatalimit,chartDef.minpeaklimit,null),crossline:{enabled:pluckNumber(chartDef.showcrossline,1),line:{"stroke-width":pluckNumber(chartDef.crosslinethickness,1),stroke:getFirstColor(pluck(chartDef.crosslinecolor,"#000000")),"stroke-opacity":pluckNumber(chartDef.crosslinealpha,20)/100},labelEnabled:pluckNumber(chartDef.showcrosslinelabel,chartDef.showcrossline,1),labelstyle:{fontSize:toFloat(chartDef.crosslinelabelsize)?toFloat(chartDef.crosslinelabelsize)+PX:style.outCanfontSize,fontFamily:pluck(chartDef.crosslinelabelfont,style.outCanfontFamily)},valueEnabled:pluckNumber(chartDef.showcrosslinevalues,chartDef.showcrossline,1),valuestyle:{fontSize:toFloat(chartDef.crosslinevaluesize)?toFloat(chartDef.crosslinevaluesize)+PX:style.inCanfontSize,fontFamily:pluck(chartDef.crosslinevaluefont,style.inCanvasStyle.fontFamily)}},useCrossline:pluckNumber(chartDef.usecrossline,1),tooltipSepChar:pluck(chartDef.tooltipsepchar,", "),showTerminalValidData:pluckNumber(chartDef.showterminalvaliddata,0)})};_proto.getValuePixel=function getValuePixel(px){var chart=this,chartConfig=chart.config,info=chartConfig.viewPortConfig;return info.ddsi+mathFloor(px/info.ppp)};_proto.getDatasets=function getDatasets(){var iapi=this,dataSetArr=[];iapi.iterateComponents((function(child){if(child.getType&&child.getType()==="dataset"){dataSetArr.push(child)}}));return dataSetArr};_proto.__preDraw=function __preDraw(){var seriesItemConf,ppp,ppl,iapi=this,iapiConfig=iapi.config,chartDef=iapi.getFromEnv("dataSource").chart,cdm=iapiConfig.cdm,xAxis=iapi.getChildren("xAxis")[0],info=iapiConfig.viewPortConfig,canvasConfig=iapi.getChildren("canvas")[0].config,canvasPadding=mathMax(canvasConfig.canvasPadding,canvasConfig.canvasPaddingLeft,canvasConfig.canvasPaddingRight),yAxis=iapi.getChildren("yAxis")[0],canvasHeight=iapiConfig.canvasHeight,chartAttrs=iapi.getFromEnv("dataSource").chart,clen=xAxis.getTicksLen(),_xAxis$getVisibleConf=xAxis.getVisibleConfig(),minValue=_xAxis$getVisibleConf.minValue,maxValue=_xAxis$getVisibleConf.maxValue,start=pluckNumber(chartDef.displaystartindex,minValue,1),end=pluckNumber(chartDef.displayendindex,maxValue,clen||2),dsi=toInt(start,10)-1,dei=toInt(end,10)-1,overFlowingMarkerWidth=0,dataSetArr,j;dataSetArr=iapi.getDatasets();j=dataSetArr.length;iapiConfig.borderWidth=pluckNumber(chartAttrs.showborder,1)?pluckNumber(chartAttrs.borderthickness,1):0;iapiConfig.updateAnimDuration=500;iapiConfig.status=ZOOM_STR;iapiConfig.maxZoomLimit=pluckNumber(chartDef.maxzoomlimit,1e3);iapiConfig.viewPortHistory=[];(ppp=pluckNumber(chartDef.pixelsperpoint,15))<1&&(ppp=1);(ppl=pluckNumber(chartDef.pixelsperlabel,chartDef.xaxisminlabelwidth,xAxis.getAxisConfig("labels").rotation?20:60))<ppp&&(ppl=ppp);(dsi<0||dsi>=(clen-1||1))&&(dsi=0);(dei<=dsi||dei>(clen-1||1))&&(dei=clen-1||1);info=iapiConfig.viewPortConfig=extend2(iapiConfig.viewPortConfig,{amrd:pluckNumber(chartDef.anchorminrenderdistance,20),nvl:pluckNumber(chartDef.numvisiblelabels,0),cdm:cdm,oppp:ppp,oppl:ppl,dsi:dsi,dei:dei,vdl:dei-dsi,clen:clen,offset:0,step:1,llen:0,alen:0,ddsi:dsi,ddei:dei,ppc:0});if(!info.clen){return}while(j--){seriesItemConf=dataSetArr[j].config;overFlowingMarkerWidth=mathMax(overFlowingMarkerWidth,seriesItemConf.drawanchors&&(seriesItemConf.anchorradius||0)+(Number(seriesItemConf.anchorborderthickness)||0)||0)}iapiConfig.overFlowingMarkerWidth=overFlowingMarkerWidth;canvasPadding=iapiConfig.canvasPadding=mathMax(overFlowingMarkerWidth,canvasPadding);iapiConfig._prezoomed=info.dei-info.dsi<info.clen-1;iapiConfig._visw=Math.max(1,iapiConfig.canvasWidth-canvasPadding*2);iapiConfig._visx=iapiConfig.canvasLeft+canvasPadding;iapiConfig._visout=-(iapiConfig.height+canvasHeight+1e3);iapiConfig._yminValue=yAxis.getLimit().min;iapiConfig._ymin=yAxis.getPixel(iapiConfig._yminValue);if(pluckNumber(chartDef.displaystartindex,chartDef.displayendindex)){xAxis.setVisibleConfig(start,end)}iapi.updateManager()};_proto.resetZoom=function resetZoom(){var iapi=this,iapiConfig=iapi.config,history=iapiConfig.viewPortHistory,origInfo=history[0];if(!history.length){return false}history.length=0;if(iapi.zoomTo(origInfo.dsi,origInfo.dei,origInfo)){iapi.fireChartInstanceEvent("zoomReset",iapi._zoomargs,[iapi.getFromEnv("chartInstance").id])}return true};_proto.zoomOut=function zoomOut(){var lastinfo,origInfo,iapi=this,iapiConfig=iapi.config,history=iapiConfig.viewPortHistory,dsi,dei,args;lastinfo=history.pop();origInfo=history[0]||iapiConfig.viewPortConfig;if(lastinfo){dsi=lastinfo.dsi;dei=lastinfo.dei}else{if(iapiConfig._prezoomed){dsi=0;dei=origInfo.clen-1}}args=iapi.zoomTo(dsi,dei,lastinfo);if(args){iapi.fireChartInstanceEvent("zoomedout",args)}return true};_proto.zoomRangePixels=function zoomRangePixels(pxs,pxe){var chart=this,chartConfig=chart.config,info=chartConfig.viewPortConfig,ppp=info.ppp,start=info.ddsi,dsi,dei;dsi=start+mathFloor(pxs/ppp);dei=start+mathFloor(pxe/ppp);info.dsi=dsi;info.dei=dei;chart.updateManager()};_proto.prepareAttributes=function prepareAttributes(){if(!this.config.hasChartMessage){this.__preDraw();_MSLine.prototype.prepareAttributes.call(this)}};_proto.getValue=function getValue(point){var chart=this,chartConfig=chart.config,viewPortConfig=chartConfig.viewPortConfig,origpixel=chart.getOriginalPositions(point.x,point.y,point.x,point.y),origX=origpixel[0],origY=origpixel[1],xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],xaxisRange=xAxis.config.axisRange,yaxisRange=yAxis.config.axisRange,minX=xaxisRange.min,maxX=xaxisRange.max,maxY=yaxisRange.max,minY=yaxisRange.min,xPVR=chartConfig.canvasWidth*viewPortConfig.scaleX/(maxX-minX),yPVR=chartConfig.canvasHeight*viewPortConfig.scaleY/(maxY-minY);return{x:minX+(origX-chartConfig.canvasLeft)/xPVR,y:maxY-(origY-chartConfig.canvasTop)/yPVR}};_proto.getOriginalPositions=function getOriginalPositions(x1,y1,x2,y2){var newW,newH,newX,newY,chart=this,chartConfig=chart.config,viewPortConfig=chartConfig.viewPortConfig,oldScaleX=viewPortConfig.scaleX,oldScaleY=viewPortConfig.scaleY,oldX=viewPortConfig.x,oldY=viewPortConfig.y,xMin=mathMin(x1,x2),xMax=mathMax(x1,x2),yMin=mathMin(y1,y2),yMax=mathMax(y1,y2);xMax=xMax>chartConfig.canvasWidth?chartConfig.canvasWidth:xMax;yMax=yMax>chartConfig.canvasHeight?chartConfig.canvasHeight:yMax;xMin=xMin<0?0:xMin;yMin=yMin<0?0:yMin;newW=(xMax-xMin)/oldScaleX;newH=(yMax-yMin)/oldScaleY;newX=oldX+xMin/oldScaleX;newY=oldY+yMin/oldScaleY;return[newX,newY,newW,newH]};_proto.updateManager=function updateManager(){var i,labelStep,stepValue,chart=this,scaleX,dataSets=this.getDatasets(),len=dataSets.length,chartConfig=chart.config,info=chartConfig.viewPortConfig,visW=chartConfig._visw,xAxis=chart.getChildren("xAxis")[0],getPixelX=function getPixelX(val){return xAxis.getPixel(val,{wrtVisible:true})},cssLabel=xAxis.getAxisConfig("labels").style,oppp,vdl,ppl,ppp,step,lskip,norm,dsi,dei,ddsi,ddei,nvl,visibleExtremes;if(chartConfig.legendClicked){for(i=0;i<len;i+=1){dataSets[i].draw()}return}!info&&(info=chartConfig.viewPortConfig);oppp=info.oppp;nvl=ppl=info.nvl;dsi=info.dsi;dei=info.dei;vdl=info.vdl=dei-dsi;ppl=info.ppl=nvl?visW/nvl:info.oppl;step=info.step=(ppp=info.ppp=visW/vdl)<oppp?mathCeil(oppp/ppp):1;lskip=info.lskip=mathCeil(mathMax(ppl,toFloat(cssLabel.lineHeight))/ppp/step);ddsi=info.dsi;ddei=info.dei;info.offset=0;norm=info.norm=ddsi%step;info.ddsi=ddsi=ddsi-norm;info.ddei=ddei=ddei+2*step-norm;info._ymin=chartConfig._ymin;info._yminValue=chartConfig._yminValue;info.x=(getPixelX(ddsi)-getPixelX(xAxis.getVisibleConfig().minValue)+info.offset)/info.scaleX;if(ddei-ddsi>xAxis.getTicksLen()){info.scaleX=1}else{info.scaleX=xAxis.getTicksLen()/Math.abs(ddei-ddsi-step-.9)}visibleExtremes=xAxis.getVisibleConfig();stepValue=Math.ceil((visibleExtremes.maxValue-visibleExtremes.minValue+1)/nvl);scaleX=chartConfig.viewPortConfig&&chartConfig.viewPortConfig.scaleX;labelStep=Math.max(Math.round(xAxis.getAxisConfig("labelStep")/scaleX),nvl?stepValue:lskip*step);xAxis.setLabelConfig({step:labelStep})};_proto.getParsedLabel=function getParsedLabel(index){var xlabels=this.xlabels;return xlabels.parsed[index]||(xlabels.parsed[index]=parseUnsafeString(xlabels.data[index]||BLANK))};_proto._setAxisScale=function _setAxisScale(){var xAxis=this.getChildren("xAxis")[0];xAxis.setScrollType("always")};_proto.getDSdef=function getDSdef(){return ZoomLineDataset};return ZoomLine}(MSLine);export default ZoomLine;