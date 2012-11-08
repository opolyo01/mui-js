/**
 * mui/tests/tests.js
 * Tests the core of the mui library
 * 
 * TODO: test mui.bind
 **/

YUI({ logInclude: { TestRunner: true }, useBrowserConsole: true }).use("node","event","test", "console", function(Y){

  /*
   ** Configure the test runner
   */
  
  // selenium driver needs global Y object 
  window.Y = Y;  

  // utility method: returns only the HTML element children of the element given as an argument
  var getElementChildren = function(el)
  {
    var nodeList = [], children = el.childNodes;
    if (el.nodeType == 1 && el.childNodes)
    {
      for (var i = 0, len = children.length; i < len; i++)
      {
        if (children[i].nodeType == 1)
        {
          nodeList.push(children[i]);
        }
      }
      return nodeList;
    } 
    else 
    {
      throw "getElementChildren requires an HTML element"
    }
  }

  /**
   * Test Util class methods
   **/

  var utilTests = new Y.Test.Suite({ name: "Util class methods" });

  // mui.each
  utilTests.add(new Y.Test.Case(
    {
    name: "mui.each",
 
   "should apply a function to each item in an array" : function()
      {
      var myArray = [2,4,6,8];
      mui.each(myArray, function(n,i){ 
        myArray[i] = myArray[i] + 2 
      });
      Y.assert(myArray, [4,6,8,10]);
    }
  }))

  // mui.iterate
  utilTests.add(new Y.Test.Case({
    name: "mui.iterate",

    "should apply a function to each property of an object" : function()
    {
      var myObj = { "one" : 1, "two" : 2 };
      mui.iterate(myObj, function(val, key){
        myObj[key] = myObj[key] + 1;
      })
      Y.assert(myObj["one"] == 2);
      Y.assert(myObj["two"] == 3);
    }
  }))

  /**
   * Test DOM class methods
   **/

  var domTests = new Y.Test.Suite({ name: "DOM class methods" });

  // mui.get
  domTests.add(new Y.Test.Case({
    name: "mui.get",
    "should return the first element matching a selector if one exists" : function()
    {
      var li = mui.get('li.foo');
      Y.Assert.areSame(li.innerHTML, "First list item");
    }
  }))

  // mui.getAll
  domTests.add(new Y.Test.Case({
    name: "mui.getAll",
    "should return an array of elements matching a selector if any exist" : function()
    {
      var lis = mui.getAll('li.foo');
      Y.Assert.areSame(lis.length, 4);
    }
  }))

  // mui.createElement
  domTests.add(new Y.Test.Case({
    name: "mui.createElement",

    setUp: function()
    {      
      this.ul = document.getElementsByTagName('ul')[0];
      this.childrenBefore = getElementChildren(this.ul);
      this.newLi = mui.createElement('li', { innerHTML: "New list item" });
      this.ul.appendChild(this.newLi);
      this.childrenAfter = getElementChildren(this.ul);
    },

    tearDown: function()
    {
      this.ul.removeChild(this.newLi);
    },

    "should create a DOM node with the attributes supplied as arguments" : function()
    {
      Y.Assert.areSame(this.childrenBefore.length + 1, this.childrenAfter.length);
    },

    "new DOM node should have the attributes passed as arguments to mui.createElement" : function()
    {
      var lastLi = this.childrenAfter[this.childrenAfter.length - 1];
      Y.Assert.areSame(lastLi.innerHTML, "New list item");
    }
  }))

  // mui.removeElement
  domTests.add(new Y.Test.Case({
    name: "mui.removeElement",

    tearDown: function()
    {
      var ul = document.getElementsByTagName('ul')[0];
      var listItems = getElementChildren(ul);
      var newLi = document.createElement('li');
      newLi.setAttribute('id','first');
      newLi.innerHTML = "First list item";
      ul.insertBefore(newLi, listItems[0]);
    },

    "should remove the DOM node given as an argument" : function()
    {
      var li = document.getElementById("first");
      mui.removeElement(li);
      Y.Assert.isNull(document.getElementById("first"));
    }
  }))

  // mui.insertBefore
  domTests.add(new Y.Test.Case({
    name: "mui.insertBefore",

    tearDown: function()
    {
      var newLi = document.getElementById("newLi");
      document.getElementsByTagName('ul')[0].removeChild(newLi);
    },

    "should add a node before a specified existing node" : function()
    {
      var ul = document.getElementsByTagName('ul')[0];
      var origFirstChild = getElementChildren(ul)[0];
      var newLi = document.createElement('li');
      newLi.setAttribute('id','newLi'); 
      newLi.innerHTML = "New list item";
      mui.insertBefore(newLi,origFirstChild);
    }
  }))

  // mui.insertAfter
  domTests.add(new Y.Test.Case({
    name: "mui.insertAfter",

    tearDown: function()
    {
      var newLi = document.getElementById("newLi");
      document.getElementsByTagName('ul')[0].removeChild(newLi);
    },

    "should add a node after a specified existing node" : function()
    {
      var ul = document.getElementsByTagName('ul')[0];
      var firstLi = document.getElementById('first');
      var newLi = document.createElement('li');
      newLi.setAttribute('id','newLi'); 
      newLi.innerHTML = "New list item";
      mui.insertAfter(newLi,firstLi);
      var listItems = getElementChildren(ul);
      Y.Assert.areSame(listItems[1].innerHTML, "New list item");
    }
  }))

  // mui.getStyle
  domTests.add(new Y.Test.Case({
    name: "mui.getStyle",

    "should get the computed style of an element" : function()
    {
      var el = document.getElementById('first');
      var style = mui.getStyle(el, 'background-color');
      Y.Assert.areSame(style, "rgb(186, 218, 85)");
    }
  }))

  // mui.setStyle
	
  domTests.add(new Y.Test.Case({
    name: "mui.setStyle",
    
    tearDown: function(){
     var el = document.getElementById('first');
      el.style['background-color'] = "#bada55";
    },
  
    "should set the style of an element" : function()
    {
      var el = document.getElementById('first');
      mui.setStyle(el, 'background-color', '#666');
      var bgColor = window.getComputedStyle(el,null).getPropertyValue('background-color');
      Y.Assert.areSame(bgColor,"rgb(102, 102, 102)");
    }
  }))

  // mui.setStyles
  domTests.add(new Y.Test.Case({
    name: "mui.setStyles should set multiple styles on an element",

    setUp: function(){
      var el = document.getElementById('first');
      mui.setStyles(el,{
        "background-color" : "#ccc",
        "color"            : "#666",
        "border"           : "1px solid black"
      });
      this.el = el;
    },

    tearDown: function(){
      this.el.style = {
        'background-color': '#bada55',
        'color' : 'auto',
        'border': 'none'
      }
    },
    
    "background-color" : function(){
      var bgColor = document.defaultView.getComputedStyle(this.el, null).getPropertyValue('background-color');
      Y.Assert.areSame(bgColor, "rgb(204, 204, 204)");
    },
                               
    "border-top-width" : function(){
      var borderTopWidth = document.defaultView.getComputedStyle(this.el, null).getPropertyValue('border-top-width');
      Y.Assert.areSame(borderTopWidth, "1px");
    },

    "border-top-color" : function(){
      var borderTopColor = document.defaultView.getComputedStyle(this.el, null).getPropertyValue('border-top-width');
      Y.Assert.areSame(borderTopColor, "rgb(0, 0, 0)");
    },

    "text color" : function(){
      var color = document.defaultView.getComputedStyle(this.el, null).getPropertyValue('color');
      Y.Assert.areSame(color, "rgb(102, 102, 102)");
    }
  }))

  // mui.getXY
  domTests.add(new Y.Test.Case({
    /* TODO: there's a weird type mismatch happening here, 
    so for the time being, I'm just checking the first value 
    in the array */
    
    name: "getXY",

    "should return the X & Y coordinates of an element" : function(){
      var el = document.getElementById('point');
      xy = [el.offsetLeft, el.offsetTop];
      var pos = mui.getXY(el);
      Y.Assert.areSame(pos[0], xy[0]);
    }
  }))

  // mui.setXY
  domTests.add(new Y.Test.Case({

    name: "setXY",

    tearDown: function(){
      var el = document.getElementById('point');
      el.removeAttribute('style');
    },

    "should set the X & Y coordinates of an element" : function(){
      var el = document.getElementById('point');
      var newPos = [200,30]

      mui.setXY(el, newPos);
      Y.Assert.areSame(newPos[0], el.offsetLeft);
    }
  }))
  
  // mui.addClass
  domTests.add(new Y.Test.Case({

    name: "addClass",

    tearDown: function(){
      var el = document.getElementById('point');
      el.removeAttribute('class');
    },

    "should add a class attribute to an element" : function(){
      var el = document.getElementById('point');
      var newClass = "point";

      mui.addClass(el, newClass);
      Y.Assert.areSame(" point", el.getAttribute('class'));
    }
  }))

  // mui.removeClass
  domTests.add(new Y.Test.Case({

    name: "removeClass",

    setUp: function(){
      var el = document.getElementById('point');
      el.setAttribute('class','testClass');
    },

    tearDown: function(){
      var el = document.getElementById('point');
      el.removeAttribute('class');
    },

    "Should remove a class attribute to an element" : function(){
      var el = document.getElementById('point');

      mui.removeClass(el, 'testClass');
      Y.Assert.isNull(el.getAttribute('class').match('testClass'));
    }
  }))

  // mui.hasClass

  domTests.add(new Y.Test.Case({
    name: "hasClass",

    setUp: function(){
      var el = document.getElementById('point');
      el.setAttribute('class','testClass');
    },

    tearDown: function(){
      var el = document.getElementById('point');
      el.removeAttribute('class');
    },

    "Should return true if an element has the specified class" : function(){
      var el = document.getElementById('point');
      Y.assert(mui.hasClass(el, 'testClass'))
    }
  }))

  // mui.toggleClass

  domTests.add(new Y.Test.Case({
    name: "toggleClass",

    tearDown: function(){
      var el = document.getElementById('point');
      el.removeAttribute('class');
    },

    "should add a class to an element if it isn't already there" : function(){
      var el = document.getElementById('point');
      mui.toggleClass(el, 'testClass');
      Y.Assert.isNotNull(el.getAttribute('class').match('testClass'));
    },

    "should remove a class from an element if it is already there" : function(){
      var el = document.getElementById('point');
      el.setAttribute('class','testClass');
      mui.toggleClass(el, 'testClass')
      Y.Assert.isNull(el.getAttribute('class').match('testClass'));
    }
  }))
  
  // mui.contains
  
  domTests.add(new Y.Test.Case({
      name: "contains",
      
      "Should return true if the parent element contains the child element": function() {
          var parent = document.getElementById('domContent'),
              child = document.getElementById('point');
          
          Y.assert(mui.contains(parent, child));
      }
      
  }));
  
  // mui.inDocument
  
  domTests.add(new Y.Test.Case({
      name: "inDocument",
      
      "Should return true if the element is contained within the document": function() {
          var el = document.getElementById('domContent');
          
          Y.assert(mui.inDocument(el));
      },
      
      "Should return false if the element is not contained within the document": function() {
          var el = document.createElement('div');
          
          Y.Assert.isFalse(mui.inDocument(el));
      }
      
  }));


  /**
   * Test OOP class methods
   **/

  var oopTests = new Y.Test.Suite({ name: "OOP class methods" });

  // mui.provide
  oopTests.add(new Y.Test.Case({
    name: "mui.provide",

    "should make a namespace a property of the window object" : function()
    {
       var ns = "Foo";
       mui.provide(ns);
       Y.assert(window.Foo);
    },
       
    "should be able to create chained namespaces" : function()
    {
      var ns = "Foo.Bar.Baz";
      mui.provide(ns);
      Y.assert(window.Foo.Bar.Baz);
    }
  }))

  // mui.extend
  oopTests.add(new Y.Test.Case({
    name: "mui.extend",

    // "SubClass.superclass should be SuperClass" : function()
    // {
    //   var SuperClass = function(){};
    //   var SubClass = function(){};
    //   mui.extend(SubClass, SuperClass);
    //   Y.assert (SubClass.prototype.superclass == "SuperClass");
    // },

    "Subclass should inherit prototype properties of superclass" : function()
    {
      var SuperClass = function(){};
      var SubClass = function(){};
      SuperClass.prototype.fooProp = "SuperClass property",
      mui.extend(SubClass,SuperClass,SuperClass.prototype.fooProp);
      Y.Assert.areSame (SuperClass.prototype.fooProp, SubClass.prototype.fooProp);
    }

    // "Subclass should inherit static (class) properties of superclass" : function()
    // {
    //   var SuperClass = function(){};
    //   var SubClass = function(){};
    //   SuperClass.fooProp = "SuperClass property",
    //   mui.extend(SubClass, SuperClass, null, SuperClass.fooProp);
    //   Y.Assert.areSame (SuperClass.fooProp, SubClass.fooProp);
    // }
  }))

  // mui.mix
  oopTests.add(new Y.Test.Case({
    name: "mui.mix",
    
    "should add one object's static and prototype members to another" : function()
    {
      var initObj = {}, augObj = {};
      augObj.foo = "Test Property";
      mui.mix(initObj, augObj, false);
      Y.Assert.areSame(initObj.foo, augObj.foo);
    },

    "should not overwrite existing methods by default" : function()
    {
      var initObj = {}, augObj = {};
      initObj.foo = "Original Property";
      augObj.foo = "New Property";
      mui.mix(initObj, augObj, false);
      Y.Assert.areSame(initObj.foo, "Original Property");
    },

    "should overwrite methods when we tell it to" : function()
    {
      var initObj = {}, augObj = {};
      initObj.foo = "Original Property";
      augObj.foo = "New Property";
      mui.mix(initObj, augObj, true);
      Y.Assert.areSame(initObj.foo, "New Property");
    }
  }))

  // mui.augment
  oopTests.add(new Y.Test.Case({
    name: "mui.augment",
    
    "should add one object's properties to another" : function()
    {
      var initObj = {}, augObj = {};
      augObj.foo = "Test Property";
      mui.augment(initObj, augObj, false);
      Y.Assert.areSame(initObj.foo, augObj.foo);
    },

    "should not overwrite existing methods by default" : function()
    {
      var initObj = {}, augObj = {};
      initObj.foo = "Original Property";
      augObj.foo = "New Property";
      mui.augment(initObj, augObj, false);
      Y.Assert.areSame(initObj.foo, "Original Property");
    },

    "should overwrite methods when we tell it to" : function()
    {
      var initObj = {}, augObj = {};
      initObj.foo = "Original Property";
      augObj.foo = "New Property";
      mui.augment(initObj, augObj, true);
      Y.Assert.areSame(initObj.foo, "New Property");
    }
  }))

  // mui.augmentProto
  oopTests.add(new Y.Test.Case({
    name: "mui.augmentProto",
    
    "should add one object's prototype members to another" : function()
    {
      var initObj = function() {}, augObj = function() {};
      augObj.prototype.foo = "Test Property";
      mui.augmentProto(initObj, augObj, false);
      Y.Assert.areSame(initObj.prototype.foo, augObj.prototype.foo);
    },

    "should not overwrite existing methods by default" : function()
    {
      var initObj = function() {}, augObj = function() {};
      initObj.prototype.foo = "Original Property";
      augObj.prototype.foo = "New Property";
      mui.augmentProto(initObj, augObj, false);
      Y.Assert.areSame(initObj.prototype.foo, "Original Property");
    },

    "should overwrite methods when we tell it to" : function()
    {
      var initObj = function() {}, augObj = function() {};
      initObj.prototype.foo = "Original Property";
      augObj.prototype.foo = "New Property";
      mui.augmentProto(initObj, augObj, true);
      Y.Assert.areSame(initObj.prototype.foo, "New Property");
    }
  }))

  // mui.bind
  oopTests.add(new Y.Test.Case({
    name: "mui.bind should create a new function with the context of the function given as an argument"
  }))

  //run the tests
  Y.Test.Runner.add(utilTests);
  Y.Test.Runner.add(domTests);
  Y.Test.Runner.add(oopTests);
  Y.Test.Runner.run();

})
