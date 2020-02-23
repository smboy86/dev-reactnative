import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScatterDataset from"@fusioncharts/charts/src/dataset/scatter";import{preDefStr,extend2,pluck,pluckNumber,ZEROSTRING,bindSelectionEvent,getMouseCoordinate,convertColor}from"@fusioncharts/core/src/lib";import{getDepsByType,addDep}from"@fusioncharts/core/src/dependency-manager";import selectScatterAnimation from"./index.animation";var COLOR_FFFFFF="FFFFFF",XY_STR="xy",altHGridColorStr=preDefStr.altHGridColorStr,altHGridAlphaStr=preDefStr.altHGridAlphaStr;addDep({name:"selectScatterAnimation",type:"animationRule",extension:selectScatterAnimation});var SelectScatterDataset=function(_ScatterDataset){_inheritsLoose(SelectScatterDataset,_ScatterDataset);function SelectScatterDataset(){return _ScatterDataset.apply(this,arguments)||this}var _proto=SelectScatterDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"selectScatter"};_proto.configure=function configure(datasetJSON){_ScatterDataset.prototype.configure.call(this,datasetJSON);var dataSet=this,chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,chartAttr=chart.getFromEnv("dataSource").chart,colorM=dataSet.getFromEnv("color-manager"),borderColor=pluck(chartAttr.selectbordercolor,colorM.getColor("canvasBorderColor")),borderAlpha=pluckNumber(chartAttr.selectborderalpha,colorM.getColor("canvasBorderAlpha"));chartConfig.selectBorderColor={FCcolor:{color:borderColor,alpha:borderAlpha}};chartConfig.selectFillColor=convertColor(pluck(chartAttr.selectfillcolor,colorM.getColor(altHGridColorStr)),pluckNumber(chartAttr.selectfillalpha,colorM.getColor(altHGridAlphaStr)));chartConfig.selectionCancelButtonBorderColor=convertColor(pluck(chartAttr.selectioncancelbuttonbordercolor,borderColor),pluckNumber(chartAttr.selectioncancelbuttonborderalpha,borderAlpha));chartConfig.selectionCancelButtonFillColor=convertColor(pluck(chartAttr.selectioncancelbuttonfillcolor,COLOR_FFFFFF),pluckNumber(chartAttr.selectioncancelbuttonfillalpha,100));chartConfig.connativeZoom=false;chartConfig.zoomType=XY_STR;if(chartAttr.submitdataasxml===ZEROSTRING&&!chartAttr.formdataformat){chartAttr.formdataformat=getDepsByType("transcoder").csv&&"csv"}chartConfig.formDataFormat=pluck(chartAttr.formdataformat);chartConfig.formTarget=pluck(chartAttr.formtarget,"_self");chartConfig.formMethod=pluck(chartAttr.formmethod,"POST");chartConfig.submitFormAsAjax=pluckNumber(chartAttr.submitformusingajax,1)};_proto.draw=function draw(){_ScatterDataset.prototype.draw.call(this);var dataSet=this,chart=dataSet.getFromEnv("chart"),container=chart.getFromEnv("chart-container"),xAxis=dataSet.getFromEnv("xAxis"),yAxis=dataSet.getFromEnv("yAxis");bindSelectionEvent(chart,{selectionStart:function selectionStart(data){var pos=getMouseCoordinate(container,data.originalEvent,chart),eventArgs=extend2({selectionLeft:data.selectionLeft,selectionTop:data.selectionTop,selectionWidth:data.selectionWidth,selectionHeight:data.selectionHeight,startXValue:xAxis.getValue(data.selectionLeft,1),startYValue:yAxis.getValue(data.selectionTop,1)},pos);data.chart.fireChartInstanceEvent("selectionStart",eventArgs)},selectionEnd:function selectionEnd(data){var pos=getMouseCoordinate(container,data.originalEvent,chart),eventArgs=extend2({selectionLeft:data.selectionLeft,selectionTop:data.selectionTop,selectionWidth:data.selectionWidth,selectionHeight:data.selectionHeight,startXValue:xAxis.getValue(data.selectionLeft,1),startYValue:yAxis.getValue(data.selectionTop,1),endXValue:xAxis.getValue(data.selectionLeft+data.selectionWidth,1),endYValue:yAxis.getValue(data.selectionTop+data.selectionHeight,1)},pos);data.chart.fireChartInstanceEvent("selectionEnd",eventArgs);data.chart.createSelectionBox(data)}})};return SelectScatterDataset}(ScatterDataset);export default SelectScatterDataset;