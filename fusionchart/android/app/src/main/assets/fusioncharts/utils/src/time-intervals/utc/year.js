import UtcYearInterval from"./time-interval-utcYear.js";var utcYear=new UtcYearInterval("year",(function(d){d.setUTCMonth(0,1);d.setUTCHours(0,0,0,0)}),(function(d,s){return d.setUTCFullYear(d.getUTCFullYear()+s)}),(function(s,e){return e.getUTCFullYear()-s.getUTCFullYear()}),(function(d){return d.getUTCFullYear()}));export default utcYear;