import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import FunnelPyramidBase from"../_internal/funnelpyramidbase";import PyramidDataset from"../../dataset/pyramid";var DS_TYPE="pyramid",FRIENDLY_NAME="Funnel Chart";var Pyramid=function(_FunnelPyramidBase){_inheritsLoose(Pyramid,_FunnelPyramidBase);Pyramid.getName=function getName(){return"Pyramid"};function Pyramid(){var _this;_this=_FunnelPyramidBase.call(this)||this;_this.useSortedData=false;return _this}var _proto=Pyramid.prototype;_proto.getName=function getName(){return"Pyramid"};_proto.__setDefaultConfig=function __setDefaultConfig(){_FunnelPyramidBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.defaultDatasetType=DS_TYPE};_proto.configureAttributes=function configureAttributes(){_FunnelPyramidBase.prototype.configureAttributes.call(this);this.config.PLOT_COLOR_INDEX_START=0};_proto.getDSdef=function getDSdef(){return PyramidDataset};return Pyramid}(FunnelPyramidBase);export default Pyramid;