import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{ComponentInterface}from"@fusioncharts/core/src/component-interface";import{getValidValue,pluck,pluckNumber,getMouseCoordinate,setImageDisplayMode}from"@fusioncharts/core/src/lib";var NONE="none",UNDEF,POSITION_TOP="top",POSITION_BOTTOM="bottom",POSITION_MIDDLE="middle",POSITION_RIGHT="right",POSITION_LEFT="left",POINTER="pointer",TL="tl",NORMAL="normal",LOGOROLLOUT="LogoRollout",LOGOROLLOVER="LogoRollover",LOGOCLICK="LogoClick",LOGOLOADED="LogoLoaded",LOGOLOADERROR="LogoLoadError",defaultPosition={vAlign:POSITION_TOP,hAlign:POSITION_LEFT},pointerCSS={link:{cursor:POINTER,_cursor:POINTER},normal:{cursor:"default",_cursor:NORMAL}},position={tr:{vAlign:POSITION_TOP,hAlign:POSITION_RIGHT},bl:{vAlign:POSITION_BOTTOM,hAlign:POSITION_LEFT},br:{vAlign:POSITION_BOTTOM,hAlign:POSITION_RIGHT},cc:{vAlign:POSITION_MIDDLE,hAlign:POSITION_MIDDLE}},isVML=!!(window.SVGAngle||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")),getHandler=function getHandler(logo){var config=logo.config;return{load:function load(){var logoImageAttr,chartLogoImage=logo.getGraphicalElement("logoImage"),chartConfig=logo.getFromEnv("chartConfig"),chartBorderWidth=chartConfig.borderWidth||0,logoPosition=config.logoPosition,logoScale=config.logoScale,logoLeftMargin=config.logoLeftMargin,logoTopMargin=config.logoTopMargin,logoURL=config.logoURL,logoAlpha=config.logoAlpha,logoPositionSTR=config.logoPositionSTR,logoLink=config.logoLink;chartLogoImage.show();logoImageAttr=setImageDisplayMode(NONE,logoPosition.vAlign,logoPosition.hAlign,logoScale,chartBorderWidth,chartConfig.width,chartConfig.height,chartLogoImage._.RefImg);if(isVML){logoImageAttr.w=logoImageAttr.width||0;logoImageAttr.h=logoImageAttr.height||0}logoImageAttr.transform="T"+logoLeftMargin+","+logoTopMargin;chartLogoImage.attr(logoImageAttr);logo.getFromEnv("chart").fireChartInstanceEvent(LOGOLOADED,{logoURL:logoURL,logoAlpha:logoAlpha,logoPosition:logoPositionSTR,logoScale:logoScale,logoLink:logoLink})},error:function error(e){var logoURL=config.logoURL,logoAlpha=config.logoAlpha,logoPositionSTR=config.logoPositionSTR,logoScale=config.logoScale,logoLink=config.logoLink;logo.getFromEnv("chart").fireChartInstanceEvent(LOGOLOADERROR,{logoURL:logoURL,logoAlpha:logoAlpha,logoPosition:logoPositionSTR,logoScale:logoScale,logoLink:logoLink,error:e})},mouseover:function mouseover(e){var cord=getMouseCoordinate(logo.getFromEnv("chartInstance").ref,e),logoURL=config.logoURL,logoAlpha=config.logoAlpha,logoPositionSTR=config.logoPositionSTR,logoScale=config.logoScale,logoLink=config.logoLink;logo.getFromEnv("chart").fireChartInstanceEvent(LOGOROLLOVER,{logoURL:logoURL,logoAlpha:logoAlpha,logoPosition:logoPositionSTR||TL,logoScale:logoScale,logoLink:logoLink,chartX:cord.chartX,chartY:cord.chartY,pageX:cord.pageX,pageY:cord.pageY})},mouseout:function mouseout(e){var cord=getMouseCoordinate(logo.getFromEnv("chartInstance").ref,e),logoURL=config.logoURL,logoAlpha=config.logoAlpha,logoPositionSTR=config.logoPositionSTR,logoScale=config.logoScale,logoLink=config.logoLink;logo.getFromEnv("chart").fireChartInstanceEvent(LOGOROLLOUT,{logoURL:logoURL,logoAlpha:logoAlpha,logoPosition:logoPositionSTR||TL,logoScale:logoScale,logoLink:logoLink,chartX:cord.chartX,chartY:cord.chartY,pageX:cord.pageX,pageY:cord.pageY})},click:function click(e){var cord=getMouseCoordinate(logo.getFromEnv("chartInstance").ref,e),logoURL=config.logoURL,logoAlpha=config.logoAlpha,logoPositionSTR=config.logoPositionSTR,logoScale=config.logoScale,logoLink=config.logoLink;logo.getFromEnv("chart").fireChartInstanceEvent(LOGOCLICK,{logoURL:logoURL,logoAlpha:logoAlpha,logoPosition:logoPositionSTR||TL,logoScale:logoScale,logoLink:logoLink,chartX:cord.chartX,chartY:cord.chartY,pageX:cord.pageX,pageY:cord.pageY},UNDEF,config.linkClickFN)}}};var Logo=function(_ComponentInterface){_inheritsLoose(Logo,_ComponentInterface);function Logo(){var _this;_this=_ComponentInterface.call(this)||this;var logo=_assertThisInitialized(_this);logo.config._context={};logo.config.handler=getHandler(logo);logo.config.linkClickFN=function(){var logoLink=logo.config.logoLink;logoLink&&logo.getFromEnv("linkClickFN").call({link:logoLink},true)};return _this}var _proto=Logo.prototype;_proto.configureAttributes=function configureAttributes(){var logo=this,config=logo.config,chartAttrs=logo.getFromEnv("chart-attrib");config.logoURL=getValidValue(chartAttrs.logourl,"");config.logoPositionSTR=pluck(chartAttrs.logoposition,TL).toLowerCase();config.logoPosition=position[config.logoPositionSTR]||defaultPosition;config.logoAlpha=pluckNumber(chartAttrs.logoalpha,100);config.logoLink=getValidValue(chartAttrs.logolink);config.logoScale=pluckNumber(chartAttrs.logoscale,100);config.logoLeftMargin=pluckNumber(chartAttrs.logoleftmargin,0);config.logoTopMargin=pluckNumber(chartAttrs.logotopmargin,0);logo.setState("dirty",true)};_proto._contextChanged=function _contextChanged(){var logo=this,config=logo.config,chartConfig=logo.getFromEnv("chartConfig"),chartBorderWidth=chartConfig.borderWidth,chartWidth=chartConfig.width,chartHeight=chartConfig.height,status;if(chartBorderWidth!==config._context.chartBorderWidth){config._context.chartBorderWidth=chartBorderWidth;status=true}if(chartWidth!==config._context.chartWidth){config._context.chartWidth=chartWidth;status=true}if(chartHeight!==config._context.chartHeight){config._context.chartHeight=chartHeight;status=true}return status};_proto.draw=function draw(){var logo=this,config=logo.config,chartLogoImage=logo.getGraphicalElement("logoImage"),logoURL=config.logoURL,isNotRemoved=!logo.getState("removed");if(isNotRemoved&&!(logo.getState("dirty")||logo._contextChanged())){return}if(logoURL&&isNotRemoved){chartLogoImage=logo.getFromEnv("animationManager").setAnimation({el:chartLogoImage||"image",attr:{opacity:config.logoAlpha*.01||1,src:logoURL},component:logo,container:logo.getLinkedParent().getChildContainer("logoGroup")});if(!logo.getGraphicalElement("logoImage")){logo.addGraphicalElement("logoImage",chartLogoImage);chartLogoImage.on("load",config.handler.load);chartLogoImage.on("error",config.handler.error);chartLogoImage.on("fc-click",config.handler.click);chartLogoImage.on("fc-mouseover",config.handler.mouseover);chartLogoImage.on("fc-mouseout",config.handler.mouseout)}chartLogoImage.css(pointerCSS[config.logoLink?"link":"normal"])}};return Logo}(ComponentInterface);export default Logo;