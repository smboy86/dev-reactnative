import CacheStoreSync,{CacheStoreAsync}from"./cache";var str1="FusionCharts Cache Store",str2="Some test string",num1=5888,num2=1123.58,arr1=[10,20,30],arr2=[900,"abc",786],obj1={value:[15,35,85],key:"a"},obj2={test1:{key:"a",value:1},test2:{key:"b",value:2}};describe("Synchronous cache store test",(function(){var cacheStore=new CacheStoreSync;it("Inserts a string value in the cache store",(function(){cacheStore.set("str1",str1);expect(cacheStore.get("str1")).toBe(str1)}));it("Inserts a number value in the cache store",(function(){cacheStore.set("num1",num1);expect(cacheStore.get("num1")).toBe(num1)}));it("Inserts an array in the cache store",(function(){cacheStore.set("arr1",arr1);expect(cacheStore.get("arr1")).toBe(arr1)}));it("Inserts a json object in the cache store",(function(){cacheStore.set("obj1",obj1);expect(cacheStore.get("obj1")).toBe(obj1)}));cacheStore.set("str2",str2);cacheStore.set("num2",num2);cacheStore.set("arr2",arr2);cacheStore.set("obj2",obj2);it("Set method updates an existing value",(function(){expect(cacheStore.get("str1")).toEqual(str1);cacheStore.set("str1","hello1");expect(cacheStore.get("str1")).toEqual("hello1")}));it("Include method returns true if a key is present in store",(function(){expect(cacheStore.includes("str2")).toBe(true)}));it("Include method returns false if a key is not present in store",(function(){expect(cacheStore.includes("str23")).toBe(false)}));it("Remove method removes a record from the store",(function(){expect(cacheStore.includes("str2")).toBe(true);cacheStore.remove("str2");expect(cacheStore.includes("str2")).toBe(false)}));it("Dispose method deletes the internal cache store",(function(){expect(cacheStore._cache).toBeDefined();cacheStore.dispose();expect(cacheStore._cache).toBeUndefined()}))}));describe("Asynchronous cache store test",(function(){var cacheStore;beforeAll((function(){(new CacheStoreAsync).then((function(store){cacheStore=store;cacheStore.set("str2",str2);cacheStore.set("num2",num2);cacheStore.set("arr2",arr2);cacheStore.set("obj2",obj2)}))}));it("Inserts a string correctly",(function(){expect.assertions(1);return cacheStore.set("str1",str1).then((function(){expect.assertions(1);return expect(cacheStore.get("str1")).resolves.toEqual(str1)}))}));it("Inserts a number correctly",(function(){expect.assertions(1);return cacheStore.set("num1",num1).then((function(){expect.assertions(1);return expect(cacheStore.get("num1")).resolves.toEqual(num1)}))}));it("Inserts an array correctly",(function(){expect.assertions(1);return cacheStore.set("arr1",arr1).then((function(){expect.assertions(1);return expect(cacheStore.get("arr1")).resolves.toEqual(arr1)}))}));it("Inserts a json object correctly",(function(){expect.assertions(1);return cacheStore.set("obj1",obj1).then((function(){expect.assertions(1);return expect(cacheStore.get("obj1")).resolves.toEqual(obj1)}))}));it("Include method returns true if a key is present in store",(function(){expect.assertions(1);return expect(cacheStore.includes("str2")).resolves.toEqual(true)}));it("Include method returns false if a key is not present in store",(function(){expect.assertions(1);return expect(cacheStore.includes("str12")).resolves.toEqual(false)}));it("Remove method removes a record from the store",(function(){expect.assertions(1);return cacheStore.includes("str2").then((function(){expect.assertions(1);return cacheStore.remove("str2").then((function(){expect.assertions(1);return expect(cacheStore.includes("str2")).resolves.toEqual(false)}))}))}));it("Set method updates an existing value",(function(){return cacheStore.includes("str2").then((function(){expect.assertions(1);return cacheStore.set("str2","hello1").then((function(){expect.assertions(1);return expect(cacheStore.get("str2")).resolves.toEqual("hello1")}))}))}))}));