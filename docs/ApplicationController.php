<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>ApplicationController</h2>
      <div class="intro">
        <p>The ApplicationController class is fundamental to all MUI applications, since every application must have one (and only one) instance of this class. The ApplicationController instance is responsible for (among other things):</p>
        <ul>
          <li>Registering navigation controllers</li>
          <li>Setting the application's default route</li>
          <li>Dispatching view controllers</li>
        </ul>
        <p>This is all to say that the ApplicationController class is central to the functioning of a MUI app.</p>
      </div>

      <div class="usage">
        <h3>Usage</h3>
        <p>The application controller is where a good deal of an application's behavior is handled. Fortunately, a lot of what the application controller does is actually handled automatically, requiring little or no effort on the part of the developer. Among the functions an application controller handles by default are:</p>
        <ul>
          <li>
            Ensuring that the visible view controller takes up the maximum amount of vertical space in the viewport, allowing for a header and footer, as well
          </li>
          <li>Implementing support for touch events on devices that don't support them natively</li>
          <li>Monitoring the browser's history for back button support</li>
        </ul>

        <p>Of course not everything that you'll do with application controllers is done for you. To see a full, working example of an application controller, along with a navigation controller, and view controllers, check out the <a href="GettingStarted.php">Getting Started guide</a>.</p>
      </div>
    </div>
    
  </body>
</html>
