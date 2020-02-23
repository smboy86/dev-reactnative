import ReferenceLine from"../components/reference-line";export default function(canvas){canvas.config.yConfigs.forEach((function(yConfig){var scale=yConfig.scale;if(canvas.config.enableReferenceLine&&Array.isArray(yConfig.referenceline)){yConfig.referenceline.forEach((function(referencelineConf){var refLine=canvas.attachChild(ReferenceLine,"referenceLine");refLine.addEventListener("fc-mouseover",refLine.hoverInHandler);refLine.addEventListener("fc-mousemove",refLine.moveHandler);refLine.addEventListener("fc-mouseout",refLine.hoverOutHandler);refLine.addEventListener("fc-click",refLine.clickHandler);refLine.configure({yScale:scale,direction:yConfig.align==="left"?"right":"left",formatterFn:yConfig.formatterFn,prefix:yConfig.formatLabelPrefix,suffix:yConfig.formatLabelSuffix,referenceLine:referencelineConf})}))}}))}