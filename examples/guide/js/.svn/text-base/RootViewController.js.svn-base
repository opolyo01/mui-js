mui.provide('Guide');

Guide.RootViewController = new mui.ViewController({

	NAME: 'index',
	
	title: 'mui',

	loadView: function(params) {
		this.setView('#root-view', true);
	},
	
	clicked: function(e) {
		var listItem = mui.getAncestorByTagName(e.target, 'li');
		if(listItem) {
			this.navigationController.pushViewController(Guide.SectionViewController, { 
				sectionId: listItem.getAttribute('section-id'),
				title: escape(listItem.innerHTML)
			});			
		}
	}
	
});