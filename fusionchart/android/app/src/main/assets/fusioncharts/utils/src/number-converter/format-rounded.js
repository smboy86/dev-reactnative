import formatDecimal from"./format-decimal";var formatRounded=function formatRounded(x,p){var d=formatDecimal(x,p);var coefficient,exponent;if(!d)return x+"";coefficient=d[0];exponent=d[1];if(Number(exponent)<0){return"0."+new Array(-exponent).join("0")+coefficient}else if(coefficient.length>exponent+1){return coefficient.slice(0,exponent+1)+"."+coefficient.slice(exponent+1)}return coefficient+new Array(exponent-coefficient.length+2).join("0")};export default formatRounded;