var DEFAULT_UNKNOWN="implicit";var ScaleOrdinal=function(){function ScaleOrdinal(){this.unknown=DEFAULT_UNKNOWN;this.domain=[];this.ordinalRange=[];this.map=new Map}var _proto=ScaleOrdinal.prototype;_proto.setDomain=function setDomain(inputArr){if(inputArr===void 0){inputArr=[]}var i,domainVal,domainValStr;this.domain=[];this.map.clear();for(i=0;i<inputArr.length;++i){domainVal=inputArr[i];domainValStr=domainVal.toString();if(!this.map.has(domainVal)){this.map.set(domainValStr,this.domain.push(domainVal))}}return this};_proto.getDomain=function getDomain(){return this.domain.slice()};_proto.setRange=function setRange(inputArr){this.ordinalRange=inputArr.slice();return this};_proto.getRange=function getRange(){return this.ordinalRange.slice()};_proto.setUnknown=function setUnknown(unknown){this.unknown=unknown;return this};_proto.getUnknown=function getUnknown(){return this.unknown};_proto.copy=function copy(){return(new ScaleOrdinal).setDomain(this.getDomain()).setRange(this.getRange()).setUnknown(this.geUnknownn())};_proto.getRangeValue=function getRangeValue(domainKey){var map=this.map,domainKeyStr=domainKey.toString(),range=this.getRange(),value=map.get(domainKeyStr);if(!value){if(this.getUnknown()!==DEFAULT_UNKNOWN){return this.getUnknown()}value=this.domain.push(domainKey);map.set(domainKeyStr,value)}return range[(value-1)%range.length]};_proto.getType=function getType(){return"ordinal"};return ScaleOrdinal}();export default ScaleOrdinal;