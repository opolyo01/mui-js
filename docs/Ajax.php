<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>Ajax</h2>
      <div class="intro">
        MUI's Ajax class gives you a super-simple interface for creating Ajax requests. It abstracts away a lot of the complexity for routine calls, but still gives you easy access to more configuration options when you need them. 
      </div>
      <div id="methods">
        <h3>Methods</h3>
        <ul>
          <li id="io">
            <h4>.io(<span class="params">url, options</span>)</h4>
            <p class="description">XMLHttpRequest wrapper for asynchronous connections</p>
            <div class="detail">
              <dl class="params">
                <dt>url</dt>
                <dd>The endpoint for the request (String)</dd>
                <dt>options</dt>
                <dd>An object containing configuration options (see below for specific options)(Object)</dd>
              </dl>
              
              <h5>Examples</h5>
              <div class="example">
                For a simple example, let's just make a GET request and then pop up an alert with the text we get back. We'll trigger the request when a button is touched:
                
                <pre><code class="html">
                  &lt;button id="ioDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                We just need to set up the endpoint for the request, and then specify a callback. We also provided the HTTP method, but GET is the default, and that's we wanted, so that's techinically optional in this case. 
                
                <pre><code class="javascript">
                  mui.on("#ioDemo","touchend",function(){
                    mui.io('/ajaxtest.php',{
                      method: 'get',
                      callback: {
                        success: function(o){
                          alert(o.responseText);
                        }
                      }
                    })
                  });
                </code></pre>

                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p><button id="ioDemo">Click me</button></p>
                </div><!--/demo-->
              </div><!--/example-->

              <div class="example">

                In the last example, we just popped up an alert with the text we got back from the Ajax request. But MUI's <code>io</code> gives us another option for handling the data. When we give a node (or selector) as the value of the <code>update</code> property, that node will be updated with the response data when the request returns.
                
                <pre><code class="html">
                  &lt;button id="updateDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                Here's the MUI code. Pretty much the same as the previous example, but we use the <code>update</code> property instead of a callback:
                
                <pre><code class="javascript">
                  mui.on("#updateDemo","touchend",function(){
                    mui.io('/ajaxtest.php',{
                      method: 'get',
                      update: '#ioData'
                    })
                  });
                </code></pre>

                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p><button id="updateDemo">Click me</button></p>
                  <p id="ioData"></p>
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/io-->

          <li id="getScript">
            <h4>.getScript(<span class="params">url, callback, scope</span>)</h4>
            <p class="description">Fetch an external script resource</p>
            <div class="detail">
              <dl class="params">
                <dt>url</dt>
                <dd>The URL of the script (String)</dd>
                <dt>callback</dt>
                <dd>Callback invoked when the script is downloaded (Function)</dd>
                <dt>scope</dt>
                <dd>The scope in which the callback will be executed (Object)</dd>
              </dl>
              <code>getScript</code> works by appending a <code>script</code> tag to the document's head and sets its <code>src</code> attribute to the value of the <code>url</code> argument. The most likely use for this method is probably for handling JSON-P data.

            </div><!--/detail-->
          </li><!--/getScript-->

        </ul>
      </div><!--/methods-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
