(function(){const J=400;const A=150;const H=0.98;const E=1;const K=0.7;const S=150;const D=0;const O=10;const N=0.3;const P=60*0.001;const F=100;const I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==";const Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAYAAAACEPQxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgSGMCEgzYCIAAAwALEABx0pRbLAAAAABJRU5ErkJggg==";var C=null;var B=0;var L=0;var G=null;function R(T){T=T||{};if(!T.element){throw new Error("Must pass valid 'element' to ScrollView constructor");}this.element=mui.get(T.element);this.size=T.size||"100%";this.sizes=T.sizes||null;this.axis=T.axis||"y";this.pagingEnabled=T.pagingEnabled||false;if(this.pagingEnabled){this.axis="x";}if(this.pagingEnabled&&T.paginator){this.paginator=T.paginator;}if(this.axis==="x"){this.scrollsHorizontal=true;}else{this.scrollsVertical=true;}this.showsHorizontalScrollIndicator=T.showsHorizontalScrollIndicator===false?false:true;this.showsVerticalScrollIndicator=T.showsVerticalScrollIndicator===false?false:true;this.alwaysBounceVertical=T.alwaysBounceVertical===true?true:false;this.alwaysBounceHorizontal=T.alwaysBounceHorizontal===true?true:false;this.callback=T.callback||{};this.removeEventBindingsOnDetach=T.removeEventBindingsOnDetach||false;this.initialize();}function M(V){var U=[0,0,0];var T=V.style.webkitTransform;var W=T.replace(/translate(3d)?\(/,"").split(",");if(W.length>1){U[0]=parseInt(W[0]);U[1]=parseInt(W[1]);U[2]=parseInt(W[2]);}return U;}R.prototype={handleEvent:function(T){switch(T.type){case"webkitTransitionEnd":this.onTransitionEnd(T);break;case"touchstart":case"mousedown":this.onTouchStart(T);break;case"touchmove":case"mousemove":this.onTouchMove(T);break;case"touchend":case"mouseup":this.onTouchEnd(T);break;case"click":this.onClick(T);break;}},_calculatePageOffsets:function(){var U=this.element,W=this.paginator.pageSelector,T,V=[];T=W?mui.getAll(W,U):U.children;mui.each(T,function(Y,X){Y.style.width=this.size+"px";V.push(Y.offsetLeft);},this);this._minPoints=V;if(this._minPoints.length===1){this._minPoints.push(this._minPoints[this._minPoints.length-1]);}this.touchInfo.minPosX=-this._minPoints[this.paginator.currentPage-2];this.touchInfo.maxPosX=-this._minPoints[this.paginator.currentPage-1];},setSize:function(T){this.size=T;if(this.axis==="x"){this.element.style.width=this.size+"px";}else{if(this.axis==="y"){this.element.style.height=this.size+"px";}}},retrieveSize:function(){if(!this.autoresize&&!this.sizes){return false;}if(!this.sizes){if(this.element.parentNode){if(this.axis==="y"){this.size=this.element.parentNode.offsetHeight;if(this.size==0){this.adjustSize();}}else{this.size=this.element.parentNode.offsetWidth;if(this.size==0){this.adjustSize();}}}else{this.size=(this.axis==="x")?window.innerWidth:window.innerHeight;}}else{this.size=(window.innerWidth>=1024)?this.sizes.landscape:this.sizes.portrait;}if(this.axis==="x"){this.element.style.width=this.size+"px";}else{this.element.style.height=this.size+"px";}if(this.pagingEnabled){this._minPoints=null;this._calculatePageOffsets();this.scrollTo(this.touchInfo.maxPosX,this.touchInfo.translations[1].y);}},adjustSize:function(){var U=this.element.parentNode.cloneNode(true),T=document.body.className;U.style.display="block";document.body.className="";document.body.appendChild(U);if(this.axis==="x"){this.element.style.width="";this.size=U.offsetWidth;}else{if(this.axis==="y"){this.element.style.height="";this.size=U.offsetHeight;}}document.body.removeChild(U);if(T){document.body.className=T;}},onOrientationChange:function(){if(!this.autoresize&&!this.sizes){return false;}if(this.axis==="x"){this.element.style.width="";}else{if(this.axis==="y"){this.element.style.height="";}}this.retrieveSize();},onTransitionEnd:function(T){if(this.pagingEnabled){this.updatePage();}G=setTimeout(mui.bind(this.hideScrollBars,this,true),F);},onClick:function(T){if(!T._faux){T.preventDefault();T.stopPropagation();}},onTouchStart:function(U){if(!U.touches||(U.touches&&U.touches.length==1)){this.killTimer(true);this.scrollingX=false;this.scrollingY=false;var X=mui.getAncestorByClassName(U.target,"mui-scrollview-host",this.scrollHost),V=mui.getAncestorByClassName(U.target,"mui-userselect",this.scrollHost);if(X!==this.scrollHost){this.nestedScrollTarget=true;}else{this.nestedScrollTarget=false;}mui.on(document,"touchend",this,true);this.touchInfo.target=U.target;if(this.touchInfo.stopScroll){return false;}var W=U.touches?U.touches[0]:U;this.touchInfo.startTime=(new Date()).getTime();this.touchInfo.pageX=W.clientX;this.touchInfo.pageY=W.clientY;this.touchInfo.startClientPosX=W.clientX;this.touchInfo.startClientPosY=W.clientY;this.touchInfo.isTouching=false;this.touchInfo.isDragging=false;if((!V||U.target.parentNode.tagName=="A")&&((!(U.target instanceof HTMLInputElement)&&!(U.target instanceof HTMLTextAreaElement))||(U.target.getAttribute&&U.target.getAttribute("type")=="checkbox"))){U.preventDefault();}var T=this.touchInfo.target;while(T&&!(T instanceof HTMLAnchorElement)){T=T.parentElement;}if(T&&T.getAttribute("rel")=="nofollow"){U.preventDefault();}mui.on(this.element,"touchmove",this);}},onTouchMove:function(d){if(this.touchInfo.stopScroll){return;}var c=(new Date()).getTime();if(c<this.touchInfo.startTime){return;}if(!this.touchInfo.isTouching&&!(d.target instanceof HTMLInputElement)&&(!d.touches||(d.touches&&d.touches.length==1))){this.killTimer(true);var Z=mui.get("header");var f=mui.get("footer");var g=this.scrollHost.scrollHeight;var a=this.scrollHost.scrollWidth;var T=mui.getStyle(this.scrollHost,"-webkit-transform").replace(")","").split(",");var b=0;var Y=0;if(T.length===1){b=Y=0;}else{if(T.length===6){b=Number(T[4]);Y=Number(T[5]);}else{b=Number(T[12]);Y=Number(T[13]);}}this.touchInfo.startPosX=this.touchInfo.startClientPosX-b;this.touchInfo.startPosY=this.touchInfo.startClientPosY-Y;this.touchInfo.isTouching=true;
this.touchInfo.isDragging=false;if(this.scrollsVertical){var X=-g;this.touchInfo.maxPosY=X+this.size;if(Z){this.touchInfo.maxPosY=X+(window.innerHeight-Z.offsetHeight);}if(Z&&f){this.touchInfo.maxPosY=X+(window.innerHeight-Z.offsetHeight-f.offsetHeight);}if(Math.abs(X)<=this.touchInfo.maxPosY||this.touchInfo.maxPosY>0){this.touchInfo.maxPosY=0;}this.scrollsHorizontal=false;if(a>this.element.offsetWidth){this.scrollsHorizontal=true;if(!this.scrollBarHorizontal){this.initScrollBars();}}this.touchInfo.scrollHeight=g;}if(this.scrollsHorizontal){if(this.scrollsVertical){this.touchInfo.maxPosX=(a-this.element.offsetWidth)*-1;}else{if(this.pagingEnabled){if(!this._minPoints){this._calculatePageOffsets();}if(this._minPoints[this.paginator.currentPage-1]>=0){this.touchInfo.minScrollX=this._minPoints[this.paginator.currentPage-1];}else{this.touchInfo.minScrollX=this._minPoints[this.paginator.currentPage];}this.touchInfo.maxScrollX=this._minPoints[this.paginator.currentPage+1];}else{this.touchInfo.minPosX=0;this.touchInfo.maxPosX=(a-this.size)*-1;if(a<this.size){this.touchInfo.maxPosX=0;}}}}}if(this.touchInfo.isTouching){if(!d.touches||(d.touches&&d.touches.length===1)){var W=d.touches?d.touches[0]:d;var V=W.clientX-this.touchInfo.startPosX;var U=W.clientY-this.touchInfo.startPosY;this.touchInfo.isDragging=true;if(!this.scrollsHorizontal){V=0;}if(!this.scrollsVertical){U=0;}if(!this.scrollingX&&Math.abs(W.clientY-this.touchInfo.startClientPosY)>O){this.scrollingY=true;}else{if(!this.scrollingY&&Math.abs(W.clientX-this.touchInfo.startClientPosX)>O){this.scrollingX=true;}}d.preventDefault();if(!(this.scrollsHorizontal&&this.scrollsVertical)&&((!this.scrollingY&&this.scrollsVertical)||(!this.scrollingX&&this.scrollsHorizontal))){return false;}if(this.touchInfo.scrollHeight<this.size){return false;}if(this.scrollsVertical){if(U>0){U*=N;}else{if(U<this.touchInfo.maxPosY){U-=2*((U-this.touchInfo.maxPosY)*N);}}}if(this.scrollsHorizontal){if(V>0){V*=N;}else{if(V<this.touchInfo.maxPosX){V-=((V-this.touchInfo.maxPosX)*N);}}}if(this.scrollsVertical&&this.scrollsHorizontal){if(this.nestedScrollTarget){return;}if(Math.abs(W.clientX-this.touchInfo.startClientPosX)<=10){this.touchInfo.lockToAxis="y";}else{if(Math.abs(W.clientY-this.touchInfo.startClientPosY)<=10){this.touchInfo.lockToAxis="x";}}if(this.touchInfo.lockToAxis==="y"){V=this.touchInfo.translations[1].x;}else{if(this.touchInfo.lockToAxis="x"){U=this.touchInfo.translations[1].y;}}if(V>0){V=0;}else{if(V<this.touchInfo.maxPosX){V=this.touchInfo.maxPosX;}}}this.touchInfo.endClientPosX=W.clientX;this.touchInfo.endClientPosY=W.clientY;this.touchInfo.lastMoved=(new Date()).getTime();this.scrollTo(V,U,0);}}},onTouchEnd:function(Y){mui.removeEventListener(this.element,"touchmove",this);setTimeout(mui.bind(function(){mui.removeEventListener(document,"touchend",this,true);},this),0);if(!this.touchInfo.isDragging){if(this.nestedScrollTarget){return;}var W=document.createEvent("MouseEvent");W._faux=true;W.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,0,0,0,0,0,0,null);this.touchInfo.target.dispatchEvent(W);G=setTimeout(mui.bind(this.hideScrollBars,this,true),F);this.touchInfo.lockToAxis=null;return;}if(!this.pagingEnabled&&(+(new Date)-this.touchInfo.lastMoved>75||(this.scrollingY&&Math.abs(this.touchInfo.translations[1].y-this.touchInfo.translations[0].y)<=O)||(this.scrollingX&&Math.abs(this.touchInfo.translations[1].x-this.touchInfo.translations[0].x)<=O))){if(this.scrollsVertical&&this.touchInfo.translations[1].y>0){this.scrollTo(this.touchInfo.translations[1].x,0,300);}else{if(this.scrollsVertical&&this.touchInfo.translations[1].y<this.touchInfo.maxPosY){this.scrollTo(this.touchInfo.translations[1].x,this.touchInfo.maxPosY,300);}else{if(this.scrollsHorizontal&&this.touchInfo.translations[1].x>0){this.scrollTo(0,this.touchInfo.translations[1].y,300);}else{if(this.scrollsHorizontal&&this.touchInfo.translations[1].x<this.touchInfo.maxPosX){this.scrollTo(this.touchInfo.maxPosX,this.touchInfo.translations[1].y,300);}}}}G=setTimeout(mui.bind(this.hideScrollBars,this,true),F);this.touchInfo.lockToAxis=null;return;}if(this.scrollsVertical&&this.touchInfo.lockToAxis==="x"){this.touchInfo.lockToAxis=null;return;}var V=this.touchInfo.translations[1];var U=this.scrollsVertical?this.touchInfo.startClientPosY:this.touchInfo.startClientPosX;var T=this.scrollsVertical?Y.clientY:Y.clientX;var Z=U-T;var X=+(new Date)-this.touchInfo.startTime;B=Z/X;L=B;this.decelerationConst=H;if(this.pagingEnabled){this.decelerationConst=E;if(B>0){if(this.paginator.currentPage<=this.paginator.pages-1){this.nextPage();}else{this.scrollTo(this.touchInfo.maxPosX,this.touchInfo.translations[1].y,400,"ease-out");}}else{if(this.paginator.currentPage>1){this.prevPage();}else{this.scrollTo(0,this.touchInfo.translations[1].y,400,"ease-out");}}return;}C=setInterval(mui.bind(this.animateScroll,this),P);this.touchInfo.lockToAxis=null;},animateScroll:function(){var V=false;var a;var Y={x:this.touchInfo.translations[1].x,y:this.touchInfo.translations[1].y};var Z=this.scrollsVertical?this.touchInfo.translations[1].y:this.touchInfo.translations[1].x;var U=this.scrollsVertical?this.touchInfo.maxPosY:this.touchInfo.maxPosX;var T=this.scrollsVertical?this.touchInfo.minPosY:this.touchInfo.minPosX;var W=(this.pagingEnabled)?D:S;var X=(this.pagingEnabled)?A:J;B*=this.decelerationConst;a=B*P*X;if(this.scrollsVertical){Y.y-=Math.floor(a);}else{if(this.scrollsHorizontal){Y.x-=Math.floor(a);}}if(this.scrollsVertical&&Y.y>0){B*=K;if(!this._didScrollPastLowerBoundary){this._didScrollPastLowerBoundary=true;}if(Y.y>W){V=true;this.killTimer();Y.y=W;}}else{if(this.scrollsHorizontal&&Y.x>0){B*=K;if(!this._didScrollPastLowerBoundary){this._didScrollPastLowerBoundary=true;}if(Y.x>W){V=true;this.killTimer();Y.x=W;}}else{if(this.scrollsVertical&&Y.y<U){B*=K;if(!this._didScrollPastUpperBoundary){this._didScrollPastUpperBoundary=true;}if(Y.y<(this.touchInfo.maxPosY-W)){V=true;this.killTimer();Y.y=this.touchInfo.maxPosY-W;
}}else{if(this.scrollsHorizontal&&Y.x<U){B*=K;if(!this._didScrollPastUpperBoundary){this._didScrollPastUpperBoundary=true;}if(Y.x<(this.touchInfo.maxPosX-W)){V=true;this.killTimer();Y.x=this.touchInfo.maxPosX-W;}}}}}if(Math.abs(B.toFixed(4))<0.015){V=true;B=0;this.killTimer();}if(!V){this.scrollTo(Y.x,Y.y,0);}},killTimer:function(U){var T={x:this.touchInfo.translations[1].x,y:this.touchInfo.translations[1].y};clearInterval(C);if(this._didScrollPastLowerBoundary){if(this.scrollsVertical){T.y=0;}if(this.scrollsHorizontal&&!this.scrollsVertical){T.x=0;}this.scrollTo(T.x,T.y,400,"ease-out");this._didScrollPastLowerBoundary=false;}else{if(this._didScrollPastUpperBoundary){if(this.scrollsVertical){T.y=this.touchInfo.maxPosY;}if(this.scrollsHorizontal&&!this.scrollsVertical){T.x=this.touchInfo.maxPosX;}this.scrollTo(T.x,T.y,400,"ease-out");this._didScrollPastUpperBoundary=false;}else{if(this.pagingEnabled&&!U){this.updatePage();}G=setTimeout(mui.bind(this.hideScrollBars,this,true),F);}}},updatePage:function(){if(this.paginator.element){for(var T=0;T<this.paginator.pages;T++){var U=this.paginator.element.children[T];if(T===this.paginator.currentPage-1){mui.addClass(U,"mui-active");}else{mui.removeClass(U,"mui-active");}}}if(this.paginator.callback&&this.paginator.callback.pageChange){this.paginator.callback.pageChange(this.paginator.currentPage);}},nextPage:function(T){var U=(T===false)?0:400;if(this.paginator.currentPage>=this.paginator.pages){return false;}this.paginator.currentPage++;if(!this._minPoints){this._calculatePageOffsets();}this.touchInfo.minPosX=-this._minPoints[this.paginator.currentPage-2];this.touchInfo.maxPosX=-this._minPoints[this.paginator.currentPage-1];this.scrollTo(this.touchInfo.maxPosX,this.touchInfo.translations[1].y,U,"ease-out");if(!U){this.updatePage();}},prevPage:function(T){var U=(T===false)?0:400;if(this.paginator.currentPage<=1){return false;}this.paginator.currentPage--;if(!this._minPoints){this._calculatePageOffsets();}this.touchInfo.minPosX=-this._minPoints[this.paginator.currentPage];this.touchInfo.maxPosX=-this._minPoints[this.paginator.currentPage-1];this.scrollTo(this.touchInfo.maxPosX,this.touchInfo.translations[1].y,U,"ease-out");if(!U){this.updatePage();}},scrollTo:function(T,Y,V,W,U){var X="translate("+T+"px, "+Y+"px)";if(mui.UA.Safari){X="translate3d("+T+"px,"+Y+"px,0)";}clearTimeout(G);if(!U){this.showScrollBars();}this.touchInfo.translations.splice(0,1);this.touchInfo.translations.push({x:T,y:Y});W=W||"cubic-bezier(0, 0.1, 0, 1.0)";V=V||0;if(V==0){mui.setStyle(this.scrollHost,"-webkit-transition-timing-function",null);mui.setStyle(this.scrollHost,"-webkit-transition-duration",null);}else{mui.setStyle(this.scrollHost,"-webkit-transition-timing-function",W);mui.setStyle(this.scrollHost,"-webkit-transition-duration",V+"ms");}mui.setStyle(this.scrollHost,"-webkit-transform",X);if(!U){this.updateScrollBars(V);}if(typeof this.callback.scroll==="function"){this.callback.scroll(T,Y);}},lockScroll:function(){this.touchInfo.stopScroll=true;},unlockScroll:function(){this.touchInfo.stopScroll=false;},isLocked:function(){return this.touchInfo.stopScroll;},getElement:function(){return this.element;},getScrollHost:function(){return this.scrollHost;},getScrollOffsets:function(){var T={x:0,y:0};var U=M(this.scrollHost);T.x=U[0];T.y=U[1];return T;},renderTexture:function(){var Y=0;var T=this.scrollHost.scrollHeight;var X=this.scrollHost;var V=window.innerWidth-1;var U=M(X)[1];X.style.width=window.innerWidth+"px";X.style.webkitTransitionDuration="0s";X.style.webkitTransform="translate3d(-"+V+"px, "+U+"px, 0)";var W=setInterval(function(){Y+=window.innerHeight;X.style.webkitTransform="translate3d(-"+V+"px, -"+Y+"px, 0)";if(Y>=T){clearInterval(W);X.style.webkitTransitionDuration="";X.style.webkitTransform="translate3d(0, "+U+"px, 0)";X.style.width="";}},0);},updateScrollBars:function(X){var W=0;var Y=1;var U;var V=this.scrollHost.scrollHeight;var T=this.scrollHost.scrollWidth;if(!this._showingScrollBars){this.showScrollBars();}if(this.scrollBarVertical&&V<=this.size){this.hideScrollBars();return;}if(this.scrollBarVertical){W=Math.floor(this.size*(this.size/V));Y=Math.floor((this.touchInfo.translations[1].y/(V-this.size))*(this.size-W))*-1;if(W>this.size){W=1;}U="translate3d(0, "+Y+"px, 0)";if(Y>(this.size-W)){W=W-(Y-(this.size-W));}if(Y<0){U="translate3d(0,0,0)";W=W+Y;}X=X||0;if(this.verticalScrollSize!=(W-8)){this.verticalScrollSize=(W-8);mui.setStyles(this.scrollBarVertical.children[1],{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":"translate3d(0,0,0) scaleY("+(W-8)+")","-webkit-transition-duration":(X>0?X+"ms":null)});}mui.setStyles(this.scrollBarVertical,{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":U,"-webkit-transition-duration":(X>0?X+"ms":null)});mui.setStyles(this.scrollBarVertical.children[2],{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":"translate3d(0,"+(W-10)+"px,0)","-webkit-transition-duration":(X>0?X+"ms":null)});}if(this.scrollBarHorizontal){W=Math.floor(this.size*(this.size/T));Y=Math.floor((this.touchInfo.translations[1].x/(T-this.size))*(this.size-W))*-1;if(W>this.size){W=1;}U="translate3d("+Y+"px, 0, 0)";if(Y>(this.size-W)){W=W-(Y-(this.size-W));}if(Y<0){U="translate3d(0,0,0)";W=W+Y;}X=X||0;if(this.horizontalScrollSize!=(W-16)){this.horizontalScrollSize=(W-16);mui.setStyles(this.scrollBarHorizontal.children[1],{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":"translate3d(0,0,0) scaleX("+this.horizontalScrollSize+")","-webkit-transition-duration":(X>0?X+"ms":null)});}mui.setStyles(this.scrollBarHorizontal,{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":U,"-webkit-transition-duration":X+"ms"});mui.setStyles(this.scrollBarHorizontal.children[2],{"-webkit-transition-property":(X>0?"-webkit-transform":null),"-webkit-transform":"translate3d("+(W-12)+"px,0,0)","-webkit-transition-duration":(X>0?X+"ms":null)});
}},hideScrollBars:function(T){this._showingScrollBars=false;if(T&&this.scrollBarVertical){mui.setStyle(this.scrollBarVertical,"-webkit-transition","opacity .6s");}if(T&&this.scrollBarHorizontal){mui.setStyle(this.scrollBarHorizontal,"-webkit-transition","opacity .6s");}if(this.scrollBarVertical){mui.removeClass(this.scrollBarVertical,"mui-showing");}if(this.scrollBarHorizontal){mui.removeClass(this.scrollBarHorizontal,"mui-showing");}},showScrollBars:function(T){this._showingScrollBars=true;if(T&&this.scrollBarVertical){mui.setStyle(this.scrollBarVertical,"-webkit-transition","opacity .6s");}if(T&&this.scrollBarHorizontal){mui.setStyle(this.scrollBarHorizontal,"-webkit-transition","opacity .6s");}if(this.scrollBarVertical){mui.addClass(this.scrollBarVertical,"mui-showing");}if(this.scrollBarHorizontal){mui.addClass(this.scrollBarHorizontal,"mui-showing");}},flashScrollBars:function(){if(this.scrollBarVertical&&this.scrollHost.scrollHeight>this.size){if(!this._flashedScrollBars){this._flashedScrollBars=true;this.updateScrollBars();}this.showScrollBars(true);setTimeout(mui.bind(this.hideScrollBars,this),800);}},initScrollBars:function(){if(!this._initializedScrollBars){this._initializedScrollBars=true;}if(this.showsVerticalScrollIndicator&&this.scrollsVertical&&!this.scrollBarVertical){this.scrollBarVertical=mui.createElement("div",{className:"mui-scrollbar mui-vertical",innerHTML:'<b class="mui-child mui-b"></b><img class="mui-child mui-img" src="'+I+'" alt="" /><b class="mui-child mui-b"></b>'});this.wrapper.appendChild(this.scrollBarVertical);}if(this.showsHorizontalScrollIndicator&&this.scrollsHorizontal&&!this.scrollBarHorizontal){this.scrollBarHorizontal=mui.createElement("div",{className:"mui-scrollbar mui-horizontal",innerHTML:'<b class="mui-child mui-b"></b><img class="mui-child mui-img" src="'+Q+'" alt="" /><b class="mui-child mui-b"></b>'});this.wrapper.appendChild(this.scrollBarHorizontal);}},initPager:function(){if(this.paginator&&this.paginator.pageSelector){var U=8;mui.each(mui.getAll(this.paginator.pageSelector,this.element),function(W){W.style.display="inline-block";W.style.width=this.size+"px";U+=this.size;if(mui.UA.Apple){W.style.webkitTransform="translate3d(0,0,0)";}},this);this.scrollHost.style.width=U+"px";this.element.style.whiteSpace="nowrap";this.touchInfo.maxPos=-(U)+this.size;}if(this.paginator){this.paginator.pages=this.paginator.pages||mui.getAll(this.paginator.pageSelector,this.element).length;this.paginator.currentPage=this.paginator.currentPage||1;if(this.paginator.element){this.paginator.element=mui.get(this.paginator.element);mui.addClass(this.paginator.element,"mui-paginator");this.paginator.element.innerHTML="";for(var T=0;T<this.paginator.pages;T++){var V=mui.createElement("span",{className:"mui-paginator-page"});if(T===this.paginator.currentPage-1){mui.addClass(V,"mui-active");}this.paginator.element.appendChild(V);}mui.on(this.paginator.element,"click",this);}}},initialize:function(){this.touchInfo={target:null,pageX:0,pageY:0,isTouching:false,isDragging:false,startPosX:0,startPosY:0,translations:[{x:0,y:0},{x:0,y:0}],lastMoved:0,maxPos:0,stopScroll:false};this.wrapper=mui.createElement("div");this.wrapper.style.position="relative";this.wrapper.style.webkitTransform="translate3d(0,0,0)";this.scrollHost=mui.createElement("div");this.scrollHost.className="mui-scrollview-host";this.wrapper.appendChild(this.scrollHost);var X=[];for(var U=0,T=this.element.childNodes.length;U<T;U++){X.push(this.element.childNodes[U]);}for(var U=0,T=X.length;U<T;U++){this.scrollHost.appendChild(X[U]);}this.element.appendChild(this.wrapper);if(this.size){if(this.size==="100%"){this.autoresize=true;mui.on(window,"orientationchange",mui.bind(this.onOrientationChange,this));if(this.element.parentNode){this.size=(this.axis==="x")?this.element.parentNode.offsetWidth:this.element.parentNode.offsetHeight;}else{this.size=(this.axis==="x")?window.innerWidth:window.innerHeight;}if(this.axis!=="x"){var V=mui.get("body > header"),W=mui.get("body > footer");if(V){this.height-=V.offsetHeight;}if(W){this.height-=W.offsetHeight;}if(this.size===0){this.size=window.innerHeight;}if(V){this.size=this.size-V.offsetHeight;}if(W){this.size=this.size-W.offsetHeight;}}}if(this.axis==="x"){this.element.style.width=this.size+"px";this.element.style.overflowX="hidden";}else{if(this.sizes){if(window.innerWidth>=1024){this.element.style.height=this.sizes.landscape+"px";this.size=this.sizes.landscape;}else{this.element.style.height=this.sizes.portrait+"px";this.size=this.sizes.portrait;}}else{this.element.style.height=this.size+"px";}this.element.style.overflowY="hidden";}}if(this.wrapper.scrollWidth>this.element.parentNode.scrollWidth){this.scrollsHorizontal=true;}if(this.pagingEnabled){this.initPager();}if(this.showsVerticalScrollIndicator||this.showsHorizontalScrollIndicator){this.initScrollBars();}if(this.paginator&&this.paginator.currentPage>1){this.paginator.currentPage--;this.nextPage(false);}else{this.scrollTo(0,0,0);}if(this.size==0){this.adjustSize();}mui.on(this.element,"touchstart",this);mui.on(this.element,"webkitTransitionEnd",this);mui.on(this.element,"click",this,this,true);if(this.removeEventBindingsOnDetach){this.element.addEventListener("DOMNodeRemovedFromDocument",mui.bind(function(){mui.removeEventListener(this.element,"touchstart",this);mui.removeEventListener(this.element,"touchmove",this);mui.removeEventListener(document,"touchend",this,true);},this),false);}}};mui.ScrollView=R;})();