import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{SmartRenderer}from"@fusioncharts/core/src/component-interface";import CustomRangeSelectorTool from"./selector-tool";var CustomRangeSelector=function(_SmartRenderer){_inheritsLoose(CustomRangeSelector,_SmartRenderer);function CustomRangeSelector(){return _SmartRenderer.apply(this,arguments)||this}var _proto=CustomRangeSelector.prototype;_proto.configureAttributes=function configureAttributes(inputConfig){if(inputConfig===void 0){inputConfig={}}Object.assign(this.config,inputConfig)};_proto.updateOnLimitChange=function updateOnLimitChange(){this.setData({domain:this.getFromEnv("chart").getFocusLimit(),limitChanged:true},true)};_proto.getToolInfo=function getToolInfo(){var styleObj=Object.assign({},this.config.style);styleObj["title:hoverout"]={title:styleObj["title-text"],icon:styleObj["title-icon"]};return{"selector-0":{type:"tool",def:CustomRangeSelectorTool,configuration:{domain:this.config.domain,hAlign:"right",scale:1,marginTop:2,marginBottom:2,marginLeft:2,marginRight:2,extStyle:styleObj,limitChanged:this.config.limitChanged}}}};return CustomRangeSelector}(SmartRenderer);export default CustomRangeSelector;