(function(){var a="/mui/build/",G=false,P=false,F=[],b=[],T={},Y=0,B=0,R=null,C=null;var d="mui",N="action-sheet",D="geo",W="navigation-bar",Z="navigator",A="pager",I="scroll-view",S="search-box",Q="storage",J="swipe-view",E="tab-view",c="transition",U="web-app",K={};K["mui"]={js:"mui.js",css:"reset.css"},K[N]={js:"ActionSheet.js",skins:["default"]},K[D]={js:"Geo.js"},K[W]={js:"NavigationBar.js",skins:["default"]},K[Z]={js:"Navigator.js"},K[A]={js:"Pager.js",skins:["default"]},K[I]={js:"ScrollView.js"},K[S]={js:"SearchBox.js",skins:["default"]},K[Q]={js:"Storage.js"},K[J]={js:"SwipeView.js"},K[E]={js:"TabView.js",skins:["default"]},K[c]={js:"Transition.js"},K[U]={skins:["default"],required:["storage","navigator","navigation-bar"],submodules:{"application-controller":{js:"ApplicationController.js"},"navigation-controller":{js:"NavigationController.js"},"view-controller":{js:"ViewController.js"}}};function V(h,f){var g=document.createElement("script");g.type="text/javascript";g.src=h;if(f){g.addEventListener("load",f,false);}document.getElementsByTagName("head")[0].appendChild(g);}function X(g){var f=document.createElement("link");f.setAttribute("rel","stylesheet");f.setAttribute("type","text/css");f.setAttribute("href",g);document.getElementsByTagName("head")[0].appendChild(f);}function O(l,j){if(j){B++;}else{Y++;}var f=j?b:F;var g=j?B:Y;var h=arguments;if(Y===F.length&&B===b.length&&R){R.call(C||R);}else{if(g<f.length){var i=f[g];var k;if(typeof i==="string"){M(i,j);}else{if(typeof i==="object"&&i.path){k=i.path;V(k,mui.bind(O,window,h[1]));}}}}}function M(h,i){var g=K[h];var j,f;if(!g){return false;}if(P){if(g.js){j=a+h+"/js/"+g.js;V(j,mui.bind(O,window,i));}else{if(g.submodules){mui.iterate(g.submodules,function(k,l){j=a+h+"/js/"+k.js;V(j,mui.bind(O,window,i));});}}if(g.skins){mui.each(g.skins,function(k){f=a+h+"/assets/skins/"+k+"/"+h+"-skin.css";X(f);});}}else{j=a+h+"/"+h;j+=G?".js":"-min.js";V(j,mui.bind(O,window,i));}}function e(f){var i=d;var h=K[i];var j,g;if(P){j=a+i+"/js/"+h.js;}else{j=a+i+"/"+i;j+=G?".js":"-min.js";g=a+i+"/"+i+"/assets/reset.css";}g=a+i+"/assets/reset.css";X(g);V(j,f);}function H(l,n){var o=false;for(var k=0,f=n.length;k<f;k++){var m=n[k].requires;if(m){for(var h=0,g=m.length;h<g;h++){if(m[h].module===l.module){o=true;break;}}}}return o;}function L(g,f){f=f||{};f.callback=f.callback||{};a=f.base||a;R=f.callback.complete;C=f.callback.scope;G=(f.debug===true)?true:false;P=(f.developmentMode===true)?true:false;e(function(){mui.each(g,function(h){if(!K[h].required){b.push(h);}else{mui.each(K[h].required,function(i){F.push(i);});F.push(h);}});if(f.extras){if(f.extras.js){mui.each(f.extras.js,function(h){if(!h.requires&&!H(h,f.extras.js)){b.push(h);}else{if(h.requires){mui.each(h.required,function(l){for(var k=0,j=f.extras.js.length;k<j;k++){if(f.extras.js[k].module===l){F.push(f.extras.js[k]);break;}}});F.push(h);}else{F.push(h);}}});}if(f.extras.css){mui.each(f.extras.css,mui.bind(X,window));}}M(F[0],false);M(b[0],true);});}mui=window.mui||{};mui.load=L;})();