export default function(series,order){var ii=series.length;if(ii>1){var jj=series[order[0]].length,i=0,j=0,data,diff,amtPositive,amtNegative;for(j=0;j<jj;++j){amtNegative=0;amtPositive=amtNegative;for(i=0;i<ii;++i){data=series[order[i]][j];diff=data[1]-data[0];if(diff>=0){data[0]=amtPositive;amtPositive+=diff;data[1]=amtPositive}else if(diff<0){data[1]=amtNegative;amtNegative+=diff;data[0]=amtNegative}else{data[0]=amtPositive}}}}}