(function() {

var NavControlller = mui.NavigationController;

/* Split View Additions */
	
function SplitViewControllerAdditions() {}

SplitViewControllerAdditions.prototype = {
	
	detailViewController: null,
	
	setDetailViewController: function(vc)
	{
		this._isMasterViewController = true;
		this.detailViewController = vc;
		this.detailViewController._isDetailViewController = true;
		this.detailViewController.masterViewController = this;
	},
	
	isMasterViewController: function()
	{
		if(this instanceof NavControlller) return this._isMasterViewController;
		if(this.navigationController instanceof NavControlller) return this.navigationController._isMasterViewController;
		return this._isMasterViewController;
	},
	
	isDetailViewController: function() 
	{
		if(this instanceof NavControlller) return this._isDetailViewController;
		if(this.navigationController instanceof NavControlller) return this.navigationController._isDetailViewController;
		return this._isDetailViewController;
	},
	
	getDetailViewController: function()
	{
		if(this.detailViewController)
		{
			return (this.detailViewController instanceof NavControlller) ? this.detailViewController.getTopViewController() : this.detailViewController;
		}
		if(this.navigationController) return this.navigationController.getDetailViewController();
		
	},
	
	getMasterViewController: function()
	{
		if(this.masterViewController) return this.masterViewController;
		
		if(this.navigationController) {
		    var masterVC = this.navigationController.masterViewController;
		    return (masterVC instanceof NavControlller) ? masterVC.getTopViewController() : masterVC;
		}
	},
	
	shouldLoadDetailViewController: function(request)
	{
		if(this instanceof mui.ViewController && this.navigationController) return this.navigationController.shouldLoadDetailViewController(request);
		return false;
	},
	
	willChangeOrientation: function(orient)
	{
		var detailVc = this.getDetailViewController();
		if(detailVc) detailVc.willChangeOrientation(orient);
	},
	
	willHideMasterViewController: function()
	{
		var detailVc = this.getDetailViewController();
		if(detailVc) detailVc.willHideMasterViewController.apply(detailVc, arguments);
	},
	
	willShowMasterViewController: function()
	{
		var detailVc = this.getDetailViewController();
		if(detailVc) detailVc.willShowMasterViewController();
	},
	
	_willChangeOrientation: function(orient)
	{	
		var detailVc = this.getDetailViewController();
		var button;
		var popover;
		
		if(detailVc)
		{
			if(!this._masterViewControllerButton)
			{
				this._masterViewControllerButton = new mui.Button({
					title: this.title,
					action: mui.bind(this.showMasterViewControllerPopover, this)
				});

				this._masterViewControllerPopover = new mui.Popover({
					element: mui.createElement('div', { className: 'mui-master-popover' }),
					anchorElement: this._masterViewControllerButton.element,
					callback: {
						popoverWillHide: mui.bind(function() {
							this._showingPopover = false;
						}, this)
					}
				});
			}
			if(orient == 0 || orient == 180) 
			{
				detailVc.willHideMasterViewController(this, this._masterViewControllerButton);
			}
			else 
			{
				if(this.renderingContext) this.removeRenderingContext();
				detailVc.willShowMasterViewController(this._masterViewControllerButton);
			}
		}
		if(this._masterViewControllerPopover)
		{
			mui.removeElement('.mui-view-host', this._masterViewControllerPopover.element);
			this.hideMasterViewControllerPopover();
			mui.get('#mui-views').appendChild(this.view);
		}
		this.willChangeOrientation();
	},
	
	showMasterViewControllerPopover: function()
	{
		if(this._showingPopover) return;
		this._showingPopover = true;
		
		mui.addClass(document.body, 'mui-showing-popover');
		this.view.style.width = '';
		mui.addClass(this.view, 'mui-inside-popover');
		
		if(!this.renderingContext) this.render(this._masterViewControllerPopover.element);
		
		this._masterViewControllerPopover.render();
		this._masterViewControllerPopover.show();
	},
	
	render: function(el)
	{
		var relativeContainer = mui.createElement('div', { className: 'mui-view-host' });

		el = el || mui.get('#mui-views') || document.body;
		
		if(this.navigationController && this.navigationController.navigationBar)
		{
			if(this.navigationController.navigationBar)
			{
				this.navigationController.navigationBar.element.style.width = '';
				this.view.style.width = '';

				el.appendChild(this.navigationController.navigationBar.element);
			}
			
			relativeContainer.appendChild(this.view);
			el.appendChild(relativeContainer);
			
			mui.each(this.navigationController.viewControllers, function(vc) {
				vc.renderingContext = relativeContainer;
				if(vc.view) relativeContainer.appendChild(vc.view);
			});
		}
		
		this.renderingContext = el;
	},
	
	removeRenderingContext: function()
	{
		var container = mui.get('#mui-views');
		if(this.view) container.appendChild(this.view);
		if(this.navigationController && this.navigationController.navigationBar)
		{
			if(this.navigationController.navigationBar && this.navigationController.navigationBar.element)
			{
				mui.get('body > header').appendChild(this.navigationController.navigationBar.element);
			}
			
			container.appendChild(this.view);
			
			mui.each(this.navigationController.viewControllers, function(vc) {
				vc.renderingContext = null;
				if(vc.view) container.appendChild(vc.view);
			});
			this.renderingContext = null;
		}
		mui.ApplicationController.getInstance().positionViewController();
	},

	hideMasterViewControllerPopover: function()
	{
		if(this.isDetailViewController()) return this.getMasterViewController().hideMasterViewControllerPopover();
		
		if(!this._masterViewControllerPopover && this instanceof NavControlller)
		{
			var topVc = this.getTopViewController();
			if(!topVc) return;
			return topVc.hideMasterViewControllerPopover();
		}
		
		if(!this._masterViewControllerPopover) return;

		mui.removeClass(document.body, 'mui-showing-popover');
		mui.removeClass(this.view, 'mui-inside-popover');

		this._showingPopover = false;
		this._masterViewControllerPopover.hide();
	},
	
	restoreDetailViewController: function()
	{
		var detailVc = this.getDetailViewController();
		var lastUrl = detailVc.navigationController ? detailVc.navigationController.getLastUrl() : detailVc.getLastUrl();
		mui.ApplicationController.getInstance().openUrl(lastUrl);
	}
};
        
mui.mix(mui.ViewController, SplitViewControllerAdditions);
mui.mix(NavControlller, SplitViewControllerAdditions);

/*
 * Overrides
 */
NavControlller.prototype.hideNavigationBar = function() {
    this.navigationBar.hide();
      
    if (this.detailViewController && this.detailViewController.navigationBar){
          this.detailViewController.navigationBar.hide();
    }
}
	
})();