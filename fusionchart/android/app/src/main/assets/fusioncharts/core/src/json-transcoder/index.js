function json2json(input){var out={data:{}};if(!input){return out}if(typeof input==="string"){try{out.data=JSON.parse(input)}catch(err){out.error=err}}else{out.data=input}return out}function getJSONData(){return this.getChartData("json")}function setJSONData(data){this.setChartData(data,"json")}function wrapper(FusionCharts){FusionCharts&&(FusionCharts.prototype.setJSONData=setJSONData);FusionCharts&&(FusionCharts.prototype.getJSONData=getJSONData);return{format:"json",toJSON:json2json,fromJSON:json2json}}export default{extension:wrapper,name:"JSON",type:"transcoder",requiresFusionCharts:true};