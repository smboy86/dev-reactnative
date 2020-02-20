import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Tool from"./tool";import{pluckNumber}from"../../lib";var Path=function(_Tool){_inheritsLoose(Path,_Tool);function Path(){return _Tool.apply(this,arguments)||this}var _proto=Path.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_Tool.prototype.__setDefaultConfig.call(this);this.config.isVertical=1};_proto.configureAttributes=function configureAttributes(options){if(options===void 0){options={}}_Tool.prototype.configureAttributes.call(this,options);var toolConfig=this.config;toolConfig.isVertical=pluckNumber(options.isVertical,toolConfig.isVertical)};_proto.draw=function draw(){var tool=this,toolConfig=tool.config,x=toolConfig.x,y=toolConfig.y,width=toolConfig.width,height=toolConfig.height,path=toolConfig.isVertical?["M",x+width/2,y,"v",height]:["M",x,y,"h",width],attr={path:path,stroke:toolConfig.stroke,"stroke-width":toolConfig.strokeWidth,"stroke-linecap":"round"};!toolConfig.isHidden&&tool.addGraphicalElement({el:"path",attr:attr,component:tool,container:{id:"group",label:"group",isParent:true},css:toolConfig.css,label:"path",id:"path"})};return Path}(Tool);export default Path;