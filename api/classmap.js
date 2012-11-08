YAHOO.env.classMap = {"FX": "fx", "ViewController": "framework", "NavigationController": "framework", "ResultSet": "storage", "Animation": "anim", "Env": "env", "SwipeView": "swipe-view", "TabView": "tab-view", "Ajax": "ajax", "Oop": "oop", "Pager": "pager", "Transaction": "storage", "Dom": "dom", "ActionSheet": "actionsheet", "Transition": "transition", "ScrollView": "scroll-view", "ApplicationController": "framework", "Storage": "storage", "ResultSetRowList": "storage", "NavigationBar": "navigator", "Geo": "geo", "Loader": "loader", "DataSource": "datasource", "Navigator": "navigator", "Event": "event", "SearchBox": "search-box", "Utility": "util"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
