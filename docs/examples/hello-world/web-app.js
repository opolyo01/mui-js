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
		parentNode = parentNode || document.body;
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
	getXY: function(el) 
	{
		el = (typeof el === 'string') ? this.get(el) : el;
		var pos = [el.offsetLeft, el.offsetTop];
		var parentNode = el.offsetParent;
		var accountForBody = (this.getStyle(el, 'position') === 'absolute' && el.offsetParent == el.ownerDocument.body);
		if(parentNode != el) 
		{
			while(parentNode) 
			{
				pos[0] += parentNode.offsetLeft;
				pos[1] += parentNode.offsetTop;
				if(!accountForBody && parentNode.style.position == 'absolute') 
				{
					accountForBody = true;
				}
				parentNode = parentNode.offsetParent;
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
			if(typeof window.ontouchstart === 'undefined') 
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
			if(typeof window.ontouchstart === 'undefined') 
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

				if(typeof window.ontouchstart !== 'undefined' && (type === 'click' || type === 'touchend'))
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
		removeEventListener: removeEventListener
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
	 * Example:
	 *	Animating a position 100px up and 100px to the left:
	 *	
	 *	mui.animate('#the-element', {
	 * 		properties: {
	 *			top: '-100px',
	 *			left: '-100px',
	 * 		},
	 *		duration: '0.5s'
	 *	});
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
		mui.iterate(options.properties, function(value, property) 
		{
			switch(property) 
			{
				case 'left':
				case 'right':
					el.style.webkitTimingFunction = 'ease-in-out';
					property = '-webkit-transform';
					value = 'translateX('+value+')';
					break;
				case 'top':
				case 'bottom':
					el.style.webkitTimingFunction = 'ease-in-out';				
					property = '-webkit-transform';
					value = 'translateY('+value+')';
					break;
				default:
					break;
			}
			properties.push(property);
			styles[property] = value;
		});
		el.style.webkitTransitionDuration = duration;
		el.style.webkitTransitionProperty = properties.join(' ');
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
	 * 	method {String}: get, post
	 *	callback {Object}: Object literal containing the success and failure callback functions,
	 *		  as well as the scope to be applied to the callback functions.
	 *	update {String|HTMLElement}: If present, the given element will be updated with the result 
	 *		of the transaction.
	 * Example: 
	 * 	Using callback function:
	 *
	 * 	mui.io('/ajax.php', {
	 *	  method: 'get',
	 *        headers: [ { 'Content-Type': 'application/x-www-form-urlencoded' }],
	 *	  callback: {
	 *		success: function(o) {
	 *			// do something with o.responseText
	 *		},
	 *		scope: this
	 *	});
	 *
	 *	Using update property:
	 *
	 * 	mui.io('/ajax.php', {
	 *	  method: 'get',
	 *	  update: '#el-to-be-updated'
	 *	});	
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
			    flakyConnTimer;
			
			if(options.update) 
			{
				var el = (typeof options.update === 'string') ? mui.get(options.update) : options.update;
				success = function(o) {
					el.innerHTML = o.responseText;
				};
			}
			
			xhr.open(method, url, true);
			xhr.onreadystatechange = (success) ? function(o) {
			    if (flakyConnTimer){
			        clearTimeout(flakyConnTimer);
			        flakyConnTimer = null;
			    }
			    
				if(xhr.readyState !== 4)
				{
					return;
				}
				
				if(xhr.status === 200)
				{
					success.call(scope, o.target);
				}
				else if(failure)
				{
					failure.call(scope, o.target);
				}
			} : null;
			if(options.headers)
			{
				mui.each(options.headers, function(h) {
					mui.iterate(h, function(v, n) { xhr.setRequestHeader(n, v); });
				});
			}
			xhr.send(params);
			
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
		mui.on(scriptTag, 'load', mui.bind(callback, scope));
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
	extend: function(sub, sup, proto, stat) 
	{
		// Ensure sub and sup exist
		if(!sub || !sup)
		{
			throw new Error('mui.extend: Invalid extension.');
		}
		
		// Prototypal inheritance of the parent to child
		sub.prototype = new sup();

		// Set constructor properties for parent, child
		sup.constructor = sup;
		sub.prototype.constructor = sub;
		
		// Set superclass property for child
		sub.prototype.superclass = sup;
		
		// If any prototype properties are passed in, add those to the child's prototype
		if(proto)
		{
			mui.iterate(proto, function(v, n) {
				sub.prototype[n] = v;
			});
		}
		
		// If any static properties are passed in, add those to the child as static members
		if(stat)
		{
			mui.iterate(stat, function(v, n) {
				sub[n] = v;
			});
		}

		return sub;
	},

	/**
	 * Object augmentation
	 * @method augment
	 * @param obj {Object} The receiver to be augmented
	 * @param ext {Object} Object literal containing members to be added the receiver.
	 * @param ov {Boolean} If true, properties supplied will be overriden on the receiver if already present.
	 * @return The original object with all the original properties , plus the passed in extensions.
	 **/	
	augment: function(obj, ext, ov) 
	{
		for(var p in ext) 
		{
			if(ext.hasOwnProperty(p)) 
			{
				if((ov && typeof obj[p] !== 'undefined') || typeof obj[p] === 'undefined') obj[p] = ext[p];
			}
		}
		return obj;
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
			CSSTransitions: false
		};

		if(typeof navigator != 'undefined')
		{
			if(RegExp(" AppleWebKit/").test(navigator.userAgent))       UA.WebKit = true;
			if(RegExp("Android/").test(navigator.userAgent))	    UA.Android = true;
			if(RegExp("webOS").test(navigator.userAgent))	    	    UA.webOS = true;			
			if(/i(Phone|P(o|a)d)/.test(navigator.userAgent))                UA.Apple = true;
			if(UA.Apple && RegExp("OS 3").test(navigator.userAgent))    UA.iPhone3 = true;
			if(UA.Apple && RegExp("iPad").test(navigator.userAgent))	UA.iPad = true;
			if(UA.Apple || (!UA.Android && !UA.webOS && RegExp("Safari").test(navigator.userAgent))) UA.Safari = true;
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
            indexes, idx, len, val;

        if (obj) {
            if (!this.buffer || !this.buffer.length)
                this.parse(this.template);

            buffer  = this.buffer;
            props   = this.props;
            if (buffer && props) {
                for (propName in  props)  {
                    val     = obj[propName];
					// If the property does not exist in obj, then restore the variable name:
					if ((typeof val === "undefined") && (propName.charAt(0) != '%')) {
						val = "%{" + propName + "}";
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
function Navigator()
{
	// Initialize properties
	this._mappings = {};
	this._regExpCache = {};
	
	// Initialize window
	setInterval(mui.bind(this._checkWindow, this), 100);
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
	 * Check the window location against the current location
	 * @method _checkWindow
	 * @private
	 */
	_checkWindow: function()
	{
		if(this._hash !== window.location.hash.substr(1))
		{
			this._hash = window.location.hash.substr(1);
			this.openUrl(this._hash);
		}
	},
	
	/**
	 * XHR Transaction success handler.
	 * @method _ioSuccess
	 * @param o {XMLHttpRequest} The XHR object
	 * @param newPage {HTMLElement} The DOM element for the showing view
	 */
	_ioSuccess: function(o, newPage) 
	{
		newPage.innerHTML = o.responseText;
	},
	
	/**
	 * XHR Transaction failure handler.
	 * @method _ioFailure
	 * @param o {XMLHttpRequest} The XHR object
	 * @param newPage {HTMLElement} The DOM element for the showing view
	 */
	_ioFailure: function(o, newPage) 
	{
		// @TODO
	},
	
	/**
	 * Open a URL
	 * @method openUrl
	 * @param url {String} The url to open
	 * @param quiet {Boolean} (Optional) If true, then this method only changes the URL hash and does nothing else.	
	 * @return {Navigator} The navigator instance
	 */
	openUrl: function(url, quiet)
	{
		// Quiet mode
		if(quiet === true)
		{
			this._hash = window.location.hash = url;
			return this;
		}

		// Declare local variables
		var newPage, oldPage, paramStr, paramSpl, params, ioUrl = url;		
		
		// Check if we need to set the location of the window
		if(!this._hash || this._hash !== url) window.location.hash = this._hash = url;
		
		if(url[0] === '/') url = url.substring(1);		

		// Check if parameters are in the URL
		// paramStr = /\?(.*)/g.exec(url);
		if(typeof this._regExpCache[url] === 'undefined')
		{
			this._regExpCache[url] = /\?(.*)/g.exec(url);
		}
		paramStr = this._regExpCache[url];
		if(paramStr)
		{
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
		oldPage = mui.get('*[x-mui-showing=true]');

		// Hide old page
		if(oldPage && newPage)
		{
			oldPage.removeAttribute('x-mui-showing');
			oldPage.style.display = 'none';
		}		
		
		// Show new page
		if(newPage)
		{
			newPage.setAttribute('x-mui-showing','true');
			newPage.style.display = 'block';
			if(newPage.getAttribute('x-mui-href') && !newPage.getAttribute('x-mui-loaded'))
			{
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
		if(this._mappings[url])
		{
			mui.each(this._mappings[url], function(m) { m(url, params); });
		}
		else if(this._mappings['*'])
		{
			mui.each(this._mappings['*'], function(m) { m(url, params); });
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
	mapUrl: function(url, callback)
	{
		this._mappings[url] = this._mappings[url] || [];
		this._mappings[url].push(callback);
		return this;
	}
};

mui.Navigator = Navigator;

})();
(function() {

const SPACER_CAP = '<div class="mui-nav-child mui-nav_spacer"></div>';
const LEFT_CAP  = '<div class="mui-nav-child mui-navleft_cap"><div class="mui_navleft_cap_overlay"></div></div>';
const RIGHT_CAP = '<div class="mui-nav-child mui-navright_cap"><div class="mui-navright_cap_overlay"></div></div>';

/**
 * NavigationBar class
 * This class provides a navigation-bar component for a 
 * NavigationController. 
 * The NavigationBar class has built-in components for title,
 * back button, right bar button item, and a search box. It is 
 * also possible to add custom controls to the navigation bar
 * @class NavigationBar
 * @constructor
 * @param config {Object} NavigationBar configuration includes:
 * 	navigationController {mui.NavigationController} (Optional) A 
 *    		navgation controller to attach to
 * 	tintColor {String} Override the default tint color 
 */
function NavigationBar(config)
{
	// Initialize properties
	config = config || {};
	if(config.navigationController) this.navigationController = config.navigationController;
	
	if(config.tintColor) this.tintColor = config.tintColor;
	if(config.hasCaps)   this.hasCaps   = config.hasCaps;
	
	// Initialize
	this.initialize();
}

NavigationBar.prototype = {
	
	/**
	 * NavigationBar HTMLElement container
	 * @property element
	 * @type HTMLElement
	 */
	element: null,
	
	/**
	 * HTMLElement container for items
	 * @property itemsContainer
	 * @type HTMLElement
	 */
	itemsContainer: null,
	
	/**
	 * Currently visible navigation items
	 * @property items
	 * @type Object
	 */
	items: null,
	
	/**
	 * The tint color of the navigation bar, any valid
	 * CSS color string (#000, rgb(0,0,0), rgba(0,0,0,0.4))
	 * @property tintColor
	 * @type String
	 */
	tintColor: null,
	
	/**
     * It creates an extra element to left or right of the navigation items to be used as a cap.
     * Theses navigation items will always have the same width (largest of the 2) when caps are showing.
     * 
     * @property hasCaps
     * @type Boolean
     */
    hasCaps: false,
    
	/**
	 * Event dispatcher
	 * @method handleEvent
	 * @private
	 */
	handleEvent: function(e)
	{
		var backTarget = mui.getAncestorByClassName(e.target, 'mui-navback');
		switch(e.type)
		{
			case 'touchstart':
			case 'mousedown':
				e.preventDefault();
				if(backTarget) mui.addClass(this._backElement, 'mui-depressed');
				break;
			case 'touchmove':
			case 'mousemove':
				if(backTarget) mui.removeClass(this._backElement, 'mui-depressed');
				break;
			case 'touchend':
			case 'mouseup':
				e.preventDefault();
				if(backTarget) setTimeout(mui.removeClass, 0, this._backElement, 'mui-depressed');
				break;
			case 'click':
				if(mui.getAncestorByClassName(e.target, 'mui-navtitle'))
				{
					if(this.navigationController) this.navigationController.didClickTitle();
				}
				break;
		}
	},
	
	/**
	 * Set the navigation items for the navigation bar, with an 
	 * option to animate the items into place
	 * @method setItems
	 * @param items {Object} The navigation items
	 * @param animated {Boolean} To enable animation (default is false)
	 * @param reverse {Boolean} To animate in reverse (popping)
	 */
	setItems: function(items, animated, reverse)
	{
		/*
		if(animated && mui.UA.Apple)
		{
			this.setItemsWithAnimation(items, reverse);
			return;
		}
		*/
		
		this.show();
		this.setLeftBarItem(items.leftBarItem);
		if(!items.leftBarItem) this.setBack(items.back, items.backAction);
		else this.setBack(null);
		this.setRightBarItem(items.rightBarItem);
		this.setTitle(items.title);
	},
	
	/**
	 * Set the navigation items in the bar with an animation. Contents of the
	 * title section are pushed out, while the back, leftBarItems and rightBarItems 
	 * are faded in/out
	 * @method setItemsWithAnimation
	 * @param items {Object} The new navigation items
	 * @param reverse {Boolean} If animation should be in reverse
	 */
	setItemsWithAnimation: function(items, reverse)	
	{
		var clone = this.itemsContainer.cloneNode(true);
		mui.addClass(clone, 'mui-navbar-clone');
		
		mui.insertBefore(clone, this.itemsContainer);		
		
		this.setLeftBarItem(items.leftBarItem);
		if(!items.leftBarItem) this.setBack(items.back, items.backAction);
		this.setRightBarItem(items.rightBarItem);
		this.setTitle(items.title);
		
		this.itemsContainer.style.visibility = 'hidden';
		this.itemsContainer.style.webkitTransitionDuration = '0s';
		this.itemsContainer.style.webkitTransform = reverse ? 'translateX(-50%)' : 'translateX(50%)';
		this.itemsContainer.style.opacity = '0';		
		
		setTimeout(mui.bind(function() {
			this.itemsContainer.style.visibility = 'visible';
			this.itemsContainer.style.webkitTransitionDuration = '';
			this.itemsContainer.style.opacity = '1';
			this.itemsContainer.style.webkitTransform = 'translateX(0)';

			clone.style.opacity = '0';
			clone.style.webkitTransform = reverse ? 'translateX(50%)' : 'translateX(-50%)';
			
			setTimeout(function() {
				clone.parentNode.removeChild(clone);
			}, 300);

		}, this), 1);
		
	},
	
	/**
	 * Set the contents of the back element. Accepts either
	 * a string or a truthy value as argument. If string, the word 
	 * is displayed in the back button. If true, the arrow icon is 
	 * presented instead
	 * @method setBack
	 * @param action {Function|String} Either a function to be executed on click, or a URL 
	 * @param back {String|Boolean} The back string, or true to present arrow icon
	 */
	setBack: function(back, action, node)
	{
		var el = node || this._backElement, elHtml;
		
		if(!back)
		{
			mui.addClass(el, 'mui-hidden');
			el.innerHTML = '';
			mui.removeEventListener(el, 'touchend');
			mui.removeEventListener(el, 'click');
		} 
		else
		{
			mui.removeEventListener(el, 'click');
			mui.removeClass(el, 'mui-hidden');
			if(typeof back === 'string')
			{
				mui.removeClass(el, 'mui-backicon');
				elHtml = (typeof action === 'string') ?
					'<h6 class="mui-navbar-back"><a href="'+action+'">'+back+'</a></h6>' : 
					'<h6 class="mui-navbar-back">'+back+'</h6>';
			}
			else
			{
				mui.addClass(el, 'mui-backicon');
				elHtml = (typeof action === 'string') ?
					'<h6 class="mui-navbar-back"><a href="'+action+'"><b></b></a></h6>' :
					'<h6 class="mui-navbar-back"><b class="mui-navbar-b"></b></h6>';
			}
			
			if (this.hasCaps) {
                elHtml = elHtml + SPACER_CAP + LEFT_CAP;
            }
                
            el.innerHTML = elHtml;
            if(typeof action === 'function') mui.one(el, 'click', action);
                
			// Button 
			mui.on(el, 'touchstart', this);
			mui.on(el, 'touchmove', this);
			mui.on(el, 'touchend', this);
		}
		return el;
	},
	
	/**
	 * Set the contents of the leftBarItem element
	 * @method setLeftBarItem
	 * @param leftBarItem {HTMLElement} A DOM node to use as the content of the item
	 */
	setLeftBarItem: function(leftBarItem)
	{
		this._leftBarItemElement.innerHTML = '';        
		if(leftBarItem instanceof HTMLElement)
		{
		    mui.addClass(leftBarItem, "mui-nav-child");
			this._leftBarItemElement.appendChild(leftBarItem);
		}
		else if(mui.Button && leftBarItem instanceof mui.Button)
		{
			leftBarItem.render(this._leftBarItemElement);
		}
		else
		{
			this._leftBarItemElement.innerHTML = '';
		}	
		
		if ( this.hasCaps && this._leftBarItemElement.childElementCount ){
		   this._leftBarItemElement.appendChild( mui.createElement('div', { innerHTML: SPACER_CAP } ).firstElementChild );
           this._leftBarItemElement.appendChild( mui.createElement('div', { innerHTML: LEFT_CAP } ).firstElementChild );
        }	
	},
	
	/**
	 * Set the contents of the rightBarItem element
	 * @method setRightBarItem
	 * @param rightBarItem {HTMLElement} A DOM node to use as the content of the item
	 */
	setRightBarItem: function(rightBarItem)
	{
		this._rightBarItemElement.innerHTML = '';		
		if(mui.Pager && rightBarItem instanceof mui.Pager)
		{
			rightBarItem.render(this._rightBarItemElement);
		}
		else if(mui.Button && rightBarItem instanceof mui.Button)
		{
			rightBarItem.render(this._rightBarItemElement);
		}
		else if(rightBarItem instanceof HTMLElement)
		{
		    mui.addClass(rightBarItem, "mui-nav-child");
			this._rightBarItemElement.appendChild(rightBarItem);
		}
		else
		{
			this._rightBarItemElement.innerHTML = '';
		}
		
		if ( this.hasCaps && this._rightBarItemElement.childElementCount ){
		   this._rightBarItemElement.insertBefore(  mui.createElement('div', { innerHTML: SPACER_CAP } ).firstElementChild, this._rightBarItemElement.firstElementChild );
           this._rightBarItemElement.insertBefore( mui.createElement('div', { innerHTML: RIGHT_CAP } ).firstElementChild, this._rightBarItemElement.firstElementChild );
        }   
	},
	
	/**
	 * Set the contents of the title element
	 * @method setTitle
	 * @param title {String|HTMLElement|*} A DOM node to use as the content of the item, or
	 *   a string to use as title text, or an allowed control, such as mui.SearchBox
	 */
	setTitle: function(title, node)
	{ 
		var el = node || this._titleElement, 
		    container = mui.createElement('div', { className: "mui-navtitle-el" } ), 
		    left, 
		    right, 
		    padding,
		    spacer,
		    xy, 
		    maxWidth = window.innerWidth - 30;
		
		el.innerHTML = '';
		mui.addClass(el, 'mui-noleft');
		el.appendChild(container);
		
		if(mui.SearchBox && title instanceof mui.SearchBox)
		{
			mui.addClass(container, 'mui-block');
			if(!this._backElement.offsetWidth) mui.addClass(container, 'mui-wide');
			title.render(container);
		}
		else if(typeof title === 'string')
		{
			container.appendChild(document.createTextNode(title));
		}
		else if(title)
		{
			container.appendChild(title);
		}
		
		if(this._backElement.offsetWidth && container)
		{
		    mui.removeClass(el, 'mui-noleft');
			left = this._backElement.offsetWidth;
			maxWidth -= left;
		}
		if(this._rightBarItemElement.offsetWidth && container)
		{
			right = this._rightBarItemElement.offsetWidth;
			maxWidth -= right;
		}
		if(this._leftBarItemElement.offsetWidth && container)
		{
		    mui.removeClass(el, 'mui-noleft');
			left = this._leftBarItemElement.offsetWidth;
			maxWidth -= left;
		}    
		
		if ( this.hasCaps && left && right && left != right ){
		    padding = Math.abs( left - right ) - 10;
		    
		    spacer = mui.get("div.mui-nav_spacer", left > right ? this._rightBarItemElement : (this._backElement.offsetWidth ? this._backElement : this._leftBarItemElement) );
		    if (spacer && padding > 0){
		        mui.setStyle(spacer, "width", padding + "px");
		    }
		}    
        
        if(this._backElement.offsetWidth && container)
        {
            container.style.marginLeft = '-'+this._backElement.offsetWidth+'px';
            if(container.offsetLeft <= (el.offsetLeft+3))
            {
                container.style.marginLeft = '';
                mui.addClass(container, 'mui-block');
            }
        }
        if(this._rightBarItemElement.offsetWidth && container)
        {
            container.style.marginRight = '-' + this._rightBarItemElement.offsetWidth+'px';
            xy = mui.getXY(this._rightBarItemElement);
            if((container.offsetLeft + container.offsetWidth) >= xy[0])
            {
                container.style.marginRight = '';
                mui.addClass(container, 'mui-block');
            }
        }
        if(this._leftBarItemElement.offsetWidth && container)
        {
            container.style.marginLeft = '-' + this._leftBarItemElement.offsetWidth+'px';
            if(container.offsetLeft <= left)
            {
                container.style.marginLeft = '';
                mui.addClass(container, 'mui-block');
            }
        }
        
        mui.setStyle(container, 'max-width', maxWidth+'px');
            
		return el;
	},
	
	/**
	 * Hide the navigationBar element
	 * @method hide
	 */
	hide: function()
	{
		this.element.removeAttribute('x-mui-showing');		    
	},
	
	/**
	 * Show the navigationBar element
	 * @method show
	 */
	show: function()
	{
		this.element.setAttribute('x-mui-showing', 'true');
	},
	
	/**
	 * Update the appearance of the navigation bar to reflect the current tint color
	 * @method setTintColor
	 * @property tintColor {String} The new tint color
	 */
	setTintColor: function(tintColor)
	{
		this.tintColor = tintColor;
		
		// Valid tint color
		if(typeof this.tintColor === 'string')
		{
			mui.addClass(this.element, 'mui-tinted');
			this.element.style.background = this.tintColor;
		}
		// Otherwise, should be default appearance
		else
		{
			mui.removeClass(this.element, 'mui-tinted');
			this.element.style.background = '';			
		}
	},

	/**
	 * NavigationBar initialization creates the elements
	 * and inserts itself into the <header> of the page
	 * @method initialize
	 */
	initialize: function()
	{
		// Declare local variables
		var header = mui.get('body > header');
		
		// Create the root element
		this.element = mui.createElement('div', { className: 'mui-navbar' });
		if(this.navigationController) this.element.setAttribute('x-mui-controller', this.navigationController.NAME);
		
		// Create wrapper element
		this.itemsContainer = mui.createElement('div', { className: 'mui-navbar-wrap' });
		this.element.appendChild(this.itemsContainer);
		
		// Insert element as the last child in <header>
		if(!header)
		{
			header = mui.createElement('header');
			mui.insertBefore(header, document.body.firstChild);
		}
		if(header.lastChild) mui.insertAfter(this.element, header.lastChild);
		else header.appendChild(this.element);
		
		// Initialize items
		this.items = {
			back: null,
			leftBarItem: null,
			title: null,
			rightBarItem: null
		};
		
		// Create items elements
		this._backElement = mui.createElement('div', { className: 'mui-navbar-el mui-navback' });
		this._leftBarItemElement = mui.createElement('div', { className: 'mui-navbar-el mui-navleft' });
		this._titleElement = mui.createElement('div', { className: 'mui-navbar-el mui-navtitle' });
		this._rightBarItemElement = mui.createElement('div', { className: 'mui-navbar-el mui-navright' });
		this.itemsContainer.appendChild(this._backElement);
		this.itemsContainer.appendChild(this._leftBarItemElement);
		this.itemsContainer.appendChild(this._titleElement);
		this.itemsContainer.appendChild(this._rightBarItemElement);
		
		// Check for tint color
		if(this.tintColor) this.setTintColor(this.tintColor);
		
		mui.on(this.element, 'click', this);
	}
	
};

mui.NavigationBar = NavigationBar;

})();
/**
 * TabView module
 * @module tab-view
 */

(function() {

const CLASS_SHOWING = 'mui-showing';

/**
 * The TabView class provides a tabbed navigation model for related
 * contents. TabViews can be embedded inside the header of a page for
 * global navigation, or inside the content of the page
 * @class TabView
 * @constructor
 * @param el {String|HTMLElement} CSS Selector or HTMLElement for the tabs container
 * @param options {Object} TabView configuration options
 */
function TabView(el, options)
{
	// Declare locals
	var active = null;
	options = options || {};
	
	// Initialize element
	this.element = mui.get(el);
	mui.addClass(this.element, 'mui-tab-view');
	
	// Initialize list
	this.tabs = mui.getAll('li', this.element);
	mui.each(this.tabs, function(t) {
		t.style.width = Math.round(100/this.tabs.length)+'%';
	}, this);
	
	// Check active index
	active = mui.get('.mui-showing', this.element);
	this.activeIndex = active ? this.tabs.indexOf(active) : 0;
	if(!mui.hasClass(this.tabs[this.activeIndex], CLASS_SHOWING)) mui.addClass(this.tabs[this.activeIndex], CLASS_SHOWING);

	// Iniitalize tabContents
	this.tabContents = [];
	if(options.tabContents)
	{
		mui.each(options.tabContents, function(tc, i) {
			var el = mui.get(tc);
			mui.addClass(el, 'mui-tab-content');
			if(i === this.activeIndex)
			{
				mui.addClass(el, CLASS_SHOWING);
			}
			this.tabContents.push(mui.get(tc));
		}, this);
	}
	
	// Initialize events
	mui.on(this.element, 'click', this);
}

TabView.prototype = {

	/**
	 * The HTMLElement containing the tabs
	 * @property element
	 * @type HTMLElement
	 */
	element: null,
	
	/**
	 * The index of the currently selected tab
	 * @property activeIndex
	 * @type Number
	 */
	activeIndex: null,
	
	/**
	 * Array of elements which are the contents for each tab
	 * @property tabContents
	 * @type Array
	 */
	tabContents: null,
	
	/**
	 * DOM Event handler
	 * @method handleEvent
	 * @param e {Event} The DOM event
	 * @private
	 */
	handleEvent: function(e)
	{
		var tabTarget = mui.getAncestorByTagName(e.target, 'li');
		if(!tabTarget) return false;
		switch(e.type)
		{
			case 'click':
				e.preventDefault();
				
				var active = mui.get('.mui-showing', this.element);
				if(active && tabTarget === active)
				{
					this.tabRefreshed(this.activeIndex);
				}
				else if(active && tabTarget !== active)
				{
					this.activateTabAtIndex(this.tabs.indexOf(tabTarget)).tabChanged(this.activeIndex);
				}
				break;
		}
	},
	
	/**
	 * Tab change event handler which is invoked every time a tab is activated.
	 * Override this method in implementation. The first argument to the method
	 * is the index of the selected tab.
	 * @method tabChanged
	 * @param index {Number} The index of the selected tab
	 */
	tabChanged: function(index)
	{
		// Override this method
	},
	
	/**
	 * This method is invoked whenever the currently active tab is reactivated.
	 * Override this method in implementation. The first argument to the method
	 * is the index of the selected tab.
	 * @method tabRefreshed
	 * @param index {Number} The index of the selected tab
	 */
	tabRefreshed: function(index)
	{
		// Override this method	
	},
	
	/**
	 * Set the tabContent for a particular tab at a given index
	 * @method setTabContent
	 * @param index {Number} The index of the tab
	 * @param tabContent {String|HTMLElement} The tabContent element
	 */
	setTabContent: function(index, tabContent)
	{
		this.tabContents[index] = mui.get(tabContent);
	},
	
	/**
	 * Activate a tab at a given index by activating the selected state of the tab, as well
	 * as showing any tab content for the tab
	 * @method activateTabAtIndex
	 * @param index {Number} The index of the tab to activate
	 * @return {mui.TabView} The TabView instance
	 */
	activateTabAtIndex: function(index)
	{
		var active = mui.get('.mui-showing', this.element);
		var activeContent;
		
		this.activeIndex = index;
		
		mui.removeClass(active, CLASS_SHOWING);
		mui.addClass(this.tabs[this.activeIndex], CLASS_SHOWING);

		if(this.tabContents) activeContent = this.tabContents[this.tabs.indexOf(active)];

		if(activeContent)
		{
			mui.removeClass(activeContent, CLASS_SHOWING);
			mui.addClass(this.tabContents[this.activeIndex], CLASS_SHOWING);
		}
		
		return this;
	}
};

mui.TabView = TabView;
	
})();
/**
 * SearchBox module
 * @module search-box
 */

(function() {

/**
 * The SearchBox class provides a standard search box container
 * with the ability to trigger callbacks during interesting moments,
 * such as onSubmit, onKeypress, etc
 * @class SearchBox
 * @constructor
 * @param config {Object} SearchBox configuration options
 * Example:
 * new mui.SearchBox({
 *  placeholder: 'Search',
 *  autocorrect: 'off',
 *  autocapitalize: 'off',
 *  callback: {
 *    submit: mySubmitHandler,
 *    keyup: myKeyupHandler,
 *  }
 * });
 */
function SearchBox(config)
{
	// Declare local variables
	var form; 
	
	// Initialize properties
	config = config || {};
	this.placeholder = config.placeholder || '';
	this.callback = config.callback || {};
	
	// Create elements
	if (config.element){
	    this.element = config.element;
	    
	    form = mui.get("form", this.element);
        this.input = mui.get("input[type='search']", form);
        this.closeButton = mui.get("div.mui-close", this.element);

	} else {
	    form = document.createElement('form');
    	this.element = mui.createElement('div', { className: 'mui-searchbox' });
    	this.input = mui.createElement('input', { type: 'search' });
    	this.closeButton = mui.createElement('div', { className: 'mui-close' });
    	this.element.appendChild(form);
    	this.element.appendChild(this.closeButton);
    	form.appendChild(this.input);
    	
    	// Configure input
    	if(this.placeholder) this.input.setAttribute('placeholder', this.placeholder);
    	if(config.autocorrect) this.input.setAttribute('autocorrect', config.autocorrect);	
    	if(config.autocapitalize) this.input.setAttribute('autocapitalize', config.autocapitalize);	
	}
	
	// Register listeners
	mui.on(this.closeButton, 'touchstart', mui.bind(this.clear, this));
	mui.on(form, 'submit', this);
	mui.on(this.input, 'blur', this);
	mui.on(this.input, 'focus', this);
	mui.on(this.input, 'keyup', this);
	if(this.callback.keydown) mui.on(this.input, 'keydown', this);
	if(this.callback.keypress) mui.on(this.input, 'keypress', this);
}

SearchBox.prototype = {
	
	/**
	 * SearchBox container element
	 * @property element
	 * @type HTMLElement
	 */
	element: null,
	
	/**
	 * SearchBox input element
	 * @property input
	 * @type HTMLElement
	 */
	input: null,
	
	/**
	 * Close Button container used to clear search field when pressed
	 * @property closeButton
	 * @type HTMLElement
	 */
	closeButton: null,
	
	/**
	 * Default value for input field
	 * @property placeholder
	 * @type String
	 */
	placeholder: null,
	
	/**
	 * Associate listing of callback handlers regsitered
	 * in the constructor
	 * @property callback
	 * @type Object
	 */
	callback: null,
	
	/**
	 * Render the SearchBox into a container
	 * @method render
	 * @param container {String|HTMLElement} Selector or HTMLElement for the container
	 * @return {SearchBox} The searchBox instance
	 */
	render: function(container)
	{
		container = mui.get(container);
		if(container) container.appendChild(this.element);
		return this;
	},
	
	/**
	 * Clear the value of the search field, and hide the close button
	 * @method clear
	 * @return {SearchBox} The searchBox instance	
	 */
	clear: function()
	{
		mui.removeClass(this.element, 'mui-typing');
		this.input.value = '';
		if(this.callback.clear) this.callback.clear();
		return this;
	},
	
	/**
	 * Event dispatcher
	 * @method handleEvent
	 * @param e {Event} The event
	 */
	handleEvent: function(e)
	{
		switch(e.type)
		{
			case 'submit':
				e.preventDefault();
				this.input.blur();
				if(this.callback.submit) this.callback.submit(e, this.input.value);
				break;
			case 'focus':
				if(this.input.value.length > 0) mui.addClass(this.element, 'mui-typing');
				else mui.removeClass(this.element, 'mui-typing');
				
				if(this.callback.focus) this.callback.focus(e);
				break;
			case 'blur':
				mui.removeClass(this.element, 'mui-typing');
			
				if(this.callback.blur) this.callback.blur(e);
				break;
			case 'keyup':
				if(this.input.value.length > 0) mui.addClass(this.element, 'mui-typing');
				else mui.removeClass(this.element, 'mui-typing');
				
				if(this.callback.keyup) this.callback.keyup(e);
				break;
			default:
				if(this.callback[e.type]) this.callback[e.type].call(this.callback[e.type], e);
		}
	},

	/**
	 * Retrieve the value of the input field
	 * @method getValue
	 * @return {String} The search-box input value
	 */	
	getValue: function()
	{
		return this.input.value;
	},
	
	/**
	 * Set the value of the input field
	 * @method setValue
	 * @param v {String} The value
	 * @return {mui.SearchBox} The searchBox instance
	 */
	setValue: function(v)
	{
		this.input.value = v;
		return this;
	}
};

mui.SearchBox = SearchBox;
	
})();
/**
 * Pager module
 * @module pager
 */

(function() {

/*
 * Constant for vertical orientation
 * @final ORIENT_VERTICAL
 * @type String
 * @private
 */
const ORIENT_VERTICAL = 'vertical';

/*
 * Constant for horizontal orientation
 * @final ORIENT_VERTICAL
 * @type String
 * @private
 */
const ORIENT_HORIZONTAL = 'horizontal';

/**
 * The Pager class provides a next/previous control which can be 
 * used in the navigation bar.  The orientation may either be
 * vertical (up/down) or horizontal (left/right). The default 
 * orientation is vertical.
 * @class Pager
 * @constructor
 * @param config {Object} The pager configuration options
 * Example:
 * var myPager = new mui.Pager({ orientation: 'vertical' });
 */
function Pager(config)
{
	// Set orientation
	config = config || {};
	this.orientation = config.orientation || ORIENT_VERTICAL;
	
	// Create elements
	this.element = mui.createElement('div', { className: 'mui-pager' });
	this.element.innerHTML = [
		'<ul>', 
			'<li class="mui-prev"><a href="#"></a></li>', 
			'<li class="mui-next"><a href="#"></a></li>', 
		'</ul>'
	].join('');
	
	if(this.orientation === ORIENT_HORIZONTAL) this.element.setAttribute('x-mui-orient', 'horizontal');

	// Register event listeners
	mui.on(this.element, 'touchstart', this);
}

Pager.prototype = {

	/**
	 * URL for prev control
	 * @property prevUrl
	 * @type String
	 */	
	prevUrl: null,
	
	/**
	 * URL for next control
	 * @property nextUrl
	 * @type String
	 */
	nextUrl: null,
	
	/**
	 * Event dispatcher
	 * @method handleEvent
	 * @param e {Event} The event
	 */
	handleEvent: function(e)
	{
		var t = mui.getAncestorByTagName(e.target, 'li');
		switch(e.type)
		{
			case 'touchstart':
			case 'mousedown':
				if(t && t.className === 'mui-next') this.goNext();
				else if(t && t.className === 'mui-prev') this.goPrev();
				break;
		}
	},
	
	/**
	 * Render the pager element into a container
	 * @method render
	 * @param el {HTMLElement|String} The Selector or HTMLElement to render into
	 * @return {Pager} The Pager instance
	 */
	render: function(el)
	{
		el.appendChild(this.element);
		return this;
	},
	
	/**
	 * Activate the next item
	 * @method goNext
	 * @return {Pager} The Pager instance	
	 */
	goNext: function()
	{
		if(this.nextUrl)
		{
			if(typeof mui.ApplicationController !== 'undefined')
			{
				mui.ApplicationController.getInstance().doTransition = false;
				mui.ApplicationController.getInstance().openUrl(this.nextUrl);
			}
			else
			{
				window.location.hash = this.nextUrl;
			}
		}
		return this;
	},
	
	/**
	 * Activate the prev item
	 * @method goPrev
	 * @return {Pager} The Pager instance	
	 */
	goPrev: function()
	{
		if(this.prevUrl)
		{
			if(typeof mui.ApplicationController !== 'undefined')
			{
				mui.ApplicationController.getInstance().doTransition = false;
				mui.ApplicationController.getInstance().openUrl(this.prevUrl);
			}			
			else
			{
				window.location.hash = this.prevUrl;				
			}
		}
		return this;
	},

	/**
	 * Set the URL for the previous control
	 * @method setPrevUrl
	 * @param url {String} The url
	 * @return {Pager} The Pager instance	
	 */
	setPrevUrl: function(url)
	{
		var prevLi = mui.get('li[class="mui-prev"]', this.element);
		this.prevUrl = url;
		if(this.prevUrl) prevLi.setAttribute('x-mui-activated', 'true');
		else prevLi.removeAttribute('x-mui-activated');

		return this;		
	},
	
	/**
	 * Set the URL for the next control
	 * @method setNextUrl
	 * @param url {String} The url
	 * @return {Pager} The Pager instance	
	 */
	setNextUrl: function(url)
	{
		var nextLi = mui.get('li[class="mui-next"]', this.element);
		this.nextUrl = url;
		if(this.nextUrl) nextLi.setAttribute('x-mui-activated', 'true');
		else nextLi.removeAttribute('x-mui-activated');
		
		return this;
	}
	
};

mui.Pager = Pager;

})();
/**
 * Storage module
 * @module storage
 */

(function() {

/**
 * The ResultSet class is a wrapper for Gears which emulates
 * the HTML5 SQLResultSet class.
 * @class ResultSet
 * @constructor
 * @param db {Database} A Gears database instance
 * @param rs {*} The Gears ResultSet from a call to database.execute
 */
var ResultSet = function(db, rs)
{
	this.insertId = db.lastInsertId;
	this.rowsAffected = db.rowsAffected;
	this.rows = new ResultSetRowList(rs);
};

ResultSet.prototype = {

	/**
	 * The id of the last SQL insert operation
	 * @property insertId
	 * @type Number
	 */
	insertId: null,
	
	/**
	 * The number of rows affected by the last SQL transaction
	 * @property rowsAffected
	 * @type Number
	 */
	rowsAffected: null,
	
	/**
	 * The result set rows for the SQL transaction
	 * @property rows
	 * @type ResultSetRowList
	 */
	rows: null

};

/**
 * The ResultSetRowList class is a wrapper for Gears which emulates
 * the HTML5 SQLResultSetRowList class.
 * @class ResultSetRowList
 * @constructor
 * @param rs {*} The Gears ResultSet from a call to database.execute
 */
var ResultSetRowList = function(rs)
{
	this.length = 0;
	this._items = [];
	while(rs.isValidRow())
	{
		var result = {};
		for(var i=0, len=rs.fieldCount(); i<len; i++)
		{
			result[rs.fieldName(i)] = rs.field(i);
		}
		this._items.push(result);
		this.length++;
		rs.next();
	}
};

ResultSetRowList.prototype = {

	/**
	 * Private property to store array of items in the result set list
	 * @property _items
	 * @type Array
	 * @private
	 */
	_items: null,
	
	/**
	 * The length of the current result set of items
	 * @property length
	 * @type Number
	 */
	length: null,

	/**
	 * Retrieve the result item at a given index
	 * @method item
	 * @param index {Number} The index
	 * @return {Object} The result item at the index
	 */
	item: function(index)
	{
		return this._items[index];
	}

};

/**
 * The Transaction class is a wrapper for Gears which emulates
 * the HTML5 Transaction class.
 * @class Transaction
 * @constructor
 * @param database {Database} The Gears database instance
 * @param error {Function} Error handler
 * @param success {Function} Success handler
 */
var Transaction = function(database, error, success)
{
	this._db = database;
	this._error = false;
};

Transaction.prototype = {

	/**
	 * Reference to the Gears database
	 * @property _db
	 * @type Database
	 * @private
	 */
	_db: null,
	
	/**
	 * Execute a SQL statement
	 * @method executeSql
	 * @param sql {String} The SQL statement
	 * @param params {Array} Array of param values for SQL 
	 * @param success {Function} Success callback function
	 * @param error {Function} Error callback function
	 */
	executeSql: function(sql, params, success, error)
	{	
		if (this._error) return;
		
		try {
			var rs = new ResultSet(this._db, this._db.execute(sql, params));
			if(rs && success){
				success(this, rs);
			} else if(!rs){
				this._error = true;
				if (error)
					error();
			}
		} catch(e) {
			if(error) error();
			this._error = true;
		}
	}
};

/**
 * The Storage class provides a facility for storing data. A full HTMl5 or
 * Gears database will be created using the open method. This class implements
 * the HTML5 Storage interface, in addition to exposing the database functionality
 * through executeSql
 * @class Storage
 * @static
 */

/*
 * Branch Storage for Gears
 */
function StorageGears(db)
{
	this._db = db;
}

/**
 * Open a database
 * @method open
 * @static
 * @param id {String} The id of the database to open
 * @param version {String} The version of the database to open
 * @param title {String} The title of the database to open  
 * @return {mui.Storage} The storage object
 */
StorageGears.open = function(id, version, title)
{
	var db;
	try {
		db = google.gears.factory.create('beta.database');
		db.open(id);	
	} catch(e) {
		return false;
	}
	
	return new StorageGears(db);
};

StorageGears.prototype = {
	
	/**
	 * Execute a database transaction. The first argument is the transaction
	 * callback which will execute SQL statements against the database. The
	 * second argument is the error callback, and the third argument is the
	 * success callback.
	 * @param transCb {Function} The transaction callback 
	 * @param errorCb {Function} The error callback
	 * @param successCb {Function} The success callback
	 */
	transaction: function(transCb, errorCb, successCb)
	{
		this._db.execute("BEGIN TRANSACTION");
		
		var transaction = new Transaction(this._db);
		transCb(transaction);

		if(transaction._error ){
			 this._db.execute("ROLLBACK");
			 if (errorCb)
				  errorCb(transaction); 
					  
		} else {			
			 this._db.execute("COMMIT");
			 if (successCb)
				  successCb(transaction);
		}
	}
};

/*
 * Branch Storage for HTML5
 */
function StorageHtml5(db)
{
	this._db = db;
}

/**
 * Open a database
 * @method open
 * @static
 * @param id {String} The id of the database to open
 * @param version {String} The version of the database to open
 * @param title {String} The title of the database to open  
 * @return {mui.Storage} The storage object
 */
StorageHtml5.open = function(id, version, title)
{
	var db;
	try {
		// Open or create database if not exists
		db = openDatabase(id, '', title, 200000);
	} catch(e) {
		return false;
	}
	return new StorageHtml5(db);
};

StorageHtml5.prototype = {
	/**
	 * Execute a database transaction. The first argument is the transaction
	 * callback which will execute SQL statements against the database. The
	 * second argument is the error callback, and the third argument is the
	 * success callback.
	 * @param transCb {Function} The transaction callback 
	 * @param errorCb {Function} The error callback
	 * @param successCb {Function} The success callback
	 */
	transaction: function(transCb, errorCb, successCb)
	{
		this._db.transaction.apply(this._db, arguments);
	}
};

// Ensure mui namesapce
mui = mui || {};

// Define Storage
mui.Storage = (function() {
	if(typeof openDatabase === 'undefined') return StorageGears;
	return StorageHtml5;
})();
	
})();
/**
 * Transition module
 * @module transition
 */

(function() {

/**
 * Transition constructor.<br/>
 * The new view is positioned relative to the current position of the old (currently visible) view.
 * @class Transition
 * @constructor 
 * @param inView {HTMLElement} The element to transition in
 * @param outView {HTMLElement} The element to transition out
 * @param options {Object} Transition options
 * 	type, duration, reverse, onComplete, onCancel
 */
function Transition(inView, outView, options)
{	
	if(typeof inView !== 'object')
	{
		throw new Error('Transition: inView parameter must be an HTMLElement');
	}
	if(typeof outView !== 'object')
	{
		throw new Error('Transition: outView parameter must be an HTMLElement');
	}
	
	this.inView = inView;
	this.outView = outView;
	this.options = options || {};

    this.backupTimer = null;
    
	this._setup();
};

/*************************************************************
 * Transition Constants
 ************************************************************/

/**
 * Transition type: push
 * @property TYPE_PUSH
 * @type String
 * @static
 */
Transition.TYPE_PUSH = 'push';

/**
 * Transition type: slide
 * @property TYPE_SLIDE
 * @type String
 * @static
 */
Transition.TYPE_SLIDE = 'slide';

/**
 * Transition type: fade
 * @property TYPE_FADE
 * @type String
 * @static
 */
Transition.TYPE_FADE = 'fade';

/**
 * Transition type: flip
 * @property TYPE_FLIP
 * @type String
 * @static
 */
Transition.TYPE_FLIP = 'flip';

/**
 * Direction: right-to-left
 * @property DIR_RIGHT_TO_LEFT
 * @type String
 * @static
 */
Transition.DIR_RIGHT_TO_LEFT = 'right-to-left';

/**
 * Direction: left-to-right
 * @property DIR_LEFT_TO_RIGHT
 * @type String
 * @static
 */
Transition.DIR_LEFT_TO_RIGHT = 'left-to-right';

/**
 * Direction: top-to-bottom
 * @property DIR_TOP_TO_BOTTOM
 * @type String
 * @static
 */
Transition.DIR_TOP_TO_BOTTOM = 'top-to-bottom';

/**
 * Direction: bottom-to-top
 * @property DIR_BOTTOM_TO_TOP
 * @type String
 * @static
 */
Transition.DIR_BOTTOM_TO_TOP = 'bottom-to-top';

/**
 * Default settings for transition durations
 * @property DURATIONS
 * @type Object
 * @static
 */
Transition.DURATIONS = {
	push: 350,
	fade: 800,
	slide: 400,
	flip: 650
};

/**
 * Set the transition properties of the elements
 * @method _setTransitionProperties
 * @param properties {Array} Array of CSS property names
 * @private
 */
Transition.prototype._setTransitionProperties = function(properties)
{
	var inS = this.inView.style, outS = this.outView.style;
	
	inS.webkitTransitionProperty 		= outS.webkitTransitionProperty = properties.join(' ');
	inS.webkitTransitionTimingFunction 	= outS.webkitTransitionTimingFunction = this.options.timing;
	inS.webkitTransitionDuration 		= outS.webkitTransitionDuration = this.options.duration+'ms';
};

/**
 * Remove the transition properties from the elements
 * @method _removeTransitionProperties
 * @private
 */
Transition.prototype._removeTransitionProperties = function()
{
	var inS = this.inView.style, outS = this.outView.style;
        
    this.inView.removeEventListener('webkitTransitionEnd', this._transitionEnd, false);
    this.outView.removeEventListener('webkitTransitionEnd', this._transitionEnd, false);
	
	inS.display = '';
	outS.display = '';
	
	inS.webkitTransitionProperty 		= outS.webkitTransitionProperty = '';
	inS.webkitTransitionTimingFunction 	= outS.webkitTransitionTimingFunction = '';
	inS.webkitTransitionDuration 		= outS.webkitTransitionDuration = '';
	
	outS.webkitBackfaceVisibility = '';
    outS.webkitTransform = '';
};

/**
 * WebkitTransitionEnd callback
 * @method _transitionEnd
 * @private
 */
Transition.prototype._transitionEnd = function()
{
    if (this.backupTimer){ clearTimeout(this.backupTimer); this.backupTimer = null; }
    else { return; }
    
	if(this.options.onComplete) this.options.onComplete();
	this._removeTransitionProperties();
};

/**
 * Set the translation values for a given element
 * @method _translate
 * @param el {HTMLElement} The element to translate
 * @param x {String} The string value for x translation (i.e, '320px' or '100%')
 * @param y {String} The string value for y translation (i.e, '320px' or '100%')
 * @param z {String} The string value for z translation (i.e, '320px' or '100%')
 * @param duration {Number} (Optional) If duration is specified, a transition will occur
 * @param cb {Function} (Optional) Optional callback once transition ends, if duration is passed
 * @return {HTMLElement} The translated element
 * @private
 */
Transition.prototype._translate = function(el, x, y, z, duration, cb)
{
	var translate = mui.UA.Apple ? 'translate3d('+(x||0)+', '+(y||0)+', '+(z||0)+')' : 'translate('+(x||0)+', '+(y||0)+')';
	if(duration)
	{
		el.style.webkitTransitionTimingFunction = 'ease-in-out';
		el.style.webkitTransitionProperty = '-webkit-transform';
		el.style.webkitTransitionDuration = duration+'ms';
		
		mui.one(el, 'webkitTransitionEnd', function() {
			el.style.webkitTransitionTimingFunction = '';
			el.style.webkitTransitionTimingProperty = '';
			el.style.webkitTransitionDuration = '';
			if(typeof cb === 'function') cb();
		});
	}
	el.style.webkitTransform = translate;	
	return el;
};

/**
 * Setup the elements for the transition
 * @method setup
 * @private
 */
Transition.prototype._setup = function()
{
    var parentNode = this.inView.parentNode;
    
	// Set position on parent container
	if(parentNode) this.inView.parentNode.style.position = 'relative';
	
	// Set defaults
	this.options.type = this.options.type || Transition.TYPE_PUSH;
	this.options.duration = (typeof this.options.duration != 'undefined') ? this.options.duration : Transition.DURATIONS[this.options.type];

	if(this.options.type === Transition.TYPE_SLIDE)
	{
		this.options.direction = this.options.direction || Transition.DIR_LEFT_TO_RIGHT;
	}
	
	// Position incoming view
	this.inView.style.position = 'absolute';
	this.inView.style.width = '100%';
	this.inView.style.left = '0';
	this.inView.style.top = '0';
    this.inView.style.display = 'block';
    
	// Setup the correct animation
	switch(this.options.type)
	{
		// Flip
		case Transition.TYPE_FLIP:
			this.options.timing = 'linear';
						
			this.inView.parentNode.style.webkitPerspective = '500px';
			this.inView.parentNode.style.webkitTransformStyle = 'preserve-3d';
			
			this.inView.style.display = 'none';
			this.inView.style.webkitBackfaceVisibility = this.outView.style.webkitBackfaceVisibility = 'hidden';
			this.inView.style.webkitTransform = this.options.reverse ? 'rotateY(180deg)' : 'rotateY(-180deg)';
			this.inView.style.display = 'block';
			
			this.outView.style.webkitTransform = 'rotateY(0)';
			this.outView.style.display = 'block';
			
			setTimeout(mui.bind(function() {
			     // using this timer to prevent the inView to start transforming before execute is called.
			     // looks like a bug in the browser, removing the transition properties does not work.
			     this._setTransitionProperties(['-webkit-transform']);
			}, this), 0);
			
			break;
			
		// Slide
		case Transition.TYPE_SLIDE:
            scrollTo(0, 0);
			
			this.options.timing = 'ease-in-out';
			
			switch(this.options.direction)
			{
				case Transition.DIR_BOTTOM_TO_TOP:
					this._translate(this.options.reverse ? this.outView : this.inView, 0, (this.options.reverse ? 0 : window.innerHeight)+'px', 0);
					break;				
				case Transition.DIR_TOP_TO_BOTTOM:
					this._translate(this.options.reverse ? this.outView : this.inView, 0, (this.options.reverse ? 0 : -window.innerHeight)+'px', 0);
					break;				
				case Transition.DIR_RIGHT_TO_LEFT:
					this._translate(this.options.reverse ? this.outView : this.inView, (this.options.reverse ? 0 : window.innerWidth)+'px', 0, 0);
					break;
				case Transition.DIR_LEFT_TO_RIGHT:
				default:
					this._translate(this.options.reverse ? this.outView : this.inView, (this.options.reverse ? 0 : -window.innerWidth)+'px', 0, 0);
			}
			
			break;
			
		// Fade
		case Transition.TYPE_FADE:
		    this.options.timing = 'linear';
			this.inView.style.opacity = '0';
			this.outView.style.opacity = '1';
			this._setTransitionProperties(['opacity']);
			break;
			
		// Push (default)
		case Transition.TYPE_PUSH:
		default:
		    this.options.timing = 'ease-in-out';
			this._translate(this.inView, (this.options.reverse ? -window.innerWidth : window.innerWidth)+'px', 0, 0);
	}
	
};

/**
 * Execute the transition
 * @method execute
 */
Transition.prototype.execute = function()
{	
	switch(this.options.type)
	{
		// Slide
		case Transition.TYPE_SLIDE:
			setTimeout(mui.bind(function() {
				var xy = [0,0];
				switch(this.options.direction)
				{
					case Transition.DIR_BOTTOM_TO_TOP:
						xy = this.options.reverse ? [0, window.innerHeight] : [0, 0];
						break;
					case Transition.DIR_TOP_TO_BOTTOM:
						xy = this.options.reverse ? [0, -window.innerHeight] : [0, 0];
						break;						
					case Transition.DIR_RIGHT_TO_LEFT:
						xy = this.options.reverse ? [window.innerWidth, 0] : [0, 0];
						break;			
					case Transition.DIR_LEFT_TO_RIGHT:
					default:
						xy = this.options.reverse ? [-window.innerWidth, 0] : [0, 0];
						break;	
				}
				this._translate(this.options.reverse ? this.outView : this.inView, xy[0]+'px', xy[1]+'px', 0, this.options.duration, mui.bind(this._transitionEnd, this));
			}, this), 0);
			break;
		
		// Flip
		case Transition.TYPE_FLIP:
			setTimeout(mui.bind(function() {
                mui.one(this.inView, 'webkitTransitionEnd', mui.bind(this._transitionEnd, this));
				this.outView.style.webkitTransform = this.options.reverse ?  'rotateY(-180deg)' : 'rotateY(180deg)';
				this.inView.style.webkitTransform = 'rotateY(0deg)';
			}, this), 0);
			break;
		
		// Fade
		case Transition.TYPE_FADE:
			setTimeout(mui.bind(function() {
                mui.one(this.inView, 'webkitTransitionEnd', mui.bind(this._transitionEnd, this));
				this.outView.style.opacity = '0';
				this.inView.style.opacity = '1';
			}, this), 0);
			break;
		
		// Push (default)
		case Transition.TYPE_PUSH:
		default:
			// setTimeout(mui.bind(function() {
				this._translate(this.outView, (this.options.reverse ? window.innerWidth : -window.innerWidth)+'px', 0, 0, this.options.duration);
				this._translate(this.inView, 0, 0, 0, this.options.duration, mui.bind(this._transitionEnd, this));
				
			// }, this), 0);
	}
	this.backupTimer = setTimeout( mui.bind(this._transitionEnd, this), (this.options.duration + 50) );
};


mui.Transition = Transition;
	
})();
/**
 * ScrollView module
 * @module scroll-view
 */

(function() {

// Acceleration, Velocity and Configuration constants
const FLICK_STRENGTH = 500;
const PAGING_FLICK_STRENGTH = 150;
const DECELERATION_CONST = .98;
const PAGING_DECELERATION_CONST = 1;
const BOUNCE_DECELERATION_CONST = .7;
const BOUNCE_RANGE = 150;
const PAGING_BOUNCE_RANGE = 0;
const MINIMUM_DRAG = 10;
const FRAME_RATE = 60 * .001;
const IDLE_DELAY = 100;

// CSS for scroll bars
const SCROLL_Y_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==';
const SCROLL_X_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAYAAAACEPQxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgSGMCEgzYCIAAAwALEABx0pRbLAAAAABJRU5ErkJggg==';

// Private variable to store scroll timer
var _timer = null;
var _velocity = 0;
var _startVelocity = 0;
var _idleTimer = null;

/**
 * ScrollView class
 * Provides ability to create a scrollable container.
 * @class ScrollView
 * @constructor
 * @param options {Object} ScrollView configuration options. Valid options are:
 *  element {HTMLElement|String} (required): the CSS Selector or element to scroll
 *  axis {String}: Either x, y or xy
 *  size {Number|String}: Either a px value such as 300 or "100%" for fluid size
 *  pagingEnabled {Boolean}: Whether or not to page the scroll-view
 *  paginator {Object} The paginator options. These include: 
 * 	pageSelector {String} (required): CSS selector to describe what elements will be paged
 * 	element {HTMLElement|String}: If exists, the paging control will be rendered inside this element
 */
function ScrollView(options)
{	
	options = options || {};
	
	if(!options.element) throw new Error('Must pass valid \'element\' to ScrollView constructor');
	
	this.element = mui.get(options.element);
	this.size = options.size || '100%';
	this.sizes = options.sizes || null;
	this.axis = options.axis || 'y';
	this.pagingEnabled = options.pagingEnabled || false;

	if(this.pagingEnabled) this.axis = 'x';
	
	if(this.pagingEnabled && options.paginator) this.paginator = options.paginator

	if(this.axis === 'x') this.scrollsHorizontal = true;
	else this.scrollsVertical = true;

	this.showsHorizontalScrollIndicator = options.showsHorizontalScrollIndicator === false ? false : true;
	this.showsVerticalScrollIndicator = options.showsVerticalScrollIndicator === false ? false : true;
	
	this.alwaysBounceVertical = options.alwaysBounceVertical === true ? true : false;
	this.alwaysBounceHorizontal = options.alwaysBounceHorizontal === true ? true : false;	
	
	this.callback = options.callback || {};

	this.initialize();
}

/**
 * Private helper for getting the x,y,z translation values
 * of an element
 */
function _getTranslation(el)
{
	var trans = [0, 0, 0];
	var t = el.style.webkitTransform;
	var tSpl = t.replace(/translate(3d)?\(/, '').split(',');
	if(tSpl.length > 1)
	{
		trans[0] = parseInt(tSpl[0]);
		trans[1] = parseInt(tSpl[1]);
		trans[2] = parseInt(tSpl[2]);
	}
	return trans;
}

ScrollView.prototype = {

	/**
	 * Event Dispatcher
	 * @method handleEvent
	 * @param e {Event} The events
	 */
	handleEvent: function(e) 
	{
		switch(e.type)
		{
			case 'webkitTransitionEnd':
				this.onTransitionEnd(e);
				break;
			case 'touchstart':
			case 'mousedown':				
				this.onTouchStart(e);
				break;
			case 'touchmove':
			case 'mousemove':
				this.onTouchMove(e);
				break;
			case 'touchend':
			case 'mouseup':						
				this.onTouchEnd(e);
				break;
			case 'click':
				this.onClick(e);
				break;
		}
	},
	
	/**
	 * Set the size, in px, of the scroll-view
	 * @method setSize
	 * @param size {Number} The size, in px
	 */
	setSize: function(size)
	{
		this.size = size;
		if(this.axis === 'x') this.element.style.width = this.size+'px';
		else if(this.axis === 'y') this.element.style.height = this.size+'px';
	},

	/**
	 * orientationchange event handler
	 * @method onOrientationChange
	 */
	onOrientationChange: function()
	{	
		// Only if autoresizing (size = 100%), or there are sizes for portrait + landscape
		if(!this.autoresize && !this.sizes) return false;

		if(this.axis === 'x') this.element.style.width = '';
		else if(this.axis === 'y') this.element.style.height = '';

		// timeout here in order to give the webview some time to catch up to the orientation
		setTimeout(mui.bind(function() {
	
			if(!this.sizes) 
			{
				// If this method is invoked, the height is set to 100%
				if(this.element.parentNode)
				{
					if(this.axis === 'y') {
						this.size = this.element.parentNode.offsetHeight;
						
						// If size is 0, the parentNode must be hidden, so clone it to calculate the right size
						if(this.size == 0) {
							var clone = this.element.parentNode.cloneNode(true);
							var bodyClass = document.body.className;
							clone.style.display = 'block';
							document.body.className = '';
							document.body.appendChild(clone);
							this.size = clone.offsetHeight;
							document.body.removeChild(clone);							
							if(bodyClass) document.body.className = bodyClass;
						}

					} else {
						this.size = this.element.parentNode.offsetWidth;
						if(this.size == 0) {
							var clone = this.element.parentNode.cloneNode(true);
							var bodyClass = document.body.className;							
							clone.style.display = 'block';
							document.body.className = '';							
							document.body.appendChild(clone);
							this.size = clone.offsetWidth;
							document.body.removeChild(clone);
							if(bodyClass) document.body.className = bodyClass;
						}
					}
				}
				else
				{
					this.size = (this.axis === 'x') ? window.innerWidth : window.innerHeight;
				}
			}
			else 
			{
				this.size = (window.innerWidth >= 1024) ? this.sizes.landscape : this.sizes.portrait;
			}
		
			if(this.axis === 'x') 
			{
				var mr = mui.getStyle(this.element, 'margin-right');
				if(mr)
				{
					mr = parseInt(mr);
					this.size -= mr*2;
				}
				this.element.style.width = this.size+'px';
			}
			else this.element.style.height = this.size+'px';

		}, this), 0);		
	},
	
	/**
	 * transitionEnd event handler
	 * @method onTransitionEnd
	 * @param e {Event} The event
	 */
	onTransitionEnd: function(e)
	{
		if(this.pagingEnabled) this.updatePage();
		_idleTimer = setTimeout(mui.bind(this.hideScrollBars, this, true), IDLE_DELAY);
	},

	/**
	 * click event handler
	 * @method onClick
	 * @param e {Event} The event
	 */
	onClick: function(e)
	{
		if(!e._faux)
		{
			e.preventDefault();
			e.stopPropagation();
		}
	},
	
	/**
	 * touchStart event handler
	 * @method onTouchStart
	 * @param e {Event} The event
	 */
	onTouchStart: function(e)
	{	
		if(  !e.touches || (e.touches && e.touches.length == 1) )
		{
		    // Detect if the touch event occurs inside another scroll-view
            var scrollViewTarget = mui.getAncestorByClassName(e.target, 'mui-scrollview-host');
            if(this.touchInfo.stopScroll || scrollViewTarget !== this.scrollHost) return false;
            
            var touch = e.touches ? e.touches[0] : e;
			//var anchorParent = mui.getAncestorByTagName(e.target, 'a');
            
            this.touchInfo.startTime = (new Date()).getTime();
            this.touchInfo.pageX = touch.clientX;
            this.touchInfo.pageY = touch.clientY;
            this.touchInfo.startClientPosX = touch.clientX;
            this.touchInfo.startClientPosY = touch.clientY;
		    this.touchInfo.isTouching = false;
            this.touchInfo.isDragging = false;
            this.touchInfo.target = e.target;

			/*if(anchorParent && anchorParent.getAttribute('href')) {
				e.preventDefault();
			}*/
			if ( ( !( e.target instanceof HTMLInputElement ) && !( e.target instanceof HTMLTextAreaElement ) ) || e.target.getAttribute("type") == "checkbox" ){
                e.preventDefault();
            }

            mui.on(this.element, 'touchmove', this);
            mui.on(this.element, 'touchend', this);     
		}
	},
	
	/**
	 * touchmove event handler
	 * @method onTouchMove
	 * @param e {Event} The event
	 */
	onTouchMove: function(e)
	{
	    if (this.touchInfo.stopScroll) return;
	    
	    var moveTime = (new Date()).getTime();
        if (moveTime < this.touchInfo.startTime) return;
            
        if( !this.touchInfo.isTouching && !(e.target instanceof HTMLInputElement) && (!e.touches || (e.touches && e.touches.length == 1)) )
        {   
            this.killTimer(true);
                    
            var header = mui.get('header');
            var footer = mui.get('footer');
            var scrollHeight = this.scrollHost.scrollHeight;
            var scrollWidth = this.scrollHost.scrollWidth;
            
            // Temporarily disable this... you should not be able to scroll if the height of the content is < than the size 
            //if(!this.alwaysBounceVertical && this.scrollsVertical && scrollHeight < this.size) return;

            var transformSpl = mui.getStyle(this.scrollHost, '-webkit-transform').replace(')','').split(',');
            var currentTranslateX = 0;
            var currentTranslateY = 0;
            if(transformSpl.length === 1) // No transform applied
            {
                currentTranslateX = currentTranslateY = 0;
            }
            else if(transformSpl.length === 6) // iPhone 3
            {
                currentTranslateX = Number(transformSpl[4]);
                currentTranslateY = Number(transformSpl[5]);
            }
            else // iPhone 2
            {
                currentTranslateX = Number(transformSpl[12]);
                currentTranslateY = Number(transformSpl[13]);
            }
            
            this.touchInfo.startPosX  = this.touchInfo.startClientPosX - currentTranslateX;
            this.touchInfo.startPosY  = this.touchInfo.startClientPosY - currentTranslateY;
            this.touchInfo.isTouching = true;
            this.touchInfo.isDragging = false; 
            
            if(this.scrollsVertical)
            {
                var h = -scrollHeight;

                this.touchInfo.maxPosY = h + this.size;
                
                if(header) this.touchInfo.maxPosY = h + (window.innerHeight - header.offsetHeight);
                if(header && footer) this.touchInfo.maxPosY = h + (window.innerHeight - header.offsetHeight - footer.offsetHeight);             
                if(Math.abs(h) <= this.touchInfo.maxPosY || this.touchInfo.maxPosY > 0) this.touchInfo.maxPosY = 0;

                if(scrollWidth > this.element.parentNode.scrollWidth)
                {
                    this.scrollsHorizontal = true;
                    if(!this.scrollBarHorizontal) this.initScrollBars();
                }               
            }

            if(this.scrollsHorizontal)
            {
                if(this.scrollsVertical)
                {
                    this.touchInfo.maxPosX = (scrollWidth - this.element.parentNode.scrollWidth)*-1;
                }
                else
                {
                    this.touchInfo.maxPosX = (scrollWidth-this.size)*-1;
                    if(scrollWidth < this.size) this.touchInfo.maxPosX = 0;
                }
            }
        }
        	    
		if(this.touchInfo.isTouching)
		{	
			if(!e.touches || (e.touches && e.touches.length === 1))
			{
				e.preventDefault();
				
				var touch = e.touches ? e.touches[0] : e;
				var deltaX = touch.clientX - this.touchInfo.startPosX;
				var deltaY = touch.clientY - this.touchInfo.startPosY;

				if(!this.scrollsHorizontal) deltaX = 0;
				if(!this.scrollsVertical) deltaY = 0;

				if(this.scrollsVertical && this.scrollsHorizontal)
				{
					if(Math.abs(touch.clientX-this.touchInfo.startClientPosX) <= 10) this.touchInfo.lockToAxis = 'y';
					else if(Math.abs(touch.clientY-this.touchInfo.startClientPosY) <= 10) this.touchInfo.lockToAxis = 'x';
					
					// Check for locked axis
					if(this.touchInfo.lockToAxis === 'y') deltaX = this.touchInfo.translations[1].x;
					else if(this.touchInfo.lockToAxis = 'x') deltaY = this.touchInfo.translations[1].y;
					
					if(deltaX > 0) deltaX = 0;
					else if(deltaX < this.touchInfo.maxPosX) deltaX = this.touchInfo.maxPosX;
				}

				this.touchInfo.isDragging = true;
				this.touchInfo.endClientPosX = touch.clientX
				this.touchInfo.endClientPosY = touch.clientY;
				this.touchInfo.lastMoved = (new Date()).getTime();
				
				this.scrollTo(deltaX, deltaY, 0);
			}
		}
	},
	
	/**
	 * touchend event handler
	 * @method onTouchEnd
	 * @param e {Event} The event
	 */
	onTouchEnd: function(e)
	{		
		// Remove touch tracking events
		mui.removeEventListener(this.element, 'touchmove', this);
		mui.removeEventListener(this.element, 'touchend', this);
		
		// If no drag, then simulate a click on the original target
		if(!this.touchInfo.isDragging)
		{
			var ev = document.createEvent('MouseEvent');
			ev._faux = true;
			ev.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
			this.touchInfo.target.dispatchEvent(ev);
			
			_idleTimer = setTimeout(mui.bind(this.hideScrollBars, this, true), IDLE_DELAY);
			
			this.touchInfo.lockToAxis = null;
			
			return;
		}

		// Check for staleness
		if(!this.pagingEnabled && (+(new Date) - this.touchInfo.lastMoved > 75 || 
		  (this.scrollsVertical && !this.scrollsHorizontal && Math.abs(this.touchInfo.translations[1].y - this.touchInfo.translations[0].y) <= MINIMUM_DRAG) ||
		  (this.scrollsHorizontal && !this.scrollsVertical && Math.abs(this.touchInfo.translations[1].x - this.touchInfo.translations[0].x) <= MINIMUM_DRAG) ))
		{
			
			if(this.scrollsVertical && this.touchInfo.translations[1].y > 0) {
				this.scrollTo(this.touchInfo.translations[1].x, 0, 300);
			}
			else if(this.scrollsVertical && this.touchInfo.translations[1].y < this.touchInfo.maxPosY) {
				this.scrollTo(this.touchInfo.translations[1].x, this.touchInfo.maxPosY, 300);
			}
			
			else if(this.scrollsHorizontal && this.touchInfo.translations[1].x > 0) {
				this.scrollTo(0, this.touchInfo.translations[1].y, 300);
			}
			else if(this.scrollsHorizontal && this.touchInfo.translations[1].x < this.touchInfo.maxPosX) {
				this.scrollTo(this.touchInfo.maxPosX, this.touchInfo.translations[1].y, 300);
			}
			
			_idleTimer = setTimeout(mui.bind(this.hideScrollBars, this, true), IDLE_DELAY);
			
			this.touchInfo.lockToAxis = null;

			return;
		}
		
		// If scrolling vertically and horizontally, don't animate the x-axis flick
		if(this.scrollsVertical && this.touchInfo.lockToAxis === 'x')
		{
			this.touchInfo.lockToAxis = null;
			return;
		}
		
		// Flicked...
		var lastTouch = this.touchInfo.translations[1];
		var startPoint = this.scrollsVertical ? this.touchInfo.startClientPosY : this.touchInfo.startClientPosX;
		var endPoint = this.scrollsVertical ? e.clientY : e.clientX;
		var distance = startPoint - endPoint;
		var time = +(new Date) - this.touchInfo.startTime;

		_velocity = distance / time; // px per ms.
		_startVelocity = _velocity;
		
		this.decelerationConst = DECELERATION_CONST;
		
		// Paging
		if(this.pagingEnabled)
		{
			this.decelerationConst = PAGING_DECELERATION_CONST;

			// Check if user flicked enough to move to the next/prev page
			if(_velocity > 0)
			{
				this.paginator.currentPage++;
				if(this.paginator.currentPage >= this.paginator.pages) this.paginator.currentPage = this.paginator.pages;

				this.touchInfo.minPosX = -(this.paginator.currentPage) * (this.size);
				this.touchInfo.maxPosX = -(this.paginator.currentPage-1) * (this.size);
			}
			else
			{
				this.paginator.currentPage--;
				if(this.paginator.currentPage <= 1) this.paginator.currentPage = 1;

				this.touchInfo.maxPosX = -(this.paginator.currentPage-1) * (this.size);
				this.touchInfo.minPosX = -(this.paginator.currentPage) * (this.size);
			}
		}
		
		_timer = setInterval(mui.bind(this.animateScroll, this), FRAME_RATE);
		
		this.touchInfo.lockToAxis = null;
	},
	
	/**
	 * Step through the deceleration animation
	 * @method animateScroll
	 */
	animateScroll: function()
	{
		// Declare locals
		var end = false;
		var distance;
		var newTranslate = {
			x: this.touchInfo.translations[1].x,
			y: this.touchInfo.translations[1].y
		};
		
		// Get last position
		var lastPoint = this.scrollsVertical ? this.touchInfo.translations[1].y : this.touchInfo.translations[1].x;
		var maxPoint = this.scrollsVertical ? this.touchInfo.maxPosY : this.touchInfo.maxPosX;
		var minPoint = this.scrollsVertical ? this.touchInfo.minPosY : this.touchInfo.minPosX;
		
		// Bounce constant
		var maxBounce = (this.pagingEnabled) ? PAGING_BOUNCE_RANGE : BOUNCE_RANGE;
		
		// Flick strength
		var flickStrength = (this.pagingEnabled) ? PAGING_FLICK_STRENGTH : FLICK_STRENGTH;

		// Adjust velocity due to friction
		_velocity *= this.decelerationConst;
		
		// Scroll to new point calculated from velocity
		distance = _velocity * FRAME_RATE * flickStrength;

		if(this.scrollsVertical) newTranslate.y -= Math.floor(distance);
		else if(this.scrollsHorizontal) newTranslate.x -= Math.floor(distance);
		
		// If scroll has exceeded top/left boundary
		if(this.scrollsVertical && newTranslate.y > 0)
		{	
			_velocity *= BOUNCE_DECELERATION_CONST;	
			if(!this._didScrollPastLowerBoundary)
			{
				this._didScrollPastLowerBoundary = true;
			}
			if(newTranslate.y > maxBounce)
			{
				end = true;
				this.killTimer();
				newTranslate.y = maxBounce;
			}
		}
		else if(this.scrollsHorizontal && newTranslate.x > 0)
		{
			_velocity *= BOUNCE_DECELERATION_CONST;	
			if(!this._didScrollPastLowerBoundary)
			{
				this._didScrollPastLowerBoundary = true;
			}
			if(newTranslate.x > maxBounce)
			{
				end = true;
				this.killTimer();
				newTranslate.x = maxBounce;
			}
		}
		// If scroll has exceeded maximum scroll boundary (bottom/right)
		else if(this.scrollsVertical && newTranslate.y < maxPoint)
		{
			_velocity *= BOUNCE_DECELERATION_CONST;	
			if(!this._didScrollPastUpperBoundary)
			{
				this._didScrollPastUpperBoundary = true;
			}
			if(newTranslate.y < (this.touchInfo.maxPosY - maxBounce))
			{
				end = true;
				this.killTimer();
				newTranslate.y = this.touchInfo.maxPosY - maxBounce;
			}
		}
		else if(this.scrollsHorizontal && newTranslate.x < maxPoint)
		{			
			_velocity *= BOUNCE_DECELERATION_CONST;	
			if(!this._didScrollPastUpperBoundary)
			{
				this._didScrollPastUpperBoundary = true;
			}
			if(newTranslate.x < (this.touchInfo.maxPosX - maxBounce))
			{
				end = true;
				this.killTimer();
				newTranslate.x = this.touchInfo.maxPosX - maxBounce;
			}
		}

		// Check for stopping
		if(Math.abs(_velocity.toFixed(4)) < .015)
		{
			end = true;
			_velocity = 0;
			this.killTimer();
		}

		if(!end) this.scrollTo(newTranslate.x, newTranslate.y, 0);
	},
	
	killTimer: function(dontUpdatePage)
	{
		var translate = { x: this.touchInfo.translations[1].x, y: this.touchInfo.translations[1].y };

		clearInterval(_timer);

		if(this._didScrollPastLowerBoundary)
		{
			if(this.scrollsVertical) translate.y = 0;
			if(this.scrollsHorizontal && !this.scrollsVertical) translate.x = 0;
			this.scrollTo(translate.x, translate.y, 400, 'ease-out');
			this._didScrollPastLowerBoundary = false;
		}
		else if(this._didScrollPastUpperBoundary)
		{			
			if(this.scrollsVertical) translate.y = this.touchInfo.maxPosY;
			if(this.scrollsHorizontal && !this.scrollsVertical) translate.x = this.touchInfo.maxPosX;
			this.scrollTo(translate.x, translate.y, 400, 'ease-out');
			this._didScrollPastUpperBoundary = false;
		}
		else
		{			
			if(this.pagingEnabled && !dontUpdatePage) this.updatePage();
			_idleTimer = setTimeout(mui.bind(this.hideScrollBars, this, true), IDLE_DELAY);
		}
	},
	
	/**
	 * Update the visual indicator for the current page
	 * @method updatePage
	 */
	updatePage: function()
	{
		if(this.paginator.element)
		{
			for(var i=0; i<this.paginator.pages; i++)
			{
				var el = this.paginator.element.children[i];
				if(i === this.paginator.currentPage-1)  mui.addClass(el, 'mui-active');
				else mui.removeClass(el, 'mui-active');				
			}	
		}
		if(this.paginator.callback && this.paginator.callback.pageChange) this.paginator.callback.pageChange(this.paginator.currentPage);
	},
	
	/**
	 * Activate the next page with animation, if paging is enabled.
	 * @method nextPage
	 * @param animated {Boolean} (Default true) If false, no animation will take place 
	 */
	nextPage: function(animated) 
	{
		var duration = (animated === false) ? 0 : 400;		

		if(this.paginator.currentPage >= this.paginator.pages) return false;
		
		this.paginator.currentPage++;

		this.touchInfo.minPosX = -(this.paginator.currentPage) * (this.size);
		this.touchInfo.maxPosX = -(this.paginator.currentPage-1) * (this.size);
		
		this.scrollTo(this.touchInfo.maxPosX, this.touchInfo.translations[1].y, duration, 'ease-out');
		this.updatePage();
	},
	
	/**
	 * Activate the previous page with animation, if paging is enabled.
	 * @method prevPage
	 * @param animated {Boolean} (Default true) If false, no animation will take place 
	 */
	prevPage: function(animated) 
	{
		var duration = (animated === false) ? 0 : 400;
		if(this.paginator.currentPage <= 1) return false;

		this.paginator.currentPage--;

		this.touchInfo.maxPosX = -(this.paginator.currentPage-1) * (this.size);
		this.touchInfo.minPosX = -(this.paginator.currentPage) * (this.size);		
		
		this.scrollTo(this.touchInfo.maxPosX, this.touchInfo.translations[1].y, duration, 'ease-out');	
		this.updatePage();	
	},

	/**
	 * Scroll the element to a given x, y, or x-y coordinate at a specified time.
	 * The default transition is a cubic-bezier function.
	 * @method scrollTo
	 * @param x {Number} The x position to scroll to
	 * @param y {Number} The y position to scroll to
	 * @param duration {Number} Number of milliseconds the animation should last
	 * @param hideScrollBars {Boolean} (Default false) Set true to prevent the update of the scroll bars
	 * @timing {String} The timing transition function
	 */
	scrollTo: function(x, y, duration, transition, hideScrollBars)
	{
		var translation = 'translate('+x+'px, '+y+'px)';
		if(mui.UA.Safari) translation = 'translate3d('+x+'px,'+y+'px,0)'; // iPhone prefers 3d translation (not supported on Android)

		clearTimeout(_idleTimer);
		if(!hideScrollBars) this.showScrollBars();

		this.touchInfo.translations.splice(0, 1);
		this.touchInfo.translations.push( { x: x, y: y } );

		transition = transition || 'cubic-bezier(0, 0.1, 0, 1.0)';
		duration = duration || 0;
		if (duration == 0){
		    // remove transition properties if duration is 0 (perf)
		    mui.setStyle(this.scrollHost, '-webkit-transition-timing-function', null);
            mui.setStyle(this.scrollHost, '-webkit-transition-duration', null);
		} else {
		    mui.setStyle(this.scrollHost, '-webkit-transition-timing-function', transition);
		    mui.setStyle(this.scrollHost, '-webkit-transition-duration', duration+'ms');
		}
		
		mui.setStyle(this.scrollHost, '-webkit-transform', translation);
		
		if(!hideScrollBars) this.updateScrollBars(duration);
		
		if(typeof this.callback.scroll === 'function') this.callback.scroll(x, y);
	},

	/**
	 * Lock the ScrollView, preventing it from scrolling 
	 * @method lockScroll
	 */
	lockScroll: function() 
	{
		this.touchInfo.stopScroll = true;
	},
	
	/**
	 * Unlock the ScrollView, preventing it from scrolling 
	 * @method unlockScroll
	 */
	unlockScroll: function() 
	{
		this.touchInfo.stopScroll = false;
	},
	
	isLocked: function()
	{
		return this.touchInfo.stopScroll;
	},

	/**
	 * Return a reference to the root HTML node
	 * @method getElement
	 * @return {HTMLElement} The root node
	 */
	getElement: function() 
	{
		return this.element;
	},
	
	/**
	 * Return a reference to the scroll host element which houses
	 * the content of the scroll-view.
	 * @method getScrollHost
	 * @return {HTMLElement} The scroll host element
	 */
	getScrollHost: function()
	{
		return this.scrollHost;
	},
	
	/**
	 * Return the current x/y scroll offsets
	 * @method getScrollOffsets
	 * @return {Object} Scroll offsets in the form of: { x: 0, y: 0 }
	 */
	getScrollOffsets: function()
	{
		var scrollOffsets = { x: 0, y: 0 };
		var trans = _getTranslation(this.scrollHost);
		scrollOffsets.x = trans[0];
		scrollOffsets.y = trans[1];
		return scrollOffsets;
	},
	
	/**
	 * This method renders the element into a texture by setting 
	 * an initial translation. It then positions it off-screen 
	 * (minus 1px) and scrolls the element via translations until
	 * the entire element's content has been rendered in the texture.
	 * Finally, it is placed back on screen.
	 * @method renderTexture
	 */
	renderTexture: function()
	{
		var c = 0;
		var max = this.scrollHost.scrollHeight;
		var el = this.scrollHost;
		var l = window.innerWidth - 1;
		var transY = _getTranslation(el)[1];
		el.style.width = window.innerWidth+'px';
		el.style.webkitTransitionDuration = '0s';
		el.style.webkitTransform = 'translate3d(-'+l+'px, '+transY+'px, 0)';
		var pid = setInterval(function() {
			c += window.innerHeight;
			el.style.webkitTransform = 'translate3d(-'+l+'px, -'+c+'px, 0)';
			if(c >= max)
			{
				clearInterval(pid);
				el.style.webkitTransitionDuration = '';
				el.style.webkitTransform = 'translate3d(0, '+transY+'px, 0)';
				el.style.width = '';
			}
		}, 0);
	},
	
	/**
	 * Position and resize the scroll bars according to the content size
	 * @method updateScrollBars
	 * @method duration {Number} Number of ms of animation (optional) - used when snapping to bounds
	 */
	updateScrollBars: function(duration)
	{
		var scrollSize = 0;
		var scrollPos = 1;
		var transform;
		var scrollHeight = this.scrollHost.scrollHeight;
		var scrollWidth = this.scrollHost.scrollWidth;
		
		if(!this._showingScrollBars) this.showScrollBars();

		if(this.scrollBarVertical && scrollHeight <= this.size)
		{
			this.hideScrollBars();
			return;
		}
		
		if(this.scrollBarVertical)
		{	
			scrollSize = Math.floor(this.size * (this.size/scrollHeight));
			scrollPos = Math.floor((this.touchInfo.translations[1].y/(scrollHeight - this.size) ) * (this.size-scrollSize)) * -1;
			
			if(scrollSize > this.size) scrollSize = 1;
			
			transform = 'translate3d(0, '+scrollPos+'px, 0)';
			
			if(scrollPos > (this.size - scrollSize))
			{
				scrollSize = scrollSize - (scrollPos - (this.size - scrollSize));
			}
			
			if(scrollPos < 0)
			{
				transform = 'translate3d(0,0,0)';
				scrollSize = scrollSize + scrollPos;
			}
			
			duration = duration || 0;

			if(this.verticalScrollSize != (scrollSize-8))
			{
				this.verticalScrollSize = (scrollSize-8);
				mui.setStyles(this.scrollBarVertical.children[1], {
					'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),								
					'-webkit-transform': 'translate3d(0,0,0) scaleY('+(scrollSize-8)+')',
					'-webkit-transition-duration': (duration > 0 ? duration+'ms' : null)
				});
			}
			mui.setStyles(this.scrollBarVertical, {
				'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),		
				'-webkit-transform':  transform,
				'-webkit-transition-duration': (duration > 0 ? duration+'ms' : null)
			});
			mui.setStyles(this.scrollBarVertical.children[2], {
				'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),				
				'-webkit-transform': 'translate3d(0,'+(scrollSize-10)+'px,0)',
				'-webkit-transition-duration': (duration > 0 ? duration+'ms' : null)
			});
		}
		if(this.scrollBarHorizontal)
		{
			scrollSize = Math.floor(this.size * (this.size/scrollWidth));
			scrollPos = Math.floor((this.touchInfo.translations[1].x/(scrollWidth - this.size) ) * (this.size-scrollSize)) * -1;
			
			if(scrollSize > this.size) scrollSize = 1;
			
			transform = 'translate3d('+scrollPos+'px, 0, 0)';
			
			if(scrollPos > (this.size - scrollSize))
			{
				scrollSize = scrollSize - (scrollPos - (this.size - scrollSize));
			}
			
			if(scrollPos < 0)
			{
				transform = 'translate3d(0,0,0)';
				scrollSize = scrollSize + scrollPos;
			}
			
			duration = duration || 0;

			if(this.horizontalScrollSize != (scrollSize-16))
			{
				this.horizontalScrollSize = (scrollSize-16);
				mui.setStyles(this.scrollBarHorizontal.children[1], {
					'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),								
					'-webkit-transform': 'translate3d(0,0,0) scaleX('+this.horizontalScrollSize+')',
					'-webkit-transition-duration': (duration > 0 ? duration+'ms' : null)
				});
			}
			mui.setStyles(this.scrollBarHorizontal, {
				'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),		
				'-webkit-transform':  transform,
				'-webkit-transition-duration': duration+'ms'
			});
			mui.setStyles(this.scrollBarHorizontal.children[2], {
				'-webkit-transition-property': (duration > 0 ? '-webkit-transform' : null),				
				'-webkit-transform': 'translate3d('+(scrollSize-12)+'px,0,0)',
				'-webkit-transition-duration': (duration > 0 ? duration+'ms' : null)
			});
		}
	},
	
	/**
	 * Hide the scroll bar indicators
	 * @method hideScrollBars
	 * @param animated {Boolean} Whether or not to animate the hiding
	 */
	hideScrollBars: function(animated)
	{
		this._showingScrollBars = false;
		
		if(animated && this.scrollBarVertical) mui.setStyle(this.scrollBarVertical, '-webkit-transition', 'opacity .6s');
		if(animated && this.scrollBarHorizontal) mui.setStyle(this.scrollBarHorizontal, '-webkit-transition', 'opacity .6s');
		
		if(this.scrollBarVertical) mui.removeClass(this.scrollBarVertical, 'mui-showing');
		if(this.scrollBarHorizontal) mui.removeClass(this.scrollBarHorizontal, 'mui-showing');		
	},
	
	/**
	 * Show the scroll bar indicators
	 * @method showScrollBars
	 * @param animated {Boolean} Whether or not to animate the showing 
	 */
	showScrollBars: function(animated)
	{	
		this._showingScrollBars = true;
		
		if(animated && this.scrollBarVertical) mui.setStyle(this.scrollBarVertical, '-webkit-transition', 'opacity .6s');
		if(animated && this.scrollBarHorizontal) mui.setStyle(this.scrollBarHorizontal, '-webkit-transition', 'opacity .6s');
		
		if(this.scrollBarVertical) mui.addClass(this.scrollBarVertical, 'mui-showing');
		if(this.scrollBarHorizontal) mui.addClass(this.scrollBarHorizontal, 'mui-showing');
	},
	
	/**
	 * Momentarily flash the scroll bars to indicate current scroll position
	 * @method flashScrollBars
	 */
	flashScrollBars: function()
	{
		if(this.scrollBarVertical && this.scrollHost.scrollHeight > this.size)
		{
			if(!this._flashedScrollBars)
			{
				this._flashedScrollBars = true;
				this.updateScrollBars();
			}
			this.showScrollBars(true);
			setTimeout(mui.bind(this.hideScrollBars, this), 800);
		}
	},

	/**
	 * Initialize the scroll-bar's, if enabled.
	 * @method initScrollBars
	 */	
	initScrollBars: function()
	{
		if(!this._initializedScrollBars)
		{
			this._initializedScrollBars = true;
		}
		
		// Vertical
		if(this.showsVerticalScrollIndicator && this.scrollsVertical && !this.scrollBarVertical)
		{
			this.scrollBarVertical = mui.createElement('div', { className: 'mui-scrollbar mui-vertical', innerHTML: '<b class="mui-child mui-b"></b><img class="mui-child mui-img" src="'+SCROLL_Y_IMG+'" alt="" /><b class="mui-child mui-b"></b>' });
			this.wrapper.appendChild(this.scrollBarVertical);
		}

		// Horizontal
		if(this.showsHorizontalScrollIndicator && this.scrollsHorizontal && !this.scrollBarHorizontal)
		{
			this.scrollBarHorizontal = mui.createElement('div', { className: 'mui-scrollbar mui-horizontal', innerHTML: '<b class="mui-child mui-b"></b><img class="mui-child mui-img" src="'+SCROLL_X_IMG+'" alt="" /><b class="mui-child mui-b"></b>' });
			this.wrapper.appendChild(this.scrollBarHorizontal);
		}
	},
	
	/**
	 * Initialize the pager control, if enabled.
	 * @method initPager
	 */
	initPager: function()
	{
		// Paginator initialization
		if(this.paginator && this.paginator.pageSelector)
		{
			var elWidth = 8;
			mui.each(mui.getAll(this.paginator.pageSelector, this.element), function(page) {
				page.style.display = 'inline-block';
				page.style.width = this.size+'px';
				elWidth += this.size;
				if(mui.UA.Apple) page.style.webkitTransform = 'translate3d(0,0,0)';
			}, this);
			this.scrollHost.style.width = elWidth+'px';
			this.element.style.whiteSpace = 'nowrap';
			this.touchInfo.maxPos = -(elWidth) + this.size;
		}
		if(this.paginator)
		{
			this.paginator.pages = this.paginator.pages || mui.getAll(this.paginator.pageSelector, this.element).length;
			this.paginator.currentPage = this.paginator.currentPage || 1;
			if(this.paginator.element)
			{
				this.paginator.element = mui.get(this.paginator.element);
				mui.addClass(this.paginator.element, 'mui-paginator');
				this.paginator.element.innerHTML = '';
				for(var i=0; i<this.paginator.pages; i++)
				{
					var el = mui.createElement('span', { className: 'mui-paginator-page'});
					if(i === this.paginator.currentPage-1) mui.addClass(el, 'mui-active');
					this.paginator.element.appendChild(el);				
				}
				mui.on(this.paginator.element, 'click', this);				
			}
		}
		
	},
	
	/**
	 * Initialize the scroll view.
	 * @method initialize
	 */
	initialize: function() 
	{
		
		// Initialize touch info object
		this.touchInfo = {
			target: null,
			pageX: 0,
			pageY: 0,
			isTouching: false,
			isDragging: false,
			startPosX: 0,
			startPosY: 0,			
			translations: [{x: 0, y: 0}, {x: 0, y: 0}],
			lastMoved: 0,
			maxPos: 0,
			stopScroll: false
		};

		// Create wrapper element
		this.wrapper = mui.createElement('div');
		this.wrapper.style.position = 'relative';
		this.wrapper.style.webkitTransform = 'translate3d(0,0,0)';

		// Create scroll host element
		this.scrollHost = mui.createElement('div');
		this.scrollHost.className = 'mui-scrollview-host';
		this.wrapper.appendChild(this.scrollHost);

		var elements = [];
		for(var i=0, len=this.element.childNodes.length; i<len; i++)
		{
			elements.push(this.element.childNodes[i]);
		}
		for(var i=0, len=elements.length; i<len; i++)
		{
			this.scrollHost.appendChild(elements[i]);
		}
		this.element.appendChild(this.wrapper);

		if(this.size)
		{
			if(this.size === '100%')
			{
				this.autoresize = true;
				mui.on(window, 'orientationchange', this);
				if(this.element.parentNode)
				{
					this.size = (this.axis === 'x') ? this.element.parentNode.offsetWidth : this.element.parentNode.offsetHeight;
				}
				else
				{
					this.size = (this.axis === 'x') ? window.innerWidth : window.innerHeight;
				}
				
				if(this.axis !== 'x')
				{
					var h = mui.get('body > header'), f = mui.get('body > footer');
					if(h) this.height -= h.offsetHeight;
					if(f) this.height -= f.offsetHeight;
					if(this.size === 0) this.size = window.innerHeight;
					if(h) this.size = this.size - h.offsetHeight;
					if(f) this.size = this.size - f.offsetHeight;
				}
			}

			if(this.axis === 'x')
			{
				var mr = mui.getStyle(this.element, 'margin-right');
				if(mr)
				{
					mr = parseInt(mr);
					this.height -= mr*2;
				}
				this.element.style.width = this.height+'px';
				this.element.style.overflowX = 'hidden';
			}
			else
			{
				// { portrait: 800, landscape: 600 }
				if(this.sizes) {
					if(window.innerWidth >= 1024) {
						this.element.style.height = this.sizes.landscape+'px';
						this.size = this.sizes.landscape;
					} else {
						this.element.style.height = this.sizes.portrait+'px';
						this.size = this.sizes.portrait;
					}
				} else {
					this.element.style.height = this.size+'px';
				}
				this.element.style.overflowY = 'hidden';				
			}
		}
		
		// Check for scroll overflow
		if(this.wrapper.scrollWidth > this.element.parentNode.scrollWidth) this.scrollsHorizontal = true;
		
		// Initialize pager
		if(this.pagingEnabled) this.initPager();
		
		// Initialize scrollbars
		if(this.showsVerticalScrollIndicator || this.showsHorizontalScrollIndicator) this.initScrollBars();
		
		// Initial scroll value
		if (this.paginator && this.paginator.currentPage > 1){
            this.paginator.currentPage--;
            this.nextPage( false );
        } else {
		    this.scrollTo(0, 0, 0);
        }

		// Initialize element events
		mui.on(this.element, 'touchstart', this);
		mui.on(this.element, 'webkitTransitionEnd', this);
		mui.on(this.element, 'click', this, this, true);
	}

};

mui.ScrollView = ScrollView;

})();
/**
 * Button module
 * @module button
 */

(function() {

/**
 * The Button class provides a native style button UI element.
 * @class Button
 * @constructor
 * @param config {Object} Button configuration includes
 * 	title {String} The title to display in the button
 * 	image {String} The source of the image to display in the button
 * 	style {String} One of the Button Style Constants (plain, done, bordered, ...)
 * 	action {Function} The method called when the button is activated
 */
function Button(config)
{
	config = config || {};

	// Initialize properties	
	this.title = config.title;
	this.image = config.image;
	this.style = config.style || Button.STYLE_PLAIN;
	this.action = config.action;
	
	// Setup
	this.initialize();	
};

/**
 * Plain style constant
 * @property STYLE_PLAIN
 * @static
 * @type String
 */
Button.STYLE_PLAIN = 'plain';

/**
 * Bordered style constant
 * @property STYLE_BORDERED
 * @static
 * @type String
 */
Button.STYLE_BORDERED = 'bordered';

/**
 * Done style constant
 * @property STYLE_DONE
 * @static
 * @type String
 */
Button.STYLE_DONE = 'done';

Button.prototype = {
	
	/**
	 * Event dispatcher
	 * @method handleEvent
	 * @param e {Event} The event
	 */
	handleEvent: function(e)
	{
		switch(e.type)
		{
			case 'touchstart':
			case 'mousedown':
				mui.addClass(this.element, 'mui-depressed');
				break;
			case 'touchmove':
			case 'mousemove':
				e.preventDefault();
				mui.removeClass(this.element, 'mui-depressed');
				break;			
			case 'click':
				e.preventDefault();
				mui.removeClass(this.element, 'mui-depressed');
				if(this.action) this.action();
				break;
		}
	},
	
	/**
	 * Render the button element into a container. If no parent container is specified
	 * the button will be appended to document.body.
	 * @method render
	 * @param el {HTMLElement|String} The container to render the button into.
	 * @return {mui.Button} The button instance
	 */
	render: function(el)
	{
		el = mui.get(el) || document.body;
		el.appendChild(this.element);
		return this;
	},
	
	/**
	 * Button initialization sets up DOM and Events
	 * @method initialize
	 */
	initialize: function()
	{
		// Root element
		this.element = mui.createElement('div', { className: 'mui-btn' });
		
		// Button style
		if(this.style !== mui.Button.STYLE_PLAIN)
		{
			switch(this.style)
			{
				case mui.Button.STYLE_DONE:
					mui.addClass(this.element, 'mui-done');
					break;
			}
		}

		// Content container
		this.contentEl = mui.createElement('div', { className: 'mui-btn-content' });
		this.element.appendChild(this.contentEl);

		// Title
		if(this.title && !this.image)
		{
			this.titleEl = mui.createElement('div', { className: 'mui-title', innerHTML: this.title });
			this.contentEl.appendChild(this.titleEl);
		}
		// Image
		else if(this.image)
		{
			this.imageEl = mui.createElement('img', { className: 'mui-image', src: this.image });
			if(this.title) this.imageEl.setAttribute('alt', this.title);
			this.contentEl.appendChild(this.imageEl);
		}
		
		// Initialize events
		mui.on(this.element, 'touchstart', this);
		mui.on(this.element, 'touchmove', this);
		mui.on(this.element, 'click', this);
	}
	
};

mui.Button = Button;
	
})();
/**
 * Application Framework module
 * @module framework
 */

/*
 * Global DOM reference
 * @final DOM
 */
const MUI_DOM = {
	/* Common */
	loadingAttr: 'x-mui-loading',
	
	/* Views */
	viewClassName: 'mui-view',
	viewContentClassName: 'mui-view-content',
	viewShowingAttr: 'x-mui-showing'
};

(function() {

/**
 * Application controller constructor
 * @class ApplicationController
 * @constructor
 * @param config {Object} Application configuration must include
 * id, title, version 
 */
function ApplicationController(config)
{
    if (config){
    	this.appInfo = config;
    	this.appInfo.transitionsEnabled = (this.appInfo.transitionsEnabled === false) ? false : true;
    	if(!mui.UA.Safari) this.appInfo.transitionsEnabled = false;
    }
    
	return this;
};

/**
 * Return the instance of mui.ApplicationController
 * @method getInstance
 * @return the mui.ApplicationController instance
 * @static
 */
ApplicationController.getInstance = function()
{
	return _instance;
};

/**
 * Convenience utility for detecting object equality
 * @method objectsEqual
 * @param o1 {Object} The first object
 * @param o2 {Object} The second object
 * @return {Boolean} True if objects are equal, or false otherwise
 * @static
 */
ApplicationController.objectsEqual = function(o1, o2)
{
	var i;
	
	if(typeof o1 === 'undefined') o1 = {};
	if(typeof o2 === 'undefined') o2 = {};
	
	for(i in o1)
	{
		if(o1.hasOwnProperty(i))
		{
			if(!o2.hasOwnProperty(i) || o2[i] != o1[i] ) return false;
		}
	}
	for(i in o2) 
	{
		if(o2.hasOwnProperty(i))
		{
			if(!o1.hasOwnProperty(i) || o1[i] != o2[i] ) return false;
		}
	}
	return true;
};

/**
 * Normalize window object
 */
var window = window || document.defaultView;

/**
 * Cache instance variable
 */
var _instance = null;

ApplicationController.prototype = {

	/**
	 * Array of registered controllers
	 * @property _controllers
	 * @type Array
	 * @private
	 */
	_controllers: null,
	
	/**
	 * Reference to the mui.TabView object, if tabs are used
	 * @property _tabView
	 * @type mui.TabView
	 * @private
	 */
	_tabView: null,
	
	/**
	 * Store the length of the window history array, to detect 
	 * forward/back button 
	 * @property _historyLength
	 * @type Number
	 * @private
	 */
	_historyLength: null,
	
	_localData: {},
	
	/**
	 * Information about the viewport, such as whether or not full-screen
	 * is activated
	 * @property viewportInfo
	 * @type Object
	 */
	viewportInfo: null,
	
	/**
	 * Reference to the currently visible view controller
	 * @property visibleViewController
	 * @type mui.ViewController
	 */
	visibleViewController: null,
	
	/**
	 * State variable used to determine if view is being popped
	 * @property popping
	 * @type Boolean
	 */
	popping: false,
	
	/**
	 * Whether or not views should be made into mui.ScrollViews's
	 * @property shouldScrollViews
	 * @type Boolean
	 */
	shouldScrollViews: false,

	/**
	 * Remove any stale event listeners from the disappearing view controller, and attach event
	 * listeners to the appearing view controller
	 * @method toggleEvents
	 * @param oldVc {mui.ViewController} The disappearing view controller
	 * @param newVc {mui.ViewController} The appearing view controller
	 */
	toggleEvents: function(oldVc, newVc)
	{
		if(oldVc)
		{
			if(oldVc.touchesBegan) 	mui.removeEventListener(oldVc.view, 'touchstart', oldVc.touchesBegan, oldVc);
			if(oldVc.touchesMoved) 	mui.removeEventListener(oldVc.view, 'touchmove', oldVc.touchesMoved, oldVc);
			if(oldVc.touchesEnded) 	mui.removeEventListener(oldVc.view, 'touchend', oldVc.touchesEnded, oldVc);
			if(oldVc.clicked) 	mui.removeEventListener(oldVc.view, 'click', oldVc.clicked, oldVc);
		}
		
		if(newVc)
		{
			if(newVc.touchesBegan) 	mui.on(newVc.view, 'touchstart', newVc.touchesBegan, newVc);
			if(newVc.touchesMoved) 	mui.on(newVc.view, 'touchmove', newVc.touchesMoved, newVc);
			if(newVc.touchesEnded) 	mui.on(newVc.view, 'touchend', newVc.touchesEnded, newVc);
			if(newVc.clicked) 	mui.on(newVc.view, 'click', newVc.clicked, newVc);
		}
	},
	
	/**
	 * Callback invoked after a view controller transition
	 * @method _transitionEnd
	 * @param newVc {mui.ViewController} The new visible view controller
	 * @param oldVc {mui.ViewController} The old visible view controller
	 * @private
	 */
	_transitionEnd: function(newVc, oldVc)
	{
		// Declare locals
		var scrollY = 0, 
		    viewY = mui.getXY(newVc.view)[1],
		    navbar = mui.get('.mui-navbar[x-mui-showing=true]');

		// Restore content heights
		// newVc.view.style.maxHeight = oldVc.view.style.maxHeight = '';
		oldVc.view.style.minHeight = '';
		    
		// Disappear
		oldVc.disappear();
		
		// Callbacks
		oldVc._viewDidDisappear();
		newVc._viewDidAppear();
		
		// Set visibleViewController member
		this.visibleViewController = newVc;
		
		// Reset animation flag
		this.animating = false;
		
		// Check for queued up view controllers
		if(this._viewControllerQueue && this._viewControllerQueue.length > 0)
		{
			var config = this._viewControllerQueue.shift();
			this.showViewControllerWithTransition(config.viewController, config.transition, config.reverse);
		}
		
		// Reset modal flag
		if(this._showingModalViewController)
		{
			this._didPresentModalViewController = true;
		}
	},
	
	/**
	 * Callback triggered whenever the URL is changed
	 * @method _urlChanged
	 * @param url {String} The current URL
	 * @param params {Object} Any request parameters
	 * @param navController {mui.NavigationController} The navigation controller to appear
	 * @param viewControllerName {String} The NAME of the view controller to appear
	 * @param unmatched {Boolean} True if no navigation controller mapping found
	 * @private
	 */
	_urlChanged: function(url, params, navController, viewControllerName, unmatched)
	{		
	    navController = (this._showingModalViewController instanceof mui.NavigationController) ? this._showingModalViewController : navController;
	    
		// Get the viewController
		var viewController = navController.getViewController(viewControllerName);
		var doTransition = false;
		var reverse = false;
		var poppedVc, pushedVc, navIndex;
		
		// Normalize params
		params = params || {};
		
		// Make sure navigationController property is set on viewController
		viewController.navigationController = navController;
		
		// Load the view, if it is not already loaded
		if(!viewController.isViewLoaded())
		{
			viewController.loadView(params);
		}
		// Check for reload of view
		else if(!viewController.isViewLoadedWithParams(params) || 
		       (!this.popping && viewController.reloadOnPush) ) // if pushing and view is set to always reload on this case
		{
			if(viewController.scrollView) viewController.scrollView.scrollTo(0, 0);			
			viewController.reloadView(params);
		}
		
		// Set params attribute
		viewController.params = params;

		// Check pushing/popping
		if(window.history.length < this._historyLength && navController.stack.length > 1)
		{
			this.popping = true;
			navController.popViewController(true);
		}
		this._historyLength = window.history.length;

		// Check if required viewControllers are not yet loaded
		if(viewController.requires)
		{
			viewController.navigationController.requireViewControllers(viewController.requires);
		}

		// Check if viewController belongs to currently showing navigation controller
		if(this.visibleViewController && this.visibleViewController.navigationController.NAME === navController.NAME && this.visibleViewController.NAME !== viewController.NAME)
		{
			doTransition = true;
		}
		else if(this.visibleViewController && !this._showingModalViewController) // Hide active navigation bar for tab-to-tab switch
		{
			this.visibleViewController.navigationController.hideNavigationBar();
			
			// Activate tab, if not already
			navIndex = this._controllers.indexOf(navController);
			if(this._tabView && this._tabView.activeIndex !== navIndex)
			{
				this._tabView.activateTabAtIndex(navIndex);
			}
		}
		else if(!this.visibleViewController && this._tabView)
		{
			this._tabView.activateTabAtIndex(this._controllers.indexOf(navController));
		}
		
		// Attach/Detach touch events
		this.toggleEvents(this.visibleViewController, viewController);
		
		// Position the view controller
 		this.positionViewController(viewController);

		// Push or Pop view controller
		if(!this.popping) navController.pushViewController(viewController, params, true);
		// else navController.popViewController(true);
		
		// Check if popping
		if(this.popping) reverse = true;

		// Store scrollY for outgoing view
		if(this.visibleViewController) this.visibleViewController.scrollY = window.scrollY;

		// Show/Transition the view controller
		if(this._showingModalViewController && this._modalTransition)
		{
			var transition = !this._didPresentModalViewController ? this._modalTransition : viewController.getTransition();
			var isModal = !this._didPresentModalViewController;
			viewController.parentViewController = this._showingModalViewController.parentViewController;
			this.showViewControllerWithTransition(viewController, transition, reverse, isModal);
		} 
		else
		{
			if(this.appInfo.transitionsEnabled && doTransition && typeof mui.Transition !== 'undefined') this.showViewControllerWithTransition(viewController, viewController.getTransition(), reverse);
			else this.showViewController(viewController);			
		}
		
		// Selectables
		var selected = mui.getAll('.mui-selected', viewController.view);
		if(selected.length > 0)
		{
			mui.each(selected, function(s) {
				setTimeout(mui.removeClass, 400, s, 'mui-selected');
			});
		}
	},
	
	/**
	 * TabChange event handler for the mui.TabView activates the navigation controller
	 * corresponding to the tab
	 * @method _tabChanged
	 * @param index {Number} The index of the tab which the user selected
	 * @private
	 */
	_tabChanged: function(index)
	{
		// Get the navigation controller for the tab
		var navController = this._controllers[index];
		if(navController)
		{
			// Scroll to the tabs
			scrollTo(0, mui.getXY(this._tabView.element)[1]);
			document.body.style.minHeight = '10000px';
			setTimeout(mui.setStyle, 10, document.body, 'minHeight', window.innerHeight + 'px');
			
			// Open the last URL in the navigation stack
			var url = navController.getLastUrl();
			this.openUrl(url);
		}
	},
	
	/**
	 * TabRefresh event handler for the mui.TabView activates the navigation controller's root view controller
	 * corresponding to the tab
	 * @method _tabRefreshed
	 * @param index {Number} The index of the tab which the user selected
	 * @private
	 */
	_tabRefreshed: function(index)
	{
		// Get the navigation controller for the tab
		var navController = this._controllers[index];
		if(navController)
		{
			// Pop to root view controller
			navController.popToRootViewController();
		}
	},
	
	/**
	 * Position the viewcontroller in the viewport, taking up as much vertical space as available
	 * @method positionViewController
	 * @param viewController {mui.ViewController} The view controller
	 * @return {mui.ApplicationController} The AppController instance
	 */
	positionViewController: function(viewController)
	{
		viewController = viewController || this.visibleViewController;
		if(viewController instanceof mui.ViewController)
		{
			var viewNode = viewController.view,
			    navbar = mui.get('.mui-navbar[x-mui-showing=true]'),
			    navbarHeight = navbar ? navbar.offsetHeight : 0,
			    header = mui.get('body > header'), headerHeight = (header ? header.offsetHeight : 0),
			    footer = mui.get('body > footer'), footerHeight = (footer ? footer.offsetHeight : 0),
			    height = parseInt(window.innerHeight - footerHeight - headerHeight),
			    scrollHost, posY, scrollHeight;

            if (this.shouldScrollViews || window.scrollY == 0){
                 scrollTo(0, 0); 
            }
            
			viewNode.style.minHeight = height + 'px';
			document.body.style.minHeight = window.innerHeight + 'px';

			if(this.shouldScrollViews && (!viewController.scrollView || (viewController.scrollView && !viewController.scrollView.isLocked()))){
			     viewNode.style.maxHeight = height + 'px';
			}
			     
			if(viewController.scrollView) {
			    scrollHost   = viewController.scrollView.getScrollHost();
			    
			    mui.setStyle(scrollHost, 'min-height', height+'px');
			    
			    if (viewController.scrollView.touchInfo.translations && viewController.scrollView.touchInfo.translations[1]){
    			    posY         = viewController.scrollView.touchInfo.translations[1].y;
    			    scrollHeight = scrollHost.offsetHeight;
    			    
    			    // if the scrollHost is not visible (position + scrollHeight will be negative or very small)
    			    // then calculate a value that will make the view visible again
    			    if ( scrollHeight && (posY + scrollHeight) < (height / 2) ){
    			        posY = height - scrollHeight;
    			        
    			        viewController.scrollView.scrollTo(0, posY);
    			    }
			    }
			}			
		}

		return this;
	},

	/**
	 * Show a viewController on-screen, making it the visibleViewController
	 * @method showViewController
	 * @param viewController {mui.ViewController} The ViewController to show.
	 */
	showViewController: function(viewController)
	{
		// Set animation flag
		this.animating = false;
		
		// Disappear
		if(this.visibleViewController)
		{
			this.visibleViewController._viewWillDisappear( this.popping );
			this.visibleViewController.disappear();
			this.visibleViewController._viewDidDisappear();
		}
		
		// Appear
		viewController._viewWillAppear();
		viewController.appear();
		viewController._viewDidAppear();
		
		// Set visibleViewController member
		this.visibleViewController = viewController;
		
		// Reset popping flag
		this.popping = false;
	},
	
	/**
	 * Show a viewController on-screen with a transition, making it the visibleViewController
	 * @method showViewController
	 * @param viewController {mui.ViewController} The ViewController to show.
 	 * @param transition {Object} Object literal defining the transition
 	 * @param reverse {Boolean} Should transition be executed in reverse
	 * @param isModal {Boolean} If true, this is a modal view controller
	 */
	showViewControllerWithTransition: function(viewController, transition, reverse, isModal)
	{
		if(this.animating)
		{
			this._viewControllerQueue = this._viewControllerQueue || [];
			this._viewControllerQueue.push({ viewController: viewController, transition: transition, reverse: reverse});
			return false;
		}
		
		// Declare locals
		var trans, options, navbar, scrollY, inView, outView;
		
		// Set in/out views
		inView = viewController.view;
		outView = this.visibleViewController.view;
		
		// Modal
		if(isModal)
		{
			var modalViewsContainer = mui.createElement('div', { id: 'mui-modal-views' });
			inView = mui.createElement('div', { id: 'mui-modal-in' });
			if(viewController.navigationController && viewController.navigationController.navigationBar)
			{
				inView.appendChild(viewController.navigationController.navigationBar.element);
			}
			modalViewsContainer.appendChild(viewController.view);
			inView.appendChild(modalViewsContainer);

			outView = this.visibleViewController.view;
			document.body.appendChild(inView);
		}
		else if(this._showingModalViewController)
		{
			mui.get('#mui-modal-views').appendChild(inView);
		}
		
		// Set animation flag
		this.animating = true;
		
		// Scroll
		navbar = mui.get('.mui-navbar[x-mui-showing=true]');
		if(this._tabView) scrollY = mui.getXY(this._tabView.element)[1];
		else if(navbar) scrollY = mui.getXY(navbar)[1];
		else scrollY = 0;

		if(viewController.scrollY && viewController.scrollY > mui.getXY(viewController.view)[1]) scrollY = viewController.scrollY;
		
		// Make sure we have room to scroll
		if(scrollY > this.visibleViewController.view.offsetHeight) this.visibleViewController.view.style.minHeight = scrollY+'px';

		if(!this.shouldScrollViews) setTimeout(scrollTo, 0, 0, scrollY);

		// Initialize transition options
		options = mui.augment({}, transition);
		options.reverse = reverse;
		options.onComplete = mui.bind(this._transitionEnd, this, viewController, this.visibleViewController);
		
		// Setup transition
		trans = new mui.Transition(inView, outView, options);
		
		// Show incoming view
		this.visibleViewController._viewWillDisappear( this.popping );
		viewController._viewWillAppear();
		viewController.appear();

		// Execute transition
		mui.bind(trans.execute, trans)();
		
		// Reset popping flag
		this.popping = false;
	},
	
	/**
	 * Animate or show a modal view controller 
	 * @metho showModalViewController 
	 * @param viewController {mui.ViewController} The modal view controller
	 * @param params {Object} Request params for the view controller
	 * @param parentViewController {mui.ViewController} The parent view controller for the modal
	 * @param animated {Boolean} If true, use a transition when showing the view controller
	 */
	showModalViewController: function(viewController, params, parentViewController, animated) 
	{
		// Declare locals
		var transition = {
			type: mui.Transition.TYPE_SLIDE,
			direction: mui.Transition.DIR_BOTTOM_TO_TOP
		};
		var modalVc = viewController;
		if(animated === false) transition.duration = 0;
		
		// Set the parentViewController property on the child modal
		viewController.parentViewController = parentViewController;
		this._showingModalViewController = viewController;
		this._didPresentModalViewController = false;

		// Check the transition style
		if(viewController.transition) transition = viewController.transition;

		// Store the transition value
		this._modalTransition = transition;

		// Check if NavigationController. If yes, show its top view controller
		if(viewController instanceof mui.NavigationController)
		{
			viewController.getTopViewController().navigationController = viewController;
			viewController = viewController.getTopViewController();
			viewController.parentViewController = parentViewController;
			
			// Open the view controller
			this.openViewController(viewController, params);
		}
		else
		{
			// Show the view controller
			viewController.params = params;

			// Check if view needs to be loaded
			if(!viewController.isViewLoadedWithParams(params))
			{
				viewController.loadView(params);
			}
			
			this.toggleEvents(parentViewController, viewController);
			this.showViewControllerWithTransition(viewController, transition, false, true)
		}
	},
	
	/**
	 * Dismiss a modal view controller with transition
	 * @metho dismissModalViewController
	 * @param parentViewController {mui.ViewController} The parent view controller for the modal
	 */
	dismissModalViewController: function(parentViewController)
	{
		var inView, outView;
		var transition = this._modalTransition;
		var outViewController = this._showingModalViewController;
		transition.reverse = true;
		transition.onComplete = mui.bind(function() {
			
			var modalViews = mui.getAll('#mui-modal-views .mui-view');
			mui.each(modalViews, function(view) {
				mui.get('#mui-views').appendChild(view);
			});
			mui.removeElement('#mui-modal-in');
						
			this._showingModalViewController = null;
			this._modalTransition = null;
			
			// Attach/Detach touch events
			this.toggleEvents(outViewController, parentViewController);
			
			this._transitionEnd(parentViewController, outViewController);
			
			this.openViewController(parentViewController, parentViewController.params, true);
			
		}, this);
		
		inView = document.body;
		outView = mui.get('#mui-modal-in');
		
		if(this._showingModalViewController instanceof mui.NavigationController)
		{
			outViewController = this._showingModalViewController.getTopViewController();
		}
		
		var trans = new mui.Transition(inView, outView, transition);
		
		parentViewController._viewWillAppear();
		parentViewController.appear();
		
		outViewController._viewWillDisappear( true );
		
		setTimeout(mui.bind(trans.execute, trans), 0);
	},
	
	/**
	 * Set the element for the application. Use this method in conjuction with
	 * registerController to map a navigationController to a particular tab
	 * @method setTabsElement
	 * @param el {String|HTMLElement} Selector or HTMLElement for the tabs container
	 */
	setTabsElement: function(el)
	{
		if(typeof mui.TabView !== 'undefined')
		{
			this._tabView = new mui.TabView(el);
			this._tabView.tabChanged = mui.bind(this._tabChanged, this);
			this._tabView.tabRefreshed = mui.bind(this._tabRefreshed, this);
		}
	},

	/**
	 * Register a controller with the application. If tabEl is passed in, the
	 * navigationController will be mapped to that tab.
	 * @method registerController
	 * @param controller {mui.NavigationController} The controller to register
	 */
	registerController: function(controller)
	{
		// Initialize _controllers if not defined yet
		this._controllers = this._controllers || [];

		// Push controller onto controller stack
		this._controllers.push(controller);
		
		// Make sure DOM node exists for each viewController, and map URLs into navigator
		mui.each(controller.viewControllers, function(vc) {

			// View node
			var vcName = vc.NAME || vc.prototype.NAME;
			var id = controller.NAME + '/' + vcName;
			
			// Map URL
			this.navigator.mapUrl(id, mui.bind(this._urlChanged, this, controller, vcName));
		}, this);

		// Initialize controller
		controller.initialize();
	},
	
	/**
	 * Open a URL - retrieve the navigationController to which
	 * the URL belongs to and trigger it's load/appear sequence. 
	 * This method will also perform the view transition, if defined.
	 * URL's are defined as the navigationController's name, followed by
	 * a slash, followed by the viewController's name, with any URL parameters
	 * following that. Leading slashes are ignored.
	 * Example: '/stories/list' is equivalent to 'stories/list'
	 * @method openUrl
	 * @param url {String} The URL to open
	 * @param quiet {Boolean} (Optional) Prevent the viewController load sequence. Pass
	 *   true if you just want to set the window hash, and not trigger the load/appear sequence	
	 * @return {Boolean} Returns false if url is not mapped to any 
	 *   controller
	 */
	openUrl: function(url, quiet)
	{
		this.navigator.openUrl.apply(this.navigator, arguments);
	},
	
	/**
	 * This is a convenience method for showing a viewController without constructing a URL.
	 * The URL is built based on the viewController's name + the params that are passed in.
	 * @method openViewController
	 * @param viewController {mui.ViewController} the ViewController
	 * @param params {Object} Any request params
	 * @param quiet {Boolean} Pass quiet flag to openUrl
	 */
	openViewController: function(viewController, params, quiet)
	{
		var url = '/';
		if(viewController.navigationController) url += viewController.navigationController.NAME + '/';
		url += viewController.NAME;
		if(params)
		{
			url += '?';
			mui.iterate(params, function(v, n) { url += [n, v].join('='); url += '&'; });
			url = url.substr(0, url.length-1);
		}
		this.openUrl(url, quiet);
	},
	
	/**
	 * Get a navigation controller by name
	 * @method getController
	 * @param name {String} The name of the controller
	 * @return The controller, or null, if not found
	 */
	getController: function(name)
	{
		var ctrl = null;
		mui.each(this._controllers, function(c) {
			if(c.NAME === name) ctrl = c;
		}, this);
		return ctrl;
	},
	
	/**
     * @param {String} propertyName The name of the property to retrieve.
     * @return {variant} The value of the property or =undefined= if it doesn't exist.
     * @method setData
     */
    getData: function(propertyName)  {
        if ( this._localData[propertyName] ){
            return this._localData[propertyName];
        }
        
        if (window.localStorage){
            this._localData = window.localStorage.getItem( "mui_data" );
            
            if (this._localData){
                this._localData = JSON.parse( this._localData );
            } else {
                this._localData = {};
            }
        }
        
        return this._localData[propertyName];
    },
    
    /**
     * @param {String} propertyName The name of the property to store.
     * @param {String} propertyValue the value of the property
     * @method setData
     */
    setData: function(propertyName, propertyValue)  {        
        this._localData[propertyName] = propertyValue;
        
        if (window.localStorage){
            window.localStorage.removeItem( "mui_data" );
        
            window.localStorage.setItem( "mui_data", JSON.stringify( this._localData ) );
        }
    },
    
	/**
	 * Restore the state of the application. If no state is available,
	 * the fallback URL will be opened
	 * @method restore
	 * @param fallbackUrl {String} URL to be opened if there is nothing to restore
	 * @return {mui.ApplicationController} The AppController instance
	 */
	restore: function(fallbackUrl)
	{
        function restoreViewControllers() {
            var mui_controllers = _instance.getData( "mui_controllers" ) || {},
                topNc, cTime = 0, lastUrl, navCon, stack;
            
            mui.iterate( mui_controllers, function( mui_controller ){
                navCon = _instance.getController(mui_controller.nav_controller);
                
                if(navCon){
                    stack = mui_controller.stack;
                    
                    if(_instance.appInfo.persistenceMode === 'top') stack = [stack[0]];
                    
                    mui.each(stack, function(s) {
                        if(s.timestamp >= cTime)   {
                            cTime = s.timestamp;
                            topNc = mui_controller.nav_controller;
                        }
                    })
                    navCon.restoreStack(stack);
                }                            
            } );
            
            if (topNc){
                lastUrl = _instance.getController(topNc).getLastUrl();
                
                _instance.openUrl(lastUrl);  
                
            } else {
                _instance.openUrl(fallbackUrl);
            }
        };
                            	    
	    if ( window.localStorage ){
	        if(this.appInfo.persistenceMode !== 'none')  {
	            var mui_config = this.getData( "mui_config" ) || {};
	            
	            var version = mui_config["version"];
	            
	            // Check version
	            if (!version || version !== this.appInfo.version) {
                    
                    // Version is different, so update version wipe out all tables
                    // @TODO wipe tables
                    mui_config["version"] = this.appInfo.version;
                    
                    this.setData( "mui_config", mui_config );
                    
                    if (version && version !== this.appInfo.version) {
                        this.openUrl(fallbackUrl);
                        
                    } else {
                        restoreViewControllers();
                    }
                    
                } else {
                    restoreViewControllers();
                }
                
	        } else {
                this.openUrl(fallbackUrl);
	        } 
	           
	    } else {
	        
	        this.openUrl(fallbackUrl);
	    }
	    		
		return this;
	},
	
	/**
	 * Event disptcher
	 * @method handleEvent
	 * @param e {Event} The event
	 * @private
	 */
	handleEvent: function(e)
	{
		switch(e.type)
		{
			case 'touchstart':
			case 'mousedown':
				this._selectable = mui.getAncestorByClassName(e.target, 'mui-selectable');
				if(this._selectable && !(e.target instanceof HTMLInputElement))
				{
					this._selectablePid = setTimeout(mui.addClass, 100, this._selectable, 'mui-selected');
				}
				break;
			case 'touchmove':
			case 'mousemove':
				if(this._selectable)
				{
					clearTimeout(this._selectablePid);
					mui.removeClass(this._selectable, 'mui-selected');
				}
				this._selectable = null;
				break;
			case 'click':
				// setTimeout(mui.removeClass, 450, this._selectable, 'mui-selected');
				break;
			case 'resize':
				this.positionViewController();
				break;
		}
	},

	/**
	 * Initialization method
	 * @method initialize
	 */
	initialize: function()
	{
		// Enforce single instance of ApplicationController
		if(_instance !== null)
		{
			throw new Error('Only one instance of mui.ApplicationController allowed.');
		}
		
		// Cache instance
		_instance = this;
		
		// Initialize navigator
		this.navigator = new mui.Navigator();
		
		// Initialize event capture
		mui.on(document, 'touchstart', this);
		mui.on(document, 'touchmove', this);
		mui.on(document, 'click', this);
		mui.on(window, 'resize', this);
		
		// Initialize viewport and launch app
		document.body.style.height = '10000px'; // so that the correct innerHeight of window can be calculated
		setTimeout(mui.bind(function() {
			scrollTo(0, 1); scrollTo(0, 0);
			document.body.style.minHeight = window.innerHeight+'px';
			document.body.style.height = '';
			
			// Prevent the dreaded "shaking" bug when input fields are focused
			var input = document.createElement('input');
			document.body.appendChild(input);
			input.focus();
			document.body.removeChild(input);
			
			// Viewport meta
			this.viewportInfo = { fullScreen: false };
			if(mui.UA.Safari && window.innerHeight >= 460)
			{
				this.viewportInfo.fullScreen = true;
			}
			
			// ScrollViews?
			if(mui.ScrollView && this.appInfo.scrollViews)
			{
				if(this.viewportInfo.fullScreen && this.appInfo.scrollViews.fullScreenMode === true) this.shouldScrollViews = true;
				else if(!this.viewportInfo.fullScreen && this.appInfo.scrollViews.chromeMode === true) this.shouldScrollViews = true;
			}
			
			// Full screen
			if(this.viewportInfo.fullScreen || (this.shouldScrollViews))
			{
				document.body.parentNode.setAttribute('x-mui-full-screen', 'true');
				mui.addClass(document.body, 'mui-full-screen');
			}
			
			// Storage
			if( mui.Storage && this.appInfo.storageEnabled === true)
            {
                this.storage = mui.Storage.open(this.appInfo.id, this.appInfo.version, this.appInfo.title);
            }
            
			// Check for tabs element
			if(this.appInfo.tabs && this.appInfo.tabs.element)
			{
				this.setTabsElement(this.appInfo.tabs.element);
				if(this.appInfo.tabs.moveToFooterInFullScreen && this.viewportInfo.fullScreen)
				{
					if(!mui.get('footer')) document.body.appendChild(document.createElement('footer'));
					mui.get('footer').appendChild(this._tabView.element);
				}
			}

			// Initialize launch sequence
			document.body.removeAttribute('x-mui-loading');
			this.appDidFinishLaunching();
			
			// Catch-all route
			this.navigator.mapUrl('*', mui.bind(this._urlChanged, this, null, null, true));

		}, this), 100);
	}
	
};

mui.ApplicationController = ApplicationController;

})();
(function() {

/**
 * NavigationController class
 * This class manages a hierarchy of ViewControllers, and 
 * provides/manages an instance of NavigationBar.
 * @class NavigationController
 * @param def {Object} NavigationController defintion
 */
function NavigationController(def)
{
	// Iterate over defintion
	mui.iterate(def, function(v, n) { this[n] = v; }, this);
};

NavigationController.prototype = {
	
	/**
	 * Array of viewControllers in the navigation hierarchy
	 * @property viewControllers
	 * @type Array
	 */
	viewControllers: null,
	
	/**
	 * Stack of viewcontroller used to persist navigation history
	 * @property stack
	 * @type Array 
	 */
	stack: null,
	
	/**
	 * Stack of viewcontroller's which have been popped used to persist
	 * forward navigation history
	 * @property poppedStack
	 * @type Array
	 */
	poppedStack: null,
	
	/**
	 * NavigationBar shared by the viewControllers
	 * @property navigationBar
	 * @type mui.NavigationBar
	 */
	navigationBar: null,
	
	/**
	 * Push a view controller onto the stack of popped view controllers
	 * @method _pushToPoppedStack
	 * @param vc {Object} The view controller to push
	 * @private
	 */
	_pushToPoppedStack: function(vc)
	{
		this.poppedStack.push(vc);
	},
	
	/**
	 * If the user clicks on the title view of the navigation bar and the view controller
	 * has a scroll-view, let's scroll to the top of the scroll view
	 * @method didClickTitle
	 */
	didClickTitle: function()
	{
		var vc = this.getTopViewController();
		if(vc && vc.scrollView) vc.scrollView.scrollTo(0, 0, 300);
	},
	
	/**
	 * Method invoked upon click of the back button in the navigation bar
	 * @method goBack
	 */
	goBack: function()
	{
		if(!this.popViewController()) this.popToRootViewController();
	},

	/**
	 * Get a viewController by it's NAME property
	 * @method getViewController
	 * @param name {String} The NAME of the viewController
	 * @return {mui.ViewController} The viewController, or -1 if not found
	 */
	getViewController: function(name)
	{
		var vc, i=0, len=this.viewControllers.length;
		for(i; i<len; i++)
		{
			if(this.viewControllers[i].NAME === name || (typeof this.viewControllers[i] === 'function' && this.viewControllers[i].prototype.NAME === name))
			{
				// If the viewController is defintion, and not instance, create a new one
				if(typeof this.viewControllers[i] === 'function')
				{
					this.viewControllers[i] = new this.viewControllers[i];
				}
				vc = this.viewControllers[i];
				break;
			}
		}
		return vc || -1;
	},
	
	/**
	 * Require a set of viewController's in the background. Used when a viewController requires
	 * other viewControllers to be in the stack before they are loaded themself.
	 * @method requireViewControllers
	 * @param viewControllers {Array} Array of viewController info, in the form { NAME: 'myName', params: {} }
	 */
	requireViewControllers: function(viewControllers)
	{
		if(!this._didRequireViewControllers)
		{
			this._didRequireViewControllers = true;
			mui.each(viewControllers, function(n) {
				var vc = this.getViewController(n);
				// Set navigationController member
				vc.navigationController = this;

				// Insert the view controller in the stack
				if(!this.getViewControllerFromStack(vc, null, true) || !this.getViewControllerFromPoppedStack(vc, null, true))
				{
					this.pushViewController(vc, undefined, true);
				}
			}, this);	
		}
	},
	
	/**
	 * Save the current stack to local storage
	 * @method saveStack
	 */
	saveStack: function(mode)
	{
		if(this.appController.appInfo.persistenceMode && this.appController.appInfo.persistenceMode !== 'none' && typeof JSON !== 'undefined')
		{
			var s = [], mui_controllers = this.appController.getData("mui_controllers") || {}, item = {};
			mui.each(this.stack, function(vc) {
				s.push({
					NAME: vc.viewController.NAME,
					title: vc.viewController.title,					
					timestamp: vc.timestamp,
					params: vc.params || {}
				});
			});
			
			item.nav_controller = this.NAME;
			item.stack          = s;
			
			mui_controllers[ this.NAME ] = item;
			
			this.appController.setData("mui_controllers", mui_controllers);			
		}
	},
	
	/**
	 * Push a viewController onto the stack
	 * @method pushViewController
	 * @param viewController {mui.ViewController} The ViewController
	 * @param params {Object} Any request params to be passed to the viewController
	 * @param quiet {Boolean} Set to false to disable the invocation of mui.ApplicationController.openUrl (Default false)	
	 * @return {mui.ViewController} The viewController which was pushed	
	 */
	pushViewController: function(viewController, params, quiet)
	{
		// Create navigationController reference
		viewController.navigationController = this;
				
		// Prevent dupes
		for(var i=0, len=this.stack.length; i<len; i++)
		{
			if(this.stack[i].viewController.NAME === viewController.NAME)
			{
				this.stack.splice(i, 1);
				break;
			}
		}
				
		// Push onto stack
		if(this.stack.length > 0 && this.stack[this.stack.length-1].viewController.NAME === viewController.NAME)
		{
			this.stack.pop();
		}
		this.stack.push({ viewController: viewController, params: params, timestamp: +(new Date) });
		if(!quiet)
		{
			this.appController.openViewController(viewController, params);
		}
		return viewController;
	},
	
	/**
	 * Pop the top viewController off the stack
	 * @method popViewController
	 * @param quiet {Boolean} Set to false to disable the invocation of mui.ApplicationController.openUrl (Default false)	
	 * @return {mui.ViewController} The viewController which was popped
	 */
	popViewController: function(quiet)
	{
		var vc = this.stack.pop();
		if(vc) this._pushToPoppedStack(vc);
		if(vc && !quiet && this.stack.length > 0)
		{
			this.appController.popping = true;
			this.appController.openViewController(this.stack[this.stack.length-1].viewController, this.stack[this.stack.length-1].params);
		}
		return vc;
	},
	
	/**
	 * Pop to a particulator viewController in the stack
	 * @method popToViewController
	 * @param viewController {mui.ViewController} The ViewController to pop to
	 * @param params {Object} The params for the view controller	
	 * @param quiet {Boolean} Set to false to disable the invocation of mui.ApplicationController.openUrl (Default false)	
	 * @return {mui.ViewController} The viewController, if found and popped
	 */
	popToViewController: function(viewController, params, quiet)
	{
		var vc,
		    len 		= this.stack.length, 
		    i 			= len-1, 
		    tmpStack 		= this.stack.slice(), 
		    tmpPoppedStack 	= this.poppedStack.slice();
		
		for(i; i>=0; i--)
		{
			if(this.stack[i].viewController.NAME === viewController.NAME && mui.ApplicationController.objectsEqual(params, this.stack[i].params))
			{
				vc = this.stack[i];
				break;
			}
			else
			{
				tmpPoppedStack.push(tmpStack.pop());
			}
		}
		if(vc)
		{
			this.poppedStack = tmpPoppedStack;
			this.stack = tmpStack;
			
			if(!quiet)
			{
				this.appController.popping = true;
				this.appController.openViewController(vc.viewController, vc.params);
			}
		}
		return vc;
	},

	/**
	 * Push forward to a particulator viewController in the forward stack
	 * @method pushToViewController
	 * @param viewController {mui.ViewController} The ViewController to push to
	 * @param params {Object} The params for the view controller
	 * @param quiet {Boolean} Set to false to disable the invocation of mui.ApplicationController.openUrl (Default false)
	 * @return {mui.ViewController} The viewController, if found and pushed
	 */
	pushToViewController: function(viewController, params, quiet)
	{
		var vc, len = this.poppedStack.length, i = len-1, tmpStack = this.stack.slice(), tmpPoppedStack = this.poppedStack.slice(), top = this.getTopViewController();
		for(i; i>=0; i--)
		{	
			if(this.poppedStack[i].viewController.NAME === viewController.NAME && mui.ApplicationController.objectsEqual(params, this.poppedStack[i].params))
			{
				vc = this.poppedStack[i];
				break;
			}
		}
		if(vc)
		{
			this.poppedStack = tmpPoppedStack;
			this.stack = tmpStack;
			
			if(!quiet)
			{
				this.appController.pushing = true;
				this.appController.openViewController(vc.viewController, vc.params);
			}
		}
		return vc;
	},
	
	/**
	 * Pop to the root viewController in the stack
	 * @method popToRootViewController
	 */
	popToRootViewController: function()
	{
		if(this.stack.length > 1)
		{
			this.popToViewController(this.stack[0].viewController);
		}
		else if(this.stack.length === 1)
		{
			this.stack[0].viewController.reloadView();
		}
	},
	
	/**
	 * Restore the stack of viewControllers to the last visited state
	 * @method restoreStack
	 * @param stack {Array} Array of stacks as stored in database
	 */
	restoreStack: function(stack)
	{
		// Reset stack
		this.stack = [];

		// Stack item: { NAME: 'my-name', params: { id: 'foo' }, timestamp: 123456689 }
		mui.each(stack, function(s) {
			var vc = this.getViewController(s.NAME);
			if(s.title && !vc.title)  vc.title = s.title;
			vc.navigationController = this;
			vc.unloadView();
			this.stack.push({
				viewController: vc,
				title: vc.title,
				params: s.params,
				timestamp: s.timestamp
			});
		}, this);
	},
	
	/**
	 * Get the viewcontroller preceding the top view controller
	 * @method getPreviousViewController
	 * @return {mui.ViewController} The previous viewController
	 */
	getPreviousViewController: function()
	{
		var c;
		if(this.stack.length > 1) c = this.stack[this.stack.length-2].viewController;
		return c;
	},
	
	/**
	 * Get the top view controller
	 * @method getTopViewController
	 * @return {mui.ViewController} The top viewController
	 */
	getTopViewController: function()
	{
		var c = this.viewControllers[0];
		if(this.stack.length > 0) c = this.stack[this.stack.length-1].viewController;
		return c;
	},
	
	/**
	 * Callback triggered when viewController is appearing. This is used to
	 * update the contents of the navigation-bar
	 * @method viewControllerWillAppear
	 * @param viewController {mui.ViewController} The viewController
	 */
	viewControllerWillAppear: function(viewController)
	{
		var items = viewController.navigationItems || {}, prevVc = this.getPreviousViewController();
		
		// Check if back button should be placed in the navigation-bar
		if(prevVc)
		{
			items.back = prevVc.backTitle || prevVc.title || true;
			items.backAction = mui.bind(this.goBack, this);
		}
		
		// Check for title attribute 
		if(!items.title && typeof viewController.title === 'string')
		{
			items.title = viewController.title;
		}

		// Check for any updated navigation items
		if(items !== this.navigationBar.items)
		{
			this.navigationBar.setItems(items, this.appController.animating, this.appController.popping);
		}
		
		if(!items.title && !items.leftBarItem && !items.rightBarItem && !items.back)
		{
			this.hideNavigationBar();
		}
		
		// If view controller is appearing modally, don't persist in stack
		if(!viewController.parentViewController)
		{
			// Update timestamp in stack
			for(var i=this.stack.length-1; i>=0; i--)
			{
				if(this.stack[i].viewController.NAME === viewController.NAME)
				{
					this.stack[i].timestamp = +(new Date);
					break;
				}
			}

			// Save stack
			this.saveStack();	
		}
	},
	
	/**
	 * Hide the navigation-bar
	 * @method hideNavigationBar
	 */
	hideNavigationBar: function()
	{
		this.navigationBar.hide();
	},
	
	/**
	 * Return the last application URL for the top viewController in the stack
	 * @method getLastUrl
	 * @return {String} The URL
	 */
	getLastUrl: function()
	{
		var topName = this.viewControllers[0].NAME || this.viewControllers[0].prototype.NAME;
		var url = this.NAME + '/' + topName;
		if(this.stack.length > 0)
		{
			url = this.NAME + '/' + (this.stack[this.stack.length-1].viewController.NAME || this.stack[this.stack.length-1].viewController.prototype.NAME);
			if(this.stack[this.stack.length-1].params)
			{
				url += '?';
				mui.iterate(this.stack[this.stack.length-1].params, function(v, n) { url += [n, v].join('='); url += '&'; });
				url = url.substr(0, url.length-1);
			}
		}
		return url;
	},
	
	/**
	 * Get a viewController from the stack
	 * @method getViewControllerFromStack
	 * @param viewController {mui.ViewController} The viewController to search for
	 * @param params {Object} Request parameters belonging to the viewController
	 * @param ignoreParams {Boolean} Whether or not to check that the params object's are equal	
	 * @return {mui.ViewController} The ViewController, if found
	 */
	getViewControllerFromStack: function(viewController, params, ignoreParams)
	{
		var vc, len=this.stack.length, i=len-1;
		for(i; i>=0; i--)
		{
			if(this.stack[i].viewController.NAME === viewController.NAME && (ignoreParams || mui.ApplicationController.objectsEqual(params, this.stack[i].params)))
			{
				vc = this.stack[i].viewController;
				break;
			}
		}
		return vc;
	},
	
	/**
	 * Get a viewController from the popped stack
	 * @method getViewControllerFromPoppedStack
	 * @param viewController {mui.ViewController} The viewController to search for
	 * @param params {Object} Request parameters belonging to the viewController
	 * @param ignoreParams {Boolean} Whether or not to check that the params object's are equal
	 * @return {mui.ViewController} The ViewController, if found
	 */
	getViewControllerFromPoppedStack: function(viewController, params, ignoreParams)
	{
		var vc, len=this.poppedStack.length, i=len-1;
		for(i; i>=0; i--)
		{
			if(this.poppedStack[i].viewController.NAME === viewController.NAME && (ignoreParams || mui.ApplicationController.objectsEqual(params, this.poppedStack[i].params)))
			{
				vc = this.poppedStack[i].viewController;
				break;
			}
		}
		return vc;
	},
	
	/**
	 * Initialize the navigationBar component
	 * @method initializeNavigationBar
	 */
	initializeNavigationBar: function()
	{
		var config = {};
		config.navigationController = this;
		
		if(this.tintColor) config.tintColor = this.tintColor;
		if(this.hasCaps)   config.hasCaps   = this.hasCaps;
		
		this.navigationBar = new mui.NavigationBar(config);
	},
	
	/**
	 * Initialize the stack
	 * @method initializeStack
	 */
	initializeStack: function()
	{
		this.stack = [];
		this.poppedStack = [];
	},
	
	/**
	 * NavigationController initialization
	 * @method initialize
	 */
	initialize: function()
	{
		// Initialize properties
		this.viewControllers = this.viewControllers || [];
		this.appController = mui.ApplicationController.getInstance();

		// Initialize navigation-bar
		this.initializeNavigationBar();

		// Initialize controller stack
		this.initializeStack();
	}
};

mui.NavigationController = NavigationController;
	
})();

if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
(function() {

/**
 * Regular expression for template building
 * @property templateRegExp
 * @static
 * @private
 */
const templateRegExp = new RegExp('%{([\\w-.]+)}', 'g');

/**
 * Idle delay for flashing the scrollview indicators
 * @property scrollViewIdleDelay
 * @static
 * @private
 */
const scrollViewIdleDelay = 500;

/**
 * Convert a params object to a string
 * @property paramsToString
 * @private
 */
function paramsToString(params)
{
	var str = '';
	mui.iterate(params, function(v, n) {
		str += n+'='+v+'&';
	});
	str = str.substring(0, str.length-2);
	return str;
}
 

/**
 * ViewController class
 * This class provides the behavior layer for one screen of the app.
 * All built-in view controller classes and any custom
 * view controller classes inherit from this class.
 * @class ViewController
 * @constructor
 * @param definition {Object} View controller definition
 */
function ViewController(def)
{
	// Iterate over defintion
	mui.iterate(def, function(v, n) { this[n] = v; }, this);	
	
	// Initialize navigation items
	this.navigationItems = {};
};

ViewController.prototype = {
	
	/**
	 * Flag to determine if view data has been loaded
	 * @property _viewLoaded
	 * @type Boolean
	 * @private
	 */
	_viewLoaded: false,
	
	/**
	 * Flag to determine if view DOM element has been set
	 * @property _contentLoaded
	 * @type Boolean
	 * @private
	 */
	_contentLoaded: false,
	
	/**
	 * Flag to determine if ViewController should be persisted. If set to
	 * false, then this ViewController will not be restored when the
	 * navigationController's stack is restored
	 * @property persistView
	 * @type Boolean
	 * @default true
	 */
	persistView: true,
	
	/**
     * Flag to determine if ViewController should be cached when it disappears.
     * @property cacheView
     * @type Boolean
     * @default true
     */
    cacheView: true,
    
	/**
     * Flag to determine if ViewController should be reloaded when it 
     * is pushed into the navigation stack. If set to true then reloadView
     * will be called everytime the view is pushed
     * 
     * @property reloadOnPush
     * @type Boolean
     * @default false
     */
	reloadOnPush: false,
	
	/**
	 * Root node for the view
	 * @property view
	 * @type HTMLElement
	 */
	view: null,
	
	/**
	 * Request parameters object
	 * @property params
	 * @type Object
	 */
	params: null,
	
	/**
	 * The navigationItems property is used to allow view controllers to specify
	 * the contents for the navigation-bar. There are 3 possible locations for 
	 * navigation items.  Left (back button), Center (title), Right (custom view).
	 * You can use the viewWillAppear callback to set navigation items for a 
	 * view controller.
	 * See: http://developer.apple.com/iphone/library/featuredarticles/ViewControllerPGforiPhoneOS/UsingNavigationControllers/UsingNavigationControllers.html#//apple_ref/doc/uid/TP40007457-CH7-SW1
	 * for a detailed explanation of navigation item's in context of native 
	 * iPhone development, as the rules are similar.
	 * @method navigationItems
	 * @type Object
	 */
	navigationItems: null,
	
	/**
	 * Check to see whether the view has been loaded or not.
	 * @method isViewLoaded
	 * @return Boolean indicating if the view has been loaded.
	 */
	isViewLoaded: function()
	{
		return this._viewLoaded;
	},
	
	/**
	 * Check to see whether the view with a a given set of params has been loaded or not.
	 * @method isViewLoadedWithParams
	 * @param params {Object} The params object
	 * @return Boolean indicating if the view has been loaded.
	 */
	isViewLoadedWithParams: function(params)
	{
		var isLoaded = this._viewLoaded;
		if(isLoaded)
		{
			isLoaded = this._viewContents && typeof this._viewContents[paramsToString(params)] !== 'undefined';
		}
		return isLoaded;
	},
	
	/**
	 * Trigger the callback sequence for when the view contents have
	 * been loaded
	 * @method _viewDidLoad
	 * @private
	 */
	_viewDidLoad: function()
	{
		this._viewLoaded = true;
		this.view.removeAttribute(MUI_DOM.loadingAttr);
		this.viewDidLoad();
		if(this.scrollView) setTimeout(mui.bind(this.scrollView.flashScrollBars, this.scrollView), scrollViewIdleDelay);
	},
	
	/**
	 * Callback triggered when the view controller has finished animating in or out
	 * @method _onModalTransitionEnd 
	 * @param dismissed {Boolean} If true, the view controller was just dismissed
	 * @private
	 */
	_onModalTransitionEnd: function(dismissed)
	{
		if(dismissed)
		{
			var dismissedView = mui.get('#mui-modal-in');
			var returningView = mui.get('#mui-modal-out');
			var header = mui.get('header', dismissedView);

			if(header) mui.insertBefore(header, document.body.children[0]);
			
			// Re-appear
			this.appear();
			this._viewDidAppear();
			
			this._showingModalViewController.disappear();
			this._showingModalViewController._viewDidDisappear();
			
			// Remove temporary nodes
			mui.get('#mui-views').appendChild(this._showingModalViewController.view);
			mui.removeElement('#mui-modal-in');
			mui.removeElement('#mui-modal-out');
			
			// Reset modal properties
			this._showingModalViewController = null;
			this._modalTransition = null;
		}
		else
		{
			this._showingModalViewController._viewDidAppear();
			this._viewDidDisappear();
		}
	},
	
	/**
	 * This method defines the transition which will occur when this 
	 * viewController is set to appear on-screen. By default, if the
	 * viewController belongs to a navigationController, the transition
	 * will be a "push". To define a different transition, override this
	 * method in the viewController.
	 * @method getTransition
	 * @return {Object} Object literal containing type, direction values
	 */
	getTransition: function()
	{
		if(this.navigationController instanceof mui.NavigationController) return { type: 'push' };
		return false;
	},
	
	/**
	 * Set the root node for the view. If the second argument passed to the
	 * method is true, then it is assumed the node is already loaded. Otherwise,
	 * one must use setViewContent to trigger the viewDidLoad callback.
	 * @method setView
	 * @param el {String|HTMLElement} Selector string or HTML element for the view
	 * @param isLoaded {Boolean} Whether or not the HTML element is loaded. Default is false.
	 */
	setView: function(el, isLoaded)
	{
		this.view = (typeof el === 'string') ? mui.get(el) : el;
		mui.addClass(this.view, MUI_DOM.viewClassName);
		if(isLoaded)
		{
			var n = mui.createElement('div', { innerHTML: this.view.innerHTML });
			this.view.innerHTML = '';
			this._disableReload = true;
			this.setViewContent(n);
		}
		else this.view.setAttribute(MUI_DOM.loadingAttr, 'true');
	},
	
	/**
	 * Set the content for the view, either in the form of an HTML string, or an
	 * HTMLElement which will be appended to the view. This method triggers the
	 * viewDidLoad callback.
	 * @method setViewContent
	 * @param content {String|HTMLElement} the HTML String or HTMLElement
	 */
	setViewContent: function(content)
	{
		var node = mui.createElement('div', { className: MUI_DOM.viewContentClassName });
		var oldNode;
		
		if(!this._contentLoaded)
		{
			// node = mui.createElement('div', { className: MUI_DOM.viewContentClassName });
			this.view.appendChild(node);
			
			if(typeof content === 'string') node.innerHTML = content;
			else node.appendChild(content);

			// Initialize scroll view
			if(mui.ApplicationController.getInstance().shouldScrollViews)
			{
				this.scrollView = new mui.ScrollView( { element: this.view, contentSize: '100%' } );
			}
			
			this._contentLoaded = true
		}
		else
		{
			oldNode = mui.get('.mui-view-content', this.view);
			mui.removeElement(oldNode);
			
			if(this.scrollView && this.view.children[0]) this.scrollView.getScrollHost().appendChild(node);
			else this.view.appendChild(node);
			
			if(typeof content === 'string') node.innerHTML = content;
			else node.appendChild(content);			
		}

		this._viewDidLoad();
		this.view.removeAttribute(MUI_DOM.loadingAttr);
	},
	
	/**
	 * Append content for the view, either in the form of an HTML string, or an
	 * HTMLElement which will be appended to the view. This method DOES NOT trigger
	 * viewDidLoad callback.
	 * @method appendViewContent
	 * @param content {String|HTMLElement} the HTML String or HTMLElement
	 */
	appendViewContent: function(content)
	{
		if(!this._contentLoaded) return this.setViewContent(content);
		
		var node, viewC = mui.get('.mui-view-content', this.view), t;
		if(typeof content === 'string')
		{
			node = mui.createElement('div');
			node.innerHTML = content;
		}
		else node = content;

		viewC.appendChild(node);

	},
	
	/**
	 * Prepend content for the view, either in the form of an HTML string, or an
	 * HTMLElement which will be appended to the view. This method DOES NOT trigger
	 * viewDidLoad callback.
	 * @method prependViewContent
	 * @param content {String|HTMLElement} the HTML String or HTMLElement
	 */
	prependViewContent: function(content)
	{
		if(!this._contentLoaded) return this.setViewContent(content);
		
		var node, viewC = mui.get('.mui-view-content', this.view);
		if(typeof content === 'string')
		{
			node = mui.createElement('div');
			node.innerHTML = content;
		}
		else node = content;
		
		if(viewC.firstChild) mui.insertBefore(node, viewC.firstChild);
		else viewC.appendChild(node);
	},
	
	/**
	 * Fetch view content using mui.io. This method will trigger
	 * the viewDidLoad callback upon success
	 * @method fetchViewContent
	 * @param url {String} The URL of the view content
	 * @param callback {Function} Optional callback function invoked upon
	 *  XHR completion
	 */
	fetchViewContent: function(url, callback)
	{
		mui.io(url, {
			callback: {
				success: function(o) {
					this.setViewContent(o.responseText);
					if(callback) callback(true);
				},
				failure: function(o) {
					alert('Unable to load page. Please refresh');
					this.setViewContent('Unable to load page. Please refresh');
					if(callback) callback(false);
				},
				scope: this
			}
		});	
	},
	
	/**
	 * Utility method for fetching a JSON resource.
	 * @method fetchJSON
	 * @param url {String} The url of the resource
	 * @param callback {Function} The callback function to execute when the resource has loaded
	 * @param scope {Object} The scope to be applied to the callback function.
	 */	
	fetchJSON: function(url, callback, scope) 
	{
		mui.io(url, {
			method: 'get',
			callback: {
				success: function(o)  {
					try {
						var obj = eval('(' + o.responseText + ')');
						callback.call(scope || this, obj);
						
					} catch(e) {
					}
				},
				scope: this
			}
		});
	},
	
	/**
	 * Map an Object to a DOM node. The DOM node is assumed to have an HTML comment
	 * to avoid fetching of malfrormed resources via <img> or background-image: url()
	 * @method map
	 * @param data {Object} The object to map
	 * @param el {String|HTMLElement} The CSS selector or DOM node to map to
	 * @param nodeName {String} The tag name of the newly created DOM node
	 * @param nodeConfig {Object} Object literal of node configuration passed to mui.createElement
	 */
	map: function(data, el, nodeName, nodeConfig) 
	{
		return mui.map(data, el, nodeName, nodeConfig);
	},
	
	/**
	 * Set a navigation item to be displayed in the navigation bar
	 * @method setNavigationItem
	 * @param section {String} Which section to set the navigation item in
	 *  Possible values are leftBarItem, titleItem, rightBarItem
	 * @param item {*} Either an HTMLElement, or a mui control, such as a SearchBox
	 */ 
	setNavigationItem: function(section, item)
	{
		switch(section)
		{
			case 'leftBarItem':
			case 'title':
			case 'rightBarItem':
				this.navigationItems[section] = item;
				break;
			default:
				throw new Error('NavigationBar: Invalid section name: ' + section + '. Must be one of title, leftBarItem, or rightBarItem');
		}
		if(this.navigationController && this.navigationController.navigationBar && this._showing)
		{
			this.navigationController.navigationBar.setItems(this.navigationItems, false, false);
		}
	},
	
	/**
	 * Present a ViewController modally. If animated, the transition is defined
	 * by the modal view controller's transition property.
	 * @method presentModalViewController
	 * @param viewController {mui.ViewController} The ViewController to show
	 * @param params {Object} (Optional) Any request params to pass to the ViewController
	 * @param animated {Boolean} (Default true) Whether or not to animate the controller into view
	 */
	presentModalViewController: function(viewController, params, animated)
	{
		// Define default transition style (Slide from bottom to top)
		var transition = {
			type: 'slide',
			direction: 'bottom-to-top'
		};
		var doAnim = true;
		if(animated === false) doAnim = false;
		
		// Set the parentViewController and navigationController properties on the modal view controller
		viewController.parentViewController = this;

		// Animate or show
		mui.ApplicationController.getInstance().showModalViewController(viewController, params, this, doAnim);
	},
	
	/**
	 * Animate a modal viewController into view.
	 * @method animateModalViewController
	 * @param viewController {mui.ViewController} The ViewController to aniamte
	 * @param transition {Object} mui.Transition definition
	 */
	animateModalViewController: function(viewController, transition)
	{
		var inView = mui.createElement('div', { id: 'mui-modal-in' }),
		    outView = mui.createElement('div', { id: 'mui-modal-out' }),
		    outViewWrap = mui.createElement('div', { id: 'mui-views' }),
		    outViewStyle = outView.style,
		    header = mui.get('header'),
		    footer = mui.get('footer');
	
		outViewStyle.position = 'absolute';
		outViewStyle.top = '0';
		outViewStyle.left = '0';
		outViewStyle.width = '100%';
		outViewStyle.zIndex = '1';
		inView.style.zIndex = '3';
		inView.style.minHeight = outViewStyle.minHeight = (window.innerHeight)+'px';

		if(header) outView.appendChild(header.cloneNode(true));
		outViewWrap.appendChild(this.view.cloneNode(true));
		outView.appendChild(outViewWrap);
		if(footer) outView.appendChild(footer.cloneNode(true));
		
		if(header) inView.appendChild(header);
		inView.appendChild(viewController.view);

		document.body.appendChild(outView);
		document.body.appendChild(inView);
		
		this.disappear();
		viewController._viewWillAppear();
		viewController.appear();
		
		transition.onComplete = mui.bind(this._onModalTransitionEnd, this, false);
		
		var trans = new mui.Transition(inView, outView, transition);
		trans.execute();
	},
	
	/**
	 * Show a modal viewController.
	 * @method showModalViewController
	 * @param viewController {mui.ViewController} The ViewController to show
	 */
	showModalViewController: function(viewController)
	{
		this.disappear();
		viewController._viewWillAppear();
		viewController.appear();
	},
	
	/**
	 * Dismiss the currently showing modal viewController from the view.
	 * @method dismissModalViewController
	 */
	dismissModalViewController: function()
	{
		mui.ApplicationController.getInstance().dismissModalViewController(this);
		
		/*
		var transition = this._modalTransition;
		var inView = mui.get('#mui-modal-out');
		var outView = mui.get('#mui-modal-in');
		var trans;
		
		mui.ApplicationController.getInstance().toggleEvents(this._showingModalViewController, this);

		if(transition)
		{
			this._showingModalViewController._viewWillDisappear();
			this._viewWillAppear();
			
			// Animate
			transition.reverse = true;
			transition.onComplete = mui.bind(this._onModalTransitionEnd, this, true);
			trans = new mui.Transition(inView, outView, transition);
			trans.execute();
		}
		else
		{
			this._showingModalViewController._viewWillDisappear();
			this._showingModalViewController.disappear();
			this._showingModalViewController._viewDidDisappear();
			this._viewWillAppear();
			this.appear(true);
			this._viewDidAppear();
			
			// Reset modal properties
			this._showingModalViewController = null;
			this._modalTransition = null;
		}
		*/
	},
	
	/**
	 * Reload the contents of the view. This method will be called by the framework
	 * when this ViewController has been pushed onto a navigation stack, and later
	 * visited with a different set of request parameters.
	 * @method reoladView
	 * @param params {Object} Request parameters
	 */
	reloadView: function(params)
	{
		if(!this._disableReload)
		{
			this.view.setAttribute(MUI_DOM.loadingAttr, 'true');
			this.loadView(params);
		}
	},
		
	/**
	 * Load the view contents.  Override this method
	 * in implementation
	 * @method loadView
	 * @param params {Object} Any request params 
	 */
	loadView: function(params)
	{
		// Override this.
	},
	
	/**
	 * Unload the view contents. This just sets the _viewLoaded property to false
	 * @method unloadView
	 */
	unloadView: function()
	{
		this._viewLoaded = false;
	},
	
	/**
	 * View Load callback is fired every time the view is first loaded
	 * @method viewDidLoad
	 */
	viewDidLoad: function()
	{
		// Override
	},
	
	/**
	 * View Appear callback is fired every time the view is pushed
	 * on-screen
	 * @method _viewDidAppear
	 * @private
	 */
	_viewDidAppear: function()
	{
		if(this.isViewLoaded() && this.scrollView) setTimeout(mui.bind(this.scrollView.flashScrollBars, this.scrollView), scrollViewIdleDelay);
		if(typeof this.viewDidAppear === 'function') this.viewDidAppear();
		mui.ApplicationController.getInstance().positionViewController(this);
	},
	
	/**
	 * View Disappear callback is fired every time the view is taken 
	 * off-screen
	 * @method _viewDidDisappear
	 * @private
	 */
	_viewDidDisappear: function()
	{
		if(typeof this.viewDidDisappear === 'function') this.viewDidDisappear();
	},
	
	/**
	 * View Appear callback is fired before every time the view is pushed
	 * on-screen
	 * @method _viewWillAppear
	 * @private
	 */
	_viewWillAppear: function()
	{
		if(this.scrollView) this.scrollView.hideScrollBars();
		if(typeof this.viewWillAppear === 'function') this.viewWillAppear();
	},
	
	/**
	 * View Disappear callback is fired before every time the view is taken 
	 * off-screen
	 * 
	 * @param popping {Boolean} used to determine if the view is being popped
	 * 
	 * @method _viewWillDisappear
	 * @private
	 */
	_viewWillDisappear: function( popping )
	{
		if(this.scrollView) this.scrollView.hideScrollBars();
		if(typeof this.viewWillDisappear === 'function') this.viewWillDisappear( popping );
	},
	
	/**
	 * Make the view's contents visible
	 * @method appear	
	 */
	appear: function()
	{
		// Restore contents for current params
		var key = paramsToString(this.params);
		if(this._viewContents && this._viewContents[key])
		{
			if(this.scrollView && this.view.children[0])
			{
				this.scrollView.getScrollHost().innerHTML = '';
				this.scrollView.getScrollHost().appendChild(this._viewContents[key].element);
				this.scrollView.scrollTo(this._viewContents[key].scrollOffsets.x, this._viewContents[key].scrollOffsets.y, 0, null, true);
			}
			else 
			{
				this.view.innerHTML = '';
				this.view.appendChild(this._viewContents[key].element);
			}
		}
	
		// Notify navigationController
		if(this.navigationController) this.navigationController.viewControllerWillAppear(this); 

		// Show view node
		this.view.setAttribute(MUI_DOM.viewShowingAttr, 'true');
		
		// Set showing attribute
		this._showing = true;
	},
	
	/**
	 * Hide the view's contents
	 * @method disappear
	 */
	disappear: function()
	{
		// Hide view node		
		this.view.removeAttribute(MUI_DOM.viewShowingAttr);
		
		// Set showing attribute
		this._showing = false;
		
		if (this.cacheView) {
    		var node = {
                element: mui.get('.'+MUI_DOM.viewContentClassName, this.view)
            };
    		// Check for scroll offset
    		if(this.scrollView) node.scrollOffsets = this.scrollView.getScrollOffsets();
    		
    		// Store current contents
    		this._viewContents = this._viewContents || {};
    		this._viewContents[paramsToString(this.params)] = node;
    	}
    	
		// Flush navigationItems
		this.navigationItems = {};
	}
};

mui.ViewController = ViewController;
	
})();
