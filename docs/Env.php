<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>Environment</h2>
      <div class="intro">
        MUI's Environment class provides a handful of read-only properties that contain browser information including the device type, OS version, and some capability support info.
      </div>
      <div class="usage">
        <h3>Usage</h3>
        <p>Using MUI's Environment class is extremely simple to use. It exposes the <strong><code>mui.UA</code></strong> object, which contains the following properties, each of which has a boolean value (and are all pretty self-explanatory): <code>Apple</code>, <code>Safari</code>, <code>iPhone3</code>, <code>webOS</code>, <code>Android</code>, <code>WebKit</code>, <code>Gears</code> (if the device supports Google's now deprecated local storage &amp; geolocation shim), and <code>CSSTransitions</code>.</p> 
        <p>A note of caution about using this class. If you find yourself reaching for the Environment class to query device information, consider whether you can achieve your aim using object detection. For instance, if you want to check whether a device supports HTML5 databases, you shouldn't use the environment class to see if the device is running one of the OSs that supports them. Rather, you should test whether the <code>window.openDatabase</code> method exists.</p>

      </div><!--Usage-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
