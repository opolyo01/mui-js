(function() {

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
			containerWidth,
			containerLeft,
		    maxWidth = this.element.offsetWidth - 30,
			backWidth = this._backElement ? this._backElement.offsetWidth : 0,
			rightBarWidth = this._rightBarItemElement ? this._rightBarItemElement.offsetWidth : 0,
			leftBarWidth = this._leftBarItemElement ? this._leftBarItemElement.offsetWidth : 0;
		
		this.title = title;
		
		el.innerHTML = '';
		mui.addClass(el, 'mui-noleft');
		el.appendChild(container);
		
		if(mui.SearchBox && title instanceof mui.SearchBox)
		{
			mui.addClass(container, 'mui-block');
			if(!backWidth) mui.addClass(container, 'mui-wide');
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
		
		if(backWidth && container)
		{
		    mui.removeClass(el, 'mui-noleft');
			left = backWidth;
			maxWidth -= left;
		}
		if(rightBarWidth && container)
		{
			right = rightBarWidth;
			maxWidth -= right;
		}
		if(leftBarWidth && container)
		{
		    mui.removeClass(el, 'mui-noleft');
			left = leftBarWidth;
			maxWidth -= left;
		}   

        mui.setStyle(container, 'max-width', maxWidth+'px'); 
        
        containerWidth = container.offsetWidth;
        containerLeft = container.offsetLeft;
        
        if(backWidth && container)
        {
            container.style.marginLeft = '-'+backWidth+'px';
            if(containerLeft <= (el.offsetLeft+3))
            {
                container.style.marginLeft = '';
                mui.addClass(container, 'mui-block');
            }
        }
        if(rightBarWidth && container)
        {
            container.style.marginRight = '-' + rightBarWidth+'px';
            xy = mui.getXY(this._rightBarItemElement);
            if((containerLeft + containerWidth) >= xy[0])
            {
                container.style.marginRight = '';
                mui.addClass(container, 'mui-block');
            }
        }
        if(leftBarWidth && container)
        {
            container.style.marginLeft = '-' + leftBarWidth+'px';
            if(containerLeft <= left)
            {
                container.style.marginLeft = '';
                mui.addClass(container, 'mui-block');
            }
        }
            
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
		mui.on(window, 'orientationchange', mui.bind(function() { if(this.title) this.setTitle(this.title); }, this));
	}
	
};

mui.NavigationBar = NavigationBar;

})();
