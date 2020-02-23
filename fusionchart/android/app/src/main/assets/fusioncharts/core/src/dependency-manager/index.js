import{raiseError,triggerEvent}from"../event-api";var typeStore={},depStore={};function getExtensionName(extension){if(extension===void 0){extension={}}var name=extension.getName&&extension.getName()||extension.name;if(typeof name==="undefined"){raiseError({id:"Extension"},"90211","extension","Name",new Error("A FusionCharts extension must have a getName API or a name property."))}return name&&name.toLowerCase()}function getExtensionType(extension){if(extension===void 0){extension={}}var type=extension.getType&&extension.getType()||extension.type;return type&&type.toLowerCase()}function defineDepType(type){if(typeof type==="string"){typeStore[type]={}}}function addDep(){var _this=this;for(var _len=arguments.length,deps=new Array(_len),_key=0;_key<_len;_key++){deps[_key]=arguments[_key]}if(!deps.length){raiseError({id:"Extension"},"90211","dependency","Extension",new Error("A FusionCharts extension must have a valid extension property."));return}deps.forEach((function(dep){var extensionName,pluggableComponent,extensionType,isFirstTimeAdd,requiresFusionCharts;if(!dep){raiseError({id:"Extension"},"90211","dependency","Extension",new Error("A FusionCharts extension must have a valid extension property."));return}if(dep.extension){pluggableComponent=dep.extension}else{pluggableComponent=dep}extensionName=getExtensionName(dep);extensionType=getExtensionType(dep);requiresFusionCharts=dep.requiresFusionCharts;if(extensionType){!typeStore[extensionType]&&defineDepType(extensionType);if(isFirstTimeAdd=typeStore[extensionType][extensionName]!==pluggableComponent){typeStore[extensionType][extensionName]=pluggableComponent}}else if(extensionName){if(isFirstTimeAdd=depStore[extensionName]!==pluggableComponent){depStore[extensionName]=pluggableComponent}}isFirstTimeAdd&&triggerEvent("dependencyadded",_this,{name:extensionName,type:extensionType});isFirstTimeAdd&&requiresFusionCharts&&pluggableComponent(_this)}))}function getDep(_name,type){var dependency,name=_name&&_name.toLowerCase();if(type&&typeStore[type]){return typeStore[type][name]}else if(!type){for(var key in typeStore){if(typeStore.hasOwnProperty(key)){dependency=typeStore[key][name];if(dependency){return dependency}}}}return depStore[name]}function getDepsByType(type){if(type===void 0){type=""}return type===""?typeStore:typeStore[type.toLowerCase()]}export{addDep,getDep,getDepsByType};