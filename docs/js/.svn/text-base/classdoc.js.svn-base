YUI().use('node','io','json-parse', function(Y){
  var ClassDoc = {};

  /****************************************
   * Build doc DOM nodes
   ****************************************/
  ClassDoc.buildMethodDoc = function(){
    var classname = Viewer._hash.replace('#',''),
    methodContainer = Y.one("#methods ul");
    methods = Viewer.classlist[classname].methods;
    
    for (var i in methods){
      var method = methods[i];
      var node = methodContainer.appendChild('li');
      node.append(method.guessedName);
    }
  }

  ClassDoc.buildMethodDoc();
})
