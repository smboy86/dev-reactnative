var sum=function sum(prevSum,value){return prevSum+value},avg=function avg(prevAvg,value,n){return((n-1)*prevAvg+value)/n},count=function count(prevCount){return prevCount+1},min=function min(prevMin,value){return prevMin!==null?prevMin>value?value:prevMin:value},max=function max(prevMax,value){return prevMax!==null?prevMax<value?value:prevMax:value},first=function first(prevFirst,value){return prevFirst===null?value:prevFirst},last=function last(prevLast,value){return value},variance=function variance(prevVal,value,n){var mean=value,vr=0,prevMean;if(prevVal){mean=prevVal.avg;vr=prevVal.variance}prevMean=mean;if(n>1){mean=avg(mean,value,n);vr=(vr*(n-2)+(value-mean)*(value-prevMean))/(n-1)}return{avg:mean,variance:vr}},stddev=function stddev(prevVal,value,n){var newPrevVal,vr;if(prevVal){newPrevVal={avg:prevVal.avg,variance:prevVal.stddev*prevVal.stddev}}vr=variance(newPrevVal,value,n);return{avg:vr.avg,stddev:Math.sqrt(vr.variance)}};export{sum,avg,count,min,max,first,last,variance,stddev};