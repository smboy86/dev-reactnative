import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import DragLineDataset from"../../dataset/dragline";import DragArea from"../dragarea";var DragLine=function(_DragArea){_inheritsLoose(DragLine,_DragArea);function DragLine(){var _this;_this=_DragArea.call(this)||this;_this.defaultPlotShadow=1;return _this}var _proto=DragLine.prototype;_proto.getName=function getName(){return"DragLine"};DragLine.getName=function getName(){return"DragLine"};_proto.__setDefaultConfig=function __setDefaultConfig(){_DragArea.prototype.__setDefaultConfig.call(this);var config=this.config;config.isDrag=true;config.zeroplanethickness=1;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.enablemousetracking=true;config.defaultcrosslinethickness=1};_proto.getDSdef=function getDSdef(){return DragLineDataset};return DragLine}(DragArea);export default DragLine;