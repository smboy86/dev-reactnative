import{componentFactory}from"@fusioncharts/core/src/lib/index.js";import NodeLinkManager from"../dataset/chord/node-link-manager.js";export default function(chart){var config=chart.config;componentFactory(chart,NodeLinkManager,"node-link-manager",1,[{nodes:config.nodes,links:config.links,nodesOrder:config.nodesOrder,linksOrder:config.linksOrder,nodeLabelGap:config.nodeLabelGap,nodeLinkPadding:config.nodeLinkPadding,showLegend:config.showLegend,totalAngle:config.totalAngle,nodeSpacing:config.nodeSpacing,isPost:config.isPost,matrix:config.matrix,startingAngle:config.startingAngle,minNodeSize:config.minNodeSize,highlightEffect:config.highlightEffect,enableToggle:config.enableToggle,datalabelStyle:config.datalabelStyle}]);config.showLegend&&chart.getChildren("node-link-manager")[0]._addLegend()}