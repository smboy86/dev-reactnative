var UNDEF;export default function pluckNumber(){var arg,i,l;for(i=0,l=arguments.length;i<l;i+=1){arg=arguments[i];if(!arg&&arg!==false&&arg!==0){continue}else if(isNaN(arg=Number(arg))){continue}return arg}return UNDEF}