var epsilon=1e-6,pi=Math.PI,tau=2*pi,Z="Z",BLANK="",tauEpsilon=tau-epsilon;var Path=function(){function Path(){this._clear()}var _proto=Path.prototype;_proto.moveTo=function moveTo(x,y){this._x0=this._x1=+x;this._y0=this._y1=+y;this.pathStr+="M"+this._x0+","+this._y0};_proto.lineTo=function lineTo(x,y){this._x1=+x;this._y1=+y;this.pathStr+="L"+this._x1+","+this._y1};_proto.quadraticCurveTo=function quadraticCurveTo(_cpx,_cpy,x,y){this._x1=+x;this._y1=+y;var cpx=+_cpx,cpy=+_cpy;this.pathStr+="Q"+cpx+","+cpy+","+this._x1+","+this._y1};_proto.bezierCurveTo=function bezierCurveTo(_cp1x,_cp1y,_cp2x,_cp2y,x,y){this._x1=+x;this._y1=+y;var cp1x=+_cp1x,cp1y=+_cp1y,cp2x=+_cp2x,cp2y=+_cp2y;this.pathStr+="C"+cp1x+","+cp1y+","+cp2x+","+cp2y+","+this._x1+","+this._y1};_proto.rect=function rect(x,y,_w,_h){var path=this,w=+_w,h=+_h;path._x0=path._x1=+x;path._y0=path._y1=+y;path.pathStr+="M"+path._x0+","+path._y0+"h"+w+"v"+h+"h"+-w+"Z"};_proto.arcTo=function arcTo(_x1,_y1,_x2,_y2,_radius){var path=this,dx20,dy20,dx21,dy21,dx01,dy01,xy012,xy01,xy202,xy212,xy21,t01,t21,xy,x0,y0,x1=+_x1,x2=+_x2,y1=+_y1,y2=+_y2,radius=+_radius;x0=path._x1;y0=path._y1;dx21=x2-x1;dy21=y2-y1;dx01=x0-x1;dy01=y0-y1;xy012=dx01*dx01+dy01*dy01;radius=Math.max(radius,0);if(this._x1===null){this._x1=x1;this._y1=y1;this.pathStr+="M"+this._x1+","+this._y1}else if(!(xy012>epsilon)){}else if(!(Math.abs(dy01*dx21-dy21*dx01)>epsilon)||!radius){this._x1=x1;this._y1=y1;this.pathStr+="L"+this._x1+","+this._y1}else{dx20=x2-x0;dy20=y2-y0;xy212=dx21*dx21+dy21*dy21;xy202=dx20*dx20+dy20*dy20;xy21=Math.sqrt(xy212);xy01=Math.sqrt(xy012);xy=radius*Math.tan((pi-Math.acos((xy212+xy012-xy202)/(2*xy21*xy01)))/2);t01=xy/xy01;t21=xy/xy21;if(Math.abs(t01-1)>epsilon){this.pathStr+="L"+(x1+t01*dx01)+","+(y1+t01*dy01)}this._x1=x1+t21*dx21;this._y1=y1+t21*dy21;this.pathStr+="A"+radius+","+radius+",0,0,"+ +(dy01*dx20>dx01*dy20)+","+this._x1+","+this._y1}};_proto.arc=function arc(_x,_y,_radius,_startAngle,_endAngle,_counterclockwise){if(_counterclockwise===void 0){_counterclockwise=false}var x=+_x,y=+_y,radius=+_radius,startAngle=+_startAngle,endAngle=+_endAngle,counterclockwise=!!_counterclockwise,path=this,dx=radius*Math.cos(startAngle),dy=radius*Math.sin(startAngle),x0=x+dx,y0=y+dy,cw=Number(!counterclockwise),da=counterclockwise?startAngle-endAngle:endAngle-startAngle;Math.max(radius,0);if(path._x1===null){path.pathStr+="M"+x0+","+y0}else if(Math.abs(path._x1-x0)>epsilon||Math.abs(path._y1-y0)>epsilon){path.pathStr+="L"+x0+","+y0}if(!radius)return;if(da<0)da=da%tau+tau;if(da>tauEpsilon){path._x1=x0;path._y1=y0;path.pathStr+="A"+radius+","+radius+",0,1,"+cw+","+(x-dx)+","+(y-dy);path.pathStr+="A"+radius+","+radius+",0,1,"+cw+","+path._x1+","+path._y1}else if(da>epsilon){path._x1=x+radius*Math.cos(endAngle);path._y1=y+radius*Math.sin(endAngle);path.pathStr+="A"+radius+","+radius+",0,"+ +(da>=pi)+","+cw+","+path._x1+","+path._y1}};_proto.closePath=function closePath(){if(this._x1!==null){this._x1=this._x0;this._y1=this._y0;this.pathStr+=Z}};_proto.toString=function toString(){return this.pathStr};_proto._clear=function _clear(){this._x0=this._y0=this._x1=this._y1=null;this.pathStr=BLANK};return Path}();export default Path;