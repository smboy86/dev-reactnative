import{getDarkColor,getLightColor,getFirstAlpha,getFirstColor,COMMASTRING,hasSVG}from"../lib";var pointColor=function pointColor(_color,_alpha,radius3D,defaultRadius){var colorObj,shadowIntensity,shadowColor,highLightIntensity,loLight,hiLight,highLight,color=getFirstColor(_color),alpha=getFirstAlpha(_alpha);if(radius3D<100&&hasSVG){if(defaultRadius){loLight=getDarkColor(color,Math.floor((85-.2*(100-radius3D))*100)/100);hiLight=getLightColor(color,Math.floor((100-.5*radius3D)*100)/100);colorObj={color:loLight+COMMASTRING+hiLight+COMMASTRING+hiLight+COMMASTRING+loLight,alpha:alpha+COMMASTRING+alpha+COMMASTRING+alpha+COMMASTRING+alpha,radialGradient:true,gradientUnits:"userSpaceOnUse",r:radius3D}}else{shadowIntensity=Math.floor(.85*(100-.35*radius3D)*100)/100;shadowColor=getDarkColor(color,shadowIntensity);highLightIntensity=Math.floor(.5*(100+radius3D)*100)/100;highLight=getLightColor(color,highLightIntensity);colorObj={color:highLight+COMMASTRING+shadowColor,alpha:alpha+COMMASTRING+alpha,ratio:radius3D+","+(100-radius3D),radialGradient:true,gradientUnits:"userSpaceOnUse"}}}else{colorObj={color:color+COMMASTRING+color,alpha:alpha+COMMASTRING+alpha,ratio:"0,100"}}return colorObj};export default pointColor;