import _extends from"@babel/runtime/helpers/extends";import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";var APPLY="Apply";var Button=function(_SmartRenderer){_inheritsLoose(Button,_SmartRenderer);function Button(id){var _this;_this=_SmartRenderer.call(this,id)||this;var button=_assertThisInitialized(_this),config=button.config;config.clickHandler=function(){button.getLinkedParent().submitData(config.type)};config.mouseoverHandler=function(){button.setData({buttonStyle:config["button:hover"]},true)};config.mouseoutHandler=function(){button.config&&button.setData({buttonStyle:config["button:hoverout"]},true)};button.addEventListener("fc-click",config.clickHandler);button.addEventListener("fc-mouseover",config.mouseoverHandler);button.addEventListener("fc-mouseout",config.mouseoutHandler);return _this}var _proto=Button.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){var buttonConfig=this.config;buttonConfig.height=10;buttonConfig.width=20;buttonConfig.label=APPLY;buttonConfig._buttonStyle={"-webkit-border-radius":"2px",backgroundColor:"#5648D4",border:"1px solid #5648D4",borderRadius:"2px",color:"#60634E",cursor:"pointer",paddingTop:"1px",textAlign:"center",zIndex:21,display:"flex",width:66,height:22,"line-height":"9px","justify-content":"center","align-items":"center","font-size":"11px"};buttonConfig.clickHandler=function(){this.getLinkedParent().submitData()}};_proto.configureAttributes=function configureAttributes(inputConfig){if(inputConfig===void 0){inputConfig={}}var button=this,buttonConfig=button.config,styleDef=button.getFromEnv("getStyleDef");Object.assign(buttonConfig,inputConfig);buttonConfig._finalStyle=Object.assign({},buttonConfig._buttonStyle,button.getFromEnv("baseTextStyle"),styleDef(buttonConfig.customStyle),styleDef(buttonConfig.buttonStyle))};_proto.getDimension=function getDimension(){var button=this,buttonConfig=button.config,fontSize=buttonConfig._finalStyle["font-size"],fontParser=button.getFromEnv("fontParser");buttonConfig.width=Math.max(+buttonConfig._finalStyle.width||0,fontParser(fontSize)*6);buttonConfig.height=Math.max(+buttonConfig._finalStyle.height||0,fontParser(fontSize)*2);return{width:buttonConfig.width,height:buttonConfig.height}};_proto.setTranslation=function setTranslation(x,y){this.config.position={x:x,y:y}};_proto.draw=function draw(){var button=this,buttonConfig=button.config,position=buttonConfig.position,css=_extends({},buttonConfig._finalStyle);css["margin-bottom"]=window.innerWidth<576?"15px":"0px";button.addGraphicalElement({el:"html",attr:{text:buttonConfig.label,type:"div",width:buttonConfig.width,height:buttonConfig.height,x:position.x,y:position.y},component:button,container:{id:"box-container",label:"box-container",isParent:true},css:css,label:"button",id:"button"})};return Button}(SmartRenderer);export default Button;