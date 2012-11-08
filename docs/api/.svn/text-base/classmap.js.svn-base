YAHOO.env.classMap = {"FX": "fx", "ViewController": "web-app", "NavigationController": "web-app", "ActionSheet": "actionsheet", "Animation": "anim", "Env": "env", "Assert.UnexpectedError": "test", "Test.Runner": "test", "Assert.ShouldError": "test", "TabView": "tab-view", "Test.TestNode": "test", "Ajax": "ajax", "Test.Case": "test", "Test.Mock": "test", "Assert.UnexpectedValue": "test", "Oop": "oop", "Geo": "geo", "Transaction": "storage", "Test.Suite": "test", "Dom": "dom", "Assert.ShouldFail": "test", "ResultSet": "storage", "Button": "button", "Transition": "transition", "ScrollView": "scroll-view", "ApplicationController": "web-app", "Storage": "storage", "ResultSetRowList": "storage", "Assert.ObjectAssert": "test", "Assert.ArrayAssert": "test", "Test.Wait": "test", "NavigationBar": "navigator", "Navigator": "navigator", "Assert.ComparisonFailure": "test", "Assert.DateAssert": "test", "Pager": "pager", "Test.Assert": "test", "DataSource": "datasource", "Test.Reporter": "test", "Assert.Error": "test", "Event": "event", "SearchBox": "search-box", "Utility": "util"};

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
