import NumericAxis from"@fusioncharts/core/src/axis/numeric";import PolarAxis from"@fusioncharts/core/src/axis/polar";import{componentFactory}from"@fusioncharts/core/src/lib";export default function(chart){var canvas=chart.getChildren("canvas")[0],config=chart._feedAxesRawData(),axisRefVisual=canvas.getChildren("axisRefVisualPolar")[0],yAxis,xAxis,redraw=function redraw(){return axisRefVisual.asyncDraw()};componentFactory(chart,NumericAxis,"yAxis",1,config.yAxisConf);componentFactory(chart,PolarAxis,"xAxis",1,config.xAxisConf);yAxis=chart.getChildren("yAxis")[0];xAxis=chart.getChildren("xAxis")[0];yAxis.setLinkedItem("canvas",canvas);axisRefVisual.setLinkedItem(yAxis.getId(),yAxis);axisRefVisual.setLinkedItem(xAxis.getId(),xAxis);axisRefVisual.addExtEventListener("visiblerangeset",redraw,xAxis);axisRefVisual.addExtEventListener("visiblerangeset",redraw,yAxis);canvas.attachAxis(xAxis,false,{});canvas.attachAxis(yAxis,true,{});chart._setCategories()}