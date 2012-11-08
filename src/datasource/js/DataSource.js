/**
 * The datasource module
 * @module datasource
 */

(function() {

/*
 * Constant to describe the cache type when mui.Storage is available
 * @final CACHETYPE_STORAGE
 * @type String
 * @private
 */
const CACHETYPE_STORAGE = 'storage';

/*
 * Constant to describe the cache type when mui.Storage is NOT available
 * @final CACHETYPE_ARRAY
 * @type String
 * @private
 */
const CACHETYPE_ARRAY = 'array';

/*
 * Constant used as a default key when no request parameters are used
 * @final REQ_DEFAULT
 * @type String
 * @private
 */
const REQ_DEFAULT = 'mui_default';

/**
 * (Taken from: http://developer.yahoo.com/yui/3/datasource/)
 * The DataSource Utility provides a consistent API for the retrieval of
 * data from arbitrary sources over a variety of supported protocols. The
 * only supported protocol at this time is a remote source over XHR. Thus, 
 * the same-domain policy applies.
 * @class DataSource
 * @constructor
 * @param config {Object} DataSource configuration
 */
function DataSource(config)
{
	if(!config.source && !config.name) {
		throw new Error('Either source or name must be specified to uniquely identify the datasource');
	}
	this.source = config.source;
	this.name = config.name;

	if(config.onRestore) {
		this.onRestore = config.onRestore;
	}

	if(config.cache)
	{
		this.cache 		= {};
		this.cache.id 		= config.cache.id || 'mui_datacache_'+(this.source || this.name);
		this.cache.version 	= config.cache.version || '';
		this.cache.title 	= config.cache.title || '';
		this.cache.max 		= config.cache.max || 10;
		this.cache.keepalive 	= config.cache.keepalive || { minutes: 30 };
		this.cache.type 	= (mui.Storage) ?  CACHETYPE_STORAGE : CACHETYPE_ARRAY;
		this.cache.contents	= [];
		this.restored		= true;
		
		if(this.cache.type === CACHETYPE_STORAGE){
			try {
				this.restored = false;
				//this.cache.tableName = this.source ? this.source.replace(/\./g,'').replace(/\//g,'_').replace(/\?/g, '__') : 'mui_table_'+this.name;
				this.cache.tableName = this.source ? this.source.replace(/[\?\:\\\/\*\>\<\|\.\%\&\"]+/g,'_') : 'mui_table_'+this.name;
				this.restoreCache();
			} catch(e) {
				this.cache.storage = null;
				this.cache.type = CACHETYPE_ARRAY;
				setTimeout(mui.bind(this.onRestore, this), 0);
			}
		}
		else {
			setTimeout(mui.bind(this.onRestore, this), 0);
		}
	}
}

/**
 * Resolve a request URL by identifying and appending URL parameters
 * to a base URL
 * @method _getRequestUrl
 * @param base {String} The base URL
 * @param params {String} The request string
 * @return {String} The request URL
 * @private
 */
function _getRequestUrl(base, params)
{
	var url = base || '';
	if(params){
		// Check the form: server.com/data
		if(url != '' && !/\?/.test(url)) url += '?';
		url += params;
	}
	return url;
}

/**
 * Check to see if a cached record has expired, according to the keepalive
 * property
 * @method _hasExpired
 * @param ts {Number} The timestamp of the cached entry
 * @param keepalive {Object} Object literal defining the keepalive time such as
 *  { hours: 1, minutes: 30 }
 * @private
 */
function _hasExpired(ts, keepalive){
	var hasExpired = false, maxTime = ts, currentTime = +(new Date);
	
	mui.iterate(keepalive, function(v, n) {
		switch(n)
		{
			case 'days':
				maxTime += 86400*v*1000;
				break;
			case 'hours':
				maxTime += 3600*v*1000;				
				break;
			case 'minutes':
				maxTime += 60*v*1000;
				break;
			case 'seconds':
				maxTime += v*1000;
				break;
		}
	});
	
	if(currentTime > maxTime) hasExpired = true;
	
	return hasExpired;
}

DataSource.prototype = {
	
	/**
	 * Placeholder method. Implement this method if you want to capture the 
	 * event when the database has been restored
	 * @method onRestore
	 */
	onRestore: function() {},
	
	/**
	 * Make a request to the dataSource. If caching is enabled, the 
	 * result of the request will be cached according to the keepalive
	 * and max entries set for the cache
	 * @method sendRequest
	 * @param request {String} Request parameter string
	 * @method callback {Object} Object literal defining success, failure functions,
	 * scope parameter, and any additional argument to be passed to the callbacks
	 * Example:
	 * myDataSource.sendRequest('content/mydata', {
	 *   success: mySuccess,
	 *   failure: myFailure,
	 *   scope: this,
	 *   argument: myArgs
	 * });
	 */
	sendRequest: function(request, callback) 
	{
		// First check if the request is in the cache
		var cached = this.getCachedEntry(request);
		if(cached){
			callback.success.apply(callback.scope || callback.success, [cached.response, callback.argument]);
			return;
		}
		
		// If not found in cache, make a request to server
		mui.io(_getRequestUrl(this.source, request), {
			callback: {
				success: function(o) {
					this.onSendSuccess(request, o.responseText);
					callback.success.apply(callback.scope || callback.success, [o.responseText, callback.argument]);
				},
				failure: function(o) {
					this.onSendFailure(o);
					if(callback.failure) callback.failure.apply(callback.scope || callback.failure, [o, callback.argument]);
				},
				scope: this
			}
		});
	},
	
	/**
	 * Callback method invoked upon a successful sendRequest
	 * @method onSendSuccess
	 * @param request {String} The request string
	 * @param response {String} The response text
	 */	
	onSendSuccess: function(request, response){
		if(this.cache){
			this.addToCache(request, response);
		}
	},
	
	/**
	 * Callback method invoked upon a failed sendRequest
	 * @method onSendFailure
	 * @param response {o} The response object
	 */
	onSendFailure: function(o){
		// @TODO handle error?
	},
	
	/**
	 * Add an item to the cache
	 * @method addToCache
	 * @param request {String} The request string
	 * @param response {String} The response text
	 */
	addToCache: function(request, response){
		request = request || REQ_DEFAULT;
		
		// Declare local variables
		var staleItems = [],
			record = {
				request: request,
				response: response,
				timestamp: +(new Date)
			};

		// If cache has exceeded max size, trim it up
		while(this.cache.contents.length >= this.cache.max){
			staleItems.push(this.cache.contents.shift());
		}
		
		// Push new record onto contents array
		this.cache.contents.push(record);
		
		// If using local storage...
		if(this.cache.storage){
			this.cache.storage.transaction(mui.bind(function(tx) {
				
				// Delete any stale items
				if(staleItems.length > 0){
					mui.each(staleItems, function(item) {
						tx.executeSql('DELETE FROM '+this.cache.tableName+' WHERE request = ?', [item.request]);
					}, this);
				}
				
				// Add new record
				tx.executeSql('INSERT INTO '+this.cache.tableName+' (request, response, timestamp) VALUES(?, ?, ?)', [record.request, record.response, record.timestamp]);
				
			}, this));
		}
	},
	
	/**
	 * Retrieve a record stored in the cache
	 * @method getCachedEntry
	 * @param request {String} The request string
	 * @return {*} The cached entry, if found
	 */
	getCachedEntry: function(request){
		var entry, i=0, len=this.cache.contents.length, e;
		request = request || REQ_DEFAULT;
		for(i; i<len; i++){
			e = this.cache.contents[i];
			if(e.request === request && !_hasExpired(e.timestamp, this.cache.keepalive)){
				entry = e;
				break;
			}
		}
		return entry;
	},
	
	/**
	 * Get all contents which have been locally cached
	 * @method getCache
	 * @return {Array} Array of cached items
	 */
	getCache: function(){
		return this.cache.contents;
	},
	
	/**
	 * Flush the contents of the cache
	 * @method flushCache
	 */
	flushCache: function()
	{
		this.cache.contents = [];
		if(this.cache.storage)
		{
			this.cache.storage.transaction(mui.bind(function(tx) {
				tx.executeSql('DROP TABLE '+this.cache.tableName, [], mui.bind(this.restoreCache, this));
			}, this));
		}
	},
	
	/**
	 * Restore the cache from the database
	 * @method restoreCache
	 */
	restoreCache: function()
	{
		var self = this;
		this.cache.contents = [];
		this.cache.storage = mui.Storage.open(this.cache.id, this.cache.version, this.cache.title);
		this.cache.storage.transaction(mui.bind(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS '+this.cache.tableName+' (request VARCHAR(32) PRIMARY KEY, response TEXT, timestamp INT)', [], mui.bind(function(tx) {				
				tx.executeSql('SELECT * FROM '+this.cache.tableName, [], mui.bind(function(tx, rs) {					
					if(rs && rs.rows && rs.rows.length > 0)
					{
						for(var i=0, len=rs.rows.length; i<len; i++)
						{
							if(!_hasExpired(rs.rows.item(i).timestamp, this.cache.keepalive))
							{
								this.cache.contents.push(rs.rows.item(i));
							}
							else
							{
								tx.executeSql('DELETE FROM '+this.cache.tableName+' WHERE request = ?', [rs.rows.item(i).request]);
							}
						}
					}
					this.restored = true;
					this.onRestore();
				}, this));
			}, this));
		}, this));
	}
	
};

mui.DataSource = DataSource;
	
})();