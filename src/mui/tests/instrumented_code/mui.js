if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["js/mui.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/Library/WebServer/Documents/trunk/src/mui/js/mui.js",
    code: []
};
_yuitest_coverage["js/mui.js"].code=["(function() {","","/*"," * mui Library"," * A miniature javascript suitable for use on mobile devices."," */","mui = {};","","/**"," * Utility methods"," * @module util"," **/","var util = {","    ","    /**","     * Utility class","     * @class Utility","     * @static","     */","","    /*","     * Private attribute to store the current log level","     * @final _logLevel","     * @type Number","     * @private","     */","    _logLevel: 0,","","    /**","     * Log a message or object to the console.","     * @method log","     * @param o {String|Object} The string or object to log to the debug console.","     **/        ","    log: function(o) ","    {","        document.defaultView.console ? console.log(o) : '';","    },","    ","    /**","     * Log a trace message or object to the console.","     * @method trace    ","     * @param o {String|Object} The string or object to log to the debug console.","     **/","    trace: function(o)","    {","        if(this._logLevel >= 3) this.log.apply(this, arguments);","    },","    ","    /**","     * Log a debug message or object to the console.","     * @method debug    ","     * @param o {String|Object} The string or object to log to the debug console.","     **/","    debug: function(o)","    {","        if(this._logLevel >= 2) this.log.apply(this, arguments);","    },","    ","    /**","     * Log a warning message or object to the console.","     * @method warn    ","     * @param o {String|Object} The string or object to log to the debug console.","     **/","    warn: function(o)","    {","        if(this._logLevel >= 1) this.log.apply(this, arguments);","    },","    ","    /**","     * Log an error.  If second argument passed is true,","     * this throws an exception.","     * @method error","     * @param o {String} The error string","     * @param throwError {Boolean} If true, throw an exception.","     */","    error: function(o, throwError)","    {","        if(this._logLevel >= 0) this.log.apply(this, arguments);        ","        if(throwError) throw new Error(o);","    },","    ","    /**","     * The log level allows you to set the appropriate logging level","     * for your application","     * @method setLogLevel ","     * @param level {String} The desired log level","     */","    setLogLevel: function(level)","    {","        var intLevel = 0;","        switch(level)","        {","            case 'trace':","                intLevel = 3;","                break;","            case 'debug':","                intLevel = 2;","                break;","            case 'warn':","                intLevel = 1;","                break;","            case 'error':","                intLevel = 0;","                break;","            default:","                intLevel = 0;","            ","        }","        this._logLevel = intLevel;","    },","","    /**","     * Iterate over an array","     * @method each","     * @param collection {Array} The array to iterate over","     * @param cb {Function} The callback function applied to each member of the array","     * @param ctx {Object} The scope applied to the callback function.","     **/","    each: function(collection, cb, ctx) ","    {","        if(!collection || !collection.length) ","        {","            return false;","        }","        for(var i=0,len=collection.length; i<len; i++) ","        {","            cb.call((ctx || collection[i]), collection[i], i);","        }","    },","","    /**","     * Iterate over an object","     * @method iterate","     * @param obj {Object} The object to iterate over","     * @param cb {Function} The callback function applied to each member of the object","     * @param ctx {Object} The scope applied to the callback function.","     **/        ","    iterate: function(obj, cb, ctx) ","    {","        ctx = ctx || obj;","        for(var prop in obj) ","        {","            if(obj.hasOwnProperty(prop)) ","            {","                cb.call(ctx, obj[prop], prop);","            }","        }            ","    }","};","","/**"," * DOM methods"," * @module dom"," **/","var dom = {","    ","    /**","     * Dom class","     * @class Dom","     * @static","     */","    ","    /**","     * Find an element by CSS query selector.  If parentNode is passed as second argument,","     * the CSS selector is relative that node.","     * @method get","     * @param selector {String} Valid CSS query selector","     * @param parentNode {HTMLElement} If present, CSS selector is relative to this DOM ndoe.","     * @return {HTMLElement} The single element matching the given selector.","     **/    ","    get: function(selector, parentNode) ","    {","        if(selector instanceof HTMLElement) return selector;","        var matches = this.getAll(selector, parentNode);","        return !matches.length ? null : (matches.length === 0 ? null : matches[0]);","    },","","    /**","     * Find a collection of elements by CSS query selector.  If parentNode is passed as second argument,","     * the CSS selector is relative that node.","     * @method getAll","     * @param selector {String} Valid CSS query selector","     * @param parentNode {HTMLElement} If present, CSS selector is relative to this DOM ndoe.    ","     * @return {Array} An array of elements matching the given selector.","     **/    ","    getAll: function(selector, parentNode) ","    {","        parentNode = parentNode || document;","        return Array.prototype.slice.call(parentNode.querySelectorAll(selector));","    },    ","","    /**","     * Create a DOM node.","     * @method createElement    ","     * @param nodeName {String} The node name of the element to be created","     * @param options {Object} Attributes to be attached to the created element.","     * @return {HTMLElement} DOM node with passed in attriutes.","     **/    ","    createElement: function(nodeName, options) ","    {","        var el = document.createElement(nodeName);","        for(var opt in options) ","        {","            if(options.hasOwnProperty(opt)) ","            {","                switch(opt) ","                {","                    case 'className':","                    case 'innerHTML':","                        el[opt] = options[opt];","                        break;","                    default:","                        el.setAttribute(opt, options[opt]);","                        break;","                }","            }","        }","        return el;","    },","","    /**","     * Remove a node from the DOM.","     * @method removeElement    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @return {HTMLElement} The deleted node","     **/    ","    removeElement: function(el) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el && el.parentNode) ","        {","            el.parentNode.removeChild(el);","        }","        return el;","    },","","    /**","     * Insert an element before another element in the DOM.","     * @method insertBefore    ","     * @param node {Object} ","     * @param refNode {String|Object} The CSS selector string or DOM node to insert before","     **/","    insertBefore: function(node, refNode) ","    {","        refNode = (typeof el === 'string') ? this.get(refNode) : refNode;","        refNode.parentNode.insertBefore(node, refNode);","    },","","    /**","     * Insert an element after another element in the DOM.","     * @method insertAfter    ","     * @param node {Object} ","     * @param refNode {String|Object} The CSS selector string or DOM node to insert after","     **/","    insertAfter: function(node, refNode) ","    {","        refNode = (typeof el === 'string') ? this.get(refNode) : refNode;","        refNode.parentNode.insertBefore(node, refNode.nextSibling);","    },","","    /**","     * Get the computed style for a given element.","     * @method getStyle    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param style {String} The style property.","     * @return {String} Computed style for the given node and property","     **/","    getStyle: function(el, style) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(!el)","        {","            return false;","        }","        return window.getComputedStyle ? ","            document.defaultView.getComputedStyle(el, null).getPropertyValue(style) :","            (el.currentStyle ? el.currentStyle[style] : el.style[style]);","    },","","    /**","     * Set a style for a given element.","     * @method setStyle    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param name {String} The style property name.","     * @param value {String} The style property value.","     **/    ","    setStyle: function(el, name, value) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el && el.style) ","        {","            if (value === null){","                 el.style.removeProperty(name);","            } else {","                 el.style[name] = value;","            }                ","        }","    },","","    /**","     * Set a collection of styles for a given element.","     * @method setStyles    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param styles {Object} Object literal containing style definitions.","     **/    ","    setStyles: function(el, styles) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el && el.style) ","        {","            this.iterate(styles, function(value, name) ","            {","                this.setStyle(el, name, value);","            }, this);","        }","    },","","    /**","     * Get the (x,y) coordinates for a given element.","     * @method getXY    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @return {Array} Array containing the (x,y) coordinates of the element.","     **/    ","    getXY: function(el, refParent) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        var pos = [el.offsetLeft, el.offsetTop];","        var parentNode = el.offsetParent;","        var accountForBody = (this.getStyle(el, 'position') === 'absolute' && el.offsetParent == el.ownerDocument.body);","        if(parentNode != el) ","        {","            while(parentNode && parentNode != refParent) ","            {","                pos[0] += parentNode.offsetLeft;","                pos[1] += parentNode.offsetTop;","                if(!accountForBody && parentNode.style.position == 'absolute') ","                {","                    accountForBody = true;","                }","                ","                // sometimes the parentElement is not the same as the offsetParent so it can get \"skipped\"","                if (refParent == parentNode.parentNode){","                    parentNode = null;","                } else {","                    parentNode = parentNode.offsetParent;","                } ","            }","        }","        if(accountForBody) ","        {","            pos[0] -= el.ownerDocument.body.offsetLeft;","            pos[1] -= el.ownerDocument.body.offsetTop;            ","        }","","        return pos;","    },","","    /**","     * Set the (x,y) coordinates of a given element","     * @method setXY    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param xy {Array} Array containing the (x,y) coordinates to be set.","     **/","    setXY: function(el, xy) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        // @TODO: account for position: relative vs. position: absolute vs position: null","        this.setStyle(el, 'left', xy[0]+'px');","        this.setStyle(el, 'top', xy[1]+'px');","    },","","    /**","     * Add a class name to a DOM node","     * @method addClass    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param className {String} The class name.","     **/    ","    addClass: function(el, className) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el) ","        {","            if(!el.className.match(className)) ","            {","                el.className += ' ' + className;","            }                ","        }","    },","","    /**","     * Remove a class name from a DOM node","     * @method removeClass    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param className {String} The class name.","     **/    ","    removeClass: function(el, className) ","    {","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el) ","        {","            el.className = el.className.replace(className, '').replace(/^\\s+|\\s+$/g,\"\");    ","        }","    },","","    /**","     * Check if a DOM node has a given class name.","     * @method hasClass    ","     * @param el {String|Object} The CSS selector string or DOM node","     * @param className {String} The class name.","     * @return True if the node has the class name applied to it, false otherwise.","     **/    ","    hasClass: function(el, className) ","    {","        var hasClass = false;","        el = (typeof el === 'string') ? this.get(el) : el;","        if(el && el.className) ","        {","            hasClass = (el.className.match(new RegExp('(?:^|\\\\s+)' + className + '(?:\\\\s+|$)')) !== null);","        }","        return hasClass;","    },","    ","    /**","     * Toggle a classname for a particular DOM element","     * @method toggleClass","     * @param el {String|Object} The CSS selector string or DOM node","     * @param className {String} The class name.","     **/","    toggleClass: function(el, className)","    {","        if(!dom.hasClass(el, className)) dom.addClass(el, className);","        else dom.removeClass(el, className);","    },","    ","    /**","     * Add a string of CSS to the document","     * @method css","     * @param css {String} The CSS string","     */","    css: function(css)","    {","        var styleNode = document.createElement('style');","        styleNode.setAttribute('type', 'text/css');","        styleNode.appendChild(document.createTextNode(css));","        document.getElementsByTagName('head')[0].appendChild(styleNode);","    },","    ","    /**","     * Check if a node is contained inside another node.","     * @method contains    ","     * @param parent {Object} The CSS selector string or DOM node for the parent node.","     * @param el {Object} The CSS selector string or DOM node for the child node.    ","     * @param orig {HTMLElement} The original parent node, used in recursion","     * @return True if el is contained inside of parentNode, false otherwise.","     **/","     contains: function(parent, el, orig) ","     {","         if(orig === document || orig === document.body) ","         {","             return true;","         } ","         else if(el === document.body)","         {","             return false;","         }","         else if(el === parent)","         {","             return true;","         } ","         else if(el && el.parentNode)","         {","             return this.contains(parent, el.parentNode, orig || parent);","         }","         return false;","     },","","    /**","     * Check if a node exists in the document.","     * @method inDocument    ","     * @param el {String|Object} The CSS selector string or DOM node.","     * @return True if el is contained inside the document, false otherwise.","     **/","    inDocument: function(el) ","    {","        try ","        {","            return mui.contains(document.body, el);                ","        } ","        catch(e) {","            return false;","        }","    },","","    /**","     * Get an ancestor node by a comparison function","     * @method getAncestorBy    ","     * @param node {String|Object} The CSS selector string or DOM node.","     * @param fn {Function} The comparison function - return true or false.","     * @param scope {Object} The scope of the passed function (optional)","     * @param parentNode {HTMLElement} the top element where to stop the search, body by default","     * @return The ancestor node if found, false otherwise.","     **/","    getAncestorBy: function(node, fn, scope, parentNode) ","    {","        node = (typeof node === 'string') ? this.get(node) : node;","        scope = scope || fn;","        if(fn.call(scope, node)) ","        {","            return node;","        } ","        else if(node === document.body || node === parentNode) ","        {","            return false;","        } ","        else if(node)","        {","            return this.getAncestorBy(node.parentNode, fn, scope);","        }","        return false;","    },","","    /**","     * Get an ancestor node by a class name","     * @method getAncestorByClassName","     * @param node {String|Object} The CSS selector string or DOM node.","     * @param className {String} The name of the class to search for","     * @param parentNode {HTMLElement} the top element where to stop the search, body by default","     * @return The ancestor node if found, false otherwise.","     **/","    getAncestorByClassName: function(node, className, parentNode) ","    {","        return this.getAncestorBy(node, function(el) { return mui.hasClass(el, className); }, null, parentNode);","    },","","    /**","     * Get an ancestor node by tag name","     * @method getAncestorByTagName    ","     * @param node {String|Object} The CSS selector string or DOM node.","     * @param tagName {String} The tag name of the element to search for.","     * @return The ancestor node if found, false otherwise.","     **/","    getAncestorByTagName: function(node, tagName) ","    {","        return this.getAncestorBy(node, function(el) { return el.nodeName.toLowerCase() === tagName; });","    }","        ","};","","/**"," * Event methods"," * @module event"," **/","var event = (function() {","    ","    /**","     * Event class","     * @class Event","     * @static","     */    ","","    /*","     * Store event bindings so that they can later be unbound by","     * calling mui.removeEventListener","     * @property _bindings","     * @type Array","     * @private","     */","    var _bindings = [];","    ","    /*","     * Store click event bindings for speedy clicks","     * @property _clicks","     * @type Array","     * @private","     */","    var _clicks = [];","    ","    /*","     * Store touchend event bindings for event normalization","     * @property _touchends","     * @type Array","     * @private","     */","    var _touchends = [];","    ","    /*","     * Store the touchstart event for event normalization","     * @property _touchstartEvt","     * @type Event","     * @private","     */","    var _touchstartEvt = null;","    /*","     * Store the client X for the first toch","     * @property _firstY","     * @type Number","     * @private","     */","    var _firstY    = null;","    ","    /*","     * Store the client X for the last toch","     * @property _lastY","     * @type Number","     * @private","     */","    var _lastY     = null;","        ","    /*","     * Store the touchstart time for speedy clicks","     * @property _touchstartTime","     * @type Number","     * @private","     */","    var _touchstartTime = null;","    ","    /*","     * Store state of touches - whether or not user is moving","     * @property _touchmoved","     * @type BOolean","     * @private","     */","    var _touchmoved = 0;","    ","    /*","     * Store boolean flag to determine if iPhone for speedy clicks","     * @property _isIphone","     * @type Boolean","     * @private","     */","    var _isIphone = /i(Phone|P(o|a)d)/.test(navigator.userAgent) && typeof window.ontouchstart !== 'undefined';","","    /*","     * Store boolean flag to determine if Android for speedy clicks","     * @property _isAndroid","     * @type Boolean","     * @private","     */","    var _isAndroid = /Android/.test(navigator.userAgent);","    ","    /*","     * Resolve events by adding a touches array for browsers which do ","     * not support touch events","     * @method resolveEvent","     * @param e {Event} The DOM event","     * @return {Event} The normalized DOM event","     * @private","     */","    function resolveEvent(e)","    {","        var ev = e;","        switch(e.type)","        {","            case 'mousedown':","            case 'mousemove':   ","            case 'mouseup':         ","                ev.touches = [e];","                break;","        }","        return ev;","    }","    ","    /**","     * Event handler - used to allow for speedy clicks on iPhone","     * @method fireEvent    ","     * @param e {Event} The generated event","     * @private","     **/","    function handleEvent(e)","    {","        switch(e.type)","        {","            case 'touchstart':","                _touchstartEvt = e;","                _touchmoved = 0;","                _touchstartTime = +(new Date);","                _firstY = _lastY = _touchstartEvt.touches[0].clientY;","","                break;","            case 'touchmove':","                _touchmoved++;  ","                _lastY = e.touches[0].clientY;","                break;","            case 'touchend':","                // Fire touchend","                fireEvent('touchend', e);","                ","                // Fire click, if there is a _touchstartEvt","                if(_touchstartEvt){   ","                    if ( (_isIphone && !_touchmoved) || ( _isAndroid && _touchmoved <= 2 && (e.timeStamp - _touchstartTime) < 500 && Math.abs(_firstY - _lastY) < 15) ){","                        fireEvent('click', e);","                    }","                }","                _firstY = null;","                _lastY  = null;","                _touchstartEvt = null;              ","                break;","        }","    }","    ","    /**","     * Fire an event - used to allow for speedy clicks on iPhone","     * @method fireEvent    ","     * @param type {String} The event type (click, touchstart, etc)","     * @param e {Event} The generated event","     * @private","     **/","    function fireEvent(type, e)","    {","        var arr = type === 'click' ? _clicks : _touchends;","        if(_touchstartEvt)","        {","            mui.each(arr, function(b) {","                if(b && mui.contains(b.element, _touchstartEvt.target))","                {","                    var evt = {};","                    evt.preventDefault = function() { ","                        e.preventDefault(); ","                    };","                    evt.stopPropagation = function() { ","                        e.stopPropagation(); ","                    };","                    mui.iterate(_touchstartEvt, function(v, n) {","                        evt[n] = v;","                    });","                    mui.iterate(_touchstartEvt.touches[0], function(v, n) {","                        evt[n] = v;","                    });","                    evt.type = type;","                    b.method(evt);","                }","            });","        }","    }","","    /**","     * Attach an event to a given element","     * @method on","     * @param el {String|Object} The CSS selector string or DOM node.","     * @param type {String} The event type (click, touchstart, etc)","     * @param fn {Function} The callback function fired on the event","     * @param ctx {Object} The scope to be applied to the callback","     * @param useCapture {Boolean} Whether or not to initiate capture","     **/","    function on(el, type, fn, ctx, useCapture)","    {","        var method, fauxEvt;","        ctx = ctx || el;","        el = (typeof el === 'string') ? mui.get(el) : el;","        useCapture = !!useCapture;","        if(el) ","        {","            if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) ","            {","                switch(type) ","                {","                    case 'touchstart':","                        type = 'mousedown';","                        break;","                    case 'touchmove':","                        type = 'mousemove';","                        break;","                    case 'touchend':","                        type = 'mouseup';","                        break;","                }                ","                method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? ","                     function(e) { fn.handleEvent.call(fn, resolveEvent(e)); }: ","                    function(e) { fn.call(ctx, resolveEvent(e)); };","            }","            else","            {","                method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? ","                    function(e) { fn.handleEvent.call(fn, e); } : ","                    function(e) { fn.call(ctx, e); };","            }","            ","            fauxEvt = {","                element: el,","                type: type,","                originalMethod: fn,","                method: method,","                useCapture: useCapture","            };","","            _bindings.push(fauxEvt);","","            if((_isIphone || _isAndroid) && type === 'click')","            {","                _clicks.push(fauxEvt);","            }","            else if((_isIphone || _isAndroid) && type === 'touchend')","            {","                _touchends.push(fauxEvt);","            }","            else","            {","                el.addEventListener(type, method, useCapture);","            }","        }","    }","    ","    /**","     * Attach an event to a given element one time","     * @method one","     * @param el {String|Object} The CSS selector string or DOM node.","     * @param type {String} The event type (click, touchstart, etc)","     * @param fn {Function} The callback function fired on the event","     * @param ctx {Object} The scope to be applied to the callback","     * @param useCapture {Boolean} Whether or not to initiate capture","     **/","    function one(el, type, fn, ctx, useCapture)","    {","        var method = function() {","            if(fn.handleEvent && typeof fn.handleEvent === 'function')","            {","                fn.handleEvent.apply(fn, arguments);","            }","            else","            {","                fn.apply(ctx||fn, arguments);","            }","            removeEventListener(el, type, method, ctx, useCapture);","        };","        on(el, type, method, ctx, useCapture);","    }","    ","    /**","     * Remove an event handler from a given element","     * @method removeEventListener    ","     * @param el {String|Object} The CSS selector string or DOM node.","     * @param type {String} The event type (click, touchstart, etc)","     * @param fn {Function} The callback function fired on the event","     * @param ctx {Object} The scope to be applied to the callback","     * @param useCapture {Boolean} Whether or not to initiate capture    ","     **/","    function removeEventListener(el, type, fn, ctx, useCapture)","    {","        var i=0, len=_bindings.length, b, method;","        ctx = ctx || el;","        el = (typeof el === 'string') ? mui.get(el) : el;","        useCapture = !!useCapture;","        if(el) ","        {","            if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) ","            {","                switch(type) ","                {","                    case 'touchstart':","                        type = 'mousedown';","                        break;","                    case 'touchmove':","                        type = 'mousemove';","                        break;","                    case 'touchend':","                        type = 'mouseup';","                        break;","                }                ","            }","            ","            for(i; i<len; i++)","            {","                b = _bindings[i];","                if(b.type === type && b.useCapture === useCapture && b.element === el && b.originalMethod === fn)","                {","                    el.removeEventListener(type, b.method, b.useCapture);","                    _bindings.splice(i, 1);","                    i--;","                    len--;","                }","                else if(b.type === type && b.useCapture === useCapture && b.element === el && !fn)","                {","                    el.removeEventListener(type, b.method, b.useCapture);","                    _bindings.splice(i, 1);","                    i--;","                    len--;","                }","","                if((typeof window.ontouchstart !== 'undefined' && !mui.UA.Chrome) && (type === 'click' || type === 'touchend'))","                {","                    var arr = type === 'click' ? _clicks : _touchends;","                    for(var j=0, len2=arr.length; j<len2; j++)","                    {","                        var c = arr[j];","                        if(c.useCapture === useCapture && c.element === el && c.originalMethod === fn)","                        {","                            arr.splice(j, 1);","                            j--;","                            len2--;","                        }","                        else if(c.useCapture === useCapture && c.element === el && !fn)","                        {","                            arr.splice(j, 1);","                            j--;","                            len2--;","                        }","                    }","                    if(type === 'click') _clicks = arr;","                    else _touchends = arr;","                }","            }","        }","    }","    ","    // Temporary cleanup method for stale event bindings.","    function clearStaleEventBindings() {","        _bindings = _bindings.filter(function(element, index, array) {","            return mui.inDocument(element.element);","        });","    }","","    // Attach listeners to document for speedy clicks on iPhone","    if(_isIphone || _isAndroid)","    {","        document.addEventListener('touchstart', handleEvent, true);","        document.addEventListener('touchmove', handleEvent, true);","        document.addEventListener('touchend', handleEvent, true);","    }","    ","    // Public methods","    return {","        on: on,","        one: one,","        removeEventListener: removeEventListener,","        clearStaleEventBindings: clearStaleEventBindings","    };","    ","})();","","/**"," * Animation methods"," * @module anim"," **/","var anim = {","    ","    /**","     * Animation class","     * @class Animation","     * @static","     */","","    /**","     * Animate an object's position, using webkit transitions.","     * @method animate","     * @param el {String|Object} The CSS selector string or DOM node.","     * @param options {Object} The animation configuration","     *   Options are: properties, easing, duration, callback","     * Example:","     *    Animating a position 100px up and 100px to the left:","     *    ","     *    mui.animate('#the-element', {","     *         properties: {","     *            top: '-100px',","     *            left: '-100px',","     *         },","     *      easing: 'ease-out',","     *        duration: '0.5s',","     *      callback: {","     *          onComplete: myFunc","     *      }","     *    });","     **/","    animate: function(el, options) ","    {    ","        el = (typeof el === 'string') ? mui.get(el) : el;","        var posStyle = mui.getStyle(el, 'position');","        if(posStyle != 'absolute' || posStyle != 'relative') ","        {","            mui.setStyle(el, 'position', 'relative');","        }","        var styles = {};","        var duration = options.duration || '350ms';","        var properties = [];","        var transforms = [];","        mui.iterate(options.properties, function(value, property) ","        {","            switch(property) ","            {","                case 'left':","                case 'right':","                    el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';","                    property = '-webkit-transform';","                    value = 'translateX('+value+')';","                    transforms.push( value );","                    break;","                case 'top':","                case 'bottom':","                    el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';                ","                    property = '-webkit-transform';","                    value = 'translateY('+value+')';","                    transforms.push( value );","                    break;","                default:","                    styles[property] = value;","                    break;","            }","            properties.push(property);","        });","        ","        if(transforms.length > 0) ","        {","            if(styles['-webkit-transform']) styles['-webkit-transform'] += ' ' + transforms.join(' ');","            else styles['-webkit-transform'] = transforms.join(' ');","        }","        ","        el.style.webkitTransitionDuration = duration;","        el.style.webkitTransitionProperty = properties.join(' ');","        ","        if(options.easing) el.style.webkitTransitionTimingFunction = options.easing;","","        mui.iterate(styles, function(value, name) ","        {","            el.style[name] = value;","        });            ","        ","        if(options.callback)","        {","            var scope = options.callback.scope || options.callback.onComplete;","            var fn = function()","            {","                options.callback.onComplete.call(scope);","                el.removeEventListener('webkitTransitionEnd', fn, false);","            };","            el.addEventListener('webkitTransitionEnd', fn, false);","        }","    }        ","};","","/**"," * Effects methods"," * @module fx"," **/","var fx = {","    ","    /**","     * FX class","     * @class FX","     * @static","     */","    ","    /**","     * Apply a reflection directly underneath a given image.","     * @method reflect","     * @param img {HTMLElement} The <img> element.","     **/","    reflect: function(img) ","    {            ","        var doReflection = function(i) ","        {","            var container = document.createElement('div');","            container.className = 'mui-reflect-container';","            img.parentNode.insertBefore(container, img);","            container.appendChild(img);","            var canvas = document.createElement('canvas');","            var ctx = canvas.getContext(\"2d\");","            var height = 40;","            var opacity = 0.3;","","            container.appendChild(canvas);","","            canvas.style.height = height+'px';","            canvas.style.width = img.offsetWidth+'px';","            canvas.height = height;","            canvas.width = img.offsetWidth;","","            ctx.save();","","            ctx.translate(0,img.offsetHeight-1);","            ctx.scale(1,-1);","            ctx.drawImage(img, 0, 0, img.offsetWidth, img.offsetHeight);","","            ctx.restore();","","            ctx.globalCompositeOperation = \"destination-out\";","            var grad = ctx.createLinearGradient(0, 0, 0, height);","            grad.addColorStop(1, \"rgba(255, 255, 255, 1.0)\");","            grad.addColorStop(0, \"rgba(255, 255, 255, \"+(1-opacity)+\")\");","","            ctx.fillStyle = grad;","            ctx.rect(0, 0, img.offsetWidth, height*2);","            ctx.fill();            ","        };        ","","        if(!mui.inDocument(img)) ","        {","            img.addEventListener('load', function() {","                doReflection(img);","            }, false);","        } ","        else ","        {","            doReflection(img);","        }                ","    }        ","};","","/**"," * AJAX methods"," * @module ajax"," **/","var ajax = {","    ","    CONNECTION_TIMEOUT: 7000,","    ","    /**","     * AJAX class","     * @class Ajax","     * @static","     */","","    /**","     * XHR wrapper for making asynchronous connections","     * @method io","     * @param url {String} URL endpoint","     * @param options {Object} Configuration options:","     *     method {String}: get, post","     *    callback {Object}: Object literal containing the success and failure callback functions,","     *          as well as the scope to be applied to the callback functions.","     *    update {String|HTMLElement}: If present, the given element will be updated with the result ","     *        of the transaction.","     * Example: ","     *     Using callback function:","     *","     *     mui.io('/ajax.php', {","     *      method: 'get',","     *        headers: [ { 'Content-Type': 'application/x-www-form-urlencoded' }],","     *      callback: {","     *        success: function(o) {","     *            // do something with o.responseText","     *        },","     *        scope: this","     *    });","     *","     *    Using update property:","     *","     *     mui.io('/ajax.php', {","     *      method: 'get',","     *      update: '#el-to-be-updated'","     *    });    ","     * @return {Boolean} True if el is contained inside the document, false otherwise.","     **/        ","        io: function(url, options) ","        {","            var xhr = new XMLHttpRequest(),","                method = options.method || 'get',","                success = options.callback ? options.callback.success : null,","                failure = options.callback ? options.callback.failure : null,","                scope = options.callback ? options.callback.scope : null,","                params = options.params || null,","                onError = true, body = document.body;","            ","            if(options.update) ","            {","                var el = (typeof options.update === 'string') ? mui.get(options.update) : options.update;","                success = function(o) {","                    el.innerHTML = o.responseText;","                };","            }","            ","            xhr.open(method, url, true);","            xhr.onreadystatechange = (success) ? function(o) {","                body.removeEventListener(\"offline\", xhr.onerror, false);","                                ","                if(xhr.readyState !== 4)","                {","                    mui.trace(\"XHR state change: \" + xhr.readyState);","                    return;","                }","                mui.trace(\"XHR status: \" + xhr.status);","                ","                if(xhr.status === 200 || xhr.status === 0)","                {","                    success.call(scope, o.target);","                }","                else if(failure)","                {","                    onError = false;","                    failure.call(scope, o.target);","                }","            } : null;","            ","            xhr.onerror = xhr.onabort = function(o){","                body.removeEventListener(\"offline\", xhr.onerror, false);","                ","                // do not call the failure handler twice","                // there are times where the browser does not call onreadystatechage","                // e.g. lost Wifi signal","                if(onError && failure) {","                     failure.call(scope, { status: 0, statusText: \"error\" } ); ","                };","                onError = false;","            };","            body.addEventListener(\"offline\", xhr.onerror, false);","            ","            if(options.headers)","            {","                mui.each(options.headers, function(h) {","                    mui.iterate(h, function(v, n) { xhr.setRequestHeader(n, v); });","                });","            }","            ","            if ( !(\"onLine\" in navigator) /* older Iphones */ || navigator.onLine){","                xhr.send(params);","            } else {","                xhr.onerror();","            }","        },","    ","    /**","     * Fetch an external script resource","     * @method getScript","     * @param url {String} The url of the scrip","     * @param callback {Function} Callback invoked after script is downloaded","     * @param scope {Object} The context of the callback function","     **/","    getScript: function(url, callback, scope)","    {","        var scriptTag = mui.createElement('script', { type: 'text/javascript', src: url });","        mui.on(scriptTag, 'load', mui.bind(callback, scope));","        document.getElementsByTagName('head')[0].appendChild(scriptTag);","    }    ","};","","/**"," * Object-Oriented programming helpers"," * @module oop"," **/","var oop = {","    ","    /**","     * OOP class","     * @class Oop","     * @static","     */","    ","    /**","     * Provide a namespace.  ","     * @method provide","     * @param ns {String} The namespace. This can be a chained namespace, i.e., \"levelOne.levelTwo.levelThree\"","     */","    provide: function(ns)","    {","        var i, len, s = ns.split('.'), p = window;","        for(i=0, len=s.length; i<len; i++)","        {","            p[s[i]] = (typeof p[s[i]] === 'undefined') ? {} : p[s[i]];","            p = p[s[i]];","        }","     },","","    /**","     * Simple object extension. Static members will not be inherited to the child class.","     * The superclass and constructor properties are added to parent and child classes.","     * @method extend","     * @param sub {Object} The subclass","     * @param sup {Object} The superclass from which to extend","     * @param proto {Object} prototype properties to add/override","     * @param stat {Object} static properties to add/override    ","     * @return The subclass, with properties/methods inherited from superclass","     **/","    extend: function(sub, sup, proto, stat) {","        // Prototypal inheritance of the parent to child","        sub.prototype.__proto__ = sup.prototype;    ","        ","        // Set constructor properties for parent, child","        sub.prototype.constructor = sub;","        if(sup.prototype.constructor == Object.prototype.constructor) {        ","            sup.prototype.constructor = sup;","        }","        ","        // Set superclass property for child class","        sub.superclass = sup.prototype;","        ","        // If any prototype properties are passed in, add those to the child's prototype","        if(proto) {        ","            mui.iterate(proto, function(v, n) {","                sub.prototype[n] = v;","            });","        }","        ","        // If any static properties are passed in, add those to the child as static members","        if(stat) {        ","            mui.iterate(stat, function(v, n) {","                sub[n] = v;","            });","        }","        ","        return sub;","    },","","    /**","     * Augment an object by adding the static and prototype members of another object. By default, properties/methods","     * are not overriden on the receiving object if they already exist. This is equivalent to augment + augmentProto.","     * @method mix","     * @param obj {Object} The receiver which will accept the extension members","     * @param ext {Object} The provider object, whose static and prototype members will be supplied to the receiver.","     * @param ov {Boolean} If true, properties supplied will be overriden on the receiver if already present.","     * @return The original object with all the original properties, plus the passed in static extensions.","     **/        ","    mix: function(obj, provider, ov) ","    {","        obj = mui.augment.call(this, obj, provider, ov);","        obj = mui.augmentProto.call(this, obj, provider, ov);","        return obj;","    },","","    /**","     * Object augmentation takes static properties in the provider object (or an object literal containing augmentation members), and","     * adds those as properties of the receiver object. ","     * @method augment","     * @param obj {Object} The receiver to be augmented","     * @param provider {Object} The provider object, whose properties will be supplied to the receiver","     * @param ov {Boolean} If true, properties supplied will be overriden on the receiver if already present.","     * @return The original object with all the original properties , plus the passed in extensions.","     **/    ","    augment: function(obj, provider, ov) ","    {","        for(var p in provider) ","        {","            if(provider.hasOwnProperty(p)) ","            {","                if((ov && typeof obj[p] !== 'undefined') || typeof obj[p] === 'undefined') obj[p] = provider[p];","            }","        }","        return obj;","    },","","    /**","     * Object prototype augmentation takes prototype members in the provider object and","     * adds those as prototype members of the receiver object. ","     * @method augmentProto","     * @param obj {Object} The receiver to be augmented","     * @param provider {Object} The provider object, whose prototype members will be supplied to the receiver","     * @param ov {Boolean} If true, prototype members supplied will be overriden on the receiver if already present.","     * @return The original object with all the original prototype members, plus the passed in extensions.","     **/","    augmentProto: function(obj, provider, ov)","    {","        for(var p in provider.prototype) ","        {","            if((ov && typeof obj.prototype[p] !== 'undefined') || typeof obj.prototype[p] === 'undefined') obj.prototype[p] = provider.prototype[p];","        }        ","    },","","    /**","     * Bind a function to a given context and arguments","     * @method bind","     * @param fn {Function} The function to bind","     * @param ctx {Object} The context in which the function will be executed","     * @param args* 0..n arguments to include before the arguments the ","     * function is executed with","     * @return {Function} the wrapped function","     */","    bind: function(fn, ctx)","    {","        var args = Array.prototype.slice.call(arguments, 2);","        return function() { ","            // Merge arguments of inner function with those passed to mui.bind            ","            var xargs = Array.prototype.slice.call(arguments);","            mui.each(args, function(a) { xargs.push(a); });","            return fn.apply((ctx || fn), xargs); ","        }","    },","    ","    /**","     * Register a module within the mui namespace.","     * @method add","     * @param name {String} The name of the module","     * @param obj {Object} The object/function to register","     * @return {Object} The registered module.","     */","    add: function(name, obj)","    {","        mui[name] = obj;","        return mui[name];","    }","","};","","/**"," * Client environment methods"," * @module env"," **/","var env = {","    ","    /**","     * Env class","     * @class Env","     * @static","     */","","    /*","     * mui.UA is a read-only property which gives information regarding ","     * the User Agent. ","     * @final UA","     * @type Object","     */","    UA: (function() {","","        var UA = {","            Apple:       false,","            Safari:      false,","            iPhone3:     false,","            webOS:       false, ","            Android:     false,","            WebKit:      false,","            Gears:       false,","            Chrome:      false,","            CSSTransitions: false","        };","","        if(typeof navigator != 'undefined')","        {","            if(RegExp(\" AppleWebKit/\").test(navigator.userAgent))       UA.WebKit = true;","            if(RegExp(\"Android\").test(navigator.userAgent))             UA.Android = true;","            if(RegExp(\"Chrome\").test(navigator.userAgent))              UA.Chrome = true;","            if(RegExp(\"webOS\").test(navigator.userAgent))               UA.webOS = true;            ","            if(/i(Phone|P(o|a)d)/.test(navigator.userAgent))            UA.Apple = true;","            if(UA.Apple && RegExp(\"OS 3\").test(navigator.userAgent))    UA.iPhone3 = true;","            if(UA.Apple && RegExp(\"iPad\").test(navigator.userAgent))    UA.iPad = true;","            if(UA.Apple || (!UA.Android && !UA.webOS && RegExp(\"Safari\").test(navigator.userAgent))) UA.Safari = true;","            if(UA.iPad || UA.Chrome)                                    UA.tablet = true;","        }","","        UA.Gears = typeof(navigator.mimeTypes) !== 'undefined' && navigator.mimeTypes['application/x-googlegears'];","        ","        // Create Gears element","        if(UA.Gears)","        {","            var factory = document.createElement('object');","            factory.style.display = 'none';","            factory.style.width = '0px';","            factory.style.height = '0px';","            factory.type = 'application/x-googlegears';","            document.documentElement.appendChild(factory);","            if(typeof google === 'undefined') google = {};","            if(!google.gears) google.gears = { factory: factory };","        }        ","        ","        // Transitions","        UA.CSSTransitions = (typeof WebKitCSSMatrix !== 'undefined');","        ","        // Add classname to target CSS","        if(UA.Android) dom.addClass(document.documentElement, 'android');","        if(UA.Apple && !UA.iPad) dom.addClass(document.documentElement, 'iphone');","        if(UA.iPad) dom.addClass(document.documentElement, 'ipad');","        if(UA.webOS) dom.addClass(document.documentElement, 'webOS');","","        return UA;","    })()","};","","","","/**","* Template is a mechanism for binding data into a string","*","* Example:","*","* var someHTML  = \"<div id='#{myID}'>#{myData}</div>\";","* var data      = { myID:\"myBox\", myData:\"Hello World\" };","* var output    = mui.map( data, {someHTML|HTMLElement} );","*","* //output ==> \"<div id='myBox'>Hello World</div>\";","*","* Notes:","*","*  Speed, speed, and more speed:","*  ---------------------------","*   Obviously the goal of any piece of code is to be as efficient as possible.","*   Often times, you will see code that uses JavaScript's raw [string].replace","*   methods, to do the same thing as above.","*","*   However often times your \"template string\" is usuallay HTML or something.","*   This same string is re-used over and over again, and typically you'll see","*   engineers just make the replace calls. ..","*","*   Having to continually run regular expressions on the string is slow and","*   some what point-less if the original \"template string\" doesn't really change,","*   all that's changing is the data. . .","*","*   So the goal was to create a more efficient, single way too manage a \"template string\",","*   that is faster than other implementations like it and faster than continually","*   calling raw replace methods. ..","*","*   What this class does under the hood, is split the string up into its pieces,","*   using various Regular Expresion matching. .. similar to what a replace would do.","*   It then stores these pieces privately in a \"buffer\". At the same time it also","*   stores the property names/expressions found in the \"template string\", and at","*   what location(s) they should appear in the buffer.","*","*   This only needs to be done 1 time per template string. . .(implementations in other","*   toolkits such as Prototype 1.6.03, would do multiple matches/replacements every time","*   the data is passed in).","*","*   Then, when you bind data by calling [template].parse, we simply loop through","*   the buffer filling in slots. . .","*","*  Similar to:","*  ---------------------------","*   There is a similar function in PHP - see toMessage()","*","*   \"I %how_much% like %dessert%!\".toMessage( \"how_much=really\", \"dessert=Ice Cream\" );","*   result  =>  I really like Ice Cream!","*","*   For this code call:","*       var data    = {how_much:\"really\", dessert:\"Ice Cream\"};","*       var output  = mui.supplant(\"I %how_much% like %dessert%!\", data);","*","*/","var template = function() {","","    /**","     * @description - private, static method used to define the buffer array and prop hash caches for a Template","     *","     * @method defineTemplateBuffer","     * @param {Array}   the buffer array of a Template","     * @param {object}  the props object of a Template","     * @param {object}  A regular expression match result, generated from parseTemplate, that defines what markers exist","     *                  for data binding in a template","     * @param {string}  A string, generated from parseTemplate, that prefixes the content of the match param.","     * @private","     * @static","     * @return void","    */","    function defineTemplateBuffer(buffer, props, match, prefix)  {","        var pattern = /^([^.[]+|\\[((?:.*?[^\\\\])?)\\])(\\.|\\[|$)/,","            before  = \"\",","            match2  = \"\",","            expr    = \"\",","            newMatch;","","        if (match) {","            before  = match[1];","            match2  = match[2];","            expr    = match[3];","        }","","        if (before == '\\\\') {","            buffer.push(prefix, match2);","            if (!props[match2])","                props[match2] = [];","","            props[match2].push(buffer.length-1);","            return;","        }","","        newMatch = pattern.exec(expr);","        if (!newMatch) {","            buffer.push(prefix, before);","            return;","        }","        if (!props[expr])","            props[expr] = [];","","        props[expr].push(buffer.length+2);","        buffer.push(prefix, before, expr);","    }","","    /**","     * @description - private, static method used evaluate the string markers to be for data-binding in a Template","     *","     * @method parseTemplate","     * @param {string} the original template string with markers","     * @param {RegEx} the pattern to match for markers, defaults to Template.DEFAULT_PATTERN (e.g. matches, #{varName})","     * @param {Array} the buffer array of a Template","     * @param {object}  the props object of a Template","     * @private","     * @static","     * @return void","    */","    function parseTemplate(source, pattern, buffer, props) {","        var match, idx = 0;","","        while (source)","        {","            if (match = source.match(pattern)) {","                idx = match.index;","                defineTemplateBuffer(buffer, props, match, source.slice(0,idx));","                source  = source.slice(idx + match[0].length);","            } else {","                buffer.push(source);","                source = '';","            }","        }","    }","","    function cstr(str) {","        var S = String, t = typeof str;","    ","        switch (t) {","            case \"string\": return str;","            case \"number\": return S(str);","        }","        str = str || \"\";","        str = S(str);","        return str;","    }","    ","    /**","     * @description - private, static method used evaluate the string markers to be for data-binding in a Template","     *","     * @method Template (constructor)","     * @param {string} the original template string with markers","     * @param {RegEx} the pattern to match for markers, defaults to Template.DEFAULT_PATTERN (e.g. matches, #{varName})","     * @public","     * @return {object} Template instance","    */","    function Template(template, pattern)  {","        ","        var regArgs = \"\";","","        template        = cstr(template);","        pattern         = pattern || Template.DEFAULT_PATTERN;","","        /**","         * @description - private, instance property used to find markers in a string for data binding","         *","         * @property Template::privMe.pattern","         * @type {RegEx}","        */","        this.pattern  = pattern;","","        /**","         * @description - private, instance property, the original string that contains markers for data binding","         *","         * @propery Template::privMe.template","         * @type {string}","        */","        this.template = template;","","        /**","         * @description - private, instance property, an array that contains the substrings of the original template, and empty string place holders","         *                for data.  This gets filled out from the constructor or via calling Template::parse","         *","         * @property Template::privMe.buffer","         * @type {Array}","        */","        this.buffer   = [];","","        /**","         * @description - private, instance property, an object that contains the arrays of indexes into the buffer for where data values should go.","         *                This gets filled out from the constructor or via calling Template::parse. The object is keyed by the var/expressions in the","         *                the template. For example a string for a template like \"#{foobar}\" means that this object will have props[\"foobar\"] == Array,","         *                and each index of the array will be an index to be filled out in the buffer.","         *","         * @property Template::privMe.props","         * @type {object}","        */","        this.props    = {};","    }","","    /**","     * @description - public, static property, the RegExp used to match a marker in a template string.  By default, a Template instance","     *                uses this RegExp, and therefore accepts strings that look like \"Hello World %{myData}\"","     *","     *                It is public, but is intended to be used as a constant (hence the all caps notation).","     *","     * @property Template::DEFAULT_PATTERN","     * @type {RegExp}","     * @public","     * @static","    */","    Template.DEFAULT_PATTERN    = /(^|.|\\r|\\n)(%\\{(.*?)\\})/;","","    /**","     * @description - public, static property, the RegExp used to match a marker in a template string.  This expression","     *                is used for the typical sprintf format from c. (e.g. \"Hello {user}\");","     *","     * @property Template::SPRINTF_PATTERN","     * @type {RegExp}","     * @public","     * @static","    */","    Template.SPRINTF_PATTERN    = /(^|.|\\r|\\n)(\\{(.*?)\\})/;","","    /**","     * @description - public method used to bind data in the string or echo the template itself.","     *","     * @method [Template].toString, [Template].valueOf","     * @param {obj} (optional) if obj present, the properties and values will be replaced in the template","     *              otherwise this will just return the original template string with no data replaced.","     * @public","     * @return {string} with or without, formatted data","    */","    Template.prototype.toString     =","    Template.prototype.valueOf      = function(obj) {","        var ret = \"\", buffer, props, propName, t,","            indexes, idx, len, val,","            initId = (this.pattern == Template.DEFAULT_PATTERN) ? \"%{\" : \"{\";","","        if (obj) {","            if (!this.buffer || !this.buffer.length)","                this.parse(this.template);","","            buffer  = this.buffer;","            props   = this.props;","            if (buffer && props) {","                for (propName in  props)  {","                    val     = obj[propName];","                    // If the property does not exist in obj, then restore the variable name:","                    if (typeof val === \"undefined\") {","                        val = (propName.charAt(propName.length - 1) == '}') ? (\"\\\\\" + propName) : (initId + propName + \"}\");","                    }","                    indexes = props[propName];","                    if (indexes) {","                        idx = 0;","                        len = indexes.length;","                        while (len--)","                            buffer[indexes[idx++]] = val;","","                    }","                }","            }","            ret = buffer.join(\"\");","        } else {","            ret = this.template;","        }","","        this.data  = obj;","","        return ret;","    }","","    /**","     * @description - public method used to redefine the template string, creating the private buffer and prop instance properties","     *","     * @method [Template].parse","     * @param {string} template","     * @public","    */","    Template.prototype.parse  = function( template ) { ","        if (arguments.length) {","            template    = cstr(template);","            if (template && template != this.template) {","                this.template  = template;","                this.buffer    = [];","                this.props     = {};","                this.data      = null;","            }","        }","","        parseTemplate(this.template, this.pattern, this.buffer, this.props);","    }","    ","    var HTMLTEMPLATES = {};","    var STRINGTEMPLATES = {};","    ","    if (!String.prototype.supplant){","        String.prototype.supplant = function ( data, cacheOff ) {            ","            var template = STRINGTEMPLATES[ this ];","            ","            if (!template){                ","                template = new Template( this, Template.SPRINTF_PATTERN );","                template.parse();","                ","                if (!cacheOff)","                    STRINGTEMPLATES[this] = template;","            }","                        ","            return template.valueOf( data );","        };  ","    }","       ","    return {","        ","        /**","         * ","         * @method map","         * ","         * @param el {String|HTMLElement} The CSS selector or DOM node to map to. The template element must contain an Id.","         * @param data {Object} The object to map","         * @param nodeName {String} The tag name of the newly created DOM node","         * @param nodeConfig {Object} Object literal of node configuration passed to mui.createElement","         * @param cacheOff {Boolean} (Optional) if set to true the pattern will not be cached, ","         *                 good for random strings that will not be repeated.","         */","        map: function(data, el, nodeName, nodeConfig, cacheOff){","            var node, templateId,","                template, html,","                res;","            ","            if (typeof el === 'string'){","                node = mui.get( el );","                templateId = el;","            } else {","                node = el;","                templateId = node && node.getAttribute(\"id\");","            }","            ","            if (!node){","                return;","            }            ","            ","            if (!templateId){","                mui.debug(\"map(): templateId must be a string\");","                return;","            }","            ","            if (!cacheOff) {","                template = HTMLTEMPLATES[templateId];","            }","            ","            if (!template){","                html = node.innerHTML.replace(/(\\-\\-\\>)|(\\<\\!\\-\\-)/g, '');","                ","                template = new Template( html, Template.DEFAULT_PATTERN );","                template.parse();","                ","                if (!cacheOff) {","                    HTMLTEMPLATES[templateId] = template;","                }","            }","            ","            nodeConfig = nodeConfig || {};","            // copy classes from source node","            nodeConfig.className = nodeConfig.className ? nodeConfig.className + ' ' +  node.className : node.className;","            ","            res = nodeName ? mui.createElement(nodeName, nodeConfig) : node.cloneNode(true);","            if(!nodeName) res.removeAttribute('id');","            ","            res.innerHTML = template.valueOf( data );","            ","            return res;","        },","        ","         /**","         * ","         * @method template","         * ","         * @param str {String} The CSS selector or DOM node to map to. The template element must contain an Id.","         * @param data {Object} The object to map","         * @param cacheOff {Boolean} (Optional) if set to true the patter will not be cached, ","         *                 good for random strings that will not be repeated.","         *  ","         */","        supplant: function( str, data, cacheOff ){","            return str.supplant( data, cacheOff);","        }","    };","}();","","// Define mui","oop.augment(mui, util);","oop.augment(mui, dom);","oop.augment(mui, event);","oop.augment(mui, anim);","oop.augment(mui, fx);","oop.augment(mui, ajax);","oop.augment(mui, oop);","oop.augment(mui, env);","oop.augment(mui, template);","","})();"];
_yuitest_coverage["js/mui.js"].lines = {"1":0,"7":0,"13":0,"36":0,"46":0,"56":0,"66":0,"78":0,"79":0,"90":0,"91":0,"94":0,"95":0,"97":0,"98":0,"100":0,"101":0,"103":0,"104":0,"106":0,"109":0,"121":0,"123":0,"125":0,"127":0,"140":0,"141":0,"143":0,"145":0,"155":0,"173":0,"174":0,"175":0,"188":0,"189":0,"201":0,"202":0,"204":0,"206":0,"210":0,"211":0,"213":0,"214":0,"218":0,"229":0,"230":0,"232":0,"234":0,"245":0,"246":0,"257":0,"258":0,"270":0,"271":0,"273":0,"275":0,"289":0,"290":0,"292":0,"293":0,"295":0,"308":0,"309":0,"311":0,"313":0,"326":0,"327":0,"328":0,"329":0,"330":0,"332":0,"334":0,"335":0,"336":0,"338":0,"342":0,"343":0,"345":0,"349":0,"351":0,"352":0,"355":0,"366":0,"368":0,"369":0,"380":0,"381":0,"383":0,"385":0,"398":0,"399":0,"401":0,"414":0,"415":0,"416":0,"418":0,"420":0,"431":0,"432":0,"442":0,"443":0,"444":0,"445":0,"458":0,"460":0,"462":0,"464":0,"466":0,"468":0,"470":0,"472":0,"474":0,"485":0,"487":0,"490":0,"505":0,"506":0,"507":0,"509":0,"511":0,"513":0,"515":0,"517":0,"519":0,"532":0,"544":0,"553":0,"568":0,"576":0,"584":0,"592":0,"599":0,"607":0,"615":0,"623":0,"631":0,"639":0,"649":0,"651":0,"652":0,"657":0,"658":0,"660":0,"669":0,"671":0,"674":0,"675":0,"676":0,"677":0,"679":0,"681":0,"682":0,"683":0,"686":0,"689":0,"690":0,"691":0,"694":0,"695":0,"696":0,"697":0,"708":0,"710":0,"711":0,"713":0,"714":0,"716":0,"717":0,"718":0,"720":0,"721":0,"723":0,"724":0,"726":0,"727":0,"729":0,"730":0,"745":0,"747":0,"748":0,"749":0,"750":0,"751":0,"753":0,"755":0,"758":0,"759":0,"761":0,"762":0,"764":0,"765":0,"767":0,"768":0,"769":0,"773":0,"774":0,"775":0,"778":0,"786":0,"788":0,"790":0,"792":0,"794":0,"798":0,"812":0,"814":0,"815":0,"817":0,"821":0,"823":0,"825":0,"837":0,"839":0,"840":0,"841":0,"842":0,"843":0,"845":0,"847":0,"850":0,"851":0,"853":0,"854":0,"856":0,"857":0,"861":0,"863":0,"864":0,"866":0,"867":0,"868":0,"869":0,"871":0,"873":0,"874":0,"875":0,"876":0,"879":0,"881":0,"882":0,"884":0,"885":0,"887":0,"888":0,"889":0,"891":0,"893":0,"894":0,"895":0,"898":0,"899":0,"906":0,"907":0,"908":0,"913":0,"915":0,"916":0,"917":0,"921":0,"934":0,"965":0,"966":0,"967":0,"969":0,"971":0,"972":0,"973":0,"974":0,"975":0,"977":0,"981":0,"982":0,"983":0,"984":0,"985":0,"988":0,"989":0,"990":0,"991":0,"992":0,"994":0,"995":0,"997":0,"1000":0,"1002":0,"1003":0,"1006":0,"1007":0,"1009":0,"1011":0,"1013":0,"1016":0,"1018":0,"1019":0,"1021":0,"1022":0,"1024":0,"1033":0,"1048":0,"1050":0,"1051":0,"1052":0,"1053":0,"1054":0,"1055":0,"1056":0,"1057":0,"1059":0,"1061":0,"1062":0,"1063":0,"1064":0,"1066":0,"1068":0,"1069":0,"1070":0,"1072":0,"1074":0,"1075":0,"1076":0,"1077":0,"1079":0,"1080":0,"1081":0,"1084":0,"1086":0,"1087":0,"1092":0,"1101":0,"1144":0,"1152":0,"1154":0,"1155":0,"1156":0,"1160":0,"1161":0,"1162":0,"1164":0,"1166":0,"1167":0,"1169":0,"1171":0,"1173":0,"1175":0,"1177":0,"1178":0,"1182":0,"1183":0,"1188":0,"1189":0,"1190":0,"1191":0,"1193":0,"1195":0,"1197":0,"1198":0,"1202":0,"1203":0,"1205":0,"1218":0,"1219":0,"1220":0,"1228":0,"1243":0,"1244":0,"1246":0,"1247":0,"1263":0,"1266":0,"1267":0,"1268":0,"1272":0,"1275":0,"1276":0,"1277":0,"1282":0,"1283":0,"1284":0,"1288":0,"1302":0,"1303":0,"1304":0,"1318":0,"1320":0,"1322":0,"1325":0,"1339":0,"1341":0,"1356":0,"1357":0,"1359":0,"1360":0,"1361":0,"1374":0,"1375":0,"1384":0,"1400":0,"1412":0,"1414":0,"1415":0,"1416":0,"1417":0,"1418":0,"1419":0,"1420":0,"1421":0,"1422":0,"1425":0,"1428":0,"1430":0,"1431":0,"1432":0,"1433":0,"1434":0,"1435":0,"1436":0,"1437":0,"1441":0,"1444":0,"1445":0,"1446":0,"1447":0,"1449":0,"1511":0,"1526":0,"1527":0,"1533":0,"1534":0,"1535":0,"1536":0,"1539":0,"1540":0,"1541":0,"1542":0,"1544":0,"1545":0,"1548":0,"1549":0,"1550":0,"1551":0,"1553":0,"1554":0,"1556":0,"1557":0,"1572":0,"1573":0,"1575":0,"1577":0,"1578":0,"1579":0,"1580":0,"1582":0,"1583":0,"1588":0,"1589":0,"1591":0,"1592":0,"1593":0,"1595":0,"1596":0,"1597":0,"1609":0,"1611":0,"1613":0,"1614":0,"1622":0,"1630":0,"1639":0,"1650":0,"1664":0,"1675":0,"1686":0,"1688":0,"1692":0,"1693":0,"1694":0,"1696":0,"1697":0,"1698":0,"1699":0,"1700":0,"1702":0,"1703":0,"1705":0,"1706":0,"1707":0,"1708":0,"1709":0,"1710":0,"1715":0,"1717":0,"1720":0,"1722":0,"1732":0,"1733":0,"1734":0,"1735":0,"1736":0,"1737":0,"1738":0,"1739":0,"1743":0,"1746":0,"1747":0,"1749":0,"1750":0,"1751":0,"1753":0,"1754":0,"1755":0,"1757":0,"1758":0,"1761":0,"1765":0,"1779":0,"1783":0,"1784":0,"1785":0,"1787":0,"1788":0,"1791":0,"1792":0,"1795":0,"1796":0,"1797":0,"1800":0,"1801":0,"1804":0,"1805":0,"1807":0,"1808":0,"1810":0,"1811":0,"1815":0,"1817":0,"1819":0,"1820":0,"1822":0,"1824":0,"1838":0,"1844":0,"1845":0,"1846":0,"1847":0,"1848":0,"1849":0,"1850":0,"1851":0,"1852":0};
_yuitest_coverage["js/mui.js"].functions = {"log:34":0,"trace:44":0,"debug:54":0,"warn:64":0,"error:76":0,"setLogLevel:88":0,"each:119":0,"iterate:138":0,"get:171":0,"getAll:186":0,"createElement:199":0,"removeElement:227":0,"insertBefore:243":0,"insertAfter:255":0,"getStyle:268":0,"setStyle:287":0,"(anonymous 2):311":0,"setStyles:306":0,"getXY:324":0,"setXY:364":0,"addClass:378":0,"removeClass:396":0,"hasClass:412":0,"toggleClass:429":0,"css:440":0,"contains:456":0,"inDocument:483":0,"getAncestorBy:503":0,"(anonymous 3):532":0,"getAncestorByClassName:530":0,"(anonymous 4):544":0,"getAncestorByTagName:542":0,"resolveEvent:649":0,"handleEvent:669":0,"preventDefault:717":0,"stopPropagation:720":0,"(anonymous 7):723":0,"(anonymous 8):726":0,"(anonymous 6):713":0,"fireEvent:708":0,"(anonymous 9):768":0,"}:769":0,"(anonymous 10):774":0,"}:775":0,"on:745":0,"method:814":0,"one:812":0,"removeEventListener:837":0,"(anonymous 11):907":0,"clearStaleEventBindings:906":0,"(anonymous 5):553":0,"(anonymous 12):975":0,"(anonymous 13):1011":0,"fn:1019":0,"animate:963":0,"doReflection:1048":0,"(anonymous 14):1086":0,"reflect:1046":0,"success:1155":0,"(anonymous 15):1161":0,"onabort:1182":0,"(anonymous 17):1198":0,"(anonymous 16):1197":0,"io:1142":0,"getScript:1216":0,"provide:1241":0,"(anonymous 18):1276":0,"(anonymous 19):1283":0,"extend:1261":0,"mix:1300":0,"augment:1316":0,"augmentProto:1337":0,"(anonymous 21):1360":0,"(anonymous 20):1357":0,"bind:1354":0,"add:1372":0,"(anonymous 22):1398":0,"defineTemplateBuffer:1526":0,"parseTemplate:1572":0,"cstr:1588":0,"Template:1609":0,"valueOf:1687":0,"parse:1732":0,"supplant:1750":0,"map:1778":0,"supplant:1837":0,"template:1511":0,"(anonymous 1):1":0};
_yuitest_coverage["js/mui.js"].coveredLines = 549;
_yuitest_coverage["js/mui.js"].coveredFunctions = 88;
_yuitest_coverline("js/mui.js", 1); (function() {

/*
 * mui Library
 * A miniature javascript suitable for use on mobile devices.
 */
_yuitest_coverfunc("js/mui.js", "(anonymous 1)", 1);
_yuitest_coverline("js/mui.js", 7); mui = {};

/**
 * Utility methods
 * @module util
 **/
_yuitest_coverline("js/mui.js", 13); var util = {
    
    /**
     * Utility class
     * @class Utility
     * @static
     */

    /*
     * Private attribute to store the current log level
     * @final _logLevel
     * @type Number
     * @private
     */
    _logLevel: 0,

    /**
     * Log a message or object to the console.
     * @method log
     * @param o {String|Object} The string or object to log to the debug console.
     **/        
    log: function(o) 
    {
        _yuitest_coverfunc("js/mui.js", "log", 34);
_yuitest_coverline("js/mui.js", 36); document.defaultView.console ? console.log(o) : '';
    },
    
    /**
     * Log a trace message or object to the console.
     * @method trace    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    trace: function(o)
    {
        _yuitest_coverfunc("js/mui.js", "trace", 44);
_yuitest_coverline("js/mui.js", 46); if(this._logLevel >= 3) {this.log.apply(this, arguments);}
    },
    
    /**
     * Log a debug message or object to the console.
     * @method debug    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    debug: function(o)
    {
        _yuitest_coverfunc("js/mui.js", "debug", 54);
_yuitest_coverline("js/mui.js", 56); if(this._logLevel >= 2) {this.log.apply(this, arguments);}
    },
    
    /**
     * Log a warning message or object to the console.
     * @method warn    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    warn: function(o)
    {
        _yuitest_coverfunc("js/mui.js", "warn", 64);
_yuitest_coverline("js/mui.js", 66); if(this._logLevel >= 1) {this.log.apply(this, arguments);}
    },
    
    /**
     * Log an error.  If second argument passed is true,
     * this throws an exception.
     * @method error
     * @param o {String} The error string
     * @param throwError {Boolean} If true, throw an exception.
     */
    error: function(o, throwError)
    {
        _yuitest_coverfunc("js/mui.js", "error", 76);
_yuitest_coverline("js/mui.js", 78); if(this._logLevel >= 0) {this.log.apply(this, arguments);}        
        _yuitest_coverline("js/mui.js", 79); if(throwError) {throw new Error(o);}
    },
    
    /**
     * The log level allows you to set the appropriate logging level
     * for your application
     * @method setLogLevel 
     * @param level {String} The desired log level
     */
    setLogLevel: function(level)
    {
        _yuitest_coverfunc("js/mui.js", "setLogLevel", 88);
_yuitest_coverline("js/mui.js", 90); var intLevel = 0;
        _yuitest_coverline("js/mui.js", 91); switch(level)
        {
            case 'trace':
                _yuitest_coverline("js/mui.js", 94); intLevel = 3;
                _yuitest_coverline("js/mui.js", 95); break;
            case 'debug':
                _yuitest_coverline("js/mui.js", 97); intLevel = 2;
                _yuitest_coverline("js/mui.js", 98); break;
            case 'warn':
                _yuitest_coverline("js/mui.js", 100); intLevel = 1;
                _yuitest_coverline("js/mui.js", 101); break;
            case 'error':
                _yuitest_coverline("js/mui.js", 103); intLevel = 0;
                _yuitest_coverline("js/mui.js", 104); break;
            default:
                _yuitest_coverline("js/mui.js", 106); intLevel = 0;
            
        }
        _yuitest_coverline("js/mui.js", 109); this._logLevel = intLevel;
    },

    /**
     * Iterate over an array
     * @method each
     * @param collection {Array} The array to iterate over
     * @param cb {Function} The callback function applied to each member of the array
     * @param ctx {Object} The scope applied to the callback function.
     **/
    each: function(collection, cb, ctx) 
    {
        _yuitest_coverfunc("js/mui.js", "each", 119);
_yuitest_coverline("js/mui.js", 121); if(!collection || !collection.length) 
        {
            _yuitest_coverline("js/mui.js", 123); return false;
        }
        _yuitest_coverline("js/mui.js", 125); for(var i=0,len=collection.length; i<len; i++) 
        {
            _yuitest_coverline("js/mui.js", 127); cb.call((ctx || collection[i]), collection[i], i);
        }
    },

    /**
     * Iterate over an object
     * @method iterate
     * @param obj {Object} The object to iterate over
     * @param cb {Function} The callback function applied to each member of the object
     * @param ctx {Object} The scope applied to the callback function.
     **/        
    iterate: function(obj, cb, ctx) 
    {
        _yuitest_coverfunc("js/mui.js", "iterate", 138);
_yuitest_coverline("js/mui.js", 140); ctx = ctx || obj;
        _yuitest_coverline("js/mui.js", 141); for(var prop in obj) 
        {
            _yuitest_coverline("js/mui.js", 143); if(obj.hasOwnProperty(prop)) 
            {
                _yuitest_coverline("js/mui.js", 145); cb.call(ctx, obj[prop], prop);
            }
        }            
    }
};

/**
 * DOM methods
 * @module dom
 **/
_yuitest_coverline("js/mui.js", 155); var dom = {
    
    /**
     * Dom class
     * @class Dom
     * @static
     */
    
    /**
     * Find an element by CSS query selector.  If parentNode is passed as second argument,
     * the CSS selector is relative that node.
     * @method get
     * @param selector {String} Valid CSS query selector
     * @param parentNode {HTMLElement} If present, CSS selector is relative to this DOM ndoe.
     * @return {HTMLElement} The single element matching the given selector.
     **/    
    get: function(selector, parentNode) 
    {
        _yuitest_coverfunc("js/mui.js", "get", 171);
_yuitest_coverline("js/mui.js", 173); if(selector instanceof HTMLElement) {return selector;}
        _yuitest_coverline("js/mui.js", 174); var matches = this.getAll(selector, parentNode);
        _yuitest_coverline("js/mui.js", 175); return !matches.length ? null : (matches.length === 0 ? null : matches[0]);
    },

    /**
     * Find a collection of elements by CSS query selector.  If parentNode is passed as second argument,
     * the CSS selector is relative that node.
     * @method getAll
     * @param selector {String} Valid CSS query selector
     * @param parentNode {HTMLElement} If present, CSS selector is relative to this DOM ndoe.    
     * @return {Array} An array of elements matching the given selector.
     **/    
    getAll: function(selector, parentNode) 
    {
        _yuitest_coverfunc("js/mui.js", "getAll", 186);
_yuitest_coverline("js/mui.js", 188); parentNode = parentNode || document;
        _yuitest_coverline("js/mui.js", 189); return Array.prototype.slice.call(parentNode.querySelectorAll(selector));
    },    

    /**
     * Create a DOM node.
     * @method createElement    
     * @param nodeName {String} The node name of the element to be created
     * @param options {Object} Attributes to be attached to the created element.
     * @return {HTMLElement} DOM node with passed in attriutes.
     **/    
    createElement: function(nodeName, options) 
    {
        _yuitest_coverfunc("js/mui.js", "createElement", 199);
_yuitest_coverline("js/mui.js", 201); var el = document.createElement(nodeName);
        _yuitest_coverline("js/mui.js", 202); for(var opt in options) 
        {
            _yuitest_coverline("js/mui.js", 204); if(options.hasOwnProperty(opt)) 
            {
                _yuitest_coverline("js/mui.js", 206); switch(opt) 
                {
                    case 'className':
                    case 'innerHTML':
                        _yuitest_coverline("js/mui.js", 210); el[opt] = options[opt];
                        _yuitest_coverline("js/mui.js", 211); break;
                    default:
                        _yuitest_coverline("js/mui.js", 213); el.setAttribute(opt, options[opt]);
                        _yuitest_coverline("js/mui.js", 214); break;
                }
            }
        }
        _yuitest_coverline("js/mui.js", 218); return el;
    },

    /**
     * Remove a node from the DOM.
     * @method removeElement    
     * @param el {String|Object} The CSS selector string or DOM node
     * @return {HTMLElement} The deleted node
     **/    
    removeElement: function(el) 
    {
        _yuitest_coverfunc("js/mui.js", "removeElement", 227);
_yuitest_coverline("js/mui.js", 229); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 230); if(el && el.parentNode) 
        {
            _yuitest_coverline("js/mui.js", 232); el.parentNode.removeChild(el);
        }
        _yuitest_coverline("js/mui.js", 234); return el;
    },

    /**
     * Insert an element before another element in the DOM.
     * @method insertBefore    
     * @param node {Object} 
     * @param refNode {String|Object} The CSS selector string or DOM node to insert before
     **/
    insertBefore: function(node, refNode) 
    {
        _yuitest_coverfunc("js/mui.js", "insertBefore", 243);
_yuitest_coverline("js/mui.js", 245); refNode = (typeof el === 'string') ? this.get(refNode) : refNode;
        _yuitest_coverline("js/mui.js", 246); refNode.parentNode.insertBefore(node, refNode);
    },

    /**
     * Insert an element after another element in the DOM.
     * @method insertAfter    
     * @param node {Object} 
     * @param refNode {String|Object} The CSS selector string or DOM node to insert after
     **/
    insertAfter: function(node, refNode) 
    {
        _yuitest_coverfunc("js/mui.js", "insertAfter", 255);
_yuitest_coverline("js/mui.js", 257); refNode = (typeof el === 'string') ? this.get(refNode) : refNode;
        _yuitest_coverline("js/mui.js", 258); refNode.parentNode.insertBefore(node, refNode.nextSibling);
    },

    /**
     * Get the computed style for a given element.
     * @method getStyle    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param style {String} The style property.
     * @return {String} Computed style for the given node and property
     **/
    getStyle: function(el, style) 
    {
        _yuitest_coverfunc("js/mui.js", "getStyle", 268);
_yuitest_coverline("js/mui.js", 270); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 271); if(!el)
        {
            _yuitest_coverline("js/mui.js", 273); return false;
        }
        _yuitest_coverline("js/mui.js", 275); return window.getComputedStyle ? 
            document.defaultView.getComputedStyle(el, null).getPropertyValue(style) :
            (el.currentStyle ? el.currentStyle[style] : el.style[style]);
    },

    /**
     * Set a style for a given element.
     * @method setStyle    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param name {String} The style property name.
     * @param value {String} The style property value.
     **/    
    setStyle: function(el, name, value) 
    {
        _yuitest_coverfunc("js/mui.js", "setStyle", 287);
_yuitest_coverline("js/mui.js", 289); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 290); if(el && el.style) 
        {
            _yuitest_coverline("js/mui.js", 292); if (value === null){
                 _yuitest_coverline("js/mui.js", 293); el.style.removeProperty(name);
            } else {
                 _yuitest_coverline("js/mui.js", 295); el.style[name] = value;
            }                
        }
    },

    /**
     * Set a collection of styles for a given element.
     * @method setStyles    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param styles {Object} Object literal containing style definitions.
     **/    
    setStyles: function(el, styles) 
    {
        _yuitest_coverfunc("js/mui.js", "setStyles", 306);
_yuitest_coverline("js/mui.js", 308); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 309); if(el && el.style) 
        {
            _yuitest_coverline("js/mui.js", 311); this.iterate(styles, function(value, name) 
            {
                _yuitest_coverfunc("js/mui.js", "(anonymous 2)", 311);
_yuitest_coverline("js/mui.js", 313); this.setStyle(el, name, value);
            }, this);
        }
    },

    /**
     * Get the (x,y) coordinates for a given element.
     * @method getXY    
     * @param el {String|Object} The CSS selector string or DOM node
     * @return {Array} Array containing the (x,y) coordinates of the element.
     **/    
    getXY: function(el, refParent) 
    {
        _yuitest_coverfunc("js/mui.js", "getXY", 324);
_yuitest_coverline("js/mui.js", 326); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 327); var pos = [el.offsetLeft, el.offsetTop];
        _yuitest_coverline("js/mui.js", 328); var parentNode = el.offsetParent;
        _yuitest_coverline("js/mui.js", 329); var accountForBody = (this.getStyle(el, 'position') === 'absolute' && el.offsetParent == el.ownerDocument.body);
        _yuitest_coverline("js/mui.js", 330); if(parentNode != el) 
        {
            _yuitest_coverline("js/mui.js", 332); while(parentNode && parentNode != refParent) 
            {
                _yuitest_coverline("js/mui.js", 334); pos[0] += parentNode.offsetLeft;
                _yuitest_coverline("js/mui.js", 335); pos[1] += parentNode.offsetTop;
                _yuitest_coverline("js/mui.js", 336); if(!accountForBody && parentNode.style.position == 'absolute') 
                {
                    _yuitest_coverline("js/mui.js", 338); accountForBody = true;
                }
                
                // sometimes the parentElement is not the same as the offsetParent so it can get "skipped"
                _yuitest_coverline("js/mui.js", 342); if (refParent == parentNode.parentNode){
                    _yuitest_coverline("js/mui.js", 343); parentNode = null;
                } else {
                    _yuitest_coverline("js/mui.js", 345); parentNode = parentNode.offsetParent;
                } 
            }
        }
        _yuitest_coverline("js/mui.js", 349); if(accountForBody) 
        {
            _yuitest_coverline("js/mui.js", 351); pos[0] -= el.ownerDocument.body.offsetLeft;
            _yuitest_coverline("js/mui.js", 352); pos[1] -= el.ownerDocument.body.offsetTop;            
        }

        _yuitest_coverline("js/mui.js", 355); return pos;
    },

    /**
     * Set the (x,y) coordinates of a given element
     * @method setXY    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param xy {Array} Array containing the (x,y) coordinates to be set.
     **/
    setXY: function(el, xy) 
    {
        _yuitest_coverfunc("js/mui.js", "setXY", 364);
_yuitest_coverline("js/mui.js", 366); el = (typeof el === 'string') ? this.get(el) : el;
        // @TODO: account for position: relative vs. position: absolute vs position: null
        _yuitest_coverline("js/mui.js", 368); this.setStyle(el, 'left', xy[0]+'px');
        _yuitest_coverline("js/mui.js", 369); this.setStyle(el, 'top', xy[1]+'px');
    },

    /**
     * Add a class name to a DOM node
     * @method addClass    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     **/    
    addClass: function(el, className) 
    {
        _yuitest_coverfunc("js/mui.js", "addClass", 378);
_yuitest_coverline("js/mui.js", 380); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 381); if(el) 
        {
            _yuitest_coverline("js/mui.js", 383); if(!el.className.match(className)) 
            {
                _yuitest_coverline("js/mui.js", 385); el.className += ' ' + className;
            }                
        }
    },

    /**
     * Remove a class name from a DOM node
     * @method removeClass    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     **/    
    removeClass: function(el, className) 
    {
        _yuitest_coverfunc("js/mui.js", "removeClass", 396);
_yuitest_coverline("js/mui.js", 398); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 399); if(el) 
        {
            _yuitest_coverline("js/mui.js", 401); el.className = el.className.replace(className, '').replace(/^\s+|\s+$/g,"");    
        }
    },

    /**
     * Check if a DOM node has a given class name.
     * @method hasClass    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     * @return True if the node has the class name applied to it, false otherwise.
     **/    
    hasClass: function(el, className) 
    {
        _yuitest_coverfunc("js/mui.js", "hasClass", 412);
_yuitest_coverline("js/mui.js", 414); var hasClass = false;
        _yuitest_coverline("js/mui.js", 415); el = (typeof el === 'string') ? this.get(el) : el;
        _yuitest_coverline("js/mui.js", 416); if(el && el.className) 
        {
            _yuitest_coverline("js/mui.js", 418); hasClass = (el.className.match(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)')) !== null);
        }
        _yuitest_coverline("js/mui.js", 420); return hasClass;
    },
    
    /**
     * Toggle a classname for a particular DOM element
     * @method toggleClass
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     **/
    toggleClass: function(el, className)
    {
        _yuitest_coverfunc("js/mui.js", "toggleClass", 429);
_yuitest_coverline("js/mui.js", 431); if(!dom.hasClass(el, className)) {dom.addClass(el, className);}
        else {_yuitest_coverline("js/mui.js", 432); dom.removeClass(el, className);}
    },
    
    /**
     * Add a string of CSS to the document
     * @method css
     * @param css {String} The CSS string
     */
    css: function(css)
    {
        _yuitest_coverfunc("js/mui.js", "css", 440);
_yuitest_coverline("js/mui.js", 442); var styleNode = document.createElement('style');
        _yuitest_coverline("js/mui.js", 443); styleNode.setAttribute('type', 'text/css');
        _yuitest_coverline("js/mui.js", 444); styleNode.appendChild(document.createTextNode(css));
        _yuitest_coverline("js/mui.js", 445); document.getElementsByTagName('head')[0].appendChild(styleNode);
    },
    
    /**
     * Check if a node is contained inside another node.
     * @method contains    
     * @param parent {Object} The CSS selector string or DOM node for the parent node.
     * @param el {Object} The CSS selector string or DOM node for the child node.    
     * @param orig {HTMLElement} The original parent node, used in recursion
     * @return True if el is contained inside of parentNode, false otherwise.
     **/
     contains: function(parent, el, orig) 
     {
         _yuitest_coverfunc("js/mui.js", "contains", 456);
_yuitest_coverline("js/mui.js", 458); if(orig === document || orig === document.body) 
         {
             _yuitest_coverline("js/mui.js", 460); return true;
         } 
         else {_yuitest_coverline("js/mui.js", 462); if(el === document.body)
         {
             _yuitest_coverline("js/mui.js", 464); return false;
         }
         else {_yuitest_coverline("js/mui.js", 466); if(el === parent)
         {
             _yuitest_coverline("js/mui.js", 468); return true;
         } 
         else {_yuitest_coverline("js/mui.js", 470); if(el && el.parentNode)
         {
             _yuitest_coverline("js/mui.js", 472); return this.contains(parent, el.parentNode, orig || parent);
         }}}}
         _yuitest_coverline("js/mui.js", 474); return false;
     },

    /**
     * Check if a node exists in the document.
     * @method inDocument    
     * @param el {String|Object} The CSS selector string or DOM node.
     * @return True if el is contained inside the document, false otherwise.
     **/
    inDocument: function(el) 
    {
        _yuitest_coverfunc("js/mui.js", "inDocument", 483);
_yuitest_coverline("js/mui.js", 485); try 
        {
            _yuitest_coverline("js/mui.js", 487); return mui.contains(document.body, el);                
        } 
        catch(e) {
            _yuitest_coverline("js/mui.js", 490); return false;
        }
    },

    /**
     * Get an ancestor node by a comparison function
     * @method getAncestorBy    
     * @param node {String|Object} The CSS selector string or DOM node.
     * @param fn {Function} The comparison function - return true or false.
     * @param scope {Object} The scope of the passed function (optional)
     * @param parentNode {HTMLElement} the top element where to stop the search, body by default
     * @return The ancestor node if found, false otherwise.
     **/
    getAncestorBy: function(node, fn, scope, parentNode) 
    {
        _yuitest_coverfunc("js/mui.js", "getAncestorBy", 503);
_yuitest_coverline("js/mui.js", 505); node = (typeof node === 'string') ? this.get(node) : node;
        _yuitest_coverline("js/mui.js", 506); scope = scope || fn;
        _yuitest_coverline("js/mui.js", 507); if(fn.call(scope, node)) 
        {
            _yuitest_coverline("js/mui.js", 509); return node;
        } 
        else {_yuitest_coverline("js/mui.js", 511); if(node === document.body || node === parentNode) 
        {
            _yuitest_coverline("js/mui.js", 513); return false;
        } 
        else {_yuitest_coverline("js/mui.js", 515); if(node)
        {
            _yuitest_coverline("js/mui.js", 517); return this.getAncestorBy(node.parentNode, fn, scope);
        }}}
        _yuitest_coverline("js/mui.js", 519); return false;
    },

    /**
     * Get an ancestor node by a class name
     * @method getAncestorByClassName
     * @param node {String|Object} The CSS selector string or DOM node.
     * @param className {String} The name of the class to search for
     * @param parentNode {HTMLElement} the top element where to stop the search, body by default
     * @return The ancestor node if found, false otherwise.
     **/
    getAncestorByClassName: function(node, className, parentNode) 
    {
        _yuitest_coverfunc("js/mui.js", "getAncestorByClassName", 530);
_yuitest_coverline("js/mui.js", 532); return this.getAncestorBy(node, function(el) { _yuitest_coverfunc("js/mui.js", "(anonymous 3)", 532);
return mui.hasClass(el, className); }, null, parentNode);
    },

    /**
     * Get an ancestor node by tag name
     * @method getAncestorByTagName    
     * @param node {String|Object} The CSS selector string or DOM node.
     * @param tagName {String} The tag name of the element to search for.
     * @return The ancestor node if found, false otherwise.
     **/
    getAncestorByTagName: function(node, tagName) 
    {
        _yuitest_coverfunc("js/mui.js", "getAncestorByTagName", 542);
_yuitest_coverline("js/mui.js", 544); return this.getAncestorBy(node, function(el) { _yuitest_coverfunc("js/mui.js", "(anonymous 4)", 544);
return el.nodeName.toLowerCase() === tagName; });
    }
        
};

