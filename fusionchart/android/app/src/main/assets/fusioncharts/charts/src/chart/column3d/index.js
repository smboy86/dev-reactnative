import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import SSCartesian3D from"../_internal/sscartesian3d";import Column3DDataset from"../../dataset/column3d";var COLUMN3D_CHART="3D Column Chart";var Column3D=function(_SSCartesian3D){_inheritsLoose(Column3D,_SSCartesian3D);Column3D.getName=function getName(){return"Column3D"};function Column3D(){var _this;_this=_SSCartesian3D.call(this)||this;_this.defaultPlotShadow=1;_this.defaultZeroPlaneHighlighted=false;return _this}var _proto=Column3D.prototype;_proto.getName=function getName(){return"Column3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_SSCartesian3D.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=true;config.hasLegend=false;config.singleseries=true;config.friendlyName=COLUMN3D_CHART;config.showplotborder=0;config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return Column3DDataset};return Column3D}(SSCartesian3D);export default Column3D;