import TimeInterval from"./time-interval.js";var month=new TimeInterval("month",(function(d){d.setDate(1);d.setHours(0,0,0,0)}),(function(d,s){return d.setMonth(d.getMonth()+s)}),(function(s,e){return e.getMonth()-s.getMonth()+(e.getFullYear()-s.getFullYear())*12}),(function(d){return d.getMonth()}));export default month;