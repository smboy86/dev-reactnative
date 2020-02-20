import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{_setDefaultConfig}from"@fusioncharts/charts/src/chart/_internal/areabase";import RealtimeArea from"../realtimearea";import RealtimeAreaDataset from"../../dataset/realtimearea";import StackManager from"@fusioncharts/charts/src/dataset/groups/cartesian-stack";import{pluck,parseUnsafeString}from"@fusioncharts/core/src/lib";import pluckNumber from"@fusioncharts/utils/src/pluck-number";var DS_TYPE="realtimearea";var RealtimeStackedArea=function(_RealtimeArea){_inheritsLoose(RealtimeStackedArea,_RealtimeArea);function RealtimeStackedArea(){return _RealtimeArea.apply(this,arguments)||this}RealtimeStackedArea.getName=function getName(){return"RealtimeStackedArea"};var _proto=RealtimeStackedArea.prototype;_proto.getName=function getName(){return"RealtimeStackedArea"};_proto.__setDefaultConfig=function __setDefaultConfig(){_RealtimeArea.prototype.__setDefaultConfig.call(this);_setDefaultConfig.call(this);var config=this.config;config.defaultDatasetType=DS_TYPE;config.isstacked=true;config.enablemousetracking=true;this.addToEnv("useImprovedLabelPlacement",true);this.addToEnv("useLinePlotGroupForAnchorPlacement",true)};_proto.configureAttributes=function configureAttributes(rawAttr){_RealtimeArea.prototype.configureAttributes.call(this,rawAttr);var config=this.config,chartAttrs=this.getFromEnv("chart-attrib");config.showSum=pluckNumber(chartAttrs.showsum,0);if(config.showSum){config.valueposition=parseUnsafeString(pluck(chartAttrs.valueposition,"below"))}};_proto.getDSdef=function getDSdef(){return RealtimeAreaDataset};_proto.getDSGroupdef=function getDSGroupdef(){return StackManager};return RealtimeStackedArea}(RealtimeArea);export default RealtimeStackedArea;