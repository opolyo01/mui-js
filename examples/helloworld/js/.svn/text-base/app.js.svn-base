/*****************************************
 * App Namespace
 ****************************************/
HelloWorld = {};

/*****************************************
 * App Config
 ****************************************/
HelloWorld.AppConfig = {
	id: 'mui_helloworld',
	version: '1.0',
	title: 'mui Hello World',
	persistenceMode: 'all'
};

/*****************************************
 * Define Navigation Controllers
 ****************************************/
/**
 * Navigation Controller for first tab
 * @property NavController1
 * @type mui.NavigationController
 */
HelloWorld.NavController1 = new mui.NavigationController({

	/**
	 * The NAME property is used by the framework to dispatch routes
	 * @property NAME
	 * @type String
	 */
	NAME: 'section1',

	/**
	 * The viewControllers is an array of ViewController's which will
	 * belong to this navigation controller's stack history
	 * @property viewControllers
	 * @type Array
	 */
	viewControllers: [
		new mui.ViewController({
			/**
			 * The NAME property is used by the framework to dispatch routes
			 * @property NAME
			 * @type String
			 */
			NAME: 'screen1',
			
			/**
			 * The title attribute is used to display in the navigation bar's 
			 * title area
			 * @property title
			 * @type String
			 */
			title: 'Tab 1 of 3',
			
			/**
			 * The loadView method is called by the framework to initialize the view
			 * for this viewController
			 * @method loadView
			 * @param params {Object} Request parameters
			 */
			loadView: function(params)
			{
				// First, set the view node. Passing true as the 2nd argument signals that the view element is already loaded
				this.setView('#tab-1-view-1', true);
				
				// Set a toolbar button in the navigation bar
				this.setNavigationItem('rightBarItem', mui.createElement('button', { className: 'mui-button', innerHTML: 'Button' }));
			},
			
			/**
			 * Implementing the clicked method allows the viewController to respond to click events
			 * @method clicked
			 * @param e {Event} The click event
			 */
			clicked: function(e)
			{
				HelloWorld.AppController.openUrl('/section1/screen2');
			}
		}),
		
		new mui.ViewController({
			NAME: 'screen2',
			
			title: 'Screen 2',
			
			loadView: function(params)
			{
				// Passing true as the 2nd argument to setView will signal
				// to the ViewController that the view is already loaded in
				// the DOM, so subsequent calls to loadView will do nothing
				this.setView('#tab-1-view-2', true);
				
				// Initialize items from database
				this.buildUI();
			},
			
			viewDidAppear: function()
			{
				mui.on('#new-item-form', 'submit', this.saveItem, this);
			},
			
			viewDidDisappear: function()
			{
				mui.removeEventListener('#new-item-form', 'submit', this.saveItem, this);
			},
			
			buildUI: function()
			{
				// Example of using local storage. Each mui.ApplicationController instance
				// will have a reference to a mui.Storage object, unless the user has declined
				// the option to use local storage (for Gears). The Storage API follows the
				// HTML5 Web Database spec: http://dev.w3.org/html5/webdatabase/
				// It is important to account for those users who decline the database privilege
				if(HelloWorld.AppController.storage)
				{
					// Initiate a database transaction
					HelloWorld.AppController.storage.transaction(mui.bind(function(tx) {
						
						// Create a table for dummy data
						tx.executeSql('CREATE TABLE IF NOT EXISTS dummy(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, value TEXT NOT NULL);', [], mui.bind(function(tx, rs) {
							
							// Retrieve any items which have been previously set
							tx.executeSql('SELECT * FROM dummy', [], mui.bind(function(tx, rs) {

								// Store items
								var items = [];
								var itemsNode = mui.get('#items', this.view);

								// Iterate over transaction results
								for(var i=0, len=rs.rows.length; i<len; i++)
								{
									items.push(rs.rows.item(i));
								}
								
								// Display items
								if(items.length > 0)
								{
									mui.each(items, function(item) {
										itemsNode.appendChild(this.map(item, '#tpl-saved-item'));
									}, this);
								}
								
							}, this));
						}, this));

					}, this));
				}
				else
				{
					this.setViewContent('Database access denied!');
				}
			},
			
			saveItem: function(e)
			{
				// Prevent form submission
				e.preventDefault();
				
				// Get name and value
				var name = mui.get('#new-name').value;
				var value = mui.get('#new-value').value;
				
				// Show error message if both fields aren't there
				if(name.length === 0 || value.length === 0)
				{
					alert('Please enter both a name and a value');
					return;
				}
				
				// If storage is available, save to database
				if(HelloWorld.AppController.storage)
				{
					HelloWorld.AppController.storage.transaction(mui.bind(function(tx) {
						tx.executeSql('INSERT INTO dummy (name, value) VALUES (?, ?)', [name, value]);
					}, this));
				}
				
				// Update UI by binding data item to temlate stored in DOM
				mui.get('#items', this.view).appendChild(
					this.map({ 
						name: name, 
						value: value 
					}, '#tpl-saved-item'));

				// Reset inputs
				e.target.reset();
			},
			
			removeAll: function()
			{
				if(HelloWorld.AppController.storage)
				{
					HelloWorld.AppController.storage.transaction(mui.bind(function(tx) {
						tx.executeSql('DELETE FROM dummy');
					}, this));
				}
				mui.get('#items').innerHTML = '';
			},
			
			clicked: function(e)
			{
				if(e.target.id === 'remove-all')
				{
					this.removeAll();
				}
				else
				{
					HelloWorld.AppController.openUrl('/section1/screen3');
				}
			}
			
		}),
		
		new mui.ViewController({
			/**
			 * The NAME property is used by the framework to dispatch routes
			 * @property NAME
			 * @type String
			 */
			NAME: 'screen3',

			/**
			 * The title attribute is used to display in the navigation bar's 
			 * title area
			 * @property title
			 * @type String
			 */
			title: 'Screen 3',

			/**
			 * Setting the requires attribute to an array of Strings representing
			 * other viewController NAME's in the navigationController's stack will
			 * make sure that those views are set in the navigation stack. The views
			 * are not loaded until they are visited.
			 * @property requires
			 * @type Array
			 */
			requires: [ 'screen1', 'screen2' ],
			
			/**
			 * loadView implementation
			 * @method loadView
			 */
			loadView: function()
			{
				this.setView('#tab-1-view-3', true);
			}
		})
	]
	
});

