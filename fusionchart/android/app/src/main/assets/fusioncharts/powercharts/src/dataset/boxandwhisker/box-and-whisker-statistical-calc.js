import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{BLANKSTRING,BLANK,defined,COMMASTRING}from"@fusioncharts/core/src/lib";var BoxAndWhiskerStatisticalCalc=function(_ComponentInterface){_inheritsLoose(BoxAndWhiskerStatisticalCalc,_ComponentInterface);function BoxAndWhiskerStatisticalCalc(){return _ComponentInterface.apply(this,arguments)||this}var _proto=BoxAndWhiskerStatisticalCalc.prototype;_proto.setArray=function setArray(val){var nf=this.getFromEnv("number-formatter"),sum=0,len,value=val,dataArr;!value&&(value=BLANK);dataArr=value.replace(/\s/g,BLANK).split(COMMASTRING);len=this.dataLength=dataArr&&dataArr.length;while(len--){sum+=dataArr[len]=nf.getCleanValue(dataArr[len])}dataArr&&dataArr.sort((function(a,b){return a-b}));this.values=dataArr;this.mean=sum/this.dataLength;this.getFrequencies()};_proto.getQuartiles=function getQuartiles(){var values=this.values,len=this.dataLength,isOdd=len%2,q1Pos,q1LowPos,q3Pos,q3LowPos,q1Val,q3Val,method=BLANKSTRING;switch(method){case"tukey":if(isOdd){q1Pos=(len+3)/4;q3Pos=(len*3+1)/4}else{q1Pos=(len+2)/4;q3Pos=(len*3+2)/4}break;case"mooremccabe":if(isOdd){q1Pos=(len+1)/4;q3Pos=q1Pos*3}else{q1Pos=(len+2)/4;q3Pos=(len*3+2)/4}break;case"freundperles":q1Pos=(len+3)/4;q3Pos=(len*3+1)/4;break;case"mendenhallsincich":q1Pos=Math.round((len+1)/4);q3Pos=Math.round(q1Pos*3);break;default:q1Pos=(len+1)/4;q3Pos=q1Pos*3;break}q1Pos-=1;q3Pos-=1;q1LowPos=Math.floor(q1Pos);q3LowPos=Math.floor(q3Pos);q1Val=q1Pos-q1LowPos?values[q1LowPos]+(values[Math.ceil(q1Pos)]-values[q1LowPos])*(q1Pos-q1LowPos):values[q1Pos];q3Val=q3Pos-q3LowPos?values[q3LowPos]+(values[Math.ceil(q3Pos)]-values[q3LowPos])*(q3Pos-q3LowPos):values[q3Pos];this.quartiles={q1:q1Val,q3:q3Val};return this.quartiles};_proto.getMinMax=function getMinMax(){var values=this.values;return{min:values[0],max:values[this.dataLength-1]}};_proto.getMean=function getMean(){return this.mean};_proto.getMD=function getMD(){var mean=this.mean,freq=this.frequencies,freqLen=freq.length,freqObj,sum=0;while(freqLen--){freqObj=freq[freqLen];sum+=freqObj.frequency*Math.abs(freqObj.value-mean)}return sum/this.dataLength};_proto.getSD=function getSD(){var mean=this.mean,values=this.values,i=this.dataLength,len=i,sum=0;while(i--){sum+=Math.pow(values[i]-mean,2)}return Math.sqrt(sum/(len-1))};_proto.getQD=function getQD(){return(this.quartiles.q3-this.quartiles.q1)*.5};_proto.getFrequencies=function getFrequencies(){var frequenciesArr=[],len=this.dataLength,values=this.values,sum=0,value,freqObj,index;for(index=0;index<len;index+=1){sum+=value=values[index];if(defined(frequenciesArr[index])){frequenciesArr[index].frequency+=1}else{freqObj={};freqObj.value=value;freqObj.frequency=1;frequenciesArr[index]=freqObj}}this.sum=sum;this.frequencies=frequenciesArr};_proto.getMedian=function getMedian(){var len=this.dataLength,midVal=len*.5,values=this.values;return len%2===0?(values[midVal]+values[midVal-1])/2:values[Math.floor(midVal)]};return BoxAndWhiskerStatisticalCalc}(ComponentInterface);export default BoxAndWhiskerStatisticalCalc;