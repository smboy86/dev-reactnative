export default function(R){var UNDEF,math=Math,mathCos=math.cos,mathSin=math.sin,mathAbs=math.abs,mathPow=math.pow,mathPI=math.PI,twoPI=2*mathPI,M="M",L="L",A="A",Z="Z",EPSILON=mathPow(2,-24),minRenderingDistance=.01;R.define&&R.define([{name:"ringpath",ringpath:function ringpath(){return this.path(UNDEF,R._lastArgIfGroup(arguments))},ca:function ca(x,y,rx1,rx2,start,end,_ry1,_ry2){var o=this,delta=end%twoPI-start%twoPI,deltaOrig=end-start,shiftAngle=.0001745329,cosStart,sinStart,cosEnd,sinEnd,longshort,path,ry1=_ry1,ry2=_ry2,x1,x2,x3,x4,y1,y2,y3,y4;isNaN(ry1)&&(ry1=rx1);isNaN(ry2)&&(ry2=rx2);o._.ringangle=(start+end)*.5;if(mathAbs(deltaOrig)<EPSILON){cosStart=mathCos(start);sinStart=mathSin(start);path=[M,x+rx1*cosStart,y+ry1*sinStart,L,x+rx2*cosStart,y+ry2*sinStart,Z]}else if(mathAbs(deltaOrig)>EPSILON&&+(mathAbs(deltaOrig)%twoPI<EPSILON||twoPI-mathAbs(deltaOrig)%twoPI<EPSILON)){path=[M,x-rx1,y,A,rx1,ry1,0,0,0,x+rx1,y,A,rx1,ry1,0,0,0,x-rx1,y];if(rx2!==0||ry2!==0){path=path.concat([M,x-rx2,y,A,rx2,ry2,0,0,1,x+rx2,y,A,rx2,ry2,0,0,1,x-rx2,y])}path.push(Z)}else{cosStart=mathCos(start);sinStart=mathSin(start);cosEnd=mathCos(end);sinEnd=mathSin(end);delta=delta%twoPI;if(delta<0){delta+=twoPI}longshort=delta<mathPI?0:1;x1=x+rx1*cosStart;y1=y+ry1*sinStart;x2=x+rx1*cosEnd;y2=y+ry1*sinEnd;x3=x+rx2*cosEnd;y3=y+ry2*sinEnd;if(mathAbs(x1-x2)<minRenderingDistance&&mathAbs(y1-y2)<minRenderingDistance){x1=x+rx1*mathCos(start+shiftAngle);y1=y+ry1*mathSin(start+shiftAngle)}path=[M,x1,y1,A,rx1,ry1,0,longshort,1,x2,y2,L,x3,y3];if(rx2!==0||ry2!==0){x4=x+rx2*cosStart;y4=y+ry2*sinStart;if(mathAbs(x3-x4)<minRenderingDistance&&mathAbs(y3-y4)<minRenderingDistance){x4=x+rx2*mathCos(start+shiftAngle);y4=y+ry2*mathSin(start+shiftAngle)}path.push(A,rx2,ry2,0,longshort,0,x4,y4)}path.push(Z)}return{path:path}}}])}