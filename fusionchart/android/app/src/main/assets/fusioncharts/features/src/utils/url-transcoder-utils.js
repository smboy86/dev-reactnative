import Ajax from"@fusioncharts/core/src/ajax";import{triggerEvent}from"@fusioncharts/core/src/event-api";var SOURCE_NAME="XmlHttpRequest";var UNDEF;function onDataLoadComplete(event,args){event.sender.jsVars.stallLoad=false;event.sender.setChartData(args.dataSource,args.dataFormat,args.config,args.successcallback,args.silent)}function onDataLoadCancel(event,args){triggerEvent("dataLoadCancelled",event.sender,args);args.xmlHttpRequestObject.abort()}function xmlhttpSuccess(responseText,wrapper,data,url){var args=data.args;args.dataSource=responseText;args.xmlHttpRequestObject=wrapper;args.source=SOURCE_NAME;args.url=url;triggerEvent("dataLoadRequestCompleted",data.obj,args,UNDEF,onDataLoadComplete,onDataLoadCancel)}function xmlhttpFailure(resp,wrapper,data){var obj=data.obj,args=data.args;args.error=resp;args.httpStatus=wrapper.xmlhttp&&wrapper.xmlhttp.status?wrapper.xmlhttp.status:-1;args.xmlHttpRequestObject=wrapper;obj._addChartDependency("data",{resolve:function resolve(){return{state:1,msg:obj.options.dataLoadErrorMessage,msgStyle:{image:{imageHAlign:obj.args.dataLoadErrorMessageImageHAlign||obj.options.baseChartMessageImageHAlign,imageVAlign:obj.args.dataLoadErrorMessageImageVAlign||obj.options.baseChartMessageImageVAlign,imageAlpha:obj.args.dataLoadErrorMessageImageAlpha||obj.options.baseChartMessageImageAlpha,imageScale:obj.args.dataLoadErrorMessageImageScale||obj.options.baseChartMessageImageScale},message:{color:obj.args.dataLoadErrorMessageColor||obj.options.baseChartMessageColor,fontFamily:obj.args.dataLoadErrorMessageFont||obj.options.baseChartMessageFont,fontSize:obj.args.dataLoadErrorMessageFontSize||obj.options.baseChartMessageFontSize}}}}});obj._setState();triggerEvent("dataLoadError",obj,args)}function onDataLoadRequest(event,args){var chart=event.sender,state=chart.__state,url=args.url;chart.options.dataSource=args.url;if(!state.dhmXhrObj){state.dhmXhrObj=new Ajax(xmlhttpSuccess,xmlhttpFailure)}state.dhmXhrObj.get(typeof window.decodeURIComponent==="function"?window.decodeURIComponent(url):window.unescape(url),{obj:chart,args:args})}function onDataLoadRequestCancel(event,args){var chart=event.sender,state=chart.__state;triggerEvent("dataLoadRequestCancelled",chart,args);if(state&&state.dhmXhrObj){state.dhmXhrObj.abort()}}export{SOURCE_NAME as sourceName,onDataLoadRequest,onDataLoadRequestCancel};