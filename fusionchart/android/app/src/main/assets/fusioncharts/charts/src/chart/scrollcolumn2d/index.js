import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MScolumn2D from"../mscolumn2d";import ColumnDataset from"../../dataset/column";import Columngroup from"../../dataset/groups/column-multiseries";import{scrollTo,setAxisScale,resetViewPortConfig,configurer}from"../_internal/utils/scroll-apis";var CHART_STR="Scrollable Multi-series Column Chart",COLUMN_STR="column",PLOT_STR="plot";var ScrollColumn2D=function(_MScolumn2D){_inheritsLoose(ScrollColumn2D,_MScolumn2D);ScrollColumn2D.getName=function getName(){return"ScrollColumn2D"};ScrollColumn2D.includeInputOptions=function includeInputOptions(){return["SwipeGesture"]};function ScrollColumn2D(){var _this;_this=_MScolumn2D.call(this)||this;_this.tooltipConstraint=PLOT_STR;_this.hasScroll=true;_this.defaultPlotShadow=1;_this.binSize=0;_this.eiMethods.scrollTo=scrollTo;return _this}var _proto=ScrollColumn2D.prototype;_proto.getName=function getName(){return"ScrollColumn2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MScolumn2D.prototype.__setDefaultConfig.call(this);var config=this.config;config.defaultDatasetType=COLUMN_STR;config.showzeroplaneontop=1;config.friendlyName=CHART_STR;config.avgScrollPointWidth=40;config.canvasborderthickness=1};_proto.configureAttributes=function configureAttributes(dataObj){_MScolumn2D.prototype.configureAttributes.call(this,dataObj);configurer.call(this,dataObj)};_proto._setAxisScale=function _setAxisScale(){setAxisScale.call(this)};_proto.parseChartAttr=function parseChartAttr(dataObj){_MScolumn2D.prototype.parseChartAttr.call(this,dataObj)};_proto._resetViewPortConfig=function _resetViewPortConfig(){resetViewPortConfig.call(this)};_proto.getDSdef=function getDSdef(){return ColumnDataset};_proto.getDSGroupdef=function getDSGroupdef(){return Columngroup};return ScrollColumn2D}(MScolumn2D);export default ScrollColumn2D;