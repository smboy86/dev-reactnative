import Caption from"./index";import SmartLabelManager from"../../../../../fc-core/src/_internal/vendors/fusioncharts-smartlabel/src/SmartlabelManager";describe("CSC_TS_1: Verify that font size is applied",(function(){var caption,graphicalElements;beforeEach((function(){caption=new Caption;caption._env={smartLabel:new SmartLabelManager(document.body||document.getElementsByTagName("body")[0])};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_1: To verify the font size when, small size is applied",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("15px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}));it("CSC_TC_2: To verify the font size when large size is applied",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"50px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("50px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}));it("CSC_TC_3: To verify the font size when negative font size is applied",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"-15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("15px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}));it("CSC_TC_4: To verify the font size when font size is 0",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"_font-size":"0px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("0px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}));it("CSC_TC_5: To verify the font size when no font size is given",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"_font-size":"0px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("12px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}));it("CSC_TC_6: To verify the font size when invalid font size is given",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"asdfg"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-size"]).toBe("12px");expect(caption.getGraphicalElement("subCaption").attr["font-size"]).toBe("10px")}))}));describe("CSC_TS_2: Verify that font-family is applied",(function(){var caption,graphicalElements;beforeEach((function(){caption=new Caption;caption._env={smartLabel:new SmartLabelManager(document.body||document.getElementsByTagName("body")[0])};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_9: To verify the font-family, when no font-family is specified",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-family"]).toBeDefined();expect(caption.getGraphicalElement("subCaption").attr["font-family"]).toBeDefined()}))}));describe("CSC_TS_3: Verify that font-style is applied",(function(){var caption,graphicalElements;beforeEach((function(){caption=new Caption;caption._env={smartLabel:new SmartLabelManager(document.body||document.getElementsByTagName("body")[0])};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_10: To verify the font-style when valid font-style is provided",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px","font-style":"normal"},subCaptionStyle={"font-size":"10px","font-style":"italic"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-style"]).toBe("normal");expect(caption.getGraphicalElement("subCaption").attr["font-style"]).toBe("italic")}));it("CSC_TC_11: To verify the font-style when invalid font-style is provided",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px","font-style":"sdbnksb"},subCaptionStyle={"font-size":"10px","font-style":"invalid"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-style"]).toBe("normal");expect(caption.getGraphicalElement("subCaption").attr["font-style"]).toBe("normal")}));it("CSC_TC_12: To verify the font-style when no font-style is provided",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-style"]).toBe("normal");expect(caption.getGraphicalElement("subCaption").attr["font-style"]).toBe("normal")}))}));describe("CSC_TS_4: Verify that font-weight is applied",(function(){var caption,graphicalElements;beforeEach((function(){caption=new Caption;caption._env={smartLabel:new SmartLabelManager(document.body||document.getElementsByTagName("body")[0])};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_15: To verify the font-weight when no font-weight is provided",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px","_font-weight":"200"},subCaptionStyle={"font-size":"10px","_font-weight":"700"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr["font-weight"]).toBe("normal");expect(caption.getGraphicalElement("subCaption").attr["font-weight"]).toBe("normal")}))}));describe("CSC_TS_5: Verify that caption and subcaption do not overlap with each other",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_16: To verify that caption and subcaption do not overlap when font size is small",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"10px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();captionEndY=caption.getGraphicalElement("caption").attr.y+Number(caption.getGraphicalElement("caption").attr["font-size"].match(/[0-9]+/gi)[0])/2;subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(caption.getGraphicalElement("subCaption").attr["font-size"].match(/[0-9]+/gi)[0])/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}));it("CSC_TC_17: To verify that caption and subcaption do not overlap when font size is large",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"35px"},subCaptionStyle={"font-size":"30px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();captionEndY=caption.getGraphicalElement("caption").attr.y+Number(caption.getGraphicalElement("caption").attr["font-size"].match(/[0-9]+/gi)[0])/2;subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(caption.getGraphicalElement("subCaption").attr["font-size"].match(/[0-9]+/gi)[0])/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}));it("CSC_TC_18: To verify that caption and subcaption do not overlap when caption text is very long",(function(){var captionText="Caption shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"15px"});captionEndY=caption.getGraphicalElement("caption").attr.y+Number(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).height)/2;smartLabel.setStyle({fontSize:"10px"});subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(smartLabel.getOriSize(caption.getGraphicalElement("subCaption").attr.text).height)/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}));it("CSC_TC_19: To verify that caption and subcaption do not overlap when subcaption text is very long",(function(){var captionText="Caption",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"10px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"10px"});captionEndY=caption.getGraphicalElement("caption").attr.y+Number(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).height)-5;subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(caption.getGraphicalElement("subCaption").attr["font-size"].match(/[0-9]+/gi)[0])/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}));it("CSC_TC_20: To verify that caption and subcaption do not overlap when both their text is very long",(function(){var captionText="Capti shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"10px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"10px"});captionEndY=caption.getGraphicalElement("caption").attr.y+Number(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).height)-5;subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(caption.getGraphicalElement("subCaption").attr["font-size"].match(/[0-9]+/gi)[0])/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}))}));describe("CSC_TS_6: Verify caption text does not go outside canvas",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_21: To verify caption text is within canvas when long caption text is set such that caption has to break into 2 or more lines",(function(){var captionText="Caption shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"15px"});expect(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).width).toBeLessThanOrEqual(520.3685546875)}));it("CSC_TC_22: To verify caption text is within canvas when large font size is set such that the text tends to go out of the canvas and cannot break into multiple lines since height is not permitted",(function(){var captionText="Caption shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"45px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"45px"});expect(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).width).toBeLessThanOrEqual(520.3685546875)}))}));describe("CSC_TS_7: Verify that subcaption text does not go outside the canvas",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_23: To verify subcaption text is withing canvas when long subcaption text is set such that the subcaption text has to break into 2 or more lines",(function(){var captionText="Caption shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"10px"});expect(smartLabel.getOriSize(caption.getGraphicalElement("subCaption").attr.text).width).toBeLessThanOrEqual(520.3685546875)}));it("CSC_TC_24: To verify subcaption text is within canvas when large font size is set such that the text tends to go out of the canvas and cannot break into multiple lines since height is not permitted",(function(){var captionText="Caption",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"20px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"20px"});expect(smartLabel.getOriSize(caption.getGraphicalElement("subCaption").attr.text).width).toBeLessThanOrEqual(520.3685546875)}))}));describe("CSC_TS_8: Verify that color is applied to caption",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_25: To verify text-color is applied correctly when valid color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px",fill:"#000fff"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr.fill).toBe("#000fff")}));it("CSC_TC_26: To verify text-color is applied correctly when invalid color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px",fill:"000fff"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr.fill).toBe("#000000")}));it("CSC_TC_27: To verify text-color is applied correctly when no color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr.fill).toBe("#000000")}))}));describe("CSC_TS_9: Verify that color is applied to subcaption",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_28: To verify text-color is applied correctly when valid color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px",fill:"#000fff"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("subCaption").attr.fill).toBe("#000fff")}));it("CSC_TC_29: To verify text-color is applied correctly when invalid color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px",fill:"000fff"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("subCaption").attr.fill).toBe("#000000")}));it("CSC_TC_30: To verify text-color is applied correctly when no color is set",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("subCaption").attr.fill).toBe("#000000")}))}));describe("CSC_TS_12: Verify the height of canvas occupied by caption and subcaption",(function(){var caption,graphicalElements,smartLabel=new SmartLabelManager(document.body||document.getElementsByTagName("body")[0]);beforeEach((function(){caption=new Caption;caption._env={smartLabel:smartLabel};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_37: To verify caption and subcaption height is not more than 30% of the canvas height when font size is small such that it's within the height limit alloted",(function(){var captionText="Caption",subCaptionText="Subcaption text",allotedDimension,captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}));it("CSC_TC_38: To verify caption and subcaption height is not more than 30% of the canvas height when font size is large such that it's just the height limit alloted to it",(function(){var captionText="Caption",subCaptionText="Subcaption text",allotedDimension,captionStyle={"font-size":"45px"},subCaptionStyle={"font-size":"20px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}));it("CSC_TC_39: To verify caption and subcaption height is not more than 30% of the canvas height when text is short such that text is in single line",(function(){var captionText="Caption",subCaptionText="Subcaption text",allotedDimension,captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}));it("CSC_TC_40: To verify caption and subcaption height is not more than 30% of the canvas height when text is long such that the text breaks into multiple lines so that it reaches the height limit alloted",(function(){var captionText="Caption sndsajkndkascasc  asjcnsalknclas lascnlmas ckjas clkascnlsaknclksa lascnlksacnlkasn c sakascnlksac lmas c, ascsaklcnlksa cmsa lkasnclmsa clksanoic lmsa clksancasc lsakc lkas clksa coj aslmc aksjl clmas cklsa ckmsa lcj asl cljas cla laj ckjas ckja cjka kja cakj cakj cka asj sakjc sa cksa ckas kc sak  asckackn kc ka kj ask asck kas kasc kasc k acsk cask asckn ask kcans",subCaptionText="Subcaption text sndsajkndkascasc  asjcnsalknclas lascnlmas ckjas clkascnlsaknclksa lascnlksacnlkasn c sakascnlksac lmas c, ascsaklcnlksa cmsa lkasnclmsa clksanoic lmsa clksancasc lsakc lkas clksa coj aslmc aksjl clmas cklsa ckmsa lcj asl cljas cla laj ckjas ckja cjka kja cakj cakj cka asj sakjc sa cksa ckas kc sak  asckackn kc ka kj ask asck kas kasc kasc k acsk cask asckn ask kcans",allotedDimension,captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}));it("CSC_TC_41: To verify there is significant gap between caption and subcaption when both text are present",(function(){var captionText="Capti shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",subCaptionText="Subcaption text  shkjabscbasc sakjcnkajcnjknasdc ksncjkasnjkcnkads kja kjascnjlsanckja csnckjanckjadn ck kjascnkjasnckjankcj ask  ,amnsc kja ckjasn jc asdk ca",captionStyle={"font-size":"10px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle},captionEndY,subcaptionStartY;caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();smartLabel.setStyle({fontSize:"10px"});captionEndY=caption.getGraphicalElement("caption").attr.y+Number(smartLabel.getOriSize(caption.getGraphicalElement("caption").attr.text).height)-5;subcaptionStartY=caption.getGraphicalElement("subCaption").attr.y-Number(caption.getGraphicalElement("subCaption").attr["font-size"].match(/[0-9]+/gi)[0])/2;expect(subcaptionStartY-captionEndY).toBeGreaterThan(0)}));it("CSC_TC_44: To verify caption height is not more than 30% of the canvas height when caption is present only",(function(){var captionText="Caption sndsajkndkascasc  asjcnsalknclas lascnlmas ckjas clkascnlsaknclksa lascnlksacnlkasn c sakascnlksac lmas c, ascsaklcnlksa cmsa lkasnclmsa clksanoic lmsa clksancasc lsakc lkas clksa coj aslmc aksjl clmas cklsa ckmsa lcj asl cljas cla laj ckjas ckja cjka kja cakj cakj cka asj sakjc sa cksa ckas kc sak  asckackn kc ka kj ask asck kas kasc kasc k acsk cask asckn ask kcans",allotedDimension,captionStyle={"font-size":"15px"},configuration={caption:captionText,subCaption:"",captionCss:captionStyle,subCaptionCss:{}};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}));it("CSC_TC_45: To verify subcaption height is not more than 30% of the canvas height when sub-caption is present only",(function(){var captionText="Caption sndsajkndkascasc  asjcnsalknclas lascnlmas ckjas clkascnlsaknclksa lascnlksacnlkasn c sakascnlksac lmas c, ascsaklcnlksa cmsa lkasnclmsa clksanoic lmsa clksancasc lsakc lkas clksa coj aslmc aksjl clmas cklsa ckmsa lcj asl cljas cla laj ckjas ckja cjka kja cakj cakj cka asj sakjc sa cksa ckas kc sak  asckackn kc ka kj ask asck kas kasc kasc k acsk cask asckn ask kcans",allotedDimension,captionStyle={"font-size":"15px"},configuration={caption:"",subCaption:captionText,captionCss:{},subCaptionCss:captionStyle};caption.configure(configuration);allotedDimension=caption.setDimension({height:113.1,width:520.3685546875});expect(allotedDimension.height).toBeLessThanOrEqual(113.1)}))}));describe("CSC_TS_13: Verify that text have ellipis when text is long",(function(){var caption,graphicalElements;beforeEach((function(){caption=new Caption;caption._env={smartLabel:new SmartLabelManager(document.body||document.getElementsByTagName("body")[0])};caption.__setDefaultConfig();graphicalElements={};caption.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};caption.getGraphicalElement=function(id){return graphicalElements[id]}}));afterEach((function(){caption=undefined}));it("CSC_TC_46: To verify that caption text has ellipsis when text breaks into 2 lines which is maximum it can break and the 2nd line text is long enough to be more tha canvas width",(function(){var captionText="Caption nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b",subCaptionText="Subcaption text  nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b",captionStyle={"font-size":"35px"},subCaptionStyle={"font-size":"10px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr.text.endsWith("...")).toBeTruthy()}));it("CSC_TC_47: To verify that sub-caption text has ellipsis when text breaks into 2 lines which is maximum it can break  and the 2nd line text is long enough to be more tha canvas width",(function(){var captionText="Caption nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b",subCaptionText="Subcaption text  nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b nscjsncs kc ks cs k sckj sk cks kjcks kcs c skc s csk ckjs cjk s c sj cs ckjs kjc s cks kcak jk dckj z vz  c C k ck ck kc skj cks csd ckjs dc asc n U N NS NS NKJSN KJAN K JAKJ NJ N NA NA ka c cd  v ck sckjds cds kjcdks cd sc jkd c sd c ask cs kj czk  ckd sk ka ckhas csanckjsdbncibia ih b",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"20px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("subCaption").attr.text.endsWith("...")).toBeTruthy()}));it("CSC_TC_48: To verify that caption text has no ellipsis when text is short enough to be less than canvas width",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"20px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("caption").attr.text.endsWith("...")).toBeFalsy()}));it("CSC_TC_49: To verify that sub-caption text has no ellipsis when text is short enough to be less than canvas width",(function(){var captionText="Caption",subCaptionText="Subcaption text",captionStyle={"font-size":"15px"},subCaptionStyle={"font-size":"20px"},configuration={caption:captionText,subCaption:subCaptionText,captionCss:captionStyle,subCaptionCss:subCaptionStyle};caption.configure(configuration);caption.setDimension({height:113.1,width:520.3685546875});caption.draw();expect(caption.getGraphicalElement("subCaption").attr.text.endsWith("...")).toBeFalsy()}))}));