/**
 * Event methods
 * @module event
 **/
_yuitest_coverline("js/mui.js", 553); var event = (function() {
    
    /**
     * Event class
     * @class Event
     * @static
     */    

    /*
     * Store event bindings so that they can later be unbound by
     * calling mui.removeEventListener
     * @property _bindings
     * @type Array
     * @private
     */
    _yuitest_coverfunc("js/mui.js", "(anonymous 5)", 553);
_yuitest_coverline("js/mui.js", 568); var _bindings = [];
    
    /*
     * Store click event bindings for speedy clicks
     * @property _clicks
     * @type Array
     * @private
     */
    _yuitest_coverline("js/mui.js", 576); var _clicks = [];
    
    /*
     * Store touchend event bindings for event normalization
     * @property _touchends
     * @type Array
     * @private
     */
    _yuitest_coverline("js/mui.js", 584); var _touchends = [];
    
    /*
     * Store the touchstart event for event normalization
     * @property _touchstartEvt
     * @type Event
     * @private
     */
    _yuitest_coverline("js/mui.js", 592); var _touchstartEvt = null;
    /*
     * Store the client X for the first toch
     * @property _firstY
     * @type Number
     * @private
     */
    _yuitest_coverline("js/mui.js", 599); var _firstY    = null;
    
    /*
     * Store the client X for the last toch
     * @property _lastY
     * @type Number
     * @private
     */
    _yuitest_coverline("js/mui.js", 607); var _lastY     = null;
        
    /*
     * Store the touchstart time for speedy clicks
     * @property _touchstartTime
     * @type Number
     * @private
     */
    _yuitest_coverline("js/mui.js", 615); var _touchstartTime = null;
    
    /*
     * Store state of touches - whether or not user is moving
     * @property _touchmoved
     * @type BOolean
     * @private
     */
    _yuitest_coverline("js/mui.js", 623); var _touchmoved = 0;
    
    /*
     * Store boolean flag to determine if iPhone for speedy clicks
     * @property _isIphone
     * @type Boolean
     * @private
     */
    _yuitest_coverline("js/mui.js", 631); var _isIphone = /i(Phone|P(o|a)d)/.test(navigator.userAgent) && typeof window.ontouchstart !== 'undefined';

    /*
     * Store boolean flag to determine if Android for speedy clicks
     * @property _isAndroid
     * @type Boolean
     * @private
     */
    _yuitest_coverline("js/mui.js", 639); var _isAndroid = /Android/.test(navigator.userAgent);
    
    /*
     * Resolve events by adding a touches array for browsers which do 
     * not support touch events
     * @method resolveEvent
     * @param e {Event} The DOM event
     * @return {Event} The normalized DOM event
     * @private
     */
    _yuitest_coverline("js/mui.js", 649); function resolveEvent(e)
    {
        _yuitest_coverfunc("js/mui.js", "resolveEvent", 649);
_yuitest_coverline("js/mui.js", 651); var ev = e;
        _yuitest_coverline("js/mui.js", 652); switch(e.type)
        {
            case 'mousedown':
            case 'mousemove':   
            case 'mouseup':         
                _yuitest_coverline("js/mui.js", 657); ev.touches = [e];
                _yuitest_coverline("js/mui.js", 658); break;
        }
        _yuitest_coverline("js/mui.js", 660); return ev;
    }
    
    /**
     * Event handler - used to allow for speedy clicks on iPhone
     * @method fireEvent    
     * @param e {Event} The generated event
     * @private
     **/
    _yuitest_coverline("js/mui.js", 669); function handleEvent(e)
    {
        _yuitest_coverfunc("js/mui.js", "handleEvent", 669);
_yuitest_coverline("js/mui.js", 671); switch(e.type)
        {
            case 'touchstart':
                _yuitest_coverline("js/mui.js", 674); _touchstartEvt = e;
                _yuitest_coverline("js/mui.js", 675); _touchmoved = 0;
                _yuitest_coverline("js/mui.js", 676); _touchstartTime = +(new Date);
                _yuitest_coverline("js/mui.js", 677); _firstY = _lastY = _touchstartEvt.touches[0].clientY;

                _yuitest_coverline("js/mui.js", 679); break;
            case 'touchmove':
                _yuitest_coverline("js/mui.js", 681); _touchmoved++;  
                _yuitest_coverline("js/mui.js", 682); _lastY = e.touches[0].clientY;
                _yuitest_coverline("js/mui.js", 683); break;
            case 'touchend':
                // Fire touchend
                _yuitest_coverline("js/mui.js", 686); fireEvent('touchend', e);
                
                // Fire click, if there is a _touchstartEvt
                _yuitest_coverline("js/mui.js", 689); if(_touchstartEvt){   
                    _yuitest_coverline("js/mui.js", 690); if ( (_isIphone && !_touchmoved) || ( _isAndroid && _touchmoved <= 2 && (e.timeStamp - _touchstartTime) < 500 && Math.abs(_firstY - _lastY) < 15) ){
                        _yuitest_coverline("js/mui.js", 691); fireEvent('click', e);
                    }
                }
                _yuitest_coverline("js/mui.js", 694); _firstY = null;
                _yuitest_coverline("js/mui.js", 695); _lastY  = null;
                _yuitest_coverline("js/mui.js", 696); _touchstartEvt = null;              
                _yuitest_coverline("js/mui.js", 697); break;
        }
    }
    
    /**
     * Fire an event - used to allow for speedy clicks on iPhone
     * @method fireEvent    
     * @param type {String} The event type (click, touchstart, etc)
     * @param e {Event} The generated event
     * @private
     **/
    _yuitest_coverline("js/mui.js", 708); function fireEvent(type, e)
    {
        _yuitest_coverfunc("js/mui.js", "fireEvent", 708);
_yuitest_coverline("js/mui.js", 710); var arr = type === 'click' ? _clicks : _touchends;
        _yuitest_coverline("js/mui.js", 711); if(_touchstartEvt)
        {
            _yuitest_coverline("js/mui.js", 713); mui.each(arr, function(b) {
                _yuitest_coverfunc("js/mui.js", "(anonymous 6)", 713);
_yuitest_coverline("js/mui.js", 714); if(b && mui.contains(b.element, _touchstartEvt.target))
                {
                    _yuitest_coverline("js/mui.js", 716); var evt = {};
                    _yuitest_coverline("js/mui.js", 717); evt.preventDefault = function() { 
                        _yuitest_coverfunc("js/mui.js", "preventDefault", 717);
_yuitest_coverline("js/mui.js", 718); e.preventDefault(); 
                    };
                    _yuitest_coverline("js/mui.js", 720); evt.stopPropagation = function() { 
                        _yuitest_coverfunc("js/mui.js", "stopPropagation", 720);
_yuitest_coverline("js/mui.js", 721); e.stopPropagation(); 
                    };
                    _yuitest_coverline("js/mui.js", 723); mui.iterate(_touchstartEvt, function(v, n) {
                        _yuitest_coverfunc("js/mui.js", "(anonymous 7)", 723);
_yuitest_coverline("js/mui.js", 724); evt[n] = v;
                    });
                    _yuitest_coverline("js/mui.js", 726); mui.iterate(_touchstartEvt.touches[0], function(v, n) {
                        _yuitest_coverfunc("js/mui.js", "(anonymous 8)", 726);
_yuitest_coverline("js/mui.js", 727); evt[n] = v;
                    });
                    _yuitest_coverline("js/mui.js", 729); evt.type = type;
                    _yuitest_coverline("js/mui.js", 730); b.method(evt);
                }
            });
        }
    }

    /**
     * Attach an event to a given element
     * @method on
     * @param el {String|Object} The CSS selector string or DOM node.
     * @param type {String} The event type (click, touchstart, etc)
     * @param fn {Function} The callback function fired on the event
     * @param ctx {Object} The scope to be applied to the callback
     * @param useCapture {Boolean} Whether or not to initiate capture
     **/
    _yuitest_coverline("js/mui.js", 745); function on(el, type, fn, ctx, useCapture)
    {
        _yuitest_coverfunc("js/mui.js", "on", 745);
_yuitest_coverline("js/mui.js", 747); var method, fauxEvt;
        _yuitest_coverline("js/mui.js", 748); ctx = ctx || el;
        _yuitest_coverline("js/mui.js", 749); el = (typeof el === 'string') ? mui.get(el) : el;
        _yuitest_coverline("js/mui.js", 750); useCapture = !!useCapture;
        _yuitest_coverline("js/mui.js", 751); if(el) 
        {
            _yuitest_coverline("js/mui.js", 753); if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) 
            {
                _yuitest_coverline("js/mui.js", 755); switch(type) 
                {
                    case 'touchstart':
                        _yuitest_coverline("js/mui.js", 758); type = 'mousedown';
                        _yuitest_coverline("js/mui.js", 759); break;
                    case 'touchmove':
                        _yuitest_coverline("js/mui.js", 761); type = 'mousemove';
                        _yuitest_coverline("js/mui.js", 762); break;
                    case 'touchend':
                        _yuitest_coverline("js/mui.js", 764); type = 'mouseup';
                        _yuitest_coverline("js/mui.js", 765); break;
                }                
                _yuitest_coverline("js/mui.js", 767); method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? 
                     function(e) { _yuitest_coverfunc("js/mui.js", "(anonymous 9)", 768);
_yuitest_coverline("js/mui.js", 768); fn.handleEvent.call(fn, resolveEvent(e)); }: 
                    function(e) { _yuitest_coverfunc("js/mui.js", "}", 769);
_yuitest_coverline("js/mui.js", 769); fn.call(ctx, resolveEvent(e)); };
            }
            else
            {
                _yuitest_coverline("js/mui.js", 773); method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? 
                    function(e) { _yuitest_coverfunc("js/mui.js", "(anonymous 10)", 774);
_yuitest_coverline("js/mui.js", 774); fn.handleEvent.call(fn, e); } : 
                    function(e) { _yuitest_coverfunc("js/mui.js", "}", 775);
_yuitest_coverline("js/mui.js", 775); fn.call(ctx, e); };
            }
            
            _yuitest_coverline("js/mui.js", 778); fauxEvt = {
                element: el,
                type: type,
                originalMethod: fn,
                method: method,
                useCapture: useCapture
            };

            _yuitest_coverline("js/mui.js", 786); _bindings.push(fauxEvt);

            _yuitest_coverline("js/mui.js", 788); if((_isIphone || _isAndroid) && type === 'click')
            {
                _yuitest_coverline("js/mui.js", 790); _clicks.push(fauxEvt);
            }
            else {_yuitest_coverline("js/mui.js", 792); if((_isIphone || _isAndroid) && type === 'touchend')
            {
                _yuitest_coverline("js/mui.js", 794); _touchends.push(fauxEvt);
            }
            else
            {
                _yuitest_coverline("js/mui.js", 798); el.addEventListener(type, method, useCapture);
            }}
        }
    }
    
    /**
     * Attach an event to a given element one time
     * @method one
     * @param el {String|Object} The CSS selector string or DOM node.
     * @param type {String} The event type (click, touchstart, etc)
     * @param fn {Function} The callback function fired on the event
     * @param ctx {Object} The scope to be applied to the callback
     * @param useCapture {Boolean} Whether or not to initiate capture
     **/
    _yuitest_coverline("js/mui.js", 812); function one(el, type, fn, ctx, useCapture)
    {
        _yuitest_coverfunc("js/mui.js", "one", 812);
_yuitest_coverline("js/mui.js", 814); var method = function() {
            _yuitest_coverfunc("js/mui.js", "method", 814);
_yuitest_coverline("js/mui.js", 815); if(fn.handleEvent && typeof fn.handleEvent === 'function')
            {
                _yuitest_coverline("js/mui.js", 817); fn.handleEvent.apply(fn, arguments);
            }
            else
            {
                _yuitest_coverline("js/mui.js", 821); fn.apply(ctx||fn, arguments);
            }
            _yuitest_coverline("js/mui.js", 823); removeEventListener(el, type, method, ctx, useCapture);
        };
        _yuitest_coverline("js/mui.js", 825); on(el, type, method, ctx, useCapture);
    }
    
    /**
     * Remove an event handler from a given element
     * @method removeEventListener    
     * @param el {String|Object} The CSS selector string or DOM node.
     * @param type {String} The event type (click, touchstart, etc)
     * @param fn {Function} The callback function fired on the event
     * @param ctx {Object} The scope to be applied to the callback
     * @param useCapture {Boolean} Whether or not to initiate capture    
     **/
    _yuitest_coverline("js/mui.js", 837); function removeEventListener(el, type, fn, ctx, useCapture)
    {
        _yuitest_coverfunc("js/mui.js", "removeEventListener", 837);
_yuitest_coverline("js/mui.js", 839); var i=0, len=_bindings.length, b, method;
        _yuitest_coverline("js/mui.js", 840); ctx = ctx || el;
        _yuitest_coverline("js/mui.js", 841); el = (typeof el === 'string') ? mui.get(el) : el;
        _yuitest_coverline("js/mui.js", 842); useCapture = !!useCapture;
        _yuitest_coverline("js/mui.js", 843); if(el) 
        {
            _yuitest_coverline("js/mui.js", 845); if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) 
            {
                _yuitest_coverline("js/mui.js", 847); switch(type) 
                {
                    case 'touchstart':
                        _yuitest_coverline("js/mui.js", 850); type = 'mousedown';
                        _yuitest_coverline("js/mui.js", 851); break;
                    case 'touchmove':
                        _yuitest_coverline("js/mui.js", 853); type = 'mousemove';
                        _yuitest_coverline("js/mui.js", 854); break;
                    case 'touchend':
                        _yuitest_coverline("js/mui.js", 856); type = 'mouseup';
                        _yuitest_coverline("js/mui.js", 857); break;
                }                
            }
            
            _yuitest_coverline("js/mui.js", 861); for(i; i<len; i++)
            {
                _yuitest_coverline("js/mui.js", 863); b = _bindings[i];
                _yuitest_coverline("js/mui.js", 864); if(b.type === type && b.useCapture === useCapture && b.element === el && b.originalMethod === fn)
                {
                    _yuitest_coverline("js/mui.js", 866); el.removeEventListener(type, b.method, b.useCapture);
                    _yuitest_coverline("js/mui.js", 867); _bindings.splice(i, 1);
                    _yuitest_coverline("js/mui.js", 868); i--;
                    _yuitest_coverline("js/mui.js", 869); len--;
                }
                else {_yuitest_coverline("js/mui.js", 871); if(b.type === type && b.useCapture === useCapture && b.element === el && !fn)
                {
                    _yuitest_coverline("js/mui.js", 873); el.removeEventListener(type, b.method, b.useCapture);
                    _yuitest_coverline("js/mui.js", 874); _bindings.splice(i, 1);
                    _yuitest_coverline("js/mui.js", 875); i--;
                    _yuitest_coverline("js/mui.js", 876); len--;
                }}

                _yuitest_coverline("js/mui.js", 879); if((typeof window.ontouchstart !== 'undefined' && !mui.UA.Chrome) && (type === 'click' || type === 'touchend'))
                {
                    _yuitest_coverline("js/mui.js", 881); var arr = type === 'click' ? _clicks : _touchends;
                    _yuitest_coverline("js/mui.js", 882); for(var j=0, len2=arr.length; j<len2; j++)
                    {
                        _yuitest_coverline("js/mui.js", 884); var c = arr[j];
                        _yuitest_coverline("js/mui.js", 885); if(c.useCapture === useCapture && c.element === el && c.originalMethod === fn)
                        {
                            _yuitest_coverline("js/mui.js", 887); arr.splice(j, 1);
                            _yuitest_coverline("js/mui.js", 888); j--;
                            _yuitest_coverline("js/mui.js", 889); len2--;
                        }
                        else {_yuitest_coverline("js/mui.js", 891); if(c.useCapture === useCapture && c.element === el && !fn)
                        {
                            _yuitest_coverline("js/mui.js", 893); arr.splice(j, 1);
                            _yuitest_coverline("js/mui.js", 894); j--;
                            _yuitest_coverline("js/mui.js", 895); len2--;
                        }}
                    }
                    _yuitest_coverline("js/mui.js", 898); if(type === 'click') {_clicks = arr;}
                    else {_yuitest_coverline("js/mui.js", 899); _touchends = arr;}
                }
            }
        }
    }
    
    // Temporary cleanup method for stale event bindings.
    _yuitest_coverline("js/mui.js", 906); function clearStaleEventBindings() {
        _yuitest_coverfunc("js/mui.js", "clearStaleEventBindings", 906);
_yuitest_coverline("js/mui.js", 907); _bindings = _bindings.filter(function(element, index, array) {
            _yuitest_coverfunc("js/mui.js", "(anonymous 11)", 907);
_yuitest_coverline("js/mui.js", 908); return mui.inDocument(element.element);
        });
    }

    // Attach listeners to document for speedy clicks on iPhone
    _yuitest_coverline("js/mui.js", 913); if(_isIphone || _isAndroid)
    {
        _yuitest_coverline("js/mui.js", 915); document.addEventListener('touchstart', handleEvent, true);
        _yuitest_coverline("js/mui.js", 916); document.addEventListener('touchmove', handleEvent, true);
        _yuitest_coverline("js/mui.js", 917); document.addEventListener('touchend', handleEvent, true);
    }
    
    // Public methods
    _yuitest_coverline("js/mui.js", 921); return {
        on: on,
        one: one,
        removeEventListener: removeEventListener,
        clearStaleEventBindings: clearStaleEventBindings
    };
    
})();

