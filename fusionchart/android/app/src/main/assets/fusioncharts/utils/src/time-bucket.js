import pads from"./time-converter/pads";var dashToLast=function dashToLast(a,b){return a==="-"?1:b==="-"?-1:0},BLANK="",VALID_PAD="%["+Object.keys(pads).sort(dashToLast).join("")+"]?",regexCreator=function regexCreator(token){return new RegExp(""+VALID_PAD+token)},regexify=function regexify(obj){var regexedObj={};var interval=BLANK;for(interval in obj){if(obj.hasOwnProperty(interval)){regexedObj[interval]=obj[interval].map(regexCreator)}}return regexedObj};var timeOrderArr=["millisecond","second","minute","hour","day","month","year"],timeOrderObj={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},minimumPlaceHolderObj={millisecond:0,second:1,minute:2,hour:2,day:4,month:5,year:6},placeHolderMap=regexify({millisecond:["L","Q"],second:["S","s"],minute:["M"],hour:["H","I","p"],day:["d","e","j","a","A"],month:["b","B","m"],year:["y","Y"]}),len=timeOrderArr.length;function getMinPlaceHolder(timeString){if(timeString===void 0){timeString=""}var i,j,currentPlaceHolder,currentPlaceHolderLen;for(i=0;i<len;i++){currentPlaceHolder=placeHolderMap[timeOrderArr[i]];currentPlaceHolderLen=currentPlaceHolder.length;for(j=0;j<currentPlaceHolderLen;j++){if(timeString.match(currentPlaceHolder[j])){return timeOrderArr[i]}}}}function getPlaceHolderIndex(placeHolder){return timeOrderObj[placeHolder]}function getFilterdTimeFormat(_format,minimumPlaceHolder){if(_format===void 0){_format=""}var upto=minimumPlaceHolderObj[minimumPlaceHolder],currentPlaceHolder,format=_format,callBack=function callBack(element){format=format.replace(element,"")},i;for(i=0;i<upto;i++){currentPlaceHolder=placeHolderMap[timeOrderArr[i]];currentPlaceHolder.forEach(callBack)}return format.replace(/(\W+$)/,"").replace(/^,/,"")}export{getMinPlaceHolder,getPlaceHolderIndex,getFilterdTimeFormat};