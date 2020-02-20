import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSCartesian from"@fusioncharts/charts/src/chart/_internal/mscartesian";import HeatMapDataset from"../../dataset/heatmap";import HeatMapGroup from"../../dataset/groups/heatmap";import axisFactory from"../../factories/category-axis";import dataSetFactory from"@fusioncharts/charts/src/factories/multiseries-dataset";import createColorRangeManager from"@fusioncharts/charts/src/factories/colorrange";import decideLegendCreation from"@fusioncharts/charts/src/factories/legendmanager";import{chartPaletteStr,convertColor,hasSVG,pluck,pluckFontSize,preDefStr,pluckNumber,parseUnsafeString,getFirstValue}from"@fusioncharts/core/src/lib";import isEqualString from"@fusioncharts/utils/src/string/equal";var defaultFontStr=preDefStr.defaultFontStr,divLineAlpha3DStr=preDefStr.divLineAlpha3DStr,divLineAlphaStr=preDefStr.divLineAlphaStr,altVGridColorStr=preDefStr.altVGridColorStr,altVGridAlphaStr=preDefStr.altVGridAlphaStr,altHGridColorStr=preDefStr.altHGridColorStr,altHGridAlphaStr=preDefStr.altHGridAlphaStr,colorStrings=preDefStr.colors,COLOR_000000=colorStrings.c000000,EQUAL_STR=" = ",HEATMAP="heatmap",UNDEF,checkValidId=function checkValidId(item){return item.id!==UNDEF};var HeatMap=function(_MSCartesian){_inheritsLoose(HeatMap,_MSCartesian);HeatMap.getName=function getName(){return"HeatMap"};function HeatMap(){var _this;_this=_MSCartesian.call(this)||this;_this.tooltipsepchar=EQUAL_STR;_this.hasGradientLegend=true;_this.registerFactory("axis",axisFactory,["canvas"]);_this.registerFactory("legend",decideLegendCreation,["canvas"]);_this.registerFactory("colormanager-decider",createColorRangeManager,["legend"]);_this.registerFactory("dataset",dataSetFactory,["colormanager-decider","vCanvas"]);return _this}var _proto=HeatMap.prototype;_proto.getName=function getName(){return"HeatMap"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.isSingleSeries=true;config.hasLegend=true;config.defaultDatasetType=HEATMAP;config.enablemousetracking=true};_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){var jsonData=this.getFromEnv("dataSource"),dataset=jsonData.dataset,data,colorrange=jsonData.colorrange;if(dataset){for(var i=0;i<dataset.length;i++){if(dataset[i].data){data=dataset[i].data;break}}}if(!dataset||!data||data.length===0||!colorrange||!colorrange.color&&!Number(colorrange.gradient)){return true}};_proto.parseChartAttr=function parseChartAttr(dataObj){_MSCartesian.prototype.parseChartAttr.call(this,dataObj);this.config.drawTrendRegion=0};_proto.configureAttributes=function configureAttributes(dataObj){var iapi=this,chartConfig=iapi.config,dataSource=iapi.getFromEnv("dataSource"),skipConfigureIteration=iapi.config.skipConfigureIteration={},rows,columns,datasetArray=dataObj.dataset,unifiedDataset=[];rows=dataSource.rows&&dataSource.rows.row.filter(checkValidId);columns=dataSource.columns&&dataSource.columns.column.filter(checkValidId);if(!rows||!columns){for(var i=0;i<datasetArray.length;i++){for(var j=0;j<datasetArray[i].data.length;j++){unifiedDataset.push(datasetArray[i].data[j])}}if(!rows){rows=unifiedDataset.map((function(item){return getFirstValue(item.rowid)})).filter((function(value,index,self){return self.indexOf(value)===index}))}if(!columns){columns=unifiedDataset.map((function(item){return getFirstValue(item.columnid)})).filter((function(value,index,self){return self.indexOf(value)===index}))}}iapi.parseChartAttr(dataObj);iapi.addToEnv("chartColorRange",dataObj.colorrange||{});iapi.createComponent(dataObj);iapi._feedAxesRawData();skipConfigureIteration.axis=true;iapi.addToEnv("totalRows",rows.length);iapi.addToEnv("totalColumns",columns.length);iapi.configureChildren();iapi.asyncDraw();iapi.getFromEnv("toolTipController").setStyle({backgroundColor:hasSVG?convertColor(chartConfig.tooltipbgcolor||"FFF",chartConfig.tooltipbgalpha||100):(chartConfig.tooltipbgcolor||"FFF").replace(/\s+/g,"").replace(/^#?([a-f0-9]+)/gi,"#$1"),color:(chartConfig.tooltipcolor||chartConfig.basefontcolor||"545454").replace(/^#?([a-f0-9]+)/gi,"#$1"),borderColor:hasSVG?convertColor(chartConfig.tooltipbordercolor||"666",chartConfig.tooltipborderalpha||100):(chartConfig.tooltipbordercolor||"666").replace(/\s+/g,"").replace(/^#?([a-f0-9]+)/gi,"#$1"),borderWidth:pluckNumber(chartConfig.tooltipborderthickness,1)+"px",showToolTipShadow:pluckNumber(chartConfig.showtooltipshadow||0),borderRadius:pluckNumber(chartConfig.tooltipborderradius,0),fontSize:pluckNumber(chartConfig.basefontsize,10)+"px",fontFamily:chartConfig.basefont||this.getFromEnv("style").inCanfontFamily,padding:pluckNumber(chartConfig.tooltippadding||3)+"px"})};_proto._postSpaceManagement=function _postSpaceManagement(){var iapi=this,xAxis=iapi.getChildren("xAxis")[0],legend=iapi.getFromEnv("legend"),xDepth=iapi.config.xDepth;iapi.setAxisDimention();xAxis&&xAxis.shiftLabels(-xDepth,0);legend&&legend.postSpaceManager();iapi.allocateDimensionOfChartMenuBar()};_proto.setAxisDimention=function setAxisDimention(){var iapi=this,xAxis=iapi.getChildren("xAxis")&&iapi.getChildren("xAxis")[0],yAxis=iapi.getChildren("yAxis")&&iapi.getChildren("yAxis")[0],chartConfig=iapi.getFromEnv("chartConfig"),canvas=iapi.getChildren("canvas")[0],canvasConfig=canvas.config,_canvas$getEffectiveD=canvas.getEffectiveDimensions(),left=_canvas$getEffectiveD.left,top=_canvas$getEffectiveD.top,width=_canvas$getEffectiveD.width,height=_canvas$getEffectiveD.height,paddingLeft=_canvas$getEffectiveD.paddingLeft,paddingRight=_canvas$getEffectiveD.paddingRight,canvasBorderWidth=canvasConfig&&canvasConfig.canvasBorderWidth,canvasPadding=canvasConfig&&canvasConfig.canvasPadding;xAxis&&xAxis.setAxisConfig({canvasPaddingLeft:Math.max(paddingLeft,canvasPadding),canvasPaddingRight:Math.max(paddingRight,canvasPadding)});xAxis&&xAxis.setAxisDimention({x:left,y:xAxis.config.isOpposit?top+(chartConfig.shift||0)-canvasBorderWidth:top+height+(chartConfig.shift||0)+canvasBorderWidth,opposite:xAxis.config.isOpposit?top+height+canvasBorderWidth:top-canvasBorderWidth,axisLength:width});yAxis&&yAxis.setAxisDimention({x:yAxis.config.isOpposit?left+width+canvasBorderWidth:left-canvasBorderWidth,y:top,opposite:yAxis.config.isOpposit?left-canvasBorderWidth:left+width+canvasBorderWidth,axisLength:height})};_proto._feedAxesRawData=function _feedAxesRawData(){var iapi=this,colorM=iapi.getFromEnv("color-manager"),dataObj=iapi.getFromEnv("dataSource"),chartAttrs=dataObj.chart,xAxisConf,yAxisConf,is3D=iapi.config.is3D,palleteString=is3D?chartPaletteStr.chart3D:chartPaletteStr.chart2D,xAxisPosition=parseUnsafeString(chartAttrs.xaxisposition).toLowerCase();xAxisConf={mapTickValuesById:true,isVertical:false,isReverse:false,isOpposit:pluckNumber(xAxisPosition==="top"?true:UNDEF,xAxisPosition==="bottom"?false:UNDEF,!!iapi.config.placeAxisLabelsOnTop),outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.xaxisnamepadding,axisValuePadding:chartAttrs.labelpadding,axisNameFont:chartAttrs.xaxisnamefont,axisNameFontSize:chartAttrs.xaxisnamefontsize,axisNameFontColor:chartAttrs.xaxisnamefontcolor,axisNameFontBold:chartAttrs.xaxisnamefontbold,axisNameFontItalic:chartAttrs.xaxisnamefontitalic,axisNameBgColor:chartAttrs.xaxisnamebgcolor,axisNameBorderColor:chartAttrs.xaxisnamebordercolor,axisNameAlpha:chartAttrs.xaxisnamealpha,axisNameFontAlpha:chartAttrs.xaxisnamefontalpha,axisNameBgAlpha:chartAttrs.xaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.xaxisnameborderalpha,axisNameBorderPadding:chartAttrs.xaxisnameborderpadding,axisNameBorderRadius:chartAttrs.xaxisnameborderradius,axisNameBorderThickness:chartAttrs.xaxisnameborderthickness,axisNameBorderDashed:chartAttrs.xaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.xaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.xaxisnameborderdashgap,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,divLineColor:pluck(chartAttrs.vdivlinecolor,chartAttrs.divlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.vdivlinealpha,chartAttrs.divlinealpha,is3D?colorM.getColor(divLineAlpha3DStr):colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.vdivlinethickness,chartAttrs.divlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.vdivlinedashed,chartAttrs.vdivlineisdashed,chartAttrs.divlinedashed,chartAttrs.divlineisdashed,0)),divLineDashLen:pluckNumber(chartAttrs.vdivlinedashlen,chartAttrs.divlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.vdivlinedashgap,chartAttrs.divlinedashgap,2),showAlternateGridColor:pluckNumber(chartAttrs.showalternatevgridcolor,0),alternateGridColor:pluck(chartAttrs.alternatevgridcolor,colorM.getColor(altVGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatevgridalpha,colorM.getColor(altVGridAlphaStr)),numDivLines:chartAttrs.numvdivlines,labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,labelBdrColor:chartAttrs.labelbordercolor,labelBdrAlpha:chartAttrs.labelborderalpha,labelLink:chartAttrs.labellink,labelBgColor:chartAttrs.labelbgcolor,labelBgAlpha:chartAttrs.labelbgalpha,labelBdrThickness:chartAttrs.labelborderthickness,labelBdrPadding:chartAttrs.labelborderpadding,labelBdrRadius:chartAttrs.labelborderradius,labelBdrDashed:chartAttrs.labelborderdashed,labelBdrDashLen:chartAttrs.labelborderdashlen,labelBdrDashGap:chartAttrs.labelborderdashgap,axisName:chartAttrs.xaxisname,axisMinValue:chartAttrs.xaxisminvalue,axisMaxValue:chartAttrs.xaxismaxvalue,setAdaptiveMin:chartAttrs.setadaptivexmin,adjustDiv:chartAttrs.adjustvdiv,labelDisplay:chartAttrs.labeldisplay,showLabels:pluckNumber(chartAttrs.showxaxislabels,chartAttrs.showlabels),rotateLabels:chartAttrs.rotatexaxislabels,slantLabel:pluckNumber(chartAttrs.slantlabels,chartAttrs.slantlabel),labelStep:pluckNumber(chartAttrs.labelstep,chartAttrs.xaxisvaluesstep),showAxisValues:pluckNumber(chartAttrs.showxaxisvalues,chartAttrs.showxaxisvalue),maxLabelHeight:chartAttrs.maxlabelheight,showZeroPlane:chartAttrs.showvzeroplane,zeroPlaneColor:chartAttrs.vzeroplanecolor,zeroPlaneThickness:chartAttrs.vzeroplanethickness,zeroPlaneAlpha:chartAttrs.vzeroplanealpha,showZeroPlaneValue:chartAttrs.showvzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showxaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.xaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.xaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.xaxislinecolor,chartAttrs.axislinecolor,COLOR_000000)};yAxisConf={mapTickValuesById:true,isVertical:true,isReverse:false,isOpposit:isEqualString(chartAttrs.yaxisposition,"right"),outCanfontFamily:pluck(chartAttrs.outcnvbasefont,chartAttrs.basefont,defaultFontStr),outCanfontSize:pluckFontSize(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:pluck(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),axisNamePadding:chartAttrs.yaxisnamepadding,axisValuePadding:chartAttrs.yaxisvaluespadding,axisNameFont:chartAttrs.yaxisnamefont,axisNameFontSize:chartAttrs.yaxisnamefontsize,axisNameFontColor:chartAttrs.yaxisnamefontcolor,axisNameFontBold:chartAttrs.yaxisnamefontbold,axisNameFontItalic:chartAttrs.yaxisnamefontitalic,axisNameBgColor:chartAttrs.yaxisnamebgcolor,axisNameBorderColor:chartAttrs.yaxisnamebordercolor,axisNameAlpha:chartAttrs.yaxisnamealpha,axisNameFontAlpha:chartAttrs.yaxisnamefontalpha,axisNameBgAlpha:chartAttrs.yaxisnamebgalpha,axisNameBorderAlpha:chartAttrs.yaxisnameborderalpha,axisNameBorderPadding:chartAttrs.yaxisnameborderpadding,axisNameBorderRadius:chartAttrs.yaxisnameborderradius,axisNameBorderThickness:chartAttrs.yaxisnameborderthickness,axisNameBorderDashed:chartAttrs.yaxisnameborderdashed,axisNameBorderDashLen:chartAttrs.yaxisnameborderdashlen,axisNameBorderDashGap:chartAttrs.yaxisnameborderdashgap,axisNameWidth:chartAttrs.yaxisnamewidth,useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,rotateAxisName:pluckNumber(chartAttrs.rotateyaxisname,1),axisName:chartAttrs.yaxisname,showAlternateGridColor:pluckNumber(chartAttrs.showalternatehgridcolor,1),alternateGridColor:pluck(chartAttrs.alternatehgridcolor,colorM.getColor(altHGridColorStr)),alternateGridAlpha:pluck(chartAttrs.alternatehgridalpha,colorM.getColor(altHGridAlphaStr)),numDivLines:chartAttrs.numdivlines,axisMinValue:chartAttrs.yaxisminvalue,axisMaxValue:chartAttrs.yaxismaxvalue,setAdaptiveMin:chartAttrs.setadaptiveymin,adjustDiv:chartAttrs.adjustdiv,labelStep:chartAttrs.yaxisvaluesstep,showLabels:pluckNumber(chartAttrs.showyaxislabels,chartAttrs.showlabels),maxLabelWidthPercent:chartAttrs.maxlabelwidthpercent,showAxisValues:pluckNumber(chartAttrs.showyaxisvalues,chartAttrs.showyaxisvalue),divLineColor:pluck(chartAttrs.hdivlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:pluck(chartAttrs.hdivlinealpha,colorM.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(chartAttrs.hdivlinethickness,1),divLineIsDashed:Boolean(pluckNumber(chartAttrs.hdivlinedashed,chartAttrs.hdivlineisdashed,0)),divLineDashLen:pluckNumber(chartAttrs.hdivlinedashlen,4),divLineDashGap:pluckNumber(chartAttrs.hdivlinedashgap,2),showZeroPlane:chartAttrs.showzeroplane,zeroPlaneColor:chartAttrs.zeroplanecolor,zeroPlaneThickness:chartAttrs.zeroplanethickness,zeroPlaneAlpha:chartAttrs.zeroplanealpha,showZeroPlaneValue:chartAttrs.showzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:pluckNumber(chartAttrs.showyaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:pluckNumber(chartAttrs.yaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:pluckNumber(chartAttrs.yaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:pluck(chartAttrs.yaxislinecolor,chartAttrs.axislinecolor,COLOR_000000),labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,labelBdrColor:chartAttrs.labelbordercolor,labelBdrAlpha:chartAttrs.labelborderalpha,labelLink:chartAttrs.labellink,labelBgColor:chartAttrs.labelbgcolor,labelBgAlpha:chartAttrs.labelbgalpha,labelBdrThickness:chartAttrs.labelborderthickness,labelBdrPadding:chartAttrs.labelborderpadding,labelBdrRadius:chartAttrs.labelborderradius,labelBdrDashed:chartAttrs.labelborderdashed,labelBdrDashLen:chartAttrs.labelborderdashlen,labelBdrDashGap:chartAttrs.labelborderdashgap};xAxisConf.vtrendlines=dataObj.vtrendlines;yAxisConf.trendlines=dataObj.trendlines;return{yAxisConf:[yAxisConf],xAxisConf:[xAxisConf]}};_proto._setCategories=function _setCategories(){var iapi=this,dataObj=iapi.getFromEnv("dataSource"),xAxis=iapi.getChildren("xAxis"),yAxis=iapi.getChildren("yAxis"),len,i,k,columnObj,rowObj,columns,rows,columnid,rowid,columnArr=[],rowArr=[],columnFlag,rowFlag,j;if(!dataObj.columns||!dataObj.rows){dataObj.columns={};dataObj.columns.column=columns=[];dataObj.rows={};dataObj.rows.row=rows=[];for(k=0;k<(dataObj.dataset&&dataObj.dataset.length);k++){len=dataObj.dataset&&dataObj.dataset[k].data&&dataObj.dataset[k].data.length;for(i=0;i<len;i++){columnid=getFirstValue(dataObj.dataset[k].data[i].columnid);rowid=getFirstValue(dataObj.dataset[k].data[i].rowid);columnFlag=true;rowFlag=true;for(j=0;j<columns.length;j++){if(columnid===columns[j].id){columnFlag=false}}if(columnFlag){columnObj={id:columnid,label:columnid};dataObj.columns.column.push(columnObj)}for(j=0;j<rows.length;j++){if(rowid===rows[j].id){rowFlag=false}}if(rowFlag){rowObj={id:rowid,label:rowid};dataObj.rows.row.push(rowObj)}}}}columns=dataObj.columns.column;rows=dataObj.rows.row;for(i=0;i<(columns&&columns.length);i++){columns[i].label=pluck(columns[i].label,columns[i].name,columns[i].id);columnArr.push(columns[i])}dataObj.columns.column=columnArr;for(i=0;i<(rows&&rows.length);i++){rows[i].label=pluck(rows[i].label,rows[i].name,rows[i].id);rowArr.push(rows[i])}dataObj.rows.row=rowArr;dataObj.columns&&xAxis[0].setTickValues(dataObj.columns.column);dataObj.rows&&yAxis[0].setTickValues(dataObj.rows.row);xAxis[0].setAxisConfig({categoryNumDivLines:iapi.getFromEnv("totalColumns")-1,categoryDivLinesFromZero:0,showAlternateGridColor:0});yAxis[0].setAxisConfig({categoryNumDivLines:iapi.getFromEnv("totalRows")-1,categoryDivLinesFromZero:0,showAlternateGridColor:0})};_proto.getDSdef=function getDSdef(){return HeatMapDataset};_proto.getDSGroupdef=function getDSGroupdef(){return HeatMapGroup};return HeatMap}(MSCartesian);export default HeatMap;