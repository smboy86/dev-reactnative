import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import ScaleContinuous,{deInterpolateLinear,copyScale}from"./continuous";import interpolateNumber from"../scale-utils/interpolators/number";var ScaleCategory=function(_ScaleContinuous){_inheritsLoose(ScaleCategory,_ScaleContinuous);function ScaleCategory(){return _ScaleContinuous.call(this,deInterpolateLinear,interpolateNumber)||this}var _proto=ScaleCategory.prototype;_proto.copy=function copy(){return copyScale(this,new ScaleCategory)};return ScaleCategory}(ScaleContinuous);export default ScaleCategory;