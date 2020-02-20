import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{getDepsByType}from"@fusioncharts/core/src/dependency-manager";import{raiseWarning}from"@fusioncharts/core/src/event-api";var UNDEF,BLANK="",OBJECTSTRING="object",arrayToStr="[object Array]",objectToStr="[object Object]",themer,isImportantRegEx=/\s+!important$/,importantStrRegEx=/\\!important$/,getValueFromObjProperty=function getValueFromObjProperty(obj,property){var val,key,prop=property;prop=(prop+"").toLowerCase();for(key in obj){if(obj.hasOwnProperty(key)&&prop===(key+"").toLowerCase()){val=obj[key];break}}return val},hasFunc=function hasFunc(themeArr){var i,len;for(i=0,len=themeArr.length;i<len;i++){if(typeof themeArr[i]==="function"){return true}}return false},getArrayFromObj=function getArrayFromObj(obj){var returnArr=[],key;for(key in obj){returnArr[key]=obj[key]}return returnArr},trimString=function trimString(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},getRegisteredThemes=function getRegisteredThemes(addedThemes){var themes={},theme;for(var key in addedThemes){if(addedThemes.hasOwnProperty(key)){theme=addedThemes[key];themes[theme.name]=theme}}return themes},checkCyclicRef=function checkCyclicRef(obj,parentArr){var i=parentArr.length,bIndex=-1;while(i--){if(obj===parentArr[i]){bIndex=i;return bIndex}}return bIndex},merge=function merge(target,source,skipUndef,assignByImportance,_tgtArr,_srcArr){var item,srcVal,tgtVal,str,cRef,tgtArr=_tgtArr,srcArr=_srcArr;if(!srcArr){tgtArr=[target];srcArr=[source]}else{tgtArr.push(target);srcArr.push(source)}if(source instanceof Array){for(item=0;item<source.length;item+=1){try{srcVal=target[item];tgtVal=source[item]}catch(e){continue}if(typeof tgtVal!==OBJECTSTRING){if(!(skipUndef&&tgtVal===UNDEF)){target[item]=tgtVal}}else{if(srcVal===null||typeof srcVal!==OBJECTSTRING){srcVal=target[item]=tgtVal instanceof Array?[]:{}}cRef=checkCyclicRef(tgtVal,srcArr);if(cRef!==-1){srcVal=target[item]=tgtArr[cRef]}else{merge(srcVal,tgtVal,skipUndef,assignByImportance,tgtArr,srcArr)}}}}else{for(item in source){try{srcVal=target[item];tgtVal=source[item]}catch(e){continue}if(tgtVal!==null&&typeof tgtVal===OBJECTSTRING){str=Object.prototype.toString.call(tgtVal);if(str===objectToStr){if(srcVal===null||typeof srcVal!==OBJECTSTRING){srcVal=target[item]={}}cRef=checkCyclicRef(tgtVal,srcArr);if(cRef!==-1){srcVal=target[item]=tgtArr[cRef]}else{if(item==="data"&&tgtVal._dataStore){target[item]=assignByImportance?assignByImportance(srcVal,tgtVal):tgtVal}else{merge(srcVal,tgtVal,skipUndef,assignByImportance,tgtArr,srcArr)}}}else if(str===arrayToStr){if(srcVal===null||!(srcVal instanceof Array)){srcVal=target[item]=[]}cRef=checkCyclicRef(tgtVal,srcArr);if(cRef!==-1){srcVal=target[item]=tgtArr[cRef]}else{merge(srcVal,tgtVal,skipUndef,assignByImportance,tgtArr,srcArr)}}else{target[item]=assignByImportance?assignByImportance(srcVal,tgtVal):tgtVal}}else{target[item]=assignByImportance?assignByImportance(srcVal,tgtVal):tgtVal}}}return target},extend2=function extend2(_obj1,obj2,skipUndef,assignByImportance){if(assignByImportance===void 0){assignByImportance=null}var obj1=_obj1;if(typeof obj1!==OBJECTSTRING&&typeof obj2!==OBJECTSTRING){return null}if(typeof obj2!==OBJECTSTRING||obj2===null){return obj1}if(typeof obj1!==OBJECTSTRING){obj1=obj2 instanceof Array?[]:{}}merge(obj1,obj2,skipUndef,assignByImportance);return obj1},checkImportance=function checkImportance(_value){var value=_value;var returnObj={important:false,str:BLANK};if(!value){return returnObj}value=value.toString();if(isImportantRegEx.test(value)){value=value.replace(isImportantRegEx,BLANK);returnObj.important=true}else{value=value.replace(importantStrRegEx,"!imporant");returnObj.important=false}returnObj.str=value;return returnObj},getImportantStyle=function getImportantStyle(styleA,styleB){var importanceOfStyleA=checkImportance(styleA),importanceOfStyleB=checkImportance(styleB);if(importanceOfStyleA.important&&!importanceOfStyleB.important){return importanceOfStyleA.str}return importanceOfStyleB.str},mergeThemeWithData=function mergeThemeWithData(dataJSON,themeComponent){var items=themeComponent.getAll(),key,keyLowerCase,valStr,importanceThemeSource,importanceDataSource;for(key in items){keyLowerCase=key.toLowerCase();valStr=items[key].toString();importanceThemeSource=checkImportance(valStr);importanceDataSource=checkImportance(dataJSON[keyLowerCase]);if(importanceThemeSource.important&&!importanceDataSource.important){dataJSON[keyLowerCase]=importanceThemeSource.str}else if(importanceDataSource.important){dataJSON[keyLowerCase]=importanceDataSource.str}else if(dataJSON[keyLowerCase]===UNDEF&&typeof items[key]!=="object"){dataJSON[keyLowerCase]=typeof items[key]!=="object"?importanceThemeSource.str:items[key]}else if(typeof items[key]==="object"){if(typeof dataJSON[keyLowerCase]==="undefined"){dataJSON[keyLowerCase]=items[key]}dataJSON[keyLowerCase]=extend2(items[key],dataJSON[keyLowerCase],false,getImportantStyle)}}},getAllUniqueKeys=function getAllUniqueKeys(dataObject,themeInstance){var keys=[].concat(Object.keys(dataObject));var theme;for(var _iterator=themeInstance.themeArray,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){if(_isArray){if(_i>=_iterator.length)break;theme=_iterator[_i++]}else{_i=_iterator.next();if(_i.done)break;theme=_i.value}keys.push.apply(keys,Object.keys(theme))}return Array.from(new Set(keys))},recursiveApply=function recursiveApply(dataObj,themeObject){var key,dataItem,themeComponent,item,i,ii,j,vLineIndex=0,catIndex=0,hasTimeseriesThemeFunction,items,keysToIterateOn=getAllUniqueKeys(dataObj,themeObject);for(var _iterator2=keysToIterateOn,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[Symbol.iterator]();;){if(_isArray2){if(_i2>=_iterator2.length)break;key=_iterator2[_i2++]}else{_i2=_iterator2.next();if(_i2.done)break;key=_i2.value}dataItem=dataObj[key];if(typeof dataItem==="undefined"){dataItem=dataObj[key]={}}hasTimeseriesThemeFunction=themeObject.type==="timeseries"&&themeObject.themeComponents[key]&&hasFunc(themeObject.themeComponents[key]);if(dataItem instanceof Array&&!hasTimeseriesThemeFunction){ii=dataItem.length;for(i=0;i<ii;i+=1){item=dataItem[i];if(typeof item==="object"){if(key==="category"){if(item.vline==="true"){themeComponent=themeObject.component("vline",vLineIndex,item);if(themeComponent){mergeThemeWithData(item,themeComponent);vLineIndex+=1}}else{themeComponent=themeObject.component("category",catIndex,item,ii);if(themeComponent){mergeThemeWithData(item,themeComponent);catIndex+=1}}}else{themeComponent=themeObject.component(key,i,item,ii);if(themeComponent){mergeThemeWithData(item,themeComponent);recursiveApply(item,themeComponent)}}}}}else if(typeof dataItem==="object"){if(!hasTimeseriesThemeFunction){themeComponent=themeObject.component(key,null,dataItem);if(themeComponent){mergeThemeWithData(dataItem,themeComponent);recursiveApply(dataItem,themeComponent)}}else{themeComponent=themeObject.component(key,null,dataItem);items=themeComponent.getAll();dataObj[key]=items;if(/^\d+$/.test(Object.keys(items).join(""))){items=getArrayFromObj(items);dataObj[key]=items;for(j=0;j<dataObj[key].length;j++){recursiveApply(dataObj[key][j],themeComponent)}}else{recursiveApply(dataItem,themeComponent)}}}}};var ThemeManager=function(_ComponentInterface){_inheritsLoose(ThemeManager,_ComponentInterface);function ThemeManager(){return _ComponentInterface.apply(this,arguments)||this}var _proto=ThemeManager.prototype;_proto.configure=function configure(){!this.config.themeStore&&(this.config.themeStore={})};_proto.add=function add(themeJSON){var i=0,ii=themeJSON.length,themeName;for(;i<ii;i+=1){themeName=themeJSON[i].name;if(themeName){this.config.themeStore[themeName]=themeJSON[i]}}};_proto.themify=function themify(themeName,chartInstance,chartType,chartDefinition,additionalBase){var tm=this,jsVars=chartInstance.jsVars,themes=themeName.split(","),themeArr=[],ii=themes.length,themeJSON,i;tm.config.themeStore=getRegisteredThemes(getDepsByType("theme"));if(ii){for(i=0;i<ii;i+=1){themeJSON=tm.config.themeStore[trimString(themes[i])];themeJSON&&themeArr.push(ThemeManager.evaluateThemeJSON(themeJSON.theme,chartInstance,chartType,additionalBase))}if(themeArr.length){jsVars.themeObject=new ThemeInstance(themeArr,chartInstance,false,chartDefinition,chartType);ThemeManager.applyTheme(chartInstance)}else{raiseWarning(chartInstance,"14051100501","run","api.themes~themify()",'The theme "'+themeName+'" requested has not been registered.')}}};ThemeManager.evaluateThemeJSON=function evaluateThemeJSON(themeObject,chartInstance,_chartType,additionalBase){var evaledTheme={},jsVars=chartInstance.jsVars,additionalBaseObj,chartAttribObj,chartType=_chartType,evaluator=function evaluator(tblock){var key,item;for(key in tblock){item=tblock[key];if(item instanceof Array){evaledTheme[key]=extend2(evaledTheme[key]||[],item)}else if(typeof item==="object"){evaledTheme[key]=extend2(evaledTheme[key]||{},item)}else{evaledTheme[key]=item}}};chartType=chartType||chartInstance.chartType();if(jsVars.themeObject&&themeObject!==jsVars.themeObject){jsVars.themeObject.dispose();delete jsVars.themeObject}evaluator(getValueFromObjProperty(themeObject,"base"));additionalBase&&(additionalBaseObj=getValueFromObjProperty(themeObject,additionalBase));additionalBaseObj&&evaluator(additionalBaseObj);chartType&&(chartAttribObj=getValueFromObjProperty(themeObject,chartType));chartAttribObj&&evaluator(chartAttribObj);return evaledTheme};ThemeManager.applyTheme=function applyTheme(chartInstance){var themeObj=chartInstance.jsVars.themeObject,themedData=themeObj.getThemedJSONData().data;if(themedData){recursiveApply(themedData,themeObj)}};return ThemeManager}(ComponentInterface);var ThemeInstance=function(_ComponentInterface2){_inheritsLoose(ThemeInstance,_ComponentInterface2);function ThemeInstance(themeJSONArr,parent,isChildInstance,chartDefinition,type){var _this;_this=_ComponentInterface2.call(this)||this;var i=0,ii;_this.themeArray=themeJSONArr;_this.themeComponents={};_this.base={};_this.type=type;_this.chartInstance=parent;_this.isChildInstance=Boolean(isChildInstance);_this.themedData=isChildInstance?null:chartDefinition;_this.length=themeJSONArr.length;ii=themeJSONArr.length;for(;i<ii;i+=1){_this.parse(themeJSONArr[i])}return _this}var _proto2=ThemeInstance.prototype;_proto2.pushTheme=function pushTheme(themeJSON,pushToBase){if(pushToBase===void 0){pushToBase=false}if(themeJSON){this.themeArray.push(themeJSON);this.parse(themeJSON,pushToBase);this.length+=1}};_proto2.parse=function parse(themeJSON,pushToBase){var ti=this,blockLen,ii;if(themeJSON instanceof Array){blockLen=themeJSON.length;for(ii=0;ii<blockLen;ii++){ti._parseSubBlock(themeJSON[ii],pushToBase)}}else{ti._parseSubBlock(themeJSON,pushToBase)}};_proto2._parseSubBlock=function _parseSubBlock(_subBlock,pushToBase){var ti=this,base=ti.base,type=ti.type,components=ti.themeComponents,parent=ti.chartInstance,isChildInstance=ti.isChildInstance,key,imp1,imp2,componentArr;for(key in _subBlock){if(typeof _subBlock[key]==="string"||typeof _subBlock[key]==="number"){if(base[key]){imp1=checkImportance(_subBlock[key]);imp2=checkImportance(base[key]);if(imp1.important||!imp2.important){base[key]=_subBlock[key]}}else{base[key]=_subBlock[key]}}else if(type==="timeseries"&&isChildInstance){if(_subBlock[key]instanceof Array&&key!=="palettecolors"&&!pushToBase){if(!components[key]){components[key]=[]}components[key].push(extend2([],_subBlock[key]))}else if(typeof _subBlock[key]==="object"||pushToBase){base[key]=_subBlock[key]}}else{if(!components[key]){components[key]=[]}componentArr=components[key];if(_subBlock[key]instanceof Array){componentArr.push(extend2([],_subBlock[key]))}else if(typeof _subBlock[key]==="object"){componentArr.push(new ThemeInstance([_subBlock[key]],parent,true,{},type))}else if(typeof _subBlock[key]==="function"){componentArr.push(_subBlock[key])}}}};_proto2.mergeWithThemeInstance=function mergeWithThemeInstance(instance){var ti=this,thisBase=ti.base,thatBase=instance.base,thisComponents=ti.themeComponents,thatComponents=instance.themeComponents,imp1,imp2,key;for(key in thatBase){imp1=checkImportance(thisBase[key]);imp2=checkImportance(thatBase[key]);if(!imp1.important||imp2.important){thisBase[key]=thatBase[key]}}for(key in thatComponents){if(thisComponents[key]){thisComponents[key]=thisComponents[key].concat(thatComponents[key])}else{thisComponents[key]=[].concat(thatComponents[key])}}ti.length+=instance.length};_proto2.get=function get(key){return this.base[key]};_proto2.getAll=function getAll(){return extend2({},this.base)};_proto2.component=function component(key,index,dataJSON,length){var ti=this,parent=ti.chartInstance,returnInstance=new ThemeInstance([],parent,true,{},ti.type),i,ii,componentArr,each;componentArr=ti.themeComponents[key];if(!componentArr){return null}for(i=0,ii=componentArr.length;i<ii;i+=1){each=componentArr[i];if(typeof each==="function"){if(ti.type!=="timeseries"){returnInstance.mergeWithThemeData(each.call(parent,index,dataJSON,length),index||0,dataJSON)}else{returnInstance.mergeWithThemeData(each.call(parent,dataJSON),index,dataJSON,true)}}else{returnInstance.mergeWithThemeData(each,index,dataJSON)}}return returnInstance};_proto2.mergeWithThemeData=function mergeWithThemeData(themeData,_index,dataSourceJSON,pushToBase){if(pushToBase===void 0){pushToBase=false}var ti=this,themeItem,arrayComponentLength,index=_index;if(themeData instanceof Array){index=index||0;arrayComponentLength=themeData.length;index=index%arrayComponentLength;themeItem=themeData[index];if(themeItem instanceof ThemeInstance){ti.mergeWithThemeInstance(themeItem)}else{if(typeof themeItem==="function"){ti.pushTheme(themeItem.call(parent,index,dataSourceJSON,length),pushToBase)}else{ti.pushTheme(themeItem,pushToBase)}}}else{if(themeData instanceof ThemeInstance){ti.mergeWithThemeInstance(themeData)}else{ti.pushTheme(themeData,pushToBase)}}};_proto2.getThemedJSONData=function getThemedJSONData(){return{data:this.themedData}};_proto2.dispose=function dispose(){var ti=this,components=ti.themeComponents,key,i;for(key in components){i=components[key].length;if(i){while(i--){components[key][i].dispose&&components[key][i].dispose()}delete components[key]}}ti.themeComponents=null;ti.chartInstance=null;ti.base=null;ti.themeArray=null;ti.isChildInstance=null;ti.dataWithoutTheme=null};return ThemeInstance}(ComponentInterface);themer=new ThemeManager;themer.configure();function FCPlugger(FusionCharts){var applyTheme=function applyTheme(eventObj){var viz=eventObj.sender,chartObj=viz.getFromEnv("chartInstance"),type,themeStore=getRegisteredThemes(getDepsByType("theme")),i,dataObj=viz.getFromEnv("dataSource"),globalThemeName=FusionCharts.options.defaultTheme,chartThemeName=dataObj&&(dataObj.chart&&dataObj.chart.theme||dataObj.map&&dataObj.map.theme),themeName=(globalThemeName||chartThemeName)&&(globalThemeName||"")+","+(chartThemeName||""),themeArray=themeName&&themeName.split(","),themeArrayLen=themeArray&&themeArray.length,hasValidTheme=false,theme;for(i=0;i<themeArrayLen;i++){theme=trimString(themeArray[i]);if(themeStore&&theme!==""&&themeStore.hasOwnProperty(theme)){hasValidTheme=true}}if(hasValidTheme){dataObj=extend2({},viz.getFromEnv("dataSource"));type=chartObj.chartType();if(dataObj.map){dataObj.chart=dataObj.map;delete dataObj.map}themer.themify(themeName,chartObj,type,dataObj,chartObj.apiInstance.defaultSeriesType==="geo"&&"geo");viz.addToEnv("dataSource",dataObj)}else if(chartObj.jsVars&&chartObj.jsVars.themeObject){chartObj.jsVars&&chartObj.jsVars.themeObject.dispose();chartObj.jsVars&&delete chartObj.jsVars.themeObject}};FusionCharts.addEventListener("internal.dataSanitized",applyTheme)}export default{extension:FCPlugger,name:"ThemeEngine",type:"extension",requiresFusionCharts:true};