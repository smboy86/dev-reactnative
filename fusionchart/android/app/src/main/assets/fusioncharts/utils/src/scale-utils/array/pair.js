function pair(a,b){return[a,b]}function toPairs(arr,_reducer){var reducer=_reducer,i=0,n=arr.length-1,p=arr[0],pairs=new Array(n<0?0:n);if(reducer===null||typeof reducer==="undefined")reducer=pair;while(i<n){pairs[i]=reducer(p,p=arr[++i])}return pairs}export default toPairs;