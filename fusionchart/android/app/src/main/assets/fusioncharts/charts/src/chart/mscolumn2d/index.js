import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSCartesian from"../_internal/mscartesian";import ColumnDataset from"../../dataset/column";import ColumnMultiSeriesGroup from"../../dataset/groups/column-multiseries";var MS_COLUMN_CHART="Multi-series Column Chart",COLUMN_STR="column";var MSColumn2D=function(_MSCartesian){_inheritsLoose(MSColumn2D,_MSCartesian);MSColumn2D.getName=function getName(){return"MSColumn2D"};var _proto=MSColumn2D.prototype;_proto.getName=function getName(){return"MSColumn2D"};function MSColumn2D(){var _this;_this=_MSCartesian.call(this)||this;_this.eiMethods={};return _this}_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian.prototype.__setDefaultConfig.call(this);this.config.friendlyName=MS_COLUMN_CHART;this.config.defaultDatasetType=COLUMN_STR;this.config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(){return ColumnMultiSeriesGroup};return MSColumn2D}(MSCartesian);export default MSColumn2D;