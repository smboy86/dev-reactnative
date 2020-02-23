import{MILLISECONDS_IN_SECOND,SECONDS_IN_MINUTE,MINUTES_IN_HOUR,HOURS_IN_DAY,DAYS_IN_MONTH,MONTHS_IN_YEAR,DAYS_IN_YEAR}from"../scale-utils";var durationMilliSecond=1,durationSecond=MILLISECONDS_IN_SECOND*durationMilliSecond,durationMinute=durationSecond*SECONDS_IN_MINUTE,durationHour=durationMinute*MINUTES_IN_HOUR,durationDay=durationHour*HOURS_IN_DAY,durationMonth=durationDay*DAYS_IN_MONTH,durationYear=durationDay*DAYS_IN_YEAR;function santizeBin(maxUnit,slotArr){var sanitizedArr=[];for(var index=0;index<slotArr.length;index++){var bin=slotArr[index];bin&&parseInt(bin,10)==bin&&bin>0&&bin<=maxUnit/2&&maxUnit%bin===0&&sanitizedArr.push(Number(bin))}return sanitizedArr.sort((function sorAsc(a,b){return a-b}))}function santizeYear(slotArr){var sanitizedArr=[];for(var index=0;index<slotArr.length;index++){var bin=slotArr[index];bin&&parseInt(bin,10)==bin&&bin>0&&sanitizedArr.push(Number(bin))}return sanitizedArr.sort((function sorAsc(a,b){return a-b}))}function sanitizeBins(customBin){if(!customBin){return[]}var sanitizdeCustomBin=customBin,binMaxUnitObj={millisecond:MILLISECONDS_IN_SECOND,second:SECONDS_IN_MINUTE,minute:MINUTES_IN_HOUR,hour:HOURS_IN_DAY,day:DAYS_IN_MONTH,month:MONTHS_IN_YEAR};for(var key in binMaxUnitObj){if(binMaxUnitObj.hasOwnProperty(key)){if(Array.isArray(customBin[key])){sanitizdeCustomBin[key]=santizeBin(binMaxUnitObj[key],customBin[key])}else{sanitizdeCustomBin[key]=false}}}if(Array.isArray(customBin.year)){sanitizdeCustomBin.year=santizeYear(customBin.year)}else{sanitizdeCustomBin.year=false}return sanitizdeCustomBin}function getAllStandardBins(year,month,week,day,hour,minute,second,millisecond){var standardMiliseconds=[[millisecond,1,durationMilliSecond],[millisecond,2,2*durationMilliSecond],[millisecond,4,4*durationMilliSecond],[millisecond,5,5*durationMilliSecond],[millisecond,10,10*durationMilliSecond],[millisecond,20,20*durationMilliSecond],[millisecond,25,25*durationMilliSecond],[millisecond,40,40*durationMilliSecond],[millisecond,50,50*durationMilliSecond],[millisecond,100,100*durationMilliSecond],[millisecond,200,200*durationMilliSecond],[millisecond,250,250*durationMilliSecond],[millisecond,500,500*durationMilliSecond]],standardSeconds=[[second,1,durationSecond,true],[second,2,2*durationSecond],[second,3,3*durationSecond],[second,4,4*durationSecond],[second,5,5*durationSecond],[second,6,6*durationSecond],[second,10,10*durationSecond],[second,12,12*durationSecond],[second,15,15*durationSecond],[second,20,20*durationSecond],[second,30,30*durationSecond]],standardMinutes=[[minute,1,durationMinute,true],[minute,2,2*durationMinute],[minute,3,3*durationMinute],[minute,4,4*durationMinute],[minute,5,5*durationMinute],[minute,6,6*durationMinute],[minute,10,10*durationMinute],[minute,12,12*durationMinute],[minute,15,15*durationMinute],[minute,20,20*durationMinute],[minute,30,30*durationMinute]],standardHours=[[hour,1,durationHour,true],[hour,2,2*durationHour],[hour,3,3*durationHour],[hour,4,4*durationHour],[hour,6,6*durationHour],[hour,8,8*durationHour],[hour,12,12*durationHour]],standardDays=[[day,1,durationDay,true],[day,2,2*durationDay],[day,3,3*durationDay],[day,5,5*durationDay],[day,6,6*durationDay],[day,10,10*durationDay],[day,15,15*durationDay]],standardMonths=[[month,1,durationMonth],[month,2,2*durationMonth],[month,3,3*durationMonth],[month,4,4*durationMonth],[month,6,6*durationMonth]],standardYears=[[year,1,durationYear]];return[{binUnitName:millisecond,duration:durationMilliSecond,standardBinVal:standardMiliseconds},{binUnitName:second,duration:durationSecond,standardBinVal:standardSeconds},{binUnitName:minute,duration:durationMinute,standardBinVal:standardMinutes},{binUnitName:hour,duration:durationHour,standardBinVal:standardHours},{binUnitName:day,duration:durationDay,standardBinVal:standardDays},{binUnitName:month,duration:durationMonth,standardBinVal:standardMonths},{binUnitName:year,duration:durationYear,standardBinVal:standardYears}]}function generateBins(binUnit,binArr,duration){var updatedBins=[];for(var index=0;index<binArr.length;index++){var bin=binArr[index];updatedBins.push([binUnit,bin,bin*duration])}return updatedBins}function getCustomBins(year,month,week,day,hour,minute,second,millisecond,customBin){var sanitizdeCustomBin=customBin,binNameDurationArr=getAllStandardBins(year,month,week,day,hour,minute,second,millisecond),updatedBins=[];sanitizdeCustomBin=sanitizeBins(Object.assign({},customBin));for(var index=0;index<binNameDurationArr.length;index++){var binUnit=binNameDurationArr[index];if(sanitizdeCustomBin[binUnit.binUnitName.name()]){if(sanitizdeCustomBin[binUnit.binUnitName.name()].length>0){updatedBins=updatedBins.concat(generateBins(binUnit.binUnitName,sanitizdeCustomBin[binUnit.binUnitName.name()],binUnit.duration))}}else{updatedBins=updatedBins.concat(binUnit.standardBinVal)}}if(updatedBins.length===0){updatedBins=getDefaultBins(year,month,week,day,hour,minute,second,millisecond)}return updatedBins}function getDefaultBins(year,month,week,day,hour,minute,second,millisecond){var binNameDurationArr=getAllStandardBins(year,month,week,day,hour,minute,second,millisecond),defaultStandardBin=[];for(var index=0;index<binNameDurationArr.length;index++){defaultStandardBin=defaultStandardBin.concat(binNameDurationArr[index].standardBinVal)}return defaultStandardBin}export{getDefaultBins,getCustomBins};