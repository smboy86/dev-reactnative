var M="M",L="L",pi=Math.PI,piBy2=pi/2,pi3By2=3*pi/2,pi2=2*pi,getCleanAngle=function getCleanAngle(_angle){var angle=_angle%pi2;return angle=angle<0?angle+pi2:angle},getQuadrant=function getQuadrant(_angle){var angle=getCleanAngle(_angle),quadrant;if(angle>=0&&angle<piBy2){quadrant=0}else if(angle<pi){quadrant=1}else if(angle<pi3By2){quadrant=2}else{quadrant=3}return quadrant},getConnectorPath=function getConnectorPath(startPoint,endPoint,config){if(config===void 0){config={}}var _config=config,isSlanted=_config.isSlanted,quadrant=_config.quadrant,padding=_config.padding,transX=_config.transX,transY=_config.transY,startX=startPoint.x+transX,startY=startPoint.y+transY,endX=endPoint.x+transX,endY=endPoint.y+transY,paddingDirection=quadrant===1||quadrant===2?-1:1;return[M,startX,startY,L,!isSlanted?startX:endX,endY,endX+paddingDirection*(padding||0),endY]};export{getCleanAngle,getQuadrant,getConnectorPath};