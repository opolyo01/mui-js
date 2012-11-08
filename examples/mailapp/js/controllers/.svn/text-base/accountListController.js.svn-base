Mail.AccountListController = new mui.ViewController({
	NAME: 'accountlist',
	title: 'Accounts',
	
	loadView: function() {
		this.setView('#view-accountList');
		this.fetchViewContent('views/accountList.php');
	},
	
	viewWillAppear: function() {
		//this.setNavigationItem('rightBarItem', new mui.Button({ title: 'Test' }));
		Mail.Footer.setItems({
			leftColumn: [
				{ icon: 'refresh' }
			],

			rightColumn: [
				{ icon: 'compose', action: mui.bind(Mail.AppController.showComposeViewController, Mail.AppController, this) }
			]
		});
	},

	clicked: function(e) {
		var item = mui.getAncestorByTagName(e.target, 'li');
		if(item) {
			var id = escape(mui.get('.mui-title', item).innerHTML);
			this.navigationController.pushViewController(Mail.AccountController, { id: id });
		}
	},
	
	reloadAccounts: function() {
		alert('reload accounts');
	},

	showComposer: function() {
		alert('show composer');
	}
});