<!doctype html>
<html>
	<head>
		<title>mail.app</title>

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		
		<link rel="apple-touch-startup-image" href="img/splash.png" />
		<link rel="apple-touch-icon-precomposed" href="img/mail-icon.png"/>

		<?php if($_GET['_dev'] === '1'): ?>
		<link rel="stylesheet" href="../../src/mui/assets/reset.css" type="text/css" media="screen" title="no title" charset="utf-8"/>			
		<link rel="stylesheet" href="../../src/scroll-view/assets/skins/default/scroll-view-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>	
		<link rel="stylesheet" href="../../src/navigation-bar/assets/skins/default/navigation-bar-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>	
		<link rel="stylesheet" href="../../src/tab-view/assets/skins/default/tab-view-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
		<link rel="stylesheet" href="../../src/search-box/assets/skins/default/search-box-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
		<link rel="stylesheet" href="../../src/web-app/assets/skins/default/web-app-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
		<link rel="stylesheet" href="../../src/button/assets/skins/default/button-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>		
		<?php else: ?>
		<link rel="stylesheet" href="../../build/web-app/assets/skins/default/web-app.css" type="text/css" media="screen" title="no title" charset="utf-8"/>	
		<?php endif; ?>
		
		<link rel="stylesheet" href="../../src/action-sheet/assets/skins/default/action-sheet-skin.css" type="text/css" media="screen" title="no title" charset="utf-8"/>		
		
		<link rel="stylesheet" href="css/mail.css" type="text/css" media="screen" title="no title" charset="utf-8"/>

		<?php if($_GET['_dev'] === '1'): ?>
		<script src="../../src/mui/js/mui.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/storage/js/Storage.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/navigator/js/Navigator.js" type="text/javascript" charset="utf-8"></script>		
		<script src="../../src/tab-view/js/TabView.js" type="text/javascript" charset="utf-8"></script>				
		<script src="../../src/scroll-view/js/ScrollView.js" type="text/javascript" charset="utf-8"></script>				
		<script src="../../src/navigation-bar/js/NavigationBar.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/transition/js/Transition.js" type="text/javascript" charset="utf-8"></script>		
		<script src="../../src/web-app/js/ApplicationController.js" type="text/javascript" charset="utf-8"></script>			
		<script src="../../src/web-app/js/NavigationController.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/web-app/js/ViewController.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/search-box/js/SearchBox.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../src/action-sheet/js/ActionSheet.js" type="text/javascript" charset="utf-8"></script>	
		<script src="../../src/button/js/Button.js" type="text/javascript" charset="utf-8"></script>						
		<?php else: ?>
		<script src="../../build/web-app/web-app-min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../build/action-sheet/action-sheet-min.js" type="text/javascript" charset="utf-8"></script>	
		<?php endif; ?>

		<script type="text/javascript" charset="utf-8">
			mui.provide('Mail');
			Mail.AppConfig = {
				id: 'dev_mailapp_1',
				title: 'Dev Mail Dot App 1',
				version: '0.1',
				persistenceMode: 'all',
				scrollViews: {
					fullScreenMode: true,
					chromeMode: true
				}
			};
		</script>
		<script src="js/controllers/accountListController.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/controllers/accountController.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/controllers/messageListController.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/controllers/messageController.js" type="text/javascript" charset="utf-8"></script>		
		<script src="js/controllers/moveMessageController.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/controllers/composeController.js" type="text/javascript" charset="utf-8"></script>		
		<script src="js/modules/footer.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/app.js" type="text/javascript" charset="utf-8"></script>

	</head>

	<body x-mui-loading="true">
		<header>
		</header>
		<div id="mui-views">
			<div id="view-accountList"></div>
			<div id="view-account"></div>
			<div id="view-messageList"></div>
			<div id="view-message"></div>
			<div id="view-compose">
				<form id="form-compose">
					<div id="compose-to" class="formfield">
						<label for="input-to">To:</label>
						<input type="text" tabindex="000" name="input-to" id="input-to" />
					</div>
					<div id="compose-cc" class="formfield">
						<label for="input-cc">Cc/Bcc:</label>
						<input type="text" name="input-cc" id="input-cc" />
					</div>
					<div id="compose-subject" class="formfield">
						<label for="input-subject">Subject:</label>
						<input type="text" name="input-subject" id="input-subject" />					
					</div>
					<div id="compose-body">
						<textarea name="input-body" id="input-body">
						</textarea>
					</div>
				</form>
			</div>
			
			<div id="view-movemessage">
				<div id="account">
					<ul>
						<li class="mui-list-item mui-selectable">
							<div class="icon inbox"></div>
							<div class="mui-title">Inbox</div>
							<div class="message-count">26</div>
						</li>
						<li class="mui-list-item mui-selectable">
							<div class="icon draft"></div>
							<div class="mui-title">Drafts</div>
						</li>
						<li class="mui-list-item mui-selectable">
							<div class="icon sent"></div>
							<div class="mui-title">Sent</div>
						</li>
						<li class="mui-list-item mui-selectable">
							<div class="icon trash"></div>
							<div class="mui-title">Trash</div>
						</li>
						<li class="mui-list-item mui-selectable">
							<div class="icon folder"></div>
							<div class="mui-title">Archive</div>
						</li>
						<li class="mui-list-item mui-selectable">
							<div class="icon folder"></div>
							<div class="mui-title">Bulk Mail</div>
						</li>
						<li class="mui-list-item"></li>
						<li class="mui-list-item"></li>
						<li class="mui-list-item"></li>
						<li class="mui-list-item"></li>
					</ul>
				</div>
			</div>
		</div>
		
		<footer>
			<div id="footer-left"></div>
			<div id="footer-center"></div>
			<div id="footer-right"></div>
		</footer>
	</body>
</html>