import FusionCharts from"../../../../fusioncharts/core";import chartType from"./index";import chartValidator from"../../../../../smoke-test/test-sanity/boxandwhisker2d.sanity";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,getSVG,initDimensions,resizeDimensions,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";import{extend2}from"../../../../fc-core/src/lib/";import CommonTests from"../../../../../smoke-test/test-sanity/common.sanity";import*as chartData from"../../../../../smoke-test/test-data/data-by-chart";FusionCharts.addDep(chartType);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:CONTAINER_ID,width:initDimensions.width,height:initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:CONTAINER_ID};CommonTests.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=chartValidator.BASIC.newChart,updateData=chartValidator.BASIC.updateChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<resizeDimensions.length;index++){itResize(resizeDimensions[index])}}));describe("Chart EI testing: "+chartType.getName(),(function(){var chart,chartObj,eiMethods,renderData=chartValidator.EI.newChart;chart={type:chartID,renderAt:CONTAINER_ID};extend2(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=getSVG(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in chartValidator.EI.methods){if(chartValidator.EI.methods.hasOwnProperty(key)){eiMethods(chartValidator.EI.methods[key])}}}));describe("Text outline testing "+chartName,(function(){var chart,chartObj,itResize,renderData={chart:{caption:"Visits to a Website",subcaption:"In three years",textoutline:"1",useroundedges:"1",animation:"0"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]},updateDataWithNoOutline={chart:{caption:"Visits to a Website",subcaption:"In three years",useroundedges:"1",animation:"0"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Text outline should get applied",(function(done){var renderComplete=function renderComplete(){var labelElement=document.querySelector('[class$="label-group fusioncharts-datalabels').getElementsByTagName("text")[2];expect(labelElement.getAttribute("filter")).not.toBe(null);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Text outline should be removed",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setJSONData(updateDataWithNoOutline)}else{var labelElement=document.querySelector('[class$="label-group fusioncharts-datalabels').getElementsByTagName("text")[2];expect(labelElement.getAttribute("filter")).toBe(null);done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("Test explicit stats data attribute",(function(){var chart,chartObj,renderData={chart:{caption:"Visits to a Website",subcaption:"In three years",showmean:"1"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{max:"259",min:"35",q3:"137",q1:"60",median:"89",mean:"98"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]}]},updateData={chart:{caption:"Visits to a Website",subcaption:"In three years",drawmeanconnector:"1",showmean:"1"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{max:"259",min:"35",q3:"137",q1:"60",median:"89",mean:"98"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=chartValidator.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=chartValidator.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("valueFontColor, valueBgColor, valueBorderColor",(function(){var chartObj;afterEach((function(){return chartObj.dispose()}));it("Without valueFontColor, valueBgColor and valueBorderColor, chart should render normally",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{animation:"0"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroups=document.querySelectorAll('[class$="fusioncharts-datalabels"]'),rects,texts,i,j;for(i=0;i<dataLabelGroups.length;i++){if(i===0){continue}rects=dataLabelGroups[i].getElementsByTagName("rect");texts=dataLabelGroups[i].getElementsByTagName("text");expect(rects.length).toBe(0);expect(texts.length).toBe(9);for(j=0;j<texts.length;j++){expect(texts[j].getAttribute("fill")).toBe("#555555")}}done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{animation:"0",valuefontcolor:"000000",valuebgcolor:"ffffff",valuebordercolor:"ff0000"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",valuefontcolor:"00ff00",valuebgcolor:"0000ff",valuebordercolor:"fff000",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroups=document.querySelectorAll('[class$="fusioncharts-datalabels"]'),rects,texts,i,j;var result=[[],[["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"]],[["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"]]];for(i=0;i<dataLabelGroups.length;i++){if(i===0){continue}rects=dataLabelGroups[i].getElementsByTagName("rect");texts=dataLabelGroups[i].getElementsByTagName("text");expect(rects.length).toBe(9);expect(texts.length).toBe(9);for(j=0;j<texts.length;j++){expect(texts[j].getAttribute("fill")).toBe(result[i][j][0]);expect(rects[j].getAttribute("fill")).toBe(result[i][j][1]);expect(rects[j].getAttribute("stroke")).toBe(result[i][j][2])}}done()}));chartObj.render()}));it("valueFontColor, valueBgColor and valueBorderColor should work from data level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{animation:"0",valuefontcolor:"000000",valuebgcolor:"ffffff",valuebordercolor:"ff0000"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",valuefontcolor:"00ff00",valuebgcolor:"0000ff",valuebordercolor:"fff000",data:[{value:"60,133,35,67,89,137,259",valuefontcolor:"ff0000",valuebgcolor:"fff000",valuebordercolor:"0000ff"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var dataLabelGroups=document.querySelectorAll('[class$="fusioncharts-datalabels"]'),rects,texts,i,j;var result=[[],[["#ff0000","#fff000","#0000ff"],["#ff0000","#fff000","#0000ff"],["#ff0000","#fff000","#0000ff"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"],["#00ff00","#0000ff","#fff000"]],[["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"],["#000000","#ffffff","#ff0000"]]];for(i=0;i<dataLabelGroups.length;i++){if(i===0){continue}rects=dataLabelGroups[i].getElementsByTagName("rect");texts=dataLabelGroups[i].getElementsByTagName("text");expect(rects.length).toBe(9);expect(texts.length).toBe(9);for(j=0;j<texts.length;j++){expect(texts[j].getAttribute("fill")).toBe(result[i][j][0]);expect(rects[j].getAttribute("fill")).toBe(result[i][j][1]);expect(rects[j].getAttribute("stroke")).toBe(result[i][j][2])}}done()}));chartObj.render()}))}));describe("Scrollbar testing "+chartName,(function(){var chart,chartObj,renderData={chart:{caption:"Number of yellow cards per match in World Cup - 2010 v 2006",subcaption:"(The chart uses random data for demonstration purposes only)",showvalues:"0",numdivlines:"3"},categories:[{category:[{label:"Brazil"},{label:"Spain"},{label:"Holland"}]}],dataset:[{seriesname:"2010",upperboxcolor:"1D3D64",lowerboxcolor:"3874B0",data:[{value:"1, 3, 4, 1, 5, 6"},{value:"1, 2, 3, 1, 5, 1, 1, 3"},{value:"5, 4, 2, 2, 1, 3, 2, 5"}]},{seriesname:"2006",upperboxcolor:"159CDC",lowerboxcolor:"BEDAE8",data:[{value:"2, 2, 3, 4, 1, 5, 6"},{value:"1, 2, 3, 1, 4"},{value:"1, 3, 4, 1, 2, 4"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("The scrollbar shouldn't appear and all the plots should be visible",(function(done){var renderComplete=function renderComplete(){var scrollContainer=document.querySelector('[class$="-scrollContainer');expect(scrollContainer).toBeNull();done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("The scrollbar should appear and all the plots shouldn't be visible",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setChartAttribute("numvisibleplot",2)}else{var scrollContainer=document.querySelector('[class$="-scrollContainer');expect(scrollContainer).not.toBeNull();done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Scroll events should trigger",(function(done){var scrollStart=false,updateFlag=0;chartObj.addEventListener("renderComplete",(function(){if(!updateFlag){updateFlag=1;chartObj.setChartAttribute("numvisibleplot",2)}else{chartObj.scrollTo(.5)}}));chartObj.addEventListener("scrollStart",(function(){scrollStart=true}));chartObj.addEventListener("scrollEnd",(function(){expect(scrollStart).toBe(true);done()}));chartObj.render()}))}));describe("meaniconbordercolor",(function(){var chartObj;afterEach((function(){return chartObj.dispose()}));it("Without meaniconbordercolor chart should render normally",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{showmean:"1",animation:"0"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var iconGroups=document.querySelectorAll('[class$="-defaultVcanvasGroup-lines"] > [class$="-common-elems-group"]'),paths,i,j;for(i=0;i<iconGroups.length;i++){if(i===0||i===2){continue}paths=iconGroups[i].getElementsByTagName("path");expect(paths.length).toBe(4);for(j=0;j<paths.length;j++){expect(paths[j].getAttribute("stroke")).toBe("#000000")}}done()}));chartObj.render()}));it("meaniconbordercolor should work from dataset level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{animation:"0",showmean:"1",meaniconbordercolor:"ff0000"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",valuefontcolor:"00ff00",valuebgcolor:"0000ff",meaniconbordercolor:"fff000",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var iconGroups=document.querySelectorAll('[class$="-defaultVcanvasGroup-lines"] > [class$="-common-elems-group"]'),paths,i,j;var result=[[],["#fff000","#fff000","#fff000"],[],["#ff0000","#ff0000","#ff0000"]];for(i=0;i<iconGroups.length;i++){if(i%2===0){continue}paths=iconGroups[i].getElementsByTagName("path");expect(paths.length).toBe(4);for(j=0;j<paths.length-1;j++){expect(paths[j].getAttribute("stroke")).toBe(result[i][j])}}done()}));chartObj.render()}));it("meaniconbordercolor should work from data level",(function(done){chartObj=setup(FusionCharts,{type:chartID,renderAt:CONTAINER_ID,width:600,height:350,dataSource:{chart:{animation:"0",showmean:"1",meaniconbordercolor:"ff0000"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",meaniconbordercolor:"fff000",data:[{value:"60,133,35,67,89,137,259",meaniconbordercolor:"0000ff"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]}});chartObj.addEventListener("renderComplete",(function(){var iconGroups=document.querySelectorAll('[class$="-defaultVcanvasGroup-lines"] > [class$="-common-elems-group"]'),paths,i,j;var result=[[],["#0000ff","#fff000","#fff000"],[],["#ff0000","#ff0000","#ff0000"]];for(i=0;i<iconGroups.length;i++){if(i%2===0){continue}paths=iconGroups[i].getElementsByTagName("path");expect(paths.length).toBe(4);for(j=0;j<paths.length-1;j++){expect(paths[j].getAttribute("stroke")).toBe(result[i][j])}}done()}));chartObj.render()}))}));describe("showMeanValue, showMDValue, showSDValue, showQDValue, showOutlierValue",(function(){var chart,chartObj,renderData={chart:{caption:"Visits to a Website",subcaption:"In three years",useroundedges:"1",animation:"0",showmean:"1",showsd:"1",showmd:"1",showqd:"1",showvalues:"1",showmeanvalues:"1",showmdvalues:"1",showsdvalues:"1",showqdvalues:"1"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("All values should be displayed",(function(done){var renderComplete=function renderComplete(){var labelGroup=document.querySelector('[class$="-vcanvasLabelGroup"').children,length=labelGroup.length,count=0;for(var i=1;i<length;i++){if(i!==5){labelGroup[1].childElementCount===3&&count++}}expect(count).toBe(length-2);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("meanValue will be positioned below icon",(function(){var chart,chartObj,renderData={chart:{caption:"Visits to a Website",subcaption:"In three years",useroundedges:"1",animation:"0",showmean:"1",showmeanvalues:"1"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("By default label will be above the icon",(function(done){var renderComplete=function renderComplete(){var label=document.querySelector('[class$="-vcanvasLabelGroup"').children[1].children[0];var icon=document.querySelector('[class$="-defaultVcanvasGroup-lines"').children[1].children[0];expect(label.getBoundingClientRect().top).toBeLessThanOrEqual(icon.getBoundingClientRect().top);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("meanValuePosition is set to below so label will be below the icon",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setChartAttribute("meanvalueposition","below")}else{var label=document.querySelector('[class$="-vcanvasLabelGroup"').children[1].children[0],icon=document.querySelector('[class$="-defaultVcanvasGroup-lines"').children[1].children[0];expect(label.getBoundingClientRect().top).not.toBeLessThanOrEqual(icon.getBoundingClientRect().top);done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("icon shape hover issue "+chartName,(function(){var chart,chartObj,renderData={chart:{caption:"Visits to a Website",subcaption:"In three years",useroundedges:"1",animation:"0",showmean:"1",meaniconshape:"spoke",meaniconradius:"30",showhovereffect:"1"},categories:[{category:[{label:"2008"},{label:"2009"},{label:"2010"}]}],dataset:[{seriesname:"January",lowerboxcolor:"019FAA",upperboxcolor:"D4DFFF",data:[{value:"60,133,35,67,89,137,259"},{value:"139,197,175,114,39,67,191"},{value:"200,107,197,239,53,26,97"}]},{seriesname:"February",lowerboxcolor:"2A5F55",upperboxcolor:"D47F00",data:[{value:"160,303,125,137,69,107,39"},{value:"139,167,255,74,59,187,151"},{value:"160,137,57,209,153,126,277"}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("When the shape of icon is spoke, hovering over it shouldn't change it to polygon",(function(done){var renderComplete=function renderComplete(){var element=document.querySelectorAll("[class*=manager-defaultVcanvasGroup-lines]")[0].children[3].getElementsByTagName("path")[1],pathString="M234.5,168.58342857142858L234.5,136.58342857142858M234.5,168.58342857142858L206.78718707889794,184.58342857142858M234.5,168.58342857142858L262.212812921102,184.5834285714286";element.dispatchEvent(new MouseEvent("mouseover",{bubbles:true,clientX:235,clientY:172}));setTimeout((function(){expect(element.getAttribute("d")).toBe(pathString);done()}),200)};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));