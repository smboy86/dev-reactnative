import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Message from"./message";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{pluckNumber,pluck,HEXtoRGB}from"@fusioncharts/core/src/lib";var mathMin=Math.min;var defAnimEffect="normal",PX="px",VIEL_BG_COLOR="000000",DIALOG_BG_COLOR="ffffff";var UNDEF;var MessageLogger=function(_ComponentInterface){_inheritsLoose(MessageLogger,_ComponentInterface);function MessageLogger(){var _this;_this=_ComponentInterface.call(this)||this;_this.pIndex=1;_this.linkedItems=_this.linkedItems||(_this.linkedItems={});_this.components=_this.components||{};_this.components.messages=_this.components.messages||[];_this.graphics=_this.graphics||{};_this.config=_this.config||(_this.config={});return _this}var _proto=MessageLogger.prototype;_proto.getType=function getType(){return"extension"};_proto.getName=function getName(){return"MessageLogger"};_proto.configure=function configure(chart){this.linkedItems.chart=chart;var chartAttr=chart.getFromEnv("chart-attrib")||{},usemessagelog=this.config.usemessagelog=chart.getFromEnv("chartConfig").usemessagelog;this.config.messageLogWPercent=mathMin(pluckNumber(chartAttr.messagelogwpercent,80),100);this.config.messageLogHPercent=mathMin(pluckNumber(chartAttr.messageloghpercent,70),100);this.config.messageLogShowTitle=pluckNumber(chartAttr.messagelogshowtitle,1);this.config.messageLogTitle=pluck(chartAttr.messagelogtitle,"Message Log");this.config.messageLogColor=pluck(chartAttr.messagelogcolor,"#fbfbfb").replace(/^#?([a-f0-9]+)/gi,"$1");this.config.messageLogColorRgb=HEXtoRGB(this.config.messageLogColor);this.config.messageGoesToJS=pluckNumber(chartAttr.messagegoestojs,0);this.config.messageGoesToLog=pluckNumber(chartAttr.messagegoestolog,1);this.config.messageJSHandler=pluck(chartAttr.messagejshandler,"");this.config.messagePassAllToJS=pluckNumber(chartAttr.messagepassalltojs,0);this.config.messagePassAsObject=pluckNumber(chartAttr.messagepassasobject,0);this.config.messageLogIsCancelable=pluckNumber(chartAttr.messagelogiscancelable,1);this.config.alwaysShowMessageLogMenu=pluckNumber(chartAttr.alwaysshowmessagelogmenu,usemessagelog);chart.config.useShowLogMenu=usemessagelog&&this.config.messageGoesToLog;this.config.dynamicScrolling=false;this.config.scrollToBottom=true};_proto._createMessage=function _createMessage(messageObj){var messageObject=new Message(messageObj,this);if(this.graphics.container){messageObject.draw()}return messageObject};_proto.addLog=function addLog(messageObj){var messages=this.components.messages,msgGoesToLog=pluckNumber(messageObj.msgGoesToLog,this.config.messageGoesToLog),msgGoesToJS=pluckNumber(messageObj.msgGoesToJS,this.config.messageGoesToJS),globalJSFunc=window[this.config.messageJSHandler],msgId=pluck(messageObj.msgId,""),title=pluck(messageObj.msgTitle,""),msg=pluck(messageObj.msgText,""),msgType=pluck(messageObj.msgType,"literal"),message;if(this.config.usemessagelog===0){return}if(msgGoesToJS&&globalJSFunc&&typeof globalJSFunc==="function"){this.config.messagePassAllToJS?this.config.messagePassAsObject?globalJSFunc(messageObj):globalJSFunc(msgId,title,msg,msgType):globalJSFunc(msg)}if(messageObj.clearLog==="1"){this.clearLog()}if(msgGoesToLog&&(messageObj.msgTitle||messageObj.msgText)){message=this._createMessage(messageObj);messages.push(message);if(messages.length===1&&!this.config.visible){this.show()}}};_proto.show=function show(){if(!this.config.visible&&this.config.usemessagelog===1){this.config.visible=true;this.draw();if(!this.graphics.container){this.draw()}this.graphics.container&&this.graphics.container.show()}};_proto.hide=function hide(){this.config.visible=false;this.graphics.container&&this.graphics.container.hide()};_proto.clearLog=function clearLog(){var messages=this.components.messages,i,l=messages.length;for(i=0;i<l;i+=1){messages[i]&&messages[i].dispose&&messages[i].dispose()}messages.splice(0,l)};_proto.isDrawn=function isDrawn(){return!!this.graphics.container};_proto.draw=function draw(){var messages=this.components.messages,i,l;if(this.config.usemessagelog===0){if(this.isDrawn()){this.clearLog();this.hide()}}else{this._createHTMLDialogue();if(!this.config.visible){this.hide()}l=messages.length;for(i=0;i<l;i+=1){messages[i]&&messages[i].draw&&messages[i].draw()}}};_proto._createHTMLDialogue=function _createHTMLDialogue(){var msLogger=this,config=this.config,graphics=this.graphics,paper=this.getFromEnv("paper"),chartConfig=this.linkedItems.chart.config,chartWidth=chartConfig.width,chartHeight=chartConfig.height,styles=chartConfig.style,inCanvasStyle=styles&&styles.inCanvasStyle,messageLogWPercent=this.config.messageLogWPercent,messageLogHPercent=this.config.messageLogHPercent,messageLogShowTitle=this.config.messageLogShowTitle,messageLogIsCancelable=this.config.messageLogIsCancelable,messageLogColor=this.config.messageLogColor,messageLogTitle=this.config.messageLogTitle,closeBtnRadius=6,closeBtnContainerW=closeBtnRadius*3,closeBtnContainerH=closeBtnRadius*3,closeBtnYPos=closeBtnContainerH/2,hPadding=5+closeBtnRadius,vPadding=5+closeBtnRadius,dialogWidth=chartWidth*(messageLogWPercent/100),dialogHeight=chartHeight*(messageLogHPercent/100),dialogXPos=(chartWidth-dialogWidth)/2,dialogYPos=(chartHeight-dialogHeight)/2,textAreaWidth=dialogWidth-closeBtnContainerW-hPadding*2,textAreaHeight=dialogHeight-closeBtnContainerH-vPadding*2,veilBgColor=VIEL_BG_COLOR,dialogBgColor=DIALOG_BG_COLOR,dialogStrokeColor=messageLogColor,logBGColor=messageLogColor,container=graphics.container,transposeAnimDuration=this.isDrawn()&&chartConfig.animation&&chartConfig.animation.transposeAnimDuration,tempAttrObj,dialogAttr,logBgAttr,logWrapperAttr;if(!container){container=graphics.container=paper.html("div",{fill:"transparent"},{fontSize:10+PX,lineHeight:15+PX},this.getFromEnv("chart-container"));graphics.veil=paper.html("div",{id:"veil",fill:veilBgColor,opacity:.1},UNDEF,container).on("fc-click",(function(){messageLogIsCancelable&&msLogger.hide()}));if(messageLogTitle&&messageLogShowTitle){graphics.title=paper.html("p",{id:"Title",innerHTML:messageLogTitle,x:5,y:5},{"font-weight":"bold"},container)}graphics.dialog=paper.html("div",{id:"dialog",strokeWidth:1},{borderRadius:5+PX,boxShadow:"1px 1px 3px #000000","-webkit-border-radius":5+PX,"-webkit-box-shadow":"1px 1px 3px #000000",filter:'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'},container);graphics.logBackground=paper.html("div",{id:"dialogBackground",x:0,y:0},UNDEF,graphics.dialog);if(messageLogIsCancelable){graphics.closeButton=paper.html("div",{id:"closeButton",x:dialogWidth-vPadding-3,y:closeBtnYPos-7,innerHTML:"<b>x</b>"},{cursor:"pointer",_cursor:"hand"},graphics.dialog).on("fc-click",(function(){messageLogIsCancelable&&msLogger.hide()}))}graphics.logWrapper=paper.html("div",{id:"logWrapper"},{overflow:"auto"},graphics.dialog).on("scroll",(function(){var wrapper=this,scrollTop=wrapper&&wrapper.scrollTop,scrollHeight=wrapper&&wrapper.scrollHeight,wrapperHeight=wrapper&&wrapper.offsetHeight;if(config.dynamicScrolling){config.dynamicScrolling=false;return}config.scrollToBottom=scrollHeight-scrollTop===wrapperHeight}));graphics.log=paper.html("div",{id:"log",x:0,y:0},{},graphics.logWrapper)}container.css({fontFamily:inCanvasStyle.fontFamily});graphics.dialog.attr({fill:dialogBgColor,stroke:dialogStrokeColor});graphics.logBackground.attr({fill:logBGColor});tempAttrObj={width:chartWidth,height:chartHeight};dialogAttr={x:dialogXPos,y:dialogYPos,width:dialogWidth,height:dialogHeight};logBgAttr={width:dialogWidth,height:dialogHeight};logWrapperAttr={x:(dialogWidth-textAreaWidth)/2,y:(dialogHeight-textAreaHeight)/2,width:textAreaWidth,height:textAreaHeight};if(transposeAnimDuration){container.animate(tempAttrObj,transposeAnimDuration,defAnimEffect);graphics.veil.animate(tempAttrObj,transposeAnimDuration,defAnimEffect);graphics.dialog.animate(dialogAttr,transposeAnimDuration,defAnimEffect);graphics.logBackground.animate(logBgAttr,transposeAnimDuration,defAnimEffect);graphics.logWrapper.animate(logWrapperAttr,transposeAnimDuration,defAnimEffect)}else{container.attr(tempAttrObj);graphics.veil.attr(tempAttrObj);graphics.dialog.attr(dialogAttr);graphics.logBackground.attr(logBgAttr);graphics.logWrapper.attr(logWrapperAttr)}};return MessageLogger}(ComponentInterface);export default MessageLogger;