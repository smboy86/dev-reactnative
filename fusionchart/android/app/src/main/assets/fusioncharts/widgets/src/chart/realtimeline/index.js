import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{_setDefaultConfig}from"@fusioncharts/charts/src/chart/_internal/areabase";import RealtimeColumn from"../realtimecolumn";import RealtimeLineDataset from"../../dataset/realtimeline";var DS_TYPE="realtimeline";var RealtimeLine=function(_RealtimeColumn){_inheritsLoose(RealtimeLine,_RealtimeColumn);RealtimeLine.getName=function getName(){return"RealtimeLine"};function RealtimeLine(){var _this;_this=_RealtimeColumn.call(this)||this;_this.axisPaddingLeft=0;_this.axisPaddingRight=0;return _this}var _proto=RealtimeLine.prototype;_proto.getName=function getName(){return"RealtimeLine"};_proto.__setDefaultConfig=function __setDefaultConfig(){_RealtimeColumn.prototype.__setDefaultConfig.call(this);_setDefaultConfig.call(this);var config=this.config;config.defaultDatasetType=DS_TYPE;config.zeroplanethickness=1;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return RealtimeLineDataset};_proto.getDSGroupdef=function getDSGroupdef(){};return RealtimeLine}(RealtimeColumn);export default RealtimeLine;