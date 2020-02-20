import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Canvas from"@fusioncharts/charts/src/_internal/components/canvases/canvas";import{polarToCartesian}from"@fusioncharts/utils/src/scale-utils/polar-util";import{pluckNumber,pluck,convertColor}from"@fusioncharts/core/src/lib";var PolarCanvas=function(_Canvas){_inheritsLoose(PolarCanvas,_Canvas);function PolarCanvas(){return _Canvas.apply(this,arguments)||this}var _proto=PolarCanvas.prototype;_proto.getName=function getName(){return"polarCanvas"};_proto.getType=function getType(){return"canvas"};_proto.configureAttributes=function configureAttributes(){_Canvas.prototype.configureAttributes.call(this);var canvas=this,canvasConfig=canvas.config,chart=canvas.getFromEnv("chart"),JSONData=chart.getFromEnv("dataSource"),FCChartObj=JSONData.chart,colorM=chart.getFromEnv("color-manager");canvasConfig.radarBorderColor=convertColor(pluck(FCChartObj.radarbordercolor,colorM.getColor("divLineColor")),pluckNumber(FCChartObj.radarborderalpha,100));canvasConfig.radarFillColor=convertColor(pluck(FCChartObj.radarfillcolor,colorM.getColor("altHGridColor")),pluckNumber(FCChartObj.radarfillalpha,colorM.getColor("altHGridAlpha")));canvasConfig.radarBorderThickness=pluckNumber(FCChartObj.radarborderthickness,2);canvasConfig.showRadarBorder=pluckNumber(FCChartObj.showradarborder,1)};_proto.draw=function draw(){this.createGroup();this.drawCanvas()};_proto.drawCanvas=function drawCanvas(){var canvas=this,canvasConfig=this.config,chart=canvas.getFromEnv("chart"),chartConfig=chart.config,axis=chart.getChildren("xAxis")[0],animationManager=chart.getFromEnv("animationManager"),radarBorderContainerDummy=canvas.getContainer("radarBorderContainer"),radarBorderContainer,canvasGroup=canvas.getContainer("canvasGroup"),axisConfig=axis.config,radarBorderAttrObj={stroke:canvasConfig.radarBorderColor,fill:canvasConfig.radarFillColor,"stroke-width":canvasConfig.radarBorderThickness,path:[]},i,category=axisConfig.tickValues.tickValue,min,max,theta,axisScale=axis.getScale(),radiusXY,radius,radBorderDummy=canvas.getGraphicalElement("radarBorder"),radarBorder,centerX=axisConfig.axisDimention.centerX,centerY=axisConfig.axisDimention.centerY;radius=pluckNumber(axisConfig.radius,0);min=0;max=category?category.length-1:0;canvasConfig.canvasLeft=canvasConfig.canvasLeft||chartConfig.canvasLeft;canvasConfig.canvasTop=canvasConfig.canvasTop||chartConfig.canvasTop;canvasConfig.canvasWidth=canvasConfig.canvasWidth||chartConfig.canvasWidth;canvasConfig.canvasHeight=canvasConfig.canvasHeight||chartConfig.canvasHeight;if(canvasConfig.showRadarBorder!==0){radarBorderAttrObj.path.push("M");for(i=min;i<=max;i++){theta=axisScale.getRangeValue(i);radiusXY=polarToCartesian(radius,theta);radiusXY.x+=centerX;radiusXY.y+=centerY;radarBorderAttrObj.path.push(radiusXY.x,radiusXY.y,"L")}radarBorderAttrObj.path.pop();radarBorderAttrObj.path.push("Z")}radarBorderContainer=animationManager.setAnimation({el:radarBorderContainerDummy||"group",attr:{name:"radarBorderContainer"},container:canvasGroup,component:canvas,label:"group"});if(!radarBorderContainerDummy){canvas.addContainer("radarBorderContainer",radarBorderContainer)}radarBorder=animationManager.setAnimation({el:radBorderDummy||"path",attr:radarBorderAttrObj,container:radarBorderContainer,component:axis,label:"path"});if(!radBorderDummy){canvas.addGraphicalElement("radarBorder",radarBorder)}};return PolarCanvas}(Canvas);export default PolarCanvas;