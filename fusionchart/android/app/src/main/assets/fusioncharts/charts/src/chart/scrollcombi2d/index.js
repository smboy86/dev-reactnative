import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScrollArea2D from"../scrollarea2d";import ColumnDataset from"../../dataset/column";import AreaDataset from"../../dataset/area";import LineDataset from"../../dataset/line";import SplineAreaDataset from"../../dataset/mssplinearea";import SplineLineDataset from"../../dataset/msspline";import ColumnMultiSeriesGroup from"../../dataset/groups/column-multiseries";import datasetFactory from"../../factories/combi-dual-y-dataset";var UNDEFINED,CHART_STR="Scrollable Combination Chart",COLUMN_STR="column";var ScrollCombi2D=function(_ScrollArea2D){_inheritsLoose(ScrollCombi2D,_ScrollArea2D);ScrollCombi2D.getName=function getName(){return"ScrollCombi2D"};function ScrollCombi2D(){var _this;_this=_ScrollArea2D.call(this)||this;_this.hasScroll=true;_this.defaultPlotShadow=1;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=ScrollCombi2D.prototype;_proto.getName=function getName(){return"ScrollCombi2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_ScrollArea2D.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.defaultDatasetType=COLUMN_STR;config.zeroplanethickness=1;config.zeroplanealpha=80;config.enablemousetracking=true;config.showzeroplaneontop=0;config.defaultcrosslinethickness=null;config.avgScrollPointWidth=40;config.canvasborderthickness=1};_proto.getDSdef=function getDSdef(name){if(name==="splinearea"){return SplineAreaDataset}else if(name==="spline"){return SplineLineDataset}else if(name==="area"){return AreaDataset}else if(name==="line"){return LineDataset}return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(name){return name==="column"?ColumnMultiSeriesGroup:UNDEFINED};_proto.getDSType=function getDSType(name){if(name===void 0){name=""}if(name.toLowerCase()==="splinearea"){return"splinearea"}else if(name.toLowerCase()==="spline"){return"spline"}else if(name.toLowerCase()==="area"){return"area"}else if(name.toLowerCase()==="line"){return"line"}return"column"};return ScrollCombi2D}(ScrollArea2D);export default ScrollCombi2D;