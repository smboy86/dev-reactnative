import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import DragColumn from"../dragcolumn2d";import DragAreaDataset from"../../dataset/dragarea";import{HUNDREDSTRING}from"@fusioncharts/core/src/lib";import{_setDefaultConfig}from"@fusioncharts/charts/src/chart/_internal/areabase";var DragArea=function(_DragColumn){_inheritsLoose(DragArea,_DragColumn);function DragArea(){return _DragColumn.apply(this,arguments)||this}var _proto=DragArea.prototype;_proto.getName=function getName(){return"DragArea"};DragArea.getName=function getName(){return"DragArea"};_proto.getDSGroupdef=function getDSGroupdef(){};_proto.__setDefaultConfig=function __setDefaultConfig(){_DragColumn.prototype.__setDefaultConfig.call(this);var chart=this,config=chart.config;_setDefaultConfig.call(chart);config.isDrag=true;config.anchoralpha=HUNDREDSTRING;config.enablemousetracking=true;config.defaultcrosslinethickness=1};_proto.getDSdef=function getDSdef(){return DragAreaDataset};return DragArea}(DragColumn);export default DragArea;