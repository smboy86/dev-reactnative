import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import zoomReset from"./zoom-reset";var ZoomOut=function(_zoomReset){_inheritsLoose(ZoomOut,_zoomReset);function ZoomOut(){var _this;_this=_zoomReset.call(this)||this;var input=_assertThisInitialized(_this);input._toggle=function(){input.isEnabled()&&input.zoomOut()};return _this}var _proto=ZoomOut.prototype;_proto.getName=function getName(){return"zoomOutButton"};_proto.configureButton=function configureButton(){var input=this;!input.config.skipGraphics&&input.setLinkedItem("button",input.createButton({icon:"zoomOutIcon",handlers:{click:input._toggle},tooltext:input.config.tooltext,state:"activated"}))};_proto.zoomOut=function zoomOut(){var input=this,visiblerange,hookFn=input.config.hookFn,eventArgs={},level,startX,endX,startY,endY,stackLen=0;input.getFromEnv("axesObArr").forEach((function(axisOb){visiblerange=axisOb.stack.pop();level=axisOb.stack.length;stackLen+=level;if(!visiblerange){return}if(axisOb.isY){startY=visiblerange.minValue;endY=visiblerange.maxValue}else{startX=visiblerange.minValue;endX=visiblerange.maxValue;eventArgs=input.constructor._getZoomInfo(startX,endX,axisOb.axis)}hookFn&&hookFn(visiblerange.minValue,visiblerange.maxValue);axisOb.axis.setVisibleConfig(visiblerange.minValue,visiblerange.maxValue)}));input._raiseZoomEvents("zoomout","zoomedout",Object.assign(eventArgs,{level:level,startX:startX,endX:endX,startY:startY,endY:endY}));if(!stackLen){this.disable()}};return ZoomOut}(zoomReset);export default ZoomOut;