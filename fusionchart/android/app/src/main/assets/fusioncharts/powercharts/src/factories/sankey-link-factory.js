import{pluck,pluckNumber,toRaphaelColor,BLANK,clampNumber}from"@fusioncharts/core/src/lib";import SankeyLink from"../dataset/sankey/sankey-link";var SOURCE="source",TARGET="target",BLEND="blend",BUTT="butt",HORIZONTAL="horizontal";export default function(dataset){var dsConfig=dataset.config,links=dsConfig.links,orientation=dataset.getFromEnv("orientation"),numberFormatter=dataset.getFromEnv("number-formatter"),linkComponent,gradientAngle,chartAttr=dataset.getFromEnv("dataSource").chart,linkPadding=pluckNumber(chartAttr.nodelinkpadding,0),linkColor,linkCss,linkFocusCss,linkFocusOutCss,rawCosmetics,sourceFill,targetFill,fromNode,toNode,from,to,id;links.forEach((function(link){link.props.index+=BLANK;id=link.props.index;from=pluck(link.from);to=pluck(link.to);fromNode=dataset.getChild(from,"nodes");toNode=dataset.getChild(to,"nodes");linkColor=pluck(link.color,chartAttr.linkcolor,SOURCE);sourceFill=fromNode.config.rawCosmetics.fill;targetFill=toNode.config.rawCosmetics.fill;switch(linkColor.toLowerCase()){case SOURCE:linkColor=sourceFill;break;case TARGET:linkColor=targetFill;break;case BLEND:linkColor=sourceFill+","+targetFill;break}rawCosmetics={fill:linkColor,alpha:pluckNumber(link.alpha,chartAttr.linkalpha,20),focusAlpha:pluckNumber(link.hoveralpha,chartAttr.linkhoveralpha,75),focusOutAlpha:10};gradientAngle=orientation===HORIZONTAL?0:90;linkCss={stroke:toRaphaelColor({color:rawCosmetics.fill,alpha:rawCosmetics.alpha,angle:gradientAngle}),"stroke-linecap":BUTT,fill:"none"};linkFocusCss=({},linkCss,{stroke:toRaphaelColor({color:rawCosmetics.fill,alpha:rawCosmetics.focusAlpha,angle:gradientAngle})});linkFocusOutCss=({},linkCss,{stroke:toRaphaelColor({color:rawCosmetics.fill,alpha:rawCosmetics.focusOutAlpha,angle:gradientAngle})});linkComponent=dataset.attachChild(SankeyLink,"links",id);linkComponent.setData({from:from,to:to,mode:"normal",value:numberFormatter.dataLabels(pluckNumber(link.value)),color:rawCosmetics.linkColor,alpha:rawCosmetics.alpha,curvature:clampNumber(pluckNumber(link.curvature,chartAttr.linkcurvature,.5),0,1),linkType:pluck(link.type,chartAttr.linktype),linkPadding:linkPadding,sourceFill:sourceFill,targetFill:targetFill,props:link.props,rawCosmetics:rawCosmetics,eventArgs:{color:rawCosmetics.fill,alpha:rawCosmetics.alpha,value:link.value,from:link.props.source.label,to:link.props.target.label},style:{link:{normal:linkCss,focus:linkFocusCss,focusOut:linkFocusOutCss}}})}));dataset.attachListeners()}