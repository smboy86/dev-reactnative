import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import AxisRefComponent from"./axis-ref-component";import{getCoordinates}from"@fusioncharts/utils/src/scale-utils/polar-util";import{pluckNumber}from"../lib";import{addDep}from"../dependency-manager";import axisRefPolarAnimation from"./axis-ref-polar.animation";var M="M",Z="Z",L="L",getRadius=function getRadius(axis,point){var scale=axis.getScale(),range=axis.config.axisRange;return Math.abs(scale.getRangeValue(point)-scale.getRangeValue(range.min))};addDep({name:"axisRefPolarAnimation",type:"animationRule",extension:axisRefPolarAnimation});var AxisRefPolarVisual=function(_AxisRefComponent){_inheritsLoose(AxisRefPolarVisual,_AxisRefComponent);function AxisRefPolarVisual(){return _AxisRefComponent.apply(this,arguments)||this}var _proto=AxisRefPolarVisual.prototype;_proto.getType=function getType(){return"axisRefVisuals"};_proto.getName=function getName(){return"axisRefVisualsPolar"};_proto.createLine=function createLine(lineInfo,axis){var axisRef=this;if(axis.getName()==="polarCategory"){return axisRef.createNormalLine(lineInfo,axis)}else if(axis.getName()==="numeric"){return axisRef.createRadialLine(lineInfo,axis)}};_proto.createRadialLine=function createRadialLine(lineInfo,axis){var axisRef=this,xAxis=axisRef.getFromEnv("xAxis")[0],xAxisConfig=xAxis.config,category=xAxisConfig.tickValues.tickValue,yAxis=axis,axisRefConfig=axisRef.config,containersArr=axisRefConfig.containers,container=containersArr[lineInfo.layer],animationManager=axisRef.getFromEnv("animationManager"),toolTipController=axisRef.getFromEnv("toolTipController"),i,key,min,max,radius,lineAttr=lineInfo.attr,pathAr=[M],coordinate,compId=yAxis.getId(),eleId=lineInfo.id||lineInfo.from,lineEleId=compId+"_"+eleId,handlers=lineInfo.handlers,element=axisRef.getGraphicalElement(lineEleId);radius=getRadius(yAxis,lineInfo.from);min=0;max=category?category.length-1:0;for(i=min;i<=max;i++){coordinate=getCoordinates({radius:radius,theta:i},xAxis);pathAr.push(coordinate.x,coordinate.y,L)}pathAr.pop();pathAr.push(Z);lineAttr.path=pathAr;element=axisRef.addGraphicalElement(lineEleId,animationManager.setAnimation({container:container,el:element||"path",attr:lineAttr,component:axisRef,label:"path"}));if(lineInfo.toolText){toolTipController.enableToolTip(element,lineInfo.toolText)}else{toolTipController.disableToolTip(element)}for(key in handlers){if(handlers.hasOwnProperty(key)){element.on(key,handlers[key].bind(axis))}}return[lineEleId]};_proto.createNormalLine=function createNormalLine(lineInfo,axis){var axisRef=this,axisRefConfig=axisRef.config,axisConfig=axis.config,radius=pluckNumber(axisConfig.radius,0),pathAr=[M],containersArr=axisRefConfig.containers,container=containersArr[lineInfo.layer],animationManager=axisRef.getFromEnv("animationManager"),toolTipController=axisRef.getFromEnv("toolTipController"),coordinate,key,centerX=axisConfig.axisDimention.centerX,centerY=axisConfig.axisDimention.centerY,compId=axis.getId(),eleId=lineInfo.id||lineInfo.from,lineEleId=compId+"_"+eleId,handlers=lineInfo.handlers,element=axisRef.getGraphicalElement(lineEleId);pathAr.push(centerX,centerY,L);coordinate=getCoordinates({radius:radius,theta:lineInfo.from},axis);pathAr.push(coordinate.x,coordinate.y);lineInfo.attr.path=pathAr;element=axisRef.addGraphicalElement(lineEleId,animationManager.setAnimation({container:container,el:element||"path",attr:lineInfo.attr,component:axisRef,label:"path"}));if(lineInfo.toolText){toolTipController.enableToolTip(element,lineInfo.toolText)}else{toolTipController.disableToolTip(element)}for(key in handlers){if(handlers.hasOwnProperty(key)){element.on(key,handlers[key].bind(axis))}}return[lineEleId]};_proto.createBand=function createBand(){return[]};return AxisRefPolarVisual}(AxisRefComponent);export default AxisRefPolarVisual;