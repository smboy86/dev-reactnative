import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ColumnDataset from"@fusioncharts/charts/src/dataset/column";import{addDep}from"@fusioncharts/core/src/dependency-manager";import realtimeColumnAnimation from"./index.animation";addDep({name:"realtimeColumnAnimation",type:"animationRule",extension:realtimeColumnAnimation});var RealtimeColumnDataset=function(_ColumnDataset){_inheritsLoose(RealtimeColumnDataset,_ColumnDataset);function RealtimeColumnDataset(){return _ColumnDataset.apply(this,arguments)||this}var _proto=RealtimeColumnDataset.prototype;_proto._realTimeConfigure=function _realTimeConfigure(force){var dataSet=this,chart=dataSet.getFromEnv("chart"),datasetStore=dataSet.components.data,tempArr=[],numDisplaySets=chart.config.realTimeConfig.numDisplaySets,catLen;catLen=force?0:Math.min(dataSet.getFromEnv("xAxis").getTicksLen(),datasetStore&&datasetStore.length);if(catLen<numDisplaySets){tempArr.length=numDisplaySets-catLen;dataSet.components.data=tempArr.concat(datasetStore)}else if(catLen>numDisplaySets){dataSet.components.data.splice(numDisplaySets,catLen-numDisplaySets)}dataSet.resetCatPos&&dataSet.resetCatPos()};_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"realtimeColumn"};_proto.resetCatPos=function resetCatPos(){var dataSet=this,dataStore=dataSet.components.data,len=dataStore.length,i;if(dataStore&&len){for(i=0;i<len;i++){if(dataStore[i]&&dataStore[i].config){dataStore[i].config._x=i}}}};return RealtimeColumnDataset}(ColumnDataset);var _realTimeConfigure=RealtimeColumnDataset.prototype._realTimeConfigure,resetCatPos=RealtimeColumnDataset.prototype.resetCatPos;export{_realTimeConfigure,resetCatPos};export default RealtimeColumnDataset;