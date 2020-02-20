import DataMarker from"./../components/data-marker";import stringHasContent from"@fusioncharts/utils/src/type/string-has-content";import arrayHasContent from"@fusioncharts/utils/src/type/array-has-content";import equals from"ramda/es/equals";import isObject from"@fusioncharts/utils/src/type/is-object";export default function(dataset){var dataSource=dataset.getFromEnv("dataSource"),seriesname=dataset.config.series,dataMarker,_dataset$config=dataset.config,measures=_dataset$config.measures,_dataset$config$serie=_dataset$config.seriesInfo,seriesInfo=_dataset$config$serie===void 0?{}:_dataset$config$serie,enableMarkers=_dataset$config.enableMarkers,visibility=_dataset$config.visibility,isStock=_dataset$config.isStock,dataMarkerInstance,markers=[];if(enableMarkers&&(dataMarker=dataSource.datamarker)){dataMarker.forEach((function(data){var cloneData=Object.assign({},data),value=cloneData.value,series=cloneData.series,isConditionsMet=true;if(value){if(stringHasContent(value)){value=[value]}if(arrayHasContent(value)){value=value.filter(stringHasContent);if(isStock&&isObject(measures[0])){var measuresArr=Object.values(measures[0]);for(var i=0;i<value.length&&isConditionsMet;++i){isConditionsMet=measuresArr.includes(value[i])}}else{isConditionsMet=equals(value,measures)}}}if(Object.keys(seriesInfo).length&&isObject(series)){var keys=Object.keys(series),_i=keys.length,key;while(isConditionsMet&&_i--){key=keys[_i];if(stringHasContent(series[key])){if(series[key]!==seriesInfo[key])isConditionsMet=false}}}if(isConditionsMet){if(isStock){cloneData.measures=measures}else{cloneData.seriesname=seriesname}markers.push(cloneData)}}));if(markers.length!==0){dataMarkerInstance=dataset.attachChild(DataMarker,"dataMarker");dataMarkerInstance.configure({data:markers,isStock:isStock,visibility:visibility})}}}