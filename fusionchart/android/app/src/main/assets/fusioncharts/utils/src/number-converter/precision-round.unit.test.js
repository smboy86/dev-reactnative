import precisionRound from"./precision-round";describe("precisionRound",(function(){it("should return correct values",(function(){expect(precisionRound(.1,1.1)).toBe(2);expect(precisionRound(.01,.99)).toBe(2);expect(precisionRound(.01,1)).toBe(2);expect(precisionRound(.01,1.01)).toBe(3)}))}));