Mail.MessageController = new mui.ViewController({
	NAME: 'message',
	title: 'Message',

	loadView: function(params) {
		this.setView('#view-message', false);
		this.fetchViewContent('views/message.php?id='+params.id);
	},
	
	viewWillAppear: function() {
	    this.setNavigationItem('rightBarItem', new mui.Button( { title: 'next', action: mui.bind(this.clickedNext, this) }));
	    
		Mail.Footer.setItems({
			leftColumn: [
				{ icon: 'refresh' }
			],
			
			centerColumn: [
				{ icon: 'folder', action: mui.bind(this.presentModalViewController, this, Mail.MoveMessageController) },
				{ icon: 'trash', action: mui.bind(this.navigationController.popViewController, this.navigationController) },
				{ icon: 'reply', action: mui.bind(this.didHitReply, this) }
			],
			
			rightColumn: [
				{ icon: 'compose', action: mui.bind(Mail.AppController.showComposeViewController, Mail.AppController, this) }
			]
		});
	},
	
	clickedNext: function() {
        Mail.AppController.openUrl(this.navigationController.NAME + '/' + this.NAME + '?id=' + Math.random());
	},
	
	didHitReply: function() {
		var action = mui.bind(Mail.AppController.showComposeViewController, Mail.AppController, this);
		var actionSheet = new mui.ActionSheet({
			cancelButton: { title: 'Cancel' },
			otherButtons: [
				{ title: 'Reply', action: action },
				{ title: 'Reply All', action: action },
				{ title: 'Forward', action: action }
			]
		});
		actionSheet.show();
		delete actionSheet;
	}
});