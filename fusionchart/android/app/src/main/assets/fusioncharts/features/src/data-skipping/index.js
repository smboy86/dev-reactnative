import DataSkipping from"./data-skipping-ext";import{allowedCharts}from"./data-skipping-charts";function dataSkip(FusionCharts){FusionCharts.addEventListener("preconfigure",(function onFcPreconfigure(event){var comp=event.sender,chart=comp.getFromEnv("chart");if(!allowedCharts[chart&&chart.getName()]){return}if(comp.getType()==="dataset"&&comp.getLinkedParent().getName()!=="cartesianStackGroup"){comp.setState("applySkippingOnConf",true);DataSkipping.dataSkipping({component:comp,datasetType:comp.getName(),compType:"dataset"})}else if(comp.getName()==="cartesianStackGroup"){comp.setState("applySkippingOnConf",true);DataSkipping.dataSkipping({component:comp,datasetType:comp.getName(),compType:"group"})}}));FusionCharts.addEventListener("preattributeprepared",(function onFcPreAtrributePrepared(event){var chart=event.sender.getFromEnv&&event.sender.getFromEnv("chart");if(!allowedCharts[chart&&chart.getName()]){return}if(event.sender.getType()==="dataset"){var dataset=event.sender,canvasConfig=dataset.getFromEnv("canvasConfig"),width=dataset.getFromEnv("chart").isBar?canvasConfig.canvasHeight:canvasConfig.canvasWidth;if(dataset.getLinkedParent().getName()!=="cartesianStackGroup"){if(dataset.getState("applySkippingOnConf")){dataset.setState("applySkippingOnConf",false)}else{DataSkipping.dataSkipping({component:dataset,compType:"dataset",datasetType:dataset.getName(),width:width})}}}else if(event.sender.getName()==="cartesianStackGroup"){var stackGroup=event.sender,_canvasConfig=stackGroup.getFromEnv("canvasConfig"),_width=stackGroup.getFromEnv("chart").isBar?_canvasConfig.canvasHeight:_canvasConfig.canvasWidth,stackGroupDatasetChild=Object.keys(stackGroup.getChildren())[0];if(stackGroup.getState("applySkippingOnConf")){stackGroup.setState("applySkippingOnConf",false)}else{DataSkipping.dataSkipping({component:stackGroup,compType:"group",datasetType:stackGroup.getChildren(stackGroupDatasetChild)[0].getName(),width:_width})}}}));FusionCharts.addEventListener("dataplotdragend",(function onFcDataPlotDragEnd(event,obj){if(event.sender.getType&&event.sender.getType()==="dataset"){var dataset=event.sender,skipInfo=dataset.getSkippingInfo&&dataset.getSkippingInfo(),skippingApplied=skipInfo&&skipInfo.skippingApplied;if(skippingApplied){DataSkipping.updateDragMap({component:dataset,compType:"dataset",evenType:"dataplotdragend",eventArgs:obj})}}}))}export default{extension:dataSkip,name:"DataSkipping",type:"extension",requiresFusionCharts:true};