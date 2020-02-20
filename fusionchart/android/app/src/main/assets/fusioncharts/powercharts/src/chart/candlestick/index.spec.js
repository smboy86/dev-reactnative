import FusionCharts from"../../../../fusioncharts/core";import chartType from"./index";import chartValidator from"../../../../../smoke-test/test-sanity/candlestick.sanity";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,getSVG,initDimensions,resizeDimensions,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";import{extend2}from"../../../../fc-core/src/lib/";import CommonTests from"../../../../../smoke-test/test-sanity/common.sanity";import*as chartData from"../../../../../smoke-test/test-data/data-by-chart";FusionCharts.addDep(chartType);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:CONTAINER_ID,width:initDimensions.width,height:initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:CONTAINER_ID};CommonTests.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=chartValidator.BASIC.newChart,updateData=chartValidator.BASIC.updateChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<resizeDimensions.length;index++){itResize(resizeDimensions[index])}}));describe("Chart EI testing: "+chartType.getName(),(function(){var chart,chartObj,eiMethods,renderData=chartValidator.EI.newChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=getSVG(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in chartValidator.EI.methods){if(chartValidator.EI.methods.hasOwnProperty(key)){eiMethods(chartValidator.EI.methods[key])}}}));describe("Axis position testing",(function(){var chartObj,data={chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",animation:"0",yAxisPosition:"left",xaxisposition:"top"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",volume:"17856350"},{open:"24.36",high:"24.58",low:"24.18",close:"24.41",x:"2",volume:"3599252"},{open:"24.63",high:"24.66",low:"24.11",close:"24.95",x:"3",volume:"74685351"},{open:"24.53",high:"24.84",low:"24.01",close:"24.95",x:"4",volume:"49236987"},{open:"24.84",high:"24.94",low:"24.56",close:"24.93",x:"5",volume:"18247006"},{open:"24.96",high:"25.03",low:"24.58",close:"24.89",x:"6",volume:"67419690"},{open:"25.25",high:"25.46",low:"25.11",close:"25.13",x:"7",volume:"95517555"},{open:"25.27",high:"25.37",low:"25.0999",close:"25.18",x:"8",volume:"83656552"},{open:"25.33",high:"25.43",low:"25.06",close:"25.16",x:"9",volume:"42177624"},{open:"25.38",high:"25.51",low:"25.23",close:"25.38",x:"10",volume:"40668662"},{open:"25.2",high:"25.78",low:"25.07",close:"25.09",x:"11",volume:"78602232"},{open:"25.66",high:"25.8",low:"25.35",close:"25.37",x:"12",volume:"10338104"},{open:"25.77",high:"25.97",low:"25.54",close:"25.72",x:"13",volume:"38067037"},{open:"26.31",high:"26.35",low:"25.81",close:"25.83",x:"14",volume:"52104215"},{open:"26.23",high:"26.6",low:"26.2",close:"26.35",x:"15",volume:"46274157"}]}],trendset:[{name:"Simple Moving Average",color:"0099FF",thickness:"0.5",alpha:"100",includeinlegend:"1",data:[{x:"1",value:"24.6"},{x:"2",value:"24.69"},{x:"3",value:"24.89"},{x:"4",value:"24.92"},{x:"5",value:"25.2"},{x:"6",value:"25.1"},{x:"7",value:"25.17"},{x:"8",value:"25.2"},{x:"9",value:"25.2"},{x:"10",value:"25.31"},{x:"11",value:"25.28"},{x:"12",value:"25.52"},{x:"13",value:"25.7"},{x:"14",value:"25.9"},{x:"15",value:"26"}]}],trendlines:[{line:[{startvalue:"24.2",color:"0372AB",displayvalue:"S1",thickness:"0.5",dashed:"1",dashlen:"2",dashgap:"2"},{startvalue:"23.35",color:"0372AB",displayvalue:"S2",thickness:"0.5",dashed:"1",dashlen:"2",dashgap:"2"},{startvalue:"28.2",color:"0372AB",displayvalue:"R2",thickness:"0.5",dashed:"1",dashlen:"2",dashgap:"2"},{startvalue:"27.65",color:"0372AB",displayvalue:"R1",thickness:"0.5",dashed:"1",dashlen:"2",dashgap:"2"}]}],vtrendlines:[{line:[{startvalue:"10",endvalue:"13",color:"FF5904",displayvalue:"Results Impact",istrendzone:"1",alpha:"10"}]}]},chart={type:chartID,renderAt:CONTAINER_ID,width:600,height:400,dataFormat:"json",dataSource:data};beforeAll((function(){chartObj=setup(FusionCharts,chart)}));afterAll((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("yAxis will be rendered on left",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("yAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[0],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(551);expect(dim.opposite).toBe(53);expect(label.getAttribute("x")).toBe("49");done()}));chartObj.render()}));it("yAxis will be updated to render on left",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("yAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[0],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(49);expect(dim.opposite).toBe(547);expect(label.getAttribute("x")).toBe("551");done()}));data.chart.yaxisposition=undefined;chartObj.setJSONData(data)}));it("xAxis will be rendered on top",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("xAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[2],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.y).toBe(56.6);expect(dim.opposite).toBe(274.6);expect(label.getAttribute("y")).toBe("50");done()}));chartObj.setJSONData(data)}));it("xAxis will be updated to render on bottom",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("xAxis")[0].getAxisDimension(),yAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[2],label=yAxisLabelsGroup.getElementsByTagName("text")[0];expect(dim.y).toBe(258.6);expect(dim.opposite).toBe(40.6);expect(label.getAttribute("y")).toBe("272");done()}));data.chart.xaxisposition=undefined;chartObj.setJSONData(data)}))}));describe("valueFontColor, valueBgColor, valueBorderColor",(function(){var chartObj;afterEach((function(){return chartObj.dispose()}));it("Without valueFontColor, valueBgColor and valueBorderColor, chart should render normally",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(0);expect(texts.length).toBe(2);expect(texts[0].getAttribute("fill")).toBe("#025b6a");expect(texts[1].getAttribute("fill")).toBe("#025b6a");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#ff0000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#0000ff");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from data level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(1);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#0000ff");expect(texts[1].getAttribute("fill")).toBe("#025b6a");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor at data level should overwrite same attributes from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"ff0000",valuebgcolor:"ffffff",valuebordercolor:"000000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#ffffff");expect(rects[0].getAttribute("stroke")).toBe("#000000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor at data level should overwrite same attributes from chart level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"ff0000",valuebgcolor:"ffffff",valuebordercolor:"000000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#ffffff");expect(rects[0].getAttribute("stroke")).toBe("#000000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}));it("Without valueFontColor, valueBgColor and valueBorderColor, chart should render normally",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",plotpriceas:"line",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(0);expect(texts.length).toBe(2);expect(texts[0].getAttribute("fill")).toBe("#025b6a");expect(texts[1].getAttribute("fill")).toBe("#025b6a");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",plotpriceas:"line",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#ff0000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#0000ff");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from data level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",plotpriceas:"line",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(1);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#fff000");expect(rects[0].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#0000ff");expect(texts[1].getAttribute("fill")).toBe("#025b6a");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor at data level should overwrite same attributes from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",plotpriceas:"line",volumeheightpercent:"20",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{valuefontcolor:"0000ff",valuebgcolor:"fff000",valuebordercolor:"ff0000",data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"ff0000",valuebgcolor:"ffffff",valuebordercolor:"000000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#ffffff");expect(rects[0].getAttribute("stroke")).toBe("#000000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor at data level should overwrite same attributes from chart level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{numpdivlines:"5",caption:"XYZ - 3 Months",numberprefix:"$",bearbordercolor:"E33C3C",bearfillcolor:"E33C3C",bullbordercolor:"1F3165",pyaxisname:"Price",vyaxisname:"Volume (In Millions)",volumeheightpercent:"20",valuefontcolor:"0000ff",valuebgcolor:"fff000",plotpriceas:"line",valuebordercolor:"ff0000",animation:"1"},categories:[{category:[{label:"2006",x:"1",showline:"1"}]}],dataset:[{data:[{open:"24.6",high:"25.24",low:"24.58",close:"25.19",x:"1",valuefontcolor:"ff0000",valuebgcolor:"ffffff",valuebordercolor:"000000",displayvalue:"One",volume:"17856350"},{close:"24.36",low:"24.58",high:"24.18",open:"24.41",x:"2",displayvalue:"Two",volume:"3599252"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroup=document.querySelectorAll('[class$="fusioncharts-datalabels"]')[1],rects=dataLabelGroup.getElementsByTagName("rect"),texts=dataLabelGroup.getElementsByTagName("text");expect(rects.length).toBe(2);expect(texts.length).toBe(2);expect(rects[0].getAttribute("fill")).toBe("#ffffff");expect(rects[0].getAttribute("stroke")).toBe("#000000");expect(rects[1].getAttribute("fill")).toBe("#fff000");expect(rects[1].getAttribute("stroke")).toBe("#ff0000");expect(texts[0].getAttribute("fill")).toBe("#ff0000");expect(texts[1].getAttribute("fill")).toBe("#0000ff");done()}));chartObj.render()}))}));