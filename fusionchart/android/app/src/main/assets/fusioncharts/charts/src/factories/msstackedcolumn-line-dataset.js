import msStackedColumnDatasetFactory from"./msstackedcolumn-dataset";import{datasetFactory}from"@fusioncharts/core/src/lib";var removeLineSet=function removeLineSet(component){var lineSet=component.getChildren("dataset_line"),i;for(i=lineSet&&lineSet.length-1;i>-1;i--){lineSet[i].remove()}};export default function(chart){var jsonData=chart.getFromEnv("dataSource"),dataset=jsonData.dataset,lineSets=jsonData.lineset,linesetStartIndex,indices,canvas=chart.getChildren("canvas")[0],vCanvas=canvas.getChildren("vCanvas")[1];if(!dataset&&lineSets.length===0){chart.setChartMessage();return}msStackedColumnDatasetFactory(chart);linesetStartIndex=chart.config._lastDatasetIndex+1;if(lineSets&&lineSets.length){indices=Array(lineSets.length).fill(linesetStartIndex).map((function(n,j){return n+j}));datasetFactory(vCanvas,chart.getDSdef("line"),"dataset_line",lineSets.length,lineSets,indices)}else{removeLineSet(vCanvas)}}