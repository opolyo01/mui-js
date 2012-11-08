mui.provide('Guide');

Guide.DetailViewController = new mui.ViewController({

	NAME: 'detail',
	title: 'User Guide',

	loadView: function(params) {
		var sectionId = params.sectionId || 'default';		
		var contentId = params.sectionId && params.contentId ? params.contentId : 'default';
		var detailEl = mui.get('#detail-content');
		
		this.setView('#detail-view');
		
		Guide.ContentDataSource.sendRequest('content/'+sectionId+'/'+contentId+'.html', {
			success: mui.bind(function(o) {
				detailEl.innerHTML = o;
				this.setViewContent(detailEl);
			}, this),
			failure: mui.bind(function(o) {
				detailEl.innerHTML = 'Nothing to see here.';
				this.setViewContent(detailEl);
			}, this)
		});
	},
	
	clicked: function(e) {
		mui.getAncestorBy(e.target, mui.bind(function(el) {
			if(el.getAttribute('clicked')) {
				this[el.getAttribute('clicked')](el);
			}
		}, this));
	},
	
	animateMe: function(el) {
		mui.animate(el, {
			properties: {
				'-webkit-transform': 'rotate(-90deg)',
				'background': '#fff',
				'color': '#000'
			},
			duration: '1s',
			callback: {
				onComplete: function() {
					mui.animate(el, {
						properties: {
							'-webkit-transform': 'rotate(0)',							
							'background': '#333',
							'color': '#fff'
						},
						duration: '1s'
					});
				}
			}
		});
	},
	
	viewWillAppear: function() {
		Guide.SectionViewController.detailViewControllerWillAppear(this.params);
		if(this.params.title && this.params.contentId) this.setNavigationItem('title', unescape(this.params.title));
		setTimeout(mui.bind(this.hideMasterViewControllerPopover, this), 200);
	},
	
	willChangeOrientation: function(orient) {

	},
	
	willShowMasterViewController: function() {
		this.setNavigationItem('leftBarItem', null);
	},
	
	willHideMasterViewController: function(masterViewController, button) {
		this.setNavigationItem('leftBarItem', button);
	}
	
});