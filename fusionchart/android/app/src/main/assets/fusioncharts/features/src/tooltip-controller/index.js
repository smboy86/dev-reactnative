import ToolTip from"./tooltip-component";import{getTouchEvent as touchSafeEvent,getScalingValue,UNDEF,getMouseCoordinate,isSimilarObject}from"@fusioncharts/core/src/lib";var TOOL_TIP_KEY="__FC_tooltipText",MOVE_HANDLER="__FC_onTooltipMove",OUT_HANDLER="__FC_onTooltipOut",OVER_HANDLER="__FC_onTooltipOver",IMPLICIT="implicit",MOUSE_POINTER_WIDTH_OFFSET=11,MOUSE_POINTER_HEIGHT_OFFSET=11;var moveHandler=function moveHandler(toolTip,controller,sentEvent){var event=getMouseCoordinate(controller.universe,touchSafeEvent(sentEvent),controller.chart),mousePointerWidthOffset=MOUSE_POINTER_WIDTH_OFFSET,mousePointerHeightOffset=MOUSE_POINTER_HEIGHT_OFFSET,x=event.chartX,y=event.chartY;if(this.applyScale){this._updateScalingValues();mousePointerWidthOffset/=this.scaleFactor.scaleX;mousePointerHeightOffset/=this.scaleFactor.scaleY}x+=mousePointerWidthOffset;y+=mousePointerHeightOffset;ToolTipController._draw.call(controller,x,y,this.data(TOOL_TIP_KEY),toolTip)},outHandler=function outHandler(toolTip){ToolTipController._hide(toolTip)};var ToolTipController=function(){function ToolTipController(universe,chart){var tooltipController=this;tooltipController.config={};tooltipController.universe=universe;this.scaleFactor=getScalingValue(universe);this.applyScale=0;this.chart=chart;this.restrictWithinCanvas={left:false,right:false,top:false,bottom:false};tooltipController.toolTips={implicit:[],explicit:[]};tooltipController.hideImplicitToolTip=function(e){var toolTip=tooltipController.lastActiveToolip;if(toolTip&&e.target!==toolTip.getData("targetElement").node){ToolTipController._hide(toolTip);tooltipController.config.lastActiveToolip=UNDEF}};tooltipController.config.positioningArr=[];tooltipController.config.canvasArr=[];universe.FusionCharts.jsVars.fcObj.addEventListener("resized",tooltipController._updateAllToolTipBounds.bind(tooltipController))}var _proto=ToolTipController.prototype;_proto.setRestrictionWithinCanvas=function setRestrictionWithinCanvas(obj){if(obj===void 0){obj={}}Object.assign(this.restrictWithinCanvas,obj)};_proto.getRestrictionWithinCanvas=function getRestrictionWithinCanvas(){return this.restrictWithinCanvas};_proto._updateAllToolTipBounds=function _updateAllToolTipBounds(){var tooltipController=this,config=tooltipController.config,canvasIndex,types,callback=function callback(tooltip){if(tooltip.universeBounds&&tooltip.universeBounds.canvas){canvasIndex=config.canvasArr.indexOf(tooltip.universeBounds.canvas)}tooltip.setUniverseBounds(config.positioningArr[canvasIndex])},toolTips=tooltipController.toolTips;for(types in toolTips){toolTips[types].forEach(callback)}};_proto._setRelativePosition=function _setRelativePosition(positioningObj){var config=this.config,canvasArr=config.canvasArr,positioningArr=config.positioningArr,canvasIndex=canvasArr.indexOf(positioningObj.canvas);if(canvasIndex===-1){canvasArr.push(positioningObj.canvas);positioningArr.push(positioningObj)}else{canvasArr[canvasIndex]=positioningObj.canvas;positioningArr[canvasIndex]=positioningObj}};_proto._createToolTip=function _createToolTip(toolTipType,canvas){var tooltipController=this,config=tooltipController.config,toolTip;toolTip=new ToolTip(this.universe,config.positioningArr[config.canvasArr.indexOf(canvas)]);toolTip.setRestrictionWithinCanvas(tooltipController.restrictWithinCanvas);toolTip.setStyle(tooltipController.config.tooltipStyle);tooltipController.toolTips[toolTipType].push(toolTip);return toolTip};_proto.enableToolTip=function enableToolTip(element,text,canvas){var ref=this,tooltipImplicitArray=ref.toolTips[IMPLICIT],length=tooltipImplicitArray.length,toolTip;if(!text){ref.disableToolTip(element);return ref}else if(element.data(TOOL_TIP_KEY)){if(length>0){tooltipImplicitArray.some((function(_tooltip){toolTip=_tooltip;if(toolTip.getData("active")&&toolTip.data.targetElement===element){toolTip.show(text);return true}return false}))}element.data(TOOL_TIP_KEY,text);return ref}toolTip=ref._getAvailableToolTip("implicit",canvas);ref.disableToolTip(element);element.data(TOOL_TIP_KEY,text);element.data(MOVE_HANDLER,moveHandler.bind(element,toolTip,ref));element.data(OUT_HANDLER,outHandler.bind(element,toolTip));element.data(OVER_HANDLER,function(_element){return function(e){ref.draw(e,element.data(TOOL_TIP_KEY),toolTip);toolTip.setData("targetElement",_element);ref.config.lastActiveToolip=toolTip}}(element));element.on("fc-mousemove",element.data(MOVE_HANDLER));element.on("fc-mouseout",element.data(OUT_HANDLER));element.on("fc-mouseover",element.data(OVER_HANDLER));return ref};_proto.disableToolTip=function disableToolTip(element){var elemOutHandler=element.data(OUT_HANDLER),elemMoveHandler=element.data(MOVE_HANDLER),elemOverHandler=element.data(OVER_HANDLER);elemMoveHandler&&element.off("fc-mousemove",elemMoveHandler);elemOutHandler&&element.off("fc-mouseout",elemOutHandler);elemOverHandler&&element.off("fc-mouseover",elemOverHandler);element.removeData(TOOL_TIP_KEY);return this};_proto._updateScalingValues=function _updateScalingValues(){var chartSpan=this.universe;this.scaleFactor=getScalingValue(chartSpan)};_proto.draw=function draw(sentEvent,text,toolTip,canvas){var mousePointerWidthOffset=MOUSE_POINTER_WIDTH_OFFSET,mousePointerHeightOffset=MOUSE_POINTER_HEIGHT_OFFSET,x,y,event=getMouseCoordinate(this.universe,touchSafeEvent(sentEvent),this.chart),currToolTip=toolTip&&!toolTip.disposed?toolTip:this._getAvailableToolTip("explicit",canvas);if(this.applyScale){this._updateScalingValues();mousePointerWidthOffset/=this.scaleFactor.scaleX;mousePointerHeightOffset/=this.scaleFactor.scaleY}x=event.chartX;y=event.chartY;x+=mousePointerWidthOffset;y+=mousePointerHeightOffset;ToolTipController._draw.call(this,x,y,text,currToolTip);return currToolTip};_proto.drawAt=function drawAt(x,y,text,toolTip,canvas){if(this.applyScale){this._updateScalingValues()}var currToolTip=toolTip&&!toolTip.disposed?toolTip:this._getAvailableToolTip("explicit",canvas);ToolTipController._draw.call(this,x,y,text,currToolTip);return currToolTip};ToolTipController._draw=function _draw(x,y,text,toolTip){var toolTipConfig=this.config;if(!isSimilarObject(toolTip.previousStyle,toolTipConfig.tooltipStyle)){toolTip.setStyle(toolTipConfig.tooltipStyle);toolTip.previousStyle=Object.assign({},toolTipConfig.tooltipStyle)}toolTip.show(text);toolTip.update(x,y)};_proto._getAvailableToolTip=function _getAvailableToolTip(type,canvas){var toolTips=this.toolTips[type],toolTip,isToolTipInactive;for(var i=0,ii=toolTips.length;i<ii;i++){toolTip=toolTips[i];isToolTipInactive=toolTip.getData("active")===false;if(isToolTipInactive){return toolTip}}return this._createToolTip(type,canvas)};_proto.setStyle=function setStyle(obj){var toolTipController=this,toolTipConfig=toolTipController.config,tooltipStyle;tooltipStyle=toolTipConfig.tooltipStyle={};for(var key in obj){if(key==="showToolTipShadow"){if(obj[key]){tooltipStyle.boxShadow="1px 1px 3px rgba(64,64,64,0.4)"}else{tooltipStyle.boxShadow="none"}}else{tooltipStyle[key]=obj[key]}}};_proto.hide=function hide(toolTip){ToolTipController._hide(toolTip);return this};_proto.hideAll=function hideAll(){var self=this,type,i;for(type in self.toolTips){for(i=0;i<self.toolTips[type].length;i++){ToolTipController._hide(self.toolTips[type][i])}}};_proto.setApplyScale=function setApplyScale(applyScale){this.applyScale=applyScale};ToolTipController._hide=function _hide(toolTip,willDispose){if(toolTip){if(willDispose){toolTip.dispose()}else{toolTip.hide()}}};return ToolTipController}();export default{extension:ToolTipController,name:"ToolTipController",type:"plugin"};