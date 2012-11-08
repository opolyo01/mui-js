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
