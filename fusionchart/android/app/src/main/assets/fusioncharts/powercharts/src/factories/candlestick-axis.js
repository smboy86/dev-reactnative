import{componentFactory}from"@fusioncharts/core/src/lib";import NumericAxis from"@fusioncharts/core/src/axis/numeric";export default function(chart){var canvasArr=chart.getChildren("canvas"),canvas=canvasArr[0],canvasVolume=canvasArr[1],showVolumeChart=chart.config.showVolumeChart,zoomObj={zoomable:true,pannable:true},conf,axisRefVisualCartesian=canvas.getChildren("axisRefVisualCartesian")[0],axisRefVisualCartesianVol,vYAxis,yAxis,xAxis,redraw=function redraw(){return axisRefVisualCartesian.asyncDraw()},redrawVol=function redrawVol(){return axisRefVisualCartesianVol.asyncDraw()};conf=chart._feedAxesRawData();componentFactory(chart,NumericAxis,"yAxis",showVolumeChart?2:1,conf.yAxisConfigure);componentFactory(chart,NumericAxis,"xAxis",1,conf.xAxisConfigure);yAxis=chart.getChildren("yAxis")[0];vYAxis=chart.getChildren("yAxis")[1];yAxis.setAxisConfig({relativeAxis:vYAxis});vYAxis&&vYAxis.setAxisConfig({relativeAxis:yAxis});xAxis=chart.getChildren("xAxis")[0];yAxis.setLinkedItem("canvas",canvas);xAxis.setLinkedItem("canvas",canvas);axisRefVisualCartesian.setLinkedItem(yAxis.getId(),yAxis);axisRefVisualCartesian.setLinkedItem(xAxis.getId(),xAxis);axisRefVisualCartesian.addExtEventListener("visiblerangeset",redraw,yAxis);axisRefVisualCartesian.addExtEventListener("visiblerangeset",redraw,xAxis);canvas.attachAxis(xAxis,false,chart.zoomX?zoomObj:{});canvas.attachAxis(yAxis,true,chart.zoomY?zoomObj:{});if(showVolumeChart){axisRefVisualCartesianVol=canvasVolume.getChildren("axisRefVisualCartesian")[0];canvasVolume.attachAxis(xAxis,false,chart.zoomX?zoomObj:{});vYAxis.setLinkedItem("canvas",canvasVolume);axisRefVisualCartesianVol.setLinkedItem(vYAxis.getId(),vYAxis);axisRefVisualCartesianVol.setLinkedItem(xAxis.getId(),xAxis);axisRefVisualCartesianVol.addExtEventListener("visiblerangeset",redrawVol,vYAxis);axisRefVisualCartesianVol.addExtEventListener("visiblerangeset",redrawVol,xAxis);canvasVolume.attachAxis(vYAxis,true,chart.zoomY?zoomObj:{})}chart._setCategories()}