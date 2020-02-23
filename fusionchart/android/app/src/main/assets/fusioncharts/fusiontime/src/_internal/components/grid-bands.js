import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";import{extend2}from"@fusioncharts/core/src/lib";var HORIZONTAL="horizontal";var GridBand=function(_SmartRenderer){_inheritsLoose(GridBand,_SmartRenderer);function GridBand(){return _SmartRenderer.apply(this,arguments)||this}var _proto=GridBand.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_SmartRenderer.prototype.__setDefaultConfig.call(this);this.config.direction=HORIZONTAL;this.config.style={};this.config.defaultStyle={stroke:"#EFEFEF","stroke-width":"0",fill:"#EFEFEF","fill-opacity":"1"}};_proto.configureAttributes=function configureAttributes(obj){if(obj===void 0){obj={}}_SmartRenderer.prototype.configureAttributes.call(this,obj);var selfConfig=this.config;for(var key in obj){if(obj.hasOwnProperty(key)){selfConfig[key]=obj[key]}}};_proto.getBands=function getBands(){var _scale;var gridBand=this,canvasConfig=gridBand.getLinkedParent().config,bands=[],axisConfig,x,y,yScaleRangeFunction,width,height,scale,ticks,tickArguments=[],i,len;axisConfig=canvasConfig.yConfigs[0];scale=axisConfig.scale;x=canvasConfig.canvasBGLeft;yScaleRangeFunction=scale.getRangeValue.bind(scale);width=canvasConfig.canvasBGLeft+canvasConfig.canvasBGWidth;if(axisConfig.tickarguments){tickArguments=axisConfig.tickarguments}tickArguments.push(axisConfig.skipinfo||{});tickArguments.push(axisConfig.dayinmajor||false);ticks=(_scale=scale).ticks.apply(_scale,tickArguments);height=yScaleRangeFunction(ticks[0])-yScaleRangeFunction(ticks[1]);for(i=0,len=ticks.length;i<len;i+=2){y=yScaleRangeFunction(ticks[i])-height;bands.push({x:x,y:y,width:width,height:height})}return bands};_proto.draw=function draw(){var gridBand=this,selfConfig=gridBand.config,mergedStyle,_gridBand$getLinkedPa=gridBand.getLinkedParent().config,canvasLeft=_gridBand$getLinkedPa.canvasLeft,canvasTop=_gridBand$getLinkedPa.canvasTop,canvasWidth=_gridBand$getLinkedPa.canvasWidth,canvasHeight=_gridBand$getLinkedPa.canvasHeight,padding=_gridBand$getLinkedPa.padding,clipPath=["M"+canvasLeft+","+(canvasTop-padding.top),"h"+canvasWidth,"v"+canvasHeight,"h"+-canvasWidth,"Z"];selfConfig.style=gridBand.getFromEnv("getStyleDef")(selfConfig.style);mergedStyle=extend2(extend2({},selfConfig.defaultStyle),selfConfig.style);mergedStyle["stroke-width"]=0;gridBand.addGraphicalElement({el:"group",container:{id:"strato",label:"group",isParent:true},component:gridBand,label:"gridBand",attr:{name:"grid-band-group","clip-path":clipPath},id:"gridBand"});gridBand.getBands().forEach((function(band,index){band.opacity=mergedStyle.opacity;gridBand.addGraphicalElement({el:"rect",attr:band,css:mergedStyle,container:{label:"gridBand"},id:"grid-band-"+index,component:gridBand,label:"band"})}))};return GridBand}(SmartRenderer);export default GridBand;