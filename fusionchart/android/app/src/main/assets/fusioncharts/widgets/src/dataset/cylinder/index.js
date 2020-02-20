import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{preDefStr,COMMASTRING,toRaphaelColor,pluckNumber,BLANKSTRING,convertColor,getDarkColor,getLightColor}from"@fusioncharts/core/src/lib";import CylinderThermometerBase from"../_internal/cylinderthermometerbase";import{addDep}from"@fusioncharts/core/src/dependency-manager";import cylinderAnimation from"./index.animation";var A="A",math=Math,mathMax=math.max,mathMin=math.min,ROLLOVER="DataPlotRollOver",ROLLOUT="DataPlotRollOut",win=window,userAgent=win.navigator.userAgent,isIE=/msie/i.test(userAgent)&&!win.opera,Z="Z",HUNDREDPERCENT="100%",zeroCommaHundredStr="0,100",topLightGlowAlphaStr="40,0",btnBorderLightAlphaStr="50,50,50,50,50,70,50,50",btnBorderLightRatioStr="0,15,0,12,0,15,43,15",backAlphaStr="30,30,30,30,30,30,30,30",backRatioStr="0,15,43,15,0,12,0,15",frontRatioStr="0,15,0,12,0,15,43,15",TRACKER_FILL="rgba(192,192,192,"+(isIE?.002:1e-6)+")",M="M",L="L",EVENTARGS="eventArgs",POSITION_TOP=preDefStr.POSITION_TOP,POSITION_MIDDLE=preDefStr.POSITION_MIDDLE,getScaleFactor=function getScaleFactor(_origW,_origH,canvasWidth,canvasHeight){var scaleFactor,origH=_origH,origW=_origW;origH=pluckNumber(origH,canvasHeight);origW=pluckNumber(origW,canvasWidth);if(!origH||!origW){scaleFactor=1}else if(origW/canvasWidth===origH/canvasHeight){scaleFactor=canvasWidth/origW}else{scaleFactor=Math.min(canvasWidth/origW,canvasHeight/origH)}return scaleFactor};addDep({name:"cylinderAnimation",type:"animationRule",extension:cylinderAnimation});var CylinderDataset=function(_CylinderThermometerB){_inheritsLoose(CylinderDataset,_CylinderThermometerB);function CylinderDataset(){return _CylinderThermometerB.apply(this,arguments)||this}var _proto=CylinderDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"cylinder"};_proto._manageSpace=function _manageSpace(){var ds=this,dsConfig=ds.config,chart=ds.getFromEnv("chart"),chartConfig=chart.config,chartWidth=chartConfig.width,chartHwight=chartConfig.height,canvasWidth=chartConfig.canvasWidth,canvasHeight=chartConfig.canvasHeight,canvasLeft=chartConfig.canvasLeft,canvasTop=chartConfig.canvasTop,canvasRight=chartConfig.canvasRight,xDefined=chartConfig.xDefined,yDefined=chartConfig.yDefined,rDefined=chartConfig.rDefined,hDefined=chartConfig.hDefined,gaugeOriginX=chartConfig.gaugeOriginX,gaugeOriginY=chartConfig.gaugeOriginY,gaugeRadius=chartConfig.gaugeRadius,gaugeHeight=chartConfig.gaugeHeight,gaugeYScale=chartConfig.gaugeYScale,scaleFactor=getScaleFactor(chartConfig.origW,chartConfig.origH,chartWidth,chartHwight),top=0,bottom=0,left=0,right=0,gaugeRight,centerPos,gaugeDiameter,gaugeYfactor,measure,canvasLeftShift;measure=ds._getLabelSpace();canvasHeight-=measure;bottom+=measure;if(!rDefined){gaugeRadius=mathMax(mathMin(canvasWidth,canvasHeight*1.2)/2,5)}else{gaugeRadius=gaugeRadius*scaleFactor}chartConfig.effectiveR=gaugeRadius;gaugeDiameter=gaugeRadius*2;gaugeYfactor=gaugeRadius*gaugeYScale;top+=gaugeYfactor;canvasTop+=gaugeYfactor;bottom+=gaugeYfactor;canvasHeight-=2*gaugeYfactor;if(xDefined){gaugeOriginX=gaugeOriginX*scaleFactor;canvasLeftShift=gaugeOriginX-gaugeRadius-canvasLeft}else{centerPos=(canvasRight-canvasLeft)/2;canvasLeftShift=centerPos-gaugeRadius;gaugeRight=canvasLeftShift+gaugeDiameter;if(gaugeRight>canvasWidth){canvasLeftShift=canvasWidth-gaugeDiameter}}left+=canvasLeftShift;canvasLeft+=canvasLeftShift;canvasWidth-=canvasLeftShift;right+=canvasWidth-gaugeDiameter;if(yDefined){gaugeOriginY=gaugeOriginY*scaleFactor}if(!hDefined){if(yDefined){gaugeHeight=gaugeOriginY-canvasTop}else{gaugeHeight=canvasHeight;gaugeOriginY=canvasTop+gaugeHeight}}else{gaugeHeight=gaugeHeight*scaleFactor;if(yDefined){top+=gaugeOriginY-gaugeHeight-canvasTop}else{gaugeOriginY=canvasTop+gaugeHeight}}bottom+=canvasTop+canvasHeight-gaugeOriginY;dsConfig.gaugeOriginX=gaugeOriginX;dsConfig.gaugeOriginY=gaugeOriginY;dsConfig.gaugeRadius=gaugeRadius;dsConfig.gaugeHeight=gaugeHeight;dsConfig.gaugeYScale=gaugeYScale;return{top:top,bottom:bottom+8,left:left,right:right}};_proto.draw=function draw(){var dataSet=this,dsConfig=dataSet.config,smartLabel=dataSet.getFromEnv("smartLabel"),iapi=dataSet.getFromEnv("chart"),toolTipController=dataSet.getFromEnv("toolTipController"),trackerLayer=iapi.getChildContainer("trackerGroup"),parentContainer=iapi.getChildContainer().plotGroup,fluidTop=dataSet.getGraphicalElement("fluidTop"),fluid=dataSet.getGraphicalElement("fluid"),cylinterTop=dataSet.getGraphicalElement("cylinterTop"),frontLight1=dataSet.getGraphicalElement("frontLight1"),frontLight=dataSet.getGraphicalElement("frontLight"),front=dataSet.getGraphicalElement("front"),back=dataSet.getGraphicalElement("back"),btnBorderLight=dataSet.getGraphicalElement("btnBorderLight"),btnBorder1=dataSet.getGraphicalElement("btnBorder1"),btnBorder=dataSet.getGraphicalElement("btnBorder"),label=dataSet.getGraphicalElement("label"),dataLabelsLayer=iapi.getChildContainer("datalabelsGroup"),dataLabelContainerDummy=dataSet.getContainer("dataLabelContainer"),dataLabelContainer,trackerContainer=dataSet.getContainer("trackerContainer"),hotElement=dataSet.getGraphicalElement("hotElement"),scale=dataSet.getFromEnv("scale"),chartConfig=iapi.config,canvasLeft=chartConfig.canvasLeft,canvasTop=chartConfig.canvasTop,canvasHeight=chartConfig.canvasHeight,r=chartConfig.effectiveR||40,value=pluckNumber(dsConfig.value,scale.getLimit().min),gaugePos=scale.getPixel(value),x=canvasLeft+r,y=canvasTop,h=canvasHeight,style=iapi.config.dataLabelStyle,fluidColor=dsConfig.gaugeFillColor,fluidDarkColor=getDarkColor(fluidColor,70),fluidLightColor=getLightColor(fluidColor,70),fluidEdgeColor=getDarkColor(fluidDarkColor,90),fluidAlpha=chartConfig.gaugeFillAlpha,fluidStroke=3,gaugeContainerColor=dsConfig.gaugeContainerColor,darkConColor=getDarkColor(gaugeContainerColor,80),darkConColor1=getDarkColor(gaugeContainerColor,90),lightConColor=getLightColor(gaugeContainerColor,80),r3dFactor=chartConfig.gaugeYScale,containerDummy=dataSet.getContainer("container"),animationManager=dataSet.getFromEnv("animationManager"),canvasHorizontalDiff=Math.abs(chartConfig.width-chartConfig.canvasRight-canvasLeft),container,ypos,r2=r*r3dFactor,fluidStrHF=fluidStroke/2,r3=r-fluidStrHF,y2=dsConfig.cylBase=y+h,y3=gaugePos,x1=x-r,x2=x+r,x3=x1+fluidStrHF,x4=x2-fluidStrHF,xBt1=x1-2,xBt2=x2+2,rBt1=r+2,rBt2=r2+2,yBt1=y2+4,yBt2=yBt1+.001,lightX=r*.85,x5=x-lightX,x6=x+lightX,lightY=Math.sqrt((1-lightX*lightX/(r*r))*r2*r2),y4=y+lightY,y5=y2+lightY,y6=y-1,use3DLighting=chartConfig.use3DLighting,topColorStr,topStrokeStr,showHoverEffect=dsConfig.showHoverEffect,plotFillHoverAlpha=dsConfig.plotFillHoverAlpha,plotFillHoverColor=dsConfig.plotFillHoverColor,fluidHoverDarkColor,fluidHoverLightColor,fluidHoverEdgeColor,eventArgs,dataLabelTooltip,dataLabelObj,fluidAttr=dsConfig.fluidAttr,backColor,frontColor,fluidFill,borderColor=convertColor(darkConColor,50),btnBorderAttr={"stroke-width":4},btnBorder1Attr={"stroke-width":4},btnBorderLightAttr={"stroke-width":0},backAttr={"stroke-width":1},fluidTopAttr={"stroke-width":2},frontAttr={"stroke-width":1},frontLightAttr={"stroke-width":0},frontLight1Attr={"stroke-width":0},cylinterTopAttr={"stroke-width":2},hotElementAttr={stroke:TRACKER_FILL,fill:TRACKER_FILL},dataLabelContainerAttr={},labelAttr;if(!fluidAttr){fluidAttr=dsConfig.fluidAttr={}}fluidAttr["stroke-width"]=0;eventArgs={value:dsConfig.value,displayValue:dsConfig.displayValue,toolText:dsConfig.toolText,cylOriginX:dsConfig.gaugeOriginX,cylOriginY:dsConfig.gaugeOriginY,cylRadius:dsConfig.gaugeRadius,cylHeight:dsConfig.gaugeHeight,cylYScale:dsConfig.gaugeYScale,cylFillColor:dsConfig.gaugeFillColor,cylGlassColor:dsConfig.gaugeContainerColor};if(use3DLighting){backColor=lightConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor1+COMMASTRING+darkConColor1+COMMASTRING+darkConColor+COMMASTRING+lightConColor;fluidFill=toRaphaelColor({FCcolor:{cx:.5,cy:0,r:HUNDREDPERCENT,color:fluidLightColor+COMMASTRING+fluidDarkColor,alpha:fluidAlpha+COMMASTRING+fluidAlpha,ratio:zeroCommaHundredStr,radialGradient:true}});topColorStr=toRaphaelColor({FCcolor:{cx:.5,cy:.7,r:HUNDREDPERCENT,color:fluidLightColor+COMMASTRING+fluidDarkColor,alpha:fluidAlpha+COMMASTRING+fluidAlpha,ratio:zeroCommaHundredStr,radialGradient:true}});topStrokeStr=convertColor(fluidLightColor,fluidAlpha);frontColor=lightConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor+COMMASTRING+lightConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor;frontLightAttr.path=[M,x1,y2,A,r,r2,1,0,0,x5,y5,L,x5,y4,A,r,r2,0,0,1,x1,y,Z];frontLightAttr.fill=toRaphaelColor({FCcolor:{color:frontColor,alpha:topLightGlowAlphaStr,ratio:zeroCommaHundredStr,angle:0}});frontLight1Attr.path=[M,x6,y5,A,r,r2,0,0,0,x2,y2,L,x2,y,A,r,r2,1,0,0,x6,y4,Z];frontLight1Attr.fill=toRaphaelColor({FCcolor:{color:frontColor,alpha:topLightGlowAlphaStr,ratio:zeroCommaHundredStr,angle:180}})}else{backColor=lightConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor;topColorStr=fluidFill=convertColor(fluidDarkColor,fluidAlpha);topStrokeStr=convertColor(fluidEdgeColor);frontColor=darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor+COMMASTRING+darkConColor}fluidAttr.bodyOut={fill:fluidFill};fluidAttr.topOut={stroke:topStrokeStr,fill:topColorStr};if(showHoverEffect){fluidHoverDarkColor=getDarkColor(plotFillHoverColor,70);fluidHoverLightColor=getLightColor(plotFillHoverColor,70);fluidHoverEdgeColor=getDarkColor(fluidHoverDarkColor,90);if(use3DLighting){fluidAttr.bodyHover={fill:toRaphaelColor({FCcolor:{cx:.5,cy:0,r:HUNDREDPERCENT,color:fluidHoverLightColor+COMMASTRING+fluidHoverDarkColor,alpha:plotFillHoverAlpha+COMMASTRING+plotFillHoverAlpha,ratio:zeroCommaHundredStr,radialGradient:true}})};fluidAttr.topHover={stroke:convertColor(fluidHoverLightColor,plotFillHoverAlpha),fill:toRaphaelColor({FCcolor:{cx:.5,cy:.7,r:HUNDREDPERCENT,color:fluidHoverLightColor+COMMASTRING+fluidHoverDarkColor,alpha:plotFillHoverAlpha+COMMASTRING+plotFillHoverAlpha,ratio:zeroCommaHundredStr,radialGradient:true}})}}else{fluidAttr.bodyHover={fill:convertColor(fluidHoverDarkColor,plotFillHoverAlpha)};fluidAttr.topHover={stroke:convertColor(fluidHoverEdgeColor),fill:convertColor(fluidHoverDarkColor,plotFillHoverAlpha)}}}fluidAttr.fill=fluidFill;fluidAttr.path=[M,x1,y2,A,r,mathMax(r2,1),0,0,0,x2,y2,L,x2,y3,A,r,mathMax(r2,1),0,0,1,x1,y3,Z];fluidTopAttr.fill=topColorStr;fluidTopAttr.stroke=topStrokeStr;fluidTopAttr.path=[M,x3,y3,A,r3,r2,0,0,0,x4,y3,L,x4,y3,A,r3,r2,0,0,0,x3,y3,Z];btnBorderAttr.stroke=convertColor(darkConColor,80);btnBorderAttr.path=[M,xBt1,yBt1,A,rBt1,rBt2,0,0,0,xBt2,yBt1,L,xBt2,yBt2,A,rBt1,rBt2,0,0,0,xBt1,yBt2,Z];btnBorder1Attr.stroke=borderColor;btnBorder1Attr.path=[M,x1,yBt1,A,r,r2,0,0,0,x2,yBt1,L,x2,yBt2,A,r,r2,0,0,0,x1,yBt2,Z];btnBorderLightAttr.path=[M,x1,y2,A,r,r2,0,0,0,x2,y2,A,r,r2,0,0,0,x1,y2,Z];btnBorderLightAttr.fill=toRaphaelColor({FCcolor:{color:lightConColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor+COMMASTRING+lightConColor+COMMASTRING+darkConColor+COMMASTRING+fluidDarkColor+COMMASTRING+darkConColor+COMMASTRING+lightConColor,alpha:btnBorderLightAlphaStr,ratio:btnBorderLightRatioStr,angle:0}});backAttr.path=[M,x1,y2,A,r,r2,0,0,0,x2,y2,L,x2,y,A,r,r2,0,0,0,x1,y,Z];backAttr.stroke=borderColor;backAttr.fill=toRaphaelColor({FCcolor:{color:backColor,alpha:backAlphaStr,ratio:backRatioStr,angle:0}});frontAttr.path=[M,x1,y2,A,r,r2,0,0,0,x2,y2,L,x2,y,A,r,r2,0,0,1,x1,y,Z];frontAttr.stroke=borderColor;frontAttr.fill=toRaphaelColor({FCcolor:{color:frontColor,alpha:backAlphaStr,ratio:frontRatioStr,angle:0}});cylinterTopAttr.stroke=convertColor(darkConColor,40);cylinterTopAttr.path=[M,x1,y6,A,r,r2,0,0,0,x2,y6,L,x2,y6,A,r,r2,0,0,0,x1,y6,Z];hotElementAttr.path=[M,x1,y2,x1,yBt1+4,A,r,r2,0,0,0,x2,yBt1+4,L,x2,y2,x2,y,A,r,r2,0,0,0,x1,y,Z];dataLabelContainerAttr.opacity=dsConfig.showValue?1:0;smartLabel.setStyle(style);ypos=y2+r2+(dsConfig.valuePadding||0)+8;dataLabelObj=smartLabel.getSmartText(dsConfig.displayValue,chartConfig.width-chartConfig.marginLeft-chartConfig.marginRight-canvasHorizontalDiff/2,+chartConfig.height-ypos-chartConfig.marginBottom);dataLabelTooltip=dataLabelObj.tooltext||BLANKSTRING;labelAttr={text:dataLabelObj.text,x:x,y:ypos,"text-anchor":POSITION_MIDDLE,"vertical-align":POSITION_TOP,fill:style.color,"text-bound":[style.backgroundColor,style.borderColor,style.borderThickness,style.borderPadding,style.borderRadius,style.borderDash]};container=animationManager.setAnimation({el:containerDummy||"group",attr:{name:"cylinder"},container:parentContainer,component:dataSet,label:"group"});btnBorder=animationManager.setAnimation({el:btnBorder||"path",attr:btnBorderAttr,container:container,component:dataSet,label:"path"});btnBorder1=animationManager.setAnimation({el:btnBorder1||"path",attr:btnBorder1Attr,container:container,component:dataSet,label:"path"});btnBorderLight=animationManager.setAnimation({el:btnBorderLight||"path",attr:btnBorderLightAttr,container:container,component:dataSet,label:"path"});back=animationManager.setAnimation({el:back||"path",attr:backAttr,container:container,component:dataSet,label:"path"});fluid=animationManager.setAnimation({el:fluid||"path",attr:fluidAttr,container:container,component:dataSet,label:"plotFluid"});fluidTop=animationManager.setAnimation({el:fluidTop||"path",attr:fluidTopAttr,container:container,component:dataSet,label:"plotFluidTop"});front=animationManager.setAnimation({el:front||"path",attr:frontAttr,container:container,component:dataSet,label:"path"});frontLight=animationManager.setAnimation({el:frontLight||"path",attr:frontLightAttr,container:container,component:dataSet,label:"path"});frontLight1=animationManager.setAnimation({el:frontLight1||"path",attr:frontLight1Attr,container:container,component:dataSet,label:"path"});cylinterTop=animationManager.setAnimation({el:cylinterTop||"path",attr:cylinterTopAttr,container:container,component:dataSet,label:"path"});trackerContainer=animationManager.setAnimation({el:trackerContainer||"group",attr:{name:"tracker-group"},container:trackerLayer,component:dataSet,label:"group"});dataLabelContainer=animationManager.setAnimation({el:dataLabelContainerDummy||"group",attr:dataLabelContainerAttr,container:dataLabelsLayer,component:dataSet,label:"labelGroup"});label=animationManager.setAnimation({el:label||"text",attr:labelAttr,container:dataLabelContainer,component:dataSet,label:"text"});hotElement=animationManager.setAnimation({el:hotElement||"path",attr:hotElementAttr,container:trackerContainer,component:dataSet,label:"path"});if(dsConfig.showTooltip){toolTipController.enableToolTip(label,dataLabelTooltip)}else{toolTipController.disableToolTip(label)}if(!containerDummy){hotElement.on("fc-click",(function(setDataArr){var ele=this;iapi.plotEventHandler(ele,setDataArr)})).hover((function(data){var ele=this;if(dsConfig.showHoverEffect){dataSet.getGraphicalElement("fluid")&&dataSet.getGraphicalElement("fluid").attr(fluidAttr.bodyHover);dataSet.getGraphicalElement("fluidTop")&&dataSet.getGraphicalElement("fluidTop").attr(fluidAttr.topHover)}iapi.plotEventHandler(ele,data,ROLLOVER)}),(function(data){var ele=this;if(dsConfig.showHoverEffect){dataSet.getGraphicalElement("fluid")&&dataSet.getGraphicalElement("fluid").attr(fluidAttr.bodyOut);dataSet.getGraphicalElement("fluidTop")&&dataSet.getGraphicalElement("fluidTop").attr(fluidAttr.topOut)}iapi.plotEventHandler(ele,data,ROLLOUT)}));dataSet.addContainer("container",container);dataSet.addGraphicalElement("btnBorder",btnBorder);dataSet.addGraphicalElement("btnBorder1",btnBorder1);dataSet.addGraphicalElement("btnBorderLight",btnBorderLight);dataSet.addGraphicalElement("back",back);dataSet.addGraphicalElement("fluid",fluid);dataSet.addGraphicalElement("fluidTop",fluidTop);dataSet.addGraphicalElement("front",front);dataSet.addGraphicalElement("frontLight",frontLight);dataSet.addGraphicalElement("frontLight1",frontLight1);dataSet.addGraphicalElement("cylinterTop",cylinterTop);dataSet.addContainer("trackerContainer",trackerContainer);dataSet.addGraphicalElement("hotElement",hotElement)}if(!dataLabelContainerDummy){dataSet.addContainer("dataLabelContainer",dataLabelContainer);dataSet.addGraphicalElement("label",label)}hotElement.data(EVENTARGS,eventArgs);if(!dsConfig.toolText){toolTipController.disableToolTip(hotElement)}else{toolTipController.enableToolTip(hotElement,dsConfig.toolText)}};return CylinderDataset}(CylinderThermometerBase);export default CylinderDataset;