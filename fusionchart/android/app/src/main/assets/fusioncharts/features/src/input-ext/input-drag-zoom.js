import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Base from"./input-base";import{getMouseCoordinate,isFirefox}from"@fusioncharts/core/src/lib";var STATE_PRESSED="pressed",STATE_ACTIVATED="activated";var min=Math.min,abs=Math.abs,UNDEF,getRectDimension=function getRectDimension(startPos,currentPos,canvasAttr,isXY){currentPos.x<canvasAttr.x&&(currentPos.x=canvasAttr.x);currentPos.y<canvasAttr.y&&(currentPos.y=canvasAttr.y);currentPos.x>canvasAttr.width+canvasAttr.x&&(currentPos.x=canvasAttr.width+canvasAttr.x);currentPos.y>canvasAttr.height+canvasAttr.y&&(currentPos.y=canvasAttr.height+canvasAttr.y);var width=currentPos.x-startPos.x,height=startPos.y-currentPos.y,x=min(startPos.x,currentPos.x),y=min(startPos.y,currentPos.y),cursor;if(width>0&&height>0){cursor=isXY?"ne-resize":"e-resize"}else if(width<0&&height>0){cursor=isXY?"nw-resize":"w-resize"}else if(width<0&&height<0){cursor=isXY?"sw-resize":"w-resize"}else if(width>0&&height<0){cursor=isXY?"se-resize":"e-resize"}width=abs(width);height=abs(height);return{x:x,y:y,width:width,height:height,cursor:cursor}};var InputDragZoom=function(_Base){_inheritsLoose(InputDragZoom,_Base);function InputDragZoom(){var _this;_this=_Base.call(this)||this;var input=_assertThisInitialized(_this);input.controlArr=[{nativeInteraction:["fc-dragstart"],callback:input.dragStart.bind(input),component:input},{nativeInteraction:["fc-dragmove"],callback:input.onDrag.bind(input),component:input},{nativeInteraction:["fc-dragend"],callback:input.onDragEnd.bind(input),component:input}];isFirefox&&input.controlArr.push({nativeInteraction:["fc-mousedown"],callback:InputDragZoom.mousedown,component:input});input._toggle=function(){input._checkStackLen()&&input.toggle()};return _this}var _proto=InputDragZoom.prototype;_proto.getName=function getName(){return"dragZoomIn"};_proto.configure=function configure(){_Base.prototype.configure.call(this);var input=this,config=input.config;config.boxStyle=config.boxStyle||{"stroke-width":1,stroke:"red",fill:"#00FF00",opacity:.2,cursor:"ne-resize"};!input.config.skipGraphics&&input.setLinkedItem("button",input.createButton({icon:"zoomModeIcon",tooltext:input.config.tooltext,handlers:{click:input._toggle},state:STATE_ACTIVATED}));input.enable("pressed");input.getLinkedParent().registerDependancy([{derivedInteraction:["pinenabled","pindisabled","panenabled","pandisabled"],callback:input.dependancyFn,component:input}])};InputDragZoom.mousedown=function mousedown(event){event&&event.preventDefault()};_proto.setControl=function setControl(){var input=this,manager=input.getLinkedParent(),button=input.getLinkedItem("button"),controlArr=input.controlArr;manager.releaseControl(controlArr);if(input.isEnabled()){manager.getControl(controlArr)}button&&button.setCurrentState(input.isEnabled()?input.config.state:"disabled")};_proto.getCoordinates=function getCoordinates(event){var chart=this.getFromEnv("chart"),coord=getMouseCoordinate(chart.getFromEnv("chart-container"),event,chart);return{x:coord.chartX,y:coord.chartY}};_proto.inCanvasLimit=function inCanvasLimit(attrs){var canvasAttr=this.getFromEnv("canvas").getGraphicalElement("canvasElement").attrs,minX=canvasAttr.x,minY=canvasAttr.y,xDiff=attrs.x-canvasAttr.x,yDiff=attrs.y-canvasAttr.y,maxWidth=canvasAttr.width-xDiff,maxHeight=canvasAttr.height-yDiff;return attrs.x>minX&&attrs.y>minY&&attrs.width<maxWidth&&attrs.height<maxHeight};_proto.drawBox=function drawBox(){var input=this,config=input.config,box=input.getGraphicalElement("box"),canvasAttr=input.getFromEnv("canvas").getGraphicalElement("canvasElement").attrs,dimension;if(!box){box=input.addGraphicalElement("box",input.getFromEnv("paper").rect());box.attr(config.boxStyle)}dimension=getRectDimension(input.dragBoxConfig.startPos,input.dragBoxConfig.currentPos,canvasAttr,input.getFromEnv("chart").isXY);if(!config.scaleX){dimension.x=canvasAttr.x;dimension.width=canvasAttr.width}if(!config.scaleY){dimension.y=canvasAttr.y;dimension.height=canvasAttr.height}box.attr(dimension);box.show()};_proto.onDragEnd=function onDragEnd(event){var input=this,config=input.config,canvasAttr=input.getFromEnv("canvas").getGraphicalElement("canvasElement").attrs,box=input.getGraphicalElement("box")||{},boxAttr=box.attrs,startPosX,endPosX,startPosY,endPosY;if(!boxAttr||!config.dragmove){return}config.dragmove=false;box.hide();config.startPosX=startPosX=(boxAttr.x-canvasAttr.x)/canvasAttr.width;config.endPosX=endPosX=(boxAttr.x+boxAttr.width-canvasAttr.x)/canvasAttr.width;config.startPosY=startPosY=(boxAttr.y-canvasAttr.y)/canvasAttr.height;config.endPosY=endPosY=(boxAttr.y+boxAttr.height-canvasAttr.y)/canvasAttr.height;if(endPosX-startPosX<.01||endPosY-startPosY<.01){return}input.zoomTo(UNDEF,UNDEF,event)};_proto.zoomTo=function zoomTo(startIndex,endIndex,event){var input=this,config=input.config,zoomed=false,eventArgs={},start,end,level,startY,startX,endY,endX,axisZoomed,catZoomLimit=config.catZoomLimit-1;input.getFromEnv("axesObArr").forEach((function(axisOb){var axis=axisOb.axis,visibleRange=axis.getVisibleConfig(),startPos=axisOb.isY?visibleRange.maxValue:visibleRange.minValue,diff=visibleRange.maxValue-visibleRange.minValue;if(axisOb.isY){startY=start=startIndex===UNDEF?startPos-diff*config.endPosY:startIndex;endY=end=endIndex===UNDEF?startPos-config.startPosY*diff:endIndex}else{startX=start=startIndex===UNDEF?startPos+config.startPosX*diff:startIndex;endX=end=endIndex===UNDEF?startPos+diff*config.endPosX:endIndex;eventArgs=input.constructor._getZoomInfo(startX,endX,axis)}if(catZoomLimit&&!axis.config.isVertical&&Math.round(end-start)<catZoomLimit){start=Math.round(start);end=start+catZoomLimit}if(diff>1||end-start>1){config.dragendFn&&typeof config.dragendFn==="function"&&config.dragendFn(event,start,end);axisZoomed=axis.setVisibleConfig(start,end);zoomed=zoomed||axisZoomed;axisOb.stack.push(visibleRange);level=axisOb.stack.length+1}}));if(zoomed){input._raiseZoomEvents("zoomin","zoomedin",Object.assign(eventArgs,{level:level,startX:startX,endX:endX,startY:startY,endY:endY},{originalEvent:event&&event.originalEvent}))}};_proto.onDrag=function onDrag(event){var input=this,config=input.config,currentXY=input.getCoordinates(event.originalEvent);config.dragmove=true;this.getFromEnv("animationManager").setAnimationState("drag");config.dragmoveFn&&typeof config.dragmoveFn==="function"&&config.dragmoveFn(event);input.dragBoxConfig.currentPos=currentXY;input.drawBox()};_proto.dragStart=function dragStart(event){var input=this,config=input.config,currentXY=input.getCoordinates(event.originalEvent);config.dragstartFn&&typeof config.dragstartFn==="function"&&config.dragstartFn(event);input.dragBoxConfig={startPos:currentXY,currentPos:currentXY}};_proto.enable=function enable(){var input=this;if(input.config.enabled!==true){input.config.enabled=true;input.config.state=STATE_PRESSED;input.fireEvent("dragzoomenabled");input.setControl()}};_proto.disable=function disable(){var input=this;if(input.config.enabled!==false){input.config.enabled=false;input.config.state=STATE_ACTIVATED;input.fireEvent("dragzoomdisabled");input.setControl()}};_proto.dependancyFn=function dependancyFn(eventOb){if(eventOb.type==="pinenabled"||eventOb.type==="panenabled"){this.disable()}else if(eventOb.type==="pindisabled"||eventOb.type==="pandisabled"){this.enable()}};return InputDragZoom}(Base);export default InputDragZoom;