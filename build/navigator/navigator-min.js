(function(){function A(){this._mappings={};this._regExpCache={};if(typeof window.onhashchange!=="undefined"&&mui.UA.iPad){mui.on(window,"popstate",this._onHistoryPop,this);}setInterval(mui.bind(this._checkWindow,this),100);}A.prototype={_hash:null,_popping:false,_history:[],_historyIdx:0,_historyLength:0,_onHistoryPop:function(){this._popping=true;},_manageHistory:function(C){var D=this._history.lastIndexOf(C),E=(D>-1),B=this._history.length;if(E&&D==this._historyIdx-1&&window.history.length<this._historyLength){this._historyIdx=D;return true;}else{if(E&&this._historyIdx<B&&D-1==this._historyIdx){this._historyIdx=D;}else{if(this._historyIdx&&B!=this._historyIdx+1){this._history.splice(this._historyIdx+1,B-this._historyIdx);B=this._history.length;}this._historyIdx=B;this._history.push(C);}}this._historyLength=window.history.length;return false;},_checkWindow:function(){if(this._hash&&this._hash!==window.location.hash.substr(1)){if(window.location.hash===""){history.back();}else{this._hash=window.location.hash.substr(1);this.openUrl(this._hash);}}},_ioSuccess:function(C,B){B.innerHTML=C.responseText;},_ioFailure:function(C,B){},openUrl:function(C,E,I){if(E===true){this._hash=window.location.hash=C;return this;}var D,H,G,K,F,B=C,J;if(!I&&(!this._hash||this._hash!==C)){window.location.hash=this._hash=C;if(typeof window.history.pushState=="function"){window.history.replaceState(C,"mui Navigator URL");}}if(C[0]==="/"){C=C.substring(1);}if(typeof window.history.pushState=="function"){J=this._popping;}else{J=this._manageHistory(C);}this._popping=false;if(typeof this._regExpCache[C]==="undefined"){this._regExpCache[C]=C.match(/\?(.*)/);}G=this._regExpCache[C];if(G){F={};G=G[1];C=C.substr(0,C.indexOf("?"));K=G.split("&");mui.each(K,function(M){var L=M.split("=");F[L[0]]=L[1];});}D=document.getElementById(C);H=mui.getAll(".mui-view[x-mui-showing=true]");if(H&&D){mui.each(H,function(L){L.removeAttribute("x-mui-showing");L.style.display="none";});}if(D){D.setAttribute("x-mui-showing","true");D.style.display="block";if(D.getAttribute("x-mui-href")&&!D.getAttribute("x-mui-loaded")){B=D.getAttribute("x-mui-href");if(G){B+="?"+G;}D.setAttribute("x-mui-loaded","true");mui.io(B,{callback:{success:mui.bind(this._ioSuccess,this,D),failure:mui.bind(this._ioFailure,this,D)}});}}if(this._mappings[C]){mui.each(this._mappings[C],function(L){L(C,F,J);});}else{if(this._mappings["*"]){mui.each(this._mappings["*"],function(L){L(C,F,J);});}}return this;},mapUrl:function(B,C){this._mappings[B]=this._mappings[B]||[];this._mappings[B].push(C);return this;}};mui.Navigator=A;})();