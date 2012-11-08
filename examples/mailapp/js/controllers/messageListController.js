Mail.MessageListController = new mui.ViewController({
	NAME: 'messages',
	title: '',
	
	loadView: function(params) {
		this.title = unescape(params.id);
		this.setView('#view-messageList');
		this.fetchViewContent('views/messageList.php?fid='+params.id);
	},
	
	viewWillAppear: function() {
		this.title = unescape(this.params.id);
		Mail.Footer.setItems({
			leftColumn: [
				{ icon: 'refresh' }
			],
			
			centerColumn: '<div class="subtitle"><strong>Updated</strong> 1/11/10 <strong>1:40</strong> PM</div>',
			
			rightColumn: [
				{ icon: 'folder' }
			]
		});
	},
	
	clicked: function(e) {
		var item = mui.getAncestorByTagName(e.target, 'li');
		if(item) {
			this.navigationController.pushViewController(Mail.MessageController, { id: Math.random() });
		}
	}
});