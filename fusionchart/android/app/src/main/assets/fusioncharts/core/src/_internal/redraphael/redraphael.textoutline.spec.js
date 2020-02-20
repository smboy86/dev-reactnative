import Raphael from"../vendors/redraphael/source/raphael";import raphaelTextOutline from"./redraphael.textoutline";raphaelTextOutline(Raphael);describe("text outline testing",(function(){it("filter should get applied",(function(){var paper=Raphael(0,0,1e3,1e3),text=paper.text(20,20,"Dummy Text");text.outlineText(true,"rgb(255,255,255)");expect(text.node.getAttribute("filter")).not.toBe(null)}));it("filter should not get applied",(function(){var paper=Raphael(0,0,1e3,1e3),text=paper.text(20,20,"Dummy Text");text.outlineText(false,"rgb(255,255,255)");expect(text.node.getAttribute("filter")).toBe(null)}));it("repeated filter should not be created when updated on same text",(function(){var paper=Raphael(0,0,1e3,1e3),text=paper.text(20,20,"Dummy Text");text.outlineText(true,"rgb(255,255,255)");text.outlineText(true,"rgb(255,255,255)");expect(Object.keys(paper.outlineFilterCaches).length).toBe(1)}));it("no new filters should be created for two different texts of same color",(function(){var paper=Raphael(0,0,1e3,1e3),text1=paper.text(20,20,"Dummy Text 1"),text2=paper.text(50,50,"Dummy Text 2");text1.outlineText(true,"rgb(255,255,255)");text2.outlineText(true,"rgb(255,255,255)");expect(Object.keys(paper.outlineFilterCaches).length).toBe(1)}));it("no filter should be created if updated from a lighter color to a darker color",(function(){var paper=Raphael(0,0,1e3,1e3),text=paper.text(20,20,"Dummy Text");text.outlineText(true,"rgb(255,255,255)");text.outlineText(true,"rgb(0,0,0)");expect(Object.keys(paper.outlineFilterCaches).length).toBe(2)}))}));