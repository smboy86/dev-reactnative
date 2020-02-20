import{UNDEF}from"@fusioncharts/core/src/lib";var getSplineExtremities=function getSplineExtremities(data,chartWidth,connectNullData,index,lmts){var arrKnot=[],validValueFound=false,u=index||0,limits=lmts;limits=limits||{max:Number.MIN_VALUE,min:Number.MAX_VALUE};for(;u<data.length;++u){if(!validValueFound){if(!isNaN(data[u].config.setValue)&&data[u].config.setValue!==null){validValueFound=true}else{continue}arrKnot.push({index:u,y:data[u].config.setValue})}else{if(isNaN(data[u].config.setValue)||data[u].config.setValue===null){if(connectNullData){continue}else{break}}else{arrKnot.push({index:u,y:data[u].config.setValue})}}}if(arrKnot.length>2){evalSplineExtremities(arrKnot,chartWidth,limits)}if(u<data.length&&!connectNullData){getSplineExtremities(data,chartWidth,connectNullData,u,limits)}return limits},evalSplineExtremities=function evalSplineExtremities(arrKnot,chartWidth,limits){var objGrad={},u,i,t,calcValue,delX;for(i=0;i<arrKnot.length;++i){t=arrKnot[i].index;objGrad["D"+t]=0}for(u=0;u<10;++u){for(i=0;i<arrKnot.length;++i){if(i===0){calcValue=(3*(arrKnot[i+1].y-arrKnot[i].y)-objGrad["D"+arrKnot[i+1].index])/2}else if(i===arrKnot.length-1){calcValue=(3*(arrKnot[i].y-arrKnot[i-1].y)-objGrad["D"+arrKnot[i-1].index])/2}else{calcValue=(3*(arrKnot[i+1].y-arrKnot[i-1].y)-objGrad["D"+arrKnot[i+1].index]-objGrad["D"+arrKnot[i-1].index])/4}objGrad["D"+arrKnot[i].index]=calcValue}}delX=Math.round(chartWidth/(arrKnot.length-1));for(i=1;i<arrKnot.length;++i){getSegmentExtremities(i,arrKnot,objGrad,limits,delX)}},getSegmentExtremities=function getSegmentExtremities(index,data,objGradientStore,limits,delX){var arrKnot=data,i=index,j=0,slope1,slope2,a1,a2,a3,a4,maxY,minY,k,n,t,y1;slope1=objGradientStore["D"+arrKnot[j].index];slope2=objGradientStore["D"+arrKnot[i].index];a1=arrKnot[j].y;a2=slope1;a3=3*(arrKnot[i].y-arrKnot[j].y)-2*slope1-slope2;a4=2*(arrKnot[j].y-arrKnot[i].y)+slope1+slope2;maxY=limits.max;minY=limits.min;for(k=0,n=delX;k<=n;k++){t=k/n;y1=a1+a2*t+a3*t*t+a4*t*t*t;if(y1<minY){minY=y1}if(y1>maxY){maxY=y1}}limits.max=maxY;limits.min=minY},_calculateMaxMin=function _calculateMaxMin(){var dataset=this,conf=dataset.config,chart=dataset.getFromEnv("chart"),chartConf=dataset.getFromEnv("chartConfig"),chartWidth=chart.config.origRenderWidth,connectNullData=chartConf.connectnulldata,minimizeTendency=chartConf.minimizetendency,dataStore=dataset.components.data,infMin=Number.MIN_VALUE,infMax=Number.MAX_VALUE,limits;if(minimizeTendency===0){limits=getSplineExtremities(dataStore,chartWidth,connectNullData);conf.maxValue=Math.max(conf.maxValue,limits.max);conf.minValue=Math.min(conf.minValue,limits.min);if(conf.maxValue===infMin){conf.maxValue=UNDEF}if(conf.minValue===infMax){conf.minValue=UNDEF}}};export default _calculateMaxMin;