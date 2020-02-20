var MAX=Math.max,MIN=Math.min,VERYSMALLNUMBER=1e-6,VERTICAL="vertical";function findNodeById(_nodes,_node){var nodes=_nodes,node=_node;return nodes.find((function(d){return d.id===node||d.label===node}))}function createNodeLinks(_ref){var nodes=_ref.nodes,links=_ref.links;nodes.forEach((function(_node){var node=_node;node.props.sourceLinks=[];node.props.targetLinks=[]}));links.forEach((function(_link,index){var link=_link,_link$props=link.props,source=_link$props.source,target=_link$props.target;if(typeof source!=="object")source=link.props.source=findNodeById(nodes,source);if(typeof target!=="object")target=link.props.target=findNodeById(nodes,target);source.props.sourceLinks.push(link);target.props.targetLinks.push(link);link.props.index=index}))}function ascendingHeight(a,b){return a.props.target.props.y0-b.props.target.props.y0}function ascendingWidth(a,b){return a.props.target.props.x0-b.props.target.props.x0}function sortLinks(_links,orientation){var links=_links;if(orientation===VERTICAL){links.sort(ascendingWidth)}else{links.sort(ascendingHeight)}return links}function createLinkDimensions(_ref2,props){var nodes=_ref2.nodes;var orientation=props&&props.orientation;for(var _iterator=nodes,_isArray=Array.isArray(_iterator),_i2=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){var _ref3;if(_isArray){if(_i2>=_iterator.length)break;_ref3=_iterator[_i2++]}else{_i2=_iterator.next();if(_i2.done)break;_ref3=_i2.value}var node=_ref3;if(orientation===VERTICAL){var x0=node.props.x0,x1=x0,sortedSourceLinks=sortLinks(node.props.sourceLinks,orientation);for(var _iterator2=sortedSourceLinks,_isArray2=Array.isArray(_iterator2),_i3=0,_iterator2=_isArray2?_iterator2:_iterator2[Symbol.iterator]();;){var _ref4;if(_isArray2){if(_i3>=_iterator2.length)break;_ref4=_iterator2[_i3++]}else{_i3=_iterator2.next();if(_i3.done)break;_ref4=_i3.value}var link=_ref4;link.props.x0=x0+link.props.linkWidth/2;link.props.y0=link.props.source.props.y1;x0+=link.props.linkWidth}for(var _iterator3=node.props.targetLinks,_isArray3=Array.isArray(_iterator3),_i4=0,_iterator3=_isArray3?_iterator3:_iterator3[Symbol.iterator]();;){var _ref5;if(_isArray3){if(_i4>=_iterator3.length)break;_ref5=_iterator3[_i4++]}else{_i4=_iterator3.next();if(_i4.done)break;_ref5=_i4.value}var _link2=_ref5;_link2.props.x1=x1+_link2.props.linkWidth/2;_link2.props.y1=_link2.props.target.props.y0;x1+=_link2.props.linkWidth}}else{var y0=node.props.y0,y1=y0,_sortedSourceLinks=sortLinks(node.props.sourceLinks);for(var _iterator4=_sortedSourceLinks,_isArray4=Array.isArray(_iterator4),_i5=0,_iterator4=_isArray4?_iterator4:_iterator4[Symbol.iterator]();;){var _ref6;if(_isArray4){if(_i5>=_iterator4.length)break;_ref6=_iterator4[_i5++]}else{_i5=_iterator4.next();if(_i5.done)break;_ref6=_i5.value}var _link3=_ref6;_link3.props.y0=y0+_link3.props.linkWidth/2;_link3.props.x0=_link3.props.source.props.x1;y0+=_link3.props.linkWidth}for(var _iterator5=node.props.targetLinks,_isArray5=Array.isArray(_iterator5),_i6=0,_iterator5=_isArray5?_iterator5:_iterator5[Symbol.iterator]();;){var _ref7;if(_isArray5){if(_i6>=_iterator5.length)break;_ref7=_iterator5[_i6++]}else{_i6=_iterator5.next();if(_i6.done)break;_ref7=_i6.value}var _link4=_ref7;_link4.props.y1=y1+_link4.props.linkWidth/2;_link4.props.x1=_link4.props.target.props.x0;y1+=_link4.props.linkWidth}}}}function createNodeValues(_ref8){var nodes=_ref8.nodes;nodes&&nodes.forEach((function(_node){var totalSourceValue=0,totalTargetValue=0,node=_node;for(var _iterator6=node.props.sourceLinks,_isArray6=Array.isArray(_iterator6),_i7=0,_iterator6=_isArray6?_iterator6:_iterator6[Symbol.iterator]();;){var _ref9;if(_isArray6){if(_i7>=_iterator6.length)break;_ref9=_iterator6[_i7++]}else{_i7=_iterator6.next();if(_i7.done)break;_ref9=_i7.value}var _ref11=_ref9,value=_ref11.value;totalSourceValue+=Number(value)}for(var _iterator7=node.props.targetLinks,_isArray7=Array.isArray(_iterator7),_i8=0,_iterator7=_isArray7?_iterator7:_iterator7[Symbol.iterator]();;){var _ref10;if(_isArray7){if(_i8>=_iterator7.length)break;_ref10=_iterator7[_i8++]}else{_i8=_iterator7.next();if(_i8.done)break;_ref10=_i8.value}var _ref12=_ref10,value=_ref12.value;totalTargetValue+=Number(value)}node.props.value=MAX(totalSourceValue,totalTargetValue)}))}function createGraph(graph){createNodeLinks(graph);createNodeValues(graph);return graph}function traverseGraph(_ref13){var nodes=_ref13.nodes;var currentSet=new Set(nodes),nextSet=new Set,depth=0;while(currentSet.size){currentSet.forEach((function(_node){var node=_node;node.props.depth=depth;for(var _iterator8=node.props.sourceLinks,_isArray8=Array.isArray(_iterator8),_i9=0,_iterator8=_isArray8?_iterator8:_iterator8[Symbol.iterator]();;){var _ref14;if(_isArray8){if(_i9>=_iterator8.length)break;_ref14=_iterator8[_i9++]}else{_i9=_iterator8.next();if(_i9.done)break;_ref14=_i9.value}var link=_ref14;nextSet.add(link.props.target)}}));if(++depth>nodes.length){return false}currentSet=nextSet;nextSet=new Set}return true}function createNodeDimensions(graphs,_props){var props=_props,iterations=6,nodes=graphs.nodes,maxDepth=MAX.apply(null,nodes.map((function(node){return node.props.depth})))+1;var columns=new Array(maxDepth);for(var _iterator9=nodes,_isArray9=Array.isArray(_iterator9),_i10=0,_iterator9=_isArray9?_iterator9:_iterator9[Symbol.iterator]();;){var _ref15;if(_isArray9){if(_i10>=_iterator9.length)break;_ref15=_iterator9[_i10++]}else{_i10=_iterator9.next();if(_i10.done)break;_ref15=_i10.value}var node=_ref15;var layer=MAX(0,MIN(maxDepth-1,node.props.depth));node.props.layer=layer;if(columns[layer])columns[layer].push(node);else columns[layer]=[node]}setnodeXY(columns,maxDepth,props);if(props.nodeRelaxation){for(var i=0;i<iterations;++i){var convergence=Math.pow(.99,i),divergence=Math.max(1-convergence,(i+1)/6);relaxSources(columns,convergence,divergence,props);relaxTargets(columns,convergence,divergence,props)}}createLinkDimensions(graphs,props)}function setnodeXY(_columns,_maxDepth,_props){var columns=_columns,props=_props,maxDepth=_maxDepth,maxNodeWidth,minNodesLength,nodeGutter,nodeValueFactor,columngapFactor,orientation=props.orientation;maxNodeWidth=MAX.apply(null,columns[maxDepth-1].map((function(node){return node.nodeWidth})));columngapFactor=orientation===VERTICAL?(props.height[1]-props.height[0]-maxNodeWidth)/(maxDepth-1):(props.width[1]-props.width[0]-maxNodeWidth)/(maxDepth-1);nodeGutter=props.nodeGutter;minNodesLength=MAX.apply(null,columns.map((function(nodes){return nodes.length})));if(orientation===VERTICAL){if((minNodesLength-1)*nodeGutter>=props.width[1]-props.width[0]||(minNodesLength-1)*nodeGutter<0)nodeGutter=props.nodeGutter=10}else{if((minNodesLength-1)*nodeGutter>=props.height[1]-props.height[0]||(minNodesLength-1)*nodeGutter<0)nodeGutter=props.nodeGutter=10}nodeValueFactor=MIN.apply(null,columns.map((function(nodes){var totalValue=0;for(var _iterator10=nodes,_isArray10=Array.isArray(_iterator10),_i11=0,_iterator10=_isArray10?_iterator10:_iterator10[Symbol.iterator]();;){var _ref16;if(_isArray10){if(_i11>=_iterator10.length)break;_ref16=_iterator10[_i11++]}else{_i11=_iterator10.next();if(_i11.done)break;_ref16=_i11.value}var node=_ref16;totalValue+=node.props.value}return orientation===VERTICAL?(props.width[1]-props.width[0]-(nodes.length-1)*nodeGutter)/totalValue:(props.height[1]-props.height[0]-(nodes.length-1)*nodeGutter)/totalValue})));if(!columngapFactor||columngapFactor===Infinity||columngapFactor===-Infinity)columngapFactor=0;if(!nodeValueFactor||nodeValueFactor===Infinity||nodeValueFactor===-Infinity)nodeValueFactor=0;for(var _iterator11=columns,_isArray11=Array.isArray(_iterator11),_i12=0,_iterator11=_isArray11?_iterator11:_iterator11[Symbol.iterator]();;){var _ref17;if(_isArray11){if(_i12>=_iterator11.length)break;_ref17=_iterator11[_i12++]}else{_i12=_iterator11.next();if(_i12.done)break;_ref17=_i12.value}var nodes=_ref17;if(orientation===VERTICAL){var startX=props.width[0];for(var _iterator12=nodes,_isArray12=Array.isArray(_iterator12),_i13=0,_iterator12=_isArray12?_iterator12:_iterator12[Symbol.iterator]();;){var _ref18;if(_isArray12){if(_i13>=_iterator12.length)break;_ref18=_iterator12[_i13++]}else{_i13=_iterator12.next();if(_i13.done)break;_ref18=_i13.value}var node=_ref18;for(var _iterator13=node.props.sourceLinks,_isArray13=Array.isArray(_iterator13),_i14=0,_iterator13=_isArray13?_iterator13:_iterator13[Symbol.iterator]();;){var _ref19;if(_isArray13){if(_i14>=_iterator13.length)break;_ref19=_iterator13[_i14++]}else{_i14=_iterator13.next();if(_i14.done)break;_ref19=_i14.value}var link=_ref19;link.props.linkWidth=link.value*nodeValueFactor}node.props.y0=props.height[0]+node.props.layer*columngapFactor;node.props.y1=node.props.y0+node.nodeWidth;node.props.x0=startX;node.props.x1=node.props.x0+nodeValueFactor*node.props.value;startX=node.props.x1+nodeGutter}}else{var startY=props.height[0];for(var _iterator14=nodes,_isArray14=Array.isArray(_iterator14),_i15=0,_iterator14=_isArray14?_iterator14:_iterator14[Symbol.iterator]();;){var _ref20;if(_isArray14){if(_i15>=_iterator14.length)break;_ref20=_iterator14[_i15++]}else{_i15=_iterator14.next();if(_i15.done)break;_ref20=_i15.value}var _node2=_ref20;for(var _iterator15=_node2.props.sourceLinks,_isArray15=Array.isArray(_iterator15),_i16=0,_iterator15=_isArray15?_iterator15:_iterator15[Symbol.iterator]();;){var _ref21;if(_isArray15){if(_i16>=_iterator15.length)break;_ref21=_iterator15[_i16++]}else{_i16=_iterator15.next();if(_i16.done)break;_ref21=_i16.value}var _link5=_ref21;_link5.props.linkWidth=_link5.value*nodeValueFactor}_node2.props.x0=props.width[0]+_node2.props.layer*columngapFactor;_node2.props.x1=_node2.props.x0+_node2.nodeWidth;_node2.props.y0=startY;_node2.props.y1=_node2.props.y0+nodeValueFactor*_node2.props.value;startY=_node2.props.y1+nodeGutter}}}}function relaxTargets(columns,alpha,beta,props){var orientation=props&&props.orientation;for(var i=1,n=columns.length;i<n;++i){var targetShiftFactor=void 0;var column=columns[i];for(var _iterator16=column,_isArray16=Array.isArray(_iterator16),_i17=0,_iterator16=_isArray16?_iterator16:_iterator16[Symbol.iterator]();;){var _ref22;if(_isArray16){if(_i17>=_iterator16.length)break;_ref22=_iterator16[_i17++]}else{_i17=_iterator16.next();if(_i17.done)break;_ref22=_i17.value}var target=_ref22;var y=0,w=0;for(var _iterator17=target.props.targetLinks,_isArray17=Array.isArray(_iterator17),_i18=0,_iterator17=_isArray17?_iterator17:_iterator17[Symbol.iterator]();;){var _ref23;if(_isArray17){if(_i18>=_iterator17.length)break;_ref23=_iterator17[_i18++]}else{_i18=_iterator17.next();if(_i18.done)break;_ref23=_i18.value}var link=_ref23;var valueFactor=link.value*(target.props.layer-link.props.source.props.layer);y+=targetTop(link.props.source,target,props)*valueFactor;w+=valueFactor}if(!(w>0))continue;if(orientation===VERTICAL){targetShiftFactor=(y/w-target.props.x0)*alpha;target.props.x0+=targetShiftFactor;target.props.x1+=targetShiftFactor}else{targetShiftFactor=(y/w-target.props.y0)*alpha;target.props.y0+=targetShiftFactor;target.props.y1+=targetShiftFactor}}resolveCollisions(column,beta,props)}}function relaxSources(columns,alpha,beta,props){var orientation=props&&props.orientation;for(var n=columns.length,i=n-2;i>=0;--i){var sourceShiftFactor=void 0;var column=columns[i];for(var _iterator18=column,_isArray18=Array.isArray(_iterator18),_i19=0,_iterator18=_isArray18?_iterator18:_iterator18[Symbol.iterator]();;){var _ref24;if(_isArray18){if(_i19>=_iterator18.length)break;_ref24=_iterator18[_i19++]}else{_i19=_iterator18.next();if(_i19.done)break;_ref24=_i19.value}var source=_ref24;var y=0,w=0;for(var _iterator19=source.props.sourceLinks,_isArray19=Array.isArray(_iterator19),_i20=0,_iterator19=_isArray19?_iterator19:_iterator19[Symbol.iterator]();;){var _ref25;if(_isArray19){if(_i20>=_iterator19.length)break;_ref25=_iterator19[_i20++]}else{_i20=_iterator19.next();if(_i20.done)break;_ref25=_i20.value}var link=_ref25;var target=link.props.target;var valueFactor=link.value*(target.props.layer-source.props.layer);y+=sourceTop(source,target,props)*valueFactor;w+=valueFactor}if(!(w>0))continue;if(orientation===VERTICAL){sourceShiftFactor=(y/w-source.props.x0)*alpha;source.props.x0+=sourceShiftFactor;source.props.x1+=sourceShiftFactor}else{sourceShiftFactor=(y/w-source.props.y0)*alpha;source.props.y0+=sourceShiftFactor;source.props.y1+=sourceShiftFactor}}resolveCollisions(column,beta,props)}}function resolveCollisions(nodes,beta,props){var i=nodes.length>>1,subject=nodes[i];var orientation=props&&props.orientation;if(orientation===VERTICAL){resolveCollisionsBottomToTop(nodes,subject.props.x0-props.nodeGutter,i-1,beta,props);resolveCollisionsTopToBottom(nodes,subject.props.x1+props.nodeGutter,i+1,beta,props);resolveCollisionsBottomToTop(nodes,props.width[1],nodes.length-1,beta,props);resolveCollisionsTopToBottom(nodes,props.width[0],0,beta,props)}else{resolveCollisionsBottomToTop(nodes,subject.props.y0-props.nodeGutter,i-1,beta,props);resolveCollisionsTopToBottom(nodes,subject.props.y1+props.nodeGutter,i+1,beta,props);resolveCollisionsBottomToTop(nodes,props.height[1],nodes.length-1,beta,props);resolveCollisionsTopToBottom(nodes,props.height[0],0,beta,props)}}function resolveCollisionsTopToBottom(nodes,_y,_i,beta,props){var i=_i,y=_y,orientation=props&&props.orientation;for(;i<nodes.length;++i){var node=nodes[i],dy=(y-(orientation===VERTICAL?node.props.x0:node.props.y0))*beta;if(orientation===VERTICAL){if(dy>VERYSMALLNUMBER){node.props.x0+=dy;node.props.x1+=dy}y=node.props.x1+props.nodeGutter}else{if(dy>VERYSMALLNUMBER){node.props.y0+=dy;node.props.y1+=dy}y=node.props.y1+props.nodeGutter}}}function resolveCollisionsBottomToTop(nodes,_y,_i,beta,props){var i=_i,y=_y,orientation=props&&props.orientation;for(;i>=0;--i){var node=nodes[i],dy=((orientation===VERTICAL?node.props.x1:node.props.y1)-y)*beta;if(orientation===VERTICAL){if(dy>VERYSMALLNUMBER){node.props.x0-=dy;node.props.x1-=dy}y=node.props.x0-props.nodeGutter}else{if(dy>VERYSMALLNUMBER){node.props.y0-=dy;node.props.y1-=dy}y=node.props.y0-props.nodeGutter}}}function targetTop(source,target,props){var orientation=props&&props.orientation,shiftStart=(orientation===VERTICAL?source.props.x0:source.props.y0)-(source.props.sourceLinks.length-1)*props.nodeGutter/2;for(var _iterator20=source.props.sourceLinks,_isArray20=Array.isArray(_iterator20),_i21=0,_iterator20=_isArray20?_iterator20:_iterator20[Symbol.iterator]();;){var _ref26;if(_isArray20){if(_i21>=_iterator20.length)break;_ref26=_iterator20[_i21++]}else{_i21=_iterator20.next();if(_i21.done)break;_ref26=_i21.value}var link=_ref26;var node=link.props.target,linkWidth=link.props.linkWidth;if(node===target)break;shiftStart+=linkWidth+props.nodeGutter}for(var _iterator21=target.props.targetLinks,_isArray21=Array.isArray(_iterator21),_i22=0,_iterator21=_isArray21?_iterator21:_iterator21[Symbol.iterator]();;){var _ref27;if(_isArray21){if(_i22>=_iterator21.length)break;_ref27=_iterator21[_i22++]}else{_i22=_iterator21.next();if(_i22.done)break;_ref27=_i22.value}var _link6=_ref27;var _node3=_link6.props.source,_linkWidth=_link6.props.linkWidth;if(_node3===source)break;shiftStart-=_linkWidth}return shiftStart}function sourceTop(source,target,props){var orientation=props&&props.orientation,shiftStart=(orientation===VERTICAL?target.props.x0:target.props.y0)-(target.props.targetLinks.length-1)*props.nodeGutter/2;for(var _iterator22=target.props.targetLinks,_isArray22=Array.isArray(_iterator22),_i23=0,_iterator22=_isArray22?_iterator22:_iterator22[Symbol.iterator]();;){var _ref28;if(_isArray22){if(_i23>=_iterator22.length)break;_ref28=_iterator22[_i23++]}else{_i23=_iterator22.next();if(_i23.done)break;_ref28=_i23.value}var link=_ref28;var node=link.props.source,linkWidth=link.props.linkWidth;if(node===source)break;shiftStart+=linkWidth+props.nodeGutter}for(var _iterator23=source.props.sourceLinks,_isArray23=Array.isArray(_iterator23),_i24=0,_iterator23=_isArray23?_iterator23:_iterator23[Symbol.iterator]();;){var _ref29;if(_isArray23){if(_i24>=_iterator23.length)break;_ref29=_iterator23[_i24++]}else{_i24=_iterator23.next();if(_i24.done)break;_ref29=_i24.value}var _link7=_ref29;var _node4=_link7.props.target,_linkWidth2=_link7.props.linkWidth;if(_node4===target)break;shiftStart-=_linkWidth2}return shiftStart}export{createGraph,createNodeLinks,createNodeValues,traverseGraph,createNodeDimensions};