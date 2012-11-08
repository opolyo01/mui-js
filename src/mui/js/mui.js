(function() {

/*
 * mui Library
 * A miniature javascript suitable for use on mobile devices.
 */
mui = {};

/**
 * Utility methods
 * @module util
 **/
var util = {
    
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
        document.defaultView.console ? console.log(o) : '';
    },
    
    /**
     * Log a trace message or object to the console.
     * @method trace    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    trace: function(o)
    {
        if(this._logLevel >= 3) this.log.apply(this, arguments);
    },
    
    /**
     * Log a debug message or object to the console.
     * @method debug    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    debug: function(o)
    {
        if(this._logLevel >= 2) this.log.apply(this, arguments);
    },
    
    /**
     * Log a warning message or object to the console.
     * @method warn    
     * @param o {String|Object} The string or object to log to the debug console.
     **/
    warn: function(o)
    {
        if(this._logLevel >= 1) this.log.apply(this, arguments);
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
        if(this._logLevel >= 0) this.log.apply(this, arguments);        
        if(throwError) throw new Error(o);
    },
    
    /**
     * The log level allows you to set the appropriate logging level
     * for your application
     * @method setLogLevel 
     * @param level {String} The desired log level
     */
    setLogLevel: function(level)
    {
        var intLevel = 0;
        switch(level)
        {
            case 'trace':
                intLevel = 3;
                break;
            case 'debug':
                intLevel = 2;
                break;
            case 'warn':
                intLevel = 1;
                break;
            case 'error':
                intLevel = 0;
                break;
            default:
                intLevel = 0;
            
        }
        this._logLevel = intLevel;
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
        if(!collection || !collection.length) 
        {
            return false;
        }
        for(var i=0,len=collection.length; i<len; i++) 
        {
            cb.call((ctx || collection[i]), collection[i], i);
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
        ctx = ctx || obj;
        for(var prop in obj) 
        {
            if(obj.hasOwnProperty(prop)) 
            {
                cb.call(ctx, obj[prop], prop);
            }
        }            
    }
};

/**
 * DOM methods
 * @module dom
 **/
var dom = {
    
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
        if(selector instanceof HTMLElement) return selector;
        var matches = this.getAll(selector, parentNode);
        return !matches.length ? null : (matches.length === 0 ? null : matches[0]);
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
        parentNode = parentNode || document;
        return Array.prototype.slice.call(parentNode.querySelectorAll(selector));
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
        var el = document.createElement(nodeName);
        for(var opt in options) 
        {
            if(options.hasOwnProperty(opt)) 
            {
                switch(opt) 
                {
                    case 'className':
                    case 'innerHTML':
                        el[opt] = options[opt];
                        break;
                    default:
                        el.setAttribute(opt, options[opt]);
                        break;
                }
            }
        }
        return el;
    },

    /**
     * Remove a node from the DOM.
     * @method removeElement    
     * @param el {String|Object} The CSS selector string or DOM node
     * @return {HTMLElement} The deleted node
     **/    
    removeElement: function(el) 
    {
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el && el.parentNode) 
        {
            el.parentNode.removeChild(el);
        }
        return el;
    },

    /**
     * Insert an element before another element in the DOM.
     * @method insertBefore    
     * @param node {Object} 
     * @param refNode {String|Object} The CSS selector string or DOM node to insert before
     **/
    insertBefore: function(node, refNode) 
    {
        refNode = (typeof el === 'string') ? this.get(refNode) : refNode;
        refNode.parentNode.insertBefore(node, refNode);
    },

    /**
     * Insert an element after another element in the DOM.
     * @method insertAfter    
     * @param node {Object} 
     * @param refNode {String|Object} The CSS selector string or DOM node to insert after
     **/
    insertAfter: function(node, refNode) 
    {
        refNode = (typeof el === 'string') ? this.get(refNode) : refNode;
        refNode.parentNode.insertBefore(node, refNode.nextSibling);
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
        el = (typeof el === 'string') ? this.get(el) : el;
        if(!el)
        {
            return false;
        }
        return window.getComputedStyle ? 
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
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el && el.style) 
        {
            if (value === null){
                 el.style.removeProperty(name);
            } else {
                 el.style[name] = value;
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
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el && el.style) 
        {
            this.iterate(styles, function(value, name) 
            {
                this.setStyle(el, name, value);
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
        el = (typeof el === 'string') ? this.get(el) : el;
        var pos = [el.offsetLeft, el.offsetTop];
        var parentNode = el.offsetParent;
        var accountForBody = (this.getStyle(el, 'position') === 'absolute' && el.offsetParent == el.ownerDocument.body);
        if(parentNode != el) 
        {
            while(parentNode && parentNode != refParent) 
            {
                pos[0] += parentNode.offsetLeft;
                pos[1] += parentNode.offsetTop;
                if(!accountForBody && parentNode.style.position == 'absolute') 
                {
                    accountForBody = true;
                }
                
                // sometimes the parentElement is not the same as the offsetParent so it can get "skipped"
                if (refParent == parentNode.parentNode){
                    parentNode = null;
                } else {
                    parentNode = parentNode.offsetParent;
                } 
            }
        }
        if(accountForBody) 
        {
            pos[0] -= el.ownerDocument.body.offsetLeft;
            pos[1] -= el.ownerDocument.body.offsetTop;            
        }

        return pos;
    },

    /**
     * Set the (x,y) coordinates of a given element
     * @method setXY    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param xy {Array} Array containing the (x,y) coordinates to be set.
     **/
    setXY: function(el, xy) 
    {
        el = (typeof el === 'string') ? this.get(el) : el;
        // @TODO: account for position: relative vs. position: absolute vs position: null
        this.setStyle(el, 'left', xy[0]+'px');
        this.setStyle(el, 'top', xy[1]+'px');
    },

    /**
     * Add a class name to a DOM node
     * @method addClass    
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     **/    
    addClass: function(el, className) 
    {
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el) 
        {
            if(!el.className.match(className)) 
            {
                el.className += ' ' + className;
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
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el) 
        {
            el.className = el.className.replace(className, '').replace(/^\s+|\s+$/g,"");    
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
        var hasClass = false;
        el = (typeof el === 'string') ? this.get(el) : el;
        if(el && el.className) 
        {
            hasClass = (el.className.match(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)')) !== null);
        }
        return hasClass;
    },
    
    /**
     * Toggle a classname for a particular DOM element
     * @method toggleClass
     * @param el {String|Object} The CSS selector string or DOM node
     * @param className {String} The class name.
     **/
    toggleClass: function(el, className)
    {
        if(!dom.hasClass(el, className)) dom.addClass(el, className);
        else dom.removeClass(el, className);
    },
    
    /**
     * Add a string of CSS to the document
     * @method css
     * @param css {String} The CSS string
     */
    css: function(css)
    {
        var styleNode = document.createElement('style');
        styleNode.setAttribute('type', 'text/css');
        styleNode.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(styleNode);
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
         if(orig === document || orig === document.body) 
         {
             return true;
         } 
         else if(el === document.body)
         {
             return false;
         }
         else if(el === parent)
         {
             return true;
         } 
         else if(el && el.parentNode)
         {
             return this.contains(parent, el.parentNode, orig || parent);
         }
         return false;
     },

    /**
     * Check if a node exists in the document.
     * @method inDocument    
     * @param el {String|Object} The CSS selector string or DOM node.
     * @return True if el is contained inside the document, false otherwise.
     **/
    inDocument: function(el) 
    {
        try 
        {
            return mui.contains(document.body, el);                
        } 
        catch(e) {
            return false;
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
        node = (typeof node === 'string') ? this.get(node) : node;
        scope = scope || fn;
        if(fn.call(scope, node)) 
        {
            return node;
        } 
        else if(node === document.body || node === parentNode) 
        {
            return false;
        } 
        else if(node)
        {
            return this.getAncestorBy(node.parentNode, fn, scope);
        }
        return false;
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
        return this.getAncestorBy(node, function(el) { return mui.hasClass(el, className); }, null, parentNode);
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
        return this.getAncestorBy(node, function(el) { return el.nodeName.toLowerCase() === tagName; });
    }
        
};

/**
 * Event methods
 * @module event
 **/
var event = (function() {
    
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
    var _bindings = [];
    
    /*
     * Store click event bindings for speedy clicks
     * @property _clicks
     * @type Array
     * @private
     */
    var _clicks = [];
    
    /*
     * Store touchend event bindings for event normalization
     * @property _touchends
     * @type Array
     * @private
     */
    var _touchends = [];
    
    /*
     * Store the touchstart event for event normalization
     * @property _touchstartEvt
     * @type Event
     * @private
     */
    var _touchstartEvt = null;
    /*
     * Store the client X for the first toch
     * @property _firstY
     * @type Number
     * @private
     */
    var _firstY    = null;
    
    /*
     * Store the client X for the last toch
     * @property _lastY
     * @type Number
     * @private
     */
    var _lastY     = null;
        
    /*
     * Store the touchstart time for speedy clicks
     * @property _touchstartTime
     * @type Number
     * @private
     */
    var _touchstartTime = null;
    
    /*
     * Store state of touches - whether or not user is moving
     * @property _touchmoved
     * @type BOolean
     * @private
     */
    var _touchmoved = 0;
    
    /*
     * Store boolean flag to determine if iPhone for speedy clicks
     * @property _isIphone
     * @type Boolean
     * @private
     */
    var _isIphone = /i(Phone|P(o|a)d)/.test(navigator.userAgent) && typeof window.ontouchstart !== 'undefined';

    /*
     * Store boolean flag to determine if Android for speedy clicks
     * @property _isAndroid
     * @type Boolean
     * @private
     */
    var _isAndroid = /Android/.test(navigator.userAgent);
    
    /*
     * Resolve events by adding a touches array for browsers which do 
     * not support touch events
     * @method resolveEvent
     * @param e {Event} The DOM event
     * @return {Event} The normalized DOM event
     * @private
     */
    function resolveEvent(e)
    {
        var ev = e;
        switch(e.type)
        {
            case 'mousedown':
            case 'mousemove':   
            case 'mouseup':         
                ev.touches = [e];
                break;
        }
        return ev;
    }
    
    /**
     * Event handler - used to allow for speedy clicks on iPhone
     * @method fireEvent    
     * @param e {Event} The generated event
     * @private
     **/
    function handleEvent(e)
    {
        switch(e.type)
        {
            case 'touchstart':
                _touchstartEvt = e;
                _touchmoved = 0;
                _touchstartTime = +(new Date);
                _firstY = _lastY = _touchstartEvt.touches[0].clientY;

                break;
            case 'touchmove':
                _touchmoved++;  
                _lastY = e.touches[0].clientY;
                break;
            case 'touchend':
                // Fire touchend
                fireEvent('touchend', e);
                
                // Fire click, if there is a _touchstartEvt
                if(_touchstartEvt){   
                    if ( (_isIphone && !_touchmoved) || ( _isAndroid && _touchmoved <= 2 && (e.timeStamp - _touchstartTime) < 500 && Math.abs(_firstY - _lastY) < 15) ){
                        fireEvent('click', e);
                    }
                }
                _firstY = null;
                _lastY  = null;
                _touchstartEvt = null;              
                break;
        }
    }
    
    /**
     * Fire an event - used to allow for speedy clicks on iPhone
     * @method fireEvent    
     * @param type {String} The event type (click, touchstart, etc)
     * @param e {Event} The generated event
     * @private
     **/
    function fireEvent(type, e)
    {
        var arr = type === 'click' ? _clicks : _touchends;
        if(_touchstartEvt)
        {
            mui.each(arr, function(b) {
                if(b && mui.contains(b.element, _touchstartEvt.target))
                {
                    var evt = {};
                    evt.preventDefault = function() { 
                        e.preventDefault(); 
                    };
                    evt.stopPropagation = function() { 
                        e.stopPropagation(); 
                    };
                    mui.iterate(_touchstartEvt, function(v, n) {
                        evt[n] = v;
                    });
                    mui.iterate(_touchstartEvt.touches[0], function(v, n) {
                        evt[n] = v;
                    });
                    evt.type = type;
                    b.method(evt);
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
    function on(el, type, fn, ctx, useCapture)
    {
        var method, fauxEvt;
        ctx = ctx || el;
        el = (typeof el === 'string') ? mui.get(el) : el;
        useCapture = !!useCapture;
        if(el) 
        {
            if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) 
            {
                switch(type) 
                {
                    case 'touchstart':
                        type = 'mousedown';
                        break;
                    case 'touchmove':
                        type = 'mousemove';
                        break;
                    case 'touchend':
                        type = 'mouseup';
                        break;
                }                
                method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? 
                     function(e) { fn.handleEvent.call(fn, resolveEvent(e)); }: 
                    function(e) { fn.call(ctx, resolveEvent(e)); };
            }
            else
            {
                method = (fn.handleEvent && typeof fn.handleEvent === 'function') ? 
                    function(e) { fn.handleEvent.call(fn, e); } : 
                    function(e) { fn.call(ctx, e); };
            }
            
            fauxEvt = {
                element: el,
                type: type,
                originalMethod: fn,
                method: method,
                useCapture: useCapture
            };

            _bindings.push(fauxEvt);

            if((_isIphone || _isAndroid) && type === 'click')
            {
                _clicks.push(fauxEvt);
            }
            else if((_isIphone || _isAndroid) && type === 'touchend')
            {
                _touchends.push(fauxEvt);
            }
            else
            {
                el.addEventListener(type, method, useCapture);
            }
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
    function one(el, type, fn, ctx, useCapture)
    {
        var method = function() {
            if(fn.handleEvent && typeof fn.handleEvent === 'function')
            {
                fn.handleEvent.apply(fn, arguments);
            }
            else
            {
                fn.apply(ctx||fn, arguments);
            }
            removeEventListener(el, type, method, ctx, useCapture);
        };
        on(el, type, method, ctx, useCapture);
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
    function removeEventListener(el, type, fn, ctx, useCapture)
    {
        var i=0, len=_bindings.length, b, method;
        ctx = ctx || el;
        el = (typeof el === 'string') ? mui.get(el) : el;
        useCapture = !!useCapture;
        if(el) 
        {
            if(typeof window.ontouchstart === 'undefined' || mui.UA.Chrome) 
            {
                switch(type) 
                {
                    case 'touchstart':
                        type = 'mousedown';
                        break;
                    case 'touchmove':
                        type = 'mousemove';
                        break;
                    case 'touchend':
                        type = 'mouseup';
                        break;
                }                
            }
            
            for(i; i<len; i++)
            {
                b = _bindings[i];
                if(b.type === type && b.useCapture === useCapture && b.element === el && b.originalMethod === fn)
                {
                    el.removeEventListener(type, b.method, b.useCapture);
                    _bindings.splice(i, 1);
                    i--;
                    len--;
                }
                else if(b.type === type && b.useCapture === useCapture && b.element === el && !fn)
                {
                    el.removeEventListener(type, b.method, b.useCapture);
                    _bindings.splice(i, 1);
                    i--;
                    len--;
                }

                if((typeof window.ontouchstart !== 'undefined' && !mui.UA.Chrome) && (type === 'click' || type === 'touchend'))
                {
                    var arr = type === 'click' ? _clicks : _touchends;
                    for(var j=0, len2=arr.length; j<len2; j++)
                    {
                        var c = arr[j];
                        if(c.useCapture === useCapture && c.element === el && c.originalMethod === fn)
                        {
                            arr.splice(j, 1);
                            j--;
                            len2--;
                        }
                        else if(c.useCapture === useCapture && c.element === el && !fn)
                        {
                            arr.splice(j, 1);
                            j--;
                            len2--;
                        }
                    }
                    if(type === 'click') _clicks = arr;
                    else _touchends = arr;
                }
            }
        }
    }
    
    // Temporary cleanup method for stale event bindings.
    function clearStaleEventBindings() {
        _bindings = _bindings.filter(function(element, index, array) {
            return mui.inDocument(element.element);
        });
    }

    // Attach listeners to document for speedy clicks on iPhone
    if(_isIphone || _isAndroid)
    {
        document.addEventListener('touchstart', handleEvent, true);
        document.addEventListener('touchmove', handleEvent, true);
        document.addEventListener('touchend', handleEvent, true);
    }
    
    // Public methods
    return {
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
var anim = {
    
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
        el = (typeof el === 'string') ? mui.get(el) : el;
        var posStyle = mui.getStyle(el, 'position');
        if(posStyle != 'absolute' || posStyle != 'relative') 
        {
            mui.setStyle(el, 'position', 'relative');
        }
        var styles = {};
        var duration = options.duration || '350ms';
        var properties = [];
        var transforms = [];
        mui.iterate(options.properties, function(value, property) 
        {
            switch(property) 
            {
                case 'left':
                case 'right':
                    el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';
                    property = '-webkit-transform';
                    value = 'translateX('+value+')';
                    transforms.push( value );
                    break;
                case 'top':
                case 'bottom':
                    el.style.webkitTransitionTimingFunction = options.easing || 'ease-in-out';                
                    property = '-webkit-transform';
                    value = 'translateY('+value+')';
                    transforms.push( value );
                    break;
                default:
                    styles[property] = value;
                    break;
            }
            properties.push(property);
        });
        
        if(transforms.length > 0) 
        {
            if(styles['-webkit-transform']) styles['-webkit-transform'] += ' ' + transforms.join(' ');
            else styles['-webkit-transform'] = transforms.join(' ');
        }
        
        el.style.webkitTransitionDuration = duration;
        el.style.webkitTransitionProperty = properties.join(' ');
        
        if(options.easing) el.style.webkitTransitionTimingFunction = options.easing;

        mui.iterate(styles, function(value, name) 
        {
            el.style[name] = value;
        });            
        
        if(options.callback)
        {
            var scope = options.callback.scope || options.callback.onComplete;
            var fn = function()
            {
                options.callback.onComplete.call(scope);
                el.removeEventListener('webkitTransitionEnd', fn, false);
            };
            el.addEventListener('webkitTransitionEnd', fn, false);
        }
    }        
};

/**
 * Effects methods
 * @module fx
 **/
var fx = {
    
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
        var doReflection = function(i) 
        {
            var container = document.createElement('div');
            container.className = 'mui-reflect-container';
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            var height = 40;
            var opacity = 0.3;

            container.appendChild(canvas);

            canvas.style.height = height+'px';
            canvas.style.width = img.offsetWidth+'px';
            canvas.height = height;
            canvas.width = img.offsetWidth;

            ctx.save();

            ctx.translate(0,img.offsetHeight-1);
            ctx.scale(1,-1);
            ctx.drawImage(img, 0, 0, img.offsetWidth, img.offsetHeight);

            ctx.restore();

            ctx.globalCompositeOperation = "destination-out";
            var grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(1, "rgba(255, 255, 255, 1.0)");
            grad.addColorStop(0, "rgba(255, 255, 255, "+(1-opacity)+")");

            ctx.fillStyle = grad;
            ctx.rect(0, 0, img.offsetWidth, height*2);
            ctx.fill();            
        };        

        if(!mui.inDocument(img)) 
        {
            img.addEventListener('load', function() {
                doReflection(img);
            }, false);
        } 
        else 
        {
            doReflection(img);
        }                
    }        
};

/**
 * AJAX methods
 * @module ajax
 **/
var ajax = {
    
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
            var xhr = new XMLHttpRequest(),
                method = options.method || 'get',
                success = options.callback ? options.callback.success : null,
                failure = options.callback ? options.callback.failure : null,
                scope = options.callback ? options.callback.scope : null,
                params = options.params || null,
                onError = true, body = document.body;
            
            if(options.update) 
            {
                var el = (typeof options.update === 'string') ? mui.get(options.update) : options.update;
                success = function(o) {
                    el.innerHTML = o.responseText;
                };
            }
            
            xhr.open(method, url, true);
            xhr.onreadystatechange = (success) ? function(o) {
                body.removeEventListener("offline", xhr.onerror, false);
                                
                if(xhr.readyState !== 4)
                {
                    mui.trace("XHR state change: " + xhr.readyState);
                    return;
                }
                mui.trace("XHR status: " + xhr.status);
                
                if(xhr.status === 200 || xhr.status === 0)
                {
                    success.call(scope, o.target);
                }
                else if(failure)
                {
                    onError = false;
                    failure.call(scope, o.target);
                }
            } : null;
            
            xhr.onerror = xhr.onabort = function(o){
                body.removeEventListener("offline", xhr.onerror, false);
                
                // do not call the failure handler twice
                // there are times where the browser does not call onreadystatechage
                // e.g. lost Wifi signal
                if(onError && failure) {
                     failure.call(scope, { status: 0, statusText: "error" } ); 
                };
                onError = false;
            };
            body.addEventListener("offline", xhr.onerror, false);
            
            if(options.headers)
            {
                mui.each(options.headers, function(h) {
                    mui.iterate(h, function(v, n) {  xhr.setRequestHeader(n, v); });
                });
            }
            
            if ( !("onLine" in navigator) /* older Iphones */ || navigator.onLine){
                xhr.send(params);
            } else {
                xhr.onerror();
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
        var scriptTag = mui.createElement('script', { type: 'text/javascript', src: url });
		if(typeof callback === "function"){
			mui.on(scriptTag, 'load', mui.bind(callback, scope));
		}
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }    
};

/**
 * Object-Oriented programming helpers
 * @module oop
 **/
var oop = {
    
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
        var i, len, s = ns.split('.'), p = window;
        for(i=0, len=s.length; i<len; i++)
        {
            p[s[i]] = (typeof p[s[i]] === 'undefined') ? {} : p[s[i]];
            p = p[s[i]];
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
        sub.prototype.__proto__ = sup.prototype;    
        
        // Set constructor properties for parent, child
        sub.prototype.constructor = sub;
        if(sup.prototype.constructor == Object.prototype.constructor) {        
            sup.prototype.constructor = sup;
        }
        
        // Set superclass property for child class
        sub.superclass = sup.prototype;
        
        // If any prototype properties are passed in, add those to the child's prototype
        if(proto) {        
            mui.iterate(proto, function(v, n) {
                sub.prototype[n] = v;
            });
        }
        
        // If any static properties are passed in, add those to the child as static members
        if(stat) {        
            mui.iterate(stat, function(v, n) {
                sub[n] = v;
            });
        }
        
        return sub;
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
        obj = mui.augment.call(this, obj, provider, ov);
        obj = mui.augmentProto.call(this, obj, provider, ov);
        return obj;
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
        for(var p in provider) 
        {
            if(provider.hasOwnProperty(p)) 
            {
                if((ov && typeof obj[p] !== 'undefined') || typeof obj[p] === 'undefined') obj[p] = provider[p];
            }
        }
        return obj;
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
        for(var p in provider.prototype) 
        {
            if((ov && typeof obj.prototype[p] !== 'undefined') || typeof obj.prototype[p] === 'undefined') obj.prototype[p] = provider.prototype[p];
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
        var args = Array.prototype.slice.call(arguments, 2);
        return function() { 
            // Merge arguments of inner function with those passed to mui.bind            
            var xargs = Array.prototype.slice.call(arguments);
            mui.each(args, function(a) { xargs.push(a); });
            return fn.apply((ctx || fn), xargs); 
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
        mui[name] = obj;
        return mui[name];
    }

};

/**
 * Client environment methods
 * @module env
 **/
var env = {
    
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

        var UA = {
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

        if(typeof navigator != 'undefined')
        {
            if(RegExp(" AppleWebKit/").test(navigator.userAgent))       UA.WebKit = true;
            if(RegExp("Android").test(navigator.userAgent))             UA.Android = true;
            if(RegExp("Chrome").test(navigator.userAgent))              UA.Chrome = true;
            if(RegExp("webOS").test(navigator.userAgent))               UA.webOS = true;            
            if(/i(Phone|P(o|a)d)/.test(navigator.userAgent))            UA.Apple = true;
            if(UA.Apple && RegExp("OS 3").test(navigator.userAgent))    UA.iPhone3 = true;
            if(UA.Apple && RegExp("iPad").test(navigator.userAgent))    UA.iPad = true;
            if(UA.Apple || (!UA.Android && !UA.webOS && RegExp("Safari").test(navigator.userAgent))) UA.Safari = true;
            if(UA.iPad || UA.Chrome)                                    UA.tablet = true;
        }

        UA.Gears = typeof(navigator.mimeTypes) !== 'undefined' && navigator.mimeTypes['application/x-googlegears'];
        
        // Create Gears element
        if(UA.Gears)
        {
            var factory = document.createElement('object');
            factory.style.display = 'none';
            factory.style.width = '0px';
            factory.style.height = '0px';
            factory.type = 'application/x-googlegears';
            document.documentElement.appendChild(factory);
            if(typeof google === 'undefined') google = {};
            if(!google.gears) google.gears = { factory: factory };
        }        
        
        // Transitions
        UA.CSSTransitions = (typeof WebKitCSSMatrix !== 'undefined');
        
        // Add classname to target CSS
        if(UA.Android) dom.addClass(document.documentElement, 'android');
        if(UA.Apple && !UA.iPad) dom.addClass(document.documentElement, 'iphone');
        if(UA.iPad) dom.addClass(document.documentElement, 'ipad');
        if(UA.webOS) dom.addClass(document.documentElement, 'webOS');

        return UA;
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
var template = function() {

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
    function defineTemplateBuffer(buffer, props, match, prefix)  {
        var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/,
            before  = "",
            match2  = "",
            expr    = "",
            newMatch;

        if (match) {
            before  = match[1];
            match2  = match[2];
            expr    = match[3];
        }

        if (before == '\\') {
            buffer.push(prefix, match2);
            if (!props[match2])
                props[match2] = [];

            props[match2].push(buffer.length-1);
            return;
        }

        newMatch = pattern.exec(expr);
        if (!newMatch) {
            buffer.push(prefix, before);
            return;
        }
        if (!props[expr])
            props[expr] = [];

        props[expr].push(buffer.length+2);
        buffer.push(prefix, before, expr);
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
    function parseTemplate(source, pattern, buffer, props) {
        var match, idx = 0;

        while (source)
        {
            if (match = source.match(pattern)) {
                idx = match.index;
                defineTemplateBuffer(buffer, props, match, source.slice(0,idx));
                source  = source.slice(idx + match[0].length);
            } else {
                buffer.push(source);
                source = '';
            }
        }
    }

    function cstr(str) {
        var S = String, t = typeof str;
    
        switch (t) {
            case "string": return str;
            case "number": return S(str);
        }
        str = str || "";
        str = S(str);
        return str;
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
    function Template(template, pattern)  {
        
        var regArgs = "";

        template        = cstr(template);
        pattern         = pattern || Template.DEFAULT_PATTERN;

        /**
         * @description - private, instance property used to find markers in a string for data binding
         *
         * @property Template::privMe.pattern
         * @type {RegEx}
        */
        this.pattern  = pattern;

        /**
         * @description - private, instance property, the original string that contains markers for data binding
         *
         * @propery Template::privMe.template
         * @type {string}
        */
        this.template = template;

        /**
         * @description - private, instance property, an array that contains the substrings of the original template, and empty string place holders
         *                for data.  This gets filled out from the constructor or via calling Template::parse
         *
         * @property Template::privMe.buffer
         * @type {Array}
        */
        this.buffer   = [];

        /**
         * @description - private, instance property, an object that contains the arrays of indexes into the buffer for where data values should go.
         *                This gets filled out from the constructor or via calling Template::parse. The object is keyed by the var/expressions in the
         *                the template. For example a string for a template like "#{foobar}" means that this object will have props["foobar"] == Array,
         *                and each index of the array will be an index to be filled out in the buffer.
         *
         * @property Template::privMe.props
         * @type {object}
        */
        this.props    = {};
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
    Template.DEFAULT_PATTERN    = /(^|.|\r|\n)(%\{(.*?)\})/;

    /**
     * @description - public, static property, the RegExp used to match a marker in a template string.  This expression
     *                is used for the typical sprintf format from c. (e.g. "Hello {user}");
     *
     * @property Template::SPRINTF_PATTERN
     * @type {RegExp}
     * @public
     * @static
    */
    Template.SPRINTF_PATTERN    = /(^|.|\r|\n)(\{(.*?)\})/;

    /**
     * @description - public method used to bind data in the string or echo the template itself.
     *
     * @method [Template].toString, [Template].valueOf
     * @param {obj} (optional) if obj present, the properties and values will be replaced in the template
     *              otherwise this will just return the original template string with no data replaced.
     * @public
     * @return {string} with or without, formatted data
    */
    Template.prototype.toString     =
    Template.prototype.valueOf      = function(obj) {
        var ret = "", buffer, props, propName, t,
            indexes, idx, len, val,
            initId = (this.pattern == Template.DEFAULT_PATTERN) ? "%{" : "{";

        if (obj) {
            if (!this.buffer || !this.buffer.length)
                this.parse(this.template);

            buffer  = this.buffer;
            props   = this.props;
            if (buffer && props) {
                for (propName in  props)  {
                    val     = obj[propName];
                    // If the property does not exist in obj, then restore the variable name:
                    if (typeof val === "undefined") {
                        val = (propName.charAt(propName.length - 1) == '}') ? ("\\" + propName) : (initId + propName + "}");
                    }
                    indexes = props[propName];
                    if (indexes) {
                        idx = 0;
                        len = indexes.length;
                        while (len--)
                            buffer[indexes[idx++]] = val;

                    }
                }
            }
            ret = buffer.join("");
        } else {
            ret = this.template;
        }

        this.data  = obj;

        return ret;
    }

    /**
     * @description - public method used to redefine the template string, creating the private buffer and prop instance properties
     *
     * @method [Template].parse
     * @param {string} template
     * @public
    */
    Template.prototype.parse  = function( template ) { 
        if (arguments.length) {
            template    = cstr(template);
            if (template && template != this.template) {
                this.template  = template;
                this.buffer    = [];
                this.props     = {};
                this.data      = null;
            }
        }

        parseTemplate(this.template, this.pattern, this.buffer, this.props);
    }
    
    var HTMLTEMPLATES = {};
    var STRINGTEMPLATES = {};
    
    if (!String.prototype.supplant){
        String.prototype.supplant = function ( data, cacheOff ) {            
            var template = STRINGTEMPLATES[ this ];
            
            if (!template){                
                template = new Template( this, Template.SPRINTF_PATTERN );
                template.parse();
                
                if (!cacheOff)
                    STRINGTEMPLATES[this] = template;
            }
                        
            return template.valueOf( data );
        };  
    }
       
    return {
        
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
            var node, templateId,
                template, html,
                res;
            
            if (typeof el === 'string'){
                node = mui.get( el );
                templateId = el;
            } else {
                node = el;
                templateId = node && node.getAttribute("id");
            }
            
            if (!node){
                return;
            }            
            
            if (!templateId){
                mui.debug("map(): templateId must be a string");
                return;
            }
            
            if (!cacheOff) {
                template = HTMLTEMPLATES[templateId];
            }
            
            if (!template){
                html = node.innerHTML.replace(/(\-\-\>)|(\<\!\-\-)/g, '');
                
                template = new Template( html, Template.DEFAULT_PATTERN );
                template.parse();
                
                if (!cacheOff) {
                    HTMLTEMPLATES[templateId] = template;
                }
            }
            
            nodeConfig = nodeConfig || {};
            // copy classes from source node
            nodeConfig.className = nodeConfig.className ? nodeConfig.className + ' ' +  node.className : node.className;
            
            res = nodeName ? mui.createElement(nodeName, nodeConfig) : node.cloneNode(true);
            if(!nodeName) res.removeAttribute('id');
            
            res.innerHTML = template.valueOf( data );
            
            return res;
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
            return str.supplant( data, cacheOff);
        }
    };
}();

// Define mui
oop.augment(mui, util);
oop.augment(mui, dom);
oop.augment(mui, event);
oop.augment(mui, anim);
oop.augment(mui, fx);
oop.augment(mui, ajax);
oop.augment(mui, oop);
oop.augment(mui, env);
oop.augment(mui, template);

})();