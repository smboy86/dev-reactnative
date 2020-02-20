import DataTable from"./datatable.js";import{addHandler,triggerEvent,removeHandler}from"./utils/event-handler.js";import{parseAndIndexData,createTableID,buildDateColumnsFormatter,parseData,indexData}from"./utils/datatable-utils.js";var DataStore=function(){function DataStore(data,schema,config){this.dataTables={};this._defaultDataTable=null;this._id=+new Date+"";if(data&&schema&&data.constructor===Array&&schema.constructor===Array){this.createDataTable(data,schema,config)}}var _proto=DataStore.prototype;_proto.createDataTable=function createDataTable(data,schema,config,_id){if(!data||!schema){throw new Error("Both data and schema must be provided to build DataTable")}if(data.constructor!==Array){throw new Error("Data must be provided in 2D array format or array of json objects")}if(schema.constructor!==Array||schema.length===0){throw new Error("Input schema is not in a correct format - schema must be an array of column configurations")}var configObj={},dataTable,tableIdArr,id=_id;tableIdArr=Object.keys(this.dataTables);if(id){if(tableIdArr.includes(id)){throw new Error("A table with the id "+id+" already exists in the DataStore. Please use a different id.")}}else{id=createTableID(tableIdArr)}Object.assign(configObj,{enableIndex:true,enableUTC:false},config);dataTable=new DataTable(this,parseAndIndexData(data,schema,configObj),schema,configObj,null,null,id);if(tableIdArr.length===0){this._defaultDataTable=dataTable}this.dataTables[id]=dataTable;return dataTable};_proto.appendRows=function appendRows(rows,id){var _dataTable$_data;var dataTable=this.getDataTable(id),schema=dataTable.getSchema(),parsedRows,dateColumnsAndFormatter;dateColumnsAndFormatter=buildDateColumnsFormatter(schema);parsedRows=parseData(rows,schema,dateColumnsAndFormatter);(_dataTable$_data=dataTable._data).push.apply(_dataTable$_data,parsedRows);indexData(dataTable._data,schema,dataTable._config,dateColumnsAndFormatter);dataTable.flushResults();this.trigger("itemsAdded",{rows:rows,parsedRows:parsedRows,tableID:id})};_proto.deleteRows=function deleteRows(operations,tableID){var table=this.getDataTable(tableID),queryTable=table.query(operations),_queryTable$getData=queryTable.getData(),rows=_queryTable$getData.data,tableRowID=table.indexOf("_row_id"),queryTableRowID=queryTable.indexOf("_row_id"),deletedRowIds=rows.map((function(row){return row[queryTableRowID]}));table._data=table._data.filter((function(row){return!deletedRowIds.includes(row[tableRowID])}));table.flushResults();this.trigger("itemsRemoved",{rows:rows,tableID:tableID});queryTable.dispose()};_proto.getDataTable=function getDataTable(id){if(id){if(!this.dataTables[id]){throw new Error("DataTable with id "+id+" is not found in the DataStore.")}return this.dataTables[id]}return this._defaultDataTable};_proto.on=function on(eventName,handlers){addHandler(eventName,handlers,this)};_proto.off=function off(eventName,handlers){removeHandler(eventName,handlers,this)};_proto.trigger=function trigger(eventName,data){triggerEvent(eventName,this,data)};_proto.dispose=function dispose(){var instance=this;for(var tableId in instance.dataTables){if(instance.dataTables.hasOwnProperty(tableId)){instance.dataTables[tableId].dispose();delete instance.dataTables[tableId]}}delete instance._id;delete instance.dataTables;delete instance._defaultDataTable;this.trigger("disposed");instance=null};_proto._propagate=function _propagate(payload){var instance=this;this.trigger("payloadReceived",payload);for(var tableId in instance.dataTables){if(instance.dataTables.hasOwnProperty(tableId)){instance.dataTables[tableId]._payloadReceiver(payload)}}};return DataStore}();export{DataStore as default};