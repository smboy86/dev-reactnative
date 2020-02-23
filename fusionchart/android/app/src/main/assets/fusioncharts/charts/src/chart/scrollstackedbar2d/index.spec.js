import FusionCharts from"../../../../fusioncharts/core";import chartType from"./index";import chartValidator from"../../../../../smoke-test/test-sanity/scrollstackedbar2d.sanity";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,getSVG,initDimensions,resizeDimensions,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";import{extend2}from"../../../../fc-core/src/lib/";import CommonTests from"../../../../../smoke-test/test-sanity/common.sanity";import*as chartData from"../../../../../smoke-test/test-data/data-by-chart";FusionCharts.addDep(chartType);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:CONTAINER_ID,width:initDimensions.width,height:initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:CONTAINER_ID};CommonTests.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=chartValidator.BASIC.newChart,updateData=chartValidator.BASIC.updateChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<resizeDimensions.length;index++){itResize(resizeDimensions[index])}}));describe("Chart EI testing: "+chartType.getName(),(function(){var chart,chartObj,eiMethods,renderData=chartValidator.EI.newChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=getSVG(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in chartValidator.EI.methods){if(chartValidator.EI.methods.hasOwnProperty(key)){eiMethods(chartValidator.EI.methods[key])}}}));describe("Axis position testing",(function(){var chartObj,data={chart:{caption:"Company Revenue",xaxisname:"Month",yaxisname:"Revenue",showvalues:"0",numberprefix:"$",useroundedges:"1",animation:"1",xaxisposition:"top",stack100percent:"1",showsum:"1"},categories:[{category:[{label:"Jan"},{label:"Feb"},{label:"Mar"},{label:"Apr"},{label:"May"},{label:"Jun"},{label:"Jul"},{label:"Aug"},{label:"Sep"},{label:"Oct"},{label:"Nov"},{label:"Dec"}]}],dataset:[{seriesname:"Product A",data:[{value:"27400"},{value:"29800"},{value:"25800"},{value:"26800"},{value:"29600"},{value:"32600"},{value:"31800"},{value:"36700"},{value:"29700"},{value:"31900"},{value:"34800"},{value:"24800"}]},{seriesname:"Product B",data:[{value:"10000"},{value:"11500"},{value:"12500"},{value:"15000"},{value:"11000"},{value:"9800"},{value:"11800"},{value:"19700"},{value:"21700"},{value:"21900"},{value:"22900"},{value:"20800"}]}],trendlines:[{line:[{startvalue:"42000",color:"91C728",displayvalue:"Target",showontop:"1"}]}]},chart={type:chartID,renderAt:CONTAINER_ID,width:600,height:400,dataFormat:"json",dataSource:data};beforeAll((function(){chartObj=setup(FusionCharts,chart)}));afterAll((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("xAxis will be rendered on top",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("xAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.y).toBe(41.6);expect(dim.opposite).toBe(596);expect(label.getAttribute("y")).toBe("72");done()}));chartObj.render()}));it("xAxis will be updated to render on bottom",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("xAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.y).toBe(41.6);expect(dim.opposite).toBe(596);expect(label.getAttribute("y")).toBe("72");done()}));data.chart.xaxisposition=undefined;chartObj.setJSONData(data)}))}));