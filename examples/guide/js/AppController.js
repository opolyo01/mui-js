mui.provide('Guide');

Guide.AppConfig = {
	id: 'mui_user_guide_dev1',
	title: 'Dev mui User Guide',
	version: '0.1',
	persistenceMode: 'all',
	splitViews: {
		layout: 'default',
		hidesMasterViewInPortrait: false
	},
	scrollViews: {
		fullScreenMode: true,
		chromeMode: true
	}
};

Guide.AppController = new mui.ApplicationController(Guide.AppConfig);

Guide.AppController.appDidFinishLaunching = function() {
	this.contentNavController = new mui.NavigationController({
		NAME: 'content',
		tintColor: '#131313',
		viewControllers: [
			Guide.DetailViewController
		]
	});
	
	this.mainNavController = new mui.NavigationController({
		NAME: 'main',
		tintColor: '#131313',		
		viewControllers: [
			Guide.RootViewController,
			Guide.SectionViewController
		],
		
		/*
		 request =>
		{
			"navigationController": #<mui.NavigationController>,
			"viewController": #<mui.ViewController>,
			"params": #<Object>
		}
		*/
		shouldLoadDetailViewController: function(request) {
			if(request.viewController.NAME == Guide.DetailViewController.NAME) return true;
			return false;
		}
	});

	this.mainNavController.setDetailViewController(this.contentNavController);
	
	this.registerController(this.mainNavController);
	this.registerController(this.contentNavController);
	
	Guide.ContentDataSource = new mui.DataSource({
		name: 'guide_content',
		type: 'storage',
		onRestore: mui.bind(this.restore, this, 'main/index'),
		cache: {
			max: 500,
			keepalive: { days: 0 }
		}
	});
	
};

Guide.AppController.initialize();