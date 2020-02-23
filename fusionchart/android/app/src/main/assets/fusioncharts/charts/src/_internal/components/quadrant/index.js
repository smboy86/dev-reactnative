import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{pluck,pluckNumber,setLineHeight,getDashStyle,getValidValue,getFirstValue,preDefStr,HUNDREDSTRING,convertColor}from"@fusioncharts/core/src/lib";import{addDep}from"@fusioncharts/core/src/dependency-manager";import quadrantAnimation from"./index.animation";var BLANKSTRING="",PXSTRING="px",DASH_DEF="none",NORMALSTRING="normal",POSITION_START=preDefStr.POSITION_START,POSITION_TOP=preDefStr.POSITION_TOP,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,POSITION_END=preDefStr.POSITION_END;addDep({name:"quadrantAnimation",type:"animationRule",extension:quadrantAnimation});var Quadrant=function(_ComponentInterface){_inheritsLoose(Quadrant,_ComponentInterface);function Quadrant(){var _this;_this=_ComponentInterface.call(this)||this;var quadrant=_assertThisInitialized(_this);quadrant.pIndex=1;quadrant.components={};quadrant.conf={};quadrant.graphics={};return _this}var _proto=Quadrant.prototype;_proto.getType=function getType(){return"canvas"};_proto.getName=function getName(){return"quadrant"};_proto.configure=function configure(){var borderColor,borderPadding,borderRadius,backgroundColor,borderDash,fontBdrColor,bgColor,borderThickness,tlConfig,trConfig,blConfig,brConfig,quadrantLabelTL,quadrantLabelTR,quadrantLabelBL,quadrantLabelBR,quadrantXVal,quadrantYVal,quadrantLineColor,quadrantLineThickness,quadrantLineDashLen,quadrantLineIsDashed,quadrantLineDashGap,dashStyle,drawQuadrant,quadrant=this,quadrantConfig=quadrant.conf,chart=quadrant.getFromEnv("chart"),chartConfig=chart.config,chartAttr=chart.getFromEnv("dataSource").chart,canvas=chart.getChildren("canvas")[0],canvasConf=canvas.config,inCanvasStyle=chartConfig.dataLabelStyle,smartLabel=chart.getFromEnv("smartLabel");drawQuadrant=quadrantConfig.enabled=pluckNumber(chartAttr.drawquadrant,0);if(drawQuadrant){quadrantXVal=pluckNumber(chartAttr.quadrantxval);quadrantYVal=pluckNumber(chartAttr.quadrantyval);quadrantLineColor=convertColor(pluck(chartAttr.quadrantlinecolor,canvasConf.canvasBorderColor),pluck(chartAttr.quadrantlinealpha,chartAttr.quadrantlinealpha,HUNDREDSTRING));quadrantLineThickness=pluckNumber(chartAttr.quadrantlinethickness,canvasConf.canvasBorderThickness);quadrantLineIsDashed=pluckNumber(chartAttr.quadrantlinedashed,chartAttr.quadrantlineisdashed,0);quadrantLineDashLen=pluckNumber(chartAttr.quadrantlinedashlen,4);quadrantLineDashGap=pluckNumber(chartAttr.quadrantlinedashgap,2);dashStyle=quadrantLineIsDashed?getDashStyle(quadrantLineDashLen,quadrantLineDashGap):DASH_DEF;quadrantConfig.xVal=quadrantXVal;quadrantConfig.yVal=quadrantYVal;quadrantConfig.quadrantLineColor=quadrantLineColor;quadrantConfig.quadrantLineThickness=quadrantLineThickness;quadrantConfig.dashStyle=dashStyle;quadrantLabelTL=getValidValue(chartAttr.quadrantlabeltl,BLANKSTRING);quadrantLabelTR=getValidValue(chartAttr.quadrantlabeltr,BLANKSTRING);quadrantLabelBL=getValidValue(chartAttr.quadrantlabelbl,BLANKSTRING);quadrantLabelBR=getValidValue(chartAttr.quadrantlabelbr,BLANKSTRING);quadrantConfig.quadrantLabelPadding=pluckNumber(chartAttr.quadrantlabelpadding,3);smartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);smartLabel.setStyle(inCanvasStyle);if(quadrantLabelTL!==BLANKSTRING){fontBdrColor=getFirstValue(chartAttr.quadrantlabeltlbordercolor,chartAttr.quadrantlabelbordercolor,BLANKSTRING);bgColor=pluck(chartAttr.quadrantlabeltlbgcolor,chartAttr.quadrantlabelbgcolor);borderThickness=pluckNumber(chartAttr.quadrantlabeltlborderthickness,chartAttr.quadrantlabelborderthickness,1);fontBdrColor=fontBdrColor?convertColor(fontBdrColor,pluckNumber(chartAttr.quadrantlabeltlborderalpha,chartAttr.quadrantlabelborderalpha,chartAttr.quadrantlabeltlalpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;tlConfig=quadrantConfig.tlConfig;if(!tlConfig){tlConfig=quadrantConfig.tlConfig={enabled:true,styleObj:{}}}tlConfig.label=quadrantLabelTL;tlConfig.styleObj.fontSize=pluck(pluckNumber(chartAttr.quadrantlabeltlfontsize,chartAttr.quadrantlabelfontsize),parseInt(inCanvasStyle.fontSize,10))+PXSTRING;tlConfig.styleObj.lineHeight=inCanvasStyle.lineHeight;tlConfig.styleObj.fontFamily=pluck(chartAttr.quadrantlabeltlfont,chartAttr.quadrantlabelfont,inCanvasStyle.fontFamily);tlConfig.styleObj.color=convertColor(pluck(chartAttr.quadrantlabeltlfontcolor,chartAttr.quadrantlabelfontcolor,inCanvasStyle.color),pluckNumber(chartAttr.quadrantlabeltlfontalpha,chartAttr.quadrantlabelfontalpha,100));tlConfig.styleObj.fontWeight=pluckNumber(chartAttr.quadrantlabeltlfontbold,chartAttr.quadrantlabelfontbold)?"bold":NORMALSTRING;tlConfig.styleObj.fontStyle=pluckNumber(chartAttr.quadrantlabeltlfontitalic,chartAttr.quadrantlabelfontitalic)?"italic":NORMALSTRING;setLineHeight(tlConfig.styleObj);borderColor=fontBdrColor;borderPadding=pluckNumber(chartAttr.quadrantlabeltlborderpadding,chartAttr.quadrantlabelborderpadding,2);borderRadius=pluckNumber(chartAttr.quadrantlabeltlborderradius,chartAttr.quadrantlabelborderradius,0);backgroundColor=bgColor?convertColor(bgColor,pluckNumber(chartAttr.quadrantlabeltlbgalpha,chartAttr.quadrantlabelbgalpha,chartAttr.quadrantlabeltlalpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;borderDash=pluckNumber(chartAttr.quadrantlabeltlborderdashed,chartAttr.quadrantlabelborderdashed,0)?getDashStyle(pluckNumber(chartAttr.quadrantlabeltlborderdashlen,chartAttr.quadrantlabelborderdashlen,4),pluckNumber(chartAttr.quadrantlabeltlborderdashgap,chartAttr.quadrantlabelborderdashgap,2)):DASH_DEF;tlConfig["text-bound"]=[backgroundColor,borderColor,borderThickness,borderPadding,borderRadius,borderDash]}else{quadrantConfig.tlConfig&&(quadrantConfig.tlConfig.label=quadrantLabelTL)}if(quadrantLabelTR!==BLANKSTRING){fontBdrColor=getFirstValue(chartAttr.quadrantlabeltrbordercolor,chartAttr.quadrantlabelbordercolor,BLANKSTRING);bgColor=pluck(chartAttr.quadrantlabeltrbgcolor,chartAttr.quadrantlabelbgcolor);borderThickness=pluckNumber(chartAttr.quadrantlabeltrborderthickness,chartAttr.quadrantlabelborderthickness,1);fontBdrColor=fontBdrColor?convertColor(fontBdrColor,pluckNumber(chartAttr.quadrantlabeltrborderalpha,chartAttr.quadrantlabelborderalpha,chartAttr.quadrantlabeltralpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;trConfig=quadrantConfig.trConfig;if(!trConfig){trConfig=quadrantConfig.trConfig={enabled:true,styleObj:{}}}trConfig.label=getValidValue(chartAttr.quadrantlabeltr,BLANKSTRING);trConfig.styleObj.fontSize=pluck(pluckNumber(chartAttr.quadrantlabeltrfontsize,chartAttr.quadrantlabelfontsize),parseInt(inCanvasStyle.fontSize,10))+PXSTRING;trConfig.styleObj.lineHeight=inCanvasStyle.lineHeight;trConfig.styleObj.fontFamily=pluck(chartAttr.quadrantlabeltrfont,chartAttr.quadrantlabelfont,inCanvasStyle.fontFamily);trConfig.styleObj.color=convertColor(pluck(chartAttr.quadrantlabeltrfontcolor,chartAttr.quadrantlabelfontcolor,inCanvasStyle.color),pluckNumber(chartAttr.quadrantlabeltrfontalpha,chartAttr.quadrantrabelfontalpha,100));trConfig.styleObj.fontWeight=pluckNumber(chartAttr.quadrantlabeltrfontbold,chartAttr.quadrantlabelfontbold)?"bold":NORMALSTRING;trConfig.styleObj.fontStyle=pluckNumber(chartAttr.quadrantlabeltrfontitalic,chartAttr.quadrantlabelfontitalic)?"italic":NORMALSTRING;setLineHeight(trConfig.styleObj);borderColor=fontBdrColor;borderPadding=pluckNumber(chartAttr.quadrantlabeltrborderpadding,chartAttr.quadrantlabelborderpadding,2);borderRadius=pluckNumber(chartAttr.quadrantlabeltrborderradius,chartAttr.quadrantlabelborderradius,0);backgroundColor=bgColor?convertColor(bgColor,pluckNumber(chartAttr.quadrantlabeltrbgalpha,chartAttr.quadrantlabelbgalpha,chartAttr.quadrantlabeltralpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;borderDash=pluckNumber(chartAttr.quadrantlabeltrborderdashed,chartAttr.quadrantlabelborderdashed,0)?getDashStyle(pluckNumber(chartAttr.quadrantlabeltrborderdashlen,chartAttr.quadrantlabelborderdashlen,4),pluckNumber(chartAttr.quadrantlabeltrborderdashgap,chartAttr.quadrantlabelborderdashgap,2)):DASH_DEF;trConfig["text-bound"]=[backgroundColor,borderColor,borderThickness,borderPadding,borderRadius,borderDash]}else{quadrantConfig.trConfig&&(quadrantConfig.trConfig.label=quadrantLabelTR)}if(quadrantLabelBL!==BLANKSTRING){fontBdrColor=getFirstValue(chartAttr.quadrantlabelblbordercolor,chartAttr.quadrantlabelbordercolor,BLANKSTRING);bgColor=pluck(chartAttr.quadrantlabelblbgcolor,chartAttr.quadrantlabelbgcolor);borderThickness=pluckNumber(chartAttr.quadrantlabelblborderthickness,chartAttr.quadrantlabelborderthickness,1);fontBdrColor=fontBdrColor?convertColor(fontBdrColor,pluckNumber(chartAttr.quadrantlabelblborderalpha,chartAttr.quadrantlabelborderalpha,chartAttr.quadrantlabelblalpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;blConfig=quadrantConfig.blConfig;if(!blConfig){blConfig=quadrantConfig.blConfig={enabled:true,styleObj:{}}}blConfig.label=quadrantLabelBL;blConfig.styleObj.fontSize=pluck(pluckNumber(chartAttr.quadrantlabelblfontsize,chartAttr.quadrantlabelfontsize),parseInt(inCanvasStyle.fontSize,10))+PXSTRING;blConfig.styleObj.lineHeight=inCanvasStyle.lineHeight;blConfig.styleObj.fontFamily=pluck(chartAttr.quadrantlabelblfont,chartAttr.quadrantlabelfont,inCanvasStyle.fontFamily);blConfig.styleObj.color=convertColor(pluck(chartAttr.quadrantlabelblfontcolor,chartAttr.quadrantlabelfontcolor,inCanvasStyle.color),pluckNumber(chartAttr.quadrantlabelblfontalpha,chartAttr.quadrantlabelfontalpha,100));blConfig.styleObj.fontWeight=pluckNumber(chartAttr.quadrantlabelblfontbold,chartAttr.quadrantlabelfontbold)?"bold":NORMALSTRING;blConfig.styleObj.fontStyle=pluckNumber(chartAttr.quadrantlabelblfontitalic,chartAttr.quadrantlabelfontitalic)?"italic":NORMALSTRING;setLineHeight(blConfig.styleObj);borderColor=fontBdrColor;borderPadding=pluckNumber(chartAttr.quadrantlabelblborderpadding,chartAttr.quadrantlabelborderpadding,2);borderRadius=pluckNumber(chartAttr.quadrantlabelblborderradius,chartAttr.quadrantlabelborderradius,0);backgroundColor=bgColor?convertColor(bgColor,pluckNumber(chartAttr.quadrantlabelblbgalpha,chartAttr.quadrantlabelbgalpha,chartAttr.quadrantlabelblalpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;borderDash=pluckNumber(chartAttr.quadrantlabelblborderdashed,chartAttr.quadrantlabelborderdashed,0)?getDashStyle(pluckNumber(chartAttr.quadrantlabelblborderdashlen,chartAttr.quadrantlabelborderdashlen,4),pluckNumber(chartAttr.quadrantlabelblborderdashgap,chartAttr.quadrantlabelborderdashgap,2)):DASH_DEF;blConfig["text-bound"]=[backgroundColor,borderColor,borderThickness,borderPadding,borderRadius,borderDash]}else{quadrantConfig.blConfig&&(quadrantConfig.blConfig.label=quadrantLabelBL)}if(quadrantLabelBR!==BLANKSTRING){fontBdrColor=getFirstValue(chartAttr.quadrantlabelbrbordercolor,chartAttr.quadrantlabelbordercolor,BLANKSTRING);bgColor=pluck(chartAttr.quadrantlabelbrbgcolor,chartAttr.quadrantlabelbgcolor);borderThickness=pluckNumber(chartAttr.quadrantlabelbrborderthickness,chartAttr.quadrantlabelborderthickness,1);fontBdrColor=fontBdrColor?convertColor(fontBdrColor,pluckNumber(chartAttr.quadrantlabelbrborderalpha,chartAttr.quadrantlabelborderalpha,chartAttr.quadrantlabelbralpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;brConfig=quadrantConfig.brConfig;if(!brConfig){brConfig=quadrantConfig.brConfig={enabled:true,styleObj:{}}}brConfig.label=getValidValue(chartAttr.quadrantlabelbr,BLANKSTRING);brConfig.styleObj.fontSize=pluck(pluckNumber(chartAttr.quadrantlabelbrfontsize,chartAttr.quadrantlabelfontsize),parseInt(inCanvasStyle.fontSize,10))+PXSTRING;brConfig.styleObj.lineHeight=inCanvasStyle.lineHeight;brConfig.styleObj.fontFamily=pluck(chartAttr.quadrantlabelbrfont,chartAttr.quadrantlabelfont,inCanvasStyle.fontFamily);brConfig.styleObj.color=convertColor(pluck(chartAttr.quadrantlabelbrfontcolor,chartAttr.quadrantlabelfontcolor,inCanvasStyle.color),pluckNumber(chartAttr.quadrantlabelbrfontalpha,chartAttr.quadrantrabelfontalpha,100));brConfig.styleObj.fontWeight=pluckNumber(chartAttr.quadrantlabelbrfontbold,chartAttr.quadrantlabelfontbold)?"bold":NORMALSTRING;brConfig.styleObj.fontStyle=pluckNumber(chartAttr.quadrantlabelbrfontitalic,chartAttr.quadrantlabelfontitalic)?"italic":NORMALSTRING;setLineHeight(brConfig.styleObj);backgroundColor=bgColor?convertColor(bgColor,pluckNumber(chartAttr.quadrantlabelbrbgalpha,chartAttr.quadrantlabelbgalpha,chartAttr.quadrantlabelbralpha,chartAttr.quadrantlabelalpha,100)):BLANKSTRING;borderColor=fontBdrColor;borderPadding=pluckNumber(chartAttr.quadrantlabelbrborderpadding,chartAttr.quadrantlabelborderpadding,2);borderRadius=pluckNumber(chartAttr.quadrantlabelbrborderradius,chartAttr.quadrantlabelborderradius,0);borderDash=pluckNumber(chartAttr.quadrantlabelbrborderdashed,chartAttr.quadrantlabelborderdashed,0)?getDashStyle(pluckNumber(chartAttr.quadrantlabelbrborderdashlen,chartAttr.quadrantlabelborderdashlen,4),pluckNumber(chartAttr.quadrantlabelbrborderdashgap,chartAttr.quadrantlabelborderdashgap,2)):DASH_DEF;brConfig["text-bound"]=[backgroundColor,borderColor,borderThickness,borderPadding,borderRadius,borderDash]}else{quadrantConfig.brConfig&&(quadrantConfig.brConfig.label=quadrantLabelBR)}}};_proto._preDraw=function _preDraw(){var quadrantXVal,quadrantYVal,labelWidthPart1,labelWidthPart2,labelHeightPart1,labelHeightPart2,FALSE=false,quadrant=this,quadrantConfig=quadrant.conf,chart=quadrant.getFromEnv("chart"),xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],xAxisLimit=xAxis.getLimit(),yAxisLimit=yAxis.getLimit(),xMax=xAxisLimit.max,yMax=yAxisLimit.max,xMin=xAxisLimit.min,yMin=yAxisLimit.min,chartConfig=chart.config,canvasWidth=chartConfig.canvasWidth,canvasHeight=chartConfig.canvasHeight,quadrantLabelPadding=quadrantConfig.quadrantLabelPadding,tlConfig=quadrantConfig.tlConfig,trConfig=quadrantConfig.trConfig,blConfig=quadrantConfig.blConfig,brConfig=quadrantConfig.brConfig;quadrantXVal=quadrantConfig.xVal||(quadrantConfig.xVal=(xMin+xMax)/2);quadrantYVal=quadrantConfig.yVal||(quadrantConfig.yVal=(yMin+yMax)/2);if(quadrantYVal>=yMin&&quadrantYVal<=yMax&&quadrantXVal>=xMin&&quadrantXVal<=xMax){labelWidthPart1=canvasWidth/(xMax-xMin)*(quadrantXVal-xMin);labelWidthPart2=canvasWidth-labelWidthPart1;labelHeightPart2=canvasHeight/(yMax-yMin)*(quadrantYVal-yMin);labelHeightPart1=canvasHeight-labelHeightPart2;labelWidthPart1-=quadrantLabelPadding;labelWidthPart2-=quadrantLabelPadding;labelHeightPart1-=quadrantLabelPadding;labelHeightPart2-=quadrantLabelPadding;if(labelHeightPart1<0||labelWidthPart1<0){tlConfig.enabled=FALSE}if(labelHeightPart1<0||labelWidthPart2<0){trConfig.enabled=FALSE}if(labelHeightPart2<0||labelWidthPart1<0){blConfig.enabled=FALSE}if(labelHeightPart2<0||labelWidthPart1<0){brConfig.enabled=FALSE}}else{quadrantConfig.enabled=FALSE}return quadrant};_proto._createGroups=function _createGroups(){var quadrant=this,chart=quadrant.getFromEnv("chart"),animationManager=chart.getFromEnv("animationManager"),quadrantContainer=chart.getChildren("canvas")[0].getChildContainer("quadrantGroup"),quadrantChildContainer,quadrantChildContainerCheck=quadrant.getContainer("quadrantChildContainer"),quadrantLineGroup=quadrant.getContainer("quadrantLineGroup"),quadrantTLGroup=quadrant.getContainer("quadrantTLGroup"),quadrantTRGroup=quadrant.getContainer("quadrantTRGroup"),quadrantBLGroup=quadrant.getContainer("quadrantBLGroup"),quadrantBRGroup=quadrant.getContainer("quadrantBRGroup");quadrantChildContainer=animationManager.setAnimation({el:quadrantChildContainerCheck||"group",attr:{name:"quadrant-child-container"},container:quadrantContainer,component:quadrant,label:"group"});if(!quadrantChildContainerCheck){quadrant.addContainer("quadrantChildContainer",quadrantChildContainer)}quadrant.addContainer("quadrantLineGroup",animationManager.setAnimation({el:quadrantLineGroup||"group",attr:{name:"quadrantLineGroup"},container:quadrantChildContainer,component:quadrant,label:"group"}));quadrant.addContainer("quadrantTLGroup",animationManager.setAnimation({el:quadrantTLGroup||"group",attr:{name:"quadrantTLGroup"},container:quadrantChildContainer,component:quadrant,label:"group"}));quadrant.addContainer("quadrantTRGroup",animationManager.setAnimation({el:quadrantTRGroup||"group",attr:{name:"quadrantTRGroup"},container:quadrantChildContainer,component:quadrant,label:"group"}));quadrant.addContainer("quadrantBLGroup",animationManager.setAnimation({el:quadrantBLGroup||"group",attr:{name:"quadrantBLGroup"},container:quadrantChildContainer,component:quadrant,label:"group"}));quadrant.addContainer("quadrantBRGroup",animationManager.setAnimation({el:quadrantBRGroup||"group",attr:{name:"quadrantBRGroup"},container:quadrantChildContainer,component:quadrant,label:"group"}))};_proto.draw=function draw(){var quadrant=this._preDraw(),quadrantConfig=quadrant.conf,chart=quadrant.getFromEnv("chart"),chartConfig=chart.config,reverseXAxis=chartConfig.reverseXAxis,smartText,defaultObj={wrtVisible:true},smartLabel=quadrant.getFromEnv("smartLabel"),animationManager=quadrant.getFromEnv("animationManager"),graphics=quadrant.graphics,tlLabel=graphics.tlLabel,trLabel=graphics.trLabel,blLabel=graphics.blLabel,brLabel=graphics.brLabel,textDirection=chartConfig.textDirection,xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],quadrantChildContainer,quadrantLineGroup,quadrantTLGroup,quadrantTRGroup,quadrantBLGroup,quadrantBRGroup,tlConfig=quadrantConfig.tlConfig||{},trConfig=quadrantConfig.trConfig||{},blConfig=quadrantConfig.blConfig||{},brConfig=quadrantConfig.brConfig||{},quadrantLabelTL=tlConfig.enabled&&tlConfig.label,quadrantLabelTR=trConfig.enabled&&trConfig.label,quadrantLabelBL=blConfig.enabled&&blConfig.label,quadrantLabelBR=brConfig.enabled&&brConfig.label,offsetLeft=chartConfig.canvasLeft,offsetTop=chartConfig.canvasTop,padding=quadrantConfig.quadrantLabelPadding,xAxisLimit=xAxis.getLimit(),yAxisLimit=yAxis.getLimit(),xAxisMax=reverseXAxis?xAxisLimit.min:xAxisLimit.max,xAxisMin=reverseXAxis?xAxisLimit.max:xAxisLimit.min,yAxisMax=yAxisLimit.max,yAxisMin=yAxisLimit.min,xMin=xAxis.getPixel(xAxisMin,defaultObj)+padding,xMax=xAxis.getPixel(xAxisMax,defaultObj)-padding,yMin=yAxis.getPixel(yAxisMin,defaultObj)-padding,yMax=yAxis.getPixel(yAxisMax,defaultObj)+padding,quadXPos=xAxis.getPixel(quadrantConfig.xVal,defaultObj),quadYPos=yAxis.getPixel(quadrantConfig.yVal,defaultObj),quadLeftWidth=quadXPos-xMin,quadRightWidth=xMax-quadXPos,quadTopHeight=quadYPos-yMax,quadBottomHeight=yMin-quadYPos,horizontalQuadLine=graphics.horizontalQuadLine,verticalQuadLine=graphics.verticalQuadLine,hookFnHide=function hookFnHide(){this.hide()};quadrant._createGroups();quadrantChildContainer=quadrant.getContainer("quadrantChildContainer");quadrantLineGroup=quadrant.getContainer("quadrantLineGroup");quadrantTLGroup=quadrant.getContainer("quadrantTLGroup");quadrantTRGroup=quadrant.getContainer("quadrantTRGroup");quadrantBLGroup=quadrant.getContainer("quadrantBLGroup");quadrantBRGroup=quadrant.getContainer("quadrantBRGroup");if(quadrantConfig.enabled){quadrantChildContainer.show();graphics.horizontalQuadLine=animationManager.setAnimation({el:horizontalQuadLine||"path",container:quadrantLineGroup,attr:{path:"M"+offsetLeft+" "+quadYPos+"h"+chartConfig.canvasWidth,stroke:quadrantConfig.quadrantLineColor,"stroke-dasharray":quadrantConfig.dashStyle,"stroke-width":quadrantConfig.quadrantLineThickness,"stroke-linecap":"butt"},component:quadrant,label:"path"});graphics.verticalQuadLine=animationManager.setAnimation({el:verticalQuadLine||"path",container:quadrantLineGroup,attr:{path:"M"+quadXPos+" "+offsetTop+"v"+chartConfig.canvasHeight,stroke:quadrantConfig.quadrantLineColor,"stroke-width":quadrantConfig.quadrantLineThickness,"stroke-dasharray":quadrantConfig.dashStyle,"stroke-linecap":"butt"},component:quadrant,label:"path"});if(quadrantLabelTL){smartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);smartLabel.setStyle(quadrantConfig.tlConfig.styleObj);smartText=smartLabel.getSmartText(quadrantLabelTL,quadLeftWidth,quadTopHeight);tlLabel=graphics.tlLabel=animationManager.setAnimation({el:tlLabel||"text",attr:{"text-anchor":POSITION_START,"vertical-align":POSITION_TOP,x:xMin,y:yMax,text:smartText.text,direction:textDirection,"text-bound":quadrantConfig.tlConfig["text-bound"]},container:quadrantTLGroup,component:quadrant,label:"text"});tlLabel.css(quadrantConfig.tlConfig.styleObj)}else{tlLabel&&animationManager.setAnimation({el:tlLabel,callback:hookFnHide,component:this,label:"text"})}if(quadrantLabelTR){smartLabel.setStyle(quadrantConfig.trConfig.styleObj);smartText=smartLabel.getSmartText(quadrantLabelTR,quadRightWidth,quadTopHeight);trLabel=graphics.trLabel=animationManager.setAnimation({el:trLabel||"text",attr:{"text-anchor":POSITION_END,"vertical-align":POSITION_TOP,direction:textDirection,x:xMax,y:yMax,text:smartText.text,"text-bound":quadrantConfig.trConfig["text-bound"]},container:quadrantTRGroup,component:quadrant,label:"text"});trLabel.css(quadrantConfig.trConfig.styleObj)}else{trLabel&&animationManager.setAnimation({el:trLabel,callback:hookFnHide,component:this,label:"text"})}if(quadrantLabelBL){smartLabel.setStyle(quadrantConfig.blConfig.styleObj);smartText=smartLabel.getSmartText(quadrantLabelBL,quadLeftWidth,quadBottomHeight);blLabel=graphics.blLabel=animationManager.setAnimation({el:blLabel||"text",attr:{"text-anchor":POSITION_START,"vertical-align":POSITION_BOTTOM,direction:textDirection,x:xMin,y:yMin,text:smartText.text,"text-bound":quadrantConfig.blConfig["text-bound"]},container:quadrantBLGroup,component:quadrant,label:"text"});blLabel.css(quadrantConfig.blConfig.styleObj)}else{blLabel&&animationManager.setAnimation({el:blLabel,callback:hookFnHide,component:this,label:"text"})}if(quadrantLabelBR){smartLabel.setStyle(quadrantConfig.brConfig.styleObj);smartText=smartLabel.getSmartText(quadrantLabelBR,quadRightWidth,quadBottomHeight);brLabel=graphics.brLabel=animationManager.setAnimation({el:brLabel||"text",attr:{"text-anchor":POSITION_END,"vertical-align":POSITION_BOTTOM,direction:textDirection,x:xMax,y:yMin,text:smartText.text,"text-bound":quadrantConfig.brConfig["text-bound"]},container:quadrantBRGroup,component:quadrant,label:"text"});brLabel.css(quadrantConfig.brConfig.styleObj)}else{brLabel&&animationManager.setAnimation({el:brLabel,callback:hookFnHide,component:this,label:"text"})}}else{quadrantChildContainer&&animationManager.setAnimation({el:quadrantChildContainer,component:quadrant,doNotRemove:true,callback:function callback(){this.hide()},label:"group"})}};return Quadrant}(ComponentInterface);export default Quadrant;