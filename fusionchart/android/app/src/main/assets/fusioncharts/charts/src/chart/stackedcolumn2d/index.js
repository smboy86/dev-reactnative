import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSColumn2D from"../mscolumn2d";import ColumnDataset from"../../dataset/column";import CartesianStackGroup from"../../dataset/groups/cartesian-stack";var CHART_STR="Stacked Column Chart";var StackedColumn2D=function(_MSColumn2D){_inheritsLoose(StackedColumn2D,_MSColumn2D);function StackedColumn2D(){return _MSColumn2D.apply(this,arguments)||this}StackedColumn2D.getName=function getName(){return"StackedColumn2D"};var _proto=StackedColumn2D.prototype;_proto.getName=function getName(){return"StackedColumn2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSColumn2D.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.isstacked=true};_proto.getDSdef=function getDSdef(){return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(){return CartesianStackGroup};return StackedColumn2D}(MSColumn2D);export default StackedColumn2D;