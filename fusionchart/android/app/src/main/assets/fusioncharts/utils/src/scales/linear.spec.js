import ScaleLinear from"./linear";import round from"./round-epsilon";var ticks=[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1],reverseTicks=ticks.slice().reverse(),posToNegTicks=[100,80,60,40,20,0,-20,-40,-60,-80,-100],negToPosTicks=posToNegTicks.slice().reverse();describe("A linear scale",(function(){it("should have the correct defaults",(function(){var linearScale=new ScaleLinear,interpolator=linearScale.getInterpolate()(1,2);expect(linearScale.getDomain()).toEqual([0,1]);expect(linearScale.getRange()).toEqual([0,1]);expect(linearScale.getClamp()).toBe(false);expect(interpolator(.5)).toBe(1.5)}));it("should map a domain value to its range value",(function(){var linearScale=new ScaleLinear;linearScale.setRange([1,4]);expect(linearScale.getRangeValue(.5)).toBe(2.5)}));it("should map a range value to its domain value",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([1,4]);expect(linearScale.getDomainValue(.5)).toBe(2.5)}));it("should ignore extra domain values if the range is smaller than the domain",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([-10,0,100]);linearScale.setRange([6,7]);linearScale.setClamp(true);expect(linearScale.getRangeValue(-5)).toBe(6.5);expect(linearScale.getRangeValue(50)).toBe(7)}));it("should ignore extra range values if the domain is smaller than the range",(function(){var linearScale=new ScaleLinear;linearScale.setRange([-10,0,100]);linearScale.setDomain([6,7]);linearScale.setClamp(true);expect(linearScale.getDomainValue(-5)).toBe(6.5);expect(linearScale.getDomainValue(50)).toBe(7)}));it("should map an empty domain to the start of the range",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([0,0]);linearScale.setRange([1,2]);expect(linearScale.getRangeValue(0)).toBe(1);linearScale.setRange([2,1]);expect(linearScale.getRangeValue(1)).toBe(2)}));it("should map an empty range to the start of the domain",(function(){var linearScale=new ScaleLinear;linearScale.setRange([0,0]);linearScale.setDomain([1,2]);expect(linearScale.getDomainValue(0)).toBe(1);linearScale.setDomain([2,1]);expect(linearScale.getDomainValue(1)).toBe(2)}));it("should map a bilinear domain with two values to the corresponding range",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([1,2]);expect(linearScale.getDomain()).toEqual([1,2]);expect(linearScale.getRangeValue(.5)).toBe(-.5);expect(linearScale.getRangeValue(1)).toBe(0);expect(linearScale.getRangeValue(1.5)).toBe(.5);expect(linearScale.getRangeValue(2)).toBe(1);expect(linearScale.getRangeValue(2.5)).toBe(1.5);expect(linearScale.getDomainValue(-.5)).toBe(.5);expect(linearScale.getDomainValue(0)).toBe(1);expect(linearScale.getDomainValue(.5)).toBe(1.5);expect(linearScale.getDomainValue(1)).toBe(2);expect(linearScale.getDomainValue(1.5)).toBe(2.5)}));it("should accept an array of numbers as its domain",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([]);expect(linearScale.getDomain()).toEqual([]);linearScale.setDomain([1,0]);expect(linearScale.getDomain()).toEqual([1,0]);linearScale.setDomain([1,2,3]);expect(linearScale.getDomain()).toEqual([1,2,3])}));it("should coerce domain values to numbers",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([new Date(1990,0,1),new Date(1991,0,1)]);expect(linearScale.getDomain()).toEqual([6311322e5,6626682e5]);linearScale.setDomain(["0.0","1.0"]);expect(linearScale.getDomain()).toEqual([0,1]);linearScale.setDomain([new Number(0),new Number(1)]);expect(linearScale.getDomain()).toEqual([0,1])}));it("should coerce range values to numbers",(function(){var linearScale=new ScaleLinear;linearScale.setRange(["0.0","2.0"]);expect(linearScale.getDomainValue("1.0")).toEqual(.5);linearScale.setRange([new Date(1990,0,1),new Date(1991,0,1)]);expect(linearScale.getDomainValue(new Date(1990,6,2,13))).toBeCloseTo(.5);linearScale.setRange([new Number(0),new Number(1)]);expect(linearScale.getRange()).toEqual([0,1])}));it("should be NaN if Range is not coercible to a number",(function(){var linearScale=new ScaleLinear;linearScale.setRange(["0.0px","2.0px"]);expect(linearScale.getDomainValue("1.0px")).toBeNaN()}));it("should create a sliced copy the input domain",(function(){var domain=[1,2],linearScale=(new ScaleLinear).setDomain(domain);expect(linearScale.getDomain()).toEqual([1,2]);domain.push(3);expect(linearScale.getDomain()).toEqual([1,2]);expect(domain).toEqual([1,2,3])}));it("should return a sliced copy of its domain",(function(){var linearScale=new ScaleLinear,domain=linearScale.getDomain();expect(domain).toEqual([0,1]);domain.push(3);expect(linearScale.getDomain()).toEqual([0,1])}));it("should create a sliced copy the input Range",(function(){var range=[1,2],linearScale=(new ScaleLinear).setRange(range);expect(linearScale.getRange()).toEqual([1,2]);range.push(3);expect(linearScale.getRange()).toEqual([1,2]);expect(range).toEqual([1,2,3])}));it("should return a sliced copy of its Range",(function(){var linearScale=new ScaleLinear,range=linearScale.getRange();expect(range).toEqual([0,1]);range.push(3);expect(linearScale.getRange()).toEqual([0,1])}));it("should accept a custom interpolator",(function(){var interpolate=function interpolate(a,b){return function(t){return[a,b,t]}},linearScale=new ScaleLinear;linearScale.setDomain([10,20]).setRange(["a","b"]).setInterpolate(interpolate);expect(linearScale.getInterpolate()).toEqual(interpolate);expect(linearScale.getRangeValue(15)).toEqual(["a","b",.5])}));it("should not clamp the output by default",(function(){var linearScale=(new ScaleLinear).setRange([10,20]);expect(linearScale.getClamp()).toBeFalsy();expect(linearScale.getRangeValue(2)).toBe(30);expect(linearScale.getRangeValue(-1)).toBe(0);expect(linearScale.getDomainValue(30)).toBe(2);expect(linearScale.getDomainValue(0)).toBe(-1)}));it("should be able to clamp output values to its range",(function(){var linearScale=(new ScaleLinear).setClamp(true).setRange([10,20]);expect(linearScale.getRangeValue(2)).toBe(20);expect(linearScale.getRangeValue(-1)).toBe(10)}));it("should be able to clamp input values to its domain",(function(){var linearScale=(new ScaleLinear).setClamp(true).setRange([10,20]);expect(linearScale.getDomainValue(30)).toBe(1);expect(linearScale.getDomainValue(0)).toBe(0)}));it("should coerce the input clamp value to a boolean",(function(){var linearScale=new ScaleLinear;expect(linearScale.setClamp("true").getClamp()).toBeTruthy();expect(linearScale.setClamp(1).getClamp()).toBeTruthy();expect(linearScale.setClamp("").getClamp()).toBeFalsy();expect(linearScale.setClamp(0).getClamp()).toBeFalsy()}));it("test for getDomainValue api",(function(){var linearScale=new ScaleLinear;linearScale.setDomain([1,2]);linearScale.setRange([0,0]);expect(linearScale.getDomainValue(0)).toBe(1);linearScale.setDomain([2,1]);expect(linearScale.getDomainValue(1)).toBe(2)}));it("test for rangeRound",(function(){var linearScale=new ScaleLinear;linearScale.rangeRound([1,2]);expect(linearScale.getRangeValue(.5)).toBe(2)}));it("should be able to return nice domain values",(function(){var linearScale=new ScaleLinear;expect(linearScale.setDomain([0,.96]).nice().getDomain()).toEqual([0,1]);expect(linearScale.setDomain([0,96]).nice().getDomain()).toEqual([0,100])}));it("should extend the domain to match the desired number of ticks when niced",(function(){var linearScale=new ScaleLinear;expect(linearScale.setDomain([0,.96]).nice(10).getDomain()).toEqual([0,1]);expect(linearScale.setDomain([0,96]).nice(10).getDomain()).toEqual([0,100]);expect(linearScale.setDomain([.96,0]).nice(10).getDomain()).toEqual([1,0]);expect(linearScale.setDomain([96,0]).nice(10).getDomain()).toEqual([100,0]);expect(linearScale.setDomain([0,-.96]).nice(10).getDomain()).toEqual([0,-1]);expect(linearScale.setDomain([0,-96]).nice(10).getDomain()).toEqual([0,-100]);expect(linearScale.setDomain([-.96,0]).nice(10).getDomain()).toEqual([-1,0]);expect(linearScale.setDomain([-96,0]).nice(10).getDomain()).toEqual([-100,0]);expect(linearScale.setDomain([-.1,51.1]).nice(8).getDomain()).toEqual([-10,60])}));it("should be able to nice the domain by extending it to round numbers",(function(){var linearScale=new ScaleLinear;expect(linearScale.setDomain([1.1,10.9]).nice(10).getDomain()).toEqual([1,11]);expect(linearScale.setDomain([10.9,1.1]).nice(10).getDomain()).toEqual([11,1]);expect(linearScale.setDomain([.7,11.001]).nice(10).getDomain()).toEqual([0,12]);expect(linearScale.setDomain([123.1,6.7]).nice(10).getDomain()).toEqual([130,0]);expect(linearScale.setDomain([0,.49]).nice(10).getDomain()).toEqual([0,.5]);expect(linearScale.setDomain([0,14.1]).nice(5).getDomain()).toEqual([0,20]);expect(linearScale.setDomain([0,15]).nice(5).getDomain()).toEqual([0,20])}));it("should have no nicing effect on un-nicable domains",(function(){var linearScale=new ScaleLinear;expect(linearScale.setDomain([0,0]).nice(10).getDomain()).toEqual([0,0]);expect(linearScale.setDomain([.5,.5]).nice(10).getDomain()).toEqual([.5,.5])}));it("should accept a tick count to control the nice steps",(function(){var linearScale=new ScaleLinear;expect(linearScale.setDomain([12,87]).nice(5).getDomain()).toEqual([0,100]);expect(linearScale.setDomain([12,87]).nice(10).getDomain()).toEqual([10,90]);expect(linearScale.setDomain([12,87]).nice(100).getDomain()).toEqual([12,87])}));it("return the expected ticks for an ascending domain",(function(){var s=new ScaleLinear;expect(s.ticks(10).map(round)).toEqual(ticks);expect(s.ticks(9).map(round)).toEqual(ticks);expect(s.ticks(8).map(round)).toEqual(ticks);expect(s.ticks(7).map(round)).toEqual([0,.2,.4,.6,.8,1]);expect(s.ticks(6).map(round)).toEqual([0,.2,.4,.6,.8,1]);expect(s.ticks(5).map(round)).toEqual([0,.2,.4,.6,.8,1]);expect(s.ticks(4).map(round)).toEqual([0,.2,.4,.6,.8,1]);expect(s.ticks(3).map(round)).toEqual([0,.5,1]);expect(s.ticks(2).map(round)).toEqual([0,.5,1]);expect(s.ticks(1).map(round)).toEqual([0,1]);s.setDomain([-100,100]);expect(s.ticks(10)).toEqual(negToPosTicks);expect(s.ticks(9)).toEqual(negToPosTicks);expect(s.ticks(8)).toEqual(negToPosTicks);expect(s.ticks(7)).toEqual(negToPosTicks);expect(s.ticks(6)).toEqual([-100,-50,0,50,100]);expect(s.ticks(5)).toEqual([-100,-50,0,50,100]);expect(s.ticks(4)).toEqual([-100,-50,0,50,100]);expect(s.ticks(3)).toEqual([-100,-50,0,50,100]);expect(s.ticks(2)).toEqual([-100,0,100]);expect(s.ticks(1)).toEqual([0])}));it("return the expected ticks for a descending domain",(function(){var s=new ScaleLinear;s.setDomain([1,0]);expect(s.ticks(10).map(round)).toEqual(reverseTicks);expect(s.ticks(9).map(round)).toEqual(reverseTicks);expect(s.ticks(8).map(round)).toEqual(reverseTicks);expect(s.ticks(7).map(round)).toEqual([0,.2,.4,.6,.8,1].reverse());expect(s.ticks(6).map(round)).toEqual([0,.2,.4,.6,.8,1].reverse());expect(s.ticks(5).map(round)).toEqual([0,.2,.4,.6,.8,1].reverse());expect(s.ticks(4).map(round)).toEqual([0,.2,.4,.6,.8,1].reverse());expect(s.ticks(3).map(round)).toEqual([0,.5,1].reverse());expect(s.ticks(2).map(round)).toEqual([0,.5,1].reverse());expect(s.ticks(1).map(round)).toEqual([0,1].reverse());s.setDomain([100,-100]);expect(s.ticks(10)).toEqual(posToNegTicks);expect(s.ticks(9)).toEqual(posToNegTicks);expect(s.ticks(8)).toEqual(posToNegTicks);expect(s.ticks(7)).toEqual(posToNegTicks);expect(s.ticks(6)).toEqual([-100,-50,0,50,100].reverse());expect(s.ticks(5)).toEqual([-100,-50,0,50,100].reverse());expect(s.ticks(4)).toEqual([-100,-50,0,50,100].reverse());expect(s.ticks(3)).toEqual([-100,-50,0,50,100].reverse());expect(s.ticks(2)).toEqual([-100,0,100].reverse());expect(s.ticks(1)).toEqual([0].reverse())}));it("return an empty array of ticks if count is not a positive integer",(function(){var linearScale=new ScaleLinear;expect(linearScale.ticks(NaN)).toEqual([]);expect(linearScale.ticks(0)).toEqual([]);expect(linearScale.ticks(-1)).toEqual([]);expect(linearScale.ticks(Infinity)).toEqual([])}));it("return approximately 7 ticks if no count is specified",(function(){var linearScale=new ScaleLinear;expect(linearScale.ticks()).toEqual(linearScale.ticks(7))}));describe("should be able to copy itself and isolate the copy",(function(){it("from changes to its domain",(function(){var linearScale=new ScaleLinear;var linearScaleCopy=linearScale.copy();linearScale.setDomain([1,2]);expect(linearScaleCopy.getDomain()).toEqual([0,1]);expect(linearScale.getRangeValue(1)).toBe(0);expect(linearScaleCopy.getRangeValue(1)).toBe(1);linearScaleCopy.setDomain([2,3]);expect(linearScale.getRangeValue(2)).toBe(1);expect(linearScaleCopy.getRangeValue(2)).toBe(0);expect(linearScale.getDomain()).toEqual([1,2]);expect(linearScaleCopy.getDomain()).toEqual([2,3])}));it("from changes to its range",(function(){var linearScale=new ScaleLinear,linearScaleCopy=linearScale.copy();linearScale.setRange([1,2]);expect(linearScale.getDomainValue(1)).toBe(0);expect(linearScaleCopy.getDomainValue(1)).toBe(1);expect(linearScaleCopy.getRange()).toEqual([0,1]);linearScaleCopy.setRange([2,3]);expect(linearScale.getDomainValue(2)).toBe(1);expect(linearScaleCopy.getDomainValue(2)).toBe(0);expect(linearScale.getRange()).toEqual([1,2]);expect(linearScaleCopy.getRange()).toEqual([2,3])}));it("from changes to its interpolator",(function(){var linearScale=(new ScaleLinear).setRange([5,8]),linearScaleCopy=linearScale.copy(),interpolator=linearScale.getInterpolate(),customInterpolator=function customInterpolator(a,b){return function(){return b}};linearScale.setInterpolate(customInterpolator);expect(linearScaleCopy.getInterpolate()).toEqual(interpolator);expect(linearScale.getRangeValue(.5)).toBe(8);expect(linearScaleCopy.getRangeValue(.5)).toBe(6.5)}));it("from changes to its clamping",(function(){var linearScale=(new ScaleLinear).setClamp(true),linearScaleCopy=linearScale.copy();linearScale.setClamp(false);expect(linearScale.getRangeValue(2)).toBe(2);expect(linearScaleCopy.getRangeValue(2)).toBe(1);expect(linearScaleCopy.getClamp()).toBeTruthy();linearScaleCopy.setClamp(false);expect(linearScale.getRangeValue(2)).toBe(2);expect(linearScaleCopy.getRangeValue(2)).toBe(2);expect(linearScale.getClamp()).toBeFalsy()}))}))}));