/**
 * Animation methods
 * @module anim
 **/
_yuitest_coverline("js/mui.js", 934); var anim = {
    
    /**
     * Animation class
     * @class Animation
     * @static
     */

    /**
     * Animate an object's position, using webkit transitions.
     * @method animate
     * @param el {String|Object} The CSS selector string or DOM node.
     * @param options {Object} The animation configuration
     *   Options are: properties, easing, duration, callback
     * Example:
     *    Animating a position 100px up and 100px to the left:
     *    
     *    mui.animate('#the-element', {
     *         properties: {
     *            top: '-100px',
     *            left: '-100px',
     *         },
     *      easing: 'ease-out',
     *        duration: '0.5s',
     *      callback: {
     *          onComplete: myFunc
     *      }
     *    });
     **/
    animate: function(el, options) 
    {    
        _yuitest_coverfunc("js/mui.js", "animate", 963);
_yuitest_coverline("js/mui.js", 965); el = (typeof el === 'string') ? mui.get(el) : el;
        _yuitest_coverline("js/mui.js", 966); var posStyle = mui.getStyle(el, 'position');
        _yuitest_coverline("js/mui.js", 967); if(posStyle != 'absolute' || posStyle != 'relative') 
        {
            _yuitest_coverline("js/mui.js", 969); mui.setStyle(el, 'position', 'relative');
        }
        _yuitest_coverline("js/mui.js", 971); var styles = {};
        _yuitest_coverline("js/mui.js", 972); var duration = options.duration || '350ms';
        _yuitest_coverline("js/mui.js", 973); var properties = [];
        _yuitest_coverline("js/mui.js", 974); var transforms = [];
        _yuitest_coverline("js/mui.js", 975); mui.iterate(options.properties, function(value, property) 
        {
            _yuitest_coverfunc("js/mui.js", "(anonymous 12)", 975);
_yuitest_coverline("js/mui.js", 977); switch(property) 
            {
                case 'left':
                case 'right':
                    _yuitest_coverline("js/mui.js", 981); el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';
                    _yuitest_coverline("js/mui.js", 982); property = '-webkit-transform';
                    _yuitest_coverline("js/mui.js", 983); value = 'translateX('+value+')';
                    _yuitest_coverline("js/mui.js", 984); transforms.push( value );
                    _yuitest_coverline("js/mui.js", 985); break;
                case 'top':
                case 'bottom':
                    _yuitest_coverline("js/mui.js", 988); el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';                
                    _yuitest_coverline("js/mui.js", 989); property = '-webkit-transform';
                    _yuitest_coverline("js/mui.js", 990); value = 'translateY('+value+')';
                    _yuitest_coverline("js/mui.js", 991); transforms.push( value );
                    _yuitest_coverline("js/mui.js", 992); break;
                default:
                    _yuitest_coverline("js/mui.js", 994); styles[property] = value;
                    _yuitest_coverline("js/mui.js", 995); break;
            }
            _yuitest_coverline("js/mui.js", 997); properties.push(property);
        });
        
        _yuitest_coverline("js/mui.js", 1000); if(transforms.length > 0) 
        {
            _yuitest_coverline("js/mui.js", 1002); if(styles['-webkit-transform']) {styles['-webkit-transform'] += ' ' + transforms.join(' ');}
            else {_yuitest_coverline("js/mui.js", 1003); styles['-webkit-transform'] = transforms.join(' ');}
        }
        
        _yuitest_coverline("js/mui.js", 1006); el.style.webkitTransitionDuration = duration;
        _yuitest_coverline("js/mui.js", 1007); el.style.webkitTransitionProperty = properties.join(' ');
        
        _yuitest_coverline("js/mui.js", 1009); if(options.easing) {el.style.webkitTransitionTimingFunction = options.easing;}

        _yuitest_coverline("js/mui.js", 1011); mui.iterate(styles, function(value, name) 
        {
            _yuitest_coverfunc("js/mui.js", "(anonymous 13)", 1011);
_yuitest_coverline("js/mui.js", 1013); el.style[name] = value;
        });            
        
        _yuitest_coverline("js/mui.js", 1016); if(options.callback)
        {
            _yuitest_coverline("js/mui.js", 1018); var scope = options.callback.scope || options.callback.onComplete;
            _yuitest_coverline("js/mui.js", 1019); var fn = function()
            {
                _yuitest_coverfunc("js/mui.js", "fn", 1019);
_yuitest_coverline("js/mui.js", 1021); options.callback.onComplete.call(scope);
                _yuitest_coverline("js/mui.js", 1022); el.removeEventListener('webkitTransitionEnd', fn, false);
            };
            _yuitest_coverline("js/mui.js", 1024); el.addEventListener('webkitTransitionEnd', fn, false);
        }
    }        
};

