import{Weekdays}from"../datetime-enums";import{getDefaultOutputFormat,dateIntervalToString,dateRangeCaclulator}from"../time-intervals/datetime-ops";function interval(start,intervalConfig,calculateStart){if(calculateStart===void 0){calculateStart=false}if(intervalConfig.duration.ms){var _dateRangeCaclulator=dateRangeCaclulator(start,intervalConfig.duration,intervalConfig.enableUTC,intervalConfig.weekStartFrom||Weekdays.Sunday,calculateStart),startDate=_dateRangeCaclulator.startDate,endDate=_dateRangeCaclulator.endDate;intervalConfig.outputFormat=intervalConfig.outputFormat||getDefaultOutputFormat(intervalConfig.duration.Unit);return{start:startDate,end:endDate,config:intervalConfig,toString:dateIntervalToString}}}export{interval};