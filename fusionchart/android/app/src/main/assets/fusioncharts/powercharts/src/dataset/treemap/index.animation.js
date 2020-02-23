export default{"*.dataset.treeMap":function datasetTreeMap(){var dataset=this,canvasConfig=dataset.getFromEnv("canvasConfig"),canvasYCentre=canvasConfig.canvasLeft+canvasConfig.canvasHeight/2,canvasXCentre=canvasConfig.canvasWidth/2+canvasConfig.canvasTop,labelAnim={appearing:[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}],updating:[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}],disappearing:[{initialAttr:{opacity:1},finalAttr:{opacity:0},slot:"initial"}]},pathAnim={appearing:[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}],updating:function updating(inputJSON){var elPresent=typeof inputJSON.el!=="string";return[{initialAttr:{opacity:0,path:elPresent?inputJSON.el.attr("path"):inputJSON.attr.path},finalAttr:{opacity:1,path:inputJSON.attr.path},slot:"final"}]}},plotAnim={appearing:function appearing(){return[{initialAttr:{x:canvasXCentre,y:canvasYCentre,width:0,height:0,opacity:0},finalAttr:{opacity:1},slot:"plot"}]},disappearing:[{finalAttr:{opacity:0},slot:"initial"}],updating:function updating(inputJSON){var x=inputJSON.props.prev&&inputJSON.props.prev.x===inputJSON.attr.x,y=inputJSON.props.prev&&inputJSON.props.prev.y===inputJSON.attr.y,h=inputJSON.props.prev&&inputJSON.props.prev.height===inputJSON.attr.height,w=inputJSON.props.prev&&inputJSON.props.prev.width===inputJSON.attr.width;if(x&&y&&h&&w){return[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}]}if(inputJSON.props.prev){return[{initialAttr:{x:inputJSON.props.prev.x,y:inputJSON.props.prev.y,width:inputJSON.props.prev.width,height:inputJSON.props.prev.height},slot:"plot"}]}return[{initialAttr:{x:inputJSON.attr.x,y:inputJSON.attr.y,width:inputJSON.attr.width,height:inputJSON.attr.height},slot:"plot"}]}};return{"rect.appearing":plotAnim.appearing,"rect.updating":plotAnim.updating,"rect.disappearing":plotAnim.disappearing,"path.appearing":pathAnim.appearing,"path.updating":pathAnim.updating,"path.disappearing":plotAnim.disappearing,"labelItem.appearing":labelAnim.appearing,"labelItem.updating":labelAnim.updating,"labelItem.disappearing":labelAnim.disappearing,"highlightItem.appearing":labelAnim.appearing,"highlightItem.updating":labelAnim.updating,"highlightItem.disappearing":labelAnim.disappearing,"gen.disappearing":labelAnim.disappearing,"*":null}}};