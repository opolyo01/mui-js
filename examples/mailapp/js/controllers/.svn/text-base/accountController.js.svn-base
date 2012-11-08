Mail.AccountController = new mui.ViewController({
	NAME: 'account',
	title: '',
	
	loadView: function(params) {
		this.title = unescape(params.id);
		this.setView('#view-account');
		this.fetchViewContent('views/account.php?id='+params.id);
	},
	
	viewWillAppear: function() {
		this.title = unescape(this.params.id);
		// this.setNavigationItem('rightBarItem', mui.createElement('div', { innerHTML: 'Test' }));
		
		Mail.Footer.setItems({
			leftColumn: [
				{ icon: 'refresh' }
			],
			
			centerColumn: this.title,
			
			rightColumn: [
				{ icon: 'compose', action: mui.bind(Mail.AppController.showComposeViewController, Mail.AppController, this) }
			]
		});
	},
	
	clicked: function(e)
	{
		var item = mui.getAncestorByClassName(e.target, 'mui-selectable');
		var id;
		if(item) {
			id = escape(mui.get('.mui-title', item).innerHTML);
			this.navigationController.pushViewController(Mail.MessageListController, { id: id });
		}
	}
});