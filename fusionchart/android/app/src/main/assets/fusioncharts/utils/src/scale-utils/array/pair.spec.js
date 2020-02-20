import toPairs from"./pair";describe("toPairs(array)",(function(){it("should return an empty array if input array has fewer than two elements",(function(){expect(toPairs([])).toEqual([]);expect(toPairs([1])).toEqual([])}));it("should return pairs of adjacent elements in the given array",(function(){var a={},b={},c={},d={};expect(toPairs([1,2])).toEqual([[1,2]]);expect(toPairs([1,2,3])).toEqual([[1,2],[2,3]]);expect(toPairs([a,b,c,d])).toEqual([[a,b],[b,c],[c,d]])}));it("should include null or undefined elements in pairs",(function(){expect(toPairs([1,null,2])).toEqual([[1,null],[null,2]]);expect(toPairs([1,2,undefined])).toEqual([[1,2],[2,undefined]])}))}));describe("toPairs(array, reducer)",(function(){it("should invoke the reducer function for each pair of adjacent elements",(function(){expect(toPairs([1,3,7],(function(a,b){return b-a}))).toEqual([2,4])}))}));