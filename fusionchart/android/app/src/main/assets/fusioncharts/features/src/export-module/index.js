import ExportModule from"./export";var isChartAPI=function isChartAPI(component){return component.getType()==="chartAPI"},UNDEF;function exportChart(options){if(options===void 0){options={}}var exportModule=this.apiInstance.getChildren("exportModule");exportModule=exportModule&&exportModule[0];if(exportModule!==UNDEF){exportModule.exportChart(options);return true}return false}function exporter(FusionCharts){FusionCharts.addEventListener("instantiated",(function onFcInstantiated(event){var component=event.sender;if(isChartAPI(component)){component.registerFactory("export",(function(chartComponent){var exportModule;component.getFromEnv("chartInstance").exportChart=exportChart;if(Number(chartComponent.getFromEnv("dataSource").chart.exportenabled)){if(!chartComponent.getChildren("exportModule")){exportModule=new ExportModule;chartComponent.attachChild(exportModule,"exportModule");exportModule.addToEnv("chartInstance",chartComponent.getFromEnv("chartInstance"));exportModule.addToEnv("chartMenuList",chartComponent.getFromEnv("chartMenuList"))}else{exportModule=chartComponent.getChildren("exportModule")[0]}exportModule.configure({chartConfig:chartComponent.getFromEnv("dataSource").chart})}}),["toolbox"])}}))}export default{extension:exporter,name:"Export",type:"extension",requiresFusionCharts:true};