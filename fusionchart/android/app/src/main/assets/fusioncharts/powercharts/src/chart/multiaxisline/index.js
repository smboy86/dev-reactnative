import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import AreaBase from"@fusioncharts/charts/src/chart/_internal/areabase";import axisFactory from"../../factories/multiaxis-axis";import vCanvasFactory from"../../factories/multiaxis-vcanvas";import datasetFactory from"../../factories/multiaxis-dataset";import{getDep}from"@fusioncharts/core/src/dependency-manager";import raphaelShapesButton from"@fusioncharts/core/src/_internal/redraphael/redraphael-shapes/redraphael-shapes.button";import{pluckNumber,extend2,pluck,pluckFontSize,chartPaletteStr,preDefStr}from"@fusioncharts/core/src/lib";import isEqualString from"@fusioncharts/utils/src/string/equal";var MULTIAXISLINE="multiaxisline";var defaultFontStr=preDefStr.defaultFontStr,divLineAlphaStr=preDefStr.divLineAlphaStr,altVGridColorStr=preDefStr.altVGridColorStr,altVGridAlphaStr=preDefStr.altVGridAlphaStr,COLOR_000000=preDefStr.colors.c000000,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,divLineAlpha3DStr=preDefStr.divLineAlpha3DStr,Raphael=getDep("redraphael","plugin");raphaelShapesButton(Raphael);var MultiAxisLine=function(_AreaBase){_inheritsLoose(MultiAxisLine,_AreaBase);MultiAxisLine.getName=function getName(){return"MultiAxisLine"};function MultiAxisLine(){var _this;_this=_AreaBase.call(this)||this;var iapi=_assertThisInitialized(_this);iapi.defaultPlotShadow=1;iapi.axisPaddingLeft=0;iapi.axisPaddingRight=0;_this.registerFactory("axis",axisFactory,["canvas"]);_this.registerFactory("vCanvas",vCanvasFactory,["axis"]);_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=MultiAxisLine.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_AreaBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.defaultDatasetType=MULTIAXISLINE;config.defaultcrosslinethickness=1};_proto.getName=function getName(){return"MultiAxisLine"};_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){var jsonData=this.getFromEnv("dataSource");if(!jsonData.axis||!jsonData.categories){return true}};_proto._feedAxesRawData=function _feedAxesRawData(){var iapi=this,chartConfig=iapi.config,colorM=iapi.getFromEnv("color-manager"),numberFormatter=iapi.getFromEnv("number-formatter"),dataObj=iapi.getFromEnv("dataSource"),chartAttrs=dataObj.chart,xAxisConf,yAxisConf,is3D=iapi.config.is3D,palleteString=is3D?chartPaletteStr.chart3D:chartPaletteStr.chart2D,axes,i,len,isOpposit,axisJson,plotColor,leftAxes,rightAxes,axisHEXColor,gridLineWidth,tickWidth,axisLineThickness,yAxisConfigure=[],setAxisConfig={},xAxisConfigure=[],j,jlen;xAxisConf={isVertical:false,isReverse:false,isOpposit:isEqualString(chartAttrs.xaxisposition,"top"),outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#? ([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.xaxisnamepadding,axisValuePadding:chartAttrs.labelpadding,axisNameFont:chartAttrs.xaxisnamefont,axisNameFontSize:chartAttrs.xaxisnamefontsize,axisNameFontColor:chartAttrs.xaxisnamefontcolor,axisNameFontBold:chartAttrs.xaxisnamefontbold,axisNameFontItalic:chartAttrs.xaxisnamefontitalic,axisNameBgColor:chartAttrs.xaxisnamebgcolor,axisNameBorderColor:chartAttrs.xaxisnamebordercolor,axisNameAlpha:chartAttrs.xaxisnamealpha,axisNameFontAlpha:chartAttrs.xaxisnamefontalpha,axisNameBgAlpha:chartAttrs.xaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.xaxisnameborderalpha,axisNameBorderPadding:chartAttrs.xaxisnameborderpadding,axisNameBorderRadius:chartAttrs.xaxisnameborderradius,axisNameBorderThickness:chartAttrs.xaxisnameborderthickness,axisNameBorderDashed:chartAttrs.xaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.xaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.xaxisnameborderdashgap,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,divLineColor:pluck(chartAttrs.vdivlinecolor,chartAttrs.divlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.vdivlinealpha,chartAttrs.divlinealpha,is3D?colorM.getColor(divLineAlpha3DStr):colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.vdivlinethickness,chartAttrs.divlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.vdivlinedashed,chartAttrs.vdivlineisdashed,chartAttrs.divlinedashed,chartAttrs.divlineisdashed,0)),divLineDashLen:pluckNumber(chartAttrs.vdivlinedashlen,chartAttrs.divlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.vdivlinedashgap,chartAttrs.divlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatevgridcolor,0),alternateGridColor:pluck(chartAttrs.alternatevgridcolor,colorM.getColor(altVGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatevgridalpha,colorM.getColor(altVGridAlphaStr)),numDivLines:chartAttrs.numvdivlines,labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,labelBdrColor:chartAttrs.labelbordercolor,labelBdrAlpha:chartAttrs.labelborderalpha,labelLink:chartAttrs.labellink,labelBgColor:chartAttrs.labelbgcolor,labelBgAlpha:chartAttrs.labelbgalpha,labelBdrThickness:chartAttrs.labelborderthickness,labelBdrPadding:chartAttrs.labelborderpadding,labelBdrRadius:chartAttrs.labelborderradius,labelBdrDashed:chartAttrs.labelborderdashed,labelBdrDashLen:chartAttrs.labelborderdashlen,labelBdrDashGap:chartAttrs.labelborderdashgap,maxLabelHeight:chartAttrs.maxlabelheight,axisName:chartAttrs.xaxisname,axisMinValue:chartAttrs.xaxisminvalue,axisMaxValue:chartAttrs.xaxismaxvalue,setAdaptiveMin:chartAttrs.setadaptivexmin,adjustDiv:chartAttrs.adjustvdiv,labelDisplay:chartAttrs.labeldisplay,showLabels:chartAttrs.showlabels,rotateLabels:chartAttrs.rotatelabels,slantLabel:pluckNumber(chartAttrs.slantlabels,chartAttrs.slantlabel),labelStep:pluckNumber(chartAttrs.labelstep,chartAttrs.xaxisvaluesstep),showAxisValues:pluckNumber(chartAttrs.showxaxisvalues,chartAttrs.showxaxisvalue),showLimits:chartAttrs.showvlimits,showDivLineValues:pluckNumber(chartAttrs.showvdivlinevalues,chartAttrs.showvdivlinevalues),showZeroPlane:chartAttrs.showvzeroplane,zeroPlaneColor:chartAttrs.vzeroplanecolor,zeroPlaneThickness:chartAttrs.vzeroplanethickness,zeroPlaneAlpha:chartAttrs.vzeroplanealpha,showZeroPlaneValue:chartAttrs.showvzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showxaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.xaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.xaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.xaxislinecolor,chartAttrs.axislinecolor,COLOR_000000)};xAxisConfigure.push(xAxisConf);yAxisConf={outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#? ([a-f0-9]+)/gi,"#$1"),useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,showAlternateGridColor:0,axisNameFont:chartAttrs.yaxisnamefont,axisNameFontSize:chartAttrs.yaxisnamefontsize,axisNameFontColor:chartAttrs.yaxisnamefontcolor,axisNameFontBold:chartAttrs.yaxisnamefontbold,axisNameFontItalic:chartAttrs.yaxisnamefontitalic,axisNameBgColor:chartAttrs.yaxisnamebgcolor,axisNameBorderColor:chartAttrs.yaxisnamebordercolor,axisNameAlpha:chartAttrs.yaxisnamealpha,axisNameFontAlpha:chartAttrs.yaxisnamefontalpha,axisNameBgAlpha:chartAttrs.yaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.yaxisnameborderalpha,axisNameBorderPadding:chartAttrs.yaxisnameborderpadding,axisNameBorderRadius:chartAttrs.yaxisnameborderradius,axisNameBorderThickness:chartAttrs.yaxisnameborderthickness,axisNameBorderDashed:chartAttrs.yaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.yaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.yaxisnameborderdashgap,labelFont:chartAttrs.yaxisvaluefont,labelFontSize:chartAttrs.yaxisvaluefontsize,labelFontColor:chartAttrs.yaxisvaluefontcolor,labelAlpha:chartAttrs.yaxisvaluealpha,labelFontBold:chartAttrs.yaxisvaluefontbold,labelFontItalic:chartAttrs.yaxisvaluefontitalic,labelBdrColor:chartAttrs.yaxisvaluebordercolor,labelBdrAlpha:chartAttrs.yaxisvalueborderalpha,labelLink:chartAttrs.yaxisvaluelink,labelBgColor:chartAttrs.yaxisvaluebgcolor,labelBgAlpha:chartAttrs.yaxisvaluebgalpha,labelBdrThickness:chartAttrs.yaxisvalueborderthickness,labelBdrPadding:chartAttrs.yaxisvalueborderpadding,labelBdrRadius:chartAttrs.yaxisvalueborderradius,labelBdrDashed:chartAttrs.yaxisvalueborderdashed,labelBdrDashLen:chartAttrs.yaxisvalueborderdashlen,labelBdrDashGap:chartAttrs.yaxisvalueborderdashgap};leftAxes={side:"l",axesConf:[]};rightAxes={side:"r",axesConf:[]};axes=dataObj.axis||[];for(i=0,len=axes.length;i<len;i++){setAxisConfig={};axisJson=axes[i];setAxisConfig.checkBoxChecked=false;for(j=0,jlen=axisJson.dataset?axisJson.dataset.length:0;j<jlen;j+=1){if(Number(axisJson.dataset[j].visible)!==0){setAxisConfig.checkBoxChecked=true}}plotColor=colorM.getPlotColor(i);axisHEXColor=pluck(axisJson.color,chartAttrs.axiscolor,plotColor);gridLineWidth=pluckNumber(axisJson.divlinethickness,chartAttrs.divlinethickness,1);tickWidth=pluckNumber(axisJson.tickwidth,chartAttrs.axistickwidth,2);axisLineThickness=pluckNumber(axisJson.axislinethickness,chartAttrs.axislinethickness,2);isOpposit=!pluckNumber(axisJson.axisonleft,1);yAxisConf.isVertical=true;yAxisConf.isReverse=true;yAxisConf.isOpposit=isOpposit;yAxisConf.labelStep=pluckNumber(axisJson.yaxisvaluesstep,axisJson.yaxisvaluestep,chartAttrs.yaxisvaluesstep,chartAttrs.yaxisvaluestep);yAxisConf.axisMaxValue=axisJson.maxvalue;yAxisConf.axisMinValue=axisJson.minvalue;yAxisConf.setAdaptiveMin=pluckNumber(axisJson.setadaptiveymin,chartAttrs.setadaptiveymin);yAxisConf.numDivLines=pluckNumber(axisJson.numdivlines,chartAttrs.numdivlines,4);yAxisConf.adjustDiv=pluckNumber(axisJson.adjustdiv,chartAttrs.adjustdiv);yAxisConf.showAxisValues=pluckNumber(axisJson.showyaxisvalues,axisJson.showyaxisvalue,chartAttrs.showyaxisvalues,chartAttrs.showyaxisvalue,1);yAxisConf.showLimits=pluckNumber(axisJson.showlimits,chartAttrs.showyaxislimits,chartAttrs.showlimits,yAxisConf.showAxisValues);yAxisConf.showDivLineValues=pluckNumber(axisJson.showdivlinevalue,chartAttrs.showdivlinevalues,axisJson.showdivlinevalues,yAxisConf.showAxisValues);yAxisConf.showZeroPlane=pluckNumber(axisJson.showzeroplane,chartAttrs.showzeroplane);yAxisConf.showZeroPlaneValue=pluckNumber(axisJson.showzeroplanevalue,chartAttrs.showzeroplanevalue);yAxisConf.zeroPlaneColor=axisJson.zeroplanecolor;yAxisConf.zeroPlaneThickness=pluckNumber(axisJson.zeroplanethickness,axisJson.divlinethickness,chartConfig.zeroplanethickness,2);yAxisConf.zeroPlaneAlpha=pluckNumber(axisJson.zeroplanealpha,axisJson.divlinealpha,chartConfig.zeroplanealpha);yAxisConf.showZeroPlaneOnTop=chartConfig.showzeroplaneontop;yAxisConf.divLineColor=pluck(axisJson.divlinecolor,axisHEXColor);yAxisConf.divLineAlpha=pluckNumber(axisJson.divlinealpha,chartAttrs.divlinealpha,colorM.getColor(divLineAlphaStr),100);yAxisConf.divLineThickness=gridLineWidth;yAxisConf.divLineIsDashed=Boolean(pluckNumber(axisJson.divlinedashed,axisJson.divlineisdashed,chartAttrs.divlinedashed,chartAttrs.divlineisdashed,0));yAxisConf.divLineDashLen=pluckNumber(axisJson.divlinedashlen,chartAttrs.divlinedashlen,4);yAxisConf.divLineDashGap=pluckNumber(axisJson.divlinedashgap,chartAttrs.divlinedashgap,2);yAxisConf.showAxisLine=1;yAxisConf.axisLineThickness=axisLineThickness;yAxisConf.axisLineAlpha=100;yAxisConf.axisLineColor=axisHEXColor;yAxisConf.tickLength=tickWidth;yAxisConf.tickColor=axisHEXColor;yAxisConf.tickAlpha=100;yAxisConf.tickWidth=axisLineThickness;yAxisConf.axisName=axisJson.title;yAxisConf.rotateAxisName=1;yAxisConf.axisNameAlignCanvas=true;yAxisConf.drawAxisNameFromBottom=true;extend2(setAxisConfig,yAxisConf);numberFormatter.parseMLAxisConf(axisJson,i);if(pluckNumber(axisJson.showaxis)===0){extend2(setAxisConfig,{axisIndex:i,drawAxisLineWRTCanvas:false,drawLabels:false,drawPlotlines:false,drawAxisLine:false,drawPlotBands:false,drawAxisName:false,drawTrendLines:false,drawTrendLabels:false,drawTick:false,drawTickMinor:false,showAxis:0})}else{extend2(setAxisConfig,{axisIndex:i,drawAxisLineWRTCanvas:false,drawLabels:true,drawPlotlines:true,drawAxisLine:true,drawPlotBands:true,drawAxisName:true,drawTrendLines:true,drawTrendLabels:true,drawTick:true,drawTickMinor:true,showAxis:1})}if(isOpposit){rightAxes.axesConf.push(setAxisConfig)}else{leftAxes.axesConf.push(setAxisConfig)}}leftAxes.axesConf.length&&yAxisConfigure.push(leftAxes);rightAxes.axesConf.length&&yAxisConfigure.push(rightAxes);return{xAxisConfigure:xAxisConfigure,yAxisConfigure:yAxisConfigure}};_proto._postSpaceManagement=function _postSpaceManagement(){var iapi=this,legend=iapi.getFromEnv("legend");iapi.setAxisDimention();iapi.getChildren("yAxisSelectorUI").forEach((function(comp){comp.setAxisDimention()}));iapi.getChildren("canvas")[0].setCanvasPadding();iapi.setAxisDimention();iapi.config.showLegend&&legend.postSpaceManager();iapi.allocateDimensionOfChartMenuBar()};_proto.setAxisDimention=function setAxisDimention(){var iapi=this,config=iapi.config,xAxis=iapi.getChildren("xAxis")[0],xDepth=config.xDepth||0,canvasConfig=iapi.getChildren("canvas")[0].config,canvasBorderWidth=canvasConfig.canvasBorderWidth,canvasPadding=canvasConfig.canvasPadding,canvasPaddingLeft=canvasConfig.canvasPaddingLeft,shift=config.shift||0,canvasPaddingRight=canvasConfig.canvasPaddingRight;xAxis&&xAxis.setAxisDimention({x:config.canvasLeft+xDepth+Math.max(canvasPaddingLeft,canvasPadding),y:xAxis.config.isOpposit?config.canvasTop-canvasBorderWidth:config.canvasBottom+shift+canvasBorderWidth,opposite:xAxis.config.isOpposit?config.canvasBottom+shift+canvasBorderWidth:config.canvasTop-canvasBorderWidth,axisLength:config.canvasWidth-xDepth-Math.max(canvasPaddingLeft,canvasPadding)-Math.max(canvasPaddingRight,canvasPadding)})};_proto._spaceManager=function _spaceManager(){var spaceForActionBar,actionBarSpace,availableWidth,availableHeight,iapi=this,canvas=iapi.getChildren("canvas")[0],config=iapi.config,legendPosition=config.legendPosition,xAxis=iapi.getChildren("xAxis"),axisSelectorUI=iapi.getChildren("yAxisSelectorUI"),yDepth=config.yDepth,legend=iapi.getFromEnv("legend"),rightPadding=0,leftPadding=0,length=axisSelectorUI.length||0,i,yAxisSpaceUsed,allotedSpace,chartAttrs=iapi.getFromEnv("dataSource").chart,showBorder=pluckNumber(chartAttrs.showborder,iapi.config.is3D?0:1),canvasBorderWidth=canvas.config.canvasBorderWidth,chartBorderWidth=config.borderWidth=showBorder?pluckNumber(chartAttrs.borderthickness,1):0,canvasMarginTop=config.canvasMarginTop,canvasMarginBottom=config.canvasMarginBottom,canvasMarginLeft=config.canvasMarginLeft,canvasMarginRight=config.canvasMarginRight,minCanvasHeight=config.minCanvasHeight,minCanvasWidth=config.minCanvasWidth,height=config.height,width=config.width,diff,heightAdjust=false,widthAdjust=false,top,bottom,left,right,currentCanvasHeight,currentCanvasWidth,origCanvasTopMargin=config.origCanvasTopMargin,origCanvasBottomMargin=config.origCanvasBottomMargin,origCanvasLeftMargin=config.origCanvasLeftMargin,origCanvasRightMargin=config.origCanvasRightMargin,sum;iapi._allocateSpace({top:chartBorderWidth,bottom:chartBorderWidth,left:chartBorderWidth,right:chartBorderWidth});iapi._allocateSpace({left:config.canvasMarginLeft,right:config.canvasMarginRight});if(legendPosition==="right"){allotedSpace=config.canvasWidth*.3}else{allotedSpace=config.canvasHeight*.3}config.hasLegend!==false&&xAxis&&config.showLegend&&iapi._allocateSpace(legend._manageLegendPosition(allotedSpace));for(i=0;i<length;i++){yAxisSpaceUsed=axisSelectorUI[i].placeAxis(config.canvasWidth);rightPadding+=yAxisSpaceUsed.rightPadding;leftPadding+=yAxisSpaceUsed.leftPadding;iapi._allocateSpace(yAxisSpaceUsed.dimension)}spaceForActionBar=config.availableHeight*.225;actionBarSpace=iapi._manageActionBarSpace&&iapi._manageActionBarSpace(spaceForActionBar)||{};iapi._allocateSpace(actionBarSpace);availableHeight=legendPosition===POSITION_BOTTOM?config.canvasHeight*.6:config.canvasWidth*.6;iapi._manageChartMenuBar(availableHeight);availableWidth=config.canvasWidth*.7;if(availableWidth>rightPadding+leftPadding){iapi._allocateSpace({left:leftPadding,right:rightPadding})}availableHeight=config.canvasHeight*.6;xAxis[0]&&iapi._allocateSpace(xAxis[0].placeAxis(availableHeight));availableHeight=config.canvasHeight*.325;iapi._getDSspace&&iapi._allocateSpace(iapi._getDSspace(availableHeight));if(yDepth){iapi._allocateSpace({bottom:yDepth})}iapi._allocateSpace({top:canvasBorderWidth,bottom:canvasBorderWidth,left:canvasBorderWidth,right:canvasBorderWidth});top=canvasMarginTop>config.canvasTop?canvasMarginTop-config.canvasTop:0;bottom=canvasMarginBottom>height-config.canvasBottom?canvasMarginBottom+config.canvasBottom-height:0;left=canvasMarginLeft>config.canvasLeft?canvasMarginLeft-config.canvasLeft:0;right=canvasMarginRight>width-config.canvasRight?canvasMarginRight+config.canvasRight-width:0;iapi._allocateSpace({top:top,bottom:bottom,left:left,right:right});if(heightAdjust){sum=origCanvasTopMargin+origCanvasBottomMargin;currentCanvasHeight=config.canvasHeight;if(currentCanvasHeight>minCanvasHeight){diff=currentCanvasHeight-minCanvasHeight;top=diff*origCanvasTopMargin/sum;bottom=diff*origCanvasBottomMargin/sum}iapi._allocateSpace({top:top,bottom:bottom})}if(widthAdjust){sum=origCanvasLeftMargin+origCanvasRightMargin;currentCanvasWidth=config.canvasWidth;if(currentCanvasWidth>minCanvasWidth){diff=currentCanvasWidth-minCanvasWidth;left=diff*origCanvasLeftMargin/sum;right=diff*origCanvasRightMargin/sum}iapi._allocateSpace({left:left,right:right})}config.actualCanvasMarginTop=top;config.actualCanvasMarginLeft=left;config.actualCanvasMarginRight=right;config.actualCanvasMarginBottom=bottom;canvas.setDimension({top:config.canvasTop,left:config.canvasLeft,width:config.canvasWidth,height:config.canvasHeight})};_proto.configure=function configure(dataObj){_AreaBase.prototype.configure.call(this,dataObj);var iapi=this,conf=iapi.config,chartAttr=iapi.getFromEnv("dataSource").chart;conf.axesPadding=5;conf.allowAxisShift=pluckNumber(chartAttr.allowaxisshift,1);conf.allowSelection=pluckNumber(chartAttr.allowselection,1);conf.checkBoxColor=pluck(chartAttr.checkboxcolor,"#2196f3");conf.axisConfigured=true};return MultiAxisLine}(AreaBase);export default MultiAxisLine;