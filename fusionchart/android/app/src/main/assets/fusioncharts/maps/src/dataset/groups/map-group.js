import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{hasSVG}from"@fusioncharts/core/src/lib";import{addDep}from"@fusioncharts/core/src/dependency-manager";import mapsAnimation from"../_internal/map-entities.animation";var configureChildren=function configureChildren(child){child.configure&&child.configure()};addDep({name:"mapsAnimation",type:"animationRule",extension:mapsAnimation});var MapGroup=function(_ComponentInterface){_inheritsLoose(MapGroup,_ComponentInterface);function MapGroup(){return _ComponentInterface.apply(this,arguments)||this}var _proto=MapGroup.prototype;_proto.getType=function getType(){return"group"};_proto.getName=function getName(){return"mapGroup"};_proto.configure=function configure(){var manager=this;manager._mapChildren(configureChildren)};_proto.createContainer=function createContainer(){var manager=this,parent=manager.getLinkedParent(),animationManager=manager.getFromEnv("animationManager"),pContainer,parentChildContainers=parent.getChildContainer();pContainer=parentChildContainers.plotGroup;!manager.getChildContainer("plotShadow")&&manager.addChildContainer("plotShadow",animationManager.setAnimation({el:"group",attr:{name:"manager-plot-shadow",opacity:1},container:pContainer,component:manager,label:"group"}));!manager.getChildContainer("plot")&&manager.addChildContainer("plot",animationManager.setAnimation({el:"group",attr:{name:"manager-plot",opacity:1},container:pContainer,component:manager,label:"group"}));!manager.getChildContainer("layer0")&&manager.addChildContainer("layer0",animationManager.setAnimation({el:"group",attr:{name:"ann-layer0",opacity:1},container:parentChildContainers.abovePlotGroup,component:manager,label:"group"}));!manager.getChildContainer("layer1")&&manager.addChildContainer("layer1",animationManager.setAnimation({el:"group",attr:{name:"ann-layer1",opacity:1},container:parentChildContainers.abovePlotGroup,component:manager,label:"group"}));if(parent.config.labelsOnTop){manager.getChildContainer("layer0").toFront()}else{manager.getChildContainer("layer0").toBack()}};_proto._transformGroup=function _transformGroup(){var manager=this,chart=this.getFromEnv("chart"),chartInstance=chart.getFromEnv("chartInstance"),animationManager=manager.getFromEnv("animationManager"),jsonData=chart.jsonData,plotGroup=manager.getChildContainer("plot"),plotShadowGroup=manager.getChildContainer("plotShadow"),scalingParams=chart.config.scalingParams,transformGroup=function transformGroup(){return function(event){event.detachHandler();if(hasSVG){if(chartInstance.args.link&&chartInstance.args.clickedEntityBox&&jsonData.chart.linkedcharttransition==="scale"){plotGroup&&animationManager.setAnimation({el:plotGroup,attr:{transform:scalingParams.transformStr},component:manager,label:"group"});plotShadowGroup&&animationManager.setAnimation({el:plotShadowGroup,attr:{transform:scalingParams.transformStr},component:manager,label:"group"})}else{plotGroup&&animationManager.setAnimation({el:plotGroup,attr:{transform:scalingParams.transformStr},component:manager,label:"group"});plotShadowGroup&&animationManager.setAnimation({el:plotShadowGroup,attr:{transform:scalingParams.transformStr},component:manager,label:"group"})}}plotGroup.show();plotShadowGroup.show()}};plotGroup.hide();plotShadowGroup.hide();chart.config.entitiesReady=false;chartInstance.addEventListener("internal.mapdrawingcomplete",transformGroup());chart.checkComplete()};_proto.draw=function draw(){this.createContainer();this._transformGroup()};_proto.getDataLimits=function getDataLimits(allVisible){var manager=this,min=+Infinity,max=-Infinity,maxminObj,numOfColumns=0,getMaxMin=function getMaxMin(_maxminObj){max=Math.max(max,_maxminObj.max);min=Math.min(min,_maxminObj.min)};manager._mapChildren((function(child){if(child.getState("removed")||child.getState("visible")===false){if(allVisible){maxminObj=child.getDataLimits(allVisible);getMaxMin(maxminObj)}return}numOfColumns++;maxminObj=child.getDataLimits(allVisible);getMaxMin(maxminObj)}));if(!numOfColumns){manager.setState("visible",false)}else{manager.setState("visible",true)}if(!this.config.range){this.config.range={};this.config.range.min=this.config.dataMin;this.config.range.max=this.config.dataMax}return{max:max,min:min}};return MapGroup}(ComponentInterface);export default MapGroup;