import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";import{TRACKER_FILL}from"@fusioncharts/core/src/lib";var HIDDEN="hidden",MOBILE="mobile",DESKTOP="desktop",BODY=document.body,HTML=document.documentElement;var Cover=function(_SmartRenderer){_inheritsLoose(Cover,_SmartRenderer);function Cover(){return _SmartRenderer.apply(this,arguments)||this}var _proto=Cover.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_SmartRenderer.prototype.__setDefaultConfig.call(this);this.config.visibility=HIDDEN};_proto.configureAttributes=function configureAttributes(inputConfig){if(inputConfig===void 0){inputConfig={}}Object.assign(this.config,inputConfig)};_proto.draw=function draw(){var cover=this,height=+cover.getFromEnv("chartHeight"),width=+cover.getFromEnv("chartWidth"),mode=window.innerWidth<576?MOBILE:DESKTOP,visibility=cover.config.visibility,maxHeight=Math.max(BODY.scrollHeight,BODY.offsetHeight,HTML.clientHeight,HTML.scrollHeight,HTML.offsetHeight),attr,css;if(mode===MOBILE){attr={x:0,y:0,width:window.innerWidth,height:maxHeight,visibility:visibility,type:"div"};css={position:"fixed",opacity:.6,"background-color":"#cdcdcd"}}else{attr={x:0,y:0,width:width,height:height,visibility:visibility,type:"div"};css={opacity:1,"background-color":TRACKER_FILL}}cover.addGraphicalElement({el:"html",attr:attr,css:css,component:cover,id:"cover",label:"cover"})};return Cover}(SmartRenderer);export default Cover;