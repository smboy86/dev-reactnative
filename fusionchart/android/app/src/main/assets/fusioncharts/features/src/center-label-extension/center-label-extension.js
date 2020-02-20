import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{toRaphaelColor,hashify,parseUnsafeString,pluck,pluckNumber,BLANKSTRING,getFirstColor}from"@fusioncharts/core/src/lib";import{addDep}from"@fusioncharts/core/src/dependency-manager";import centerLabelAnimation from"./center-label.animation";var UNDEF,HIDDEN="hidden",VISIBLE="visible";function replaceMacros(text,macrosArr,valuesArr){var parsedText=text;if(parsedText){var i=macrosArr.length||0,regExpression;while(i--){regExpression=new RegExp(macrosArr[i],"gi");parsedText=parsedText.replace(regExpression,valuesArr[i])}}return parsedText}addDep({name:"centerLabelAnimation",type:"animationRule",extension:centerLabelAnimation});var CenterLabel=function(_ComponentInterface){_inheritsLoose(CenterLabel,_ComponentInterface);function CenterLabel(){return _ComponentInterface.apply(this,arguments)||this}var _proto=CenterLabel.prototype;_proto.getName=function getName(){return"centerLabel"};_proto.getType=function getType(){return"centerLabel"};_proto.configure=function configure(config){var chartAttr=this.getFromEnv("chart-attrib"),numberFormatter=this.getFromEnv("number-formatter"),dataLabelStyle=config.dataLabelStyle,centerLabel=this;centerLabel.config={label:parseUnsafeString(pluck(chartAttr.defaultcenterlabel,"")),font:pluck(chartAttr.centerlabelfont,dataLabelStyle.fontFamily),fontSize:pluckNumber(chartAttr.centerlabelfontsize,parseInt(dataLabelStyle.fontSize,10)),color:getFirstColor(pluck(chartAttr.centerlabelcolor,chartAttr.valuefontcolor,config.style.inCanvasStyle.color,"555555")),alpha:pluckNumber(chartAttr.centerlabelalpha,100),bold:pluckNumber(chartAttr.centerlabelbold,dataLabelStyle.fontWeight),italic:pluckNumber(chartAttr.centerlabelitalic,dataLabelStyle.style),bgColor:pluck(chartAttr.centerlabelbgcolor,""),bgAlpha:pluckNumber(chartAttr.centerlabelbgalpha,100),borderColor:pluck(chartAttr.centerlabelbordercolor,dataLabelStyle.borderColor),borderAlpha:pluckNumber(chartAttr.centerlabelborderalpha,100),borderThickness:pluckNumber(chartAttr.centerlabelborderthickness,dataLabelStyle.borderThickness),borderRadius:pluckNumber(chartAttr.centerlabelborderradius,dataLabelStyle.borderRadius),textPadding:pluckNumber(chartAttr.centerlabeltextpadding,dataLabelStyle.borderPadding),padding:pluckNumber(chartAttr.centerlabelpadding,2),bgOval:pluckNumber(chartAttr.centerlabelbgoval,0),shadow:pluckNumber(chartAttr.showcenterlabelshadow,0),hoverColor:chartAttr.centerlabelhovercolor&&getFirstColor(pluck(chartAttr.centerlabelhovercolor)),hoverAlpha:pluckNumber(chartAttr.centerlabelhoveralpha),toolText:parseUnsafeString(pluck(chartAttr.centerlabeltooltext,BLANKSTRING))};centerLabel.addExtEventListener("datasetrollover",(function(event){var data=event.data,label=pluck(replaceMacros(event.sender.getFromEnv("dataSource").chart.centerlabel,["\\$value","\\$percentValue","\\$displayValue","\\$label"],[numberFormatter.scale(data.value),data.pValue,data.displayValue,data.label]),"");centerLabel.draw(label,false)}),this.getFromEnv("chart").getDatasets()[0]);centerLabel.addExtEventListener("datasetrollout",(function(event){centerLabel.draw(pluck(event.sender.config.label,""),false)}),this.getFromEnv("chart").getDatasets()[0])};_proto.draw=function draw(labelText){var centerLabel=this,text,chart=centerLabel.getFromEnv("chart"),cx=chart.config.canvasLeft+chart.config.canvasWidth*.5,cy=chart.config.canvasTop+chart.config.canvasHeight*.5,dx=chart.getDatasets()[0].config.innerSize,dy=chart.getDatasets()[0].config.innerSize,seriesData=chart.getDatasets()[0].config,labelConfig=this.config,animationManager=centerLabel.getFromEnv("animationManager"),smartLabel=centerLabel.getFromEnv("smartLabel"),centerLabelGraphicsDummy=this.getGraphicalElement("centerLabel"),centerLabelGraphics=centerLabelGraphicsDummy,centerLabelBgGraphics=this.getGraphicalElement("centerLabelBg"),grp=chart.getChildContainer("plotGroup"),labelPadding=labelConfig.padding,textpadding=labelConfig.textPadding*2,cssObj={fontFamily:labelConfig.font,fontSize:labelConfig.fontSize+"px",lineHeight:1.2*labelConfig.fontSize+"px",fontWeight:labelConfig.bold?"bold":"",fontStyle:labelConfig.italic?"italic":""},txtW=(dx*.5-labelPadding)*1.414-textpadding,txtH=(dy*.5-labelPadding)*1.414-textpadding,smartLabelObj,toolTipController=centerLabel.getFromEnv("toolTipController");text=pluck(labelText,labelConfig.label);smartLabel.setStyle(cssObj);smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);smartLabelObj=smartLabel.getSmartText(text,txtW,txtH);if(text){if(labelConfig.bgOval){centerLabelBgGraphics=animationManager.setAnimation({el:centerLabelBgGraphics||"circle",attr:{cx:cx,cy:cy,r:dx*.5-labelPadding,visibility:VISIBLE,container:grp,fill:hashify(labelConfig.bgColor),"fill-opacity":labelConfig.bgAlpha/100,stroke:hashify(labelConfig.borderColor),"stroke-width":labelConfig.borderThickness,"stroke-opacity":labelConfig.borderAlpha/100},component:centerLabel})}centerLabelGraphics=animationManager.setAnimation({el:centerLabelGraphicsDummy||"text",component:centerLabel,container:grp,css:cssObj,attr:{x:cx,y:cy,text:smartLabelObj.text,visibility:VISIBLE,direction:chart.config.textDirection,fill:toRaphaelColor({FCcolor:{color:labelConfig.color,alpha:labelConfig.alpha}}),"text-bound":labelConfig.bgOval?"none":[toRaphaelColor({FCcolor:{color:labelConfig.bgColor,alpha:labelConfig.bgAlpha}}),toRaphaelColor({FCcolor:{color:labelConfig.borderColor,alpha:labelConfig.borderAlpha}}),labelConfig.borderThickness,labelConfig.textPadding,labelConfig.borderRadius]},label:"text"});toolTipController.enableToolTip(centerLabelGraphics,labelConfig.toolText||smartLabelObj.tooltext)}else{centerLabelGraphics&&animationManager.setAnimation({el:centerLabelGraphics,attr:{visibility:HIDDEN},component:centerLabel});centerLabelBgGraphics&&animationManager.setAnimation({el:centerLabelBgGraphics,attr:{visibility:HIDDEN},component:centerLabel})}if(!centerLabelGraphicsDummy){centerLabel.addEventListener("fc-mouseover",centerLabelOnFcMouseOver);centerLabel.addEventListener("fc-mouseout",centerLabelOnFcMouseOut);centerLabel.addEventListener("fc-click",centerLabelOnFcClick);centerLabel.addGraphicalElement("centerLabel",centerLabelGraphics);centerLabel.addGraphicalElement("centerLabelBg",centerLabelBgGraphics)}else{centerLabelGraphics.attr("text")!==text&&centerLabel.centerLabelChange(text)}seriesData.lastCenterLabelConfig=labelConfig;seriesData.centerLabelConfig=labelConfig;function centerLabelOnFcMouseOver(){centerLabel._centerLabelRollover(chart)}function centerLabelOnFcMouseOut(){centerLabel._centerLabelRollout(chart)}function centerLabelOnFcClick(){centerLabel._centerLabelClick(chart)}};_proto.centerLabelChange=function centerLabelChange(labelText){var centerLabelapi=this,chart=centerLabelapi.getFromEnv("chart"),chartConfig=chart.config,chartInstance=centerLabelapi.getFromEnv("chartInstance"),eventArgs={height:chartConfig.height,width:chartConfig.width,pixelHeight:chart.getFromEnv("chartWidth"),pixelWidth:chart.getFromEnv("chartHeight"),id:chartInstance.id,renderer:chartInstance.args.renderer,container:chartInstance.options.containerElement,centerLabelText:labelText};chart.fireChartInstanceEvent("centerLabelChanged",eventArgs)};_proto._centerLabelRollover=function _centerLabelRollover(chart){var chartConfig=chart.config,chartInstance=chart.getFromEnv("chartInstance"),labelConfig=this.config,cLabel=this,eventArgs={height:chartConfig.height,width:chartConfig.width,pixelHeight:chart.getFromEnv("chartWidth"),pixelWidth:chart.getFromEnv("chartHeight"),id:chartInstance.id,renderer:chartInstance.args.renderer,container:chartInstance.options.containerElement,centerLabelText:labelConfig&&labelConfig.label};this.getFromEnv("paper").attr("text")&&chart.fireChartInstanceEvent("centerLabelRollover",eventArgs,UNDEF,cLabel.hoverOnCenterLabel.bind(cLabel,chart))};_proto._centerLabelRollout=function _centerLabelRollout(chart){var chartConfig=chart.config,cLabel=this,chartInstance=chart.getFromEnv("chartInstance"),labelConfig=this.config,eventArgs={height:chartConfig.height,width:chartConfig.width,pixelHeight:chart.getFromEnv("chartWidth"),pixelWidth:chart.getFromEnv("chartHeight"),id:chartInstance.id,renderer:chartInstance.args.renderer,container:chartInstance.options.containerElement,centerLabelText:labelConfig&&labelConfig.label};this.getFromEnv("paper").attr("text")&&chart.fireChartInstanceEvent("centerLabelRollout",eventArgs,UNDEF,cLabel.hoverOffCenterLabel.bind(cLabel,chart))};_proto._centerLabelClick=function _centerLabelClick(chart){var chartConfig=chart.config,chartInstance=chart.getFromEnv("chartInstance"),eventArgs={height:chartConfig.height,width:chartConfig.width,pixelHeight:chart.getFromEnv("chartWidth"),pixelWidth:chart.getFromEnv("chartHeight"),id:chartInstance.id,renderer:chartInstance.args.renderer,container:chartInstance.options.containerElement},labelConfig;labelConfig=this.config;eventArgs.centerLabelText=labelConfig&&labelConfig.label;this.getFromEnv("paper").attr("text")&&chart.fireChartInstanceEvent("centerLabelClick",eventArgs)};_proto.hoverOnCenterLabel=function hoverOnCenterLabel(chart){var labelConfig=chart.getChildren("dataset")[0].config.lastCenterLabelConfig;if(labelConfig.hoverColor||labelConfig.hoverAlpha){this.getGraphicalElement("centerLabel").attr({fill:toRaphaelColor({FCcolor:{color:labelConfig.hoverColor||labelConfig.color,alpha:labelConfig.hoverAlpha||labelConfig.alpha}})})}};_proto.hoverOffCenterLabel=function hoverOffCenterLabel(chart){var labelConfig=chart.getChildren("dataset")[0].config.lastCenterLabelConfig;if(labelConfig.hoverColor||labelConfig.hoverAlpha){this.getGraphicalElement("centerLabel").attr({fill:toRaphaelColor({FCcolor:{color:labelConfig.color,alpha:labelConfig.alpha}})})}};return CenterLabel}(ComponentInterface);export{CenterLabel as default};