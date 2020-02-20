import schedular,{priorityList}from"../../schedular";import raphaelCSSApplicator from"./redraphael.css.js";import raphaelShadow from"./redraphael.shadow";import raphaelTextOutline from"./redraphael.textoutline";import raphaelShapes from"./redraphael.shapes";import raphaelImageGrid from"./redraphael.imagegrid";import raphaelHTML from"./redraphael.html.js";import rapahelToSVG from"./redraphael.export";var OneInaframeOption={oneInAFrame:true};export default{extension:function extension(FusionCharts){var Raphael=FusionCharts.getDep("redraphael","plugin"),blankObject={};Raphael.fn._elementFromEvent=function(_event){if(!_event||this.removed){return null}var event=_event,element=event.srcElement||event.target||(event=event.originalEvent)&&(event.srcElement||event.target)||blankObject;element.nodeName==="tspan"&&(element=element.parentNode);return this.getById(element.raphaelid)};Raphael.requestAnimFrame=schedular.addJob&&function(callback){schedular.addJob(callback,priorityList.animation,OneInaframeOption)};Raphael.instantRequestAnimFrame=schedular.addJob&&function(callback){schedular.addJob(callback,priorityList.instant)};rapahelToSVG(Raphael);raphaelCSSApplicator(Raphael);raphaelShadow(Raphael);raphaelTextOutline(Raphael);raphaelShapes(Raphael);raphaelImageGrid(Raphael);raphaelHTML(Raphael)},name:"redraphaelExt",type:"plugin",requiresFusionCharts:true};