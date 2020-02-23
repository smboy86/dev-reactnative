import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";import{PXSTRING}from"@fusioncharts/core/src/lib";var validDateLen=[2,2,4],formatDate=function formatDate(x){return(x<10?"0"+x:x)+""};function blur(event){var manager=this.getLinkedParent(),text=event.originalEvent.target.value+"",givenDate=text.split("/"),i,len=givenDate.length;if(len===3){for(i=0;i<len;i++){if(isNaN(givenDate[i])||givenDate[i].length!==validDateLen[i]){return}}manager.updateCalendar({day:+givenDate[0],month:+givenDate[1],year:+givenDate[2]},this.config.id)}}var DateBox=function(_SmartRenderer){_inheritsLoose(DateBox,_SmartRenderer);function DateBox(id){var _this;_this=_SmartRenderer.call(this,id)||this;var dateBox=_assertThisInitialized(_this);_this.addEventListener("blur",blur.bind(_assertThisInitialized(_this)));_this.addEventListener("keyup",(function(e){dateBox.setData({tempDate:e.originalEvent.target.value})}));return _this}var _proto=DateBox.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_SmartRenderer.prototype.__setDefaultConfig.call(this);var dateBoxConfig=this.config;dateBoxConfig.enabled=true;dateBoxConfig.inputBoxWidth=65;dateBoxConfig.tempDate=false;dateBoxConfig._labelStyle={"font-size":"12px","font-weight":"normal","font-style":"normal",color:"#5F5F5F"};dateBoxConfig._inputStyle={"font-size":"12px",border:"1px solid #efefef","background-color":"#fcfcfc",color:"#5F5F5F",width:dateBoxConfig.inputBoxWidth+PXSTRING,padding:"2px"};dateBoxConfig.date={day:8,month:10,year:2018}};_proto.configureAttributes=function configureAttributes(inputConfig){if(inputConfig===void 0){inputConfig={}}_SmartRenderer.prototype.configureAttributes.call(this,inputConfig);var dateBox=this,config=dateBox.config,curDate,styleDef=dateBox.getFromEnv("getStyleDef"),baseTextStyle=dateBox.getFromEnv("baseTextStyle");Object.assign(config,inputConfig);curDate=config.date;config.value=formatDate(curDate.day)+"/"+formatDate(curDate.month)+"/"+formatDate(curDate.year);config._finalLabelStyle=Object.assign({},config._labelStyle,baseTextStyle,styleDef(config.labelStyle));config._finalInputStyle=Object.assign({},config._inputStyle,baseTextStyle,styleDef(config.inputStyle));delete config._finalInputStyle["line-height"]};_proto.getDimension=function getDimension(){var dateBox=this,dateBoxConfig=dateBox.config,labelDim,smartLabel=dateBox.getFromEnv("smartLabel"),fontParser=dateBox.getFromEnv("fontParser"),fSize=fontParser(dateBoxConfig._finalInputStyle["font-size"]);smartLabel.setStyle(Object.assign({},dateBoxConfig._finalLabelStyle));dateBoxConfig.labelDim=labelDim=smartLabel.getOriSize(dateBoxConfig.label);smartLabel.setStyle(Object.assign({},dateBoxConfig._finalInputStyle));dateBoxConfig.inputBoxWidth=smartLabel.getOriSize(dateBoxConfig.value).width+10;dateBoxConfig._finalInputStyle.width=Math.max(65,dateBoxConfig.inputBoxWidth)+PXSTRING;return{width:labelDim.width+dateBoxConfig.inputBoxWidth,height:Math.max(smartLabel._lineHeight,fSize*1.5)}};_proto.setTranslation=function setTranslation(x,y){this.config.position={x:x,y:y}};_proto.draw=function draw(){var dateBox=this,dateBoxConfig=dateBox.config,position=dateBoxConfig.position,labelDim=dateBoxConfig.labelDim,curDate=dateBoxConfig.date||{},value=formatDate(curDate.day)+"/"+formatDate(curDate.month)+"/"+formatDate(curDate.year);dateBox.addGraphicalElement({el:"html",attr:{x:position.x,y:position.y,type:"div",text:dateBoxConfig.label},component:dateBox,css:dateBoxConfig._finalLabelStyle,container:{id:"box-container",label:"box-container",isParent:true},label:"label",id:"label"});dateBoxConfig._finalInputStyle.width=dateBoxConfig.inputBoxWidth+PXSTRING;dateBox.addGraphicalElement({el:"html",attr:{x:position.x+labelDim.width,y:position.y-labelDim.height/3,type:"input",name:dateBoxConfig.label,value:dateBoxConfig.tempDate||value},component:dateBox,css:dateBoxConfig._finalInputStyle,container:{id:"box-container",label:"box-container",isParent:true},label:"box",id:"box"})};return DateBox}(SmartRenderer);export default DateBox;