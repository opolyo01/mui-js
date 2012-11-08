mui.provide('Guide');

Guide.SectionViewController = new mui.ViewController({

	NAME: 'section',

	loadView: function(params) {
		this.setView('#section-view', true);
		this.showSection(params.sectionId);
	},
	
	viewWillAppear: function() {
		this.title = unescape(this.params.title);
		this.showSection(this.params.sectionId);
		if(Guide.DetailViewController.params && Guide.DetailViewController.params.contentId) {
			this.highlightItem(Guide.DetailViewController.params.contentId);
		}
	},
	
	showSection: function(sectionId) {
		mui.toggleClass(mui.get('.showing', this.view), 'showing');
		mui.toggleClass(mui.get('.section[section-id="'+sectionId+'"]', this.view), 'showing');	
	},
	
	unhighlightItems: function() {
		var highlightedItems = mui.getAll('li.mui-highlighted', this.view);
		var selectedItems = mui.getAll('li.mui-selected', this.view);
		mui.each(highlightedItems, function(item) { mui.removeClass(item, 'mui-highlighted'); });
		mui.each(selectedItems, function(item) { mui.removeClass(item, 'mui-selected'); });
	},
	
	highlightItem: function(contentId) {
		var item = mui.get('li[content-id="'+contentId+'"]', this.view);
		mui.addClass(item, 'mui-highlighted');
		mui.addClass(item, 'mui-highlighted');
	},
	
	clicked: function(e) {
		var listItem = mui.getAncestorByTagName(e.target, 'li');

		if(!listItem) return;

		this.unhighlightItems();
		this.highlightItem(listItem.getAttribute('content-id'));
		
		Guide.AppController.openViewController(Guide.DetailViewController, {
			sectionId: this.params.sectionId,
			contentId: listItem.getAttribute('content-id'),
			title: escape(listItem.innerHTML)
		});
	},
	
	detailViewControllerWillAppear: function(params) {
		this.unhighlightItems();
		this.highlightItem(params.contentId);
	}
	
});