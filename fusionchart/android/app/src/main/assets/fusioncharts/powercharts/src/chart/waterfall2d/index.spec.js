import FusionCharts from"../../../../fusioncharts/core";import chartType from"./index";import chartValidator from"../../../../../smoke-test/test-sanity/waterfall2d.sanity";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,getSVG,initDimensions,resizeDimensions,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";import{extend2}from"../../../../fc-core/src/lib/";import CommonTests from"../../../../../smoke-test/test-sanity/common.sanity";import*as chartData from"../../../../../smoke-test/test-data/data-by-chart";FusionCharts.addDep(chartType);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:CONTAINER_ID,width:initDimensions.width,height:initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:CONTAINER_ID};CommonTests.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=chartValidator.BASIC.newChart,updateData=chartValidator.BASIC.updateChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<resizeDimensions.length;index++){itResize(resizeDimensions[index])}}));describe("Chart EI testing: "+chartType.getName(),(function(){var chart,chartObj,eiMethods,renderData=chartValidator.EI.newChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=getSVG(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in chartValidator.EI.methods){if(chartValidator.EI.methods.hasOwnProperty(key)){eiMethods(chartValidator.EI.methods[key])}}}));describe("Text outline testing "+chartName,(function(){var chart,chartObj,itResize,renderData={chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",textoutline:"1",showvalues:"1",animation:"1"},data:[{label:"Jan",value:"420000"},{label:"Feb",value:"910000"},{label:"Mar",value:"720000"}]},updateDataWithNoOutline={chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",showvalues:"1",animation:"1"},data:[{label:"Jan",value:"420000"},{label:"Feb",value:"910000"},{label:"Mar",value:"720000"}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Text outline should get applied",(function(done){var renderComplete=function renderComplete(){var labelElement=document.querySelector('[class$="label-group fusioncharts-datalabels"]').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).not.toBe(null);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Text outline should be removed",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setJSONData(updateDataWithNoOutline)}else{var labelElement=document.querySelector('[class$="label-group fusioncharts-datalabels"]').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).toBe(null);done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("valueFontColor, valueBgColor, valueBorderColor",(function(){var chartObj;afterEach((function(){return chartObj.dispose()}));it("Without valueFontColor, valueBgColor and valueBorderColor, chart should render normally",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",numberprefix:"$",showvalues:"1",animation:"0"},data:[{label:"Jan",value:"420000"},{label:"Feb",value:"910000"}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(0);expect(texts.length).toBe(3);expect(texts[0].getAttribute("fill")).toBe("#555555");expect(texts[1].getAttribute("fill")).toBe("#555555");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from data level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",numberprefix:"$",showvalues:"1",animation:"0"},data:[{label:"Jan",value:"420000",valuefontcolor:"ff0000",valuebgcolor:"fff000",valuebordercolor:"0000ff"},{label:"Feb",value:"910000"}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(1);expect(texts.length).toBe(3);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#0000ff");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#555555");expect(texts[2].getAttribute("fill")).toBe("#555555");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor at data level should overwrite the same configurations at chart level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",numberprefix:"$",showvalues:"1",valuefontcolor:"00ff00",valuebordercolor:"ff0000",valuebgcolor:"ffffff",animation:"0"},data:[{label:"Jan",value:"420000",valuefontcolor:"ff0000",valuebgcolor:"fff000",valuebordercolor:"0000ff"},{label:"Feb",value:"910000"}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(3);expect(texts.length).toBe(3);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#0000ff");expect(rects[1].getAttribute("fill")).toBe("#ffffff");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(rects[2].getAttribute("fill")).toBe("#ffffff");expect(rects[2].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#00ff00");expect(texts[2].getAttribute("fill")).toBe("#00ff00");done()}));chartObj.render()}))}));