<!doctype html>
<html>
	<head>
		<title>mui.ScrollView Paging</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
		
		<style type="text/css" media="screen">
        
        html, body {
            background: #000;
        }
        
        #container {
            margin: 0 auto;
            overflow: hidden;
            white-space: nowrap;
            background: #fff;
            position: relative;
        }
        
        #slideshow .item {
            display: inline-block;
            height: 100%;
            width: 100%;
            text-align: center;
        }
        
        #slideshow p {
            width: 320px;
            vertical-align: middle;
            -webkit-transform: translate3d(0, 0, 0); /* Prevent flicker when images are sliding */
        }
        
        #controls {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0,0,0,0.5);
            color: #fff;
            text-align: right;
        }
        
		</style>
		
		<script src="../js/mui/mui.js" type="text/javascript" charset="utf-8"></script>
		<script src="../swipe-view/js/SwipeView.js" type="text/javascript" charset="utf-8"></script>
		
		<script type="text/javascript" charset="utf-8">
		mui.on(window, 'load', function() {
		    
		    // Create a paged scroll view
			var swipeView = new mui.SwipeView({
				element: '#slideshow'
			});
			
			// Bind the next and prev UI elements to the pager
			mui.on('#next', 'click', mui.bind(scrollView.nextPage, scrollView));
			mui.on('#prev', 'click', mui.bind(scrollView.prevPage, scrollView));
			
			// Hide the address bar
			setTimeout(scrollTo, 0, 1, 200);
		});
		</script>
	</head>
	
	<body>
			<div id="slideshow">
				<div class="item">
          <img src="http://farm4.static.flickr.com/3075/2780196013_b5e2db2286.jpg" />
          <p><a href="http://www.flickr.com/photos/nationalmediamuseum/2780196013/">http://www.flickr.com/photos/nationalmediamuseum/2780196013/</a></p>
				</div>
				<div class="item">
          <img src="http://farm3.static.flickr.com/2331/2179925802_d41fc4a497.jpg" />
          <p><a href="http://www.flickr.com/photos/library_of_congress/2179925802/">http://www.flickr.com/photos/library_of_congress/2179925802/</a></p>
				</div>
				<div class="item">
          <img src="http://farm3.static.flickr.com/2110/2488800747_fe080c16f9.jpg" />
          <p><a href="http://www.flickr.com/photos/brooklyn_museum/2488800747/">http://www.flickr.com/photos/brooklyn_museum/2488800747/</a></p>
				</div>
			</div>
	</body>
</html>
