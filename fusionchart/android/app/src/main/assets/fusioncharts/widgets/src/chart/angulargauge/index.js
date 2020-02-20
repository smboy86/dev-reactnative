import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{pluckNumber,pluck,componentFactory,defaultGaugePaletteOptions,getValidValue,chartPaletteStr,pluckFontSize,extend2}from"@fusioncharts/core/src/lib";import{_getData as _getData2,_setData as _setData2,_getDataForId as _getDataForId2,_setDataForId as _setDataForId2}from"../_internal/angular-hlinear-common";import ColorGradient from"@fusioncharts/core/src/color-utils/color-bucket";import Gauge from"../_internal/gauge";import scaleFactory from"../../factories/polar-gauge-axis";import datasetFactory from"../../factories/angular-gauge-dataset";var UNDEF,BLANK="",math=Math,mathMin=math.min,mathPI=math.PI,deg2rad=mathPI/180,defined=function defined(obj){return obj!==UNDEF&&obj!==null},FRIENDLY_NAME="Angular Gauge",ANG_GAUGE="angulargauge",EASE_OUT="easeOut";var AngularGauge=function(_Gauge){_inheritsLoose(AngularGauge,_Gauge);AngularGauge.getName=function getName(){return"AngularGauge"};function AngularGauge(){var _this;_this=_Gauge.call(this)||this;_this.isHorizontal=true;_this.isAxisOpposite=false;_this.isRealTime=true;_this.drawPlotlines=false;_this.drawPlotBands=false;_this.isAxisReverse=false;_this.colorRange=true;_this.defaultPaletteOptions=extend2(extend2({},defaultGaugePaletteOptions),{dialColor:["999999,ffffff,999999","ADB68F,F3F5DD,ADB68F","A2C4C8,EDFBFE,A2C4C8","FDB548,FFF5E8,FDB548","FF7CA0,FFD1DD,FF7CA0"],dialBorderColor:["999999","ADB68F","A2C4C8","FDB548","FF7CA0"],pivotColor:["999999,ffffff,999999","ADB68F,F3F5DD,ADB68F","A2C4C8,EDFBFE,A2C4C8","FDB548,FFF5E8,FDB548","FF7CA0,FFD1DD,FF7CA0"],pivotBorderColor:["999999","ADB68F","A2C4C8","FDB548","FF7CA0"]},false,true);_this.rtParserModify=true;_this._setCategories=function(){};_this.registerFactory("dataset",datasetFactory,["axis"]);_this.registerFactory("axis",scaleFactory,["canvas"]);return _this}var _proto=AngularGauge.prototype;_proto.getName=function getName(){return"AngularGauge"};_proto.__setDefaultConfig=function __setDefaultConfig(){_Gauge.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.hasLegend=false;config.defaultDatasetType=ANG_GAUGE;config.animationeffect=EASE_OUT;config.skipCanvasDrawing=true};_proto.configureAttributes=function configureAttributes(dataObj){_Gauge.prototype.configureAttributes.call(this,dataObj);var iapi=this,jsonData=iapi.getFromEnv("dataSource"),colorrange=jsonData.colorrange;if(colorrange&&colorrange.color&&colorrange.color.length){componentFactory(iapi,ColorGradient,"colorRange",1,[{colorRange:colorrange,numberFormatter:iapi.getFromEnv("number-formatter")}]);iapi.addToEnv("colorRange",iapi.getChildren("colorRange")[0])}else{iapi.deleteFromEnv("colorRange")}};_proto._spaceManager=function _spaceManager(){var iapi=this,availableWidth,availableHeight,config=iapi.config,dataSet=iapi.getChildren("dataset")[0],scale=iapi.getFromEnv("scale"),axisConfig=scale.config,dataObject=dataSet.components.data[0],chart=iapi,jsonData=chart.getFromEnv("dataSource"),chartAttrs=jsonData.chart,datasetConfig=dataSet.config,scaleFactor=datasetConfig.scaleFactor,yPosExtra=0,yNegExtra=0,radius=0,centerX=0,centerY=0,compositPivotRadius=datasetConfig.pivotRadius,displayValueLineHeight=config.dataLabels.style.lineHeight,displayValueCount=config.displayValueCount,chartBorderWidth=config.borderWidth,minChartWidth=config.minChartWidth,minChartHeight=config.minChartHeight,radiusDeduce=0,gaugeSpacingObj,innerRadiusFactor,pivotRadius,axisSpace,chartBorderHorizontal,chartBorderVertical;if(config.canvasWidth-2*chartBorderWidth<minChartWidth){chartBorderVertical=(config.canvasWidth-minChartWidth)/2}if(config.canvasHeight-2*chartBorderWidth<minChartHeight){chartBorderHorizontal=(config.canvasHeight-minChartHeight)/2}iapi._allocateSpace({top:chartBorderHorizontal||chartBorderWidth,bottom:chartBorderHorizontal||chartBorderWidth,left:chartBorderVertical||chartBorderWidth,right:chartBorderVertical||chartBorderWidth});if(config.autoScale){config.scaleFactor=scaleFactor=AngularGauge._getScaleFactor(datasetConfig.origW,datasetConfig.origH,config.width,config.height)}else{config.scaleFactor=scaleFactor=1}displayValueLineHeight=displayValueLineHeight.replace(/px/i,BLANK);if(/^\d+\%$/.test(datasetConfig.gaugeinnerradius)){innerRadiusFactor=parseInt(datasetConfig.gaugeinnerradius,10)/100}else{innerRadiusFactor=.7}pivotRadius=compositPivotRadius=pluckNumber(getValidValue(chartAttrs.pivotradius)*scaleFactor,5);datasetConfig.pivotRadius=pivotRadius;compositPivotRadius=Math.max(compositPivotRadius,datasetConfig.rearExtension*scaleFactor);if(dataObject&&dataObject.config&&dataObject.config.rearextension){compositPivotRadius=Math.max(compositPivotRadius,dataObject.config.rearextension*scaleFactor)}datasetConfig.compositPivotRadius=compositPivotRadius;yPosExtra=displayValueCount*displayValueLineHeight+2+pivotRadius;if(!datasetConfig.valueBelowPivot){yNegExtra=yPosExtra;yPosExtra=0}datasetConfig.gaugeOuterRadius=pluckNumber(Math.abs(getValidValue(chartAttrs.gaugeouterradius)*scaleFactor));datasetConfig.gaugeInnerRadius=pluckNumber(Math.abs(getValidValue(chartAttrs.gaugeinnerradius)*scaleFactor),datasetConfig.gaugeOuterRadius*innerRadiusFactor);availableWidth=config.canvasWidth*.7;availableHeight=config.canvasHeight*.7;axisSpace=scale.placeAxis(availableWidth);availableHeight=config.canvasHeight*.7;iapi._manageChartMenuBar(availableHeight);gaugeSpacingObj=AngularGauge._angularGaugeSpaceManager(datasetConfig.gaugeStartAngle,datasetConfig.gaugeEndAngle,config.canvasWidth,config.canvasHeight,datasetConfig.gaugeOuterRadius,pluckNumber(getValidValue(chartAttrs.gaugeoriginx)*scaleFactor-config.canvasLeft),pluckNumber(getValidValue(chartAttrs.gaugeoriginy)*scaleFactor-config.canvasTop),compositPivotRadius+axisConfig.polarPadding,yPosExtra,yNegExtra);radius=gaugeSpacingObj.radius=pluckNumber(gaugeSpacingObj.radius,gaugeSpacingObj.maxRadius);datasetConfig.gaugeOriginX=gaugeSpacingObj.centerX+config.canvasLeft;datasetConfig.gaugeOriginY=gaugeSpacingObj.centerY+config.canvasTop;centerX=gaugeSpacingObj.centerX;centerY=gaugeSpacingObj.centerY;if(axisSpace.left<axisSpace.top){if(centerX-axisSpace.left>=radius-axisSpace.left&&centerY-axisSpace.top>=radius-axisSpace.left){radiusDeduce=axisSpace.left}else{radiusDeduce=axisSpace.top}}else{if(centerX-axisSpace.left>=radius-axisSpace.top&&centerY-axisSpace.top>=radius-axisSpace.top){radiusDeduce=axisSpace.top}else{radiusDeduce=axisSpace.left}}radiusDeduce+=2*scale.config.polarPadding;!datasetConfig.gaugeOuterRadius&&(datasetConfig.gaugeOuterRadius=gaugeSpacingObj.radius-radiusDeduce);if(datasetConfig.gaugeInnerRadius===UNDEF){datasetConfig.gaugeInnerRadius=datasetConfig.gaugeOuterRadius*innerRadiusFactor}scale.setAxisConfig({centerX:datasetConfig.gaugeOriginX,centerY:datasetConfig.gaugeOriginY,radius:gaugeSpacingObj.radius||datasetConfig.gaugeOuterRadius,gaugeOuterRadius:datasetConfig.gaugeOuterRadius,gaugeInnerRadius:datasetConfig.gaugeInnerRadius,scaleFactor:scaleFactor})};_proto.allocatePosition=function allocatePosition(){var iapi=this,config=iapi.config,datasetConfig=iapi.getChildren("dataset")[0].config;config.gaugeStartX=config.canvasLeft;config.gaugeStartY=config.canvasTop;config.gaugeEndX=config.canvasRight;config.gaugeEndY=config.canvasBottom;config.gaugeCenterX=datasetConfig.gaugeOriginX;config.gaugeCenterY=datasetConfig.gaugeOriginY;config.gaugeStartAngle=datasetConfig.gaugeStartAngle/deg2rad;config.gaugeEndAngle=datasetConfig.gaugeEndAngle/deg2rad};_proto._feedAxesRawData=function _feedAxesRawData(){var iapi=this,colorM=iapi.getFromEnv("color-manager"),dataObj=iapi.getFromEnv("dataSource"),chartAttrs=dataObj.chart,scaleConf,numberFormatter=iapi.getFromEnv("number-formatter"),palleteString=chartPaletteStr.chart2D,isAxisOpposite=pluckNumber(chartAttrs.axisontop,chartAttrs.axisonleft,chartAttrs.ticksbelowgauge!==UNDEF?!chartAttrs.ticksbelowgauge:UNDEF,iapi.isAxisOpposite),isAxisReverse=pluckNumber(chartAttrs.reverseaxis,iapi.isAxisReverse);scaleConf={isVertical:!iapi.isHorizontal,isReverse:isAxisReverse,isOpposit:isAxisOpposite,outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,"Verdana,sans"),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,divLineColor:pluck(chartAttrs.vdivlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.vdivlinealpha,colorM.getColor("divLineAlpha")),divLineThickness:pluckNumber(chartAttrs.vdivlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.vdivlinedashed,chartAttrs.vdivlineisdashed,0)),divLineDashLen:pluckNumber(chartAttrs.vdivlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.vdivlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatevgridcolor,0),alternateGridColor:pluck(chartAttrs.alternatevgridcolor,colorM.getColor("altVGridColor")),alternateGridAlpha:pluck(chartAttrs.alternatevgridalpha,colorM.getColor("altVGridAlpha")),numDivLines:chartAttrs.numvdivlines,labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,axisName:chartAttrs.xaxisname,axisMinValue:numberFormatter.getCleanValue(chartAttrs.lowerlimit),axisMaxValue:numberFormatter.getCleanValue(chartAttrs.upperlimit),setAdaptiveMin:chartAttrs.setadaptivemin,adjustDiv:chartAttrs.adjusttm,labelDisplay:chartAttrs.labeldisplay,showLabels:chartAttrs.showlabels,rotateLabels:chartAttrs.rotatelabels,slantLabel:pluckNumber(chartAttrs.slantlabels,chartAttrs.slantlabel),labelStep:pluckNumber(chartAttrs.labelstep,chartAttrs.xaxisvaluesstep),showAxisValues:pluckNumber(chartAttrs.showxaxisvalues,chartAttrs.showxaxisvalue),showDivLineValues:pluckNumber(chartAttrs.showvdivlinevalues,chartAttrs.showvdivlinevalues),showZeroPlane:chartAttrs.showvzeroplane,zeroPlaneColor:chartAttrs.vzeroplanecolor,zeroPlaneThickness:chartAttrs.vzeroplanethickness,zeroPlaneAlpha:chartAttrs.vzeroplanealpha,showZeroPlaneValue:chartAttrs.showvzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showxaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.xaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.xaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.xaxislinecolor,chartAttrs.axislinecolor,"#000000"),majorTMNumber:chartAttrs.majortmnumber,majorTMColor:chartAttrs.majortmcolor,majorTMAlpha:chartAttrs.majortmalpha,majorTMHeight:chartAttrs.majortmheight,tickValueStep:chartAttrs.tickvaluestep,showTickMarks:chartAttrs.showtickmarks,connectTickMarks:chartAttrs.connecttickmarks,showTickValues:chartAttrs.showtickvalues,majorTMThickness:chartAttrs.majortmthickness,reverseScale:chartAttrs.reversescale,showLimits:chartAttrs.showlimits,minorTMNumber:chartAttrs.minortmnumber,minorTMColor:chartAttrs.minortmcolor,minorTMAlpha:chartAttrs.minortmalpha,minorTMHeight:pluckNumber(chartAttrs.minortmheight,chartAttrs.minortmwidth),minorTMThickness:chartAttrs.minortmthickness,tickMarkDistance:pluckNumber(chartAttrs.tickmarkdistance,chartAttrs.tickmarkgap),tickValueDistance:pluckNumber(chartAttrs.tickvaluedistance,chartAttrs.displayvaluedistance),placeTicksInside:chartAttrs.placeticksinside,placeValuesInside:chartAttrs.placevaluesinside,upperLimitDisplay:chartAttrs.upperlimitdisplay,lowerLimitDisplay:chartAttrs.lowerlimitdisplay,ticksBelowGauge:chartAttrs.ticksbelowgauge,ticksBelowGraph:chartAttrs.ticksbelowgraph,trendValueDistance:chartAttrs.trendvaluedistance};scaleConf.trendPoints=dataObj.trendpoints;return[scaleConf]};AngularGauge._angularGaugeSpaceManager=function _angularGaugeSpaceManager(startAngle,endAngle,canvasW,canvasH,radius,_centerX,_centerY,compositPivotRadius,yPostionExtra,yNegativeExtra){if(compositPivotRadius===void 0){compositPivotRadius=0}var rediusDefined=defined(radius),centerX=_centerX,centerY=_centerY,centerXDefined=defined(centerX),centerYDefined=defined(centerY),PI2=Math.PI*2,PI=Math.PI,PIby2=Math.PI/2,PI3by2=PI+PIby2,calculatedRadus,returnObj={radius:radius,centerX:centerX,centerY:centerY},yPosExtra=yPostionExtra,yNegExtra=yNegativeExtra,leftX,topY,rightX,bottomY,pivotCalRequard=false,startX,startY,endX,endY,tempRadius,resultantEnd,range,positiveLength,negativeLength,scale,startAbs=startAngle%PI2;if(startAbs<0){startAbs+=PI2}if(compositPivotRadius&&compositPivotRadius<canvasW/2&&compositPivotRadius<canvasH/2){pivotCalRequard=true}if(yPosExtra>canvasH/2){yPosExtra=canvasH/2}if(yNegExtra>canvasH/2){yNegExtra=canvasH/2}startX=Math.cos(startAngle);startY=Math.sin(startAngle);endX=Math.cos(endAngle);endY=Math.sin(endAngle);leftX=mathMin(startX,endX,0);rightX=Math.max(startX,endX,0);topY=mathMin(startY,endY,0);bottomY=Math.max(startY,endY,0);if(!rediusDefined||!centerXDefined||!centerYDefined){scale=endAngle-startAngle;resultantEnd=startAbs+scale;if(resultantEnd>PI2||resultantEnd<0){rightX=1}if(scale>0){if(startAbs<PIby2&&resultantEnd>PIby2||resultantEnd>PI2+PIby2){bottomY=1}if(startAbs<PI&&resultantEnd>PI||resultantEnd>PI2+PI){leftX=-1}if(startAbs<PI3by2&&resultantEnd>PI3by2||resultantEnd>PI2+PI3by2){topY=-1}}else{if(startAbs>PIby2&&resultantEnd<PIby2||resultantEnd<-PI3by2){bottomY=1}if(startAbs>PI&&resultantEnd<PI||resultantEnd<-PI){leftX=-1}if(startAbs>PI3by2&&resultantEnd<PI3by2||resultantEnd<-PIby2){topY=-1}}if(!centerXDefined){range=rightX-leftX;tempRadius=canvasW/range;centerX=-tempRadius*leftX;calculatedRadus=tempRadius;if(pivotCalRequard){if(canvasW-centerX<compositPivotRadius){centerX=canvasW-compositPivotRadius;positiveLength=canvasW-centerX;negativeLength=-centerX;calculatedRadus=leftX?mathMin(positiveLength/rightX,negativeLength/leftX):positiveLength/rightX}else if(centerX<compositPivotRadius){centerX=compositPivotRadius;positiveLength=canvasW-centerX;negativeLength=-centerX;calculatedRadus=leftX?mathMin(positiveLength/rightX,negativeLength/leftX):positiveLength/rightX}}returnObj.centerX=centerX}else if(!rediusDefined){positiveLength=canvasW-centerX;negativeLength=-centerX;calculatedRadus=leftX?mathMin(positiveLength/rightX,negativeLength/leftX):positiveLength/rightX}if(!centerYDefined){range=bottomY-topY;tempRadius=canvasH/range;centerY=-tempRadius*topY;if(pivotCalRequard){if(canvasH-centerY<compositPivotRadius){centerY=canvasH-compositPivotRadius;positiveLength=canvasH-centerY;negativeLength=-centerY;calculatedRadus=mathMin(calculatedRadus,topY?mathMin(positiveLength/bottomY,negativeLength/topY):positiveLength/bottomY)}else if(centerY<compositPivotRadius){centerY=compositPivotRadius;positiveLength=canvasH-centerY;negativeLength=-centerY;calculatedRadus=mathMin(calculatedRadus,topY?mathMin(positiveLength/bottomY,negativeLength/topY):positiveLength/bottomY)}}if(canvasH-centerY<yPosExtra){centerY=canvasH-yPosExtra;positiveLength=canvasH-centerY;negativeLength=-centerY;calculatedRadus=mathMin(calculatedRadus,topY?mathMin(positiveLength/bottomY,negativeLength/topY):positiveLength/bottomY)}else if(centerY<yNegExtra){centerY=yNegExtra;positiveLength=canvasH-centerY;negativeLength=-centerY;calculatedRadus=mathMin(calculatedRadus,topY?mathMin(positiveLength/bottomY,negativeLength/topY):positiveLength/bottomY)}calculatedRadus=mathMin(calculatedRadus,tempRadius);returnObj.centerY=centerY}else if(!rediusDefined){positiveLength=canvasH-centerY;negativeLength=-centerY;calculatedRadus=mathMin(calculatedRadus,topY?mathMin(positiveLength/bottomY,negativeLength/topY):positiveLength/bottomY)}returnObj.maxRadius=calculatedRadus;if(returnObj.maxRadius<=0){returnObj.maxRadius=mathMin(canvasW/2,canvasH/2)}}return returnObj};AngularGauge._getScaleFactor=function _getScaleFactor(_origW,_origH,canvasWidth,canvasHeight){var scaleFactor,origH=pluckNumber(_origH,canvasHeight),origW=pluckNumber(_origW,canvasWidth);if(!origH||!origW){scaleFactor=1}else if(origW/canvasWidth===origH/canvasHeight){scaleFactor=canvasWidth/origW}else{scaleFactor=mathMin(canvasWidth/origW,canvasHeight/origH)}return scaleFactor};_proto._getData=function _getData(index,callback){return _getData2.call(this,index,callback)};_proto._setData=function _setData(dialIndex,value){_setData2.call(this,dialIndex,value)};_proto._getDataForId=function _getDataForId(id,callback){return _getDataForId2.call(this,id,callback)};_proto._setDataForId=function _setDataForId(id,value){_setDataForId2.call(this,id,value)};return AngularGauge}(Gauge);export default AngularGauge;