/**
 * Effects methods
 * @module fx
 **/
_yuitest_coverline("js/mui.js", 1033); var fx = {
    
    /**
     * FX class
     * @class FX
     * @static
     */
    
    /**
     * Apply a reflection directly underneath a given image.
     * @method reflect
     * @param img {HTMLElement} The <img> element.
     **/
    reflect: function(img) 
    {            
        _yuitest_coverfunc("js/mui.js", "reflect", 1046);
_yuitest_coverline("js/mui.js", 1048); var doReflection = function(i) 
        {
            _yuitest_coverfunc("js/mui.js", "doReflection", 1048);
_yuitest_coverline("js/mui.js", 1050); var container = document.createElement('div');
            _yuitest_coverline("js/mui.js", 1051); container.className = 'mui-reflect-container';
            _yuitest_coverline("js/mui.js", 1052); img.parentNode.insertBefore(container, img);
            _yuitest_coverline("js/mui.js", 1053); container.appendChild(img);
            _yuitest_coverline("js/mui.js", 1054); var canvas = document.createElement('canvas');
            _yuitest_coverline("js/mui.js", 1055); var ctx = canvas.getContext("2d");
            _yuitest_coverline("js/mui.js", 1056); var height = 40;
            _yuitest_coverline("js/mui.js", 1057); var opacity = 0.3;

            _yuitest_coverline("js/mui.js", 1059); container.appendChild(canvas);

            _yuitest_coverline("js/mui.js", 1061); canvas.style.height = height+'px';
            _yuitest_coverline("js/mui.js", 1062); canvas.style.width = img.offsetWidth+'px';
            _yuitest_coverline("js/mui.js", 1063); canvas.height = height;
            _yuitest_coverline("js/mui.js", 1064); canvas.width = img.offsetWidth;

            _yuitest_coverline("js/mui.js", 1066); ctx.save();

            _yuitest_coverline("js/mui.js", 1068); ctx.translate(0,img.offsetHeight-1);
            _yuitest_coverline("js/mui.js", 1069); ctx.scale(1,-1);
            _yuitest_coverline("js/mui.js", 1070); ctx.drawImage(img, 0, 0, img.offsetWidth, img.offsetHeight);

            _yuitest_coverline("js/mui.js", 1072); ctx.restore();

            _yuitest_coverline("js/mui.js", 1074); ctx.globalCompositeOperation = "destination-out";
            _yuitest_coverline("js/mui.js", 1075); var grad = ctx.createLinearGradient(0, 0, 0, height);
            _yuitest_coverline("js/mui.js", 1076); grad.addColorStop(1, "rgba(255, 255, 255, 1.0)");
            _yuitest_coverline("js/mui.js", 1077); grad.addColorStop(0, "rgba(255, 255, 255, "+(1-opacity)+")");

            _yuitest_coverline("js/mui.js", 1079); ctx.fillStyle = grad;
            _yuitest_coverline("js/mui.js", 1080); ctx.rect(0, 0, img.offsetWidth, height*2);
            _yuitest_coverline("js/mui.js", 1081); ctx.fill();            
        };        

        _yuitest_coverline("js/mui.js", 1084); if(!mui.inDocument(img)) 
        {
            _yuitest_coverline("js/mui.js", 1086); img.addEventListener('load', function() {
                _yuitest_coverfunc("js/mui.js", "(anonymous 14)", 1086);
_yuitest_coverline("js/mui.js", 1087); doReflection(img);
            }, false);
        } 
        else 
        {
            _yuitest_coverline("js/mui.js", 1092); doReflection(img);
        }                
    }        
};

