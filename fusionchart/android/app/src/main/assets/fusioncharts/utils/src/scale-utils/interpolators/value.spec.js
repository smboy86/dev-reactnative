import interpolateValue from"./value";describe("interpolateValue(a, b) should",(function(){it("interpolate numbers if b is a number",(function(){expect(interpolateValue(1,2)(.5)).toBe(1.5);expect(Number.isNaN(interpolateValue(1,NaN)(.5))).toBeTruthy()}));it("interpolate numbers if b is an object that is coercible to a number",(function(){expect(interpolateValue(1,new Number(2))(.5)).toBe(1.5);expect(interpolateValue(1,new String("2"))(.5)).toBe(1.5)}));it("should return the constant b if b is null, undefined or a boolean",(function(){expect(interpolateValue(0,null)(.5)).toBeNull();expect(interpolateValue(0,undefined)(.5)).toBeUndefined();expect(interpolateValue(0,true)(.5)).toBeTruthy();expect(interpolateValue(0,false)(.5)).toBeFalsy()}));it("should interpolate objects with valueOf as numbers if the result of valueOf is coercible to\n    a number",(function(){var from={foo:0,valueOf:function valueOf(){return String(this.foo)}},to={foo:2,valueOf:function valueOf(){return String(this.foo)}};expect(interpolateValue(from,to)(.5)).toBe(1)}));it("should interpolate objects with toString as numbers if the result of toString is coercible\n    to a number",(function(){var from={foo:0,toString:function toString(){return String(this.foo)}},to={foo:2,toString:function toString(){return String(this.foo)}};expect(interpolateValue(from,to)(.5)).toBe(1)}))}));