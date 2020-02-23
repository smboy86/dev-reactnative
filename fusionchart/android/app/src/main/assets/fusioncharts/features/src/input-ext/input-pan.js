import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Base from"./input-base";import{isFirefox,UNDEF}from"@fusioncharts/core/src/lib";var STATE_PRESSED="pressed";var fetchCoordFromEvent=function fetchCoordFromEvent(sentEvent){var event=sentEvent;if(event.originalEvent){event=event.originalEvent}if(event.type.match(/touch/)){return{x:event.touches[0].pageX,y:event.touches[0].pageY}}else if(event.type.match(/mouse|pointer/)){return{x:event.pageX,y:event.pageY}}},isSingleFinger=function isSingleFinger(event){return!event.touches||event.touches.length===1},getDiffValXY=function getDiffValXY(a,b){return{x:a.x-b.x,y:a.y-b.y}};var InputPan=function(_Base){_inheritsLoose(InputPan,_Base);function InputPan(){var _this;_this=_Base.call(this)||this;var input=_assertThisInitialized(_this);input.controlArr=[{nativeInteraction:["fc-dragstart","fc-dragmove"],callback:input.onDrag.bind(input),component:input},{nativeInteraction:["fc-dragend"],callback:input.onDragEnd.bind(input),component:input}];input.toggle=input.toggle.bind(input);isFirefox&&input.controlArr.push({nativeInteraction:["fc-mousedown"],callback:InputPan.mousedown,component:input});return _this}InputPan.mousedown=function mousedown(event){event&&event.preventDefault()};var _proto=InputPan.prototype;_proto.configure=function configure(){_Base.prototype.configure.call(this);var input=this;!input.config.skipGraphics&&input.setLinkedItem("button",input.createButton({icon:"panModeIcon",tooltext:input.config.tooltext,handlers:{click:input.toggle},state:"activated"}));input.getLinkedParent().registerDependancy([{derivedInteraction:["zoomin","zoomout","dragzoomenabled","dragzoomdisabled"],callback:input.dependancyFn,component:input}]);input.disable(UNDEF,false)};_proto.getName=function getName(){return"dragPan"};_proto.enable=function enable(event,dontFireExtEvt){var input=this;if(input._checkStackLen()&&input.config.enabled!==true){input.config.enabled=true;input.config.state=STATE_PRESSED;input.fireEvent("panenabled");!dontFireExtEvt&&input.getFromEnv("chart").fireChartInstanceEvent("zoommodechanged",{panModeActive:true},event&&event.originalEvent);input.setControl()}};_proto.disable=function disable(event,dontFireExtEvt){var input=this;if(input.config.enabled!==false){input.config.enabled=false;input.config.state=input._checkStackLen()?"activated":"disabled";input.fireEvent("pandisabled");!dontFireExtEvt&&input.getFromEnv("chart").fireChartInstanceEvent("zoommodechanged",{panModeActive:false},event&&event.originalEvent);input.setControl()}};_proto.setControl=function setControl(){var input=this,manager=input.getLinkedParent(),button=input.getLinkedItem("button"),controlArr=input.controlArr;manager.releaseControl(controlArr);if(input.isEnabled()){manager.getControl(controlArr)}button&&button.setCurrentState(input.isEnabled()?input.config.state:"disabled")};_proto.setDrag=function setDrag(val){this.config.isDragging=!!val};_proto.isDragging=function isDragging(){return!!this.config.isDragging};_proto.onDragEnd=function onDragEnd(){this.setDrag(false);this.getFromEnv("chart").getContainer("parentgroup").attr({cursor:"default"})};_proto.onDrag=function onDrag(event){var inputPan=this,min,max,shiftVal,visibleDiff,axis,range,scale,scaleRange,scaleDomain,pvr,currentXY=fetchCoordFromEvent(event.originalEvent),diffOb;if(!isSingleFinger(event.originalEvent)){return}inputPan.getFromEnv("chart").getContainer("parentgroup").attr({cursor:"move"});this.getFromEnv("animationManager").setAnimationState("drag");if(!inputPan.isDragging()){inputPan.getFromEnv("axesObArr").forEach((function(axesOb){axesOb.origConfig=axesOb.axis.getVisibleConfig();axesOb.startCoord=currentXY}));inputPan.setDrag(true)}else{inputPan.getFromEnv("axesObArr").forEach((function(axesOb){min=axesOb.origConfig.minValue;max=axesOb.origConfig.maxValue;axis=axesOb.axis;range=axis.config.axisRange;scale=axis.getScale();scaleRange=scale.getRange();scaleDomain=scale.getDomain();pvr=(scaleRange[1]-scaleRange[0])/(scaleDomain[1]-scaleDomain[0]);diffOb=getDiffValXY(currentXY,axesOb.startCoord);visibleDiff=max-min;if(axesOb.isY){shiftVal=diffOb.y/pvr}else{shiftVal=diffOb.x/pvr}shiftVal=-shiftVal;if(shiftVal>0){shiftVal=Math.min(range.max-max,shiftVal)}else if(shiftVal<0){shiftVal=-Math.min(min-range.min,-shiftVal)}else{return}min=min+shiftVal;max=min+visibleDiff;axis.setVisibleConfig(min,max)}))}};_proto.dependancyFn=function dependancyFn(eventOb){var input=this;if(eventOb.type==="zoomout"){!input._checkStackLen()&&input.disable()}else if(eventOb.type==="zoomin"){input.enable(eventOb)}else if(eventOb.type==="dragzoomdisabled"){input._checkStackLen()&&input.enable(eventOb)}else if(eventOb.type==="dragzoomenabled"){input.disable(eventOb)}};return InputPan}(Base);export default InputPan;