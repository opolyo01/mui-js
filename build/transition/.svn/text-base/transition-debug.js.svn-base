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
    
    outS.removeProperty("opacity");
    inS.removeProperty("opacity");
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
	
	if (this.options.fullscreen) {
	    this.inView.style.width = '';
	}
	
	//this.outView.style.width = '';
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

	// Declare width parameter
	this._offsetWidth = this.outView.offsetWidth;
    
	// Set position on parent container
	if(parentNode) this.inView.parentNode.style.position = 'relative';
	
	// Set defaults
	this.options.type = this.options.type || Transition.TYPE_PUSH;
	this.options.duration = (typeof this.options.duration != 'undefined') ? this.options.duration : Transition.DURATIONS[this.options.type];

	if(this.options.type === Transition.TYPE_SLIDE)
	{
		this.options.direction = this.options.direction || Transition.DIR_LEFT_TO_RIGHT;
	}
	
	if (typeof this.options.fullscreen == 'undefined'){
	    this.options.fullscreen = true;
	}
	
	if ( !(this.inView instanceof HTMLBodyElement) ){
        // Position incoming view
        this.inView.style.position = 'absolute';
	    this.inView.style.width = this.options.fullscreen ? "100%" : this._offsetWidth+'px';
    
        this.inView.style.left = '0';
        this.inView.style.top = '0';
        this.inView.style.display = 'block';
	}
    
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
		    if (this.options.reverse){
                this.inView.style.opacity = '1';
                this.outView.style.opacity = '1';  
            } else {
                this.inView.style.opacity = '0';  
            }
			setTimeout( mui.bind(function() { this._setTransitionProperties(['opacity']); }, this), 0 );
			break;
			
		// Push (default)
		case Transition.TYPE_PUSH:
		default:
		    this.options.timing = 'ease-in-out';
			this._translate(this.inView, (this.options.reverse ? -this._offsetWidth : this._offsetWidth)+'px', 0, 0);
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
				if (this.options.reverse){
                     this.outView.style.opacity = '0';     
                } else {
                    this.inView.style.opacity = '1';  
                }
			}, this), 1);
			break;
		
		// Push (default)
		case Transition.TYPE_PUSH:
		default:
			// setTimeout(mui.bind(function() {
				this._translate(this.outView, (this.options.reverse ? this._offsetWidth : -this._offsetWidth)+'px', 0, 0, this.options.duration);
				this._translate(this.inView, 0, 0, 0, this.options.duration, mui.bind(this._transitionEnd, this));
				
			// }, this), 0);
	}
	this.backupTimer = setTimeout( mui.bind(this._transitionEnd, this), (this.options.duration + 50) );
};


mui.Transition = Transition;
	
})();
