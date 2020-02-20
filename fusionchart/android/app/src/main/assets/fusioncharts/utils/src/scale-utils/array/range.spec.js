import range from"./range";describe("range(stop) should",(function(){it("return [0, 1, 2, ..., stop - 1]",(function(){expect(range(5)).toEqual([0,1,2,3,4]);expect(range(2.01)).toEqual([0,1,2]);expect(range(1)).toEqual([0]);expect(range(.5)).toEqual([0])}));it("return an empty array if stop <= 0",(function(){expect(range(0)).toEqual([]);expect(range(-.5)).toEqual([]);expect(range(-1)).toEqual([])}));it("return an empty array if stop is NaN",(function(){expect(range(NaN)).toEqual([]);expect(range()).toEqual([])}))}));describe("range(start, stop) should",(function(){it("return [start, start + 1, ..., stop - 1]",(function(){expect(range(0,5)).toEqual([0,1,2,3,4]);expect(range(2,5)).toEqual([2,3,4]);expect(range(2.5,5)).toEqual([2.5,3.5,4.5]);expect(range(-1,3)).toEqual([-1,0,1,2])}));it("return an empty array if start or stop is NaN",(function(){expect(range(0,NaN)).toEqual([]);expect(range(1,NaN)).toEqual([]);expect(range(-1,NaN)).toEqual([]);expect(range(NaN,0)).toEqual([]);expect(range(NaN,1)).toEqual([]);expect(range(NaN,-1)).toEqual([]);expect(range(NaN,NaN)).toEqual([])}));it("return an empty array if start or stop is undefined",(function(){expect(range(0,undefined)).toEqual([]);expect(range(1,undefined)).toEqual([]);expect(range(-1,undefined)).toEqual([]);expect(range(undefined,0)).toEqual([]);expect(range(undefined,1)).toEqual([]);expect(range(undefined,-1)).toEqual([]);expect(range(undefined,undefined)).toEqual([])}));it("return an empty array if start >= stop",(function(){expect(range(0,0)).toEqual([]);expect(range(5,5)).toEqual([]);expect(range(6,5)).toEqual([]);expect(range(10,10)).toEqual([]);expect(range(20,10)).toEqual([])}))}));describe("range(start, stop, step) should",(function(){it("return [start, start + step, start + (step * 2), ..., stop - step]",(function(){expect(range(0,5,1)).toEqual([0,1,2,3,4]);expect(range(0,5,2)).toEqual([0,2,4]);expect(range(2,5,2)).toEqual([2,4]);expect(range(-1,3,2)).toEqual([-1,1])}));it("allow negative steps",(function(){expect(range(5,0,-1)).toEqual([5,4,3,2,1]);expect(range(5,0,-2)).toEqual([5,3,1]);expect(range(5,2,-2)).toEqual([5,3]);expect(range(3,-1,-2)).toEqual([3,1])}));it("return an empty array if start >= stop and step > 0",(function(){expect(range(5,5,2)).toEqual([]);expect(range(6,5,2)).toEqual([]);expect(range(10,10,1)).toEqual([]);expect(range(10,10,.5)).toEqual([]);expect(range(0,0,1)).toEqual([]);expect(range(0,0,.5)).toEqual([]);expect(range(20,10,2)).toEqual([]);expect(range(20,10,1)).toEqual([]);expect(range(20,10,.5)).toEqual([])}));it("returns an empty array if start, stop or step is NaN",(function(){expect(range(NaN,3,2)).toEqual([]);expect(range(3,NaN,2)).toEqual([]);expect(range(0,5,NaN)).toEqual([]);expect(range(0,10,NaN)).toEqual([]);expect(range(10,0,NaN)).toEqual([]);expect(range(NaN,NaN,NaN)).toEqual([]);expect(range(NaN,NaN,NaN)).toEqual([])}));it("returns an empty array if start, stop or step is undefined",(function(){expect(range(undefined,undefined,undefined)).toEqual([]);expect(range(0,10,undefined)).toEqual([]);expect(range(10,0,undefined)).toEqual([])}));it("returns an empty array if step is 0",(function(){expect(range(0,5,0)).toEqual([])}));it("returns the correct sequence for when step is fractional",(function(){expect(range(.5,0,-.1)).toEqual([.5-.1*0,.5-.1*1,.5-.1*2,.5-.1*3,.5-.1*4]);expect(range(-2,-1.2,.1)).toEqual([-2+.1*0,-2+.1*1,-2+.1*2,-2+.1*3,-2+.1*4,-2+.1*5,-2+.1*6,-2+.1*7]);expect(range(5e-31,21e-32,-11e-32)).toEqual([5e-31-11e-32*0,5e-31-11e-32*1,5e-31-11e-32*2]);expect(range(2e300,1e300,-3e299)).toEqual([2e300-3e299*0,2e300-3e299*1,2e300-3e299*2,2e300-3e299*3])}))}));