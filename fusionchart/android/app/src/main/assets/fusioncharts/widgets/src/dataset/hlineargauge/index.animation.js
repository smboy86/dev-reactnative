import{FINALSTR,INITIALSTR}from"@fusioncharts/core/src/lib";var fadeEffect=[{initialAttr:function initialAttr(){return{opacity:0}},finalAttr:function finalAttr(){return{opacity:1}}}];export default{"initial.dataset.hlineargauge":function initialDatasetHlineargauge(){return{"parentgroup.initial":function parentgroupInitial(input){return[{initialAttr:{transform:input.attr.transform},finalAttr:{transform:input.attr.transform},slot:"initial"}]},"datalabel.initial":function datalabelInitial(input){return[{initialAttr:{transform:input.attr.transform},finalAttr:{transform:input.attr.transform}}]},"background.appearing":function backgroundAppearing(){fadeEffect[0].slot=INITIALSTR;return fadeEffect},"background.updating":null,"final.appearing":function finalAppearing(){fadeEffect[0].slot=FINALSTR;return fadeEffect},"final.updating":null,"pointers.appearing":function pointersAppearing(input){var dataset=input.component,isScaleReversed=dataset.config&&dataset.config.isScaleReversed,polypathArr=input.attr.polypath.slice(0),canvasWidth=dataset.getFromEnv("chart")&&dataset.getFromEnv("chart").config&&dataset.getFromEnv("chart").config.canvasWidth;polypathArr[1]=isScaleReversed?canvasWidth:0;return[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"initial"},{initialAttr:{polypath:polypathArr},finalAttr:{opacity:1},slot:"middle"}]},"pointers.updating":null,"pointerValues.appearing":function pointerValuesAppearing(input){var dataset=input.component,isScaleReversed=dataset.config&&dataset.config.isScaleReversed,canvasWidth=dataset.getFromEnv("chart")&&dataset.getFromEnv("chart").config&&dataset.getFromEnv("chart").config.canvasWidth;return[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"initial"},{initialAttr:{x:isScaleReversed?canvasWidth:0},finalAttr:{opacity:1},slot:"middle"}]},"pointerValues.updating":null,"*":null}}};