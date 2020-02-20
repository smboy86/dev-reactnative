import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{pluck,preDefStr,POSITION_RIGHT,convertColor,pluckFontSize,pluckNumber,getFirstValue,getMouseCoordinate,BLANKSTRING}from"@fusioncharts/core/src/lib";import MSCartesian from"@fusioncharts/charts/src/chart/_internal/mscartesian";import virtualCanvasFactory from"@fusioncharts/charts/src/factories/vcanvas";import datasetFactory from"../../factories/candlestick-dataset";import axisFactory from"../../factories/candlestick-axis";import{CandleStickDataset,CandleStickBarDataset,CandleStickLineDataset}from"../../dataset/candlestick";import isEqualString from"@fusioncharts/utils/src/string/equal";var MOUSEOUT="fc-mouseout",CANDLESTICK="candlestick",padding=6;var altHGridColorStr=preDefStr.altHGridColorStr,altHGridAlphaStr=preDefStr.altHGridAlphaStr,math=Math,mathMax=math.max,mathRound=math.round,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,divLineAlpha3DStr=preDefStr.divLineAlpha3DStr,defaultFontStr=preDefStr.defaultFontStr,divLineAlphaStr=preDefStr.divLineAlphaStr,altVGridColorStr=preDefStr.altVGridColorStr,altVGridAlphaStr=preDefStr.altVGridAlphaStr,colorStrings=preDefStr.colors,COLOR_000000=colorStrings.c000000,chartPaletteStr={chart2D:{bgColor:"bgColor",bgAlpha:"bgAlpha",bgAngle:"bgAngle",bgRatio:"bgRatio",canvasBgColor:"canvasBgColor",canvasBaseColor:"canvasBaseColor",divLineColor:"divLineColor",legendBgColor:"legendBgColor",legendBorderColor:"legendBorderColor",toolTipbgColor:"toolTipbgColor",toolTipBorderColor:"toolTipBorderColor",baseFontColor:"baseFontColor",anchorBgColor:"anchorBgColor"},chart3D:{bgColor:"bgColor3D",bgAlpha:"bgAlpha3D",bgAngle:"bgAngle3D",bgRatio:"bgRatio3D",canvasBgColor:"canvasBgColor3D",canvasBaseColor:"canvasBaseColor3D",divLineColor:"divLineColor3D",divLineAlpha:divLineAlpha3DStr,legendBgColor:"legendBgColor3D",legendBorderColor:"legendBorderColor3D",toolTipbgColor:"toolTipbgColor3D",toolTipBorderColor:"toolTipBorderColor3D",baseFontColor:"baseFontColor3D",anchorBgColor:"anchorBgColor3D"}},isVolumeChartRequired=function isVolumeChartRequired(dataObj){if(!(dataObj&&dataObj.dataset)){return 0}var data=dataObj.dataset[0].data;return!!(Array.isArray(data)&&data.filter((function(v){return v.volume}))||[]).length};var CandleStick=function(_MSCartesian){_inheritsLoose(CandleStick,_MSCartesian);function CandleStick(){var _this;_this=_MSCartesian.call(this)||this;_this.isDual=true;_this.paletteIndex=3;_this.hasInteractiveLegend=false;_this.numOfCanvas=2;_this.registerFactory("vCanvas",virtualCanvasFactory,["axis"]);_this.registerFactory("axis",axisFactory,["canvas"]);_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=CandleStick.prototype;_proto.getName=function getName(){return"candlestick"};CandleStick.getName=function getName(){return"candlestick"};_proto.getDSdef=function getDSdef(name){return name==="bar"?CandleStickBarDataset:name==="line"?CandleStickLineDataset:CandleStickDataset};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.hasLegend=true;config.defaultDatasetType=CANDLESTICK;config.drawanchors=0;config.enablemousetracking=true;config.iscandlestick=true;config.canvasborderthickness=1};_proto.configureAttributes=function configureAttributes(dataObj){_MSCartesian.prototype.configureAttributes.call(this,dataObj)};_proto.parseChartAttr=function parseChartAttr(dataObj){_MSCartesian.prototype.parseChartAttr.call(this,dataObj);var iapi=this,volumeHeightPercent,config=iapi.config,chartAttrs=iapi.getFromEnv("chart-attrib"),colorM=iapi.getFromEnv("color-manager");config.showVolumeChart=pluckNumber(chartAttrs.showvolumechart,isVolumeChartRequired(dataObj),1);config.rollOverBandColor=convertColor(pluck(chartAttrs.rolloverbandcolor,colorM.getColor(altHGridColorStr)),pluck(chartAttrs.rolloverbandalpha,colorM.getColor(altHGridAlphaStr)));config.crosslinecolor=pluck(chartAttrs.crosslinecolor,chartAttrs.rolloverbandcolor,colorM.getColor(altHGridColorStr));config.drawcrosslineontop=0;config.crosslinealpha=pluckNumber(chartAttrs.crosslinealpha,chartAttrs.rolloverbandalpha,colorM.getColor(altHGridAlphaStr));config.drawcrossline=1;config.skipClipping=true;chartAttrs=iapi.getFromEnv("chart-attrib");config.vplotbordercolor=getFirstValue(chartAttrs.vplotbordercolor,BLANKSTRING);config.vplotborderalpha=getFirstValue(chartAttrs.vplotborderalpha,BLANKSTRING);config.vplotborderthickness=pluckNumber(chartAttrs.vplotborderthickness,1);config.showplotborder=pluckNumber(chartAttrs.showvplotborder,1);volumeHeightPercent=pluckNumber(chartAttrs.volumeheightpercent,40);config.volumeHeightPercent=volumeHeightPercent<20?20:volumeHeightPercent>80?80:volumeHeightPercent;config.canvasBorderWidth=pluckNumber(chartAttrs.canvasborderthickness,1)};_proto._spaceManager=function _spaceManager(){var spaceForActionBar,actionBarSpace,availableWidth,availableHeight,iapi=this,config=iapi.config,components=iapi.getChildren(),legendPosition=config.legendPosition,xAxis=components.xAxis&&components.xAxis[0],yAxis=components.yAxis&&components.yAxis[0],yAxis2=components.yAxis&&components.yAxis[1],legend=iapi.getFromEnv("legend"),canvasHeight,xAxisDimensions,showVolumeChart=iapi.config.showVolumeChart,volumeHeightPercent=showVolumeChart?config.volumeHeightPercent:0,canvas=components.canvas[0],canvasConfig=canvas.config,volumeCanvas,volumeCanvasConfig,volumeCanvasY,yAxisDim,vYAxisDim,width=config.width,height=config.height,actualYDim={},allottedSpace,chartBorderWidth=config.chartBorderWidth,canvasBorderWidth=canvasConfig.canvasBorderWidth,minCanvasHeight=config.minCanvasHeight,minCanvasWidth=config.minCanvasWidth,canvasMarginLeft=config.canvasMarginLeft,canvasMarginRight=config.canvasMarginRight,canvasMarginTop=config.canvasMarginTop,canvasMarginBottom=config.canvasMarginBottom,diff,currentCanvasHeight,currentCanvasWidth,heightAdjust,origCanvasTopMargin=config.origCanvasTopMargin,origCanvasBottomMargin=config.origCanvasBottomMargin,origCanvasLeftMargin=config.origCanvasLeftMargin,origCanvasRightMargin=config.origCanvasRightMargin,left,right,top,bottom,widthAdjust,sum;iapi._allocateSpace({top:chartBorderWidth,bottom:chartBorderWidth,left:chartBorderWidth,right:chartBorderWidth});spaceForActionBar=config.availableHeight*.225;actionBarSpace=iapi._manageActionBarSpace&&iapi._manageActionBarSpace(spaceForActionBar)||{};iapi._allocateSpace(actionBarSpace);if(legendPosition===POSITION_RIGHT){allottedSpace=config.canvasWidth*.225}else{allottedSpace=config.canvasHeight*.3}config.hasLegend!==false&&xAxis&&config.showLegend&&iapi._allocateSpace(legend._manageLegendPosition(allottedSpace));availableWidth=config.canvasWidth*.7;yAxisDim=yAxis.placeAxis(availableWidth);vYAxisDim=showVolumeChart?yAxis2.placeAxis(availableWidth):{};actualYDim.left=mathMax(yAxisDim.left,vYAxisDim.left||0);actualYDim.right=mathMax(yAxisDim.right,vYAxisDim.right||0);iapi._allocateSpace(actualYDim);if(minCanvasWidth>width-canvasMarginLeft-canvasMarginRight){widthAdjust=true;diff=config.canvasWidth-minCanvasWidth;sum=canvasMarginLeft+canvasMarginRight;canvasMarginLeft=config.canvasMarginLeft=diff*canvasMarginLeft/sum;canvasMarginRight=config.canvasMarginRight=diff*canvasMarginRight/sum}left=canvasMarginLeft>config.canvasLeft?canvasMarginLeft-config.canvasLeft:0;right=canvasMarginRight>width-config.canvasRight?canvasMarginRight+config.canvasRight-width:0;iapi._allocateSpace({left:left,right:right});if(widthAdjust){sum=origCanvasLeftMargin+origCanvasRightMargin;currentCanvasWidth=config.canvasWidth;if(currentCanvasWidth>minCanvasWidth){diff=currentCanvasWidth-minCanvasWidth;left=diff*origCanvasLeftMargin/sum;right=diff*origCanvasRightMargin/sum}iapi._allocateSpace({left:left,right:right})}availableHeight=config.canvasHeight*.225;availableHeight=legendPosition===POSITION_BOTTOM?config.canvasHeight*.6:config.canvasWidth*.6;iapi._manageChartMenuBar(availableHeight);iapi._allocateSpace({top:config.canvasMarginTop,bottom:config.canvasMarginBottom});availableHeight=config.canvasHeight*.3;xAxisDimensions=xAxis.placeAxis(availableHeight);xAxis&&iapi._allocateSpace(xAxisDimensions);xAxisDimensions.bottom+=padding;canvasConfig.intermediarySpace=xAxisDimensions.bottom;if(showVolumeChart){iapi._allocateSpace({bottom:10})}iapi._allocateSpace({top:canvasBorderWidth,bottom:canvasBorderWidth*2,left:canvasBorderWidth,right:canvasBorderWidth});if(minCanvasHeight>height-canvasMarginTop-canvasMarginBottom){heightAdjust=true;diff=config.canvasHeight-minCanvasHeight;sum=canvasMarginTop+canvasMarginBottom;canvasMarginTop=config.canvasMarginTop=diff*canvasMarginTop/sum;canvasMarginBottom=config.canvasMarginBottom=diff*canvasMarginBottom/sum}top=canvasMarginTop>config.canvasTop?canvasMarginTop-config.canvasTop:0;bottom=canvasMarginBottom>height-config.canvasBottom?canvasMarginBottom+config.canvasBottom-height:0;iapi._allocateSpace({top:top,bottom:bottom});if(heightAdjust){sum=origCanvasTopMargin+origCanvasBottomMargin;currentCanvasHeight=config.canvasHeight;if(currentCanvasHeight>minCanvasHeight){diff=currentCanvasHeight-minCanvasHeight;top=diff*origCanvasTopMargin/sum;bottom=diff*origCanvasBottomMargin/sum}iapi._allocateSpace({top:top,bottom:bottom})}canvasHeight=config.canvasHeight;canvasConfig.canvasHeight=mathRound((100-volumeHeightPercent)/100*canvasHeight);canvasConfig.canvasTop=config.canvasTop;canvasConfig.canvasLeft=config.canvasLeft;canvasConfig.canvasBottom=canvasConfig.canvasTop+canvasConfig.canvasHeight;canvasConfig.canvasWidth=config.canvasWidth;canvasConfig.canvasRight=config.canvasRight;canvasConfig.canvasY=config.canvasTop+canvasConfig.canvasHeight+canvasBorderWidth;canvas.setDimension({top:canvasConfig.canvasTop,left:canvasConfig.canvasLeft,width:canvasConfig.canvasWidth,height:canvasConfig.canvasHeight});if(showVolumeChart){volumeCanvas=components.canvas[1];volumeCanvasConfig=volumeCanvas.config;volumeCanvasConfig.canvasHeight=volumeHeightPercent/100*canvasHeight;volumeCanvasConfig.canvasTop=canvasConfig.canvasBottom+xAxisDimensions.bottom+canvasBorderWidth*2;volumeCanvasConfig.canvasLeft=config.canvasLeft;volumeCanvasConfig.canvasBottom=volumeCanvasConfig.canvasTop+volumeCanvasConfig.canvasHeight+canvasBorderWidth*2;volumeCanvasConfig.canvasRight=config.canvasRight;volumeCanvasConfig.canvasWidth=config.canvasWidth;volumeCanvasY=config.canvasTop+canvasConfig.canvasHeight+xAxisDimensions.bottom+canvasBorderWidth*2;volumeCanvasConfig.canvasY=volumeCanvasY;volumeCanvas.setDimension({top:volumeCanvasConfig.canvasTop,left:volumeCanvasConfig.canvasLeft,width:volumeCanvasConfig.canvasWidth,height:volumeCanvasConfig.canvasHeight})}};_proto._postSpaceManagement=function _postSpaceManagement(){_MSCartesian.prototype._postSpaceManagement.call(this)};_proto.setAxisDimention=function setAxisDimention(){var iapi=this,components=iapi.getChildren(),xAxis=components.xAxis&&components.xAxis[0],yAxis=components.yAxis&&components.yAxis[0],vyAxis=components.yAxis&&components.yAxis[1],canvasArr=components.canvas,canvasConfig=canvasArr[0].config,volumeCanvasConfig,canvasBorderWidth=canvasConfig.canvasBorderWidth,axisLeft=canvasConfig.canvasLeft-canvasBorderWidth;xAxis&&xAxis.setAxisDimention({x:canvasConfig.canvasLeft,y:xAxis.config.isOpposit?canvasConfig.canvasTop-canvasBorderWidth:canvasConfig.canvasY,opposite:xAxis.config.isOpposit?canvasConfig.canvasY:canvasConfig.canvasTop-canvasBorderWidth,axisLength:canvasConfig.canvasWidth});yAxis&&yAxis.setAxisDimention({x:yAxis.config.isOpposit?canvasConfig.canvasRight+canvasBorderWidth:axisLeft,y:canvasConfig.canvasTop,opposite:yAxis.config.isOpposit?axisLeft:canvasConfig.canvasRight+canvasBorderWidth,axisLength:canvasConfig.canvasHeight});xAxis.setCanvas(canvasConfig);yAxis.setCanvas(canvasConfig);if(iapi.config.showVolumeChart){volumeCanvasConfig=canvasArr[1].config;vyAxis&&vyAxis.setAxisDimention({x:yAxis.config.isOpposit?volumeCanvasConfig.canvasRight+canvasBorderWidth:axisLeft,y:volumeCanvasConfig.canvasTop,opposite:yAxis.config.isOpposit?axisLeft:volumeCanvasConfig.canvasRight+canvasBorderWidth,axisLength:volumeCanvasConfig.canvasHeight});vyAxis&&vyAxis.setCanvas(volumeCanvasConfig)}};_proto._feedAxesRawData=function _feedAxesRawData(){var iapi=this,colorM=iapi.getFromEnv("color-manager"),dataObj=iapi.getFromEnv("dataSource"),chartAttrs=iapi.getFromEnv("chart-attrib"),xAxisConf,yAxisConf,vYAxisConf,yAxisConfigure=[],xAxisConfigure=[],is3D=iapi.config.is3D,palleteString=is3D?chartPaletteStr.chart3D:chartPaletteStr.chart2D;xAxisConf={isVertical:false,isReverse:false,isOpposit:isEqualString(chartAttrs.xaxisposition,"top"),drawTrendLabels:true,outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.xaxisnamepadding,axisValuePadding:chartAttrs.labelpadding,axisNameFont:chartAttrs.xaxisnamefont,axisNameFontSize:chartAttrs.xaxisnamefontsize,axisNameFontColor:chartAttrs.xaxisnamefontcolor,axisNameFontBold:chartAttrs.xaxisnamefontbold,axisNameFontItalic:chartAttrs.xaxisnamefontitalic,axisNameBgColor:chartAttrs.xaxisnamebgcolor,axisNameBorderColor:chartAttrs.xaxisnamebordercolor,axisNameAlpha:chartAttrs.xaxisnamealpha,axisNameFontAlpha:chartAttrs.xaxisnamefontalpha,axisNameBgAlpha:chartAttrs.xaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.xaxisnameborderalpha,axisNameBorderPadding:chartAttrs.xaxisnameborderpadding,axisNameBorderRadius:chartAttrs.xaxisnameborderradius,axisNameBorderThickness:chartAttrs.xaxisnameborderthickness,axisNameBorderDashed:chartAttrs.xaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.xaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.xaxisnameborderdashgap,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,divLineColor:pluck(chartAttrs.vdivlinecolor,chartAttrs.divlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.vdivlinealpha,chartAttrs.divlinealpha,is3D?colorM.getColor(divLineAlpha3DStr):colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.vdivlinethickness,chartAttrs.divlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.vdivlinedashed,chartAttrs.vdivlineisdashed,chartAttrs.divlinedashed,chartAttrs.divlineisdashed,0)),divLineDashLen:pluckNumber(chartAttrs.vdivlinedashlen,chartAttrs.divlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.vdivlinedashgap,chartAttrs.divlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatevgridcolor,0),alternateGridColor:pluck(chartAttrs.alternatevgridcolor,colorM.getColor(altVGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatevgridalpha,colorM.getColor(altVGridAlphaStr)),numDivLines:chartAttrs.numvdivlines,labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,labelBdrColor:chartAttrs.labelbordercolor,labelBdrAlpha:chartAttrs.labelborderalpha,labelLink:chartAttrs.labellink,labelBgAlpha:chartAttrs.labelbgalpha,labelBgColor:chartAttrs.labelbgcolor,labelBdrThickness:chartAttrs.labelborderthickness,labelBdrPadding:chartAttrs.labelborderpadding,labelBdrRadius:chartAttrs.labelborderradius,labelBdrDashed:chartAttrs.labelborderdashed,labelBdrDashLen:chartAttrs.labelborderdashlen,labelBdrDashGap:chartAttrs.labelborderdashgap,axisName:chartAttrs.xaxisname,axisMinValue:chartAttrs.xaxisminvalue,axisMaxValue:chartAttrs.xaxismaxvalue,setAdaptiveMin:chartAttrs.setadaptivexmin,adjustDiv:chartAttrs.adjustvdiv,labelDisplay:chartAttrs.labeldisplay,showLabels:chartAttrs.showlabels,rotateLabels:chartAttrs.rotatelabels,slantLabel:pluckNumber(chartAttrs.slantlabels,chartAttrs.slantlabel),labelStep:pluckNumber(chartAttrs.labelstep,chartAttrs.xaxisvaluesstep),showAxisValues:pluckNumber(chartAttrs.showxaxisvalues,chartAttrs.showxaxisvalue),showLimits:chartAttrs.showvlimits,showDivLineValues:pluckNumber(chartAttrs.showvdivlinevalues,chartAttrs.showvdivlinevalues),showZeroPlane:chartAttrs.showvzeroplane,zeroPlaneColor:chartAttrs.vzeroplanecolor,zeroPlaneThickness:chartAttrs.vzeroplanethickness,zeroPlaneAlpha:chartAttrs.vzeroplanealpha,showZeroPlaneValue:chartAttrs.showvzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showxaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.xaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.xaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.xaxislinecolor,chartAttrs.axislinecolor,COLOR_000000),freezeLimit:true};xAxisConf.vtrendlines=dataObj.vtrendlines;xAxisConfigure.push(xAxisConf);yAxisConf={isVertical:true,isReverse:true,isOpposit:isEqualString(chartAttrs.yaxisposition,"left"),drawLabelsOpposit:1,axisNameAlignCanvas:1,outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.yaxisnamepadding,axisValuePadding:chartAttrs.yaxisvaluespadding,axisNameFont:chartAttrs.pyaxisnamefont,axisNameFontSize:chartAttrs.pyaxisnamefontsize,axisNameFontColor:chartAttrs.pyaxisnamefontcolor,axisNameFontBold:chartAttrs.pyaxisnamefontbold,axisNameFontItalic:chartAttrs.pyaxisnamefontitalic,axisNameBgColor:chartAttrs.pyaxisnamebgcolor,axisNameBorderColor:chartAttrs.pyaxisnamebordercolor,axisNameAlpha:chartAttrs.pyaxisnamealpha,axisNameFontAlpha:chartAttrs.pyaxisnamefontalpha,axisNameBgAlpha:chartAttrs.pyaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.pyaxisnameborderalpha,axisNameBorderPadding:chartAttrs.pyaxisnameborderpadding,axisNameBorderRadius:chartAttrs.pyaxisnameborderradius,axisNameBorderThickness:chartAttrs.pyaxisnameborderthickness,axisNameBorderDashed:chartAttrs.pyaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.pyaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.pyaxisnameborderdashgap,axisNameWidth:chartAttrs.yaxisnamewidth,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,rotateAxisName:pluckNumber(chartAttrs.rotateyaxisname,1),axisName:chartAttrs.pyaxisname,divLineColor:pluck(chartAttrs.divlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.divlinealpha,colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.divlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.divlinedashed,chartAttrs.divlineisdashed,1)),divLineDashLen:pluckNumber(chartAttrs.divlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.divlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatehgridcolor,1),alternateGridColor:pluck(chartAttrs.alternatehgridcolor,colorM.getColor(altHGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatehgridalpha,colorM.getColor(altHGridAlphaStr)),numDivLines:pluckNumber(chartAttrs.numpdivlines,5),axisMinValue:chartAttrs.pyaxisminvalue,axisMaxValue:chartAttrs.pyaxismaxvalue,setAdaptiveMin:pluckNumber(chartAttrs.setadaptiveymin,1),adjustDiv:chartAttrs.adjustdiv,labelStep:chartAttrs.yaxisvaluesstep,showAxisValues:pluckNumber(chartAttrs.showyaxisvalues,chartAttrs.showyaxisvalue),showLimits:pluckNumber(chartAttrs.showyaxislimits,chartAttrs.showlimits,iapi.showLimits),showDivLineValues:pluckNumber(chartAttrs.showdivlinevalues,chartAttrs.showdivlinevalue),showZeroPlane:chartAttrs.showzeroplane,zeroPlaneColor:chartAttrs.zeroplanecolor,zeroPlaneThickness:chartAttrs.zeroplanethickness,zeroPlaneAlpha:chartAttrs.zeroplanealpha,showZeroPlaneValue:chartAttrs.showzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showyaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.yaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.yaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.yaxislinecolor,chartAttrs.axislinecolor,COLOR_000000),labelFont:chartAttrs.yaxisvaluefont,labelFontSize:chartAttrs.yaxisvaluefontsize,labelFontColor:chartAttrs.yaxisvaluefontcolor,labelAlpha:chartAttrs.yaxisvaluealpha,labelFontBold:chartAttrs.yaxisvaluefontbold,labelFontItalic:chartAttrs.yaxisvaluefontitalic,labelBdrColor:chartAttrs.yaxisvaluebordercolor,labelBgAlpha:chartAttrs.yaxisvaluebgalpha,labelBdrAlpha:chartAttrs.yaxisvalueborderalpha,labelLink:chartAttrs.yaxisvaluelink,labelBgColor:chartAttrs.yaxisvaluebgcolor,labelBdrThickness:chartAttrs.yaxisvalueborderthickness,labelBdrPadding:chartAttrs.yaxisvalueborderpadding,labelBdrRadius:chartAttrs.yaxisvalueborderradius,labelBdrDashed:chartAttrs.yaxisvalueborderdashed,labelBdrDashLen:chartAttrs.yaxisvalueborderdashlen,labelBdrDashGap:chartAttrs.yaxisvalueborderdashgap};yAxisConf.trendlines=dataObj.trendlines;yAxisConfigure.push(yAxisConf);if(iapi.config.showVolumeChart){vYAxisConf={isVertical:true,isReverse:true,isOpposit:isEqualString(chartAttrs.yaxisposition,"left"),axisIndex:1,drawLabelsOpposit:1,axisNameAlignCanvas:1,uniqueClassName:1,outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.yaxisnamepadding,axisValuePadding:chartAttrs.yaxisvaluespadding,axisNameFont:chartAttrs.vyaxisnamefont,axisNameFontSize:chartAttrs.vyaxisnamefontsize,axisNameFontColor:chartAttrs.vyaxisnamefontcolor,axisNameFontBold:chartAttrs.vyaxisnamefontbold,axisNameFontItalic:chartAttrs.vyaxisnamefontitalic,axisNameBgColor:chartAttrs.vyaxisnamebgcolor,axisNameBorderColor:chartAttrs.vyaxisnamebordercolor,axisNameAlpha:chartAttrs.vyaxisnamealpha,axisNameFontAlpha:chartAttrs.vyaxisnamefontalpha,axisNameBgAlpha:chartAttrs.vyaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.vyaxisnameborderalpha,axisNameBorderPadding:chartAttrs.vyaxisnameborderpadding,axisNameBorderRadius:chartAttrs.vyaxisnameborderradius,axisNameBorderThickness:chartAttrs.vyaxisnameborderthickness,axisNameBorderDashed:chartAttrs.vyaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.vyaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.vyaxisnameborderdashgap,axisNameWidth:chartAttrs.yaxisnamewidth,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,rotateAxisName:pluckNumber(chartAttrs.rotateyaxisname,1),axisName:chartAttrs.vyaxisname,divLineColor:pluck(chartAttrs.divlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.divlinealpha,colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.divlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.divlinedashed,chartAttrs.divlineisdashed,1)),divLineDashLen:pluckNumber(chartAttrs.divlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.divlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatehgridcolor,1),alternateGridColor:pluck(chartAttrs.alternatehgridcolor,colorM.getColor(altHGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatehgridalpha,colorM.getColor(altHGridAlphaStr)),numDivLines:chartAttrs.numdivlines,axisMinValue:chartAttrs.vyaxisminvalue,axisMaxValue:chartAttrs.vyaxismaxvalue,setAdaptiveMin:chartAttrs.setadaptiveymin,adjustDiv:chartAttrs.adjustdiv,labelStep:chartAttrs.yaxisvaluesstep,showAxisValues:pluckNumber(chartAttrs.showyaxisvalues,chartAttrs.showyaxisvalue),showLimits:pluckNumber(chartAttrs.showsecondarylimits,chartAttrs.showlimits),showDivLineValues:pluckNumber(chartAttrs.showdivlinevalues,chartAttrs.showdivlinevalue),showZeroPlane:chartAttrs.showzeroplane,zeroPlaneColor:chartAttrs.zeroplanecolor,zeroPlaneThickness:chartAttrs.zeroplanethickness,zeroPlaneAlpha:chartAttrs.zeroplanealpha,showZeroPlaneValue:chartAttrs.showzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showyaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.yaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.yaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.yaxislinecolor,chartAttrs.axislinecolor,COLOR_000000),labelFont:chartAttrs.yaxisvaluefont,labelFontSize:chartAttrs.yaxisvaluefontsize,labelFontColor:chartAttrs.yaxisvaluefontcolor,labelAlpha:chartAttrs.yaxisvaluealpha,labelFontBold:chartAttrs.yaxisvaluefontbold,labelFontItalic:chartAttrs.yaxisvaluefontitalic,labelBdrColor:chartAttrs.yaxisvaluebordercolor,labelBgAlpha:chartAttrs.yaxisvaluebgalpha,labelBdrAlpha:chartAttrs.yaxisvalueborderalpha,labelLink:chartAttrs.yaxisvaluelink,labelBgColor:chartAttrs.yaxisvaluebgcolor,labelBdrThickness:chartAttrs.yaxisvalueborderthickness,labelBdrPadding:chartAttrs.yaxisvalueborderpadding,labelBdrRadius:chartAttrs.yaxisvalueborderradius,labelBdrDashed:chartAttrs.yaxisvalueborderdashed,labelBdrDashLen:chartAttrs.yaxisvalueborderdashlen,labelBdrDashGap:chartAttrs.yaxisvalueborderdashgap};yAxisConfigure.push(vYAxisConf)}return{xAxisConfigure:xAxisConfigure,yAxisConfigure:yAxisConfigure}};_proto.mouseoutHandler=function mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex){var chart=this,datasets=chart.config.datasetOrder||chart.getDatasets(),mouseTracker=chart.getChildren("mouseTracker")[0];if(datasets[_lastDatasetIndex]&&datasets[_lastDatasetIndex].components.data[_lastPointIndex]){datasets[_lastDatasetIndex]._firePlotEvent(MOUSEOUT,_lastPointIndex,e)}else{chart.getFromEnv("toolTipController").hideAll()}delete mouseTracker._lastDatasetIndex;delete mouseTracker._lastPointIndex};_proto._mouseEvtHandler=function _mouseEvtHandler(e,data){var iapi=this,mouseTracker=data.mouseTracker,oriEvent=e.originalEvent,canvasLen=iapi.getChildren("canvas").length,datasets,coordinate=oriEvent&&getMouseCoordinate(iapi.getFromEnv("chart-container"),oriEvent,iapi),chartX=coordinate&&coordinate.chartX||0,chartY=coordinate&&coordinate.chartY||0,dataset,hoveredInfo,pointFound=false,i,j,l,derivedEvensInfo,_lastDatasetIndex=mouseTracker._lastDatasetIndex,_lastPointIndex=mouseTracker._lastPointIndex;for(i=0;i<canvasLen;i++){datasets=iapi.getDatasets();j=datasets.length;while(j--&&!pointFound){dataset=datasets[j];if(dataset&&dataset.getState("visible")){hoveredInfo=dataset._getHoveredPlot&&dataset._getHoveredPlot(chartX,chartY);if(hoveredInfo&&hoveredInfo.hovered){pointFound=true;hoveredInfo.datasetIndex=j;derivedEvensInfo=mouseTracker.getMouseEvents(e,hoveredInfo.datasetIndex,hoveredInfo.pointIndex)}}}}if((!pointFound||derivedEvensInfo&&derivedEvensInfo.fireOut)&&typeof _lastDatasetIndex!=="undefined"){if(datasets[_lastDatasetIndex]&&datasets[_lastDatasetIndex]._firePlotEvent){if(derivedEvensInfo&&!derivedEvensInfo.events.length){mouseTracker.mouseoutTimer=setTimeout((function(){iapi.mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex)}),20)}else{iapi.mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex);clearTimeout(mouseTracker.mouseoutTimer)}}}if(pointFound){l=derivedEvensInfo.events&&derivedEvensInfo.events.length;if(l){mouseTracker._lastDatasetIndex=hoveredInfo.datasetIndex;_lastPointIndex=mouseTracker._lastPointIndex=hoveredInfo.pointIndex}for(j=0;j<l;j+=1){dataset&&dataset._firePlotEvent&&dataset._firePlotEvent(derivedEvensInfo.events[j],_lastPointIndex,e,hoveredInfo.datasetIndex)}}};_proto._allocateSpace=function _allocateSpace(dimensions){var iapi=this,canvas=iapi.getChildren("canvas"),canvasConfig=canvas&&canvas[0].config,config=iapi.config,canvasHeight=config.canvasHeight,canvasWidth=config.canvasWidth,canvasTop,canvasLeft;canvasLeft=config.canvasLeft+=dimensions.left||0;canvasTop=config.canvasTop+=dimensions.top||0;canvasWidth=config.canvasWidth=mathMax(canvasWidth-((dimensions.left||0)+(dimensions.right||0)),0);canvasHeight=config.canvasHeight=mathMax(canvasHeight-((dimensions.top||0)+(dimensions.bottom||0)),0);config.availableHeight=mathMax(config.availableHeight-((dimensions.top||0)+(dimensions.bottom||0)),0);config.availableWidth=mathMax(config.availableWidth-((dimensions.left||0)+(dimensions.right||0)),0);config.canvasRight=canvasLeft+canvasWidth;config.canvasBottom=canvasTop+canvasHeight;if(canvasConfig){canvasConfig.canvasPaddingLeft=mathMax(canvasConfig.canvasPaddingLeft,dimensions.paddingLeft||0);canvasConfig.canvasPaddingRight=mathMax(canvasConfig.canvasPaddingRight,dimensions.paddingRight||0);canvasConfig.canvasPaddingTop=mathMax(canvasConfig.canvasPaddingTop,dimensions.paddingTop||0);canvasConfig.canvasPaddingBottom=mathMax(canvasConfig.canvasPaddingBottom,dimensions.paddingBottom||0)}};_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){var datasetsJSON=this.getFromEnv("dataSource").dataset,data=datasetsJSON&&datasetsJSON[0]&&datasetsJSON[0].data;if(!datasetsJSON||!data||!Array.isArray(data)){return true}};return CandleStick}(MSCartesian);export default CandleStick;