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