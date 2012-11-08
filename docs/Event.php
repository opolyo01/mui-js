<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>Event</h2>
      <div class="intro">
        <p>The Event class provides a handful of methods for working with events. Arguably more important than these methods, however, are the things that MUI does with events under the hood. Since not all devices currently support touch events (touchstart, touchmove, etc.), MUI's Event class adds support for these events on devices that don't support them natively. As such, if you plan on working with touch events, you'll be better off working with MUI's event methods than directly with native event handlers.</p>
      </div>
      <div id="usage">
        <h3>Usage</h3>
        Details on how to use specific methods can be found in the <a href="#methods">methods section</a>, but it's worth taking a moment to look at the parameters that are shared among all of the public methods in the Event class.
        <p><strong>el</strong>, like in many other parts of MUI, can be either an HTMLElement object, or a string containing a valid CSS selector</p>
        <p><strong>type</strong> is just the name of the event to be handled. The feature that bears a little explanation though, is that you can go ahead and use events such as <code>touchstart</code>, <code>touchmove</code>, and <code>touchend</code> even on devices that don't support them (for instance, Android < 2.2 does not support touch events).</p>
        <p><strong>fn</strong> is just the callback that should be executed when the event is detected.</p>
        <p><strong>ctx</strong> is the scope in which the callback should be executed. In almost all cases, if you specify a value for this parameter, it will be <code>this</code>. MUI uses other values behind the scenes in the ApplicationController class (and its associated classes). In almost all cases, you'll probably leave this one alone.</p>
        <p><strong>useCapture</strong> takes a boolean value, indicating whether to use the capture event flow. This parameter is used in precisely the same way as in the standard DOM Levels 2 and 3 <code>addEventListener</code> method.</p>
      </div>
      <div id="methods">
        <h3>Methods</h3>
        <ul>
          <li id="on">
            <h4>.on(<span class="params">el, type, fn, ctx, useCapture</span>)</h4>
            <p class="description">Listen for events on a given node.</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>type</dt>
                <dd>The event type (click, touchstart, etc.) (String)</dd>
                <dt>fn</dt>
                <dd>The callback function to be executed when the event fires (Function)</dd>
                <dt>ctx</dt>
                <dd>The scope to be applied to the callback (Object)</dd>
                <dt>useCapture</dt>
                <dd>Whether or not to initiate capture</dd>
              </dl>
              <code>on</code> creates an event listener on the specified element. Events of the specified type will be handled until the listener is removed (with <a href="#removeEventListener"><code>mui.removeEventListener</code></a>). For a more detailed explanation of the parameters, read the <a href="#usage">usage</a> section above.

              <h5>Examples</h5>
              <div class="example">
                <code>mui.on</code> works like you would expect it to. As an example, let's add an event listener to a button, and have it pop up an alert when clicked.
                <pre><code class="html">
                  &lt;button id="onDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                The code to handle the event would look something like this:
                
                <pre><code class="javascript">
                  mui.on("#onDemo","touchend",function(){
                    alert("I'm touched!!");
                  });
                </code></pre>

                Notice that we're setting the <code>touchend</code> event. This will work on any device (including desktop browsers), regardless of whether the device supports touch events.

                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p><button id="onDemo">Click me</button></p>
                  Note that you can keep clicking, and the event handler is always fired.
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/on-->

          <li id="one">
            <h4>.one(<span class="params">el, type, fn, ctx, useCapture</span>)</h4>
            <p class="description">Listen for events on a given node.</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>type</dt>
                <dd>The event type (click, touchstart, etc.) (String)</dd>
                <dt>fn</dt>
                <dd>The callback function to be executed when the event fires (Function)</dd>
                <dt>ctx</dt>
                <dd>The scope to be applied to the callback (Object)</dd>
                <dt>useCapture</dt>
                <dd>Whether or not to initiate capture</dd>
              </dl>
              <code>one</code> creates an event listener on the specified element. However, unlike <a href="#on"><code>on</code></a>, the event will be removed after the first time it is triggered.

              <h5>Examples</h5>
              <div class="example">
                <code>mui.one</code> behaves exaclty like <code>on</code> the first time the event is triggered. Subsequent events will not be handled. Substituting <code>one</code> in the example given above for <code>on</code> would result in a button that pops up an alert the first time it's touched (or clicked) and does nothing when clicked again. Here's the button:

                <pre><code class="html">
                  &lt;button id="oneDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                And we'll handle the event like this:
                
                <pre><code class="javascript">
                  mui.one("#oneDemo","touchend",function(){
                    alert("I'm touched!!");
                  });
                </code></pre>

                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p><button id="oneDemo">Click me</button></p>
                  After the button has been clicked once, it no longer does anything.
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/one-->

          <li id="removeEventListener">
            <h4>.removeEventListener(<span class="params">el, type, fn, ctx, useCapture</span>)</h4>
            <p class="description">Stop listening for an event on a given node.</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>type</dt>
                <dd>The event type (click, touchstart, etc.) (String)</dd>
                <dt>fn</dt>
                <dd>The callback function to be executed when the event fires (Function)</dd>
                <dt>ctx</dt>
                <dd>The scope to be applied to the callback (Object)</dd>
                <dt>useCapture</dt>
                <dd>Whether or not to initiate capture</dd>
              </dl>
              <code>removeEventListener</code> just removes the event listeners that have been created with <a href="#on"><code>on</code></a> or <a href="one"><code>one</code></a>.

              <h5>Examples</h5>
              <div class="example">
                Say we want a button that will pop up an alert every time it is clicked until the user clicks another button saying they don't want any more alerts:

                <pre><code class="html">
                  &lt;button id="oneDemo&gt;Click me&lt;/button&gt;
                  &lt;button id="stopAlerts&gt;Make the alerts stop!!&lt;/button&gt;
                </code></pre>

                First we'll add the event like this:
                
                <pre><code class="javascript">
                  mui.on("#removeListenerDemo","touchend",function(){
                    alert("I'm touched!!");
                  });
                </code></pre>

                And then remove it when another button is clicked:

                <pre><code class="javascript">
                  mui.one("#stopAlerts","touchend",function(){
                    mui.removeEventListener("#removeListenerDemo","touchend");
                  });
                </code></pre>

                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p>
                    <button id="removeListenerDemo">Click me</button> 
                    <button id="stopAlerts">Make the alerts stop!</button>
                  </p>
                  The "Click me" button will continue to pop up an alert every time it is clicked, until you click the other button.
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/on-->
        </ul>
      </div><!--/methods-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
