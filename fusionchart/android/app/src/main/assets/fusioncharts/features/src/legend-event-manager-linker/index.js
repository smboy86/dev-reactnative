import{getMouseCoordinate}from"@fusioncharts/core/src/lib";var legendItemOnFcClick=function legendItemOnFcClick(e){fireAssociatedEvent(e,"legendItemClicked")},legendItemOnFcMouseOver=function legendItemOnFcMouseOver(e){fireAssociatedEvent(e,"legendItemRollover")},legendItemOnFcMouseOut=function legendItemOnFcMouseOut(e){fireAssociatedEvent(e,"legendItemRollout")};var UNDEF,fireAssociatedEvent=function fireAssociatedEvent(e,eName){var legendItem=e.sender,owner=legendItem.getLinkedItem("owner"),chart=legendItem.getFromEnv("chart"),eventArgs=owner&&owner.getEventArgs?owner.getEventArgs(legendItem):legendItem.config.eventArguments,coordinate=getMouseCoordinate(legendItem.getFromEnv("chart-container"),e,chart);if(!/click/gi.test(eName)&&eventArgs.visible!==UNDEF){eventArgs.visible=!eventArgs.visible}eventArgs.chartX=coordinate.chartX;eventArgs.chartY=coordinate.chartY;eventArgs.pageX=coordinate.pageX;eventArgs.pageY=coordinate.pageY;eventArgs.id=chart.getId();eventArgs.legendItemId=legendItem.getId();eventArgs.legendItemIndex=legendItem.config.index;chart.fireChartInstanceEvent(eName,eventArgs,e)},manageLedendItemsEvent=function manageLedendItemsEvent(legendItem){legendItem.addEventListener("fc-click",legendItemOnFcClick);legendItem.addEventListener("fc-mouseover",legendItemOnFcMouseOver);legendItem.addEventListener("fc-mouseout",legendItemOnFcMouseOut)},legendEventManagerLinker=function legendEventManagerLinker(FC){var sender;FC.addEventListener("instantiated",(function onFcInstatiated(event){sender=event.sender;sender.getType()==="legendItem"&&manageLedendItemsEvent(sender)}))};export default{extension:legendEventManagerLinker,name:"legendEventManagerLinker",type:"extension",requiresFusionCharts:true};