import AnnotationExtension from"./ext-annotation";import pickBy from"ramda/src/pickBy";var isChartAPI=function isChartAPI(component){return component.getType()==="chartAPI"},isRootAttr=function isRootAttr(value,key){return key!=="groups"&&key!=="items"},onFCInstantiated=function onFCInstantiated(event){var component=event.sender;if(isChartAPI(component)){component.registerFactory("annotation",(function(chartComponent){var annotationData=chartComponent.getFromEnv("dataSource").annotations,chartAnnotations=chartComponent.getChildren().annotation,ext=chartAnnotations&&chartAnnotations[0];delete chartComponent.getFromEnv("chartInstance").annotations;if(annotationData){if(!ext){ext=new AnnotationExtension(pickBy(isRootAttr,annotationData));chartComponent.attachChild(ext,"annotation");ext.config.drawn=false}ext._JSONData=annotationData;ext.configure(annotationData);chartComponent.getFromEnv("chartInstance").annotations=ext}}))}};function FCWrapper(FusionCharts){FusionCharts.addEventListener("instantiated",onFCInstantiated)}export default{extension:FCWrapper,name:"Annotation",type:"extension",requiresFusionCharts:true};