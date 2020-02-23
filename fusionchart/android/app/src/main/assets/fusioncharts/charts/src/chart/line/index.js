import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import SSCartesian from"../_internal/sscartesian";import LineDataset from"../../dataset/line";import{HUNDREDSTRING,preDefStr}from"@fusioncharts/core/src/lib";var UNDEF,SEVENTYSTRING=preDefStr.SEVENTYSTRING,LINE_CHART="Line Chart",LINE_STR="line";var Line=function(_SSCartesian){_inheritsLoose(Line,_SSCartesian);Line.getName=function getName(){return"Line"};function Line(){var _this;_this=_SSCartesian.call(this)||this;_this.defaultPlotShadow=1;_this.axisPaddingLeft=0;_this.axisPaddingRight=0;return _this}var _proto=Line.prototype;_proto.getName=function getName(){return"Line"};_proto.__setDefaultConfig=function __setDefaultConfig(){_SSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=LINE_CHART;config.singleseries=true;config.defaultDatasetType=LINE_STR;config.anchorborderthickness=1;config.anchorimageurl=UNDEF;config.anchorimagepadding=1;config.anchorsides=1;config.anchoralpha=UNDEF;config.anchorbgalpha=HUNDREDSTRING;config.anchorimagealpha=HUNDREDSTRING;config.anchorimagescale=100;config.anchorstartangle=90;config.anchorshadow=0;config.anchorbgcolor=UNDEF;config.anchorbordercolor=UNDEF;config.anchorradius=3;config.showvalues=1;config.plotfillalpha=SEVENTYSTRING;config.linedashlen=5;config.linedashgap=4;config.linedashed=UNDEF;config.linealpha=HUNDREDSTRING;config.linethickness=2;config.drawfullareaborder=1;config.connectnulldata=0;config.zeroplanethickness=1;config.enablemousetracking=true;config.zeroplanealpha=40;config.showzeroplaneontop=0;config.defaultcrosslinethickness=1};_proto.getDSdef=function getDSdef(){return LineDataset};return Line}(SSCartesian);export default Line;