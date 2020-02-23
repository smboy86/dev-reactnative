import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Ajax from"@fusioncharts/core/src/ajax";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{componentFactory}from"@fusioncharts/core/src/lib";var MS_MULTIPLIER=1e3;var UNDEF,THRESHOLD_MS=10,initializeDataStreamer=function initializeDataStreamer(chart){chart.registerFactory("dataStreamer",(function(){var ds;if(DataStreamer&&chart.config.realtimeEnabled){componentFactory(chart,DataStreamer,"dataStreamer",1);ds=chart.getChildren("dataStreamer")[0];ds.configure();chart.addToEnv("dataStreamer",ds)}}))},dataStreamerExt={},onFcInstantiated=function onFcInstantiated(event){var component=event.sender;if(component.getType()==="chartAPI"){initializeDataStreamer(component)}};var DataStreamer=function(_ComponentInterface){_inheritsLoose(DataStreamer,_ComponentInterface);function DataStreamer(){var _this2;_this2=_ComponentInterface.call(this)||this;_this2._handlerFn=function(_this){return function(){var config=_this.config;if(config){config.rtPreInit===UNDEF&&(config.rtPreInit=false);config._rtPaused&&delete config._rtPaused;if(!config.rtStateChanged){config.rtStateChanged=true;_this.processRealtimeStateChange(arguments)}}}}(_assertThisInitialized(_this2));_this2._handlerStop=function(_this){return function(){_this._dispose()}}(_assertThisInitialized(_this2));return _this2}var _proto=DataStreamer.prototype;_proto.getType=function getType(){return"dataStreamer"};_proto.getName=function getName(){return"dataStreamer"};DataStreamer.resetTimeout=function resetTimeout(fn,ms,id){clearTimeout(id);return setTimeout(fn,ms)};_proto.configure=function configure(){var ds=this,config=ds.config,refreshMs,updateMs,chartObj,chart=ds.getLinkedParent(),realTimeConfig,chartAttr=chart.getFromEnv("dataSource")&&chart.getFromEnv("dataSource").chart;chartObj=chart.getFromEnv("chartInstance");realTimeConfig=chart.config.realTimeConfig;config.clearMs=realTimeConfig.clearInterval*MS_MULTIPLIER;config.updateMs=updateMs=realTimeConfig.updateInterval*MS_MULTIPLIER;config.refreshMs=refreshMs=realTimeConfig.refreshInterval*MS_MULTIPLIER;ds.addEvents();if(refreshMs<updateMs){config.refreshMs=updateMs}config.dataStamp=chartAttr.datastamp;ds.config.chartObj=chartObj;chartObj.jsVars&&(chartObj.jsVars._rtLastUpdatedData=null);ds.updateIntervalHandler(0,true);ds.refreshVisualHandler(null,null,true);ds.initiateResetVisual(true);config._rtAjaxLatencyStart=null;config._rtAjaxLatency=null;ds.addToEnv("realtimeDrawingLatency",0)};_proto._dispose=function _dispose(){var ds=this;ds.updateIntervalHandler(0,true);ds.refreshVisualHandler(null,null,true);ds.initiateResetVisual(true);_ComponentInterface.prototype._dispose.call(this)};_proto.processRealtimeStateChange=function processRealtimeStateChange(){var ds=this,config=ds.config,chartObj=ds.config.chartObj,state=chartObj.__state,chart=ds.getLinkedParent(),chartConfig=chart.config,realtimeEnabled=chartConfig.realtimeEnabled,dataUrl=chartConfig.realTimeConfig.dataStreamURL,ajaxObj;if(state.dataSetDuringConstruction&&!config.rtStateChanged&&config.rtPreInit===UNDEF){if(chartObj.dataReady()){config.rtStateChanged=true;config.rtPreInit=true}else{config.rtPreInit=false}}if(!config.rtStateChanged){return}config.rtStateChanged=false;if(!chart){return}ajaxObj=config._rtAjaxObj;if(realtimeEnabled){if(config._rtPaused===UNDEF){config._rtPaused=false}config._rtDataUrl=dataUrl;ds.initiateResetVisual();ajaxObj=config._rtAjaxObj||(config._rtAjaxObj=new Ajax);ajaxObj.onSuccess||(ajaxObj.onSuccess=function(){if(!ds.getFromEnv("chartConfig").realTimeConfig.dataStreamURL){return}ds.setState("ajaxRequested",true);ds.responseTextHandler(arguments[0]);config._rtAjaxLatencyStart&&(config._rtAjaxLatency=new Date-config._rtAjaxLatencyStart||0);ds.refreshVisualHandler({data:config.responseText,source:"XmlHttpRequest",url:config.url,networkLatency:config._rtAjaxLatency},config._rtAjaxLatency+(config._firstUpdate?new Date-config._firstUpdate:0),!ds.getFromEnv("chartConfig").realTimeConfig.dataStreamURL);config._firstUpdate=UNDEF;if(!config._rtPaused){if(config._rtAjaxLatency>=config.updateMs){config._rtAjaxLatency=config.updateMs-1}}ds.updateIntervalHandler(config._rtAjaxLatency,config._rtPaused)});ajaxObj.onError||(ajaxObj.onError=function(){var resp=arguments[0],wrapper=arguments[1],url=arguments[3];config._rtAjaxLatencyStart&&(config._rtAjaxLatency=new Date-config._rtAjaxLatencyStart);ds.setState("ajaxRequested",false);chart.fireChartInstanceEvent("realTimeUpdateError",{source:"XmlHttpRequest",url:url,xmlHttpRequestObject:wrapper.xmlhttp,error:resp,httpStatus:wrapper.xmlhttp&&wrapper.xmlhttp.status?wrapper.xmlhttp.status:-1,networkLatency:config._rtAjaxLatency});ds.updateIntervalHandler(0,!chartObj.isActive())});if(!config._rtPaused){ds.updateIntervalHandler(0);config._firstUpdate=new Date}}};_proto.responseTextHandler=function responseTextHandler(responseText){var ds=this,config=ds.config,chart=ds.getFromEnv("chart"),chartConf=ds.getFromEnv("chartConfig"),realtimeEnabled=chartConf.realtimeEnabled,feedData=chart.feedData,updateObj=chart._linearDataParser(responseText);config.responseText=responseText;if(ds.getFromEnv("chartInstance").isActive()&&feedData&&realtimeEnabled){config.dataStamp=updateObj.dataStamp?updateObj.dataStamp:null;chart.realTimeUpdate(updateObj)}};_proto.initiateResetVisual=function initiateResetVisual(kill){if(kill===void 0){kill=false}if(kill){clearTimeout(this.config._toClearChart);return}var ds=this,config=ds.config,chart=ds.getFromEnv("chart"),resetVisual=function resetVisual(){chart._clearChart&&chart._clearChart();if(config.clearMs){config._toClearChart=DataStreamer.resetTimeout(resetVisual,config.clearMs,config._toClearChart)}else{clearTimeout(config._toClearChart)}};if(!kill){if(config.clearMs){config._toClearChart=DataStreamer.resetTimeout(resetVisual,config.clearMs,config._toClearChart)}}};_proto.updateIntervalHandler=function updateIntervalHandler(latency,kill){if(latency===void 0){latency=0}if(kill===void 0){kill=false}if(kill){clearTimeout(this.config&&this.config._toRealtimeUpdate);return}var ds=this,config=ds.config,ajaxObj=config._rtAjaxObj,skew,updateMs=config.updateMs;ds.requestData||(ds.requestData=function(){var dataUrl=ds.getFromEnv("chartConfig").realTimeConfig.dataStreamURL,dataStamp=config.dataStamp,ajaxObject=config._rtAjaxObj,url=dataUrl;url+=(dataUrl.indexOf("?")===-1?"?num=":"&num=")+Math.random();dataStamp&&(url+="&dataStamp="+dataStamp);config.url=url;ajaxObject.open&&ajaxObject.abort();!!dataUrl&&ajaxObject.get(url);config._rtAjaxLatencyStart=new Date});if(updateMs<=0){config._toRealtimeUpdate=clearTimeout(config._toRealtimeUpdate);ajaxObj&&ajaxObj.abort();return}else if(updateMs<THRESHOLD_MS){updateMs=THRESHOLD_MS}if(!kill){skew=updateMs-latency;config._toRealtimeUpdate=DataStreamer.resetTimeout(ds.requestData,skew,config._toRealtimeUpdate)}};_proto.refreshVisualHandler=function refreshVisualHandler(info,_latency,kill){if(_latency===void 0){_latency=0}if(kill===void 0){kill=false}if(kill){clearTimeout(this.config._toRealtimeDraw);this._clearCachedData();this.config.isAlive=false;return}var ds=this,config=ds.config,refreshMs=config.refreshMs,chart=ds.getFromEnv("chart"),chartConf=ds.getFromEnv("chartConfig"),realtimeEnabled=chartConf.realtimeEnabled,isActive=ds.getFromEnv("chartInstance").isActive(),skew,now=(new Date).getTime(),feedData=chart.feedData,latency=_latency;if(!ds.getState("ajaxRequested")||!config.lastRTDrawAt){config.lastRTDrawAt=now}ds.config.sourceInfo=info;ds._rtDraw||(ds._rtDraw=function(){config.isAlive=false;config.lastRTDrawAt=(new Date).getTime();chart.realTimeDraw(ds.config.sourceInfo)});if(isActive&&feedData&&realtimeEnabled&&!kill&&!config.isAlive){config.isAlive=true;latency+=now-config.lastRTDrawAt+ds.getFromEnv("realtimeDrawingLatency");skew=refreshMs-latency>0?refreshMs-latency:0;config._toRealtimeDraw=DataStreamer.resetTimeout(ds._rtDraw,skew,config._toRealtimeDraw)}};_proto._clearCachedData=function _clearCachedData(){this.getFromEnv("chart").config.cachedArrivedJSON={}};_proto._stopUpdate=function _stopUpdate(){var ds=this,config=ds.config;ds.updateIntervalHandler(0,true);ds.refreshVisualHandler(null,null,true);ds.initiateResetVisual(true);config._rtAjaxObj&&config._rtAjaxObj.abort();config._rtPaused=true;ds.setState("ajaxRequested",false)};_proto._restartUpdate=function _restartUpdate(){var ds=this,config=ds.config;if(config._rtDataUrl&&config._rtPaused){config._rtPaused=false;config.rtStateChanged=true;ds.processRealtimeStateChange()}};_proto._isUpdateActive=function _isUpdateActive(){return!this.config._rtPaused};_proto.addEvents=function addEvents(){var ds=this,chart=ds.getLinkedParent(),config=ds.config;if(!config.eventsAdded){ds.addExtEventListener("renderComplete",ds._handlerFn,chart.getFromEnv("chartInstance"));ds.addExtEventListener("nodatatodisplay",ds._handlerStop,chart.getFromEnv("chartInstance"))}config.eventsAdded=true};return DataStreamer}(ComponentInterface);function dataStreamer(FusionCharts){FusionCharts.addEventListener("instantiated",onFcInstantiated)}dataStreamerExt={extension:dataStreamer,name:"DataStreamer",type:"extension",requiresFusionCharts:true};export default dataStreamerExt;