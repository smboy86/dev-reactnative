import{DatetimeUnits}from"../datetime-enums";import{duration}from"./duration";describe("duration generator function",(function(){it("basic test",(function(){expect(duration(DatetimeUnits.Hour,2)).toEqual({Unit:DatetimeUnits.Hour.name,number:2,ms:DatetimeUnits.Hour.ms*2})}));it("test the Unit parameter",(function(){expect((function(){duration()})).toThrowError(Error,"Invalid Unit provided: undefined");expect((function(){duration(DatetimeUnits.Wrong)})).toThrowError(Error,"Invalid Unit provided: undefined")}));it("testing the number parameter",(function(){expect(duration(DatetimeUnits.Day)).toEqual({Unit:DatetimeUnits.Day.name,number:1,ms:DatetimeUnits.Day.ms});expect(duration(DatetimeUnits.Day,"$")).toEqual({Unit:DatetimeUnits.Day.name,number:1,ms:DatetimeUnits.Day.ms})}))}));