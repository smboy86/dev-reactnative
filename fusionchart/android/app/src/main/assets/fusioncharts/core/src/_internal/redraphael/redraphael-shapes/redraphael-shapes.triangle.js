export default function(R){var math=Math,mathPow=math.pow,mathTan=math.tan,mathAcos=math.acos,mathMin=math.min,mathSqrt=math.sqrt,M="M",L="L",Z="Z",Q="Q",p2pdistance=R._cacher((function(x1,y1,x2,y2){return mathSqrt(mathPow(x2-x1,2)+mathPow(y2-y1,2))})),pointAtLength=R._cacher((function(x1,y1,x2,y2,d){var vx=x2-x1,vy=y2-y1,l,px,py;l=p2pdistance(x1,y1,x2,y2);vx/=l;vy/=l;px=x1+vx*d;py=y1+vy*d;return{x:px,y:py}}));R.define&&R.define([{name:"trianglepath",trianglepath:function trianglepath(){var paper=this,args=arguments,group=R._lastArgIfGroup(args),face=paper.path(group);return face.attr("trianglepath",[args[0],args[1],args[2],args[3],args[4],args[5],args[6]||0,args[7]||0,args[8]||0])},fn:{sides:function sides(){var points=this._args;return[p2pdistance(points[0],points[1],points[2],points[3]),p2pdistance(points[2],points[3],points[4],points[5]),p2pdistance(points[4],points[5],points[0],points[1])]},enclosedAngles:function enclosedAngles(){var edges=this._sides;return[mathAcos((mathPow(edges[0],2)+mathPow(edges[2],2)-mathPow(edges[1],2))/(2*edges[0]*edges[2])),mathAcos((mathPow(edges[0],2)+mathPow(edges[1],2)-mathPow(edges[2],2))/(2*edges[0]*edges[1])),mathAcos((mathPow(edges[2],2)+mathPow(edges[1],2)-mathPow(edges[0],2))/(2*edges[2]*edges[1]))]},semiperimeter:function semiperimeter(){var sides=this._sides||this.sides();return(sides[0]+sides[1]+sides[2])/2}},ca:{trianglepath:function trianglepath(x1,y1,x2,y2,x3,y3,r1,r2,r3){if(r1||r2||r3){this._args=arguments;this._sides=this.sides();var angles=this.enclosedAngles(),curveDistance,curvePoints,inradius,s=this.semiperimeter();inradius=mathSqrt(s*(s-this._sides[0])*(s-this._sides[1])*(s-this._sides[2]))/s;curveDistance=[mathMin(r1,inradius)/mathTan(angles[0]/2),mathMin(r2,inradius)/mathTan(angles[1]/2),mathMin(r3,inradius)/mathTan(angles[2]/2)];curvePoints=[pointAtLength(x1,y1,x3,y3,curveDistance[0]),pointAtLength(x1,y1,x2,y2,curveDistance[0]),pointAtLength(x2,y2,x1,y1,curveDistance[1]),pointAtLength(x2,y2,x3,y3,curveDistance[1]),pointAtLength(x3,y3,x2,y2,curveDistance[2]),pointAtLength(x3,y3,x1,y1,curveDistance[2])];this.attr({path:[M,curvePoints[0].x,curvePoints[0].y,Q,x1,y1,curvePoints[1].x,curvePoints[1].y,L,curvePoints[2].x,curvePoints[2].y,Q,x2,y2,curvePoints[3].x,curvePoints[3].y,L,curvePoints[4].x,curvePoints[4].y,Q,x3,y3,curvePoints[5].x,curvePoints[5].y,L,curvePoints[0].x,curvePoints[0].y]})}else{this.attr({path:[M,x1,y1,L,x2,y2,x3,y3,Z]})}}}}])}