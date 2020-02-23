import{getArrayCopy}from"../raphael.lib";export default(function(glob){var version="0.5.3",has="hasOwnProperty",separator=/[\.\/]/,comaseparator=/\s*,\s*/,wildcard="*",fun=function fun(){},numsort=function numsort(a,b){return a-b},current_event,stop,events={n:{}},firstDefined=function firstDefined(){for(var i=0,ii=this.length;i<ii;i++){if(typeof this[i]!="undefined"){return this[i]}}},lastDefined=function lastDefined(){var i=this.length;while(--i){if(typeof this[i]!="undefined"){return this[i]}}},objtos=Object.prototype.toString,Str=String,isArray=Array.isArray||function(ar){return ar instanceof Array||objtos.call(ar)=="[object Array]"};function eve(name,scope){var e=events,oldstop=stop,arg=getArrayCopy(arguments),args=Array.prototype.slice.call(arg,2),listeners=eve.listeners(name),z=0,f=false,l,indexed=[],queue={},out=[],ce=current_event,errors=[];out.firstDefined=firstDefined;out.lastDefined=lastDefined;current_event=name;stop=0;for(var i=0,ii=listeners.length;i<ii;i++){if("zIndex"in listeners[i]){indexed.push(listeners[i].zIndex);if(listeners[i].zIndex<0){queue[listeners[i].zIndex]=listeners[i]}}}indexed.sort(numsort);while(indexed[z]<0){l=queue[indexed[z++]];out.push(l.apply(scope,args));if(stop){stop=oldstop;return out}}for(i=0;i<ii;i++){l=listeners[i];if("zIndex"in l){if(l.zIndex==indexed[z]){out.push(l.apply(scope,args));if(stop){break}do{z++;l=queue[indexed[z]];l&&out.push(l.apply(scope,args));if(stop){break}}while(l)}else{queue[l.zIndex]=l}}else{out.push(l.apply(scope,args));if(stop){break}}}stop=oldstop;current_event=ce;return out}eve._events=events;eve.listeners=function(name){var names=isArray(name)?name:name.split(separator),e=events,item,items,k,i,ii,j,jj,nes,es=[e],out=[];for(i=0,ii=names.length;i<ii;i++){nes=[];for(j=0,jj=es.length;j<jj;j++){e=es[j].n;items=[e[names[i]],e[wildcard]];k=2;while(k--){item=items[k];if(item){nes.push(item);out=out.concat(item.f||[])}}}es=nes}return out};eve.separator=function(sep){if(sep){sep=Str(sep).replace(/(?=[\.\^\]\[\-])/g,"\\");sep="["+sep+"]";separator=new RegExp(sep)}else{separator=/[\.\/]/}};eve.on=function(name,f){if(typeof f!="function"){return function(){}}var names=isArray(name)?isArray(name[0])?name:[name]:Str(name).split(comaseparator);for(var i=0,ii=names.length;i<ii;i++){(function(name){var names=isArray(name)?name:Str(name).split(separator),e=events,exist;for(var i=0,ii=names.length;i<ii;i++){e=e.n;e=e.hasOwnProperty(names[i])&&e[names[i]]||(e[names[i]]={n:{}})}e.f=e.f||[];for(i=0,ii=e.f.length;i<ii;i++){if(e.f[i]==f){exist=true;break}}!exist&&e.f.push(f)})(names[i])}return function(zIndex){if(+zIndex==+zIndex){f.zIndex=+zIndex}}};eve.f=function(event){var args=getArrayCopy(arguments),attrs=[].slice.call(args,1);return function(){eve.apply(null,[event,null].concat(attrs).concat([].slice.call(args,0)))}};eve.stop=function(){stop=1};eve.nt=function(subname){var cur=isArray(current_event)?current_event.join("."):current_event;if(subname){return new RegExp("(?:\\.|\\/|^)"+subname+"(?:\\.|\\/|$)").test(cur)}return cur};eve.nts=function(){return isArray(current_event)?current_event:current_event.split(separator)};eve.off=eve.unbind=function(name,f){if(!name){eve._events=events={n:{}};return}var names=isArray(name)?isArray(name[0])?name:[name]:Str(name).split(comaseparator);if(names.length>1){for(var i=0,ii=names.length;i<ii;i++){eve.off(names[i],f)}return}names=isArray(name)?name:Str(name).split(separator);var e,key,splice,i,ii,j,jj,cur=[events],inodes=[];for(i=0,ii=names.length;i<ii;i++){for(j=0;j<cur.length;j+=splice.length-2){splice=[j,1];e=cur[j].n;if(names[i]!=wildcard){if(e[names[i]]){splice.push(e[names[i]]);inodes.unshift({n:e,name:names[i]})}}else{for(key in e){if(e[has](key)){splice.push(e[key]);inodes.unshift({n:e,name:key})}}}cur.splice.apply(cur,splice)}}for(i=0,ii=cur.length;i<ii;i++){e=cur[i];while(e.n){if(f){if(e.f){for(j=0,jj=e.f.length;j<jj;j++){if(e.f[j]==f){e.f.splice(j,1);break}}!e.f.length&&delete e.f}for(key in e.n){if(e.n[has](key)&&e.n[key].f){var funcs=e.n[key].f;for(j=0,jj=funcs.length;j<jj;j++){if(funcs[j]==f){funcs.splice(j,1);break}}!funcs.length&&delete e.n[key].f}}}else{delete e.f;for(key in e.n){if(e.n[has](key)&&e.n[key].f){delete e.n[key].f}}}e=e.n}}prune:for(i=0,ii=inodes.length;i<ii;i++){e=inodes[i];for(key in e.n[e.name].f){continue prune}for(key in e.n[e.name].n){continue prune}delete e.n[e.name]}};eve.once=function(name,f){var f2=function f2(){eve.off(name,f2);return f.apply(this,arguments)};return eve.on(name,f2)};eve.version=version;eve.toString=function(){return"You are running Eve "+version};glob.eve=eve;return eve}(typeof window!=="undefined"?window:typeof global!=="undefined"?global:null));