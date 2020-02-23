import ScaleIdentity from"./identity";describe("An identity scale should",(function(){it("should have the expected defaults",(function(){var s=new ScaleIdentity;expect(s.getDomain()).toEqual([0,1]);expect(s.getRange()).toEqual([0,1])}));it("should behave like an identity function when mapping domain values to its range",(function(){var s=(new ScaleIdentity).setDomain([1,2]);expect(s.getRangeValue(.5)).toBe(.5);expect(s.getRangeValue(1)).toBe(1);expect(s.getRangeValue(1.5)).toBe(1.5);expect(s.getRangeValue(2)).toBe(2);expect(s.getRangeValue(2.5)).toBe(2.5)}));it("should coerce the input domain value to a number when mapping domain values to its range",(function(){var s=(new ScaleIdentity).setDomain([1,2]);expect(s.getRangeValue("2")).toBe(2)}));it("should behave like an identity function when mapping range values to its domain",(function(){var s=(new ScaleIdentity).setDomain([1,2]);expect(s.getDomainValue(.5)).toBe(.5);expect(s.getDomainValue(1)).toBe(1);expect(s.getDomainValue(1.5)).toBe(1.5);expect(s.getDomainValue(2)).toBe(2);expect(s.getDomainValue(2.5)).toBe(2.5)}));it("should coerce the input range value to a number when mapping range values to its domain",(function(){var s=(new ScaleIdentity).setDomain([1,2]);expect(s.getDomainValue("2")).toBe(2)}));it("should coerce range values to numbers",(function(){var s=(new ScaleIdentity).setRange(["0","2"]);expect(s.getDomainValue("1")).toBe(1);s.setRange([new Date(1990,0,1),new Date(1991,0,1)]);expect(s.getDomainValue(new Date(1990,6,2,13))).toBe(+new Date(1990,6,2,13));s.setRange(["#000","#fff"]);expect(isNaN(s.getDomainValue("#999"))).toBeTruthy()}));it("should coerce domain values to numbers",(function(){var s=(new ScaleIdentity).setDomain([new Date(1990,0,1),new Date(1991,0,1)]);expect(typeof s.getDomain()[0]).toBe("number");expect(typeof s.getDomain()[1]).toBe("number");expect(s.getDomain()[0]).toBe(+new Date(1990,0,1));expect(s.getDomain()[1]).toBe(+new Date(1991,0,1));expect(typeof s.getRangeValue(new Date(1989,9,20))).toBe("number");expect(s.getRangeValue(new Date(1989,9,20))).toBe(+new Date(1989,9,20));s.setDomain(["0","1"]);expect(typeof s.getDomain()[0]).toBe("number");expect(typeof s.getDomain()[1]).toBe("number");expect(s.getRangeValue(.5)).toBe(.5);s.setDomain([new Number(0),new Number(1)]);expect(typeof s.getDomain()[0]).toBe("number");expect(typeof s.getDomain()[1]).toBe("number");expect(s.getRangeValue(.5)).toBe(.5);s.setRange([new Date(1990,0,1),new Date(1991,0,1)]);expect(typeof s.getRange()[0]).toBe("number");expect(typeof s.getRange()[1]).toBe("number");expect(s.getRange()[0]).toBe(+new Date(1990,0,1));expect(s.getRange()[1]).toBe(+new Date(1991,0,1));expect(typeof s.getRangeValue(new Date(1989,9,20))).toBe("number");expect(s.getRangeValue(new Date(1989,9,20))).toBe(+new Date(1989,9,20));s.setRange(["0","1"]);expect(typeof s.getRange()[0]).toBe("number");expect(typeof s.getRange()[1]).toBe("number");expect(s.getRangeValue(.5)).toBe(.5);s.setRange([new Number(0),new Number(1)]);expect(typeof s.getRange()[0]).toBe("number");expect(typeof s.getRange()[1]).toBe("number");expect(s.getRangeValue(.5)).toBe(.5)}));it("should be able to handle polyidentity domains and ranges",(function(){var s=(new ScaleIdentity).setDomain([-10,0,100]);expect(s.getDomain()).toEqual([-10,0,100]);expect(s.getRangeValue(-5)).toBe(-5);expect(s.getRangeValue(50)).toBe(50);expect(s.getRangeValue(75)).toBe(75);s.setRange([-10,0,100]);expect(s.getRange()).toEqual([-10,0,100]);expect(s.getRangeValue(-5)).toBe(-5);expect(s.getRangeValue(50)).toBe(50);expect(s.getRangeValue(75)).toBe(75)}));it("should have its identity properties be unaffected by degenerate domains",(function(){var s=(new ScaleIdentity).setDomain([Infinity,NaN]);expect(s.getRangeValue(42)).toBe(42);expect(s.getDomainValue(-42)).toBe(-42)}));it("should be able to generate ticks of varying counts",(function(){var s=new ScaleIdentity;expect(s.ticks(1)).toEqual([0,1]);expect(s.ticks(2)).toEqual([0,.5,1]);expect(s.ticks(5)).toEqual([0,.2,.4,.6,.8,1]);expect(s.ticks(10)).toEqual([0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]);s.setDomain([1,0]);expect(s.ticks(1)).toEqual([1,0]);expect(s.ticks(2)).toEqual([1,.5,0]);expect(s.ticks(5)).toEqual([1,.8,.6,.4,.2,0]);expect(s.ticks(10)).toEqual([1,.9,.8,.7,.6,.5,.4,.3,.2,.1,0])}));it("should isolate changes from a copied scale's domain or range",(function(){var s1=new ScaleIdentity,s3=s1.copy();var s2=s1.copy();s1.setDomain([1,2]);expect(s2.getDomain()).toEqual([0,1]);s2.setDomain([2,3]);expect(s1.getDomain()).toEqual([1,2]);expect(s2.getDomain()).toEqual([2,3]);s2=s3.copy();s3.setRange([1,2]);expect(s2.getRange()).toEqual([0,1]);s2.setRange([2,3]);expect(s3.getRange()).toEqual([1,2]);expect(s2.getRange()).toEqual([2,3])}))}));