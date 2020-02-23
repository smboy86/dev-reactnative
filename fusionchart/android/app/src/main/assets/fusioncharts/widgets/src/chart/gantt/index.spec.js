import FusionCharts from"../../../../fusioncharts/core";import chartType from"./index";import chartValidator from"../../../../../smoke-test/test-sanity/gantt.sanity";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,getSVG,initDimensions,resizeDimensions,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";import{extend2}from"../../../../fc-core/src/lib/";import CommonTests from"../../../../../smoke-test/test-sanity/common.sanity";import*as chartData from"../../../../../smoke-test/test-data/data-by-chart";FusionCharts.addDep(chartType);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:CONTAINER_ID,width:initDimensions.width,height:initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:CONTAINER_ID};CommonTests.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=chartValidator.BASIC.newChart,updateData=chartValidator.BASIC.updateChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<resizeDimensions.length;index++){itResize(resizeDimensions[index])}}));describe("Chart EI testing: "+chartType.getName(),(function(){var chart,chartObj,eiMethods,renderData=chartValidator.EI.newChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=getSVG(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in chartValidator.EI.methods){if(chartValidator.EI.methods.hasOwnProperty(key)){eiMethods(chartValidator.EI.methods[key])}}}));describe("Text outline testing "+chartName,(function(){var chart,chartObj,itResize,renderData={chart:{dateformat:"mm/dd/yyyy",outputdateformat:"hh:mn",caption:"Work Schedule",subcaption:"For next 2 days",textoutline:"1",showborder:"0"},categories:[{category:[{start:"7/15/2007 00:00:00",end:"7/15/2007 23:59:59",label:"Today"},{start:"7/16/2007 00:00:00",end:"7/16/2007 23:59:59",label:"Tomorrow"}]},{align:"right",category:[{start:"7/15/2007 00:00:00",end:"7/15/2007 05:59:59",label:"6 am"},{start:"7/15/2007 06:00:00",end:"7/15/2007 11:59:59",label:"12 pm"},{start:"7/15/2007 12:00:00",end:"7/15/2007 17:59:59",label:"6 pm"}]}],processes:{process:[{label:"John.S",id:"EMP121"},{label:"David.G",id:"EMP122"},{label:"Mary.P",id:"EMP123"}]},tasks:[{showlabels:"1",showstartdate:"1",task:[{processid:"EMP121",start:"7/15/2007 08:00:00",end:"7/15/2007 12:30:00",label:"Logo A"},{processid:"EMP121",start:"7/15/2007 17:00:00",end:"7/15/2007 19:30:00",label:"Logo B"},{processid:"EMP121",start:"7/16/2007 09:00:00",end:"7/16/2007 19:30:00",label:"Website template"}]}]},updateDataWithNoOutline={chart:{dateformat:"mm/dd/yyyy",outputdateformat:"hh:mn",caption:"Work Schedule",subcaption:"For next 2 days",showborder:"0"},categories:[{category:[{start:"7/15/2007 00:00:00",end:"7/15/2007 23:59:59",label:"Today"},{start:"7/16/2007 00:00:00",end:"7/16/2007 23:59:59",label:"Tomorrow"}]},{align:"right",category:[{start:"7/15/2007 00:00:00",end:"7/15/2007 05:59:59",label:"6 am"},{start:"7/15/2007 06:00:00",end:"7/15/2007 11:59:59",label:"12 pm"},{start:"7/15/2007 12:00:00",end:"7/15/2007 17:59:59",label:"6 pm"}]}],processes:{process:[{label:"John.S",id:"EMP121"},{label:"David.G",id:"EMP122"},{label:"Mary.P",id:"EMP123"}]},tasks:[{showlabels:"1",showstartdate:"1",task:[{processid:"EMP121",start:"7/15/2007 08:00:00",end:"7/15/2007 12:30:00",label:"Logo A"},{processid:"EMP121",start:"7/15/2007 17:00:00",end:"7/15/2007 19:30:00",label:"Logo B"},{processid:"EMP121",start:"7/16/2007 09:00:00",end:"7/16/2007 19:30:00",label:"Website template"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Text outline should get applied",(function(done){var renderComplete=function renderComplete(){var labelElement=document.querySelector('[class$="datalabel').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).not.toBe(null);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Text outline should be removed",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setJSONData(updateDataWithNoOutline)}else{var labelElement=document.querySelector('[class$="datalabel').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).toBe(null);done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));