function interpolateNumber(_min,_max){var min=Number(_min),max=Number(_max),diff=max-min;return function(ratio){return diff*ratio+min}}export default interpolateNumber;