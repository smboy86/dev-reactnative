import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{parseUnsafeString,getValidValue,extend2,getComparatorFN,HUNDREDSTRING}from"../lib";import{ComponentInterface}from"../component-interface";var sortColorFN=getComparatorFN(true,"minvalue"),UNDEF;var ColorGradient=function(_ComponentInterface){_inheritsLoose(ColorGradient,_ComponentInterface);function ColorGradient(){return _ComponentInterface.apply(this,arguments)||this}var _proto=ColorGradient.prototype;_proto.getType=function getType(){return"colorComponent"};_proto.getName=function getName(){return"colorGradient"};_proto.configure=function configure(options){var cm=this,oldColorArr=cm.colorArr,colorManager=cm.getFromEnv("color-manager"),numberFormatter=cm.getFromEnv("number-formatter"),colorArr=options.colorRange&&extend2({},options.colorRange).color,defuPaletteOptions=colorManager.getColor("paletteColors"),defaultObj,colorObj,colorObjNext,i,l,temp,newColorRange,j,newMin,nextIndex;delete cm.defaultAsigned;if(!(defuPaletteOptions instanceof Array)){defuPaletteOptions=colorManager.getPlotColor(0)}if(colorArr&&colorArr.length>0){l=colorArr.length-1;for(i=l;i>=0;i-=1){colorObj=colorArr[i];if(colorObj){colorObj.minvalue=numberFormatter.getCleanValue(colorObj.minvalue);colorObj.maxvalue=numberFormatter.getCleanValue(colorObj.maxvalue);if(colorObj.minvalue===null){if(colorObj.maxvalue!==null){colorObj.minvalue=colorObj.maxvalue}else if(i!==l){colorArr.splice(i,1)}}if(colorObj.label!==UNDEF){colorObj.label=parseUnsafeString(colorObj.label)}if(colorObj.name!==UNDEF){colorObj.name=parseUnsafeString(colorObj.name)}if(colorObj.maxvalue!==null){if(colorObj.minvalue>colorObj.maxvalue){temp=colorObj.minvalue;colorObj.minvalue=colorObj.maxvalue;colorObj.maxvalue=temp}}}}colorArr.sort(sortColorFN);if(!colorArr[0].code){colorArr[0].code=defuPaletteOptions[0]}if(getValidValue(colorArr[0].alpha)===UNDEF){colorArr[0].alpha=HUNDREDSTRING}for(i=0,l=colorArr.length-1;i<l;i+=1){nextIndex=i+1;colorObj=colorArr[i];colorObjNext=colorArr[nextIndex];if(!colorObjNext.code){colorObjNext.code=defuPaletteOptions[nextIndex]}if(getValidValue(colorObjNext.alpha)===UNDEF){colorObjNext.alpha=HUNDREDSTRING}if(colorObj.maxvalue===null){colorObj.maxvalue=colorObjNext.minvalue}if(colorObj.maxvalue>colorObjNext.minvalue){if(colorObj.maxvalue>colorObjNext.maxvalue){newColorRange=extend2(colorObj);newColorRange.maxvalue=colorObj.maxvalue;newMin=newColorRange.minvalue=colorObjNext.maxvalue;j=i+2;while(j<l&&colorArr[j].minvalue<newMin){j+=1}colorArr.splice(j,0,newColorRange);l+=1}colorObj.maxvalue=colorObjNext.minvalue}}colorObj=colorArr[i];if(colorObj.maxvalue===null){colorObj.maxvalue=colorObj.minvalue}}if(!(colorArr&&colorArr.length)){if(!defaultObj){defaultObj={code:"CCCCCC",alpha:"100",bordercolor:"000000",borderalpha:"100"}}colorArr=[defaultObj];cm.defaultAsigned=true}cm.colorArr=colorArr||oldColorArr};_proto.getColorObj=function getColorObj(value){var colorArr=this.colorArr,i=0,l=colorArr.length,colorObj,nextColorObj,returnedObj={};for(;i<l;i+=1){returnedObj.index=i;colorObj=colorArr[i];nextColorObj=colorArr[i+1];if(value<colorObj.minvalue){returnedObj.nextObj=colorObj;return returnedObj}if(value>=colorObj.minvalue&&value<=colorObj.maxvalue){returnedObj.colorObj=colorObj;if(nextColorObj&&value===nextColorObj.minvalue){returnedObj.nextObj=nextColorObj;returnedObj.isOnMeetPoint=true}return returnedObj}returnedObj.prevObj=colorObj}returnedObj.index=i-1;return returnedObj};_proto.getColorRangeArr=function getColorRangeArr(_minValue,_maxValue){var temp,colorArr=this.colorArr,i,l,minColorObj,lastMaxValue,maxColorObj,returnArr=[],colorObj,lastColorObj,minValue=_minValue,maxValue=_maxValue;if(!this.defaultAsigned){if(minValue>maxValue){temp=minValue;minValue=maxValue;maxValue=temp}if(minValue<maxValue){minColorObj=this.getColorObj(minValue);maxColorObj=this.getColorObj(maxValue);if(minColorObj&&maxColorObj){lastMaxValue=minValue;i=minColorObj.index;l=maxColorObj.index;for(;i<=l;i+=1){colorObj=extend2({},colorArr[i]);if(colorObj.minvalue!==lastMaxValue){colorObj.minvalue=lastMaxValue}returnArr.push(colorObj);lastColorObj=colorObj;lastMaxValue=colorObj.maxvalue}lastColorObj.maxvalue=maxValue}}}return returnArr};return ColorGradient}(ComponentInterface);export default ColorGradient;