/**
 * AJAX methods
 * @module ajax
 **/
_yuitest_coverline("js/mui.js", 1101); var ajax = {
    
    CONNECTION_TIMEOUT: 7000,
    
    /**
     * AJAX class
     * @class Ajax
     * @static
     */

    /**
     * XHR wrapper for making asynchronous connections
     * @method io
     * @param url {String} URL endpoint
     * @param options {Object} Configuration options:
     *     method {String}: get, post
     *    callback {Object}: Object literal containing the success and failure callback functions,
     *          as well as the scope to be applied to the callback functions.
     *    update {String|HTMLElement}: If present, the given element will be updated with the result 
     *        of the transaction.
     * Example: 
     *     Using callback function:
     *
     *     mui.io('/ajax.php', {
     *      method: 'get',
     *        headers: [ { 'Content-Type': 'application/x-www-form-urlencoded' }],
     *      callback: {
     *        success: function(o) {
     *            // do something with o.responseText
     *        },
     *        scope: this
     *    });
     *
     *    Using update property:
     *
     *     mui.io('/ajax.php', {
     *      method: 'get',
     *      update: '#el-to-be-updated'
     *    });    
     * @return {Boolean} True if el is contained inside the document, false otherwise.
     **/        
        io: function(url, options) 
        {
            _yuitest_coverfunc("js/mui.js", "io", 1142);
_yuitest_coverline("js/mui.js", 1144); var xhr = new XMLHttpRequest(),
                method = options.method || 'get',
                success = options.callback ? options.callback.success : null,
                failure = options.callback ? options.callback.failure : null,
                scope = options.callback ? options.callback.scope : null,
                params = options.params || null,
                onError = true, body = document.body;
            
            _yuitest_coverline("js/mui.js", 1152); if(options.update) 
            {
                _yuitest_coverline("js/mui.js", 1154); var el = (typeof options.update === 'string') ? mui.get(options.update) : options.update;
                _yuitest_coverline("js/mui.js", 1155); success = function(o) {
                    _yuitest_coverfunc("js/mui.js", "success", 1155);
_yuitest_coverline("js/mui.js", 1156); el.innerHTML = o.responseText;
                };
            }
            
            _yuitest_coverline("js/mui.js", 1160); xhr.open(method, url, true);
            _yuitest_coverline("js/mui.js", 1161); xhr.onreadystatechange = (success) ? function(o) {
                _yuitest_coverfunc("js/mui.js", "(anonymous 15)", 1161);
_yuitest_coverline("js/mui.js", 1162); body.removeEventListener("offline", xhr.onerror, false);
                                
                _yuitest_coverline("js/mui.js", 1164); if(xhr.readyState !== 4)
                {
                    _yuitest_coverline("js/mui.js", 1166); mui.trace("XHR state change: " + xhr.readyState);
                    _yuitest_coverline("js/mui.js", 1167); return;
                }
                _yuitest_coverline("js/mui.js", 1169); mui.trace("XHR status: " + xhr.status);
                
                _yuitest_coverline("js/mui.js", 1171); if(xhr.status === 200 || xhr.status === 0)
                {
                    _yuitest_coverline("js/mui.js", 1173); success.call(scope, o.target);
                }
                else {_yuitest_coverline("js/mui.js", 1175); if(failure)
                {
                    _yuitest_coverline("js/mui.js", 1177); onError = false;
                    _yuitest_coverline("js/mui.js", 1178); failure.call(scope, o.target);
                }}
            } : null;
            
            _yuitest_coverline("js/mui.js", 1182); xhr.onerror = xhr.onabort = function(o){
                _yuitest_coverfunc("js/mui.js", "onabort", 1182);
_yuitest_coverline("js/mui.js", 1183); body.removeEventListener("offline", xhr.onerror, false);
                
                // do not call the failure handler twice
                // there are times where the browser does not call onreadystatechage
                // e.g. lost Wifi signal
                _yuitest_coverline("js/mui.js", 1188); if(onError && failure) {
                     _yuitest_coverline("js/mui.js", 1189); failure.call(scope, { status: 0, statusText: "error" } ); 
                }_yuitest_coverline("js/mui.js", 1190); ;
                _yuitest_coverline("js/mui.js", 1191); onError = false;
            };
            _yuitest_coverline("js/mui.js", 1193); body.addEventListener("offline", xhr.onerror, false);
            
            _yuitest_coverline("js/mui.js", 1195); if(options.headers)
            {
                _yuitest_coverline("js/mui.js", 1197); mui.each(options.headers, function(h) {
                    _yuitest_coverfunc("js/mui.js", "(anonymous 16)", 1197);
_yuitest_coverline("js/mui.js", 1198); mui.iterate(h, function(v, n) { _yuitest_coverfunc("js/mui.js", "(anonymous 17)", 1198);
xhr.setRequestHeader(n, v); });
                });
            }
            
            _yuitest_coverline("js/mui.js", 1202); if ( !("onLine" in navigator) /* older Iphones */ || navigator.onLine){
                _yuitest_coverline("js/mui.js", 1203); xhr.send(params);
            } else {
                _yuitest_coverline("js/mui.js", 1205); xhr.onerror();
            }
        },
    
    /**
     * Fetch an external script resource
     * @method getScript
     * @param url {String} The url of the scrip
     * @param callback {Function} Callback invoked after script is downloaded
     * @param scope {Object} The context of the callback function
     **/
    getScript: function(url, callback, scope)
    {
        _yuitest_coverfunc("js/mui.js", "getScript", 1216);
_yuitest_coverline("js/mui.js", 1218); var scriptTag = mui.createElement('script', { type: 'text/javascript', src: url });
        _yuitest_coverline("js/mui.js", 1219); mui.on(scriptTag, 'load', mui.bind(callback, scope));
        _yuitest_coverline("js/mui.js", 1220); document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }    
};

