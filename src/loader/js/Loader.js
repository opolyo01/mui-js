/**
 * Loader module
 * @module loader
 */
(function() {

/**
 * The Loader utility allows for on-demand loading of library components
 * @class Loader
 */

/*
 * Loader config
 */
// @TODO: this will be CDN
var _base = '/mui/build/',
    _debug = false,
    _devMode = false,
    _syncStack = [],
    _asyncStack = [],
    _registeredModules = {},
    _syncLoaded = 0,
    _asyncLoaded = 0,
    _callback = null,
    _callbackCtx = null;

/*
 * mui module definitions
 */
var MUI 		= 'mui',
    ACTION_SHEET 	= 'action-sheet',
    GEO 		= 'geo',
    NAVIGATION_BAR	= 'navigation-bar',
    NAVIGATOR 		= 'navigator',
    PAGER 		= 'pager',
    SCROLL_VIEW 	= 'scroll-view',
    SEARCH_BOX 		= 'search-box',
    STORAGE 		= 'storage',
    SWIPE_VIEW 		= 'swipe-view',
    TAB_VIEW		= 'tab-view',
    TRANSITION 		= 'transition',
    WEB_APP 		= 'web-app',
	
    _modules		= {};

_modules['mui'] = {
	js: 'mui.js',
	css: 'reset.css'
},
_modules[ACTION_SHEET] = {
	js: 'ActionSheet.js',
	skins: ['default']
},
_modules[GEO] = {
	js: 'Geo.js'
},
_modules[NAVIGATION_BAR] = {
	js: 'NavigationBar.js',
	skins: ['default']
},	
_modules[NAVIGATOR] = {
	js: 'Navigator.js'
},
_modules[PAGER] = {
	js: 'Pager.js',
	skins: ['default']
},
_modules[SCROLL_VIEW] = {
	js: 'ScrollView.js'
},
_modules[SEARCH_BOX] = {
	js: 'SearchBox.js',
	skins: ['default']
},
_modules[STORAGE] = {
	js: 'Storage.js'
},
_modules[SWIPE_VIEW] = {
	js: 'SwipeView.js'
},
_modules[TAB_VIEW] = {
	js: 'TabView.js',
	skins: ['default']
},	
_modules[TRANSITION] = {
	js: 'Transition.js'
},
_modules[WEB_APP] = {
	skins: ['default'],
	required: [
		'storage', 'navigator', 'navigation-bar'
	],
	submodules: {			
		'application-controller': {
			js: 'ApplicationController.js'
		},
		'navigation-controller': {
			js: 'NavigationController.js'				
		},
		'view-controller': {
			js: 'ViewController.js'
		}
	}
};

/**
 * Insert a <script> into the document
 * @method insertScript
 * @param src {String} The script src
 * @param cb {Function} (Optional) Callback invoked on script load
 * @private
 */
function insertScript(src, cb) 
{
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	if(cb) script.addEventListener('load', cb, false);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function insertStylesheet(src)
{
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', src);
	document.getElementsByTagName('head')[0].appendChild(link);
}

function afterLoad(e, async)
{	
	if(async) _asyncLoaded++;
	else _syncLoaded++;
	
	var stack = async ? _asyncStack : _syncStack;
	var counter = async ? _asyncLoaded : _syncLoaded;
	var args = arguments;

	if(_syncLoaded === _syncStack.length && _asyncLoaded === _asyncStack.length && _callback)
	{
		_callback.call(_callbackCtx || _callback);
	}
	else if(counter < stack.length)
	{
		var mod = stack[counter];
		var path;
		if(typeof mod === 'string')
		{
			require(mod, async);
			// path = _base+mod+'/'+mod;
			// path += _debug ? '.js' : '-min.js';
			// 
			// // Check skins
			// if(_modules[mod].skins)
			// {
			// 	mui.each(_modules[mod].skins, function(skin) {
			// 		var cssPath = _base+mod+'/assets/skins/'+skin+'/'+mod+'.css'
			// 		insertStylesheet(cssPath);
			// 	});
			// }
		}
		else if(typeof mod === 'object' && mod.path)
		{
			path = mod.path;
			insertScript(path, mui.bind(afterLoad, window, args[1]));
		}
	}	
}

/**
 * Require a module
 * @method require
 * @private
 */
function require(module, async)
{
	var mod = _modules[module];
	var path, cssPath;
	if(!mod) return false;
	
	if(_devMode)
	{
		if(mod.js)
		{
			path = _base+module+'/js/'+mod.js;
			insertScript(path, mui.bind(afterLoad, window, async));
		}
		else if(mod.submodules)
		{
			mui.iterate(mod.submodules, function(s, n) {
				path = _base+module+'/js/'+s.js;
				insertScript(path, mui.bind(afterLoad, window, async));
			});
		}

		if(mod.skins)
		{
			mui.each(mod.skins, function(skin) {
				cssPath = _base+module+'/assets/skins/'+skin+'/'+module+'-skin.css';
				insertStylesheet(cssPath);
			});
		}
	}
	else
	{
		path = _base+module+'/'+module;
		path += _debug ? '.js' : '-min.js';
		
		insertScript(path, mui.bind(afterLoad, window, async));		
	}
}

/**
 * Require core mui
 * @param cb {Function} Callback method
 * @private
 */
function requireCore(cb)
{
	var module = MUI;
	var mod = _modules[module];
	var path, cssPath;
	if(_devMode)
	{
		path = _base+module+'/js/'+mod.js;
	}
	else
	{
		path = _base+module+'/'+module;
		path += _debug ? '.js' : '-min.js';
		cssPath = _base+module+'/'+module+'/assets/reset.css';
	}
	cssPath = _base+module+'/assets/reset.css';

	insertStylesheet(cssPath);
	insertScript(path, cb);
}

/**
 * Check if a user-defined module is required by another module
 * @method isRequired
 * @param module {Object} The module to check
 * @param extras {Array} Array of extra modules 
 * @private
 */
function isRequired(module, extras)
{
	var isRequired = false;
	for(var i=0, len=extras.length; i<len; i++)
	{
		var requires = extras[i].requires;
		if(requires)
		{
			for(var j=0, len2=requires.length; j<len2; j++)
			{
				if(requires[j].module === module.module)
				{
					isRequired = true;
					break;
				}
			}
		}
	}
	return isRequired;
}

/**
 * Load a module or set of modules from mui. Additionally,
 * user-created modules can also be required by proving a path
 * to the script. 
 * @method load
 * @param modules {Array} List of mui modules to load
 * @param options {Object} Additional loading options, including extras and callback. See example.
 * Example:
 * 	mui.load(['transition', 'web-app'], {
 * 		base: '../../../build',
 *		extras: {
 *       		js: [
 *       			{ name: 'Base', path: 'Base.js' },
 *       			{ name: 'MainModule', path: 'main-module.js', requires: [ 'Base' ] },
 *       			{ name: 'SubModule', path: 'submodule.js', requires: [ 'MainModule' ] }
 *       		],
 *       		css: [
 *       			'myCss.css'
 *       		]
 *       	},
 *       	callback: {
 *       		complete: myApp.success,
 *       		scope: myApp
 *       	}
 *	});
 */
function load(modules, options)
{	
	// Initialize options
	options = options || {};
	options.callback = options.callback || {};

	_base = options.base || _base;
	_callback = options.callback.complete;
	_callbackCtx = options.callback.scope;
	_debug = (options.debug === true) ? true : false;
	_devMode = (options.developmentMode === true) ? true : false;
	
	// Require core
	requireCore(function() {

		// Gather sync, async stacks for mui libs
		mui.each(modules, function(m) {
			if(!_modules[m].required)
			{
				_asyncStack.push(m);
			}
			else
			{
				mui.each(_modules[m].required, function(m2) {
					_syncStack.push(m2);
				});
				_syncStack.push(m);
			}
		});
		
		// Do same for user modules
		if(options.extras)
		{
			if(options.extras.js)
			{
				mui.each(options.extras.js, function(e) {
					if(!e.requires && !isRequired(e, options.extras.js))
					{
						_asyncStack.push(e);
					}
					else if(e.requires)
					{
						mui.each(e.required, function(e2) {
							for(var i=0,len=options.extras.js.length; i<len; i++)
							{
								if(options.extras.js[i].module === e2)
								{
									_syncStack.push(options.extras.js[i]);
									break;
								}
							}
						});
						_syncStack.push(e);
					}
					else
					{
						_syncStack.push(e);
					}
				});
			}
			
			if(options.extras.css)
			{
				mui.each(options.extras.css, mui.bind(insertStylesheet, window));
			}
		}

		// var mod = _syncStack[0];
		// var path;
		// if(typeof mod === 'string')
		// {
		// 	path = _base+mod+'/'+mod;
		// 	path += _debug ? '.js' : '-min.js';
		// }
		// else if(typeof mod === 'object' && mod.path)
		// {
		// 	path = mod.path;
		// }
		// 
		// insertScript(path, mui.bind(afterLoad, window, false));
		require(_syncStack[0], false);
		
		// mod = _asyncStack[0];
		// if(typeof mod === 'string')
		// {
		// 	path = _base+mod+'/'+mod;
		// 	path += _debug ? '.js' : '-min.js';			
		// }
		// else if(typeof mod === 'object' && mod.path)
		// {
		// 	path = mod.path;
		// }
		// 
		// insertScript(path, mui.bind(afterLoad, window, true));
		require(_asyncStack[0], true);

	});
}

mui = window.mui || {};
mui.load = load;
	
})();