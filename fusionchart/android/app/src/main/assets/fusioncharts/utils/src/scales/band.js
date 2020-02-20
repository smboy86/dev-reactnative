import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScaleOrdinal from"./ordinal";import sequence from"../scale-utils/array/range";var ScaleBand=function(_ScaleOrdinal){_inheritsLoose(ScaleBand,_ScaleOrdinal);function ScaleBand(){var _this;_this=_ScaleOrdinal.call(this)||this;_this.unknown=undefined;_this.range=[0,1];_this.paddingInner=0;_this.paddingOuter=0;_this.alignment=.5;_this.round=false;_this._rescale();return _this}var _proto=ScaleBand.prototype;_proto._rescale=function _rescale(){var _this2=this;var n=this.getDomain().length,range=this.getRange(),isReverse=range[1]<range[0],stop=range[1-Number(isReverse)],start=range[Number(isReverse)-0],interval=stop-start,values=[],availableSpace=n-this.getPaddingInner()+this.getPaddingOuter()*2;this.step=interval/Math.max(1,availableSpace);if(this.getRound()){this.step=Math.floor(this.getStep())}start+=(interval-this.getStep()*(n-this.getPaddingInner()))*this.getAlignment();this.bandwidth=this.getStep()*(1-this.getPaddingInner());if(this.getRound()){start=Math.round(start);this.bandwidth=Math.round(this.getBandwidth())}values=sequence(n).map((function(i){return start+_this2.getStep()*i}));return values.length>0?_ScaleOrdinal.prototype.setRange.call(this,isReverse?values.reverse():values):this};_proto.setDomain=function setDomain(domain){if(domain===void 0){domain=[]}_ScaleOrdinal.prototype.setDomain.call(this,domain);return this._rescale()};_proto.setRange=function setRange(range){if(range===void 0){range=[0,1]}this.range=[Number(range[0]),Number(range[1])];return this._rescale()};_proto.getRange=function getRange(){return this.range.slice()};_proto.rangeRound=function rangeRound(range){if(range===void 0){range=[0,1]}this.range=[Number(range[0]),Number(range[1])];this.round=true;return this._rescale()};_proto.getBandwidth=function getBandwidth(){return this.bandwidth};_proto.getStep=function getStep(){return this.step};_proto.setRound=function setRound(round){if(round===void 0){round=false}this.round=!!round;return this._rescale()};_proto.getRound=function getRound(){return this.round};_proto.setUnknown=function setUnknown(){this.unknown=undefined;return this};_proto.setPadding=function setPadding(padding){if(padding===void 0){padding=0}this.paddingOuter=Math.max(0,Math.min(1,padding));this.paddingInner=this.paddingOuter;return this._rescale()};_proto.getPadding=function getPadding(){return this.getPaddingInner()};_proto.setPaddingInner=function setPaddingInner(innerPadding){if(innerPadding===void 0){innerPadding=0}this.paddingInner=Math.max(0,Math.min(1,innerPadding));return this._rescale()};_proto.getPaddingInner=function getPaddingInner(){return this.paddingInner};_proto.setPaddingOuter=function setPaddingOuter(outerPadding){if(outerPadding===void 0){outerPadding=0}this.paddingOuter=Math.max(0,Math.min(1,outerPadding));return this._rescale()};_proto.getPaddingOuter=function getPaddingOuter(){return this.paddingOuter};_proto.setAlignment=function setAlignment(alignment){if(alignment===void 0){alignment=.5}this.alignment=Math.max(0,Math.min(1,alignment));return this._rescale()};_proto.getAlignment=function getAlignment(){return this.alignment};_proto.copy=function copy(){return(new ScaleBand).setDomain(this.domain).setRange(this.range).setRound(this.round).setPaddingInner(this.paddingInner).setPaddingOuter(this.paddingOuter).setAlignment(this.alignment)};return ScaleBand}(ScaleOrdinal);export default ScaleBand;