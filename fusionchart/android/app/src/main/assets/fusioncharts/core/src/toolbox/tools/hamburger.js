import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import Tool from"./tool";import{pluck,pluckNumber}from"../../lib";import MenuItemContainer from"./menu-item-container";var HamBurger=function(_Tool){_inheritsLoose(HamBurger,_Tool);function HamBurger(){return _Tool.apply(this,arguments)||this}var _proto=HamBurger.prototype;_proto.configureAttributes=function configureAttributes(options){if(options===void 0){options={}}_Tool.prototype.configureAttributes.call(this,options);var tool=this,toolConfig=tool.config,chartAttrs=tool.getFromEnv("dataSource").chart;toolConfig.baseFontFamily=pluck(options.baseFontFamily,chartAttrs.basefont,"Verdana,sans");toolConfig.baseFontSize=pluckNumber(options.baseFontSize,chartAttrs.basefontsize,10);toolConfig.baseFontColor=pluck(options.baseFontColor,chartAttrs.basefontcolor,"595959");toolConfig.skipGraphics=true;tool.createListContainer()};_proto.createListContainer=function createListContainer(){this.attachChild(MenuItemContainer,"listContainer","listContainer").configure()};_proto.appendInMenu=function appendInMenu(items){if(items===void 0){items=[]}var tool=this,listContainer=tool.getChild("listContainer"),i,len;len=items.length;for(i=0;i<len;i++){listContainer.addItem(items[i])}tool.config.skipGraphics=false};return HamBurger}(Tool);export default HamBurger;