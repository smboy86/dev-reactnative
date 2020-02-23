import FormatSpecifier from"./format-specifier";import formatTypes from"./format-types";import formatTrim from"./format-trim";import{prefixExponent}from"./format-prefix-auto";var CHAR_CODE_0=48,CHAR_CODE_9=57,CHAR_CODE_DOT=46,EQUALTO="=",G="g",BLANK="",ZEROSTRING="0",isNil=function isNil(x){return typeof x==="undefined"||x===null};var Formatter=function(){function Formatter(specifier,localeInfo){this.specifier=new FormatSpecifier(specifier);this.localeInfo=localeInfo;var symbol=this.specifier.symbol;this.fill=this.specifier.fill;this.align=this.specifier.align;this.sign=this.specifier.sign;this.zero=this.specifier.zero;this.width=this.specifier.width;this.comma=this.specifier.comma;this.precision=this.specifier.precision;this.trim=this.specifier.trim;this.type=this.specifier.type;if(this.type==="n"){this.comma=true;this.type=G}else if(!formatTypes[this.type]){if(isNil(this.precision))this.precision=12;this.trim=true;this.type=G}if(this.zero||this.fill==="0"&&this.align==="="){this.zero=true;this.fill=ZEROSTRING;this.align=EQUALTO}if(symbol==="$"){this.prefix=this.localeInfo.prefix}else if(symbol==="#"&&/[boxX]/.test(this.type)){this.prefix="0"+this.type.toLowerCase()}else{this.prefix=BLANK}if(symbol==="$"){this.suffix=this.localeInfo.suffix}else if(/[%p]/.test(this.type)){this.suffix=this.localeInfo.percent}else{this.suffix=BLANK}this.formatType=formatTypes[this.type];this.mayHaveSuffix=/[defgprs%]/.test(this.type);if(isNil(this.precision)){this.precision=6}else if(/[gprs]/.test(this.type)){this.precision=Math.max(1,Math.min(21,this.precision))}else{this.precision=Math.max(0,Math.min(20,this.precision))}this.setCustomPrefix("");this.setCustomSuffix("")}var _proto=Formatter.prototype;_proto.format=function format(_value){var valuePrefix=this.prefix,valueSuffix=this.suffix,formatType=this.formatType,isValueNegative,totalLength,padding,i,n,c,value=_value;if(this.type==="c"){valueSuffix=formatType(value)+valueSuffix;value=BLANK}else{value=+value;isValueNegative=value<0;value=formatType(Math.abs(value),this.precision);if(this.trim)value=formatTrim(value);if(isValueNegative&&+value===0)isValueNegative=false;if(isValueNegative){valuePrefix=(this.sign==="("?this.sign:"-")+valuePrefix}else if(this.sign==="-"||this.sign==="("){valuePrefix=""+valuePrefix}else{valuePrefix=this.sign+valuePrefix}if(this.type==="s"){valueSuffix=this.localeInfo.prefixes[8+prefixExponent/3]+valueSuffix}else{valueSuffix=""+valueSuffix}valueSuffix=valueSuffix+(isValueNegative&&this.sign==="("?")":"");if(this.mayHaveSuffix){i=-1;n=value.length;while(++i<n){c=value.charCodeAt(i);if(c<CHAR_CODE_0||c>CHAR_CODE_9){valueSuffix=(c===CHAR_CODE_DOT?this.localeInfo.decimal+value.slice(i+1):value.slice(i))+valueSuffix;value=value.slice(0,i);break}}}}if(this.comma&&!this.zero)value=this.localeInfo.group(value,Infinity);totalLength=valuePrefix.length+value.length+valueSuffix.length;padding=totalLength<this.width?new Array(this.width-totalLength+1).join(this.fill):"";if(this.comma&&this.zero){value=this.localeInfo.group(padding+value,padding.length?this.width-valueSuffix.length:Infinity);padding=BLANK}switch(this.align){case"<":value=valuePrefix+value+valueSuffix+padding;break;case"=":value=valuePrefix+padding+value+valueSuffix;break;case"^":totalLength=padding.length/2;value=padding.slice(0,totalLength)+valuePrefix+value+valueSuffix+padding.slice(totalLength);break;default:value=padding+valuePrefix+value+valueSuffix}return this.getCustomPrefix()+this.localeInfo.numerals(value)+this.getCustomSuffix()};_proto.setCustomPrefix=function setCustomPrefix(prefix){this._customPrefix=prefix+"";return this};_proto.getCustomPrefix=function getCustomPrefix(){return this._customPrefix};_proto.setCustomSuffix=function setCustomSuffix(suffix){this._customSuffix=suffix+"";return this};_proto.getCustomSuffix=function getCustomSuffix(){return this._customSuffix};_proto.toString=function toString(){return this.specifier.toString()};return Formatter}();export default Formatter;