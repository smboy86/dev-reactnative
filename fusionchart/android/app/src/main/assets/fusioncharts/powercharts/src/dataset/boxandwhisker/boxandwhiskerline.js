import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Linedataset from"@fusioncharts/charts/src/dataset/line";import{pluckNumber,pluck,getFirstValue,toRaphaelColor,preDefStr}from"@fusioncharts/core/src/lib";import{addDep}from"@fusioncharts/core/src/dependency-manager";import boxandwhiskerlineAnimation from"./boxandwhiskerline.animation";var UNDEF,POLYGON=preDefStr.POLYGON,SPOKE=preDefStr.SPOKE,BOLDSTARTTAG="<b>",BOLDENDTAG="</b>",createGroup=function createGroup(attrs,parentContainer,dataset){return dataset.getFromEnv("animationManager").setAnimation({el:"group",attr:attrs,container:parentContainer,component:dataset,label:"group"})};addDep({name:"boxandwhiskerlineAnimation",type:"animationRule",extension:boxandwhiskerlineAnimation});var BoxAndWhiskerLinedataset=function(_Linedataset){_inheritsLoose(BoxAndWhiskerLinedataset,_Linedataset);function BoxAndWhiskerLinedataset(){return _Linedataset.apply(this,arguments)||this}var _proto=BoxAndWhiskerLinedataset.prototype;_proto.getName=function getName(){return"boxandwhiskerline"};_proto.createCoordinates=function createCoordinates(){var dataset=this,dsData=dataset.components.data,yAxis=dataset.getFromEnv("yAxis"),xAxis=dataset.getFromEnv("xAxis"),dataObj,config,i,Px,Py,len=dsData.length;for(i=0;i<len;i++){dataObj=dsData[i];config=dataObj&&dataObj.config;if(dataObj===UNDEF){continue}Px=xAxis.getPixel(config._x);Py=yAxis.getPixel(config._y);config._Px=Px+dataset.getFromEnv("columnXShift")+dataset.getFromEnv("columnWidth")/2;config._Py=Py}};_proto.getAllPlots=function getAllPlots(min,max){var data=this.components.data,allPlots=[],i,len;for(i=0,len=data.length;i<len;i++){if(data[i].config._x>=min||data[i].config._x<=max){allPlots.push(data[i])}}return allPlots};_proto.calculateScrollRange=function calculateScrollRange(){var dataSet=this,conf=dataSet.config,data=dataSet.components.data;conf.scrollMinVal=0;conf.scrollMaxVal=data.length;conf.scrollMinValForLabel=conf.scrollMinVal;conf.scrollMaxValForLabel=conf.scrollMaxVal};_proto._getHoveredPlot=function _getHoveredPlot(chartXVal,chartYVal){var dataset=this,chartX=chartXVal,chartY=chartYVal,xAxis=dataset.getFromEnv("xAxis"),dataStore=dataset.components.data,pointObj,xMin,xMax,len=dataStore.length,returnValue,conf=dataset.config,j,maxRadius=conf&&conf.radius||0,allPlots;chartX+=xAxis.getTranslation();xMin=Math.floor(Math.max(xAxis.getValue(chartX-maxRadius),0));xMax=Math.ceil(Math.min(xAxis.getValue(chartX+maxRadius),len-1));allPlots=dataset.getAllPlots(xMin,xMax);for(j=allPlots.length;j>=0;j--){pointObj=allPlots[j];if(pointObj){returnValue=dataset.isWithinShape(pointObj,j,chartX,chartY);if(returnValue){break}}}return returnValue};_proto._addLegend=function _addLegend(callFromParentDS){if(!callFromParentDS){return}var dataset=this,conf=dataset.config,legend=dataset.getFromEnv("chart").getChildren("legend")[0],legendItem,drawAnchors=pluckNumber(conf.drawanchors,1),config;if(conf.includeinlegend){config={anchorSide:drawAnchors?conf.anchorsides:0,label:getFirstValue(conf.JSONData.seriesname),customLegendIcon:false,spoke:conf.dip==="spoke"?1:0,drawLine:!conf.showline,index:dataset.getJSONIndex()};legendItem=legend.getItem(dataset.config.legendItemId);if(!legendItem){dataset.config.legendItemId=legend.createItem(dataset);legendItem=legend.getItem(dataset.config.legendItemId);dataset.addExtEventListener("fc-click",(function(){legendItem.itemClickFn()}),legendItem)}legendItem.configure(config);legendItem.setStateCosmetics("default",{symbol:{fill:toRaphaelColor({color:conf.anchorbgcolor,alpha:conf.anchorbgalpha}),rawFillColor:conf.anchorbgcolor,stroke:toRaphaelColor({color:conf.anchorbordercolor,alpha:"100"})},background:{legendBackgroundColor:toRaphaelColor(dataset.getFromEnv("legendBackgroundColor")),alpha:20}});if(!dataset.getState("visible")){legendItem.setLegendState("hidden")}else{legendItem.removeLegendState("hidden")}}else if(dataset.config.legendItemId){legend.disposeItem(dataset.config.legendItemId)}};_proto.configureAttributes=function configureAttributes(datasetJSON){_Linedataset.prototype.configureAttributes.call(this,datasetJSON);var dataset=this,JSONData=dataset.config.JSONData,conf=dataset.config;dataset.setState("visible",dataset.getLinkedParent().getState("visible"));conf.skipCommonElements=JSONData.showline;conf.dip=JSONData.dip};_proto.createContainer=function createContainer(){var dataset=this,parent=dataset.getLinkedParent().getLinkedParent(),group=dataset.groupName||dataset.dsGroup||dataset.getType(),parentContainer,parentShadowContainer;!parent.getChildContainer(group+"VcanvasGroup")&&(group="default");parentContainer=parent.getChildContainer("manager-defaultVcanvasGroup-lines");parentShadowContainer=parent.getChildContainer(group+"ShadowVcanvasGroup");!dataset.getContainer("shadowGroup")&&dataset.addContainer("shadowGroup",createGroup({name:"shadow-group"},parentShadowContainer,dataset));!dataset.getContainer("commonElemsGroup")&&dataset.addContainer("commonElemsGroup",createGroup({name:"common-elems-group"},parentContainer,dataset));!dataset.getContainer("plotGroup")&&dataset.addContainer("plotGroup",createGroup({name:"common-elems-group"},parentContainer,dataset));!dataset.getContainer("labelGroup")&&dataset.addContainer("labelGroup",createGroup({name:"label-group",class:"fusioncharts-datalabels",opacity:1},parent.getChildContainer("vcanvasLabelGroup"),dataset))};_proto._setConfigure=function _setConfigure(newDataset,newIndex){var dataSet=this,conf=dataSet.config,chartConfig=dataSet.getFromEnv("chartConfig"),JSONData=dataSet.config.JSONData,setDataArr=newDataset||JSONData.data||[],setData,dataObj,catLen=dataSet.getFromEnv("xAxis").getTicksLen(),newDataSetLen=newDataset&&newDataset.data.length,len=JSONData.seriesname==="Outliers"?setDataArr.length:newDataSetLen||Math.min(catLen,setDataArr.length),dataStore,i,plotIndex,config,outlierIconShape,tempIndex;conf.imageCount=0;dataStore=dataSet.components.data;if(!dataStore){dataStore=dataSet.components.data=[]}conf.maxRadius=-Infinity;for(i=0;i<len;i++){if(newDataset){setData=newDataset&&newDataset.data[i]||{};if(newIndex!==UNDEF){tempIndex=newIndex+i;dataObj=dataStore[tempIndex]}else{tempIndex=dataStore.length-len+i;dataObj=dataStore[tempIndex]}plotIndex=tempIndex}else{dataObj=dataStore[i];setData=setDataArr&&setDataArr[i]||{};plotIndex=i}if(!dataObj){dataObj=dataStore[plotIndex]={}}if(!dataObj.config){dataObj.config={}}if(!dataObj.graphics){dataObj.graphics={}}dataSet._plotConfigure(plotIndex,setData,newDataSetLen);tempIndex&&tempIndex++;config=dataObj&&dataObj.config;outlierIconShape=pluck(setData.dip,JSONData.dip);config.dip=outlierIconShape===POLYGON?0:outlierIconShape===SPOKE?1:0;config.toolText=config.finalTooltext=BOLDSTARTTAG+JSONData.seriesname+chartConfig.tooltipsepchar+BOLDENDTAG+config.displayValue}};return BoxAndWhiskerLinedataset}(Linedataset);export default BoxAndWhiskerLinedataset;