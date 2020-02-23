import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{pluck,getValidValue,BLANK,getDashStyle,getFirstValue,parseUnsafeString,pluckNumber,stableSort,componentFactory,datasetFactory,convertColor}from"@fusioncharts/core/src/lib";import ColorGradient from"@fusioncharts/core/src/color-utils/color-gradient";import LinearGauge from"../_internal/lineargauge";import HlineargaugeDataset from"../../dataset/hlineargauge";import{_getData as _getData2,_setData as _setData2,_getDataForId as _getDataForId2,_setDataForId as _setDataForId2}from"../_internal/angular-hlinear-common";var BLANKSTRING=BLANK,FRIENDLY_NAME="Horizontal Linear Gauge",DS_TYPE="hlineargauge",BOTTOM="bottom",TOP="top";var Hlineargauge=function(_LinearGauge){_inheritsLoose(Hlineargauge,_LinearGauge);Hlineargauge.getName=function getName(){return"Hlineargauge"};function Hlineargauge(){var _this;_this=_LinearGauge.call(this)||this;_this.showRTvalue=false;_this.canvasPadding=false;_this.isHorizontal=true;_this.config.isAxisOpposite=false;_this.config.scalePosition=BOTTOM;_this.config.canBeScalePosition=TOP;_this.drawPlotlines=false;_this.drawPlotBands=false;_this.isAxisReverse=false;_this.minorTMNumber=4;_this.isRealTime=true;_this.colorRange=true;_this.rtParserModify=true;_this.registerFactory("dataset",(function(parent){var dataObj=parent.getFromEnv("dataSource"),pointers=dataObj.pointers;datasetFactory(parent,HlineargaugeDataset,"dataset",1,[pointers])}),["vCanvas"]);return _this}var _proto=Hlineargauge.prototype;_proto.getName=function getName(){return"Hlineargauge"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LinearGauge.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.hasLegend=false;config.defaultDatasetType=DS_TYPE;config.skipCanvasDrawing=true};_proto.configure=function configure(dataObj){_LinearGauge.prototype.configure.call(this,dataObj);var iapi=this,jsonData=iapi.getFromEnv("dataSource"),colorrange=jsonData.colorrange;if(colorrange&&colorrange.color&&colorrange.color.length){componentFactory(iapi,ColorGradient,"colorRange",1,[{colorRange:colorrange,numberFormatter:iapi.getFromEnv("number-formatter")}]);iapi.addToEnv("colorRange",iapi.getChildren("colorRange")[0])}else{iapi.deleteFromEnv("colorRange")}};_proto._configueTrendPoints=function _configueTrendPoints(){var iapi=this,jsonData=iapi.getFromEnv("dataSource"),config=iapi.config,style=config.style,trendArray=jsonData.trendpoints&&jsonData.trendpoints.point,trendPointObj,i,scale=iapi.getFromEnv("scale"),scaleConfig=scale.config,axisRange=scaleConfig.axisRange,max=axisRange.max,min=axisRange.min,scaleFactor=scaleConfig.scaleFactor||1,colorM=iapi.getFromEnv("color-manager"),startValue,endValue,isTrendZone,trendPointConfig=config.trendPointConfig=[],chartAttrs=jsonData.chart,length=trendArray.length;style.trendStyle={fontFamily:style.outCanfontFamily,color:style.outCancolor,fontSize:style.outCanfontSize};for(i=0;i<length;i++){trendPointObj=trendArray[i];startValue=pluckNumber(trendPointObj.startvalue,trendPointObj.value);endValue=pluckNumber(trendPointObj.endvalue,startValue);isTrendZone=startValue!==endValue;if(startValue<=max&&startValue>=min&&endValue<=max&&endValue>=min){trendPointConfig.push({startValue:startValue,endValue:endValue,tooltext:getValidValue(parseUnsafeString(trendPointObj.markertooltext)),displayValue:getValidValue(parseUnsafeString(trendPointObj.displayvalue),isTrendZone?BLANKSTRING:iapi.getFromEnv("number-formatter").scale(startValue)),showOnTop:pluckNumber(trendPointObj.showontop,chartAttrs.ticksbelowgauge,1),color:pluck(trendPointObj.color,colorM.getColor("trendLightColor")),textColor:trendPointObj.color,alpha:pluckNumber(trendPointObj.alpha,99),thickness:pluckNumber(trendPointObj.thickness,1),dashStyle:Number(trendPointObj.dashed)?getDashStyle(trendPointObj.dashlen||2,trendPointObj.dashgap||2):BLANK,useMarker:pluckNumber(trendPointObj.usemarker,0),markerColor:convertColor(pluck(trendPointObj.markercolor,trendPointObj.color,colorM.getColor("trendLightColor")),100),markerBorderColor:convertColor(pluck(trendPointObj.markerbordercolor,trendPointObj.bordercolor,colorM.getColor("trendDarkColor")),100),markerRadius:pluckNumber(pluckNumber(trendPointObj.markerradius)*scaleFactor,5),markerToolText:getFirstValue(trendPointObj.markertooltext),trendValueDistance:pluckNumber(pluckNumber(trendPointObj.trendvaluedistance)*scaleFactor,axisRange.tickInterval),isTrendZone:isTrendZone})}}stableSort&&stableSort(config.trendPointConfig,(function(a,b){return a.startValue-b.startValue}))};_proto._getData=function _getData(index,callback){return _getData2.call(this,index,callback)};_proto._setData=function _setData(dialIndex,value){_setData2.call(this,dialIndex,value)};_proto._getDataForId=function _getDataForId(id,callback){return _getDataForId2.call(this,id,callback)};_proto._setDataForId=function _setDataForId(id,value){_setDataForId2.call(this,id,value)};return Hlineargauge}(LinearGauge);export default Hlineargauge;