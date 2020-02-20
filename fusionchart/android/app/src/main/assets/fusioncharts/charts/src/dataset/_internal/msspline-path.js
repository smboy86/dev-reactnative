var M="M",L="L",Z="Z",R="R",C="C",math=Math,mathSqrt=math.sqrt,mathAbs=math.abs,getSlope=function getSlope(x1,y1,x2,y2){return(y2-y1)/(x2-x1)},getPointY=function getPointY(x,m,x1,y1){return(x-x1)*m+y1},getPointX=function getPointX(y,m,x1,y1){return(y-y1)/m+x1},evalX=function evalX(x1,y1,x2,y2){var sinTheta=(y2-y1)/mathSqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)),rearPart=mathAbs(.5*sinTheta),frontPart=1-rearPart;return x1*rearPart+x2*frontPart},cmrcManager=function cmrcManager(curveArr,appendClosePath,endXPos,endYPos){var len=curveArr.length,lastCurveCommandArr=curveArr[len-1],len2=lastCurveCommandArr.length,command=lastCurveCommandArr[0],lastRecorderXPos=lastCurveCommandArr[len2-2];if(len2<3){return}if((command===R||command===C)&&len2===3){curveArr[len-1][0]=L}if(appendClosePath){curveArr.push([L,lastRecorderXPos,endYPos,endXPos,endYPos,Z])}};function getSplinePath(dataTemp,yBasePos,minTend,isSplineArea,num){var minimizeTendency=minTend,arrS=[null],curvePath=[],linePath=[],lastArrLength,lastObj,y1,y0,y2,x1,x0,x2,lastYPos,lastXPos,lineArrLen,slope,point,anchorX,anchorY,anchorX0,anchorY0,slopePrev,arrLen,startingIndex,tempArr,startXPos,prevPoint,nextPoint,i,len;for(i=0,len=dataTemp.length;i<len;i+=1){point=dataTemp[i];prevPoint=dataTemp[i-1]||{};nextPoint=dataTemp[i+1]||{};x1=point.x;y1=point.y;x0=prevPoint.x;y0=prevPoint.y;x2=nextPoint.x;y2=nextPoint.y;lastYPos=point.lastYPos;lastXPos=point.lastXPos;arrLen=curvePath.length;lineArrLen=linePath.length;if(minimizeTendency){if(lastYPos!==null){lastObj=tempArr;if(i===dataTemp.length-1){slopePrev=arrS[i-startingIndex-1];anchorX=(x1+x0)/2;anchorX0=anchorX;anchorY0=getPointY(anchorX0,slopePrev,x0,y0);if(y0>y1&&anchorY0<y1||y0<y1&&anchorY0>y1){anchorY0=y1;anchorX0=getPointX(anchorY0,slopePrev,x0,y0)}tempArr.push(anchorX0,anchorY0,anchorX,(y1+y0)/2,x1,y1);curvePath.push(tempArr);linePath.push(tempArr);isSplineArea&&cmrcManager(curvePath,true,startXPos,yBasePos);isSplineArea&&cmrcManager(linePath,false)}else{slopePrev=arrS[i-startingIndex-1];if(y0>y1&&y2>=y1||y0<y1&&y2<=y1){slope=0;anchorX=evalX(x0,y0,x1,y1);anchorY=y1;if(i-startingIndex!==1){anchorX0=anchorX;anchorY0=getPointY(anchorX0,slopePrev,x0,y0);if(y0>y1&&anchorY0<y1||y0<y1&&anchorY0>y1){anchorY0=y1;anchorX0=getPointX(anchorY0,slopePrev,x0,y0)}tempArr.push(anchorX0,anchorY0,anchorX,anchorY,x1,y1)}else{tempArr.push((x1+x0)/2,(y1+y0)/2,anchorX,anchorY,x1,y1)}}else if(y0===y1){slope=0;tempArr.push(x0,y0,x1,y1,x1,y1)}else if(y0>y1&&y1>y2||y0<y1&&y1<y2){slope=getSlope(x0,y0,x2,y2);anchorX=evalX(x0,y0,x1,y1);anchorY=getPointY(anchorX,slope,x1,y1);if(y0>y1&&anchorY>y0||y0<y1&&anchorY<y0){anchorY=y0;anchorX=getPointX(anchorY,slope,x1,y1)}if(i-startingIndex!==1){anchorX0=anchorX;anchorY0=getPointY(anchorX0,slopePrev,x0,y0);if(y0>y1&&anchorY0<y1||y0<y1&&anchorY0>y1){anchorY0=y1;anchorX0=getPointX(anchorY0,slopePrev,x0,y0)}tempArr.push(anchorX0,anchorY0,anchorX,anchorY,x1,y1)}else{tempArr.push((x1+x0)/2,(y1+y0)/2,anchorX,anchorY,x1,y1)}}arrS.push(slope)}}else if(lastYPos===null&&i!==0){lastObj||(lastObj=[]);if(lastObj[0]===C){curvePath.push(tempArr);linePath.push(tempArr);isSplineArea&&cmrcManager(curvePath,true,startXPos,yBasePos);isSplineArea&&cmrcManager(linePath,false)}curvePath.push([M,x1,y1]);linePath.push([M,x1,y1]);startXPos=x1;tempArr=[C];startingIndex=i;arrS=[null]}else{curvePath.push([M,x1,y1]);linePath.push([M,x1,y1]);startXPos=x1;tempArr=[C];startingIndex=i}}else{if(lastYPos!==null){if(arrLen>=2){if(curvePath[arrLen-1][0]===M){curvePath.push([R])}if(linePath[lineArrLen-1][0]===M){linePath.push([R])}arrLen=curvePath.length;lineArrLen=linePath.length;lastObj=curvePath[arrLen-1];lastArrLength=lastObj.length;curvePath[arrLen-1].push(x1);curvePath[arrLen-1].push(y1);linePath[lineArrLen-1].push(x1);linePath[lineArrLen-1].push(y1);if(i===num-1){if(lastObj[0]===R){cmrcManager(curvePath,true,startXPos,yBasePos);cmrcManager(linePath,false)}}}else{curvePath.push([M,lastXPos,lastYPos]);curvePath.push([R,x1,y1]);linePath.push([M,lastXPos,lastYPos]);linePath.push([R,x1,y1]);startXPos=lastXPos}}else if(lastYPos===null&&arrLen>=2){lastObj=curvePath[arrLen-1];if(lastObj[0]===R){cmrcManager(curvePath,true,startXPos,yBasePos);cmrcManager(linePath,false)}curvePath.push([M,x1,y1]);linePath.push([M,x1,y1]);startXPos=x1}}}lastObj=curvePath[curvePath.length-1];if(isSplineArea&&lastObj){lastArrLength=lastObj.length;if(lastObj[lastArrLength-1]!==Z&&(lastObj[0]===R||lastObj[0]===C)){cmrcManager(curvePath,true,startXPos,yBasePos);cmrcManager(linePath,false)}}if(!isSplineArea){curvePath=minimizeTendency?curvePath:linePath;curvePath.length>=2&&cmrcManager(curvePath,false)}return{closedPath:curvePath,openPath:linePath}}export{getSplinePath};