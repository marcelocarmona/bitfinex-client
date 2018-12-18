(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(41)},27:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(18),l=n.n(c),o=(n(27),n(3)),i=n(4),u=n(7),s=n(5),d=n(8),b=n(6),m=n(9),E="TICKER-UPDATE_MESSAGE";function p(e){return{type:E,payload:e}}n(33);var v=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.tickerConnection()}},{key:"render",value:function(){var e=this.props.ticker,t=e.VOLUME,n=e.LOW,a=e.HIGH,c=e.LAST_PRICE,l=e.DAILY_CHANGE,o=e.DAILY_CHANGE_PERC,i=e.pair;return r.a.createElement("div",{className:"ticker"},r.a.createElement("div",{className:"ticker__column"},r.a.createElement("div",null,i),r.a.createElement("div",null,"VOL ",t),r.a.createElement("div",null,"LOW ",n)),r.a.createElement("div",{className:"ticker__column"},r.a.createElement("div",null,c),r.a.createElement("div",null,l,"(",o,"%)"),r.a.createElement("div",null,"HIGH ",a)))}}]),t}(a.PureComponent),f=Object(b.b)(function(e){return{ticker:e.ticker}},function(e){return{tickerConnection:function(){e(function(e){var t=new WebSocket("wss://api.bitfinex.com/ws/2");t.addEventListener("message",function(t){var n=JSON.parse(t.data);if("subscribed"===n.event)e(p({pair:n.pair}));else if("info"===n.event);else{var a=n[1];if("hb"!==a){var r=Object(m.a)(a,10),c=r[0],l=r[1],o=r[2],i=r[3],u=r[4],s=r[5],d=r[6],b=r[7],E=r[8],v=r[9];e(p({BID:c,BID_SIZE:l,ASK:o,ASK_SIZE:i,DAILY_CHANGE:u,DAILY_CHANGE_PERC:s,LAST_PRICE:d,VOLUME:b,HIGH:E,LOW:v}))}}});var n=JSON.stringify({event:"subscribe",channel:"ticker",symbol:"tBTCUSD"});t.addEventListener("open",function(){return t.send(n)}),t.addEventListener("error",function(e){console.error("Socket encountered error: ",e.message,"Closing socket"),t.close()})})}}})(v),O="TRADE-UPDATE_MESSAGE",h="TRADE-ADD_MESSAGE";function y(e){return{type:O,payload:e}}function k(){return function(e,t){var n=new WebSocket("wss://api.bitfinex.com/ws/2");n.addEventListener("message",function(t){var n=JSON.parse(t.data);if("subscribed"===n.event)e(y({symbol:n.symbol,trades:[]}));else if("info"===n.event);else{var a=n[1];if("tu"===a){var r=n[2];e({type:h,payload:{symbol:"tBTCUSD",newTrade:r}})}else if("hb"!==a&&"te"!==a){e(y({symbol:"tBTCUSD",trades:a}))}}});var a=JSON.stringify({event:"subscribe",channel:"trades",symbol:"tBTCUSD"});n.addEventListener("open",function(){return n.send(a)}),n.addEventListener("error",function(e){console.error("Socket encountered error: ",e.message,"Closing socket"),n.close()})}}n(35);var j=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.tradesConnection()}},{key:"render",value:function(){var e=this.props.trades;return r.a.createElement("div",{className:"trade"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"TIME"),r.a.createElement("th",null,"AMOUNT"),r.a.createElement("th",null,"PRICE"))),r.a.createElement("tbody",null,e.tBTCUSD.map(function(e){var t=Object(m.a)(e,4),n=t[0],a=t[1],c=t[2],l=t[3];return r.a.createElement("tr",{key:n,className:c>0?"trade--bought":"trade--sold"},r.a.createElement("td",null,c>0?"\ud83d\udd3a":"\ud83d\udd3b"),r.a.createElement("td",null,new Date(a).toLocaleTimeString()),r.a.createElement("td",null,c),r.a.createElement("td",null,l))}))))}}]),t}(a.PureComponent),S=Object(b.b)(function(e){return{trades:e.trades}},function(e){return{tradesConnection:function(){e(k())}}})(j),C="BOOK-SNAPSHOT_MESSAGE",A="BOOK-UPDATE_MESSAGE";var g=null;function D(e,t){return function(n,a){g?(g.close(),g=new WebSocket("wss://api.bitfinex.com/ws/2")):g=new WebSocket("wss://api.bitfinex.com/ws/2"),g.addEventListener("open",function(){var n=a().book.channel,r=n.symbol,c=n.freq,l=n.prec,o=JSON.stringify({event:"subscribe",channel:"book",symbol:r,freq:e||c,prec:t||l});g.send(o)});var r=null;g.addEventListener("message",function(e){var t=JSON.parse(e.data);if("subscribed"===t.event)r=t;else if("info"===t.event);else{var a=t[1];50===a.length?n(function(e){var t=e.channel,n=e.payload;return{type:C,channel:t,payload:n}}({channel:r,payload:t})):"hb"!==a&&n(function(e){var t=e.channel,n=e.payload;return{type:A,channel:t,payload:n}}({channel:r,payload:t}))}}),g.addEventListener("error",function(e){console.error("Socket encountered error: ",e.message,"Closing socket"),g.close()})}}n(37);var w=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).changePrecision=function(e){e.preventDefault(),n.props.orderBookConnection(null,e.target.value)},n.changeFrequency=function(e){e.preventDefault(),n.props.orderBookConnection(e.target.value)},n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.orderBookConnection("F1","P0")}},{key:"render",value:function(){var e=this.props,t=e.asks,n=e.bids,a=e.channel;return r.a.createElement(r.a.Fragment,null,a&&r.a.createElement("div",null,"Frequency ",a.freq,"\xa0",r.a.createElement("select",{onChange:this.changeFrequency},r.a.createElement("option",{value:"F1"},"F1"),r.a.createElement("option",{value:"F0"},"F0")),"\xa0 Precision Level ",a.prec,"\xa0",r.a.createElement("select",{onChange:this.changePrecision},r.a.createElement("option",{value:"P0"},"P0"),r.a.createElement("option",{value:"P1"},"P1"),r.a.createElement("option",{value:"P2"},"P2"),r.a.createElement("option",{value:"P3"},"P3"))),r.a.createElement("div",{className:"book"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"COUNT"),r.a.createElement("th",null,"AMOUNT"),r.a.createElement("th",null,"PRICE"))),r.a.createElement("tbody",null,Object.keys(t).map(function(e){return r.a.createElement("tr",{key:e},r.a.createElement("td",null,t[e].count),r.a.createElement("td",null,t[e].amount),r.a.createElement("td",null,t[e].price))}))),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"PRICE"),r.a.createElement("th",null,"AMOUNT"),r.a.createElement("th",null,"COUNT"))),r.a.createElement("tbody",null,Object.keys(n).map(function(e){return r.a.createElement("tr",{key:e},r.a.createElement("td",null,n[e].price),r.a.createElement("td",null,n[e].amount),r.a.createElement("td",null,n[e].count))})))))}}]),t}(a.PureComponent),_=Object(b.b)(function(e){return{channel:e.book.channel,asks:e.book.asks,bids:e.book.bids}},function(e){return{orderBookConnection:function(t,n){e(D(t,n))}}})(w),P=n(10),T=n(1),I={pair:"BTCUSD",BID:0,BID_SIZE:0,ASK:0,ASK_SIZE:0,DAILY_CHANGE:0,DAILY_CHANGE_PERC:0,LAST_PRICE:0,VOLUME:0,HIGH:0,LOW:0};var L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return Object(T.a)({},e,t.payload);default:return e}},N=n(2),B={channel:{event:null,channel:"book",chanId:null,symbol:"tBTCUSD",prec:"P0",freq:"F1",len:"25",pair:"BTCUSD"},asks:{},bids:{}};var U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:var n=t.payload[1];return n=n.reduce(function(e,t,n){var a=Object(m.a)(t,3),r=a[0],c=a[1],l=a[2];return n<25?Object(T.a)({},e,{asks:Object(T.a)({},e.asks,Object(N.a)({},r,{amount:l,count:c,price:r}))}):Object(T.a)({},e,{bids:Object(T.a)({},e.bids,Object(N.a)({},r,{amount:l,count:c,price:r}))})},B),Object(T.a)({},n,{channel:t.channel});case A:var a=Object(m.a)(t.payload[1],3),r=a[0],c=a[1],l=a[2];if(c>0){if(l>0)return Object(T.a)({},e,{bids:Object(T.a)({},e.bids,Object(N.a)({},r,{amount:l,count:c,price:r}))});if(l<0)return Object(T.a)({},e,{asks:Object(T.a)({},e.asks,Object(N.a)({},r,{amount:l,count:c,price:r}))})}else if(0===c){if(1===l){var o=Object(T.a)({},e.bids);return delete o[r],Object(T.a)({},e,{bids:o})}if(-1===l){var i=Object(T.a)({},e.asks);return delete i[r],Object(T.a)({},e,{asks:i})}}return Object(T.a)({},e);default:return e}},M=n(21),G={tBTCUSD:[]};var H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return Object(T.a)({},e,Object(N.a)({},t.payload.symbol,t.payload.trades));case h:return Object(T.a)({},e,Object(N.a)({},t.payload.symbol,[t.payload.newTrade].concat(Object(M.a)(e[t.payload.symbol].slice(0,-1)))));default:return e}},R=n(20),F=(n(39),{ticker:L,book:U,trades:H}),W=Object(P.c)(F),J=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||P.d,q=Object(P.e)(W,J(Object(P.a)(R.a))),K=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(b.a,{store:q},r.a.createElement("div",{className:"App"},r.a.createElement(f,null),r.a.createElement(S,null),r.a.createElement(_,null)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.e57d9010.chunk.js.map