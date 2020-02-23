import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSCartesian from"../_internal/mscartesian";import ColumnDataset from"../../dataset/column";import CartesianStackGroup from"../../dataset/groups/cartesian-stack";import datasetFactory from"../../factories/msstackedcolumn-dataset";var MS_STACKED_COLUMN_CHART="Multi-series Stacked Column Chart",COLUMN_STR="column";var __checkInvalidSpecificData=function __checkInvalidSpecificData(){var jsonData=this.getFromEnv("dataSource"),datasetsJSON=jsonData.dataset,categories=jsonData.categories,i;if(!datasetsJSON||!categories){return true}if(i=datasetsJSON.length){while(i--){if(!datasetsJSON[i].dataset){return true}}}};var MSStackedColumn2D=function(_MSCartesian){_inheritsLoose(MSStackedColumn2D,_MSCartesian);function MSStackedColumn2D(){var _this;_this=_MSCartesian.call(this)||this;_this.registerFactory("dataset",datasetFactory,["vCanvas"]);return _this}MSStackedColumn2D.getName=function getName(){return"MSStackedColumn2D"};var _proto=MSStackedColumn2D.prototype;_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){return __checkInvalidSpecificData.call(this)};_proto.getName=function getName(){return"MSStackedColumn2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=MS_STACKED_COLUMN_CHART;config.defaultDatasetType=COLUMN_STR;config.isstacked=true;config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(){return CartesianStackGroup};return MSStackedColumn2D}(MSCartesian);export default MSStackedColumn2D;export{__checkInvalidSpecificData as _checkInvalidSpecificData};