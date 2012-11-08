Mail.ComposeController = new mui.ViewController({
	NAME: 'compose',
	title: 'New Message',
	
	loadView: function() {
		this.setView('#view-compose', true);
	},
	
	viewDidLoad: function() {
		this.cancelButton = mui.createElement('div', { className: 'button', innerHTML: 'Cancel' });
		this.sendButton = mui.createElement('div', { className: 'button blue', innerHTML: 'Send' })
		mui.on(this.cancelButton, 'click', mui.bind(this.cancel, this));
		mui.on(this.sendButton, 'click', mui.bind(this.send, this));
	},
	
	viewWillAppear: function() {
		this.setNavigationItem('leftBarItem', this.cancelButton);
		this.setNavigationItem('rightBarItem', this.sendButton);
		Mail.Footer.hide();
	},
	
	viewDidAppear: function() {
		// mui.get('#input-to').focus();
	},
	
	viewWillDisappear: function() {
		Mail.Footer.show();
	},
	
	cancel: function() {
		this.parentViewController.dismissModalViewController();
	},
	
	send: function() {
		var form = mui.get('#form-compose', this.view);
		alert('Sending...');
		this.parentViewController.dismissModalViewController();
		setTimeout(mui.bind(form.reset, form), 400);
	}	
});