/**
 * Object-Oriented programming helpers
 * @module oop
 **/
_yuitest_coverline("js/mui.js", 1228); var oop = {
    
    /**
     * OOP class
     * @class Oop
     * @static
     */
    
    /**
     * Provide a namespace.  
     * @method provide
     * @param ns {String} The namespace. This can be a chained namespace, i.e., "levelOne.levelTwo.levelThree"
     */
    provide: function(ns)
    {
        _yuitest_coverfunc("js/mui.js", "provide", 1241);
_yuitest_coverline("js/mui.js", 1243); var i, len, s = ns.split('.'), p = window;
        _yuitest_coverline("js/mui.js", 1244); for(i=0, len=s.length; i<len; i++)
        {
            _yuitest_coverline("js/mui.js", 1246); p[s[i]] = (typeof p[s[i]] === 'undefined') ? {} : p[s[i]];
            _yuitest_coverline("js/mui.js", 1247); p = p[s[i]];
        }
     },

    /**
     * Simple object extension. Static members will not be inherited to the child class.
     * The superclass and constructor properties are added to parent and child classes.
     * @method extend
     * @param sub {Object} The subclass
     * @param sup {Object} The superclass from which to extend
     * @param proto {Object} prototype properties to add/override
     * @param stat {Object} static properties to add/override    
     * @return The subclass, with properties/methods inherited from superclass
     **/
    extend: function(sub, sup, proto, stat) {
        // Prototypal inheritance of the parent to child
        _yuitest_coverfunc("js/mui.js", "extend", 1261);
_yuitest_coverline("js/mui.js", 1263); sub.prototype.__proto__ = sup.prototype;    
        
        // Set constructor properties for parent, child
        _yuitest_coverline("js/mui.js", 1266); sub.prototype.constructor = sub;
        _yuitest_coverline("js/mui.js", 1267); if(sup.prototype.constructor == Object.prototype.constructor) {        
            _yuitest_coverline("js/mui.js", 1268); sup.prototype.constructor = sup;
        }
        
        // Set superclass property for child class
        _yuitest_coverline("js/mui.js", 1272); sub.superclass = sup.prototype;
        
        // If any prototype properties are passed in, add those to the child's prototype
        _yuitest_coverline("js/mui.js", 1275); if(proto) {        
            _yuitest_coverline("js/mui.js", 1276); mui.iterate(proto, function(v, n) {
                _yuitest_coverfunc("js/mui.js", "(anonymous 18)", 1276);
_yuitest_coverline("js/mui.js", 1277); sub.prototype[n] = v;
            });
        }
        
        // If any static properties are passed in, add those to the child as static members
        _yuitest_coverline("js/mui.js", 1282); if(stat) {        
            _yuitest_coverline("js/mui.js", 1283); mui.iterate(stat, function(v, n) {
                _yuitest_coverfunc("js/mui.js", "(anonymous 19)", 1283);
_yuitest_coverline("js/mui.js", 1284); sub[n] = v;
            });
        }
        
        _yuitest_coverline("js/mui.js", 1288); return sub;
    },

    /**
     * Augment an object by adding the static and prototype members of another object. By default, properties/methods
     * are not overriden on the receiving object if they already exist. This is equivalent to augment + augmentProto.
     * @method mix
     * @param obj {Object} The receiver which will accept the extension members
     * @param ext {Object} The provider object, whose static and prototype members will be supplied to the receiver.
     * @param ov {Boolean} If true, properties supplied will be overriden on the receiver if already present.
     * @return The original object with all the original properties, plus the passed in static extensions.
     **/        
    mix: function(obj, provider, ov) 
    {
        _yuitest_coverfunc("js/mui.js", "mix", 1300);
_yuitest_coverline("js/mui.js", 1302); obj = mui.augment.call(this, obj, provider, ov);
        _yuitest_coverline("js/mui.js", 1303); obj = mui.augmentProto.call(this, obj, provider, ov);
        _yuitest_coverline("js/mui.js", 1304); return obj;
    },

    /**
     * Object augmentation takes static properties in the provider object (or an object literal containing augmentation members), and
     * adds those as properties of the receiver object. 
     * @method augment
     * @param obj {Object} The receiver to be augmented
     * @param provider {Object} The provider object, whose properties will be supplied to the receiver
     * @param ov {Boolean} If true, properties supplied will be overriden on the receiver if already present.
     * @return The original object with all the original properties , plus the passed in extensions.
     **/    
    augment: function(obj, provider, ov) 
    {
        _yuitest_coverfunc("js/mui.js", "augment", 1316);
_yuitest_coverline("js/mui.js", 1318); for(var p in provider) 
        {
            _yuitest_coverline("js/mui.js", 1320); if(provider.hasOwnProperty(p)) 
            {
                _yuitest_coverline("js/mui.js", 1322); if((ov && typeof obj[p] !== 'undefined') || typeof obj[p] === 'undefined') {obj[p] = provider[p];}
            }
        }
        _yuitest_coverline("js/mui.js", 1325); return obj;
    },

    /**
     * Object prototype augmentation takes prototype members in the provider object and
     * adds those as prototype members of the receiver object. 
     * @method augmentProto
     * @param obj {Object} The receiver to be augmented
     * @param provider {Object} The provider object, whose prototype members will be supplied to the receiver
     * @param ov {Boolean} If true, prototype members supplied will be overriden on the receiver if already present.
     * @return The original object with all the original prototype members, plus the passed in extensions.
     **/
    augmentProto: function(obj, provider, ov)
    {
        _yuitest_coverfunc("js/mui.js", "augmentProto", 1337);
_yuitest_coverline("js/mui.js", 1339); for(var p in provider.prototype) 
        {
            _yuitest_coverline("js/mui.js", 1341); if((ov && typeof obj.prototype[p] !== 'undefined') || typeof obj.prototype[p] === 'undefined') {obj.prototype[p] = provider.prototype[p];}
        }        
    },

    /**
     * Bind a function to a given context and arguments
     * @method bind
     * @param fn {Function} The function to bind
     * @param ctx {Object} The context in which the function will be executed
     * @param args* 0..n arguments to include before the arguments the 
     * function is executed with
     * @return {Function} the wrapped function
     */
    bind: function(fn, ctx)
    {
        _yuitest_coverfunc("js/mui.js", "bind", 1354);
_yuitest_coverline("js/mui.js", 1356); var args = Array.prototype.slice.call(arguments, 2);
        _yuitest_coverline("js/mui.js", 1357); return function() { 
            // Merge arguments of inner function with those passed to mui.bind            
            _yuitest_coverfunc("js/mui.js", "(anonymous 20)", 1357);
_yuitest_coverline("js/mui.js", 1359); var xargs = Array.prototype.slice.call(arguments);
            _yuitest_coverline("js/mui.js", 1360); mui.each(args, function(a) { _yuitest_coverfunc("js/mui.js", "(anonymous 21)", 1360);
xargs.push(a); });
            _yuitest_coverline("js/mui.js", 1361); return fn.apply((ctx || fn), xargs); 
        }
    },
    
    /**
     * Register a module within the mui namespace.
     * @method add
     * @param name {String} The name of the module
     * @param obj {Object} The object/function to register
     * @return {Object} The registered module.
     */
    add: function(name, obj)
    {
        _yuitest_coverfunc("js/mui.js", "add", 1372);
_yuitest_coverline("js/mui.js", 1374); mui[name] = obj;
        _yuitest_coverline("js/mui.js", 1375); return mui[name];
    }

};

