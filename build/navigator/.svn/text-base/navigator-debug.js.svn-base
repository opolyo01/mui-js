/**
 * Navigator module
 * @module navigator
 */
(function() {

/**
 * The Navigator class provides the ability to map the hash part of the URL
 * to a particular view. The view must be a DOM element. If the DOM element 
 * has a x-mui-href attribute, that content will be loaded over XHR.
 * @class Navigator
 * @constructor
 */
function Navigator() {
    // Initialize properties
    this._mappings = {};
    this._regExpCache = {};
    
    // Initialize window
    
    if(typeof window.onhashchange !== 'undefined' && mui.UA.iPad) {
        // NOTE: onhaschange is causing serious problems on modal views. Need to revist it. back to timers.
        //mui.on(window, 'hashchange', this._checkWindow, this);
        mui.on(window, 'popstate', this._onHistoryPop, this);
    } 
    /*else {*/
        setInterval(mui.bind(this._checkWindow, this), 100);
    //}
}
    
Navigator.prototype = {
    
    /**
     * Store the current location (hash)
     * @param _hash
     * @type String
     * @private
     */
    _hash: null,
    
    
    /**
     * Store history urls to detect forward/back button 
     * @private
     */
    _popping: false,
    _history: [],
    _historyIdx: 0,
    _historyLength: 0,
    
    _onHistoryPop: function() {
        this._popping = true;
    },
    
    /**
     * @method _manageHistory
     * @private
     */
    _manageHistory: function( url ){
        var urlIndex = this._history.lastIndexOf( url ), urlFound = (urlIndex > -1),
            historyLength = this._history.length;
        
        if (urlFound && urlIndex == this._historyIdx - 1 && window.history.length < this._historyLength){ //  back button
            this._historyIdx = urlIndex;
            return true;
            
        } else if (urlFound && this._historyIdx < historyLength && urlIndex - 1 == this._historyIdx){ // forward button
            this._historyIdx = urlIndex;
        } else { // push new view
            if (this._historyIdx && historyLength != this._historyIdx + 1) {
               this._history.splice( this._historyIdx + 1, historyLength - this._historyIdx);  // remove elements 
               historyLength = this._history.length;
            }
            this._historyIdx = historyLength;
            this._history.push(url);
        }
        
        this._historyLength = window.history.length;
        
        return false;
    },
    
    /**
     * Check the window location against the current location
     * @method _checkWindow
     * @private
     */
    _checkWindow: function() { 
	   	if(this._hash && this._hash !== window.location.hash.substr(1)) {
			if(window.location.hash === ""){
				history.back();
			}
			else{
				this._hash = window.location.hash.substr(1);
	            this.openUrl(this._hash);
			}
        }
    },
    
    /**
     * XHR Transaction success handler.
     * @method _ioSuccess
     * @param o {XMLHttpRequest} The XHR object
     * @param newPage {HTMLElement} The DOM element for the showing view
     */
    _ioSuccess: function(o, newPage)  {    
        newPage.innerHTML = o.responseText;
    },
    
    /**
     * XHR Transaction failure handler.
     * @method _ioFailure
     * @param o {XMLHttpRequest} The XHR object
     * @param newPage {HTMLElement} The DOM element for the showing view
     */
    _ioFailure: function(o, newPage)  {    
        // @TODO
    },
    
    /**
     * Open a URL
     * @method openUrl
     * @param url {String} The url to open
     * @param quiet {Boolean} (Optional) If true, then this method only changes the URL hash and does nothing else.   
     * @param noHash {Boolean} (Optional) If true the url is opened but the hash is not changed in the URL.
     *                           Used to open initial url without letting the browser know  (bookmark issues)
     * @return {Navigator} The navigator instance
     */
    openUrl: function(url, quiet, noHash) { 
        // Quiet mode
        if(quiet === true) {        
            this._hash = window.location.hash = url;
            return this;
        }

        // Declare local variables
        var newPage, oldPages, paramStr, paramSpl, params, ioUrl = url, backButton;        
        
        // Check if we need to set the location of the window
        if(!noHash && (!this._hash || this._hash !== url)) {
            window.location.hash = this._hash = url;
            
            // If HTML5 history is supported, call replaceState in order to generate a popstate event
            if(typeof window.history.pushState == 'function') {
                window.history.replaceState(url, 'mui Navigator URL');
            }
        }
        
        if(url[0] === '/') url = url.substring(1);        

        if(typeof window.history.pushState == 'function') {
            backButton = this._popping;
        } else {
            backButton = this._manageHistory(url);
        }

        this._popping = false;
        
        // Check if parameters are in the URL
        // paramStr = /\?(.*)/g.exec(url);
        if(typeof this._regExpCache[url] === 'undefined') {        
            this._regExpCache[url] = url.match(/\?(.*)/);
        }
        paramStr = this._regExpCache[url];
        if(paramStr) {        
            params = {};
            paramStr = paramStr[1];
            url = url.substr(0, url.indexOf('?'));
            paramSpl = paramStr.split('&');
            mui.each(paramSpl, function(ps) {
                var s = ps.split('=');
                params[s[0]] = s[1];
            });
        }

        // Get new and old pages
        newPage = document.getElementById(url);
        oldPages = mui.getAll('.mui-view[x-mui-showing=true]');

        // Hide old page
        if(oldPages && newPage) {
            mui.each(oldPages, function(oldPage){        
                oldPage.removeAttribute('x-mui-showing');
                oldPage.style.display = 'none';
            });
        }        
        
        // Show new page
        if(newPage) {        
            newPage.setAttribute('x-mui-showing','true');
            newPage.style.display = 'block';
            if(newPage.getAttribute('x-mui-href') && !newPage.getAttribute('x-mui-loaded')) {            
                ioUrl = newPage.getAttribute('x-mui-href');
                if(paramStr) ioUrl += '?' + paramStr;
                newPage.setAttribute('x-mui-loaded','true');
                mui.io(ioUrl, {
                    callback: {
                        success: mui.bind(this._ioSuccess, this, newPage),
                        failure: mui.bind(this._ioFailure, this, newPage)
                    }
                });
            }
        }

        // Check if any callback is mapped to this URL
        if(this._mappings[url]) {        
            mui.each(this._mappings[url], function(m) { m(url, params, backButton); });
        }
        else if(this._mappings['*']) {        
            mui.each(this._mappings['*'], function(m) { m(url, params, backButton); });
        }
        
        return this;
    },
    
    /**
     * Map a URL path to a callback function
     * @method mapUrl
     * @param url {String} The url to map from
     * @param callback {Function} The function to map the URL to
     * @return {Navigator} The Navigator instance
     */
    mapUrl: function(url, callback) {    
        this._mappings[url] = this._mappings[url] || [];
        this._mappings[url].push(callback);
        return this;
    }
};

mui.Navigator = Navigator;

})();
