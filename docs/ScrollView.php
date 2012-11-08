<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
    <link rel="stylesheet" href="scroll-view/assets/skins/default/scroll-view-skin.css" type="text/css" media="screen" />
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>ScrollView</h2>
      <div class="intro">
        MUI's ScrollView class allows you to build interfaces with two or more pages (or "panes") that the user may navigate with swipes (or with navigation buttons/links). A ScrollView can be built to scroll either horizontally, vertically, or both.
      </div>
      <div id="usage">
        <h3>Usage</h3>
        <p>As is the case with all of MUI's UI widget classes, the way to use ScrollView is to instantiate the class and pass in an object with some configuration properties. Here's a brief explanation of those properties:</p>
        <dl class="params">
          <dt>element</dt>
          <dd>A CSS selector that picks out the element that will serve as the scrollview's container</dd>
          <dt>axis</dt>
          <dd>The axis along which to scroll. Acceptable values are: x (horizontal), y (vertical), or xy (both)</dd>
          <dt>size</dt>
          <dd>The size of the scrollview. This can be either a fixed value in pixels or a percentage of the container element</dd>
          <dt>pagingEnabled</dt>
          <dd>Tells the scrollview to enable paging. If paging is enabled, scrolling will stop on each discrete page. If the value of this property is 'true', the paginator property must also me set.</dd>
          <dt>paginator</dt>
          <dd>The paginator property itself takes an object as its value. The one required property is pageSelector, which takes a CSS selector string that picks out the element that constitutes a "page". Additionally, you can specify an element property. If it's set, the value of this property will contain the paging controls</dd>
          <dt>showsHorizontalScrollIndicator & showsVerticalScrollIndicator</dt>
          <dd>If either of these properties are given the value 'true', a custom scrollbar element will be added to the scrollview</dd>
        </dl>

        <p>Lastly, you'll probably want to include the CSS for the ScrollView that ships with MUI, as well as MUI's CSS reset. At the very least, you'll probably want to use them as a starting point for making your own skin.</p>
        
        <h5>Examples</h5>
        <div class="example">
          <p>Here's an example of ScrollView being used to implement a slideshow:</p>

          <pre><code class="javascript">
// Create the ScrollView instance
var scrollView = new mui.ScrollView({
  // specify the container for the scrollview
  element: '#slideshow',

  // scroll horizontally
  axis: 'x',
  size: '100%',
  pagingEnabled: true,
  paginator: {

    // tell the scrollview that the page element is an .item
    pageSelector: '.item'
  },
  showsHorizontalScrollIndicator: false
});
          </code></pre>
          
          <p>If you want to include navigation links in addition to the swipe control, you can add event handlers to them that will call the scrollview's pagination methods like so:</p>

          <pre><code class="javascript">
  mui.on('#next', 'click', mui.bind(scrollView.nextPage, scrollView));
  mui.on('#prev', 'click', mui.bind(scrollView.prevPage, scrollView));
          </code></pre>
          
          <p> Here is the <a href="examples/scroll-view.html">full, working example</a>.</p>
        </div><!--/example-->
      </div><!--/usage-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
