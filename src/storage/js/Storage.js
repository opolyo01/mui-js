/**
 * Storage module
 * @module storage
 */

(function() {

/**
 * The ResultSet class is a wrapper for Gears which emulates
 * the HTML5 SQLResultSet class.
 * @class ResultSet
 * @constructor
 * @param db {Database} A Gears database instance
 * @param rs {*} The Gears ResultSet from a call to database.execute
 */
function ResultSet(db, rs)
{
	this.insertId = db.lastInsertId;
	this.rowsAffected = db.rowsAffected;
	this.rows = new ResultSetRowList(rs);
}

ResultSet.prototype = {

	/**
	 * The id of the last SQL insert operation
	 * @property insertId
	 * @type Number
	 */
	insertId: null,
	
	/**
	 * The number of rows affected by the last SQL transaction
	 * @property rowsAffected
	 * @type Number
	 */
	rowsAffected: null,
	
	/**
	 * The result set rows for the SQL transaction
	 * @property rows
	 * @type ResultSetRowList
	 */
	rows: null

};

/**
 * The ResultSetRowList class is a wrapper for Gears which emulates
 * the HTML5 SQLResultSetRowList class.
 * @class ResultSetRowList
 * @constructor
 * @param rs {*} The Gears ResultSet from a call to database.execute
 */
function ResultSetRowList(rs)
{
	this.length = 0;
	this._items = [];
	while(rs.isValidRow())
	{
		var result = {};
		for(var i=0, len=rs.fieldCount(); i<len; i++)
		{
			result[rs.fieldName(i)] = rs.field(i);
		}
		this._items.push(result);
		this.length++;
		rs.next();
	}
};

ResultSetRowList.prototype = {

	/**
	 * Private property to store array of items in the result set list
	 * @property _items
	 * @type Array
	 * @private
	 */
	_items: null,
	
	/**
	 * The length of the current result set of items
	 * @property length
	 * @type Number
	 */
	length: null,

	/**
	 * Retrieve the result item at a given index
	 * @method item
	 * @param index {Number} The index
	 * @return {Object} The result item at the index
	 */
	item: function(index)
	{
		return this._items[index];
	}

};

/**
 * The Transaction class is a wrapper for Gears which emulates
 * the HTML5 Transaction class.
 * @class Transaction
 * @constructor
 * @param database {Database} The Gears database instance
 * @param error {Function} Error handler
 * @param success {Function} Success handler
 */
function Transaction(database, error, success)
{
	this._db = database;
	this._error = false;
}

Transaction.prototype = {

	/**
	 * Reference to the Gears database
	 * @property _db
	 * @type Database
	 * @private
	 */
	_db: null,
	
	/**
	 * Execute a SQL statement
	 * @method executeSql
	 * @param sql {String} The SQL statement
	 * @param params {Array} Array of param values for SQL 
	 * @param success {Function} Success callback function
	 * @param error {Function} Error callback function
	 */
	executeSql: function(sql, params, success, error)
	{	
		if (this._error) return;
		
		try {
			var rs = new ResultSet(this._db, this._db.execute(sql, params));
			if(rs && success){
				success(this, rs);
			} else if(!rs){
				this._error = true;
				if (error)
					error();
			}
		} catch(e) {
			if(error) error();
			this._error = true;
		}
	}
};

/**
 * The Storage class provides a facility for storing data. A full HTMl5 or
 * Gears database will be created using the open method. This class implements
 * the HTML5 Storage interface, in addition to exposing the database functionality
 * through executeSql
 * @class Storage
 * @static
 */

/*
 * Branch Storage for Gears
 */
function StorageGears(db)
{
	this._db = db;
}

/**
 * Open a database
 * @method open
 * @static
 * @param id {String} The id of the database to open
 * @param version {String} The version of the database to open
 * @param title {String} The title of the database to open  
 * @return {mui.Storage} The storage object
 */
StorageGears.open = function(id, version, title)
{
	var db;
	try {
		db = google.gears.factory.create('beta.database');
		db.open(id);	
	} catch(e) {
		return false;
	}
	
	return new StorageGears(db);
};

StorageGears.prototype = {
	
	/**
	 * Execute a database transaction. The first argument is the transaction
	 * callback which will execute SQL statements against the database. The
	 * second argument is the error callback, and the third argument is the
	 * success callback.
	 * @param transCb {Function} The transaction callback 
	 * @param errorCb {Function} The error callback
	 * @param successCb {Function} The success callback
	 */
	transaction: function(transCb, errorCb, successCb)
	{
		this._db.execute("BEGIN TRANSACTION");
		
		var transaction = new Transaction(this._db);
		transCb(transaction);

		if(transaction._error ){
			 this._db.execute("ROLLBACK");
			 if (errorCb)
				  errorCb(transaction); 
					  
		} else {			
			 this._db.execute("COMMIT");
			 if (successCb)
				  successCb(transaction);
		}
	}
};

var _openDatabases = {};
/*
 * Branch Storage for HTML5
 */
function StorageHtml5(db)
{
	this._db = db;
}

/**
 * Open a database
 * @method open
 * @static
 * @param id {String} The id of the database to open
 * @param version {String} The version of the database to open
 * @param title {String} The title of the database to open  
 * @return {mui.Storage} The storage object
 */
StorageHtml5.open = function(id, version, title)
{
	var db;
	if(id in _openDatabases){
		db = _openDatabases[id];
	}
	else{
		try {
			db = openDatabase(id, '', title, 200000);
			_openDatabases[id] = db;
		}
		catch(er){
			return false;
		}
	}
	var oStorage = new StorageHtml5(db);
	return oStorage;
};

StorageHtml5.prototype = {
	/**
	 * Execute a database transaction. The first argument is the transaction
	 * callback which will execute SQL statements against the database. The
	 * second argument is the error callback, and the third argument is the
	 * success callback.
	 * @param transCb {Function} The transaction callback 
	 * @param errorCb {Function} The error callback
	 * @param successCb {Function} The success callback
	 */
	transaction: function(transCb, errorCb, successCb)
	{
		this._db.transaction.apply(this._db, arguments);
	}
};

// Ensure mui namesapce
mui = mui || {};

// Define Storage
mui.Storage = (function() {
	if(typeof openDatabase === 'undefined') return StorageGears;
	return StorageHtml5;
})();
	
})();