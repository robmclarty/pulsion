"use strict";var send=function(n){return function(e){console.log("sending: "+e),n.send(e)}},on=function(n){return function(e,o){switch(e){case"open":n.onopen=o;case"close":n.onclose=o}}},init=function(n){var e=n.url,o=void 0===e?"":e,i=new window.WebSocket(o);return{on:on(i),send:send(i)}},index={init:init};module.exports=index;
//# sourceMappingURL=pulsion.js.map
