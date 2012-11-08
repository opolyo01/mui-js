Mail.MoveMessageController = new mui.ViewController({
	NAME: 'movemessage',
	title: 'Mailboxes',

	loadView: function(params) {
		this.setView('#view-movemessage', true);
	},
	
	viewDidLoad: function() {
		this.cancelButton = mui.createElement('div', { className: 'button', innerHTML: 'Cancel' });
		mui.on(this.cancelButton, 'click', mui.bind(this.cancel, this));
	},
	
	viewWillAppear: function() {
		this.setNavigationItem('leftBarItem', mui.createElement('div'));
		this.setNavigationItem('rightBarItem', this.cancelButton);
		Mail.Footer.hide();
	},
	
	viewWillDisappear: function() {
		Mail.Footer.show();
	},
	
	cancel: function() {
		this.parentViewController.dismissModalViewController();
	},
	
	clicked: function() {
		this.parentViewController.dismissModalViewController();
	}
});