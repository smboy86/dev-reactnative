import ComponentInterface from"./component-interface";var obj=new ComponentInterface;describe("testing getName function",(function(){it("name to be generic",(function(){expect(obj.getName()).toBe("generic")}))}));describe("testing getType function",(function(){it("type should be generic",(function(){expect(obj.getType()).toBe("generic")}))}));describe("testing getId function",(function(){it("setId function should be called",(function(){var spy=obj;obj._id=0;spyOn(spy,"setId");spy.getId();expect(spy.setId).toHaveBeenCalled()}));it("id value should be 1",(function(){obj._id=1;expect(obj.getId()).toBe(1)}))}));describe("testing setId function",(function(){it("id value undefined should be set to generic_generic_1 when called for the first time",(function(){obj.setId(undefined);expect(obj._id).toBe("generic_generic_1")}));it("id value undefined should be set to generic_generic_2 when called for the second time",(function(){obj.setId(undefined);expect(obj._id).toBe("generic_generic_2")}))}));describe("testing iteratecomponents function",(function(){it("mapchild function should be called",(function(){var spy=obj;spyOn(spy,"_mapChildren");spy.iterateComponents();expect(spy._mapChildren).toHaveBeenCalled()}))}));describe("testing getFromEnv function",(function(){it("env should return an empty object when called first time",(function(){obj.getFromEnv("");expect(obj._env).toEqual({})}))}));describe("testing addToEnv function",(function(){it("added env row value with 2",(function(){obj.addToEnv("row",2);expect(obj._env.row).toBe(2)}));it("env should return 2 after calling addToEnv function",(function(){obj.getFromEnv("row");expect(obj._env.row).toBe(2)}))}));describe("testing deleteFromEnv function",(function(){it("env is now undefined after deleting row env by calling deleteFromEnv",(function(){obj.deleteFromEnv("row");expect(obj._env.row).toBe(undefined)}))}));describe("testing addJob function",(function(){it("checking jobList for the added job sum",(function(done){obj.addJob("sum",(function(){return 2+3}),1);setTimeout((function(){expect(obj._jobList.sum).toEqual("JOB_1_1");done()}),16)}))}));describe("testing removeJob function",(function(){it("jobList should return undefined after removing sum job",(function(done){obj.removeJob("sum");setTimeout((function(){expect(obj._jobList.sum).toEqual(undefined);done()}),16)}))}));describe("testing removeAllJobs function",(function(){it("jobList should return undefined after removing all the jobs present in the list",(function(){obj.removeAllJobs();expect(obj._jobList).toEqual({})}))}));describe("testing asyncDraw function",(function(){it("addJob function is called",(function(){var spy=obj;spyOn(spy,"addJob");spy.asyncDraw();expect(spy.addJob).toHaveBeenCalled()}))}));describe("testing syncDraw function",(function(){it("fireEvent function is called",(function(){var spy=obj;spyOn(spy,"fireEvent");spy.syncDraw();expect(spy.fireEvent).toHaveBeenCalled()}));it("removeJob function is called",(function(){var spy=obj;spyOn(spy,"removeJob");spy.syncDraw();expect(spy.removeJob).toHaveBeenCalled()}));it("jobList should be empty after deletion of Job",(function(){obj.syncDraw();expect(obj._jobList.draw).toEqual(undefined)}));it("setState function is called",(function(){var spy=obj;spyOn(spy,"setState");spy.syncDraw();expect(spy.setState).toHaveBeenCalled()}));it("dirty state set to false",(function(){obj.syncDraw();expect(obj._state.dirty).toBe(false)}));it("parentChanged set to false",(function(){obj.syncDraw();expect(obj._state.parentChanged).toBe(false)}));it("addJob function is called",(function(){var spy=obj;spyOn(spy,"addJob");spy.syncDraw();expect(spy.addJob).toHaveBeenCalled()}));it("JobList to be JOB81 for the job draw-complete",(function(){obj.syncDraw();expect(obj._jobList["draw-complete"]).toEqual("JOB_3_1")}))}));describe("testing childrenSyncDraw function",(function(){it("mapChildren function to be called",(function(){var spy=obj;spyOn(spy,"_mapChildren");spy.childrenSyncDraw();expect(spy._mapChildren).toHaveBeenCalled()}))}));describe("testing setData function",(function(){it("asynDraw function to be called",(function(){obj._state.dirty=true;var spy=obj;spyOn(spy,"asyncDraw");spy.setData();expect(spy.asyncDraw).toHaveBeenCalled()}))}));describe("Type checking",(function(){it("should return type of component",(function(){expect(obj.getType()).toBe("generic")}))}));describe("id checking",(function(){obj._id="my_id_1";it("should return id of component",(function(){expect(obj.getId()).toBe(obj._id)}))}));describe("state checking",(function(){it("should return state of component",(function(){obj.setState("id",1);expect(obj.getState("id")).toBe(1)}))}));describe("getLinkedItem function testing",(function(){it("should return linked items of component",(function(){var obj2=new ComponentInterface;obj.setLinkedItem("linkedElement1",obj2);expect(obj.getLinkedItem("linkedElement1")).toEqual(obj2)}));it("should return linked items of component",(function(){var obj2=new ComponentInterface;obj2.setLinkedItem("linkedElement2",obj);expect(obj2.getLinkedItem("linkedElement2")).toEqual(obj)}))}));describe("getLinkedParent function testing",(function(){it("should return linked parent of component obj2",(function(){var obj2=new ComponentInterface;obj2._setLinkedParent(obj);expect(obj2.getLinkedParent()).toEqual(obj)}));it("should return linked parent of component obj3",(function(){var obj3,obj2=new ComponentInterface;obj3=new ComponentInterface;obj2._setLinkedParent(obj);obj3._setLinkedParent(obj2);expect(obj3.getLinkedParent().getLinkedParent()).toEqual(obj)}))}));describe("attachChild testing",(function(){it("should return attched child of a component",(function(){var ret,obj2=new ComponentInterface;ret=obj.attachChild(obj2,"random",false);expect(ret).toEqual(obj2)}))}));describe("getChild function test",(function(){it("should return child of a component obj",(function(){var obj2=new ComponentInterface;expect(obj.getChild(obj2.getId())).not.toBeDefined()}));it("should return child of a component obj",(function(){var obj2=new ComponentInterface;obj.attachChild(obj2,"random",false);expect(obj.getChild(undefined)).toEqual(obj._components)}))}));describe("getChildren function testing",(function(){it("should return childrens of component obj",(function(){var obj2=new ComponentInterface;obj.attachChild(obj2,"random",false);expect(obj.getChildren("random")).toEqual(obj2)}))}));describe("getLinkedParent testing",(function(){it("should return parent of components",(function(){var obj2=new ComponentInterface,obj3=new ComponentInterface,obj4=new ComponentInterface;obj3._setLinkedParent(obj2);obj4._setLinkedParent(obj2);expect(obj4.getLinkedParent()).toBe(obj2)}))}));