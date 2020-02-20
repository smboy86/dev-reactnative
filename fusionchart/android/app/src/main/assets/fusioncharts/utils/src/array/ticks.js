import numberConverter from"../number-converter";import precisionFixed from"../number-converter/precision-fixed";import precisionRound from"../number-converter/precision-round";import FormatSpecifier from"../number-converter/format-specifier";import precisionPrefix from"../number-converter/precision-prefix";var E10=Math.sqrt(50),E5=Math.sqrt(10),E2=Math.sqrt(2),isNil=function isNil(x){return x===null||typeof x==="undefined"};function getMultiplier(error){var errorFactor;if(error>=E10){errorFactor=10}else if(error>=E5){errorFactor=5}else if(error>=E2){errorFactor=2}else{errorFactor=1}return errorFactor}function tickIncrement(start,stop,count){if(start===void 0){start=0}if(stop===void 0){stop=1}if(count===void 0){count=7}var step=(stop-start)/Math.max(0,count),power=Math.floor(Math.log(step)/Math.LN10),error=step/Math.pow(10,power);if(power>=0){return getMultiplier(error)*Math.pow(10,power)}return-Math.pow(10,-power)/getMultiplier(error)}function tickStep(start,stop,count){if(start===void 0){start=0}if(stop===void 0){stop=1}if(count===void 0){count=7}var step0=Math.abs(stop-start)/Math.max(0,count),power=Math.floor(Math.log(step0)/Math.LN10),step1=Math.pow(10,power),error=step0/step1;if(error>=E10){step1*=10}else if(error>=E5){step1*=5}else if(error>=E2){step1*=2}return stop<start?-step1:step1}function ticks(_start,_stop,_count){if(_start===void 0){_start=0}if(_stop===void 0){_stop=1}if(_count===void 0){_count=7}var reverse,i=-1,n,tickArr=[],step,start,stop,count;stop=+_stop;start=+_start;count=+_count;if(start===stop&&count>0)return[start];reverse=stop<start;if(reverse){n=start;start=stop;stop=n}step=tickIncrement(start,stop,count);if(step===0||!isFinite(step))return[];if(step>0){start=Math.ceil(start/step);stop=Math.floor(stop/step);n=Math.ceil(stop-start+1);while(++i<n){tickArr[i]=(start+i)*step}}else{start=Math.floor(start*step);stop=Math.ceil(stop*step);n=Math.ceil(start-stop+1);while(++i<n){tickArr[i]=(start-i)/step}}if(reverse)tickArr.reverse();return tickArr}function tickFormat(domain,count,_specifier,converter){if(converter===void 0){converter=numberConverter}var start=domain[0],stop=domain[domain.length-1],step=tickStep(start,stop,isNil(count)?7:count);var precision,value,specifier;specifier=new FormatSpecifier(isNil(_specifier)?",f":_specifier);switch(specifier.type){case"s":{value=Math.max(Math.abs(start),Math.abs(stop));precision=precisionPrefix(step,value);if(isNil(specifier.precision)&&!isNaN(precision)){specifier.precision=precision}return function(v){return converter.formatPrefix(specifier,value).format(v)}}case"":case"e":case"g":case"p":case"r":{precision=precisionRound(step,Math.max(Math.abs(start),Math.abs(stop)));if(isNil(specifier.precision)&&!isNaN(precision)){specifier.precision=precision-(specifier.type==="e")}break}case"f":case"%":{precision=precisionFixed(step);if(isNil(specifier.precision)&&!isNaN(precision)){specifier.precision=precision-(specifier.type==="%")*2}break}}return function(v){return converter.formatter(specifier).format(v)}}export default ticks;export{tickIncrement,tickStep,tickFormat};