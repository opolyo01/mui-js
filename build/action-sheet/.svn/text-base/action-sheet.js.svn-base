/**
 * actionsheet module
 * @module actionsheet
 */

(function() {

// static variable that holds the last opened action sheet.
// if another action sheet is about to be showned, this one will hide first to avoid 2 modal dialogs.
var AS_SHOWN = null;

/**
 * <p>
 * The ActionSheet class provides a modal view which slides up from
 * the bottom of the screen with 1 or more buttons, and a message. An example of this
 * is in the iPhone Safari Application, when you click the + button, an
 * action sheet view is displayed with options to bookmark the page. If the title is present,
 * that is displayed on the top of the aciton sheet. The order of the buttons are as follows:
 * </p>
 * <ol>
 * <li>destructive button (in red)</li>
 * <li>other buttons (in gray)</li>
 * <li>cancel button (in black)</li>
 * </ol>
 * <p>
 * The valid configuration attributes are:
 * <strong>title, cancelButton, destructiveButton, otherButtons</strong>
 * </p>
 * @class ActionSheet
 * @constructor
 * @param config {Object} ActionSheet commands configuration<br/>
 *   Possible configuration attributes:<br/>
 *   <strong>title</strong> (String) - the message displayed at the top of the action sheet when shown<br/>
 *   <strong>cancelButton</strong> (Object { title, action }) - the text for the cancel button, and URL or function for button activation<br/>
 *   <strong>destructiveButton</strong> (Object {title, action }) - the text for the destructive button, and URL or function for button activation<br/>
 *   <storng>otherButtons</strong> (Array) - Array of titles/actions for other buttons, which are shown between the destructive and cancel buttons <br/>
 * <br/>
 * Example: <br/>
 * var myActionSheet = new mui.ActionSheet({<br/>
 *   title: 'Blah blah blah',<br/>
 *   cancelButton: { title: 'Cancel' },<br/>
 *   destructiveButton: { title: 'Alert!', action: myAlertMethod },<br/>
 *   otherButtons: [<br/>
 *     { title: 'Option 1', action: '/options/1' },<br/>
 *     { title: 'Option 2', action: myOption2 }<br/>
 *   ]<br/>
 * });<br/>
 * myActionSheet.show();
 */
function ActionSheet(config)
{
	config = config || {};

	// Initialize properties	
	this.title = config.title;
	this.cancelButton = config.cancelButton;
	
	this.cancelButton = config.cancelButton;
	this.destructiveButton = config.destructiveButton;
	this.otherButtons = config.otherButtons;
	
	// Create elements
	
	// Root element
	this.element = mui.createElement('div', { className: 'mui-actionsheet' });
	
	// Content container
	this.contentEl = mui.createElement('div', { className: 'mui-actioncontainer' });
	
	// Title
	if(this.title)
	{
		this.titleEl = mui.createElement('div', { className: 'mui-title', innerHTML: this.title });
		this.contentEl.appendChild(this.titleEl);
	}
	
	// Destructive button
	if(this.destructiveButton)
	{
		this.destructiveButtonEl = mui.createElement('div', { 
			className: 'mui-action-button mui-destructive',
			innerHTML: '<a class="mui-action-a" href="#">'+(this.destructiveButton.title)+'</a>'
		});
		this.contentEl.appendChild(this.destructiveButtonEl);
	}
	
	// Other buttons
	if(this.otherButtons)
	{
		this.otherButtonElements = [];
		mui.each(this.otherButtons, function(otherButton) {
			var el = mui.createElement('div', { 
				className: 'mui-action-button mui-other', 
				innerHTML:  (otherButton.icon ? '<div class="mui-action-icon ' + otherButton.icon + '"></div>' : "") +
				            '<a class="mui-action-a" href="#">' + 
				                otherButton.title +
				            '</a>'
			});
			this.otherButtonElements.push(el);
			this.contentEl.appendChild(el);
		}, this);
	}
	
	// Cancel button	
	if(this.cancelButton)
	{
		this.cancelButtonEl = mui.createElement('div', {
			className: 'mui-action-button mui-cancel',
			innerHTML: '<a class="mui-action-a" href="#">'+this.cancelButton.title+'</a>'
		});
		this.contentEl.appendChild(this.cancelButtonEl);
	}

	// Insert element
	this.contentEl.style.webkitTransform = 'translate3d(0, '+window.innerHeight+'px, 0)';			
	this.element.appendChild(this.contentEl);
	document.body.appendChild(this.element);
};

ActionSheet.prototype = {
	
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
				this.buttonTarget = mui.getAncestorByClassName(e.target, 'mui-action-button');
				if(this.buttonTarget)
				{
					mui.addClass(this.buttonTarget, 'mui-depressed');
				}
				break;
			case 'touchmove':
			case 'mousemove':
				e.preventDefault();
				if(this.buttonTarget)
				{
					mui.removeClass(this.buttonTarget, 'mui-depressed');
					this.buttonTarget = null;
				}
				break;
			case 'touchend':
			case 'mouseup':			
			case 'click':
				e.preventDefault();
				if(this.buttonTarget)
				{
					this.hide();					
					mui.removeClass(this.buttonTarget, 'mui-depressed');
					if(!mui.hasClass(this.buttonTarget, 'mui-cancel'))
					{
						if(mui.hasClass(this.buttonTarget, 'mui-destructive'))
						{
							switch(typeof this.destructiveButton.action)
							{
								case 'function':
									this.destructiveButton.action();
									break;
								case 'string':
									window.location = this.destructiveButton.action;
									break;
							}
						}
						else
						{
							mui.each(this.otherButtonElements, function(buttonEl, index) {
								if(buttonEl === this.buttonTarget)
								{
								    var button = this.otherButtons[index]; 
									switch(typeof button.action)
									{
										case 'function':
											button.action();
											break;
										case 'string':
											window.location = button.action;
											break;
									}
								}
							}, this);
						}
					}
				} else if ( e.target == this.element ){
				    this.hide();
				}
				this.buttonTarget = null;
				break;
			case 'webkitTransitionEnd':
				this.element.removeAttribute('x-mui-showing');
				this.element.style.height = '0';
				this.element.style.opacity = '';
				mui.removeEventListener(this.element, 'webkitTransitionEnd', this);
				break;
		}
	},

	/**
	 * Show the ActionSheet dialog, transitioning from the bottom
	 * @method show
	 * @return {ActionSheet} The ActionSheet instance
	 */
	show: function()
	{
	    ActionSheet.hide();
	    
		this.element.style.height = (window.innerHeight+1)+'px';
		this.element.setAttribute('x-mui-showing', 'true');
		this.contentEl.style.webkitTransform = 'translate3d(0, '+(window.innerHeight-this.contentEl.offsetHeight)+'px, 0)';
		
		// Listen for events
		mui.on(this.element, 'touchstart', this);
		mui.on(this.element, 'touchmove', this);
		mui.on(this.element, 'click', this);

        AS_SHOWN = this;
        
		return this;
	},
	
	/**
	 * Hide the ActionSheet dialog
	 * @method hide
	 * @return {ActionSheet} The ActionSheet instance	
	 */
	hide: function()
	{
		mui.on(this.element, 'webkitTransitionEnd', this);		
		
		this.element.style.opacity = '0';
		this.contentEl.style.webkitTransform = 'translate3d(0, '+window.innerHeight+'px, 0)';		
		
		// Detach event listener
		mui.removeEventListener(this.element, 'touchstart', this);
		mui.removeEventListener(this.element, 'touchmove', this);
		mui.removeEventListener(this.element, 'touchend', this);

        AS_SHOWN = null;
        
		return this;		
	}
	
};

/**
 * Static function that allows closing any current ActionSheet.
 */
ActionSheet.hide = function(){
    var currAS = AS_SHOWN;
    
    if (currAS) {
        currAS.hide();
    }
    return currAS;
};

mui.ActionSheet = ActionSheet;
	
})();
