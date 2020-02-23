import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import AreaDataset from"../area";import{toRaphaelColor,stubFN,preDefStr,UNDEF}from"@fusioncharts/core/src/lib";import _calculateMaxMin from"../_internal/spline.helper";import{addDep}from"@fusioncharts/core/src/dependency-manager";import{getSplinePath}from"../_internal/msspline-path";import mssplineareaAnimation from"./index.animation";var BLANKSTRING="",SETROLLOVERATTR=preDefStr.setRolloverAttrStr,SETROLLOUTATTR=preDefStr.setRolloutAttrStr,MAX_MITER_LINEJOIN=2,APPEARING="appearing",UPDATING="updating",DISAPPEARING="disappearing";addDep({name:"mssplineareaAnimation",type:"animationRule",extension:mssplineareaAnimation});var MSSplineAreaDataset=function(_AreaDataset){_inheritsLoose(MSSplineAreaDataset,_AreaDataset);function MSSplineAreaDataset(){var _this;_this=_AreaDataset.call(this)||this;_this.drawCommonElements=stubFN;return _this}var _proto=MSSplineAreaDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.configureAttributes=function configureAttributes(dataObj){_AreaDataset.prototype.configureAttributes&&_AreaDataset.prototype.configureAttributes.call(this,dataObj);_calculateMaxMin.call(this)};_proto.getDataLimits=function getDataLimits(){return{max:this.config.maxValue,min:this.config.minValue}};_proto.drawPlots=function drawPlots(){var dataSet=this,conf=dataSet.config,chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,len,i,num,xAxis=dataSet.getFromEnv("xAxis"),xPos,yPos,lastXPos,lastYPos=null,linePathArr=[],dataTemp=[],pathObject,config,dataStore=dataSet.components.data,dataObj,setElement,hotElement,setValue,connectNullData=chartConfig.connectnulldata,minimizeTendency=chartConfig.minimizetendency,plotBorderDashStyle=conf.plotBorderDashStyle,plotBorderThickness=conf.plotborderthickness,container=dataSet.getContainer(),pathArr=[],splineElementDummy=dataSet.getGraphicalElement("splineElement"),splineElement,colorArr=conf.fillColor,removeDataArr=dataSet.components.removeDataArr||[],removeDataArrLen=removeDataArr.length,shadowContainer=container&&container.shadowGroup,shadow=conf.shadow,hoverEffects,visible=dataSet.getState("visible"),anchorAlpha,radius,attr,animState,isAnchorVisible,anchorShadow,anchorProps={},isOnlyLineBorder=!chartConfig.drawfullareaborder,plotBorderColor=conf.plotborderColorObject,connectorDummy=dataSet.getGraphicalElement("connector"),connector,animationManager=dataSet.getFromEnv("animationManager"),imageElement,splineElementAttr,connectorAttr,scrollMinVal,scrollMaxVal,_oldStartIndex=conf._oldStartIndex,_oldEndIndex=conf._oldEndIndex,JSONData=dataSet.config.JSONData,seriesType=JSONData.renderas||chart.config.defaultDatasetType,isSplineArea=/area/gi.test(seriesType);conf.imagesLoaded=0;if(!dataStore){dataStore=dataSet.components.data}len=xAxis.getTicksLen();scrollMinVal=conf.scrollMinVal;scrollMaxVal=conf.scrollMaxVal;if(scrollMinVal>_oldStartIndex){dataSet.flushOnScroll(_oldStartIndex,scrollMinVal>_oldEndIndex?_oldEndIndex:scrollMinVal)}if(scrollMaxVal<_oldEndIndex){dataSet.flushOnScroll(scrollMaxVal<_oldStartIndex?_oldStartIndex:scrollMaxVal,_oldEndIndex)}conf._oldStartIndex=scrollMinVal;conf._oldEndIndex=scrollMaxVal;for(i=scrollMinVal;i<scrollMaxVal;i++){dataObj=dataStore[i];if(!dataObj){continue}config=dataObj&&dataObj.config;setValue=config.setValue;anchorProps=config.anchorProps;anchorShadow=anchorProps.shadow;setElement=dataObj.graphics.element;hotElement=dataObj.graphics.hotElement;imageElement=dataObj.graphics.image;if(setValue===null){setElement&&setElement.hide();hotElement&&hotElement.hide();imageElement&&imageElement.hide();if(!connectNullData){lastYPos=null}}else{yPos=config._Py;xPos=config._Px;if(visible===false){yPos=config._Pby}dataTemp.push({x:xPos,y:yPos,lastXPos:lastXPos,lastYPos:lastYPos});lastXPos=xPos;lastYPos=yPos;anchorAlpha=anchorProps.anchorAlpha;radius=anchorProps.radius;isAnchorVisible=radius&&anchorAlpha;hoverEffects=config.hoverEffects;if(!setElement){animState=APPEARING}else{if(visible&&isAnchorVisible){animState=UPDATING}else{animState=DISAPPEARING}}if(anchorProps.imageUrl){dataSet.drawAnchorImage(dataObj)}else{attr=Object.assign({},config.props.element.attr);if(animState==="disappearing"||!visible){attr=UNDEF}setElement=dataObj.graphics.element=animationManager.setAnimation({el:setElement||"path",attr:attr,container:container.plotGroup,component:dataSet,label:"anchor"});imageElement&&imageElement.hide();setElement&&setElement.show().shadow(anchorShadow,container.anchorShadowGroup).data("anchorRadius",anchorProps.radius).data("anchorHoverRadius",hoverEffects.anchorRadius).data("eventArgs",config.eventArgs);if(hoverEffects.enabled){setElement&&setElement.data("anchorRadius",anchorProps.radius).data("anchorHoverRadius",hoverEffects.anchorRadius).data("hoverEnabled",hoverEffects.enabled).data(SETROLLOVERATTR,hoverEffects.attrs.setRolloverAttr).data(SETROLLOUTATTR,hoverEffects.attrs.setRolloutAttr)}}}}num=len;pathObject=getSplinePath(dataTemp,config&&config._Pby,minimizeTendency,isSplineArea,num);pathArr=pathObject.closedPath;pathArr=pathArr.join();splineElementAttr={path:pathArr,stroke:toRaphaelColor(plotBorderColor),"stroke-width":isOnlyLineBorder?0:plotBorderThickness,fill:toRaphaelColor(colorArr),"stroke-linecap":"round","stroke-linejoin":plotBorderThickness>MAX_MITER_LINEJOIN?"round":"miter","stroke-dasharray":plotBorderDashStyle};if(!dataSet.getState("visible")){splineElementAttr=UNDEF}splineElement=animationManager.setAnimation({el:splineElementDummy||"path",attr:splineElementAttr,container:container.commonElemsGroup,component:dataSet,label:"line"});if(!splineElement&&splineElementDummy){dataSet.removeGraphicalElement(splineElementDummy)}if(!splineElementDummy){dataSet.addGraphicalElement("splineElement",splineElement)}if(pathArr===BLANKSTRING||!dataSet.getState("visible")){splineElement&&splineElement.hide()}else{splineElement.show().shadow(shadow,shadowContainer)}if(isOnlyLineBorder){linePathArr=pathObject.openPath.join();connectorAttr={path:linePathArr,stroke:toRaphaelColor(plotBorderColor),"stroke-width":plotBorderThickness,"stroke-linecap":"round","stroke-linejoin":plotBorderThickness>MAX_MITER_LINEJOIN?"round":"miter","stroke-dasharray":plotBorderDashStyle,name:"connector"};connector=animationManager.setAnimation({el:connectorDummy||"path",attr:connectorAttr,container:container.commonElemsGroup,state:!connectorDummy?"appearing":dataSet.getState("visible")?"updating":"disappearing",component:dataSet,label:"connectorLine"});if(!connectorDummy){dataSet.addGraphicalElement("connector",connector)}}else{connector&&dataSet.removeGraphicalElement(connector)}for(i=0;i<removeDataArrLen;i++){dataSet._removeDataVisuals(removeDataArr.shift())}};_proto.getName=function getName(){return"splinearea"};return MSSplineAreaDataset}(AreaDataset);export default MSSplineAreaDataset;