/**
 * Navigation Controller for second tab
 * @property NavController2
 * @type mui.NavigationController
 */
HelloWorld.NavController2 = new mui.NavigationController({

	/**
	 * The NAME property is used by the framework to dispatch routes
	 * @property NAME
	 * @type String
	 */
	NAME: 'section2',
	
	/**
	 * The viewControllers is an array of ViewController's which will
	 * belong to this navigation controller's stack history
	 * @property viewControllers
	 * @type Array
	 */
	viewControllers: [
		new mui.ViewController({
			/**
			 * The NAME property is used by the framework to dispatch routes
			 * @property NAME
			 * @type String
			 */
			NAME: 'screen1',
			
			/**
			 * Title of the vieController
			 * @property title
			 * @type String
			 */
			title: 'Tab 2 of 3',
			
			/**
			 * The SearchBox control allows you to place a search field in the
			 * navigation bar.
			 * @property searchBox
			 * @type mui.SearchBox
			 */
			searchBox: new mui.SearchBox({
				placeholder: 'Search Box',
				callback: {
					submit: function(e, query) {
						alert('Typed: ' + query);
					}
				}
			}),

			/**
			 * The loadView method is called by the framework to initialize the view
			 * for this viewController
			 * @method loadView
			 * @param params {Object} Request parameters
			 */
			loadView: function(params)
			{
				// First, set the view node
				this.setView('#tab-2-view-1');
				
				// Next build the view contents. The fetchViewContent method is a helper
				// method for loading a URL over XHR and setting the view content to the
				// HTML response.  
				// NOTE: Using a setTimeout in order to show loading state
				setTimeout(mui.bind(this.fetchViewContent, this, 'views/tab2_1.html'), 1000);
			},
			
			/**
			 * The viewWillAppear method is called by the framework just before the view is shown
			 * on-screen.  This is a good time to set navigation items
			 * @method viewWillAppear
			 */
			viewWillAppear: function()
			{
				this.setNavigationItem('title', this.searchBox);
			},
			
			/**
			 * Clicked implementation
			 * @method clicked
			 */
			clicked: function(e)
			{
				HelloWorld.AppController.openUrl('/section2/screen2');
			}
		}),
		
		new mui.ViewController({
			NAME: 'screen2',
			
			title: 'Screen 2',
			
			loadView: function(params)
			{
				this.setView('#tab-2-view-2');
				this.setViewContent('Tab 2, Screen 2');
			}
		})
	]
	
});

/**
 * Navigation Controller for first tab
 * @property NavController3
 * @type mui.NavigationController
 */
HelloWorld.NavController3 = new mui.NavigationController({

	/**
	 * The NAME property is used by the framework to dispatch routes
	 * @property NAME
	 * @type String
	 */
	NAME: 'section3',
	
	/**
	 * The viewControllers is an array of ViewController's which will
	 * belong to this navigation controller's stack history
	 * @property viewControllers
	 * @type Array
	 */
	viewControllers: [
		new mui.ViewController({
			/**
			 * The NAME property is used by the framework to dispatch routes
			 * @property NAME
			 * @type String
			 */
			NAME: 'screen1',
			
			/**
			 * Title of the viewController
			 * @property title
			 * @type String
			 */
			title: 'Tab 3 of 3',
			
			/**
			 * The loadView method is called by the framework to initialize the view
			 * for this viewController
			 * @method loadView
			 * @param params {Object} Request parameters
			 */
			loadView: function(params)
			{
				// First, set the view node
				this.setView('#tab-3-view-1');
				
				// Next build the view contents. 
				this.setViewContent('Tab 3, Screen 1');
			}
		})
	]
	
});

/*****************************************
 * Define Application Controller
 ****************************************/
HelloWorld.AppController = new mui.ApplicationController(HelloWorld.AppConfig);

/* Implement appDidFinishLaunching */
HelloWorld.AppController.appDidFinishLaunching = function()
{
	// Set tabs element
	this.setTabsElement('#tabs');
	
	// Register NavigationControllers
	this.registerController(HelloWorld.NavController1, '#tab-1');
	this.registerController(HelloWorld.NavController2, '#tab-2');
	this.registerController(HelloWorld.NavController3, '#tab-3');
	
	// Open initial URL
	this.restore('/section1/screen1');
};

/* Initialize App */
mui.on(document, 'DOMContentLoaded', mui.bind(HelloWorld.AppController.initialize, HelloWorld.AppController));