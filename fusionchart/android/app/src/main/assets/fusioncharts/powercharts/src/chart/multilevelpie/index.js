import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import CommonAPI from"@fusioncharts/charts/src/chart/_internal/commonchartapi";import datasetFactory from"../../factories/mlpie-dataset";var MULTILEVELPIE="multiLevelPie";var MultilevelPie=function(_CommonAPI){_inheritsLoose(MultilevelPie,_CommonAPI);MultilevelPie.getName=function getName(){return"MultilevelPie"};function MultilevelPie(){var _this;_this=_CommonAPI.call(this)||this;_this.defaultPaletteOptions=null;_this.registerFactory("dataset",datasetFactory,["canvas"]);return _this}var _proto=MultilevelPie.prototype;_proto.getName=function getName(){return"MultilevelPie"};_proto.__setDefaultConfig=function __setDefaultConfig(){_CommonAPI.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=false;config.hasLegend=false;config.defaultDatasetType=MULTILEVELPIE;config.valuefontbold=0;config.skipCanvasDrawing=true};_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){var categories=this.getFromEnv("dataSource").category;if(!(categories&&categories[0])||!Array.isArray(categories)){return true}};_proto._spaceManager=function _spaceManager(){var availableHeight,iapi=this,config=iapi.config;iapi._allocateSpace(iapi._manageActionBarSpace&&iapi._manageActionBarSpace(config.availableHeight*.225)||{});availableHeight=config.canvasHeight*.7;iapi._manageChartMenuBar(availableHeight);iapi.allocateDimensionOfChartMenuBar()};return MultilevelPie}(CommonAPI);export default MultilevelPie;