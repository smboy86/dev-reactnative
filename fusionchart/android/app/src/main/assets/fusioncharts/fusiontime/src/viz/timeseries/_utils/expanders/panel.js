import merge from"ramda/es/merge";import all from"ramda/es/all";import isObject from"@fusioncharts/utils/src/type/is-object";import isArray from"@fusioncharts/utils/src/type/is-array";import isNumber from"@fusioncharts/utils/src/type/is-number";var isValidIndex=function isValidIndex(arr,idx){return idx>=0&&idx<arr.length},isValidNumber=function isValidNumber(arr,num){return isNumber(num)&&isValidIndex(arr,num)},isValidObject=function isValidObject(arr,obj){return isObject(obj)&&isValidNumber(arr,+obj.index)},isValidAxis=function isValidAxis(arr,a){return isValidNumber(arr,+a)||isValidObject(arr,a)},expand=function expand(a){return isObject(a)?merge(a,{index:+a.index}):{index:+a}},toPanelConfig=function toPanelConfig(a){return merge(a,{x:isArray(a.x)?a.x.map(expand):[expand(a.x)],y:isArray(a.y)?a.y.map(expand):[expand(a.y)]})},validate=function validate(arr,config){return isArray(config)?all((function(x){return isValidAxis(arr,x)}),config):isValidAxis(arr,config)};export default function(xs,ys,panels,defaultCanvases){if(xs===void 0){xs=[]}if(ys===void 0){ys=[]}if(panels===void 0){panels=[]}var isValidPanelObject=function isValidPanelObject(panel){return isObject(panel)&&validate(xs,panel.x)&&validate(ys,panel.y)},getValidPanels=function getValidPanels(configs){if(isArray(configs)&&configs.length>0){return configs.filter(isValidPanelObject).map(toPanelConfig)}else if(isValidPanelObject(configs)){return[toPanelConfig(configs)]}return[]},panelConfigs=getValidPanels(panels);return panelConfigs.length?panelConfigs:defaultCanvases(xs,ys)}