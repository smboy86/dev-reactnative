import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import MSStackedColumn2d from"../msstackedcolumn2d";import{setAxisScale,resetViewPortConfig,configurer,scrollTo}from"../_internal/utils/scroll-apis";var CHART_STR="Scrollable MultiSeries Stacked Column Chart",COLUMN_STR="column";var ScrollMSStackedColumn2D=function(_MSStackedColumn2d){_inheritsLoose(ScrollMSStackedColumn2D,_MSStackedColumn2d);ScrollMSStackedColumn2D.getName=function getName(){return"ScrollMSStackedColumn2D"};ScrollMSStackedColumn2D.includeInputOptions=function includeInputOptions(){return["SwipeGesture"]};function ScrollMSStackedColumn2D(){var _this;_this=_MSStackedColumn2d.call(this)||this;_this.hasScroll=true;_this.eiMethods={scrollTo:scrollTo};return _this}var _proto=ScrollMSStackedColumn2D.prototype;_proto.getName=function getName(){return"ScrollMSStackedColumn2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSStackedColumn2d.prototype.__setDefaultConfig.call(this);var config=this.config;config.isstacked=true;config.friendlyName=CHART_STR;config.defaultDatasetType=COLUMN_STR;config.showzeroplaneontop=1;config.avgScrollPointWidth=75;config.canvasborderthickness=1};_proto.configureAttributes=function configureAttributes(dataObj){_MSStackedColumn2d.prototype.configureAttributes.call(this,dataObj);configurer.call(this,dataObj)};return ScrollMSStackedColumn2D}(MSStackedColumn2d);ScrollMSStackedColumn2D.prototype._setAxisScale=setAxisScale;ScrollMSStackedColumn2D.prototype._resetViewPortConfig=resetViewPortConfig;export default ScrollMSStackedColumn2D;