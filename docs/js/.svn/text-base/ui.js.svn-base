YUI().use("node-base",function(Y){
  var toggleDoc, docClick, checkHash,
      getActiveLink;

  checkHash = function(){
    var hash = window.location.hash;
    if (hash) {
      toggleDoc(Y.one(hash));
      console.log(Y.one(hash))
    }
  }

  toggleDoc = function(node){
    if (node.hasClass("showing"))
      node.removeClass("showing")
    else
      node.addClass("showing");
  }
  
  docClick = function(e){
    var target = e.target,
    method = target._node.nodeName == "H4" ?
      target.get('parentNode'):
      target.get('parentNode').get('parentNode');

    toggleDoc(method);
  }

  getActiveLink = function(){
    var bodyClass = Y.one("body").getAttribute("class").match(/\b[A-Z]\w+/)[0];
    Y.one(".nav li."+bodyClass).addClass("active");
  }

  Y.on("click",docClick,"#methods h4");
  Y.on("domready",getActiveLink);
})