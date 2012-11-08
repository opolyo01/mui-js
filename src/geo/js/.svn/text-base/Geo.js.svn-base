/**
 * GeoLocation module
 * @module geo
 */

/**
 * The Geo Utility allows access to location data for devices which 
 * have an on-board GPS. Currently supported methods of extracting 
 * geolocation information is via HTML5 Location API or Gears.
 * @class Geo
 * @static
 */

(function() {

/*
 * Custom location handler
 */
var _handler = null;

/*
 * Shared success location handler
 */
function _success(loc)
{
	if(!loc)
	{
		_handler(false);
		return;
	}
	// HTML5 uses coords
	loc = !loc.latitude ? loc.coords : loc;
	_handler([loc.latitude, loc.longitude]);
}

/*
 * Shared failure location handler
 */
function _failure()
{
	_handler(false);
}

/*
 * Gears Location API
 */
var GeoGears = {

	/*
	 * _getLocation implementation
	 */
	_getLocation: function()
	{
		var geo = google.gears.factory.create('beta.geolocation');
		try {
			geo.getCurrentPosition(_success, _failure, { enableHighAccuracy: true });
		} catch(e) { _handler(false); }
	}

};

/*
 * HTML5 Location API
 */
var GeoHtml5 = {
	
	/*
	 * _getLocation implementation
	 */
	_getLocation: function()
	{
		navigator.geolocation.getCurrentPosition(_success, _failure);
	}
};

/*
 * Base Interface
 */
var GeoBase = {
	
	/**
	 * Check to see if the device supports location, either via 
	 * HTML5 Location API or Gears. 
	 * @method isCapable
	 * @return {Boolean} Whether or not the device supports location data
	 */
	isCapable: function()
	{
		return mui.UA.Gears || navigator.geolocation;
	},
	
	/**
	 * Get the user's current location
	 * @method getLocation
	 * @param handler {Function} A function which will be called upon
	 *   a success or failed location lookup. The function will receive
	 *   an array of lat/lon coordinates such as [12.3, 45.6], or false
	 *   if there was an error.
	 */
	getLocation: function(handler) 
	{
		if(!this.isCapable()) { handler(false); return; }
		
		_handler = handler;
		this._getLocation();
	}
};


// Augment Gears
mui.augment(GeoGears, GeoBase);

// Augment HTML5
mui.augment(GeoHtml5, GeoBase);

// Define class
mui.Geo = (function() {
	return mui.UA.Gears ? GeoGears : GeoHtml5;
})();
	
})();