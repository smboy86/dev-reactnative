import{durationYear}from"@fusioncharts/utils/src/time-intervals/durations";export default function(extent){var duration=Math.min(extent[1]-extent[0],durationYear),focusStart=extent[1]-duration;return[focusStart,extent[1]]}