/**
 * Client environment methods
 * @module env
 **/
_yuitest_coverline("js/mui.js", 1384); var env = {
    
    /**
     * Env class
     * @class Env
     * @static
     */

    /*
     * mui.UA is a read-only property which gives information regarding 
     * the User Agent. 
     * @final UA
     * @type Object
     */
    UA: (function() {

        _yuitest_coverfunc("js/mui.js", "(anonymous 22)", 1398);
_yuitest_coverline("js/mui.js", 1400); var UA = {
            Apple:       false,
            Safari:      false,
            iPhone3:     false,
            webOS:       false, 
            Android:     false,
            WebKit:      false,
            Gears:       false,
            Chrome:      false,
            CSSTransitions: false
        };

        _yuitest_coverline("js/mui.js", 1412); if(typeof navigator != 'undefined')
        {
            _yuitest_coverline("js/mui.js", 1414); if(RegExp(" AppleWebKit/").test(navigator.userAgent))       {UA.WebKit = true;}
            _yuitest_coverline("js/mui.js", 1415); if(RegExp("Android").test(navigator.userAgent))             {UA.Android = true;}
            _yuitest_coverline("js/mui.js", 1416); if(RegExp("Chrome").test(navigator.userAgent))              {UA.Chrome = true;}
            _yuitest_coverline("js/mui.js", 1417); if(RegExp("webOS").test(navigator.userAgent))               {UA.webOS = true;}            
            _yuitest_coverline("js/mui.js", 1418); if(/i(Phone|P(o|a)d)/.test(navigator.userAgent))            {UA.Apple = true;}
            _yuitest_coverline("js/mui.js", 1419); if(UA.Apple && RegExp("OS 3").test(navigator.userAgent))    {UA.iPhone3 = true;}
            _yuitest_coverline("js/mui.js", 1420); if(UA.Apple && RegExp("iPad").test(navigator.userAgent))    {UA.iPad = true;}
            _yuitest_coverline("js/mui.js", 1421); if(UA.Apple || (!UA.Android && !UA.webOS && RegExp("Safari").test(navigator.userAgent))) {UA.Safari = true;}
            _yuitest_coverline("js/mui.js", 1422); if(UA.iPad || UA.Chrome)                                    {UA.tablet = true;}
        }

        _yuitest_coverline("js/mui.js", 1425); UA.Gears = typeof(navigator.mimeTypes) !== 'undefined' && navigator.mimeTypes['application/x-googlegears'];
        
        // Create Gears element
        _yuitest_coverline("js/mui.js", 1428); if(UA.Gears)
        {
            _yuitest_coverline("js/mui.js", 1430); var factory = document.createElement('object');
            _yuitest_coverline("js/mui.js", 1431); factory.style.display = 'none';
            _yuitest_coverline("js/mui.js", 1432); factory.style.width = '0px';
            _yuitest_coverline("js/mui.js", 1433); factory.style.height = '0px';
            _yuitest_coverline("js/mui.js", 1434); factory.type = 'application/x-googlegears';
            _yuitest_coverline("js/mui.js", 1435); document.documentElement.appendChild(factory);
            _yuitest_coverline("js/mui.js", 1436); if(typeof google === 'undefined') {google = {};}
            _yuitest_coverline("js/mui.js", 1437); if(!google.gears) {google.gears = { factory: factory };}
        }        
        
        // Transitions
        _yuitest_coverline("js/mui.js", 1441); UA.CSSTransitions = (typeof WebKitCSSMatrix !== 'undefined');
        
        // Add classname to target CSS
        _yuitest_coverline("js/mui.js", 1444); if(UA.Android) {dom.addClass(document.documentElement, 'android');}
        _yuitest_coverline("js/mui.js", 1445); if(UA.Apple && !UA.iPad) {dom.addClass(document.documentElement, 'iphone');}
        _yuitest_coverline("js/mui.js", 1446); if(UA.iPad) {dom.addClass(document.documentElement, 'ipad');}
        _yuitest_coverline("js/mui.js", 1447); if(UA.webOS) {dom.addClass(document.documentElement, 'webOS');}

        _yuitest_coverline("js/mui.js", 1449); return UA;
    })()
};



