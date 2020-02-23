import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{_setDefaultConfig}from"../_internal/areabase";import MSSplineDataset from"../../dataset/msspline";import SSCartesian from"../_internal/sscartesian";var CHART_STR="Spline Chart",MS_SPLINE_STR="msspline";var Spline=function(_SSCartesian){_inheritsLoose(Spline,_SSCartesian);Spline.getName=function getName(){return"Spline"};function Spline(){var _this;_this=_SSCartesian.call(this)||this;_this.defaultPlotShadow=1;return _this}var _proto=Spline.prototype;_proto.getName=function getName(){return"Spline"};_proto.__setDefaultConfig=function __setDefaultConfig(){_SSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.singleseries=true;config.defaultDatasetType=MS_SPLINE_STR;config.minimizetendency=0;config.zeroplanethickness=1;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.enablemousetracking=true;config.defaultcrosslinethickness=1;_setDefaultConfig.call(this)};_proto.getDSdef=function getDSdef(){return MSSplineDataset};return Spline}(SSCartesian);export default Spline;