import ScaleBand from"./band";describe("A band scale",(function(){describe("by default",(function(){var bandScale=new ScaleBand;it("should have an empty domain",(function(){expect(bandScale.getDomain()).toEqual([])}));it("should have the range set to [0, 1]",(function(){expect(bandScale.getRange()).toEqual([0,1])}));it("should have the bandwidth be of unit width",(function(){expect(bandScale.getBandwidth()).toBe(1)}));it("should have the step set to unit width",(function(){expect(bandScale.getStep()).toBe(1)}));it("should not round its values",(function(){expect(bandScale.getRound()).toBe(false)}));it("should not have any inner padding",(function(){expect(bandScale.getPaddingInner()).toBe(0)}));it("should not have any outer padding",(function(){expect(bandScale.getPaddingOuter()).toBe(0)}));it("should be aligned centrally (i.e. have an alignment value of 0.5)",(function(){expect(bandScale.getAlignment()).toBe(.5)}))}));it("should compute discrete bands in a range",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setRange([0,960]);expect(bandScale.getRangeValue("foo")).toBeUndefined();bandScale.setDomain(["foo","bar"]);expect(bandScale.getRangeValue("foo")).toBe(0);expect(bandScale.getRangeValue("bar")).toBe(480);bandScale.setDomain(["x","y","z"]);bandScale.setRange([0,120]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([0,40,80]);expect(bandScale.getBandwidth()).toBe(40);bandScale.setPadding(.2);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([7.5,45,82.5]);expect(bandScale.getBandwidth()).toBe(30)}));it("should return undefined for values outside the domain",(function(){var bandScale=new ScaleBand;bandScale.setDomain(["a","b","c"]);expect(bandScale.getRangeValue("d")).toBeUndefined();expect(bandScale.getRangeValue("e")).toBeUndefined();expect(bandScale.getRangeValue("f")).toBeUndefined()}));it("should not implicitly add values to its domain",(function(){var bandScale=new ScaleBand;bandScale.setDomain(["a","b","c"]);bandScale.getRangeValue("d");bandScale.getRangeValue("e");expect(bandScale.getDomain()).toEqual(["a","b","c"])}));it("should provide the distance between the starts of two adjacent bands",(function(){var bandScale=new ScaleBand;bandScale.setRange([0,960]);expect(bandScale.setDomain(["foo"]).getStep()).toBe(960);expect(bandScale.setDomain(["foo","bar"]).getStep()).toBe(480);expect(bandScale.setDomain(["foo","bar","baz"]).getStep()).toBe(320);bandScale.setPadding(.5);expect(bandScale.setDomain(["foo"]).getStep()).toBe(640);expect(bandScale.setDomain(["foo","bar"]).getStep()).toBe(384)}));it("should provide the width of the band",(function(){var bandScale=new ScaleBand;bandScale.setRange([0,960]);expect(bandScale.setDomain([]).getBandwidth()).toBe(960);expect(bandScale.setDomain(["foo"]).getBandwidth()).toBe(960);expect(bandScale.setDomain(["foo","bar"]).getBandwidth()).toBe(480);expect(bandScale.setDomain(["foo","bar","baz"]).getBandwidth()).toBe(320);bandScale.setPadding(.5);expect(bandScale.setDomain([]).getBandwidth()).toBe(480);expect(bandScale.setDomain(["foo"]).getBandwidth()).toBe(320);expect(bandScale.setDomain(["foo","bar"]).getBandwidth()).toBe(192)}));it("should compute reasonable band and step values",(function(){var bandScale=new ScaleBand;bandScale.setDomain([]);bandScale.setRange([0,960]);expect(bandScale.getStep()).toBe(960);expect(bandScale.getBandwidth()).toBe(960);bandScale.setPadding(.5);expect(bandScale.getStep()).toBe(960);expect(bandScale.getBandwidth()).toBe(480);bandScale.setPadding(1);expect(bandScale.getStep()).toBe(960);expect(bandScale.getBandwidth()).toBe(0)}));it("should computes a reasonable bandwidth for a single value, even with padding",(function(){var bandScale=new ScaleBand;bandScale.setDomain(["foo"]);bandScale.setRange([0,960]);expect(bandScale.getRangeValue("foo")).toBe(0);expect(bandScale.getStep()).toBe(960);expect(bandScale.getBandwidth()).toBe(960);bandScale.setPadding(.5);expect(bandScale.getRangeValue("foo")).toBe(320);expect(bandScale.getStep()).toBe(640);expect(bandScale.getBandwidth()).toBe(320);bandScale.setPadding(1);expect(bandScale.getRangeValue("foo")).toBe(480);expect(bandScale.getStep()).toBe(480);expect(bandScale.getBandwidth()).toBe(0)}));it("should bandwidth is recalculated on setting the domain",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setDomain(["a","b","c"]);bandScale.rangeRound([0,100]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([1,34,67]);expect(bandScale.getBandwidth()).toBe(33);bandScale.setDomain(["a","b","c","d"]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([0,25,50,75]);expect(bandScale.getBandwidth()).toBe(25)}));it("should make a copy of the input domain",(function(){var domain=["red","green"],bandScale=new ScaleBand;bandScale.setDomain(domain);domain.push("blue");expect(bandScale.getDomain()).toEqual(["red","green"])}));it("should return a copy of its domain",(function(){var bandScale=new ScaleBand,domain;bandScale.setDomain(["red","green"]);domain=bandScale.getDomain();expect(domain).toEqual(["red","green"]);domain.push("blue");expect(bandScale.getDomain()).toEqual(["red","green"])}));it("should accept range in descending order",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setDomain(["a","b","c"]);bandScale.setRange([120,0]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([80,40,0]);expect(bandScale.getBandwidth()).toBe(40);bandScale.setPadding(.2);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([82.5,45,7.5]);expect(bandScale.getBandwidth()).toBe(30)}));it("should make a copy of the input range",(function(){var range=[1,2],bandScale=new ScaleBand;bandScale.setRange(range);range.push("blue");expect(bandScale.getRange()).toEqual([1,2])}));it("should return a copy of its range",(function(){var bandScale=new ScaleBand;var range;bandScale.setRange([1,2]);range=bandScale.getRange();expect(range).toEqual([1,2]);range.push("blue");expect(bandScale.getRange()).toEqual([1,2])}));it("should coerce its input range into numbers",(function(){var bandScale=new ScaleBand;bandScale.setRange(["1.0","2.0"]);expect(bandScale.getRange()).toEqual([1,2])}));it("should add the correct amount of inner padding",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setDomain(["a","b","c"]);bandScale.setRange([120,0]);bandScale.setPaddingInner(.1);bandScale.setRound(true);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([83,42,1]);expect(bandScale.getBandwidth()).toBe(37);bandScale.setPaddingInner(.2);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([85,43,1]);expect(bandScale.getBandwidth()).toBe(34)}));it("should clamp the input inner padding between 0 and 1 (inclusive)",(function(){var bandScale=new ScaleBand;expect(bandScale.setPaddingInner("1.0").getPaddingInner()).toBe(1);expect(bandScale.setPaddingInner("-1.0").getPaddingInner()).toBe(0);expect(bandScale.setPaddingInner("2.0").getPaddingInner()).toBe(1);expect(Number.isNaN(bandScale.setPaddingInner(NaN).getPaddingInner())).toBeTruthy()}));it("should add the correct amount of outer padding",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setDomain(["a","b","c"]);bandScale.setRange([120,0]);bandScale.setPaddingInner(.2);bandScale.setPaddingOuter(.1);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([84,44,4]);expect(bandScale.getBandwidth()).toBe(32);bandScale.setPaddingOuter(1);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([75,50,25]);expect(bandScale.getBandwidth()).toBe(20)}));it("should clamp the input outer padding between 0 and 1 (inclusive)",(function(){var bandScale=new ScaleBand;expect(bandScale.setPaddingOuter("1.0").getPaddingOuter()).toBe(1);expect(bandScale.setPaddingOuter("-1.0").getPaddingOuter()).toBe(0);expect(bandScale.setPaddingOuter("2.0").getPaddingOuter()).toBe(1);expect(Number.isNaN(bandScale.setPaddingOuter(NaN).getPaddingOuter())).toBeTruthy()}));it("should return discrete rounded bands in a continuous range when rounding is enabled",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;bandScale.setDomain(["a","b","c"]);bandScale.setRange([0,100]);bandScale.setRound(true);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([1,34,67]);expect(bandScale.getBandwidth()).toBe(33);bandScale.setPadding(.2);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([7,38,69]);expect(bandScale.getBandwidth()).toBe(25)}));it("should allows for a shorthand to set the range and enable rounding",(function(){var bandScale=new ScaleBand;bandScale.setDomain(["a","b","c"]);bandScale.rangeRound([0,100]);expect(bandScale.getRange()).toEqual([0,100]);expect(bandScale.getRound()).toBeTruthy()}));it("should correctly creates a copy of all its properties when copied",(function(){var bandScale=new ScaleBand;var bandScaleCopy;bandScale.setDomain(["red","green"]);bandScale.setRange([1,2]);bandScale.setRound(true);bandScale.setPaddingInner(.1);bandScale.setPaddingOuter(.2);bandScaleCopy=bandScale.copy();expect(bandScaleCopy.getDomain()).toEqual(bandScale.getDomain());expect(bandScaleCopy.getRange()).toEqual(bandScale.getRange());expect(bandScaleCopy.getRound()).toBe(bandScale.getRound());expect(bandScaleCopy.getPaddingInner()).toBe(bandScale.getPaddingInner());expect(bandScaleCopy.getPaddingOuter()).toBe(bandScale.getPaddingOuter())}));it("should changes to the domain do not affect domain of the copied scale",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;var bandScaleCopy,getRangeValueCopy;bandScale.setDomain(["foo","bar"]);bandScale.setRange([0,2]);bandScaleCopy=bandScale.copy();getRangeValueCopy=bandScaleCopy.getRangeValue;bandScale.setDomain(["red","blue"]);expect(bandScaleCopy.getDomain()).toEqual(["foo","bar"]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([0,1]);expect(bandScaleCopy.getDomain().map(getRangeValueCopy.bind(bandScaleCopy))).toEqual([0,1]);bandScaleCopy.setDomain(["red","blue"]);expect(bandScale.getDomain()).toEqual(["red","blue"]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([0,1]);expect(bandScaleCopy.getDomain().map(getRangeValueCopy.bind(bandScaleCopy))).toEqual([0,1])}));it("should band.copy() isolates changes to the range",(function(){var bandScale=new ScaleBand,getRangeValue=bandScale.getRangeValue;var bandScaleCopy,getRangeValueCopy;bandScale.setDomain(["foo","bar"]);bandScale.setRange([0,2]);bandScaleCopy=bandScale.copy();getRangeValueCopy=bandScaleCopy.getRangeValue;bandScale.setRange([3,5]);expect(bandScaleCopy.getRange()).toEqual([0,2]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([3,4]);expect(bandScaleCopy.getDomain().map(getRangeValueCopy.bind(bandScaleCopy))).toEqual([0,1]);bandScaleCopy.setRange([5,7]);expect(bandScale.getRange()).toEqual([3,5]);expect(bandScale.getDomain().map(getRangeValue.bind(bandScale))).toEqual([3,4]);expect(bandScaleCopy.getDomain().map(getRangeValueCopy.bind(bandScaleCopy))).toEqual([5,6])}))}));