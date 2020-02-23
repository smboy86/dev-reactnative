import{indexColBetween,between,indexColEquals,equals,indexColLess,less,indexColLessEquals,lessEquals,indexColGreater,greater,indexColGreaterEquals,greaterEquals}from"./filter-operations";import{schema,data5rows}from"../../sample/data/cars";import bakeryData from"../../sample/data/salesTransaction";import bakerySchema from"../../sample/data/salesTransaction.schema";import groupBy from"./group-by";import DataStore from"../datastore";import{DatetimeUnits}from"../../../fc-utils/src/datetime-enums";var data=[].concat(data5rows,data5rows).sort((function(a,b){return a[1]-b[1]}));describe("indexColBetween operation",(function(){it("indexColBetween 10 - 100 - should return all data",(function(){var returnVal=indexColBetween(1,10,100),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("buick skylark 320")}));it("indexColBetween -50 - 1000 - should return all data",(function(){var returnVal=indexColBetween(1,-50,1e3),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("buick skylark 320")}));it("indexColBetween 16 - 18 - should return all data except first 2",(function(){var returnVal=indexColBetween(1,16,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("amc rebel sst");expect(returnArr.length).toBe(8)}));it("indexColBetween 16 - 17 - should return data indexColBetween range 16-17",(function(){var returnVal=indexColBetween(1,16,17),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("amc rebel sst");expect(returnArr.length).toBe(4)}));it("indexColBetween in an interval column",(function(){var bakeryDataStore=new DataStore,bakeryDataTable=bakeryDataStore.createDataTable(bakeryData,bakerySchema),bakeryGroupedData=bakeryDataTable.query(groupBy([{column:"Time",timeUnit:DatetimeUnits.Day}],[{column:"Value",operation:"sum"}])).getData(),returnVal=indexColBetween(0,+new Date(2017,1,1,2),+new Date(2017,2,2,19)),returnFn=returnVal.fn(bakeryGroupedData.data,bakeryGroupedData.schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0].start).toBe(+new Date(2017,1,2));expect(returnArr[returnArr.length-1][0].end).toBe(+new Date(2017,2,2))}))}));describe("between operation",(function(){it("between 10 - 100 - should return all data",(function(){var returnVal=between("Miles_per_Gallon",10,100),returnFn=returnVal.fn(data5rows,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("chevrolet chevelle malibu")}));it("between -50 - 1000 - should return all data",(function(){var returnVal=between("Miles_per_Gallon",-50,1e3),returnFn=returnVal.fn(data5rows,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("chevrolet chevelle malibu")}));it("between 16 - 18 - should return all data except one",(function(){var returnVal=between("Miles_per_Gallon",16,18),returnFn=returnVal.fn(data5rows,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("chevrolet chevelle malibu");expect(returnArr.length).toBe(4)}));it("between 16 - 17 - should return data between range 16-17",(function(){var returnVal=between("Miles_per_Gallon",16,17),returnFn=returnVal.fn(data5rows,schema),returnArr=returnFn.generatorFn();expect(returnArr[0][0]).toBe("amc rebel sst");expect(returnArr.length).toBe(2)}));it("between with wrong argument",(function(){var returnVal=between("Wrong_Name",16,17);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}))}));describe("indexColEquals operation",(function(){it("indexColEquals 18 - should return 4 elements",(function(){var returnVal=indexColEquals(1,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(4)}));it("indexColEquals 25 - should return a blank array",(function(){var returnVal=indexColEquals(1,25),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(0)}))}));describe("equal operation",(function(){it("equal 150 - should return 4 elements",(function(){var returnVal=equals("Horsepower",150),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(4)}));it("equal 25 - should return a blank array",(function(){var returnVal=equals("Horsepower",25),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(0)}));it("equal on string type column",(function(){var returnVal=equals("Name","buick skylark 320"),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(2)}));it("equal on string type column - case insensitive",(function(){var returnVal=equals("Name","BUICK skylark 320"),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(2)}));it("equal on date type column - case insensitive",(function(){var returnVal=equals("Year",+new Date(1970,0,1,5,30)),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(10)}));it("equal with wrong argument",(function(){var returnVal=equals("Wrong_Name",16);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}));var emptyData=data.slice(0);emptyData.push(["ford torino 2",16,0,301,141,3448,10.9,"1970-01-05","JAPAN"],["ford torino 3",16,null,306,149,3441,10.1,"1970-01-15","France"],["ford torino 4",16,undefined,306,149,3441,10.1,"1970-01-15","France"]);it("equals 0 on a column where both 0 and null present",(function(){var returnVal=equals("Cylinders",0),returnFn=returnVal.fn(emptyData,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(1);expect(returnArr[0][0]).toBe("ford torino 2")}));it("equals null on a column where both 0, null, undefined present",(function(){var returnVal=equals("Cylinders",null),returnFn=returnVal.fn(emptyData,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(1);expect(returnArr[0][0]).toBe("ford torino 3")}));it("equals undefined on a column where both 0, null, undefined present",(function(){var returnVal=equals("Cylinders",undefined),returnFn=returnVal.fn(emptyData,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(1);expect(returnArr[0][0]).toBe("ford torino 4")}))}));describe("indexColLess operation",(function(){it("indexColLess 18 - should return 6 elements",(function(){var returnVal=indexColLess(1,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(6)}));it("indexColLess 16 - should return all values less than 16",(function(){var returnVal=indexColLess(1,16),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(2)}));it("indexColLess 10 - should return blank array",(function(){var returnVal=indexColLess(1,10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(0)}))}));describe("less operation",(function(){it("less 318 - should return 6 elements",(function(){var returnVal=less("Displacement",318),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(6)}));it("less 400 - should return all values less than 16",(function(){var returnVal=less("Displacement",400),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(10)}));it("less 10 - should return blank array",(function(){var returnVal=less("Displacement",10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(0)}));it("less with wrong argument",(function(){var returnVal=between("Wrong_Name",16,17);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}))}));describe("indexColLessEquals operation",(function(){it("indexColLessEquals 18 - should return 8 elements",(function(){var returnVal=indexColLessEquals(1,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(10)}));it("indexColLessEquals 16 - should return all values lessEquals than 16",(function(){var returnVal=indexColLessEquals(1,16),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(4)}));it("indexColLessEquals 10 - should return blank array",(function(){var returnVal=indexColLessEquals(1,10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(0)}))}));describe("lessEquals operation",(function(){it("lessEquals 318 - should return 8 elements",(function(){var returnVal=lessEquals("Displacement",318),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(8)}));it("lessEquals 400 - should return all values lessEquals than 16",(function(){var returnVal=lessEquals("Displacement",400),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(10)}));it("lessEquals 10 - should return blank array",(function(){var returnVal=lessEquals("Displacement",10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(0)}));it("lessEquals with wrong argument",(function(){var returnVal=between("Wrong_Name",16,17);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}))}));describe("indexColGreater operation",(function(){it("indexColGreater 18 - should return 0 elements",(function(){var returnVal=indexColGreater(1,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(0)}));it("indexColGreater 16 - should return all values greater than 16",(function(){var returnVal=indexColGreater(1,16),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(6)}));it("indexColGreater 10 - should return all elements",(function(){var returnVal=indexColGreater(1,10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(10)}))}));describe("greater operation",(function(){it("greater 318 - should return 2 elements",(function(){var returnVal=greater("Displacement",318),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(2)}));it("greater 400 - should return all values greater than 400",(function(){var returnVal=greater("Displacement",400),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(0)}));it("greater 10 - should return all elements",(function(){var returnVal=greater("Displacement",10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(10)}));it("greater with wrong argument",(function(){var returnVal=between("Wrong_Name",16,17);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}));it("null and undefined values should be ignored",(function(){var dataArr=[["2016-10-30 09:58:11",1,"Bread",-10,"India"],["2016-10-30 09:59:11",1,"Bread",null,"India"],["2016-10-30 10:03:34",2,"Scandinavian",27.13,"India"],["2016-10-30 10:04:34",2,"Scandinavian",null,"India"],["2016-10-30 10:05:44",2,"Scandinavian",0,"India"],["2016-10-30 10:07:57",3,"Hot chocolate",0,"India"],["2016-10-30 10:08:57",3,"Hot chocolate",12,"Srilanka"],["2016-10-30 10:09:37",3,"Hot chocolate",null,"Srilanka"],["2016-10-30 10:09:57",1,"Bread",0,"Srilanka"],["2016-10-30 10:10:57",3,"Bread",110,"Srilanka"],["2016-10-30 10:10:59",2,"Scandinavian",4.15,"Srilanka"],["2016-10-30 10:10:59",3,"Bread",1,"Srilanka"]],schemaArr=[{name:"Time",type:"date",format:"%Y-%m-%d %H:%M:%S"},{name:"Transaction",type:"number"},{name:"Item",type:"string"},{name:"Value",type:"number"},{name:"Country",type:"string"}],returnVal;returnVal=greater("Value",1).fn(dataArr,schemaArr).generatorFn();expect(returnVal.length).toBe(4);returnVal=greater("Value",0).fn(dataArr,schemaArr).generatorFn();expect(returnVal.length).toBe(5)}))}));describe("indexColGreaterEquals operation",(function(){it("indexColGreaterEquals 18 - should return 2 elements",(function(){var returnVal=indexColGreaterEquals(1,18),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(4)}));it("indexColGreaterEquals 16 - should return all values greaterEquals than 16",(function(){var returnVal=indexColGreaterEquals(1,16),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(8)}));it("indexColGreaterEquals 10 - should return all elements",(function(){var returnVal=indexColGreaterEquals(1,10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(10)}))}));describe("greaterEquals operation",(function(){it("greaterEquals 318 - should return 4 elements",(function(){var returnVal=greaterEquals("Displacement",318),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(4)}));it("greaterEquals 400 - should return all values greaterEquals than 400",(function(){var returnVal=greaterEquals("Displacement",400),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn();expect(returnArr.length).toBe(0)}));it("greaterEquals 10 - should return all elements",(function(){var returnVal=greaterEquals("Displacement",10),returnFn=returnVal.fn(data,schema),returnArr=returnFn.generatorFn?returnFn.generatorFn():returnFn.data;expect(returnArr.length).toBe(10)}));it("greaterEquals with wrong argument",(function(){var returnVal=between("Wrong_Name",16,17);expect((function(){returnVal.fn(data5rows,schema)})).toThrowError()}));it("null and undefined values should be ignored",(function(){var dataArr=[["2016-10-30 09:58:11",1,"Bread",-10,"India"],["2016-10-30 09:59:11",1,"Bread",null,"India"],["2016-10-30 10:03:34",2,"Scandinavian",27.13,"India"],["2016-10-30 10:04:34",2,"Scandinavian",null,"India"],["2016-10-30 10:05:44",2,"Scandinavian",0,"India"],["2016-10-30 10:07:57",3,"Hot chocolate",0,"India"],["2016-10-30 10:08:57",3,"Hot chocolate",12,"Srilanka"],["2016-10-30 10:09:37",3,"Hot chocolate",null,"Srilanka"],["2016-10-30 10:09:57",1,"Bread",0,"Srilanka"],["2016-10-30 10:10:57",3,"Bread",110,"Srilanka"],["2016-10-30 10:10:59",2,"Scandinavian",4.15,"Srilanka"],["2016-10-30 10:10:59",3,"Bread",1,"Srilanka"]],schemaArr=[{name:"Time",type:"date",format:"%Y-%m-%d %H:%M:%S"},{name:"Transaction",type:"number"},{name:"Item",type:"string"},{name:"Value",type:"number"},{name:"Country",type:"string"}],returnVal;returnVal=greaterEquals("Value",1).fn(dataArr,schemaArr).generatorFn();expect(returnVal.length).toBe(5);returnVal=greaterEquals("Value",0).fn(dataArr,schemaArr).generatorFn();expect(returnVal.length).toBe(8)}))}));