<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>Animation</h2>
      <div class="intro">
        MUI's Animation class (and its one and only method) provides a simple way to animate an element's position. It wraps the <code>-webkit-transition</code> property.
      </div>
      <div class="usage">
        <h3>Usage</h3>
        <dl class="params">
          <dt>el</dt>
          <dd>The element to animate (String|Object)</dd>
          <dt>options</dt>
          <dd>An object containing configuration options for the animation. Supported properties are: properties, easing, duration, callback (Object)</dd>
        </dl> 
        <p>Using MUI's Anim class is pretty straightforward. Just pass in an element object or a valid CSS selector as the first argument, and an object containing some configuration properties as the second argument. The supported properties for the configuration object are:</p>
        <ul>
          <li><strong>properties</strong> takes another object specifying the position where you want your animated element to end up.</li>
          <li><strong>easing</strong> can have a value of either <code>ease-in</code>, <code>ease-out</code>, or <code>ease-in-out</code>. The default is <code>ease-in-out</code></li>
          <li><strong>duration</strong> specifies how long the animation should take to complete.</li>
          <li><strong>callback</strong> is a function to be executed when the animation is complete.</li>
        </ul>
        <div class="example">
          <h3>Example</h3>
          <p>Here's a simple example. We have a blue box, and we want to move it to the right when it's clicked.</p>
          <div id="animBox" style="background-color: blue; height: 2em; width: 2em;"></div>
          <p>And here's the code:</p>
          <pre><code class="javascript">
  var box = mui.get("#animBox");
  mui.one(box,"click",function(e){
    mui.animate(box,{
      properties: {
        left: '300px',
      },
      easing: 'ease-out',
      duration: '0.5s'
    });
  });
            </code>
          </pre>
        </div><!--example-->
      </div><!--Usage-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
