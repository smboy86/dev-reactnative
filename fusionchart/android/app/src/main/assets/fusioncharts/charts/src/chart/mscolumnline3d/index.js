import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSCombi3D from"../mscombi3d";import Column3DDataset from"../../dataset/column3d";import LineDataset from"../../dataset/line";import Column3DGroup from"../../dataset/groups/column-multiseries";var MS_COLUMN_LINE_CHART="Multi-series Column and Line Chart";var UNDEF;var MSColumnLine3D=function(_MSCombi3D){_inheritsLoose(MSColumnLine3D,_MSCombi3D);MSColumnLine3D.getName=function getName(){return"MSColumnLine3D"};function MSColumnLine3D(){var _this;_this=_MSCombi3D.call(this)||this;_this.defaultPlotShadow=1;return _this}var _proto=MSColumnLine3D.prototype;_proto.getName=function getName(){return"MSColumnLine3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCombi3D.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=true;config.friendlyName=MS_COLUMN_LINE_CHART;config.use3dlineshift=1;config.showplotborder=0;config.enablemousetracking=true};_proto.getDSdef=function getDSdef(name){return name==="line"?LineDataset:Column3DDataset};_proto.getDSGroupdef=function getDSGroupdef(name){return name==="column3d"?Column3DGroup:UNDEF};_proto.getDSType=function getDSType(name){return name&&name.toLowerCase()==="line"?"line":"column3d"};return MSColumnLine3D}(MSCombi3D);export default MSColumnLine3D;