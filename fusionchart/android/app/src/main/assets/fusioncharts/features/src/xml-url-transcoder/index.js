import{triggerEvent,raiseWarning}from"@fusioncharts/core/src/event-api";import{sourceName,onDataLoadRequest,onDataLoadRequestCancel}from"../utils/url-transcoder-utils";var BASE_FORMAT="xml";var UNDEF;function fetchXML(url,config,callback,silent,chartInstance){if(url===void 0){url=""}if(config===void 0){config={}}triggerEvent("dataLoadRequested",chartInstance,{source:sourceName,url:url,dataFormat:BASE_FORMAT,silent:!!silent,config:config,successcallback:callback},UNDEF,onDataLoadRequest,onDataLoadRequestCancel)}function setXMLUrl(url){this.setChartDataUrl(url,"xmlurl")}function setDataURL(){raiseWarning(this,"11171116293","run","JavaScriptRenderer~setDataURL()",'Use of deprecated "setDataURL()". Replace with "setXMLUrl()".');this.setXMLUrl.apply(this,arguments)}function wrapper(FusionCharts){FusionCharts&&(FusionCharts.prototype.setXMLUrl=setXMLUrl);FusionCharts&&(FusionCharts.prototype.setDataURL=setDataURL);return{format:"xmlurl",toJSON:fetchXML}}export default{extension:wrapper,name:"XMLUrl",type:"transcoder",requiresFusionCharts:true};