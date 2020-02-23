import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{HUNDREDSTRING,pluck,pluckNumber,extend2,defaultGaugePaletteOptions,preDefStr,convertColor,getLightColor}from"@fusioncharts/core/src/lib";import LinearGauge from"../_internal/lineargauge";import CylinderDataset from"../../dataset/cylinder";import datasetFactory from"../../factories/vled-dataset";var colorStrings=preDefStr.colors,COLOR_FFFFFF=colorStrings.FFFFFF,gaugeFillColorStr=preDefStr.gaugeFillColorStr,gaugeBorderColorStr=preDefStr.gaugeBorderColorStr,UNDEFINED,defined=function defined(obj){return obj!==UNDEFINED&&obj!==null},DS_TYPE="cylinder",RIGHT="right",LEFT="left";var Cylinder=function(_LinearGauge){_inheritsLoose(Cylinder,_LinearGauge);Cylinder.getName=function getName(){return"Cylinder"};function Cylinder(){var _this;_this=_LinearGauge.call(this)||this;_this.defaultPaletteOptions=extend2(extend2({},defaultGaugePaletteOptions),{gaugeBorderColor:["545454","60634E","415D6F","845001","68001B"],gaugeFillColor:["CCCCCC","ADB68F","E1F5FF","FDB548","FF7CA0"],periodColor:["EEEEEE","ECEEE6","E6ECF0","FFF4E6","FFF2F5"]},false,true);_this.glasscolor=COLOR_FFFFFF;_this.showRTvalue=false;_this.canvasPadding=false;_this.isHorizontal=false;_this.config.isAxisOpposite=true;_this.config.scalePosition=RIGHT;_this.config.canBeScalePosition=LEFT;_this.hasCanvas=true;_this.drawPlotlines=false;_this.drawPlotBands=false;_this.isAxisReverse=false;_this.isRealTime=true;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=Cylinder.prototype;_proto.getName=function getName(){return"Cylinder"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LinearGauge.prototype.__setDefaultConfig.call(this);var config=this.config;config.alignCaptionWithCanvas=1;config.defaultDatasetType=DS_TYPE;config.hasLegend=false;config.skipCanvasDrawing=true};_proto._parseSpecialConfig=function _parseSpecialConfig(){var iapi=this,chartConfig=iapi.config,dataObj=iapi.getFromEnv("dataSource"),chartOptions=dataObj.chart,numberFormatter=iapi.getFromEnv("number-formatter"),colorM=iapi.getFromEnv("color-manager"),gaugeBorderAlpha;chartConfig.use3DLighting=pluckNumber(chartOptions.use3dlighting,1);chartConfig.gaugeOriginX=pluckNumber(chartOptions.thmoriginx,chartOptions.cyloriginx,chartOptions.gaugeoriginx);chartConfig.gaugeOriginY=pluckNumber(chartOptions.thmoriginy,chartOptions.cyloriginy,chartOptions.gaugeoriginy);chartConfig.gaugeRadius=pluckNumber(numberFormatter.getCleanValue(pluckNumber(chartOptions.thmbulbradius,chartOptions.cylradius,chartOptions.gaugeradius),true));chartConfig.gaugeHeight=pluckNumber(numberFormatter.getCleanValue(pluckNumber(chartOptions.thmheight,chartOptions.cylheight,chartOptions.gaugeheight),true));chartConfig.origW=pluckNumber(chartOptions.origw);chartConfig.origH=pluckNumber(chartOptions.origh);chartConfig.xDefined=defined(chartConfig.gaugeOriginX);chartConfig.yDefined=defined(chartConfig.gaugeOriginY);chartConfig.rDefined=defined(chartConfig.gaugeRadius);chartConfig.hDefined=defined(chartConfig.gaugeHeight);chartConfig.gaugeFillColor=pluck(chartOptions.gaugefillcolor,chartOptions.cylfillcolor,colorM.getColor(gaugeFillColorStr));chartConfig.gaugeFillAlpha=pluckNumber(chartOptions.gaugefillalpha,chartOptions.cylfillalpha,HUNDREDSTRING);chartConfig.gaugeYScale=pluckNumber(chartOptions.cylyscale,chartOptions.gaugeyscale,30);if(chartConfig.gaugeYScale>50||chartConfig.gaugeYScale<0){chartConfig.gaugeYScale=30}chartConfig.gaugeYScale=chartConfig.gaugeYScale/100;chartConfig.showGaugeBorder=pluckNumber(chartOptions.showgaugeborder,1);gaugeBorderAlpha=chartConfig.showGaugeBorder?pluckNumber(chartOptions.gaugeborderalpha,40):0;chartConfig.gaugeBorderColor=convertColor(pluck(chartOptions.gaugebordercolor,colorM.getColor(gaugeBorderColorStr)),gaugeBorderAlpha);chartConfig.gaugeBorderThickness=pluckNumber(chartOptions.gaugeborderthickness,1);chartConfig.gaugeContainerColor=pluck(chartOptions.cylglasscolor,getLightColor(chartConfig.gaugeFillColor,30))};_proto.getDSdef=function getDSdef(){return CylinderDataset};_proto._getData=function _getData(){var iapi=this,dataset=iapi.getChildren("dataset");if(dataset&&dataset[0]){return dataset[0].config.value}};return Cylinder}(LinearGauge);export default Cylinder;