import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import AreaBase from"../_internal/areabase";import LineDataset from"../../dataset/line";var UNDEF,MS_LINE_CHART="Multi-series Line Chart",LINE_STR="line";var MSLine=function(_AreaBase){_inheritsLoose(MSLine,_AreaBase);MSLine.getName=function getName(){return"MSLine"};function MSLine(){var _this;_this=_AreaBase.call(this)||this;_this.defaultPlotShadow=1;_this.axisPaddingLeft=0;_this.axisPaddingRight=0;return _this}var _proto=MSLine.prototype;_proto.getName=function getName(){return"MSLine"};_proto.__setDefaultConfig=function __setDefaultConfig(){_AreaBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=MS_LINE_CHART;config.defaultDatasetType=LINE_STR;config.zeroplanethickness=1;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.enablemousetracking=true;config.defaultcrosslinethickness=1};_proto.getDSdef=function getDSdef(){return LineDataset};_proto.getDSGroupdef=function getDSGroupdef(){return UNDEF};return MSLine}(AreaBase);export default MSLine;