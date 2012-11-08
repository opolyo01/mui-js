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
	saveStack: function()
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
			this.stack[0].viewController.reloadView(this.stack[0].viewController.params);
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
		if(typeof c == 'function') c = new c;
		c.navigationController = this;
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
		if(prevVc && !items.backItem)
		{
			items.back = prevVc.backTitle || prevVc.title || true;
			items.backAction = mui.bind(this.goBack, this);
		}
		else if(items.backItem) 
		{
		    items.back = items.backItem.title || true;
		    items.backAction = items.backItem.action;
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

mui.add('NavigationController', NavigationController);
	
})();

if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
