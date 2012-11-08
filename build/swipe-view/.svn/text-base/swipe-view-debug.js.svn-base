/**
 * SwipeView module
 * @module swipe-view
 */

(function() {

const ANIM_DUR = '550ms';

/**
 * The SwipeView class provides the ability to create a list of elements
 * which the user can swipe left and right to navigate through. The widget
 * assumes a particular markup structure of a <ul> where each <li> will
 * be sized to 1 full-screen width of content.
 * @class SwipeView
 * @constructor
 * @param el {String|HTMLElement} CSS selector or HTMLElement for the container
 */
function SwipeView( options )
{	
	var el = options["element"],
	    newpageCb = options["newpage"];
	
	if (newpageCb) this.newpage = newpageCb;
	
	// Initialize element
	this.element = mui.get(el);
	this.wrapper = document.createElement('div');
	this.wrapper.style.position = 'relative';
	this.wrapper.style.overflow = 'hidden';
	this.wrapper.style.width = '100%';
	this.wrapper.style.webkitUserSelect = 'none';
	mui.insertBefore(this.wrapper, this.element);
	this.wrapper.appendChild(this.element);
	this.element.style.position = 'absolute';
	
	// Initialize event handlers
	mui.on(this.element, 'touchstart', this);
	mui.on(window, 'orientationchange', this);
	
	// Run setup tasks
	this.setup();
}

SwipeView.prototype = {
	
	/**
	 * Push a translation value onto the stack
	 * @method _pushTranslation
	 * @param t {Number} The translation value
	 * @private
	 */
	_pushTranslation: function(t)
	{
		this.touches.translations.shift();
		this.touches.translations.push(t);
	},
	
	/**
	 * touchstart event handler
	 * @method _touchstart 
	 * @param e {Event} The event
	 * @private
	 */
	_touchstart: function(e)
	{
		var touch = e.touches ? e.touches[0] : e;
		
		this.touches.moving = false;
		this.touches.startTime = +(new Date);
		this.touches.startX = touch.clientX - this.touches.translations[1];
		this.touches.startPosX = touch.clientX;
		this.touches.offsetY = mui.getXY(this.element)[1];
		
		mui.on(this.element, 'touchmove', this);
		mui.on(this.element, 'touchend', this);
	},
	
	/**
	 * touchmove event handler
	 * @method _touchmove
	 * @param e {Event} The event
	 * @private
	 */
	_touchmove: function(e)
	{
		var touch = e.touches ? e.touches[0] : e;
		var t;
		
		e.preventDefault();

		this.touches.moving = true;
		this.touches.currentX = touch.pageX;
		this.touches.lastMoved = +(new Date);

		t = this.touches.currentX - this.touches.startX;
		this._pushTranslation(t);	

		// Moving element while swiping only supported for iPhone
		if(mui.UA.Apple)
		{
			this.scrollTo(t, '0s');
		}
	},
	
	/**
	 * touchend event handler
	 * @method _touchend
	 * @param e {Event} The event
	 * @private
	 */
	_touchend: function(e)
	{
		if(this.touches.moving)
		{
			// Account for min
			if(this.touches.translations[1] > this.touches.maxX)
			{
				this._pushTranslation(this.touches.maxX);
				this.scrollTo(this.touches.maxX, ANIM_DUR);				
			}
			// Account for max
			else if(this.touches.translations[1] < this.touches.minX)
			{
				this._pushTranslation(this.touches.minX);
				this.scrollTo(this.touches.minX, ANIM_DUR);				
			}
			else
			{
				var distance = this.touches.startPosX - this.touches.currentX;
				var timeElapsed = e.timeStamp - this.touches.startTime;
				var speed = distance / timeElapsed;

				// Case 1: Length of swipe is > 1/2 width of a card
				if(Math.abs(distance) > this.touches.thresholdDistance)
				{
					var pageMethod = (distance > 0) ? this.nextPage : this.previousPage;
					pageMethod.call(this);
				}
				// Case 2: Speed of swipe causes next/prev page, regardless of length of swipe
				else if(Math.abs(speed) >= .5)
				{					
					var pageMethod = (distance > 0) ? this.nextPage : this.previousPage;
					pageMethod.call(this);
				}
				// Last Case: no change, so snap into place
				else
				{
					this.snapIntoPlace();
				}	
			}			
		}
		
		mui.removeEventListener(this.element, 'touchmove', this);
		mui.removeEventListener(this.element, 'touchend', this);
	},
	
	/**
	 * transitionend event handler
	 * @method _transitionend
	 * @param e {Event} The event
	 * @private
	 */
	_transitionend: function(e)
	{
		
	},	
	
	/**
	 * orientationchange event handler
	 * @method _orientationchange
	 * @param e {Event} The event
	 * @private
	 */
	_orientationchange: function(e)
	{
        var ww = window.innerWidth, wh = window.innerHeight;

        // Initialize class members
        this.height = 0;
        this.itemOffsets = [];
        
        // Initialize LI children
        mui.each(mui.getAll('li', this.element), function(li, i) {
            li.style.width = ww+'px';
            this.height = Math.max(li.offsetHeight, this.height);
            this.itemOffsets.push(i*ww);
        }, this);
        
        // Set height and width
        this.wrapper.style.height = this.height+'px';
        this.element.style.width = ((this.totalPages+1)*ww)+'px';	
        
        this.snapIntoPlace();
        this.activatePage();
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
			case 'touchstart':
			case 'mousedown':
				this._touchstart(e);
				break;
			case 'touchmove':
			case 'mousemove':
				this._touchmove(e);
				break;
			case 'touchend':
			case 'mouseup':
				this._touchend(e);
				break;
			case 'orientationchange':
				this._orientationchange(e);
				break;
			case 'webkitTransitionEnd':
				this._transitionend(e);
				break;
		}
	},
	
	/**
	 * Activate the page at the currently set index
	 * @method activatePage
	 */
	activatePage: function()
	{
		// Activate card
		var active = mui.get('li.mui-active', this.element);
		var newActive = mui.getAll('li', this.element)[this.currentPage-1];
		mui.removeClass(active, 'mui-active');
		mui.addClass(newActive, 'mui-active');
		
		if (this.newpage) this.newpage( this.currentPage );
	},

	/**
	 * Goto the next page
	 * @method nextPage
	 */
	nextPage: function()
	{

		this.currentPage++;
		if(this.currentPage > this.totalPages) this.currentPage = this.totalPages;
		var x = this.itemOffsets[this.currentPage-1] * -1;
		this._pushTranslation(x);
		this.scrollTo(x, ANIM_DUR);
		this.activatePage();
	},

	/**
	 * Goto the previous page
	 * @method nextPage
	 */
	previousPage: function()
	{
		this.currentPage--;
		if(this.currentPage < 1) this.currentPage = 1;
		var x = this.itemOffsets[this.currentPage-1] * -1;
		this._pushTranslation(x);
		this.scrollTo(x, ANIM_DUR);
		this.activatePage();
	},

	snapIntoPlace: function()
	{
		var x = this.itemOffsets[this.currentPage-1] * -1;
		this._pushTranslation(x);
		this.scrollTo(x, ANIM_DUR);
	},
	
	/**
	 * Scroll the view to particular value, with an optional animation duration
	 * and timing function
	 * @method scrollTo
	 * @param x {Number} The x translation value
	 * @param duration {String} The duration, if animated
	 * @param timing {String} The timing function, if animated
	 * @return {SwipeView} The SwipeView instance
	 */
	scrollTo: function(x, duration, timing)
	{
		var trans = 'translate('+x+'px,0)';
		if(mui.UA.Apple) trans = 'translate3d('+x+'px,0,0)'; // iPhone prefers 3d translation (not supported on Android)
		
		duration = duration || '0s';
		timing = timing || 'cubic-bezier(0, 0.1, 0, 1.0)';

		mui.setStyle(this.element, '-webkit-transition-duration', duration);
		mui.setStyle(this.element, '-webkit-transition-timing-function', timing);
		mui.setStyle(this.element, '-webkit-transform', trans);			

		return this;
	},
	
	/**
	 * Setup the elements for the swipe view. This method is called upon
	 * instantation of a SwipeView, and on any orientation change to resize
	 * elements as needed.
	 * @method setup
	 * @return {SwipeView} The SwipeView instance
	 */
	setup: function()
	{
		// Declare local variables
		var ww = window.innerWidth, wh = window.innerHeight;

		// Initialize class members
		this.height = 0;
		this.currentPage = 1;
		this.totalPages = 0;
		this.itemOffsets = [];
		
		// Initialize LI children
		mui.each(mui.getAll('li', this.element), function(li, i) {
			li.style.display = 'inline-block';
			li.style.width = ww+'px';
			li.style.webkitTransform = (mui.UA.Apple) ? 'translate3d(0,0,0)' : 'translate(0,0)';
			this.height = Math.max(li.offsetHeight, this.height);
			this.itemOffsets.push(i*ww);
			this.totalPages++;
		}, this);
		
		// Set height and width
		this.wrapper.style.height = this.height+'px';
		this.element.style.width = ((this.totalPages+1)*ww)+'px';

		// Initialize touch state
		this.touches = {};
		this.touches.moving 		= false;
		this.touches.startTime 		= 0;
		this.touches.startX 		= 0;
		this.touches.currentX		= 0;
		this.touches.maxX		= 0;
		this.touches.startPosX 		= 0;
		this.touches.offsetY 		= mui.getXY(this.element)[1];
		this.touches.translations 	= [0,0];
		this.touches.lastMoved		= 0;
		this.touches.minX		= this.element.offsetWidth * -1;
		this.touches.thresholdDistance  = ww / 2;
		
		// Initial scrolls state
		this.scrollTo(0);
	}
	
};

mui.SwipeView = SwipeView;
	
})();
