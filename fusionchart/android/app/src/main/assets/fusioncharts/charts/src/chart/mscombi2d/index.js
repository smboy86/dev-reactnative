import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import AreaBase from"../_internal/areabase";import ColumnDataset from"../../dataset/column";import AreaDataset from"../../dataset/area";import LineDataset from"../../dataset/line";import SplineAreaDataset from"../../dataset/mssplinearea";import SplineLineDataset from"../../dataset/msspline";import ColumnMultiSeriesGroup from"../../dataset/groups/column-multiseries";import datasetFactory from"../../factories/combi-dual-y-dataset";var UNDEFINED,MS_COMBINATION_CHART="Multi-series Combination Chart",COLUMN_STR="column";var MSCombi2D=function(_AreaBase){_inheritsLoose(MSCombi2D,_AreaBase);function MSCombi2D(){var _this;_this=_AreaBase.call(this)||this;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}MSCombi2D.getName=function getName(){return"MSCombi2D"};var _proto=MSCombi2D.prototype;_proto.getName=function getName(){return"MSCombi2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_AreaBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=MS_COMBINATION_CHART;config.defaultDatasetType=COLUMN_STR;config.enablemousetracking=true;config.showzeroplaneontop=0};_proto.getDSdef=function getDSdef(name){if(name==="splinearea"){return SplineAreaDataset}else if(name==="spline"){return SplineLineDataset}else if(name==="area"){return AreaDataset}else if(name==="line"){return LineDataset}return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(name){return name==="column"?ColumnMultiSeriesGroup:UNDEFINED};_proto.getDSType=function getDSType(name){if(name===void 0){name=""}if(name.toLowerCase()==="splinearea"){return"splinearea"}else if(name.toLowerCase()==="spline"){return"spline"}else if(name.toLowerCase()==="area"){return"area"}else if(name.toLowerCase()==="line"){return"line"}return"column"};return MSCombi2D}(AreaBase);export default MSCombi2D;