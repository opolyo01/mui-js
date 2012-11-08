<!DOCTYPE html>
<html>
  <head>
    <?php include('includes/head.php'); ?>
  </head>
  <body class="doc <?php echo $current_page?>">
    <?php include('includes/header.php'); ?>
    <?php include('includes/nav.php'); ?>
    <div class="content">
      <h2>DOM</h2>
      <div class="intro">
        <p>MUI's DOM class contains several utility methods for accessing and manipulating DOM nodes and their CSS properties. In most cases, the DOM methods are thinly wrapped around native browser functions. This ensures that you don't get too much extra page weight along with the convenience that the methods provide.</p>
      </div>
      <div id="methods">
        <h3>Methods</h3>
        <ul>
          <li id="addClass">
            <h4>.addClass(<span class="params">el, className</span>)</h4>
            <p class="description">Add a class name to a DOM Node</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>className</dt>
                <dd>The class to be added</dd>
              </dl>
              <code>addClass</code> works just like you would expect it to. Give it an element (or selector) and a class name, and that class will be applied to the element.
              <h5>Examples</h5>
              <div class="example">
                A simple example. Say we want to apply the class "hidden" to all elements that have the class "peekaboo" when a button is clicked:
                <pre><code class="html">
                  &lt;p class="peekaboo"&gt;I see you&lt;/p&gt;
                  &lt;button id="addClassDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                We just need a couple lines of Javascript:
                
                <pre><code class="javascript">
                  mui.on("#addClassDemo","click",function(){
                    mui.addClass(".peekaboo","hidden");
                  });
                </code></pre>

                Of course, this demo assumes that we have a CSS rule that sets <code>display:none</code> on elements with the <code>hidden</code> class.
                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p class="peekaboo">I see you!</p>
                  <button id="addClassDemo">Click me</button>
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/addClass-->

          <li id="removeClass">
            <h4>.removeClass(<span class="params">el, className</span>)</h4>
            <p class="description">Remove a class name from a DOM Node</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>className</dt>
                <dd>The class to be removed</dd>
              </dl>
              <code>removeClass</code> does the exact opposite job of <code><a href="#addClass">addClass</a></code>. That is, if you give it an element (or CSS selector) and a class, it will remove the class from that element.
            </div><!--/detail-->
          </li><!--/addClass-->

          <li id="hasClass">
            <h4>.hasClass(<span class="params">el, className</span>)</h4>
            <p class="description">Test whether a DOM Node has a given class name</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>className</dt>
                <dd>The class to be checked</dd>
              </dl>
              <code>hasClass</code> simply checks whether the given element has the class you specify. It is most likely to be used in conjunction with <code><a href="#addClass">addClass</a></code> or <code><a href="#removeClass">removeClass</a></code>. <code>hasClass</code> returns a boolean.
            </div><!--/detail-->
          </li><!--/addClass-->

          <li id="toggleClass">
            <h4>.toggleClass(<span class="params">el, className</span>)</h4>
            <p class="description">Add a class name to a DOM Node if the node doesn't already have it. Otherwise the class will be added.</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>The CSS selector string or DOM node (String|Object)</dd>
                <dt>className</dt>
                <dd>The class to be toggled (String)</dd>
              </dl>
              <code>toggleClass</code> essentially encapsulates the most common use for the <code><a href="#addClass">addClass</a></code>, <code><a href="#removeClass">removeClass</a></code>, and <a href="#hasClass"><code>hasClass</code></a> methods. When it is given an element and a class name, it checks to see whether the element has that class. If it doesn't, the class is added. If it does, the class is removed.
              <h5>Examples</h5>
              <div class="example">
                Let's extend the example from <a href="#hasClass"><code>hasClass</code></a>. We want to alternately hide and show a paragraph with the class <code>peekabo</code> when a button is clicked.

                <pre><code class="html">
                  &lt;p class="peekaboo"&gt;I see you&lt;/p&gt;
                  &lt;button id="addClassDemo&gt;Click me&lt;/button&gt;
                </code></pre>

                We just need a couple lines of Javascript:
                
                <pre><code class="javascript">
                  mui.on("#toggleClassDemo","click",function(){
                    mui.toggleClass(".peekaboo","hidden");
                  });
                </code></pre>

                As above, this demo assumes that we have a CSS rule that sets <code>display:none</code> on elements with the <code>hidden</code> class.
                <div class="demo">
                  <h6>Demo</h6>
                  See it in action:
                  <p class="peekaboo">I see you!</p>
                  <button id="toggleClassDemo">Click me</button>
                </div><!--/demo-->
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/addClass-->

          <li id="contains">
            <h4>.contains(<span class="params">parent, el, orig</span>)</h4>
            <p class="description">Check if a node is contained in another node</p>
            <div class="detail">
              <dl class="params">
                <dt>parent</dt>
                <dd>The CSS selector string or DOM node for the parent node (String|Object)</dd>
                <dt>el</dt>
                <dd>The CSS selector string or DOM node for the parent node (String|Object)</dd>
                <dt>orig</dt>
                <dd>The original parent node (used in recursion) (HTMLElement)</dd>
              </dl>

              <p>When you give <code>contains</code> two nodes, it will search recursively through all of the children of the parent node to see if the other node is one of those children. It returns a boolean.</p>

              <p>A note about the third paramter: <code>orig</code>. You probably won't have occasion to give an argument for this parameter, as it is only used when calling the method recursively. If you don't give a value for it, it is assumed to be the same as the parent node you specified, which in almost all cases is what you want.</p>
            </div><!--/detail-->
          </li><!--/contains-->

          <li id="createElement">
            <h4>.createElement(<span class="params">nodeName, options</span>)</h4>
            <p class="description">Create an HTML Element. Returns an HTMLElement.</p>
            <div class="detail">
              <dl class="params">
                <dt>nodeName</dt>
                <dd>The node name of the element to be created (String)
                </dd>
                <dt>options
                </dt>
                <dd>The attributes to add to the node, and their values (Object)
                </dd>
              </dl>
              <h5>Examples</h5>
              <div class="example">
                Say we want to create a new image element as well as set its <code>src</code> and <code>alt</code> attributes, you could simply run the following line of Javascript:
                <pre><code class="javascript">
                  var myImg = mui.createElement('img',{src: "/images/kitteh.jpg",alt: "Cat picture"});
                </code></pre>
                <code>myImg</code> will then contain an image element that you could add to the DOM using MUI's <a href="#insertBefore"><code>insertBefore</code></a> or <a href="#insertAfter"><code>insertAfter</code></a> methods (or similar methods from the DOM).
              </div>
              <div class="example">
                Another great feature of <code>createElement</code> is that you can use it to directly set an element's content when you create it. For instance, this code:
                <pre><code class="javascript">
                  mui.createElement('p',{ innerHTML: "The name's Perry Graph" });
                </code></pre>
                will create a paragraph element with the given content:
                <pre><code class="html">
                  &lt;p&gt;The name's Perry Graph.&lt;/p&gt;
                </code></pre>
              </div>
            </div><!--/.detail-->
          </li><!--/createElement-->

          <li id="css">
            <h4>.css(<span class="params">css</span>)</h4>
            <p class="description">Adds a CSS rule to the document</p>
            <div class="detail">
              <dl class="params">
                <dt>nodeName</dt>
                <dd>A string containg the CSS rule (String)</dd>
                <dt>options
                </dt>
                <dd>The attributes to add to the node, and their values (Object)
                </dd>
              </dl>
              This method creates a new stylesheet node containing the given rule and then adds it to the document head.
            </div><!--/.detail-->
          </li><!--/css-->

          <li id="get">
            <h4>.get(<span class="params">selector, parentNode</span>)</h4>
            <p class="description">Retrieve an element from the DOM. Returns an HTMLElement.</p>

            <div class="detail">
              <p>It should be noted that MUI does not implement its own selector engine, and just utilizes the browser's own selector engine. A consequence of this is that if the browser does not support a given selector, neither will mui.get() in that browser.</p>
              <dl class="params">
                <dt>selector</dt>
                <dd>A valid CSS selector (String)</dd>
                <dt>parentNode</dt>
                <dd>Query the DOM relative to this node, if present (HTMLElement)</dd>
              </dl>
              <h5>Examples</h5>
              <div class="example">
                <p>Retrieve the first list item from the following list:</p>
                <pre><code class="html">
                  &lt;ul class="fooList"&gt;
                    &lt;li&gt;Foo&lt;/li&gt;
                    &lt;li&gt;Bar&lt;/li&gt;
                    &lt;li&gt;Baz&lt;/li&gt;
                  &lt/ul&gt;
                </code></pre>
                <p>A simple mui.get() is all it takes:</p>
                <pre><code class="javascript">
                  mui.get(".fooList li:first-child");
                </code></pre>
                <p>That's all there is to it!</p>
                <p>Alternatively, if we had already cached the unordered list, we could then pass it in as a second argument to .get() which would limit the search to children of that element.</p>
                <pre><code class="javascript">
                  var listEl = mui.get("fooList"); // cache the unordered list in a variable
                  var myLi = mui.get("li",listEl);
                </code></pre>
                <p><code>.get()</code> only searches the nodes that are children of <code>ul.fooList</code>, and even though there are multiple <code>li</code> children, <code>.get()</code> only returns the first.</p>
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/get-->


          <li id="getAll">
            <h4>.getAll(<span class="params">selector, parentNode</span>)</h4>
            <p class="description">Retrive all elements from the DOM matching a selector. Returns an array.</p>
            <div class="detail">
              <dl class="params">
                <dt>selector</dt>
                <dd>A valid CSS selector (String)</dd>
                <dt>parentNode</dt>
                <dd>Query the DOM relative to this node, if present (HTMLElement)</dd>
              </dl>
              <h5>Examples</h5>
              <div class="example">
                <p><code>.getAll()</code> works exactly like <a href="#get"><code>.get()</code></a>, but it returns an array of elements instead of just the first one matching the selector. For instance, if we have a list like this:</p>
                <pre><code class="html">
                  &lt;ul class="fooList"&gt;
                    &lt;li&gt;Foo&lt;/li&gt;
                    &lt;li&gt;Bar&lt;/li&gt;
                    &lt;li&gt;Baz&lt;/li&gt;
                  &lt/ul&gt;
                </code></pre>
                We can get an array of the list elements like so:
                <pre><code class="javascript">
                  mui.get(".fooList li"); // Returns an array of li nodes.
                </code></pre>
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/getAll-->

          <li id="getStyle">
            <h4>.getStyle(<span class="params">el, style</span>)</h4>
            <p class="description">Get the computed style of a given element. Returns a string.</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>A valid CSS selector or DOM node (Object|String)</dd>
                <dt>style</dt>
                <dd>The name of the CSS property whose value you're getting (String)</dd>
              </dl>
              <code>getStyle</code> is a wrapper around <code>getComputedStyle</code> that allows you to query the value of a CSS property on an element. You can pass an HTML element or a CSS selector as the first argument to the method.
            </div><!--/detail-->
          </li><!--/getStyle-->

          <li id="setStyle">
            <h4>.setStyle(<span class="params">el, name, value</span>)</h4>
            <p class="description">Set a single style on a given element</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>A valid CSS selector or DOM node (Object|String)</dd>
                <dt>name</dt>
                <dd>The name of the CSS property whose value you're setting (String)</dd>
                <dt>value</dt>
                <dd>The desired value of the style proprty</dd>
              </dl>
              <code>setStyle</code> takes an element (or CSS selector), the name of a CSS property, and a value for that property and sets the property with that value on the element. To set multiple styles at once, use <a href="#setStyles"><code>setStyles</code</a>.
            </div><!--/detail-->
          </li><!--/setStyle-->

          <li id="setStyles">
            <h4>.setStyles(<span class="params">el, styles</span>)</h4>
            <p class="description">Set multiple styles on a given element</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>A valid CSS selector or DOM node (Object|String)</dd>
                <dt>styles</dt>
                <dd>An object literal containg one or more style properties (object keys) and values (object values) (Object)</dd>
              </dl>
              <code>setStyles</code> works just like <a href="#setStyle"><code>setStyle</code></a>, but you can set several styles at once by passing them in as an object literal.
            </div><!--/detail-->
          </li><!--/setStyles-->

          <li id="getXY">
            <h4>.getXY(<span class="params">el</span>)</h4>
            <p class="description">Get the (x,y) coordinates of a given element</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>A valid CSS selector or DOM node (Object|String)</dd>
              </dl>
              When given an HTML element (or a selector that picks out an element), <code>getXY</code> returns an array whose only elements are the X and Y coordinates.
              <h5>Examples</h5>
              <div class="example">
                Say we wanted to get the position of an anchor with the id of "point". We can just call <code>getXY</code> like so:
                <pre><code class="javascript">
                  var coords = mui.getXY("#point");
                  var xVal = coords[0]; // contains the X coordinate of the element's position
                  var yVal = coords[1]; // contains the Y coordinate
                </code></pre>
              </div><!--/example-->
            </div><!--/detail-->
          </li><!--/getXY-->

          <li id="setXY">
            <h4>.setXY(<span class="params">el</span>)</h4>
            <p class="description">Set the (x,y) coordinates of a given element</p>
            <div class="detail">
              <dl class="params">
                <dt>el</dt>
                <dd>A valid CSS selector or DOM node (Object|String)</dd>
                <dt>xy</dt>
                <dd>An array containing the coordinates to be set (Array)</dd>
              </dl>
              <code>setXY</code> sets the postion of an element according to the (x,y) coordinates given as the second argument. To get the corrdinates of a point, use <a href="#getXY"><code>getXY</code></a>.
            </div><!--/detail-->
          </li><!--/setXY-->

          <li id="insertAfter">
            <h4>.insertAfter(<span class="params">node, refNode</span>)</h4>
            <p class="description">Insert an element in the DOM after a specified node.</p>
            <div class="detail">
              <dl class="params">
                <dt>node</dt>
                <dd>The node to insert (Object)</dd>
                <dt>refNode</dt>
                <dd>The node the new node will be inserted after (String|Object)</dd>
              </dl>
              <p>Using <code>insertAfter</code> is fairly straightforward. Simply create an element (perhaps with the <a href="#createElement"><code>mui.createElement method</code></a>), and specify the node you'd like to insert the created element before. As with many MUI DOM methods, the second argument to <code>insertAfter</code> can be either an element or a CSS selector.</p>
              <h5>Examples</h5>
              <div class="example">
                Say you wanted to add an element at the end of the following unordered list:
                <pre><code class="html">
                  &lt;ul class="fooList"&gt;
                    &lt;li&gt;Foo&lt;/li&gt;
                    &lt;li&gt;Bar&lt;/li&gt;
                    &lt;li&gt;Baz&lt;/li&gt;
                  &lt/ul&gt;
                </code></pre>
                Create the element with <code>createElement</code>, and then add it to the list with <code>insertAfter</code>:
                <pre><code class="javascript">
                  var newNode = mui.createElement('li',{innerHTML:"Qux"});
                  mui.insertAfter(newNode,".fooList li:last-child");
                </code></pre>

                As you might expect, the resulting list will look like:
                <pre><code class="html">
                  &lt;ul class="fooList"&gt;
                    &lt;li&gt;Foo&lt;/li&gt;
                    &lt;li&gt;Bar&lt;/li&gt;
                    &lt;li&gt;Baz&lt;/li&gt;
                    &lt;li&gt;Qux&lt;/li&gt;
                  &lt/ul&gt;
                </code></pre>
              </div>
            </div>
          </li><!--/inserAfter-->

          <li id="insertBefore">
            <h4>.insertBefore(<span class="params">node, refNode</span>)</h4>
            <p class="description">Insert an element in the DOM before a specified node.</p>
            <div class="detail">
              <dl class="params">
                <dt>node</dt>
                <dd>The node to insert (Object)</dd>
                <dt>refNode</dt>
                <dd>The node the new node will be inserted after (String|Object)</dd>
              </dl>
              <code>insertBefore</code> works exactly like <a href="#insertAfter"><code>insertAfter</code></a>, only it inserts the new node before the node specified as the second argument.
            </div><!--/detail-->
          </li><!--/insertBefore-->
        </ul>
      </div><!--/methods-->
    </div><!--/content-->
    <?php include('includes/footer.php'); ?>
  </body>
</html>
