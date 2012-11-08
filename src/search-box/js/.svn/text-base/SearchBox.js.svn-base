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