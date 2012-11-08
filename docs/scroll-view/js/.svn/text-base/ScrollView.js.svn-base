/**
 * ScrollView module
 * @module scroll-view
 */

(function() {

// Acceleration, Velocity and Configuration constants
const FLICK_STRENGTH = 400;
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