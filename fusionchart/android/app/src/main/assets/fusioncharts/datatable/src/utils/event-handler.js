function addHandler(eventName,handler,sender){var attachedHandlersLen;if(handler instanceof Array){var recurseReturn=[],handlerLen=handler.length;for(var i=0;i<handlerLen;i+=1){recurseReturn.push(addHandler(eventName,handler[i],sender))}return recurseReturn}if(!eventName||typeof eventName!=="string")throw new Error("eventName must be a non-empty string");if(typeof handler!=="function")throw new Error("handler must be a function");if(!(sender instanceof Object))throw new Error("sender must be an object");sender._evtHandlers=sender._evtHandlers||{};if(!sender._evtHandlers[eventName]||!(sender._evtHandlers[eventName]instanceof Array)){sender._evtHandlers[eventName]=[]}attachedHandlersLen=sender._evtHandlers[eventName].length;for(var _i=0;_i<attachedHandlersLen;_i++){if(sender._evtHandlers[eventName][_i]===handler){return false}}sender._evtHandlers[eventName].push(handler);return true}function getHanlders(eventName,sender){if(typeof eventName!=="string")throw new Error("eventName must be a non-empty string");if(!(sender instanceof Object))throw new Error("sender must be an object");return sender._evtHandlers&&sender._evtHandlers[eventName]||[]}function removeHandler(eventName,handler,sender){var attachedHandlers,attachedHandlersLen;if(handler instanceof Array){var recurseReturn=[],handlerLen=handler.length;for(var i=0;i<handlerLen;i+=1){recurseReturn.push(removeHandler(eventName,handler[i],sender))}return recurseReturn}if(!eventName||typeof eventName!=="string")throw new Error("eventName must be a non-empty string");if(handler&&typeof handler!=="function")throw new Error("handler must be a function");if(!(sender instanceof Object))throw new Error("sender must be an object");attachedHandlers=getHanlders(eventName,sender);if(!(attachedHandlers instanceof Array)||attachedHandlers.length===0){return}if(!handler){delete sender._evtHandlers[eventName];return true}attachedHandlersLen=attachedHandlers.length;for(var _i2=0;_i2<attachedHandlersLen;_i2++){if(attachedHandlers[_i2]===handler){attachedHandlers.splice(_i2,1)}}return true}function triggerEvent(eventName,sender,args){var attachedHandlers,attachedHandlersLen,eventObj;if(!eventName||typeof eventName!=="string")throw new Error("eventName must be a non-empty string");if(!(sender instanceof Object))throw new Error("sender must be an object");attachedHandlers=getHanlders(eventName,sender);eventObj={eventName:eventName,sender:sender,data:args};if(!(attachedHandlers instanceof Array)||attachedHandlers.length===0){return}attachedHandlersLen=attachedHandlers.length;for(var i=0;i<attachedHandlersLen;i++){attachedHandlers[i](eventObj)}return true}export{addHandler,getHanlders,removeHandler,triggerEvent};