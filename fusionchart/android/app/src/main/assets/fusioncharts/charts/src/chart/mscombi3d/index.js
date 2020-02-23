import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSCartesian3D from"../_internal/mscartesian3d";import Column3DDataset from"../../dataset/column3d";import SplineAreaDataset from"../../dataset/mssplinearea";import SplineLineDataset from"../../dataset/msspline";import AreaDataset from"../../dataset/area";import LineDataset from"../../dataset/line";import ColumnMultiSeriesGroup from"../../dataset/groups/column-multiseries";import datasetFactory from"../../factories/combi-dual-y-3d-dataset";var UNDEFINED,HUNDREDSTRING="100",SEVENTYSTRING="70",MS_3D_COMBI_CHART="Multi-series 3D Combination Chart",COLUMN3D_STR="column3d";var MSCombi3D=function(_MSCartesian3D){_inheritsLoose(MSCombi3D,_MSCartesian3D);MSCombi3D.getName=function getName(){return"MSCombi3D"};function MSCombi3D(){var _this;_this=_MSCartesian3D.call(this)||this;_this.defaultPlotShadow=1;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=MSCombi3D.prototype;_proto.getName=function getName(){return"MSCombi3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian3D.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=true;config.friendlyName=MS_3D_COMBI_CHART;config.defaultDatasetType=COLUMN3D_STR;config.showplotborder=0;config.enablemousetracking=true;config.anchorborderthickness=1;config.anchorimageurl=UNDEFINED;config.anchorimagepadding=1;config.anchorsides=1;config.anchoralpha=UNDEFINED;config.anchorbgalpha=HUNDREDSTRING;config.anchorimagealpha=HUNDREDSTRING;config.anchorimagescale=100;config.anchorstartangle=90;config.anchorshadow=0;config.anchorbgcolor=UNDEFINED;config.anchorbordercolor=UNDEFINED;config.anchorradius=3;config.showvalues=1;config.plotfillalpha=SEVENTYSTRING;config.linedashlen=5;config.linedashgap=4;config.linedashed=UNDEFINED;config.linealpha=HUNDREDSTRING;config.linethickness=2;config.drawfullareaborder=1;config.connectnulldata=0};_proto.getDSdef=function getDSdef(name){if(name==="splinearea"){return SplineAreaDataset}else if(name==="spline"){return SplineLineDataset}else if(name==="area"){return AreaDataset}else if(name==="line"){return LineDataset}return Column3DDataset};_proto.getDSGroupdef=function getDSGroupdef(name){return name==="column3d"?ColumnMultiSeriesGroup:UNDEFINED};_proto.getDSType=function getDSType(name){if(name===void 0){name=""}if(name.toLowerCase()==="area"){return"area"}else if(name.toLowerCase()==="line"){return"line"}else if(name.toLowerCase()==="spline"){return"spline"}else if(name.toLowerCase()==="splinearea"){return"splinearea"}return"column3d"};return MSCombi3D}(MSCartesian3D);export default MSCombi3D;