import{componentFactory}from"@fusioncharts/core/src/lib";import CategoryAxis from"@fusioncharts/core/src/axis/category";import AxisSelectorUI from"../_internal/components/axis-selector-ui";export default function(chart){var canvas=chart.getChildren("canvas")[0],axisRefVisualCartesian=canvas.getChildren("axisRefVisualCartesian")[0],configure,xAxis,redraw=function redraw(){return axisRefVisualCartesian.asyncDraw()};configure=chart._feedAxesRawData();AxisSelectorUI.resetAxisCount();componentFactory(chart,AxisSelectorUI,"yAxisSelectorUI",configure.yAxisConfigure&&configure.yAxisConfigure.length,configure.yAxisConfigure);componentFactory(chart,CategoryAxis,"xAxis",1,configure.xAxisConfigure);xAxis=chart.getChildren("xAxis")[0];xAxis.setLinkedItem("canvas",canvas);axisRefVisualCartesian.setLinkedItem(xAxis.getId(),xAxis);axisRefVisualCartesian.addExtEventListener("visiblerangeset",redraw,xAxis);canvas.attachAxis(xAxis,false);canvas.setPrimaryAxis("xAxis",xAxis);chart._setCategories()}