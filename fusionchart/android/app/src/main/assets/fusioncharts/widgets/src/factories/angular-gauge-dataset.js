import{datasetFactory}from"@fusioncharts/core/src/lib";import AngularGaugeDataset from"../dataset/angulargauge";export default function(chart){var dataObj=chart.getFromEnv("dataSource"),pointers=dataObj.pointers||dataObj.dials;if(!pointers){dataObj.dials=pointers={dial:[{value:0}]}}datasetFactory(chart,AngularGaugeDataset,"dataset",1,[pointers])}