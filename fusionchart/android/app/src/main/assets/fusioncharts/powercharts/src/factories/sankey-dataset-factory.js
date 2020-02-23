import{componentFactory,pluckNumber,pluck,getDashStyle,DASH_DEF,PXSTRING}from"@fusioncharts/core/src/lib";var BOLD="bold",NORMAL="normal",ITALIC="italic";export default function(chart){var dsDef=chart.getDSdef(),chartAttr=chart.getFromEnv("dataSource").chart||{},ds,nodeLabelFontBold,nodeLabelFontItalic,nodeLabelBorderThickness,nodeLabelBorderPadding,nodeLabelBorderRadius,nodeLabelBorderDash,showNodes,dataLabelStyle=chart.config.dataLabelStyle,_chart$getFromEnv=chart.getFromEnv("sankey-graph"),nodes=_chart$getFromEnv.nodes,links=_chart$getFromEnv.links;nodeLabelFontBold=pluckNumber(chartAttr.nodelabelfontbold,chartAttr.labelfontbold,0)?BOLD:NORMAL;nodeLabelFontItalic=pluckNumber(chartAttr.nodelabelfontitalic,chartAttr.labelfontitalic,0)?ITALIC:NORMAL;nodeLabelBorderThickness=pluckNumber(chartAttr.nodelabelborderthickness,chartAttr.labelborderthickness,1);nodeLabelBorderPadding=pluckNumber(chartAttr.nodelabelborderpadding,chartAttr.labelborderpadding,2);nodeLabelBorderRadius=pluckNumber(chartAttr.nodelabelborderradius,chartAttr.labelborderradius,0);nodeLabelBorderDash=pluckNumber(chartAttr.nodelabelborderdashed,chartAttr.labelborderdashed,0)?getDashStyle(pluckNumber(chartAttr.nodelabelborderdashlen,chartAttr.labelborderdashlen,4),pluckNumber(chartAttr.nodelabelborderdashgap,chartAttr.labelborderdashgap,2)):DASH_DEF;showNodes=pluckNumber(chartAttr.shownodes,1);componentFactory(chart,dsDef,"dataset",1);ds=chart.getDatasets()[0];ds.configure({showNodes:showNodes,nodeWidth:chart.config.nodeWidth,nodeRelaxation:pluckNumber(chartAttr.noderelaxation,1),nodeSpacing:pluckNumber(chartAttr.nodespacing,10),labelSepChar:pluck(chartAttr.labelSepChar,","),enableDrag:pluckNumber(chartAttr.enabledrag,true),highlightEffect:pluckNumber(chartAttr.highlighteffect,true),style:{node:{label:{fontFamily:pluck(chartAttr.nodelabelfont,chartAttr.labelfont,dataLabelStyle.fontFamily),fontSize:pluck(chartAttr.nodelabelfontsize,chartAttr.labelfontsize,chartAttr.basefontsize,11)+PXSTRING,fontWeight:nodeLabelFontBold,fontStyle:nodeLabelFontItalic,borderThickness:nodeLabelBorderThickness,borderPadding:nodeLabelBorderPadding,borderRadius:nodeLabelBorderRadius,borderDash:nodeLabelBorderDash}},link:{}},nodes:nodes,links:links})}