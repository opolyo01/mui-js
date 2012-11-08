Mail.AppController = new mui.ApplicationController(Mail.AppConfig);

Mail.AppController.appDidFinishLaunching = function() {
	
	/*
	if(mui.UA.Apple && !this.viewportInfo.fullScreen) {
		alert('To install application, add to Home Screen.');
		document.body.innerHTML = '';
		return;
	}
	*/
	
	this.registerController(new mui.NavigationController({
		NAME: 'accounts',
		tintColor: '#7e94b1',
		viewControllers: [
			Mail.AccountListController,
			Mail.AccountController,
			Mail.MessageListController,
			Mail.MessageController,
			Mail.MoveMessageController,
			Mail.ComposeController
		]
	}));

	this.restore('/accounts/accountlist');
};

Mail.AppController.showComposeViewController = function(parentViewController) {
	parentViewController.presentModalViewController(Mail.ComposeController);
};

mui.on(document, 'DOMContentLoaded', mui.bind(Mail.AppController.initialize, Mail.AppController));