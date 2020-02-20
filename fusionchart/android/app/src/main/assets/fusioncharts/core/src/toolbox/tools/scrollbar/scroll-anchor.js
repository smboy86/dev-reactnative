import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Tool from"../tool";import{pluckNumber}from"../../../lib";import{getDep}from"../../../dependency-manager";var R=getDep("redraphael","plugin"),M="M",m="m",v="v",COLOR_5F5F5F="#5F5F5F";var ScrollAnchor=function(_Tool){_inheritsLoose(ScrollAnchor,_Tool);function ScrollAnchor(){var _this;_this=_Tool.call(this)||this;_this._evtHandlers={};return _this}var _proto=ScrollAnchor.prototype;_proto.configureAttributes=function configureAttributes(obj){if(obj===void 0){obj={}}var selfConfig=this.config;selfConfig.drawStripes=pluckNumber(obj.drawStripes,0);selfConfig._nodeDimensions={};selfConfig.style={scroller:Object.assign({},{fill:obj.displayFlat&&R.tintshade(obj.color,-.6).rgba||[270*obj.isHorizontal,R.tintshade(obj.color,.3).rgba+":40",R.tintshade(obj.color,-.7).rgba].join("-"),stroke:R.tintshade(obj.color,-.6).rgba},obj.style.scroller),grip:Object.assign({},{stroke:COLOR_5F5F5F,"stroke-linecap":"round","stroke-width":2},obj.style.grip)}};_proto.attachEventHandlers=function attachEventHandlers(){var scrollAnchor=this,scrollbar=this.getLinkedParent(),scrollbarConfig=scrollbar.config,_dragstart,_dragaxis,newScrollPos,isHorizontal=scrollbarConfig.isHorizontal;scrollAnchor.addEventListener("fc-dragmove",scrollAnchor._evtHandlers.dragmove||(scrollAnchor._evtHandlers.dragmove=function(event){newScrollPos=_dragstart+event.originalEvent.data[_dragaxis]/this.config.trackLength;if(newScrollPos>=1){newScrollPos=1}else if(newScrollPos<=0||isNaN(newScrollPos)){newScrollPos=0}scrollbarConfig.scrollPosition=newScrollPos;scrollAnchor.asyncDraw();typeof scrollbarConfig.evt.scroll==="function"&&scrollbarConfig.evt.scroll(scrollbarConfig.scrollPosition)}));scrollAnchor.addEventListener("fc-dragstart",scrollAnchor._evtHandlers.dragstart||(scrollAnchor._evtHandlers.dragstart=function(){_dragaxis=isHorizontal?0:1;_dragstart=scrollbarConfig.scrollPosition;typeof scrollbarConfig.evt.scrollStart==="function"&&scrollbarConfig.evt.scrollStart(scrollbarConfig.scrollPosition)}));scrollAnchor.addEventListener("fc-dragend",scrollAnchor._evtHandlers.dragend||(scrollAnchor._evtHandlers.dragend=function(){typeof scrollbarConfig.evt.scrollEnd==="function"&&scrollbarConfig.evt.scrollEnd(scrollbarConfig.scrollPosition)}))};_proto.draw=function draw(){var scrollAnchor=this,selfConfig=scrollAnchor.config,scrollbar=this.getLinkedParent(),scrollbarConfig=scrollbar.config,x=scrollbarConfig.x+.5,y=scrollbarConfig.y+scrollbarConfig.padding+.5,width=scrollbarConfig.width-1,height=scrollbarConfig.height-1<1?1:scrollbarConfig.height-1,ratio=scrollbarConfig.restrictScrollAnchor?Math.max(scrollbarConfig.scrollRatio,.01):scrollbarConfig.scrollRatio,isHorizontal=scrollbarConfig.isHorizontal,position=pluckNumber(scrollbarConfig.scrollPosition,scrollbarConfig.startPercent,0),trackLength,trackOffset,button=0,track=isHorizontal?width*ratio:height*ratio;if(position>=1){position=1}else if(position<=0||isNaN(position)){position=0}if(scrollbarConfig.showButtons){button=isHorizontal?Math.min(height,width*.5):Math.min(width,height*.5);track-=button*2*ratio}selfConfig.trackLength=trackLength=isHorizontal?width-2*button-track:height-2*button-track;selfConfig.trackOffset=trackOffset=isHorizontal?x+button+.5:y+button+.5;selfConfig._nodeDimensions={x:isHorizontal?trackOffset+trackLength*position:x,y:isHorizontal?y:trackOffset+trackLength*position,width:isHorizontal?track-1<1?1:track-1:width<1?1:width,height:isHorizontal?height<1?1:height:track-1<1?1:track-1};scrollAnchor.addGraphicalElement({el:"rect",attr:{x:selfConfig._nodeDimensions.x,y:selfConfig._nodeDimensions.y,width:selfConfig._nodeDimensions.width,height:selfConfig._nodeDimensions.height,r:scrollbarConfig.roundEdges&&2||0,opacity:selfConfig.style.scroller.opacity},css:selfConfig.style.scroller,container:{id:"scrollbarGroup",label:"scrollbarGroup",isParent:true},component:scrollAnchor,label:"scrollbarAnchor",id:"scrollbarAnchor"});if(selfConfig.drawStripes&&selfConfig._nodeDimensions.width>=8){scrollAnchor.addGraphicalElement({el:"path",attr:{path:[M,selfConfig._nodeDimensions.x+selfConfig._nodeDimensions.width/2-3,selfConfig._nodeDimensions.y+.2*selfConfig._nodeDimensions.height,v,.6*selfConfig._nodeDimensions.height,m,3,-.6*selfConfig._nodeDimensions.height,v,.6*selfConfig._nodeDimensions.height,m,3,-.6*selfConfig._nodeDimensions.height,v,.6*selfConfig._nodeDimensions.height],opacity:selfConfig.style.grip.opacity},css:selfConfig.style.grip,container:{id:"scrollbarGroup",label:"scrollbarGroup",isParent:true},component:scrollAnchor,label:"scrollbarAnchorStripe",id:"scrollbarAnchorStripe"})}};return ScrollAnchor}(Tool);export default ScrollAnchor;