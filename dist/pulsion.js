!function(){"use strict";var n=new WebSocket("ws://localhost:3000/ws"),o=function(o){console.log("sending: "+o),n.send(o)};n.onopen=function(n){console.log("connection to server opened"),o("this is my connection message")}}();
//# sourceMappingURL=pulsion.js.map
