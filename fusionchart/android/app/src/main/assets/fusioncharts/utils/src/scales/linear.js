import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScaleContinuous,{deInterpolateLinear,copyScale}from"./continuous";import _ticks,{tickIncrement}from"../scale-utils/array/ticks";import interpolateNumber from"../scale-utils/interpolators/number";import{tickFormat as _tickFormat}from"../array/ticks";var ScaleLinear=function(_ScaleContinuous){_inheritsLoose(ScaleLinear,_ScaleContinuous);function ScaleLinear(){return _ScaleContinuous.call(this,deInterpolateLinear,interpolateNumber)||this}var _proto=ScaleLinear.prototype;_proto.ticks=function ticks(count){if(count===void 0){count=7}var domain=this.getDomain();return this.majorTicks=_ticks(domain[0],domain[domain.length-1],count)};_proto.tickFormat=function tickFormat(count,specifier){return _tickFormat(this.getDomain(),count,specifier,this._localeConverter)};_proto.nice=function nice(count){if(count===void 0){count=7}var domain=this.getDomain(),startIndex=0,endIndex=domain.length-1,start=domain[startIndex],stop=domain[endIndex],step;if(stop<start){step=start;start=stop;stop=step;step=startIndex;startIndex=endIndex;endIndex=step}step=tickIncrement(start,stop,count);if(step>0){start=Math.floor(start/step)*step;stop=Math.ceil(stop/step)*step;step=tickIncrement(start,stop,count)}else if(step<0){start=Math.ceil(start*step)/step;stop=Math.floor(stop*step)/step;step=tickIncrement(start,stop,count)}if(step>0){domain[startIndex]=Math.floor(start/step)*step;domain[endIndex]=Math.ceil(stop/step)*step;this.setDomain(domain)}else if(step<0){domain[startIndex]=Math.ceil(start*step)/step;domain[endIndex]=Math.floor(stop*step)/step;this.setDomain(domain)}return this};_proto.copy=function copy(){return copyScale(this,new ScaleLinear)};_proto.minorTicks=function minorTicks(numMinor,majorTicks){if(numMinor===void 0){numMinor=4}if(majorTicks===void 0){majorTicks=this.majorTicks||this.ticks()}var ticksLen=majorTicks.length,tickInterval=majorTicks[1]-majorTicks[0],minorTickValues=[],j,minorTickInterval,start,i;for(i=0;i<ticksLen-1;++i){start=majorTicks[i];minorTickInterval=tickInterval/(Number(numMinor)+1);for(j=1;j<=numMinor;j+=1){minorTickValues.push(start+minorTickInterval*j)}}return minorTickValues};_proto.contextTicks=function contextTicks(){return this.contextTicksArr||[]};_proto.getType=function getType(){return"linear"};return ScaleLinear}(ScaleContinuous);export default ScaleLinear;