import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScrollBar2D from"../scrollbar2d";import CartesianStackGroup from"../../dataset/groups/cartesian-stack";var CHART_STR="Scrollable Stacked Bar Chart";var ScrollStackedBar2D=function(_ScrollBar2D){_inheritsLoose(ScrollStackedBar2D,_ScrollBar2D);function ScrollStackedBar2D(){return _ScrollBar2D.apply(this,arguments)||this}ScrollStackedBar2D.getName=function getName(){return"ScrollStackedBar2D"};var _proto=ScrollStackedBar2D.prototype;_proto.getName=function getName(){return"ScrollStackedBar2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_ScrollBar2D.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.isstacked=true;config.avgScrollPointWidth=75;config.canvasborderthickness=1};_proto.getDSGroupdef=function getDSGroupdef(){return CartesianStackGroup};return ScrollStackedBar2D}(ScrollBar2D);export default ScrollStackedBar2D;