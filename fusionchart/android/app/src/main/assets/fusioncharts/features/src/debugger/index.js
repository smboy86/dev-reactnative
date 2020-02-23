import{addListener,removeListener}from"@fusioncharts/core/src/event-api";var UNDEF,DEFAULT_OUTPUT_HELPER="text",DEBUGGER="debugger",logger;logger={outputHelpers:{text:function text(e,a){logger.outputTo("#"+e.eventId+" ["+(e.sender.id||e.sender).toString()+'] fired "'+e.eventType+'" event. '+(e.eventType==="error"||e.eventType==="warning"?a.message:""))},event:function event(e,a){this.outputTo(e,a)},verbose:function verbose(e,a){logger.outputTo(e.eventId,e.sender.id,e.eventType,a)}},outputHandler:function outputHandler(e,a){if(typeof logger.outputTo!=="function"){return}logger.currentOutputHelper(e,a)},currentOutputHelper:UNDEF,outputTo:UNDEF,enabled:false};logger.currentOutputHelper=logger.outputHelpers[DEFAULT_OUTPUT_HELPER];export default{extension:function extension(FusionCharts){FusionCharts["debugger"]={outputFormat:function outputFormatFn(outputFormat){var format=outputFormat;if(format&&typeof format.toLowerCase==="function"&&typeof logger.outputHelpers[format=format.toLowerCase()]==="function"){logger.currentOutputHelper=logger.outputHelpers[format];return true}return false},outputTo:function outputTo(debuggerCallback){if(typeof debuggerCallback==="function"){logger.outputTo=debuggerCallback}else if(debuggerCallback===null){FusionCharts[DEBUGGER].enable(false);delete logger.outputTo}},enable:function enable(_state,_outputTo,_outputFormat){var config,state=_state,outputTo=_outputTo,outputFormat=_outputFormat;if(typeof state==="object"&&arguments.length===1){config=state;state=config.state;outputTo=config.outputTo;outputFormat=config.outputFormat}if(typeof state==="function"){if(typeof outputTo==="string"&&(arguments.length===2||config)){outputFormat=outputTo}outputTo=state;state=true}if(typeof state==="boolean"&&state!==logger.enabled){logger.enabled=state;if(logger.enabled){addListener("*",logger.outputHandler)}else{removeListener("*",logger.outputHandler)}}if(typeof outputTo==="function"){logger.outputTo=outputTo}FusionCharts[DEBUGGER].outputFormat(outputFormat);return logger.enabled}}},name:"Debugger",type:"extension",requiresFusionCharts:true};