import TimeInterval from"../time-interval.js";import{durationDay}from"../durations.js";var utcDay=new TimeInterval("day",(function(d){return d.setUTCHours(0,0,0,0)}),(function(d,s){return d.setUTCDate(d.getUTCDate()+s)}),(function(s,e){return(e-s)/durationDay}),(function(d){return d.getUTCDate()-1}));export default utcDay;