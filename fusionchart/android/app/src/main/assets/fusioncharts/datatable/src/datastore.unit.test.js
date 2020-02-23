import _extends from"@babel/runtime/helpers/extends";import DataStore from"./datastore";import DataTable from"./datatable";import{schema,data5rows,carsData}from"../sample/data/cars";import{indexColBetween}from"./operators";var data=data5rows,validDataStore=new DataStore(data,schema),validMultiTableDS=new DataStore,table1,table2,table3,table4,changedConfigDT,indexedConfigDT,uncleanDataDt,uncleanData,jsonDT;table1=validMultiTableDS.createDataTable(data5rows,schema);table2=validMultiTableDS.createDataTable(data5rows,schema,{enableIndex:true,indexBy:"Acceleration"});table3=validMultiTableDS.createDataTable(carsData,schema,{enableIndex:true,indexBy:"Origin"});table4=validMultiTableDS.createDataTable(carsData,schema,{enableIndex:false},"carsTable");describe("DataStore constructor",(function(){it("FDT_TC_005 - without config - enableIndex should be true",(function(){expect(validDataStore.dataTables["table-1"]._config.enableIndex).toBe(true)}));it("FDT_TC_005 - without config - enableUTC should be false",(function(){expect(validDataStore.dataTables["table-1"]._config.enableUTC).toBe(false)}));var invalidDataStore=new DataStore([],schema);it("FDT_TC_003 - blank input but valid schema",(function(){expect(invalidDataStore.dataTables["table-1"]._data.length).toBe(0)}));it("FDT_TC_004 - constructor with no arguments",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable()})).toThrow(Error)}));it("FDT_TC_006_1 - constructor with wrong arguments",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(schema,{enableIndex:true})})).toThrow(Error)}));it("FDT_TC_006_2 - constructor with wrong arguments",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(data)})).toThrow(Error)}));it("FDT_TC_006_3 - constructor with wrong arguments",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(schema)})).toThrow(Error)}));it("FDT_TC_006_4 - constructor with wrong arguments",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(data,{column:"Name"})})).toThrow(Error)}));it("Constructor with zero element schema - should throw error",(function(){expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(data,[])})).toThrow(Error)}));it("Constructor where schema has a column with no name - should throw error",(function(){var newSchema=_extends({},{type:"number"},{},schema);expect((function(){invalidDataStore=new DataStore;invalidDataStore.createDataTable(data,newSchema)})).toThrow(Error)}));it("Schema has more element than data - last columns should be null",(function(){var newSchema=schema.slice(0),dataStore;newSchema.push({name:"invalid_column",type:"number"});newSchema.push({name:"invalid_column2",type:"date"});newSchema.push({name:"invalid_column3"});dataStore=new DataStore(data,newSchema,{enableIndex:false});expect(dataStore.dataTables["table-1"]._data[0][newSchema.length-1]).toBeUndefined();expect(dataStore.dataTables["table-1"]._data[0][newSchema.length-2]).toBeUndefined();expect(dataStore.dataTables["table-1"]._data[0][newSchema.length-3]).toBeUndefined()}));it("Schema has fewer elements than data columns - last columns should be discarded",(function(){var newSchema=schema.slice(0),dataStore;newSchema.splice(7);dataStore=new DataStore(data,newSchema,{enableIndex:false});expect(dataStore.dataTables["table-1"]._data[0].length).toBe(7);expect(dataStore.dataTables["table-1"]._data[0][dataStore.dataTables["table-1"]._data[0].length-1]).toBe(12)}));uncleanData=data.slice(0);uncleanData.push(["ford torino","26","","311","0",3449,10.5,"1970-01-01","USA"]);uncleanDataDt=new DataStore(uncleanData,schema);it("parses string as number",(function(){expect(uncleanDataDt.dataTables["table-1"]._data[uncleanDataDt.dataTables["table-1"]._data.length-1][1]).toBe(26);expect(uncleanDataDt.dataTables["table-1"]._data[uncleanDataDt.dataTables["table-1"]._data.length-1][3]).toBe(311);expect(uncleanDataDt.dataTables["table-1"]._data[uncleanDataDt.dataTables["table-1"]._data.length-1][4]).toBe(0)}));changedConfigDT=new DataStore(data,schema,{enableIndex:false,enableUTC:true});it("Custom config - enableIndex should be false",(function(){expect(changedConfigDT.dataTables["table-1"]._config.enableIndex).toBe(false)}));it("Custom config - enableUTC should be true",(function(){expect(changedConfigDT.dataTables["table-1"]._config.enableUTC).toBe(true)}));indexedConfigDT=new DataStore(data,schema,{enableIndex:true,indexBy:"Weight_in_lbs"});it("Check if data is porperly sorted when index by is provided",(function(){expect(indexedConfigDT.dataTables["table-1"]._data[0][0]).toBe("amc rebel sst")}));it("Check if original data is unaffected when index by is provided",(function(){expect(data[0][0]).toBe("chevrolet chevelle malibu")}));jsonDT=new DataStore(carsData,schema,{enableIndex:false});it("parses the JSON data",(function(){expect(jsonDT.dataTables["table-1"]._data.length).toBe(406);expect(jsonDT.dataTables["table-1"]._data[0][0]).toBe("chevrolet chevelle malibu");expect(jsonDT.dataTables["table-1"]._data[jsonDT.dataTables["table-1"]._data.length-1][0]).toBe("chevy s-10")}))}));describe("DataStore API - createDataTable",(function(){it("Retruns DataTable object",(function(){expect(table1.constructor).toBe(DataTable)}));it("Adds data correctly",(function(){expect(table1._data[0][0]).toBe("chevrolet chevelle malibu")}));it("Can add same data twice with different sorting",(function(){expect(table1._data[0][0]).toBe("chevrolet chevelle malibu");expect(table2._data[0][0]).toBe("ford torino")}));it("Can add a data table without any sorting",(function(){expect(table4._data[0][0]).toBe("chevrolet chevelle malibu")}));it("Index the table properly",(function(){expect(table3._data[0][8]).toBe("Europe");expect(table3._data[0][0]).toBe("citroen ds-21 pallas")}));it("DataStore can have multiple data table",(function(){expect(Object.keys(validMultiTableDS.dataTables).length).toBe(4)}));it("DataStore generates the ids automatically and takes the correct id when provided",(function(){expect(Object.keys(validMultiTableDS.dataTables)).toEqual(["table-1","table-2","table-3","carsTable"])}))}));describe("DataStore API - getDataTable",(function(){var dataTable=validDataStore.getDataTable();it("Type of getDataTable - should be DataTable",(function(){expect(dataTable).toBeInstanceOf(DataTable)}));it("Default view data is same as the data provided in dataStore",(function(){expect(dataTable._data[0][0]).toBe(data[0][0])}))}));jest.useFakeTimers();describe("DataStore API - on",(function(){it("FDT_TC_031 - handler is bound to an event through on",(function(){var fnRunFlag=false,dummyFn=function dummyFn(){fnRunFlag=true};validDataStore.on("FDT_TC_031",dummyFn);setTimeout((function(){validDataStore.trigger("FDT_TC_031")}),200);jest.advanceTimersByTime(200);expect(fnRunFlag).toBe(true)}));it("FDT_TC_031 - multiple handlers are bound to an event through on",(function(){var fn1RunFlag=false,fn2RunFlag=false,dummyFn1=function dummyFn1(){fn1RunFlag=true},dummyFn2=function dummyFn2(){fn2RunFlag=true};validDataStore.on("FDT_TC_031",[dummyFn1,dummyFn2]);setTimeout((function(){validDataStore.trigger("FDT_TC_031")}),200);jest.advanceTimersByTime(200);expect(fn1RunFlag).toBe(true);expect(fn2RunFlag).toBe(true)}));it("FDT_TC_033 - multiple handlers bound to an event execute in order",(function(){var arrFlag=[],dummyFn1=function dummyFn1(){arrFlag.push("dummyFn1")},dummyFn2=function dummyFn2(){arrFlag.push("dummyFn2")};validDataStore.on("FDT_TC_033",[dummyFn1,dummyFn2]);setTimeout((function(){validDataStore.trigger("FDT_TC_033")}),200);jest.advanceTimersByTime(200);expect(arrFlag.length).toBe(2);expect(arrFlag).toEqual(["dummyFn1","dummyFn2"])}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true};expect((function(){validDataStore.on("",dummyFn)})).toThrow();expect((function(){validDataStore.on(dummyFn)})).toThrow()}));it("FDT_TC_035 - empty handler throws error",(function(){expect((function(){validDataStore.on("FDT_TC_035")})).toThrow()}))}));describe("DataStore API - off",(function(){it("FDT_TC_036 - only given handler is removed",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("FDT_TC_036",[dummyFn1,dummyFn2]);setTimeout((function(){validDataStore.trigger("FDT_TC_036")}),200);jest.advanceTimersByTime(200);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);setTimeout((function(){validDataStore.off("FDT_TC_036",dummyFn1)}),300);setTimeout((function(){validDataStore.trigger("FDT_TC_036")}),400);jest.advanceTimersByTime(400);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(2)}));it("multiple handlers can be removed by providing an array",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("FDT_TC_031x",[dummyFn1,dummyFn2]);setTimeout((function(){validDataStore.trigger("FDT_TC_031x")}),200);jest.advanceTimersByTime(200);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);setTimeout((function(){validDataStore.off("FDT_TC_031x",[dummyFn1,dummyFn2])}),300);setTimeout((function(){validDataStore.trigger("FDT_TC_031x")}),400);jest.advanceTimersByTime(400);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_038 - missing handler removes all from event",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("FDT_TC_038",[dummyFn1,dummyFn2]);setTimeout((function(){validDataStore.trigger("FDT_TC_038")}),200);jest.advanceTimersByTime(200);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);setTimeout((function(){validDataStore.off("FDT_TC_038")}),300);setTimeout((function(){validDataStore.trigger("FDT_TC_038")}),400);jest.advanceTimersByTime(400);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true};expect((function(){validDataStore.off("",dummyFn)})).toThrow();expect((function(){validDataStore.off(dummyFn)})).toThrow()}))}));describe("DataStore API - trigger",(function(){it("FDT_TC_040 - empty eventname throws error",(function(){var dummyFn=function dummyFn(){return true};validDataStore.on("FDT_TC_031",dummyFn);expect((function(){validDataStore.trigger("")})).toThrow();expect((function(){validDataStore.trigger([])})).toThrow()}))}));describe("DataStore API - appendRows",(function(){it("FDT_TC_023 - single, multiple rows can be added",(function(){var newRowsSingle=[["ccm 2",20,10,310,140,3510,20,"1970-01-01","Germany"]],newRowsMultiple=[["ccm 3",30,5,305,135,3505,15,"1970-01-01","USA"],["bs 320 3",20,10,355,160,3690,11,"1970-01-01","USA"]],tableData,toMatchSingle=newRowsSingle.slice(0),toMatchMultiple=newRowsMultiple.slice(0);toMatchSingle[0][7]=0;toMatchMultiple[0][7]=0;toMatchMultiple[1][7]=0;validDataStore.appendRows(newRowsSingle);tableData=validDataStore.getDataTable().getData();expect(tableData.data.length).toEqual(6);expect(tableData.data[tableData.data.length-1]).toEqual(toMatchSingle[0]);validDataStore.appendRows(newRowsMultiple);tableData=validDataStore.getDataTable().getData();expect(tableData.data[tableData.data.length-2]).toEqual(toMatchMultiple[0]);expect(tableData.data[tableData.data.length-1]).toEqual(toMatchMultiple[1])}));it("FDT_TC_025 - more elements in array",(function(){var newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany","more 1","more 2"]],tableData,toMatchSingle=newRows.slice(0);toMatchSingle[0][7]=0;toMatchSingle[0].pop();toMatchSingle[0].pop();validDataStore.appendRows(newRows);tableData=validDataStore.getDataTable().getData();expect(tableData.data[tableData.data.length-1]).toEqual(toMatchSingle[0])}));it("FDT_TC_026 - less elements in array",(function(){var newRows=[["ccm 3",20,10,310,140,3510,20]],tableData,toMatchSingle=newRows.slice(0);toMatchSingle[0][7]=undefined;toMatchSingle[0][8]=undefined;validDataStore.appendRows(newRows);tableData=validDataStore.getDataTable().getData();expect(tableData.data[tableData.data.length-1]).toEqual(toMatchSingle[0])}));it("Child datatables _appendRows should be called",(function(){var newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]],validDataTable=validDataStore.getDataTable(),spy1=jest.spyOn(validDataTable,"_appendRows"),opsDt=validDataTable.query([indexColBetween(1,16,17)]),spy2=jest.spyOn(opsDt,"_appendRows");validDataStore.appendRows(newRows);expect(spy1).toHaveBeenCalled();expect(spy2).toHaveBeenCalled();spy1.mockRestore();spy2.mockRestore()}));it("FDT_TC_045 - _appendRows fires itemsAdded event",(function(){var fnRunFlag=false,dummyFn=function dummyFn(){fnRunFlag=true},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",dummyFn);validDataStore.appendRows(newRows);expect(fnRunFlag).toBe(true)}));describe("FDT_TC_047 - on method with itemsAdded event",(function(){it("FDT_TC_031 - handler is bound to an event through on",(function(){var fnRunFlag=false,dummyFn=function dummyFn(){fnRunFlag=true},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",dummyFn);validDataStore.appendRows(newRows);expect(fnRunFlag).toBe(true)}));it("FDT_TC_031 - multiple handlers are bound to an event through on",(function(){var fn1RunFlag=false,fn2RunFlag=false,dummyFn1=function dummyFn1(){fn1RunFlag=true},dummyFn2=function dummyFn2(){fn2RunFlag=true},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(fn1RunFlag).toBe(true);expect(fn2RunFlag).toBe(true)}));it("FDT_TC_033 - multiple handlers bound to an event execute in order",(function(){var arrFlag=[],dummyFn1=function dummyFn1(){arrFlag.push("dummyFn1")},dummyFn2=function dummyFn2(){arrFlag.push("dummyFn2")},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(arrFlag.length).toBe(2);expect(arrFlag).toEqual(["dummyFn1","dummyFn2"])}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];expect((function(){validDataStore.on("",dummyFn)})).toThrow();expect((function(){validDataStore.on(dummyFn)})).toThrow();validDataStore.appendRows(newRows)}));it("FDT_TC_035 - empty handler throws error",(function(){expect((function(){validDataStore.on("itemsAdded")})).toThrow()}))}));describe("FDT_TC_048 - off method with itemsAdded event",(function(){it("FDT_TC_036 - only given handler is removed",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("itemsAdded",dummyFn1);validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(2)}));it("multiple handlers can be removed by providing an array",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_038 - missing handler removes all from event",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];validDataStore.on("itemsAdded",[dummyFn1,dummyFn2]);validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("itemsAdded");validDataStore.appendRows(newRows);expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true},newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]];expect((function(){validDataStore.off("",dummyFn)})).toThrow();expect((function(){validDataStore.off(dummyFn)})).toThrow();validDataStore.appendRows(newRows)}))}));it("FDT_TC_045 - _appendRows fires itemsAdded event",(function(){var fnRunFlag=false,newRows=[["ccm 3",20,10,310,140,3510,20,"1970-01-01","Germany"]],dummyFn=function dummyFn(eventObj){fnRunFlag=eventObj.data.rows===newRows};validDataStore.on("itemsAdded",dummyFn);validDataStore.appendRows(newRows);expect(fnRunFlag).toBe(true)}))}));describe("DataStore API - dispose",(function(){it("FDT_TC_042, FDT_TC_043 - datastore references and the datastore are removed",(function(){validDataStore=new DataStore(data,schema);expect(validDataStore).toBeDefined();expect(validDataStore.dataTables).toBeDefined();expect(validDataStore._defaultDataTable).toBeDefined();validDataStore.dispose();expect(validDataStore.dataTables).toBeUndefined();expect(validDataStore._defaultDataTable).toBeUndefined();expect(validDataStore).toEqual({})}));it("datatable is removed",(function(){var DT;validDataStore=new DataStore(data,schema);DT=validDataStore.getDataTable();expect(DT).toBeDefined();validDataStore.dispose();expect(DT).toEqual({})}));it("disposed event is triggered",(function(){var fnRunFlag=false,dummyFn=function dummyFn(){fnRunFlag=true};validDataStore=new DataStore(data,schema);validDataStore.on("disposed",dummyFn);validDataStore.dispose();expect(fnRunFlag).toBe(true)}));describe("FDT_TC_052 - on method with disposed event",(function(){it("FDT_TC_031 - handler is bound to an event through on",(function(){var fnRunFlag=false,dummyFn=function dummyFn(){fnRunFlag=true};validDataStore=new DataStore(data,schema);validDataStore.on("disposed",dummyFn);validDataStore.dispose();expect(fnRunFlag).toBe(true)}));it("FDT_TC_031 - multiple handlers are bound to an event through on",(function(){var fn1RunFlag=false,fn2RunFlag=false,dummyFn1=function dummyFn1(){fn1RunFlag=true},dummyFn2=function dummyFn2(){fn2RunFlag=true};validDataStore=new DataStore(data,schema);validDataStore.on("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(fn1RunFlag).toBe(true);expect(fn2RunFlag).toBe(true)}));it("FDT_TC_033 - multiple handlers bound to an event execute in order",(function(){var arrFlag=[],dummyFn1=function dummyFn1(){arrFlag.push("dummyFn1")},dummyFn2=function dummyFn2(){arrFlag.push("dummyFn2")};validDataStore=new DataStore(data,schema);validDataStore.on("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(arrFlag.length).toBe(2);expect(arrFlag).toEqual(["dummyFn1","dummyFn2"])}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true};validDataStore=new DataStore(data,schema);expect((function(){validDataStore.on("",dummyFn)})).toThrow();expect((function(){validDataStore.on(dummyFn)})).toThrow();validDataStore.dispose()}));it("FDT_TC_035 - empty handler throws error",(function(){validDataStore=new DataStore(data,schema);expect((function(){validDataStore.on("disposed")})).toThrow()}))}));describe("FDT_TC_048 - off method with disposed event",(function(){it("FDT_TC_036 - only given handler is removed",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("disposed",dummyFn1);validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(2)}));it("multiple handlers can be removed by providing an array",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_038 - missing handler removes all from event",(function(){var fn1RunCount=0,fn2RunCount=0,dummyFn1=function dummyFn1(){fn1RunCount++},dummyFn2=function dummyFn2(){fn2RunCount++};validDataStore.on("disposed",[dummyFn1,dummyFn2]);validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1);validDataStore.off("disposed");validDataStore.dispose();expect(fn1RunCount).toBe(1);expect(fn2RunCount).toBe(1)}));it("FDT_TC_034 - empty event name throws error",(function(){var dummyFn=function dummyFn(){return true};expect((function(){validDataStore.off("",dummyFn)})).toThrow();expect((function(){validDataStore.off(dummyFn)})).toThrow();validDataStore.dispose()}))}))}));