import polarCanvas from"../_internal/components/canvases/polar-canvas";import axisRefVisualPolar from"@fusioncharts/core/src/axis-ref-visuals/axis-ref-polar-component";import{componentFactory}from"@fusioncharts/core/src/lib";export default function(chart){var pCanvas;componentFactory(chart,polarCanvas,"canvas",chart.config.showVolumeChart?2:1);pCanvas=chart.getChildren("canvas");for(var i=0,len=pCanvas.length;i<len;i++){pCanvas[i].configure();componentFactory(pCanvas[i],axisRefVisualPolar,"axisRefVisualPolar")}}