import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{pseudoEval}from"@fusioncharts/core/src/lib";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";var IN_ALERT_RANGE="1",OUT_OF_ALERT_RANGE="2",ACTION_CALLJS="calljs",ACTION_SHOWANNOTATION="showannotation";var AlertManager=function(_ComponentInterface){_inheritsLoose(AlertManager,_ComponentInterface);function AlertManager(){var _this;_this=_ComponentInterface.call(this)||this;_this.pIndex=1;_this.linkedItems={chart:{}};return _this}var _proto=AlertManager.prototype;_proto.getType=function getType(){return"extension"};_proto.getName=function getName(){return"AlertManager"};_proto.configure=function configure(){var alertManager=this,alerts=alertManager.getFromEnv("dataSource"),alertArr=alerts&&alerts.alerts&&alerts.alerts.alert,numberFormatter=alertManager.getFromEnv("number-formatter"),config=alertManager.config||(alertManager.config={}),alertCount,j,alertObj;if(alertArr&&alertArr.length){config.alertArr=alertArr;alertCount=alertArr.length;for(j=0;j<alertCount;j+=1){alertObj=alertArr[j];alertObj.minvalue=numberFormatter.getCleanValue(alertObj.minvalue);alertObj.maxvalue=numberFormatter.getCleanValue(alertObj.maxvalue)}}else{config.alertArr=[]}};_proto.processRTData=function processRTData(rtData){var alertManager=this,config=alertManager.config,numberFormatter=alertManager.getFromEnv("number-formatter"),i,j,dsLength,dsObj,dataLength,dataObj,val;if(rtData&&rtData.dataset&&rtData.dataset.length){dsLength=rtData.dataset.length;for(i=0;i<dsLength;i+=1){dsObj=rtData.dataset[i];if(dsObj.data&&dsObj.data.length){if(config.datasetMap&&config.datasetMap[i]===0){continue}dataLength=dsObj.data.length;for(j=0;j<dataLength;j+=1){dataObj=dsObj.data[j];val=dataObj&&numberFormatter.getCleanValue(dataObj.value);if(val!==null){alertManager._doAlert(numberFormatter.getCleanValue(dataObj.value))}}}}}};_proto._doAlert=function _doAlert(val){var alertManager=this,chart=alertManager.getLinkedParent(),alertArr=alertManager.config.alertArr,alertCount=alertArr.length,alertObj,j,alertAction;for(j=0;j<alertCount;j+=1){alertObj=alertArr[j];alertAction=alertObj.action&&alertObj.action.toLowerCase();if(alertObj.minvalue<=val&&alertObj.maxvalue>=val){if(!(alertObj.occuronce==="1"&&alertObj.hasOccurred)){alertObj.hasOccurred=true;alertObj.state=IN_ALERT_RANGE;switch(alertAction){case ACTION_CALLJS:setTimeout(pseudoEval(alertObj.param));break;case ACTION_SHOWANNOTATION:chart.showAnnotation&&chart.showAnnotation(alertObj.param);break}chart.fireChartInstanceEvent("AlertComplete",{alertValue:val,alertMaxValue:alertObj.maxvalue,alertMinValue:alertObj.minvalue})}}else{if(alertAction===ACTION_SHOWANNOTATION&&alertObj.state===IN_ALERT_RANGE){chart.hideAnnotation&&chart.hideAnnotation(alertObj.param)}alertObj.state=OUT_OF_ALERT_RANGE}}};return AlertManager}(ComponentInterface);export default AlertManager;