import*as aggregators from"./aggregators.js";export default{store:{},_defaultAggregators:aggregators,register:function register(name,fn){this.store[name]=fn;return this},getRegisteredAggregations:function getRegisteredAggregations(){return Object.assign(this.store)},getDefaultAggregations:function getDefaultAggregations(){return Object.assign(this._defaultAggregators)},resolve:function resolve(name){return this._defaultAggregators[name]||this.store[name]}};