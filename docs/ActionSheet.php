<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
    <link rel="stylesheet" href="action-sheet/assets/skins/default/action-sheet-skin.css" type="text/css" media="screen" />
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>ActionSheet</h2>
      <div class="intro">
        The ActionSheet class allows you to create a modal sheet view, containing some number of buttons, that pops up from the bottom of the screen.
      </div>
      <div id="usage">
        <h3>Usage</h3>
        <p>Creating an action sheet with the ActionSheet class is pretty simple. You just need to use the ActionSheet contsructor like this:</p>
        <pre><code class="javascript">
          var myActionSheet = new mui.ActionSheet({ 
            ...initialization code goes here... 
          })
        </code></pre>
        <p>The properties that can go into the initialization object are the following:</p>
        <dl class="params">
          <dt>title</dt>
          <dd>The title that goes on top of the actionsheet</dd>
          <dt>cancelButton</dt>
          <dd>The button to dismiss the actionsheet (styled dark gray in the default skin)</dd>
          <dt>destructiveButton</dt>
          <dd>A button to handle any destuctive type actions, such as deleting a record (styled red in the default skin)</dd>
          <dt>otherButtons</dt>
          <dd>An array of other button objects</dd>
        </dl>
        <p>Each button type (cancel, destructive, other) is itself an object the properties of which will be <code>title</code>, which sets the text on the button, and <code>action</code>, which takes a function to be executed when the button is pressed.</p>
        <p>Once you've got your ActionSheet object set up correctly, you can call its <code>show</code> method:</p>
        <pre><code class="javascript">
          myActionSheet.show();
        </code></pre>
        <p>Lastly, you'll probably want to include the assets (CSS and images) for the ActionSheet that ship with MUI. At the very least, you'll probably want to use them as a starting point for making your own skin.</p>
        
        <h5>Examples</h5>
        <div class="example">
          Here's a simple example that creates an ActionSheet when you press a button:

          <pre><code class="javascript">
              mui.on("#actionSheetDemo","touchend",function(){
                new mui.ActionSheet({
                  title: "ActionSheet test",
                  cancelButton: {title: 'Cancel'},
                  destructiveButton: { title: 'Initiate Launch Sequence', 
                                       action: function(){ alert("boom.") }
                  }
                }).show();
              })
            </code></pre>
          This example will only have two buttons: a cancel button and a destructive button. The destructive button will pop up an alert when pressed.

          In this example, we called ActionSheet's <code>show</code> method directly on our newly created object. This means that every time the button is clicked, it makes a new ActionSheet object. That's obviously not what we want and was just for the sake of keeping the example succinct. If you create an ActionSheet in your application, you'll want to store it in a variable and invoke <code>show</code> (and possibly <code>hide</code>, although you shouldn't need to) on that, instead.
          <div class="demo">
            <h6>Demo</h6>
            See it in action:
            <p><button id="actionSheetDemo">Click me</button></p>
          </div><!--/demo-->
        </div><!--/example-->
      </div><!--/usage-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
