import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSBarCartesian3D from"../_internal/msbarcartesian3d";import Bar3Dgroup from"../../dataset/groups/column-multiseries";import Bar3DDataset from"../../dataset/bar3d";import datasetFactory from"../../factories/multiseries3d-dataset";var MS_BAR3D_CHART="Multi-series 3D Bar Chart",BAR3D_STR="bar3d";var MSBar3D=function(_MSBarCartesian3D){_inheritsLoose(MSBar3D,_MSBarCartesian3D);MSBar3D.getName=function getName(){return"MSBar3D"};function MSBar3D(){var _this;_this=_MSBarCartesian3D.call(this)||this;_this.defaultSeriesType=BAR3D_STR;_this.defaultPlotShadow=1;_this.isBar=true;_this.defaultZeroPlaneHighlighted=false;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}var _proto=MSBar3D.prototype;_proto.getName=function getName(){return"MSBar3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSBarCartesian3D.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=true;config.friendlyName=MS_BAR3D_CHART;config.hasLegend=true;config.defaultDatasetType=BAR3D_STR;config.showplotborder=0;config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return Bar3DDataset};_proto.getDSGroupdef=function getDSGroupdef(){return Bar3Dgroup};return MSBar3D}(MSBarCartesian3D);export default MSBar3D;