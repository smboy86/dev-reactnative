var RE=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i,isNil=function isNil(x){return typeof x==="undefined"||x===null};var FormatSpecifier=function(){function FormatSpecifier(specifier){var match=RE.exec(specifier);if(!match)throw new Error("Invalid number format specifier: "+specifier);this.fill=match[1]||" ";this.align=match[2]||">";this.sign=match[3]||"-";this.symbol=match[4]||"";this.zero=Boolean(match[5]);this.width=match[6]&&Number(match[6]);this.comma=Boolean(match[7]);this.precision=match[8]&&Number(match[8].slice(1));this.trim=Boolean(match[9]);this.type=match[10]||""}var _proto=FormatSpecifier.prototype;_proto.toString=function toString(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(isNil(this.width)?"":Math.max(1,this.width|0))+(this.comma?",":"")+(isNil(this.precision)?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};return FormatSpecifier}();export default FormatSpecifier;