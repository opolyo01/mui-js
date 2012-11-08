
/**
 * mui/tests/smoketests.js
 * Smoke tests for mui
 * 
 **/


/* 
  Smoketest namespace
  
  Helper functions for managing and running tests
  and providing basic utilities
*/
var SMOKE = {
  logText: [],
  
  /*
    log: a general purpose message logger
  */
  log: function(message) {
    SMOKE.logText.push(message);
    console.log(message);
  },
  
  /*
    get: simple wrapper function for querySelector
  */
  get: function(selector) {
    return document.querySelector(selector);
  },
  
  /*
    getStyle: convenience method to get the style attribute (NOT computed CSS style)
  */
  getStyle: function(elt) {
    elt.setAttribute('class', SMOKE.getClass(elt) + ' ');  // trigger reflow by adding a space to the class
    return elt.getAttribute('style') || null;
  },
  
  /*
    getClass: convenience method to get the class attribute
  */
  getClass: function(elt) {
    return elt.getAttribute('class') || null;
  },
  
  /*
    simulateEvent: utilizes MouseEvents to fake events on elements
  */
  simulateEvent: function(elt, theEvent) {
    var evt, eventName, eventX, eventY;
    
    eventName = theEvent.name;
    
    switch(eventName) {
      case 'mousedown': case 'mousemove': case 'mouseup':
        /* event.initMouseEvent(type, canBubble, cancelable, view, 
                             detail, screenX, screenY, clientX, clientY, 
                             ctrlKey, altKey, shiftKey, metaKey, 
                             button, relatedTarget);
        */
      
        eventX = theEvent.x || 0;
        eventY = theEvent.y || 0;
        
        //SMOKE.log('Running ' + eventName + ' event on element ' + elt + ' at position ' + eventX + 'px,' + eventY + 'px');
      
        evt = document.createEvent('MouseEvents');
        evt.initMouseEvent(eventName, true, false, window, 1, 0, 0, eventX, eventY, false, false, false, false, null, null);
        elt.dispatchEvent(evt);
      break;
      
      default:
    }
  }
  
};



YUI({ logInclude: { TestRunner: true }, useBrowserConsole: true }).use("node","event","test", "console", function(Y){

  /*
   ** Configure the test runner
   */
  
  // selenium driver needs global Y object 
  window.Y = Y;
  

  /**
   * Main smoke tests
   **/

  var mainSmokeTests = new Y.Test.Suite({ name: "Main smoke tests" });

  // scrollview
  mainSmokeTests.add(new Y.Test.Case(
    {
    name: "scrollview",
    
    valueBefore: null,
    
    valueAfter: null,
    
    setUp: function () {
        var scrollView, scrollViewNode, scrollViewHostNode, supportsSimulatedEvents, yPx;

        // set up scrollview
        scrollView = new mui.ScrollView({
            element: '#mail-list',
            axis: 'y',
            size: '100%',
            pagingEnabled: false,
            showsHorizontalScrollIndicator: true
        });

        // DOM stuff
        scrollViewNode = SMOKE.get('.messages.searchSibling');
        scrollViewHostNode = SMOKE.get('.mui-scrollview-host');
        valueBefore = SMOKE.getStyle(scrollViewHostNode);

        if(document.createEvent) {  // if simulated events are supported
          yPx = 600;

          // simulate mousedown
          SMOKE.simulateEvent(scrollViewNode, {
            name: 'mousedown',
            x: 0,
            y: yPx
          });

          var simulateMousemove = function() {
            yPx -= 5;

            // simulate mousemove
            SMOKE.simulateEvent(scrollViewNode, {
              name: 'mousemove',
              x:    0,
              y:    yPx
            });

            if(yPx > 0) {
              // keep moving the mouse
              setTimeout(function(){
                simulateMousemove();
              }, 10);
            } else {
              // simulate mouseup when everything is done
              SMOKE.simulateEvent(scrollViewNode, {
                name: 'mouseup',
                x:    0,
                y:    yPx
              });
            }
          }

          simulateMousemove();
        }
    },
 
    tearDown: function () {
        delete scrollView;
    },
 
   "should scroll the mail list element" : function()
    {
      this.wait(function(){
        var scrollViewHostNode = SMOKE.get('.mui-scrollview-host');
        Y.assert(-1 != SMOKE.getStyle(scrollViewHostNode).indexOf('-600px'));   // verify the element was scrolled
      }, 3000);
      
    }
  }))

  // run the tests
  Y.Test.Runner.add(mainSmokeTests);
  Y.Test.Runner.run();
})