/**
* Template is a mechanism for binding data into a string
*
* Example:
*
* var someHTML  = "<div id='#{myID}'>#{myData}</div>";
* var data      = { myID:"myBox", myData:"Hello World" };
* var output    = mui.map( data, {someHTML|HTMLElement} );
*
* //output ==> "<div id='myBox'>Hello World</div>";
*
* Notes:
*
*  Speed, speed, and more speed:
*  ---------------------------
*   Obviously the goal of any piece of code is to be as efficient as possible.
*   Often times, you will see code that uses JavaScript's raw [string].replace
*   methods, to do the same thing as above.
*
*   However often times your "template string" is usuallay HTML or something.
*   This same string is re-used over and over again, and typically you'll see
*   engineers just make the replace calls. ..
*
*   Having to continually run regular expressions on the string is slow and
*   some what point-less if the original "template string" doesn't really change,
*   all that's changing is the data. . .
*
*   So the goal was to create a more efficient, single way too manage a "template string",
*   that is faster than other implementations like it and faster than continually
*   calling raw replace methods. ..
*
*   What this class does under the hood, is split the string up into its pieces,
*   using various Regular Expresion matching. .. similar to what a replace would do.
*   It then stores these pieces privately in a "buffer". At the same time it also
*   stores the property names/expressions found in the "template string", and at
*   what location(s) they should appear in the buffer.
*
*   This only needs to be done 1 time per template string. . .(implementations in other
*   toolkits such as Prototype 1.6.03, would do multiple matches/replacements every time
*   the data is passed in).
*
*   Then, when you bind data by calling [template].parse, we simply loop through
*   the buffer filling in slots. . .
*
*  Similar to:
*  ---------------------------
*   There is a similar function in PHP - see toMessage()
*
*   "I %how_much% like %dessert%!".toMessage( "how_much=really", "dessert=Ice Cream" );
*   result  =>  I really like Ice Cream!
*
*   For this code call:
*       var data    = {how_much:"really", dessert:"Ice Cream"};
*       var output  = mui.supplant("I %how_much% like %dessert%!", data);
*
*/
_yuitest_coverline("js/mui.js", 1511); var template = function() {

    /**
     * @description - private, static method used to define the buffer array and prop hash caches for a Template
     *
     * @method defineTemplateBuffer
     * @param {Array}   the buffer array of a Template
     * @param {object}  the props object of a Template
     * @param {object}  A regular expression match result, generated from parseTemplate, that defines what markers exist
     *                  for data binding in a template
     * @param {string}  A string, generated from parseTemplate, that prefixes the content of the match param.
     * @private
     * @static
     * @return void
    */
    _yuitest_coverfunc("js/mui.js", "template", 1511);
_yuitest_coverline("js/mui.js", 1526); function defineTemplateBuffer(buffer, props, match, prefix)  {
        _yuitest_coverfunc("js/mui.js", "defineTemplateBuffer", 1526);
_yuitest_coverline("js/mui.js", 1527); var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/,
            before  = "",
            match2  = "",
            expr    = "",
            newMatch;

        _yuitest_coverline("js/mui.js", 1533); if (match) {
            _yuitest_coverline("js/mui.js", 1534); before  = match[1];
            _yuitest_coverline("js/mui.js", 1535); match2  = match[2];
            _yuitest_coverline("js/mui.js", 1536); expr    = match[3];
        }

        _yuitest_coverline("js/mui.js", 1539); if (before == '\\') {
            _yuitest_coverline("js/mui.js", 1540); buffer.push(prefix, match2);
            _yuitest_coverline("js/mui.js", 1541); if (!props[match2])
                {_yuitest_coverline("js/mui.js", 1542); props[match2] = [];}

            _yuitest_coverline("js/mui.js", 1544); props[match2].push(buffer.length-1);
            _yuitest_coverline("js/mui.js", 1545); return;
        }

        _yuitest_coverline("js/mui.js", 1548); newMatch = pattern.exec(expr);
        _yuitest_coverline("js/mui.js", 1549); if (!newMatch) {
            _yuitest_coverline("js/mui.js", 1550); buffer.push(prefix, before);
            _yuitest_coverline("js/mui.js", 1551); return;
        }
        _yuitest_coverline("js/mui.js", 1553); if (!props[expr])
            {_yuitest_coverline("js/mui.js", 1554); props[expr] = [];}

        _yuitest_coverline("js/mui.js", 1556); props[expr].push(buffer.length+2);
        _yuitest_coverline("js/mui.js", 1557); buffer.push(prefix, before, expr);
    }

    /**
     * @description - private, static method used evaluate the string markers to be for data-binding in a Template
     *
     * @method parseTemplate
     * @param {string} the original template string with markers
     * @param {RegEx} the pattern to match for markers, defaults to Template.DEFAULT_PATTERN (e.g. matches, #{varName})
     * @param {Array} the buffer array of a Template
     * @param {object}  the props object of a Template
     * @private
     * @static
     * @return void
    */
    _yuitest_coverline("js/mui.js", 1572); function parseTemplate(source, pattern, buffer, props) {
        _yuitest_coverfunc("js/mui.js", "parseTemplate", 1572);
_yuitest_coverline("js/mui.js", 1573); var match, idx = 0;

        _yuitest_coverline("js/mui.js", 1575); while (source)
        {
            _yuitest_coverline("js/mui.js", 1577); if (match = source.match(pattern)) {
                _yuitest_coverline("js/mui.js", 1578); idx = match.index;
                _yuitest_coverline("js/mui.js", 1579); defineTemplateBuffer(buffer, props, match, source.slice(0,idx));
                _yuitest_coverline("js/mui.js", 1580); source  = source.slice(idx + match[0].length);
            } else {
                _yuitest_coverline("js/mui.js", 1582); buffer.push(source);
                _yuitest_coverline("js/mui.js", 1583); source = '';
            }
        }
    }

    _yuitest_coverline("js/mui.js", 1588); function cstr(str) {
        _yuitest_coverfunc("js/mui.js", "cstr", 1588);
_yuitest_coverline("js/mui.js", 1589); var S = String, t = typeof str;
    
        _yuitest_coverline("js/mui.js", 1591); switch (t) {
            case "string": _yuitest_coverline("js/mui.js", 1592); return str;
            case "number": _yuitest_coverline("js/mui.js", 1593); return S(str);
        }
        _yuitest_coverline("js/mui.js", 1595); str = str || "";
        _yuitest_coverline("js/mui.js", 1596); str = S(str);
        _yuitest_coverline("js/mui.js", 1597); return str;
    }
    
    /**
     * @description - private, static method used evaluate the string markers to be for data-binding in a Template
     *
     * @method Template (constructor)
     * @param {string} the original template string with markers
     * @param {RegEx} the pattern to match for markers, defaults to Template.DEFAULT_PATTERN (e.g. matches, #{varName})
     * @public
     * @return {object} Template instance
    */
    _yuitest_coverline("js/mui.js", 1609); function Template(template, pattern)  {
        
        _yuitest_coverfunc("js/mui.js", "Template", 1609);
_yuitest_coverline("js/mui.js", 1611); var regArgs = "";

        _yuitest_coverline("js/mui.js", 1613); template        = cstr(template);
        _yuitest_coverline("js/mui.js", 1614); pattern         = pattern || Template.DEFAULT_PATTERN;

        /**
         * @description - private, instance property used to find markers in a string for data binding
         *
         * @property Template::privMe.pattern
         * @type {RegEx}
        */
        _yuitest_coverline("js/mui.js", 1622); this.pattern  = pattern;

        /**
         * @description - private, instance property, the original string that contains markers for data binding
         *
         * @propery Template::privMe.template
         * @type {string}
        */
        _yuitest_coverline("js/mui.js", 1630); this.template = template;

        /**
         * @description - private, instance property, an array that contains the substrings of the original template, and empty string place holders
         *                for data.  This gets filled out from the constructor or via calling Template::parse
         *
         * @property Template::privMe.buffer
         * @type {Array}
        */
        _yuitest_coverline("js/mui.js", 1639); this.buffer   = [];

        /**
         * @description - private, instance property, an object that contains the arrays of indexes into the buffer for where data values should go.
         *                This gets filled out from the constructor or via calling Template::parse. The object is keyed by the var/expressions in the
         *                the template. For example a string for a template like "#{foobar}" means that this object will have props["foobar"] == Array,
         *                and each index of the array will be an index to be filled out in the buffer.
         *
         * @property Template::privMe.props
         * @type {object}
        */
        _yuitest_coverline("js/mui.js", 1650); this.props    = {};
    }

    /**
     * @description - public, static property, the RegExp used to match a marker in a template string.  By default, a Template instance
     *                uses this RegExp, and therefore accepts strings that look like "Hello World %{myData}"
     *
     *                It is public, but is intended to be used as a constant (hence the all caps notation).
     *
     * @property Template::DEFAULT_PATTERN
     * @type {RegExp}
     * @public
     * @static
    */
    _yuitest_coverline("js/mui.js", 1664); Template.DEFAULT_PATTERN    = /(^|.|\r|\n)(%\{(.*?)\})/;

    /**
     * @description - public, static property, the RegExp used to match a marker in a template string.  This expression
     *                is used for the typical sprintf format from c. (e.g. "Hello {user}");
     *
     * @property Template::SPRINTF_PATTERN
     * @type {RegExp}
     * @public
     * @static
    */
    _yuitest_coverline("js/mui.js", 1675); Template.SPRINTF_PATTERN    = /(^|.|\r|\n)(\{(.*?)\})/;

    /**
     * @description - public method used to bind data in the string or echo the template itself.
     *
     * @method [Template].toString, [Template].valueOf
     * @param {obj} (optional) if obj present, the properties and values will be replaced in the template
     *              otherwise this will just return the original template string with no data replaced.
     * @public
     * @return {string} with or without, formatted data
    */
    _yuitest_coverline("js/mui.js", 1686); Template.prototype.toString     =
    Template.prototype.valueOf      = function(obj) {
        _yuitest_coverfunc("js/mui.js", "valueOf", 1687);
_yuitest_coverline("js/mui.js", 1688); var ret = "", buffer, props, propName, t,
            indexes, idx, len, val,
            initId = (this.pattern == Template.DEFAULT_PATTERN) ? "%{" : "{";

        _yuitest_coverline("js/mui.js", 1692); if (obj) {
            _yuitest_coverline("js/mui.js", 1693); if (!this.buffer || !this.buffer.length)
                {_yuitest_coverline("js/mui.js", 1694); this.parse(this.template);}

            _yuitest_coverline("js/mui.js", 1696); buffer  = this.buffer;
            _yuitest_coverline("js/mui.js", 1697); props   = this.props;
            _yuitest_coverline("js/mui.js", 1698); if (buffer && props) {
                _yuitest_coverline("js/mui.js", 1699); for (propName in  props)  {
                    _yuitest_coverline("js/mui.js", 1700); val     = obj[propName];
                    // If the property does not exist in obj, then restore the variable name:
                    _yuitest_coverline("js/mui.js", 1702); if (typeof val === "undefined") {
                        _yuitest_coverline("js/mui.js", 1703); val = (propName.charAt(propName.length - 1) == '}') ? ("\\" + propName) : (initId + propName + "}");
                    }
                    _yuitest_coverline("js/mui.js", 1705); indexes = props[propName];
                    _yuitest_coverline("js/mui.js", 1706); if (indexes) {
                        _yuitest_coverline("js/mui.js", 1707); idx = 0;
                        _yuitest_coverline("js/mui.js", 1708); len = indexes.length;
                        _yuitest_coverline("js/mui.js", 1709); while (len--)
                            {_yuitest_coverline("js/mui.js", 1710); buffer[indexes[idx++]] = val;}

                    }
                }
            }
            _yuitest_coverline("js/mui.js", 1715); ret = buffer.join("");
        } else {
            _yuitest_coverline("js/mui.js", 1717); ret = this.template;
        }

        _yuitest_coverline("js/mui.js", 1720); this.data  = obj;

        _yuitest_coverline("js/mui.js", 1722); return ret;
    }

    /**
     * @description - public method used to redefine the template string, creating the private buffer and prop instance properties
     *
     * @method [Template].parse
     * @param {string} template
     * @public
    */
    _yuitest_coverline("js/mui.js", 1732); Template.prototype.parse  = function( template ) { 
        _yuitest_coverfunc("js/mui.js", "parse", 1732);
_yuitest_coverline("js/mui.js", 1733); if (arguments.length) {
            _yuitest_coverline("js/mui.js", 1734); template    = cstr(template);
            _yuitest_coverline("js/mui.js", 1735); if (template && template != this.template) {
                _yuitest_coverline("js/mui.js", 1736); this.template  = template;
                _yuitest_coverline("js/mui.js", 1737); this.buffer    = [];
                _yuitest_coverline("js/mui.js", 1738); this.props     = {};
                _yuitest_coverline("js/mui.js", 1739); this.data      = null;
            }
        }

        _yuitest_coverline("js/mui.js", 1743); parseTemplate(this.template, this.pattern, this.buffer, this.props);
    }
    
    _yuitest_coverline("js/mui.js", 1746); var HTMLTEMPLATES = {};
    _yuitest_coverline("js/mui.js", 1747); var STRINGTEMPLATES = {};
    
    _yuitest_coverline("js/mui.js", 1749); if (!String.prototype.supplant){
        _yuitest_coverline("js/mui.js", 1750); String.prototype.supplant = function ( data, cacheOff ) {            
            _yuitest_coverfunc("js/mui.js", "supplant", 1750);
_yuitest_coverline("js/mui.js", 1751); var template = STRINGTEMPLATES[ this ];
            
            _yuitest_coverline("js/mui.js", 1753); if (!template){                
                _yuitest_coverline("js/mui.js", 1754); template = new Template( this, Template.SPRINTF_PATTERN );
                _yuitest_coverline("js/mui.js", 1755); template.parse();
                
                _yuitest_coverline("js/mui.js", 1757); if (!cacheOff)
                    {_yuitest_coverline("js/mui.js", 1758); STRINGTEMPLATES[this] = template;}
            }
                        
            _yuitest_coverline("js/mui.js", 1761); return template.valueOf( data );
        };  
    }
       
    _yuitest_coverline("js/mui.js", 1765); return {
        
        /**
         * 
         * @method map
         * 
         * @param el {String|HTMLElement} The CSS selector or DOM node to map to. The template element must contain an Id.
         * @param data {Object} The object to map
         * @param nodeName {String} The tag name of the newly created DOM node
         * @param nodeConfig {Object} Object literal of node configuration passed to mui.createElement
         * @param cacheOff {Boolean} (Optional) if set to true the pattern will not be cached, 
         *                 good for random strings that will not be repeated.
         */
        map: function(data, el, nodeName, nodeConfig, cacheOff){
            _yuitest_coverfunc("js/mui.js", "map", 1778);
_yuitest_coverline("js/mui.js", 1779); var node, templateId,
                template, html,
                res;
            
            _yuitest_coverline("js/mui.js", 1783); if (typeof el === 'string'){
                _yuitest_coverline("js/mui.js", 1784); node = mui.get( el );
                _yuitest_coverline("js/mui.js", 1785); templateId = el;
            } else {
                _yuitest_coverline("js/mui.js", 1787); node = el;
                _yuitest_coverline("js/mui.js", 1788); templateId = node && node.getAttribute("id");
            }
            
            _yuitest_coverline("js/mui.js", 1791); if (!node){
                _yuitest_coverline("js/mui.js", 1792); return;
            }            
            
            _yuitest_coverline("js/mui.js", 1795); if (!templateId){
                _yuitest_coverline("js/mui.js", 1796); mui.debug("map(): templateId must be a string");
                _yuitest_coverline("js/mui.js", 1797); return;
            }
            
            _yuitest_coverline("js/mui.js", 1800); if (!cacheOff) {
                _yuitest_coverline("js/mui.js", 1801); template = HTMLTEMPLATES[templateId];
            }
            
            _yuitest_coverline("js/mui.js", 1804); if (!template){
                _yuitest_coverline("js/mui.js", 1805); html = node.innerHTML.replace(/(\-\-\>)|(\<\!\-\-)/g, '');
                
                _yuitest_coverline("js/mui.js", 1807); template = new Template( html, Template.DEFAULT_PATTERN );
                _yuitest_coverline("js/mui.js", 1808); template.parse();
                
                _yuitest_coverline("js/mui.js", 1810); if (!cacheOff) {
                    _yuitest_coverline("js/mui.js", 1811); HTMLTEMPLATES[templateId] = template;
                }
            }
            
            _yuitest_coverline("js/mui.js", 1815); nodeConfig = nodeConfig || {};
            // copy classes from source node
            _yuitest_coverline("js/mui.js", 1817); nodeConfig.className = nodeConfig.className ? nodeConfig.className + ' ' +  node.className : node.className;
            
            _yuitest_coverline("js/mui.js", 1819); res = nodeName ? mui.createElement(nodeName, nodeConfig) : node.cloneNode(true);
            _yuitest_coverline("js/mui.js", 1820); if(!nodeName) {res.removeAttribute('id');}
            
            _yuitest_coverline("js/mui.js", 1822); res.innerHTML = template.valueOf( data );
            
            _yuitest_coverline("js/mui.js", 1824); return res;
        },
        
         /**
         * 
         * @method template
         * 
         * @param str {String} The CSS selector or DOM node to map to. The template element must contain an Id.
         * @param data {Object} The object to map
         * @param cacheOff {Boolean} (Optional) if set to true the patter will not be cached, 
         *                 good for random strings that will not be repeated.
         *  
         */
        supplant: function( str, data, cacheOff ){
            _yuitest_coverfunc("js/mui.js", "supplant", 1837);
_yuitest_coverline("js/mui.js", 1838); return str.supplant( data, cacheOff);
        }
    };
}();

// Define mui
_yuitest_coverline("js/mui.js", 1844); oop.augment(mui, util);
_yuitest_coverline("js/mui.js", 1845); oop.augment(mui, dom);
_yuitest_coverline("js/mui.js", 1846); oop.augment(mui, event);
_yuitest_coverline("js/mui.js", 1847); oop.augment(mui, anim);
_yuitest_coverline("js/mui.js", 1848); oop.augment(mui, fx);
_yuitest_coverline("js/mui.js", 1849); oop.augment(mui, ajax);
_yuitest_coverline("js/mui.js", 1850); oop.augment(mui, oop);
_yuitest_coverline("js/mui.js", 1851); oop.augment(mui, env);
_yuitest_coverline("js/mui.js", 1852); oop.augment(mui, template);

})();
