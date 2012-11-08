/**
 * Application Framework module
 * @module framework
 */

/*
 * Global DOM reference
 * @final DOM
 */
const MUI_DOM = {
	/* Common */
	loadingAttr: 'x-mui-loading',
	
	/* Views */
	viewClassName: 'mui-view',
	viewContentClassName: 'mui-view-content',
	viewShowingAttr: 'x-mui-showing'
};

(function() {

/**
 * Application controller constructor
 * @class ApplicationController
 * @constructor
 * @param config {Object} Application configuration must include
 * id, title, version 
 */
function ApplicationController(config)
{
    if (config){
    	this.appInfo = config;
    	this.appInfo.transitionsEnabled = (this.appInfo.transitionsEnabled === false) ? false : true;
    	if(!mui.UA.Safari || mui.UA.Chrome) this.appInfo.transitionsEnabled = false;
    	
    	if(mui.UA.Chrome && this.appInfo.scrollViews) this.appInfo.scrollViews.chromeMode = this.appInfo.scrollViews.fullScreenMode = false;
    }
    
	return this;
};

/**
 * Return the instance of mui.ApplicationController
 * @method getInstance
 * @return the mui.ApplicationController instance
 * @static
 */
ApplicationController.getInstance = function()
{
	return _instance;
};

/**
 * Convenience utility for detecting object equality
 * @method objectsEqual
 * @param o1 {Object} The first object
 * @param o2 {Object} The second object
 * @return {Boolean} True if objects are equal, or false otherwise
 * @static
 */
ApplicationController.objectsEqual = function(o1, o2)
{
	var i;
	
	if(typeof o1 === 'undefined') o1 = {};
	if(typeof o2 === 'undefined') o2 = {};
	
	for(i in o1)
	{
		if(o1.hasOwnProperty(i))
		{
			if(!o2.hasOwnProperty(i) || o2[i] != o1[i] ) return false;
		}
	}
	for(i in o2) 
	{
		if(o2.hasOwnProperty(i))
		{
			if(!o1.hasOwnProperty(i) || o1[i] != o2[i] ) return false;
		}
	}
	return true;
};

ApplicationController.SPLITVIEW_LAYOUT_DEFAULT = 'default';
ApplicationController.SPLITVIEW_LAYOUT_TOP_BOTTOM = 'top-bottom';

/**
 * Normalize window object
 */
var window = window || document.defaultView;

/**
 * Cache instance variable
 */
var _instance = null;

ApplicationController.prototype = {

	/**
	 * Array of registered controllers
	 * @property _controllers
	 * @type Array
	 * @private
	 */
	_controllers: null,
	
	/**
	 * Reference to the mui.TabView object, if tabs are used
	 * @property _tabView
	 * @type mui.TabView
	 * @private
	 */
	_tabView: null,
	
	_localData: {},
	
	/**
	 * Information about the viewport, such as whether or not full-screen
	 * is activated
	 * @property viewportInfo
	 * @type Object
	 */
	viewportInfo: null,
	
	/**
	 * Reference to the currently visible view controller
	 * @property visibleViewController
	 * @type mui.ViewController
	 */
	visibleViewController: null,
	
	/**
	 * State variable used to determine if view is being popped
	 * @property popping
	 * @type Boolean
	 */
	popping: false,
	
	/**
	 * Whether or not views should be made into mui.ScrollViews's
	 * @property shouldScrollViews
	 * @type Boolean
	 */
	shouldScrollViews: false,

	/**
	 * Orientation change handler passes notification to any active view controllers
	 * @method _onOrientationChange
	 * @private
	 */
	_onOrientationChange: function()
	{
		var orient = window.orientation, willChangeOrientation = '_willChangeOrientation', visibleVC = this.visibleViewController, parentVC;
		if(typeof orient == 'undefined')
		{
			orient = (window.innerWidth > window.innerHeight) ? 90 : 0;
		}
		if(visibleVC && typeof visibleVC[willChangeOrientation] == 'function') 
		{
            parentVC = visibleVC.parentViewController
            if( parentVC ){
                this.positionViewController(parentVC);

                //displaying parent view temporarily for resizing detail view's scrollview    
                var detailVC = parentVC.getDetailViewController();
                var originalParentVCDisplay = parentVC.view.style.display;

                if (detailVC && detailVC.view && visibleVC.modalOpts.type == mui.ViewController.MODAL_MASTER) {

                    //display parent view
                    parentVC.view.style.display = 'block'; 

                    // hide parent view after all detail view scrollview re-calculated when modal option is master
                    setTimeout(mui.bind(function(){
                        if(!originalParentVCDisplay){
                            parentVC.view.style.removeProperty('display');
                        }else{
                            parentVC.view.style.display = originalParentVCDisplay; 
                        }
                    },this),300);  //give enough time for scroLlview to resize 
                }
            }
            
			visibleVC[willChangeOrientation](orient);	
		}
		
		// Make sure the correct window height can be calculated when orientation changes
		if(!this.viewportInfo.fullScreen) {
		    setTimeout(function() {
    		    document.body.style.minHeight = window.innerHeight+120+'px';
    		    setTimeout(function() {
    		        scrollTo(0, 0);
                    document.body.style.minHeight = window.innerHeight+'px';
    		    }, 0);
    		}, 50);
		}
	},
	
	/**
	 * Remove any stale event listeners from the disappearing view controller, and attach event
	 * listeners to the appearing view controller
	 * @method toggleEvents
	 * @param oldVc {mui.ViewController} The disappearing view controller
	 * @param newVc {mui.ViewController} The appearing view controller
	 */
	toggleEvents: function(oldVc, newVc)
	{
		if(oldVc)
		{
			if(oldVc.touchesBegan) 	mui.removeEventListener(oldVc.view, 'touchstart', oldVc.touchesBegan, oldVc);
			if(oldVc.touchesMoved) 	mui.removeEventListener(oldVc.view, 'touchmove', oldVc.touchesMoved, oldVc);
			if(oldVc.touchesEnded) 	mui.removeEventListener(oldVc.view, 'touchend', oldVc.touchesEnded, oldVc);
			if(oldVc.clicked) 	mui.removeEventListener(oldVc.view, 'click', oldVc.clicked, oldVc);
		}
		
		if(newVc)
		{
			if(newVc.touchesBegan) 	mui.on(newVc.view, 'touchstart', newVc.touchesBegan, newVc);
			if(newVc.touchesMoved) 	mui.on(newVc.view, 'touchmove', newVc.touchesMoved, newVc);
			if(newVc.touchesEnded) 	mui.on(newVc.view, 'touchend', newVc.touchesEnded, newVc);
			if(newVc.clicked) 	mui.on(newVc.view, 'click', newVc.clicked, newVc);
		}
	},
	
	/**
	 * Callback invoked after a view controller transition
	 * @method _transitionEnd
	 * @param newVc {mui.ViewController} The new visible view controller
	 * @param oldVc {mui.ViewController} The old visible view controller
	 * @private
	 */
	_transitionEnd: function(newVc, oldVc)
	{
		// Declare locals
		var newView = newVc.view/*,
		    scrollY = 0, 
		    viewY = mui.getXY(newView)[1],
		    navbar = mui.get('.mui-navbar[x-mui-showing=true]')*/;

        // Reset animation flag
        this.animating = false;
        
        if (newView.getAttribute(MUI_DOM.viewShowingAttr) != "true"){
            return;
        }
        
		// Restore content heights
		// newVc.view.style.maxHeight = oldVc.view.style.maxHeight = '';
		newView.style.minHeight = '';
		    
		// Disappear
		oldVc.disappear();
		
		// Callbacks
		oldVc._viewDidDisappear();
		newVc._viewDidAppear();
		
		// Set visibleViewController member
		this.visibleViewController = newVc;
		
		// Check for queued up view controllers
		if(this._viewControllerQueue && this._viewControllerQueue.length > 0)
		{
			var config = this._viewControllerQueue.shift();
			this.showViewControllerWithTransition(config.viewController, config.transition, config.reverse);
		}
		
		// Reset modal flag
		if(this._showingModalViewController)
		{
			this._didPresentModalViewController = true;
		}
	},
	
	/**
	 * Callback triggered whenever the URL is changed
	 * @method _urlChanged
	 * @param url {String} The current URL
	 * @param params {Object} Any request parameters
	 * @param navController {mui.NavigationController} The navigation controller to appear
	 * @param viewControllerName {String} The NAME of the view controller to appear
	 * @param unmatched {Boolean} True if no navigation controller mapping found
	 * @private
	 */
	_urlChanged: function(url, params, back, navController, viewControllerName, unmatched)
	{
	    navController = (this._showingModalViewController instanceof mui.NavigationController) ? this._showingModalViewController : navController;
		params = params || {};
		var doTransition = false,
			reverse = false,
			navIndex, 
			transition,
			viewController = navController.getViewController(viewControllerName), 
			visibleVC = this.visibleViewController;
		
		if (viewController == -1){
		    if (this._didPresentModalViewController && visibleVC.navigationController == navController && visibleVC.parentViewController){
		        visibleVC.parentViewController.dismissModalViewController();              
		    }
		    return;
		}
        if (this._didPresentModalViewController && this._showingModalViewController && visibleVC.navigationController != navController && visibleVC.parentViewController){
            visibleVC.parentViewController.dismissModalViewController();   
            return;           
        }
		if (this._didPresentModalViewController && !this._showingModalViewController && viewController.parentViewController){
		    viewController.parentViewController.presentModalViewController(viewController, params, true, viewController.modalOpts);
		    return;
		}
		if(viewController['isDetailViewController'] && viewController.isDetailViewController()){
			return this._urlChangedForSplitViews(viewController, params, true);
		} 
		
		viewController.navigationController = navController;
		
		// Load the view, if it is not already loaded
		if(!viewController.isViewLoaded()){
			viewController.loadView(params);
		}
		// Check for reload of view
		// if pushing and view is set to always reload on this case
		else if(!viewController.isViewLoadedWithParams(params) || (!this.popping && viewController.reloadOnPush) ){
			if(viewController.scrollView){
				viewController.scrollView.scrollTo(0, 0);	
			} 		
			viewController.reloadView(params);
		}

		// Check pushing/popping
		if(back && navController.stack.length > 1 && this.visibleViewController.NAME !== viewController.NAME){
			this.popping = true;
            navController.popViewController(true);
		}

		// Check if required viewControllers are not yet loaded
		if(viewController.requires){
			viewController.navigationController.requireViewControllers(viewController.requires);
		}

		// Check if viewController belongs to currently showing navigation controller
		if(this.visibleViewController && this.visibleViewController.navigationController.NAME === navController.NAME && this.visibleViewController.NAME !== viewController.NAME){
			doTransition = true;
		}
		// Hide active navigation bar for tab-to-tab switch
		else if(this.visibleViewController && !this._showingModalViewController) {
			this.visibleViewController.navigationController.hideNavigationBar();
			// Activate tab, if not already
			navIndex = this._controllers.indexOf(navController);
			if(this._tabView && this._tabView.activeIndex !== navIndex)
			{
				this._tabView.activateTabAtIndex(navIndex);
			}
		}
		else if(!this.visibleViewController && this._tabView){
			this._tabView.activateTabAtIndex(this._controllers.indexOf(navController));
		}
		
		// Attach/Detach touch events
		this.toggleEvents(this.visibleViewController, viewController);
		
		// Position the view controller
 		this.positionViewController(viewController);

		// Push or Pop view controller
		if(!this.popping) navController.pushViewController(viewController, params, true);
		
		// Check if popping
		if(this.popping) reverse = true;

		// Store scrollY for outgoing view
		if(this.visibleViewController) this.visibleViewController.scrollY = window.scrollY;

		// Show/Transition the view controller
		if(this._showingModalViewController && this._modalTransition){
            // Set params attribute
            viewController.params = params;
			transition = !this._didPresentModalViewController ? this._modalTransition : viewController.getTransition();
			var isModal = !this._didPresentModalViewController;
			viewController.parentViewController = this._showingModalViewController.parentViewController;
			this.showViewControllerWithTransition(viewController, transition, reverse, isModal);
		} 
		else{
			transition = this.popping ? navController.poppedStack[navController.poppedStack.length-1].viewController.getTransition() : viewController.getTransition();
			if(this.appInfo.transitionsEnabled && (!viewController['isMasterViewController'] || (viewController.isMasterViewController() == null) ) && doTransition && typeof mui.Transition !== 'undefined'){
                // Set params attribute
 				viewController.params = params;
 				this.showViewControllerWithTransition(viewController, transition, reverse);
			}else{
 				this.showViewController(viewController, params);
            }
		}
		
		// Selectables
		var selected = mui.getAll('.mui-selected', viewController.view);
		if(selected.length > 0){
			mui.each(selected, function(s) {
				setTimeout(mui.removeClass, 400, s, 'mui-selected');
			});
		}
		
		// Split views
		if(this.appInfo.splitViews && !this._restoringDetailViewController) {
			this._urlChangedForSplitViews(viewController, params);
		}
		this._restoringDetailViewController = false;
		
		// Check if this is the first time to show the master/detail view. If so, fire an orientation event to notify how to arrange themselves.
		if(this.appInfo.splitViews && !this._splitViewDidInitialize){
			this._splitViewDidInitialize = true;
			this._onOrientationChange();
		}
	},
	
	/**
	 * Called after a URL change when split views are used.
	 * @method _urlChangedForSplitViews
	 * @param viewController {mui.ViewController} The master or detail view controller
	 * @param parms {Object} Request params object
	 * @param isDetail {Boolean} Indicates if viewController param is a detail view controller
	 * @private
	 */
	_urlChangedForSplitViews: function(viewController, params, isDetail)
	{
		var detailVc = isDetail ? viewController : viewController.getDetailViewController();
		if(!detailVc) return;
		
		params = params || {};

		// If view is already loaded, and the detailViewController should not respond
		// to this request, do nothing
		var request = {};
		request.navigationController = viewController.navigationController;
		request.viewController = viewController;
		request.params = params;

		if(!isDetail && detailVc.isViewLoaded() && !viewController.shouldLoadDetailViewController(request)) return;

		detailVc.params = params;

		// Load the view, if it is not already loaded
		if(!detailVc.isViewLoaded())
		{
			detailVc.loadView(params);
		}
		// Check for reload of view
		else if(!detailVc.isViewLoadedWithParams(params))
		{
			if(detailVc.scrollView) detailVc.scrollView.scrollTo(0, 0);			
			detailVc.reloadView(params);
		}
		
		// Toggle Events
		this.toggleEvents(this.visibleDetailViewController, detailVc);
		
		// Push or Pop view controller
		if(!this.popping && detailVc.navigationController) detailVc.navigationController.pushViewController(detailVc, params, true);
		
		// Appear
		detailVc._viewWillAppear();
		detailVc.appear();
		detailVc._viewDidAppear();
		
		this.visibleDetailViewController = detailVc;
	},
	
	/**
	 * TabChange event handler for the mui.TabView activates the navigation controller
	 * corresponding to the tab
	 * @method _tabChanged
	 * @param index {Number} The index of the tab which the user selected
	 * @private
	 */
	_tabChanged: function(index)
	{
		// Get the navigation controller for the tab
		var navController = this._controllers[index];
		if(navController)
		{
			// Scroll to the tabs
			scrollTo(0, mui.getXY(this._tabView.element)[1]);
			document.body.style.minHeight = '10000px';
			setTimeout(mui.setStyle, 10, document.body, 'minHeight', window.innerHeight + 'px');
			
			// Open the last URL in the navigation stack
			var url = navController.getLastUrl();
			this.openUrl(url);
		}
	},
	
	/**
	 * TabRefresh event handler for the mui.TabView activates the navigation controller's root view controller
	 * corresponding to the tab
	 * @method _tabRefreshed
	 * @param index {Number} The index of the tab which the user selected
	 * @private
	 */
	_tabRefreshed: function(index)
	{
		// Get the navigation controller for the tab
		var navController = this._controllers[index];
		if(navController)
		{
			// Pop to root view controller
			navController.popToRootViewController();
		}
	},
	
	/**
	 * Position the viewcontroller in the viewport, taking up as much vertical space as available
	 * @method positionViewController
	 * @param viewController {mui.ViewController} The view controller
	 * @return {mui.ApplicationController} The AppController instance
	 */
	positionViewController: function(viewController)
	{
		if ((mui.UA.tablet) && this.appInfo.splitViews && !this.appInfo.splitViews.hidesMasterViewInPortrait) {
		    document.body.setAttribute('orient', 'landscape');
		} else {		
		    document.body.setAttribute('orient', window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
		}
		
		viewController = viewController || this.visibleViewController;
		if(viewController instanceof mui.ViewController)
		{
			var navController = viewController.navigationController,
			    viewNode = viewController.view,
			    navbar = mui.get( '.mui-navbar[x-mui-showing=true]' + 
			                      (navController ? ('[x-mui-controller="' + navController.NAME + '"]') : "")
			             ),
			    navbarHeight = navbar ? navbar.offsetHeight : 0,
			    header = mui.get('body > header'), headerHeight = (header ? header.offsetHeight : 0),
			    footer = mui.get('body > footer'), footerHeight = (footer ? footer.offsetHeight : 0),
			    height = parseInt(window.innerHeight - footerHeight - headerHeight),
			    scrollHost, posY, scrollHeight;

            if (this.shouldScrollViews || window.scrollY == 0){
                 scrollTo(0, 0); 
            }

			if(this.appInfo.splitViews) this.positionSplitViews(viewController);
            
			if(!this.appInfo.splitViews) {
			    viewNode.style.minHeight = height + 'px';
			    
			}
            document.body.style.minHeight = window.innerHeight + 'px';
			if(this.shouldScrollViews && (!viewController.scrollView || (viewController.scrollView && !viewController.scrollView.isLocked()))){
			     viewNode.style.maxHeight = height + 'px';
                 document.body.style.maxHeight = window.innerHeight + 'px';
			}
			     
			if(viewController.scrollView) {
			    scrollHost   = viewController.scrollView.getScrollHost();
			    
			    mui.setStyle(scrollHost, 'min-height', height+'px');
			    
			    if (viewController.scrollView.touchInfo.translations && viewController.scrollView.touchInfo.translations[1]){
    			    posY         = viewController.scrollView.touchInfo.translations[1].y;
    			    scrollHeight = scrollHost.offsetHeight;
    			    
    			    // if the scrollHost is not visible (position + scrollHeight will be negative or very small)
    			    // then calculate a value that will make the view visible again
    			    if ( scrollHeight && (posY + scrollHeight) < (height / 2) ){
    			        posY = height - scrollHeight;
    			        
    			        viewController.scrollView.scrollTo(0, posY);
    			    }
			    }
			}			
		}

		return this;
	},
	
	positionSplitViews: function(viewController)
	{	
		var masterVc = viewController.isMasterViewController() ? viewController : viewController.masterViewController;
		var detailVc = masterVc ? masterVc.getDetailViewController() : viewController;
		
		if(masterVc && !masterVc.renderingContext) masterVc.updateLayout();
		if(detailVc && !detailVc.renderingContext) detailVc.updateLayout();
	},

	/**
	 * Show a viewController on-screen, making it the visibleViewController
	 * @method showViewController
	 * @param viewController {mui.ViewController} The ViewController to show.
	 */
	showViewController: function(viewController, params)
	{
	    var visibleVC = this.visibleViewController, 
            visibleNC = visibleVC ? visibleVC.navigationController : null, 
            viewControllerNavController = viewController.navigationController, 
            detailVC;
	    
		// Set animation flag
		this.animating = false;
		
		// Disappear
		if( visibleVC )
		{
			visibleVC._viewWillDisappear( this.popping );
			visibleVC.disappear();
			visibleVC._viewDidDisappear();
			
			if ( visibleNC.detailViewController && visibleNC.NAME != viewControllerNavController.NAME ){
			    detailVC = visibleNC.detailViewController.getTopViewController();
			    
			    if (detailVC._showing){
			        detailVC._viewWillDisappear( this.popping );
                    detailVC.disappear();
                    detailVC._viewDidDisappear();
			    }
			}
		}

        //Set params attribute to current params 
		viewController.params = params;
		
		// Appear
		viewController._viewWillAppear();
		viewController.appear();
		viewController._viewDidAppear();
		
		if ( visibleNC && viewControllerNavController.detailViewController && visibleNC.NAME != viewControllerNavController.NAME ){
            detailVC = viewControllerNavController.detailViewController.getTopViewController();
            
            // Appear
            detailVC._viewWillAppear();
            detailVC.appear();
            detailVC._viewDidAppear();
        }
            
		// Set visibleViewController member
		this.visibleViewController = viewController;
		
		// Reset popping flag
		this.popping = false;
	},
	
	/**
	 * Show a viewController on-screen with a transition, making it the visibleViewController
	 * @method showViewController
	 * @param viewController {mui.ViewController} The ViewController to show.
 	 * @param transition {Object} Object literal defining the transition
 	 * @param reverse {Boolean} Should transition be executed in reverse
	 * @param isModal {Boolean} If true, this is a modal view controller
	 */
	showViewControllerWithTransition: function(viewController, transition, reverse, isModal)
	{
		if(this.animating)
		{
			this._viewControllerQueue = this._viewControllerQueue || [];
			this._viewControllerQueue.push({ viewController: viewController, transition: transition, reverse: reverse});
			return false;
		}
		
		// Declare locals
		var trans, options, navbar, scrollY, inView, outView;
		
		// Set in/out views
		inView = viewController.view;
		outView = this.visibleViewController.view;

        // Initialize transition options
        options = mui.augment({}, transition);
        options.reverse = reverse;
        options.onComplete = mui.bind(this._transitionEnd, this, viewController, this.visibleViewController);

		// Modal
		if(isModal)
		{
		    options.fullscreen = true;
		    if (mui.UA.tablet && viewController.modalOpts && viewController.modalOpts.type) {
		        // important that the fullscreen param is set, undefined means something else inside transition.js
		        if (viewController.modalOpts.type == mui.ViewController.MODAL_FULL){
		            options.fullscreen = true;
		        } else {
		            options.fullscreen = false;
		        }
		    }
		    
			var modalViewsContainer = mui.createElement('div', { id: 'mui-modal-views' });
			inView = mui.createElement('div', { id: 'mui-modal-in' });
			if(viewController.navigationController && viewController.navigationController.navigationBar)
			{
				inView.appendChild(viewController.navigationController.navigationBar.element);
			}
			modalViewsContainer.appendChild(viewController.view);
			inView.appendChild(modalViewsContainer);

			outView = this.visibleViewController.view;
			document.body.appendChild(inView);
		}
		else if(this._showingModalViewController)
		{
			mui.get('#mui-modal-views').appendChild(inView);
		}
		
		// Set animation flag
		this.animating = true;
		
		// Scroll
		navbar = mui.get('.mui-navbar[x-mui-showing=true]');
		if(this._tabView) scrollY = mui.getXY(this._tabView.element)[1];
		else if(navbar) scrollY = mui.getXY(navbar)[1];
		else scrollY = 0;

		if(viewController.scrollY && viewController.scrollY > mui.getXY(viewController.view)[1]) scrollY = viewController.scrollY;
		
		// Make sure we have room to scroll
		if(scrollY > this.visibleViewController.view.offsetHeight) this.visibleViewController.view.style.minHeight = scrollY+'px';

		if(!this.shouldScrollViews) setTimeout(scrollTo, 0, 0, scrollY);
		
		// Setup transition
		trans = new mui.Transition(inView, outView, options);
		
        if (isModal){
            outView.style.display = "none";
        }
        
		// Show incoming view
		this.visibleViewController._viewWillDisappear( this.popping );
		viewController._viewWillAppear();
		viewController.appear();

		// Execute transition
		mui.bind(trans.execute, trans)();
		
		// Reset popping flag
		this.popping = false;
	},
	
	/**
	 * Animate or show a modal view controller 
	 * @metho showModalViewController 
	 * @param viewController {mui.ViewController} The modal view controller
	 * @param params {Object} Request params for the view controller
	 * @param parentViewController {mui.ViewController} The parent view controller for the modal
	 * @param animated {Boolean} If true, use a transition when showing the view controller
	 */
	showModalViewController: function(viewController, params, parentViewController, animated) 
	{
		// Declare locals
		var transition = {
			type: mui.Transition.TYPE_SLIDE,
			direction: mui.Transition.DIR_BOTTOM_TO_TOP
		};
		var modalVc = viewController;
		if(animated === false) transition.duration = 0;
		
		// Set the parentViewController property on the child modal
		viewController.parentViewController = parentViewController;
		this._showingModalViewController = viewController;
		this._didPresentModalViewController = false;

		// Check the transition style
		if(viewController.transition) transition = viewController.transition;

		// Store the transition value
		this._modalTransition = transition;

		// Check if NavigationController. If yes, show its top view controller
		if(viewController instanceof mui.NavigationController)
		{
			viewController.getTopViewController().navigationController = viewController;
			viewController = viewController.getTopViewController();
			viewController.parentViewController = parentViewController;
			
			viewController.modalOpts = viewController.navigationController.modalOpts;
			delete viewController.navigationController.modalOpts;
			
			// Open the view controller
			this.openViewController(viewController, params);
		}
		else
		{
			// Show the view controller
			viewController.params = params;

			// Check if view needs to be loaded
			if(!viewController.isViewLoadedWithParams(params))
			{
				viewController.loadView(params);
			}
			
			this.toggleEvents(parentViewController, viewController);
			this.showViewControllerWithTransition(viewController, transition, false, true)
		}
	},
	
	/**
	 * Dismiss a modal view controller with transition
	 * @metho dismissModalViewController
	 * @param parentViewController {mui.ViewController} The parent view controller for the modal
	 */
	dismissModalViewController: function(parentViewController)
	{
		var inView, outView;
		var transition = this._modalTransition;
		var outViewController = this._showingModalViewController;
		transition.reverse = true;
		transition.onComplete = mui.bind(function() {
			
			var modalViews = mui.getAll('#mui-modal-views .mui-view');
			mui.each(modalViews, function(view) {
				mui.get('#mui-views').appendChild(view);
			});
			mui.removeElement('#mui-modal-in');
						
			this._showingModalViewController = null;
			this._modalTransition = null;
			
			// Attach/Detach touch events
			this.toggleEvents(outViewController, parentViewController);
			
			this._transitionEnd(parentViewController, outViewController);
			
			this.openViewController(parentViewController, parentViewController.params, true);
			
			outViewController.parentViewController = null;
		}, this);
		
		inView = document.body;
		outView = mui.get('#mui-modal-in');
		
		if(this._showingModalViewController instanceof mui.NavigationController)
		{
			outViewController = this._showingModalViewController.getTopViewController();
		}
		
		var trans = new mui.Transition(inView, outView, transition);
		
		if (parentViewController.view) {
		    parentViewController.view.style.removeProperty("display");
		}
		
		parentViewController._viewWillAppear();
		parentViewController.appear();
		
		outViewController._viewWillDisappear( true );
		
		setTimeout(mui.bind(trans.execute, trans), 0);
	},
	
	/**
	 * Set the element for the application. Use this method in conjuction with
	 * registerController to map a navigationController to a particular tab
	 * @method setTabsElement
	 * @param el {String|HTMLElement} Selector or HTMLElement for the tabs container
	 */
	setTabsElement: function(el)
	{
		if(typeof mui.TabView !== 'undefined')
		{
			this._tabView = new mui.TabView(el);
			this._tabView.tabChanged = mui.bind(this._tabChanged, this);
			this._tabView.tabRefreshed = mui.bind(this._tabRefreshed, this);
		}
	},

	/**
	 * Register a controller with the application. Controllers are mapped to
	 * tab elements in the order they have been registered.
	 * @method registerController
	 * @param controller {mui.NavigationController} The controller to register
	 */
	registerController: function(controller)
	{
		// Initialize _controllers if not defined yet
		this._controllers = this._controllers || [];

		// Push controller onto controller stack
		this._controllers.push(controller);
		
		// Make sure DOM node exists for each viewController, and map URLs into navigator
		mui.each(controller.viewControllers, function(vc) {

			// View node
			var vcName = vc.NAME || vc.prototype.NAME;
			var id = controller.NAME + '/' + vcName;
			
			// Map URL
			this.navigator.mapUrl(id, mui.bind(this._urlChanged, this, controller, vcName));
		}, this);

		// Initialize controller
		controller.initialize();
	},
	
	/**
	 * Open a URL - retrieve the navigationController to which
	 * the URL belongs to and trigger it's load/appear sequence. 
	 * This method will also perform the view transition, if defined.
	 * URL's are defined as the navigationController's name, followed by
	 * a slash, followed by the viewController's name, with any URL parameters
	 * following that. Leading slashes are ignored.
	 * Example: '/stories/list' is equivalent to 'stories/list'
	 * @method openUrl
	 * @param url {String} The URL to open
	 * @param quiet {Boolean} (Optional) Prevent the viewController load sequence. Pass
	 *   true if you just want to set the window hash, and not trigger the load/appear sequence	
	 * @return {Boolean} Returns false if url is not mapped to any 
	 *   controller
	 */
	openUrl: function(url, quiet)
	{
		this.navigator.openUrl.apply(this.navigator, arguments);
	},
	
    launchApp: function(url)
    {
        this.navigator.openUrl.apply(this.navigator, [url, false, true]);
    },
	
	/**
	 * This is a convenience method for showing a viewController without constructing a URL.
	 * The URL is built based on the viewController's name + the params that are passed in.
	 * @method openViewController
	 * @param viewController {mui.ViewController} the ViewController
	 * @param params {Object} Any request params
	 * @param quiet {Boolean} Pass quiet flag to openUrl
	 */
	openViewController: function(viewController, params, quiet)
	{
		var url = '/';
		if(viewController.navigationController) url += viewController.navigationController.NAME + '/';
		url += viewController.NAME;
		if(params)
		{
			url += '?';
			mui.iterate(params, function(v, n) { url += [n, v].join('='); url += '&'; });
			url = url.substr(0, url.length-1);
		}
		this.openUrl(url, quiet);
	},
	
	/**
	 * Get a navigation controller by name
	 * @method getController
	 * @param name {String} The name of the controller
	 * @return The controller, or null, if not found
	 */
	getController: function(name)
	{
		var ctrl = null;
		mui.each(this._controllers, function(c) {
			if(c.NAME === name) ctrl = c;
		}, this);
		return ctrl;
	},
	
	/**
     * @param {String} propertyName The name of the property to retrieve.
     * @return {variant} The value of the property or =undefined= if it doesn't exist.
     * @method setData
     */
    getData: function(propertyName)  {
        if ( this._localData[propertyName] ){
            return this._localData[propertyName];
        }
        
        if (window.localStorage){
            this._localData = window.localStorage.getItem( "mui_data" );
            
            if (this._localData){
                this._localData = JSON.parse( this._localData );
            } else {
                this._localData = {};
            }
        }
        
        return this._localData[propertyName];
    },
    
    /**
     * @param {String} propertyName The name of the property to store.
     * @param {String} propertyValue the value of the property
     * @method setData
     */
    setData: function(propertyName, propertyValue)  {        
        this._localData[propertyName] = propertyValue;
        
        if (window.localStorage){
            window.localStorage.removeItem( "mui_data" );
        
            window.localStorage.setItem( "mui_data", JSON.stringify( this._localData ) );
        }
    },
    
	/**
	 * Restore the state of the application. If no state is available,
	 * the fallback URL will be opened
	 * @method restore
	 * @param fallbackUrl {String} URL to be opened if there is nothing to restore
	 * @return {mui.ApplicationController} The AppController instance
	 */
	restore: function(fallbackUrl)
	{
        function restoreViewControllers() {
            var mui_controllers = _instance.getData( "mui_controllers" ) || {},
                topNc, cTime = 0, lastUrl, navCon, stack;

            mui.iterate( mui_controllers, function( mui_controller ){
                navCon = _instance.getController(mui_controller.nav_controller);

                if(navCon) {
                    stack = mui_controller.stack;
                    
                    if(_instance.appInfo.persistenceMode === 'top') stack = [stack[0]];
                    
                    mui.each(stack, function(s) {
                        if(s.timestamp >= cTime && (!navCon['isDetailViewController'] || !navCon.isDetailViewController())) { 
                            cTime = s.timestamp;
                            topNc = mui_controller.nav_controller;
                        }
                    })
                    navCon.restoreStack(stack);
                }                            
            } );
            
            if (topNc){
				navCon = _instance.getController(topNc);
                lastUrl = navCon.getLastUrl();

				_instance._restoringDetailViewController = typeof navCon.detailViewController !== 'undefined';

				mui.debug("restore(): url " + lastUrl);
				if (lastUrl == fallbackUrl){
				    _instance.launchApp(fallbackUrl);
				} else {
				    _instance.openUrl(lastUrl);
				}
				
				if(navCon.detailViewController) {
					navCon.restoreDetailViewController();
				}

            } else {
                mui.debug("restore(): empty stack - fallback: " + fallbackUrl);
                _instance.launchApp(fallbackUrl);
            }
        };
                            	    
	    if ( window.localStorage ){
	        if(this.appInfo.persistenceMode !== 'none')  {
	            var mui_config = this.getData( "mui_config" ) || {};
	            
	            var version = mui_config["version"];
	            
	            // Check version
	            if (!version || version !== this.appInfo.version) {
                    mui.debug("restore(): updating data");
                    
                    // Version is different, so update version wipe out all tables
                    // @TODO wipe tables
                    mui_config["version"] = this.appInfo.version;
                    
                    this.setData( "mui_config", mui_config );
                    
                    if (version && version !== this.appInfo.version) {
                        mui.debug("restore(): new version - fallback: " + fallbackUrl);
                        this.launchApp(fallbackUrl);
                        
                    } else {
                        restoreViewControllers();
                    }
                    
                } else {
                    restoreViewControllers();
                }
                
	        } else {
	            mui.debug("restore(): no persistenMode - fallback: " + fallbackUrl);
                this.launchApp(fallbackUrl);
	        } 
	           
	    } else {
	        mui.debug("restore(): no localStorage - fallback: " + fallbackUrl);
	        
	        this.launchApp(fallbackUrl);
	    }
	    		
		return this;
	},
	
	/**
	 * Event disptcher
	 * @method handleEvent
	 * @param e {Event} The event
	 * @private
	 */
	handleEvent: function(e)
	{
		switch(e.type)
		{
			case 'touchstart':
			case 'mousedown':
				this._selectable = mui.getAncestorByClassName(e.target, 'mui-selectable');
				if(this._selectable && !(e.target instanceof HTMLInputElement))
				{
					// Android UI has no delay before highlighting, iPhone does
					this._selectablePid = setTimeout(mui.addClass, (mui.UA.Android ? 0 : 100), this._selectable, 'mui-selected');
				}
				break;
			case 'touchmove':
			case 'mousemove':
				if(this._selectable)
				{
					clearTimeout(this._selectablePid);
					mui.removeClass(this._selectable, 'mui-selected');
				}
				this._selectable = null;
				break;
			case 'resize':
                if(e.target === window) {
                    document.body.style.minHeight = window.innerHeight+'px';
                    this.positionViewController();
                }
				break;
			case 'orientationchange':
				this._onOrientationChange();
				break;
		}
	},

	/**
	 * Initialization method
	 * @method initialize
	 */
	initialize: function()
	{
		// Enforce single instance of ApplicationController
		if(_instance !== null)
		{
			throw new Error('Only one instance of mui.ApplicationController allowed.');
		}
		
		// Cache instance
		_instance = this;
		
		// Initialize navigator
		this.navigator = new mui.Navigator();
		
		// Initialize event capture
		mui.on(document, 'touchstart', this);
		mui.on(document, 'touchmove', this);
		mui.on(document, 'click', this);
		mui.on(window, 'resize', this);
		mui.on(window, 'orientationchange', this);
		
		// Initialize viewport and launch app
		document.body.style.height = '10000px'; // so that the correct innerHeight of window can be calculated
		setTimeout(mui.bind(function() {
			scrollTo(0, 1); scrollTo(0, 0);
			document.body.style.minHeight = window.innerHeight+'px';
			document.body.style.height = '';
			
			// Prevent the dreaded "shaking" bug when input fields are focused
			var input = document.createElement('input');
			document.body.appendChild(input);
			input.focus();
			document.body.removeChild(input);
			
			// Viewport meta
			this.viewportInfo = { fullScreen: false };
			if(mui.UA.Safari && window.navigator.standalone)
			{
				this.viewportInfo.fullScreen = true;
			}
			
			// ScrollViews?
			if(mui.ScrollView && this.appInfo.scrollViews)
			{
				if(this.viewportInfo.fullScreen && this.appInfo.scrollViews.fullScreenMode === true) this.shouldScrollViews = true;
				else if(!this.viewportInfo.fullScreen && this.appInfo.scrollViews.chromeMode === true) this.shouldScrollViews = true;
			}
			
			// Full screen
			if(this.viewportInfo.fullScreen || (this.shouldScrollViews))
			{
				document.body.parentNode.setAttribute('x-mui-full-screen', 'true');
				mui.addClass(document.body, 'mui-full-screen');
			}
			
			// Storage
			if( mui.Storage && this.appInfo.storageEnabled === true)
            {
                this.storage = mui.Storage.open(this.appInfo.id, this.appInfo.version, this.appInfo.title);
            }
            
			// Check for tabs element
			if(this.appInfo.tabs && this.appInfo.tabs.element)
			{
				this.setTabsElement(this.appInfo.tabs.element);
				if(this.appInfo.tabs.moveToFooterInFullScreen && this.viewportInfo.fullScreen)
				{
					if(!mui.get('footer')) document.body.appendChild(document.createElement('footer'));
					mui.get('footer').appendChild(this._tabView.element);
				}
			}
			
			// Check for split view layout
			if(this.appInfo.splitViews)
			{
				// Body 
				switch(this.appInfo.splitViews.layout)
				{
					case ApplicationController.SPLITVIEW_LAYOUT_TOP_BOTTOM:					
						mui.addClass(document.body, 'mui-splitview-2');
						break;
					case ApplicationController.SPLITVIEW_LAYOUT_DEFAULT:
					default:
						mui.addClass(document.body, 'mui-splitview');
						break;
				}
			}

			// Initialize launch sequence
			document.body.removeAttribute('x-mui-loading');
			this.appDidFinishLaunching();
			
			// Catch-all route
			this.navigator.mapUrl('*', mui.bind(this._urlChanged, this, null, null, true));

		}, this), 100);
	}
	
};

mui.add('ApplicationController', ApplicationController);

})();
