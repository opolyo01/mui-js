/*
 * Create a namespace for the app.
**/
HelloMUI = {};

/*
 * Create a configuration object. Any properties
 * you need to set to configure the application
 * should be set here. (NOTE: the id, version, and
 * title attributes are required.)
**/
HelloMUI.AppConfig = {
  id: 'hello_mui',
  version: '1.0',
  title: 'Hello, MUI'
};

/*
 * Navigation controller for the first tab
**/
HelloMUI.FirstNavController = new mui.NavigationController({
  NAME: 'section1',

  viewControllers: [
    new mui.ViewController({
      /*
       * The NAME property of a view controller is used by
       * the MUI framework to dispatch routes. It must be 
       * present for each view controller.
      **/
      NAME: 'screen1',
      title: 'first tab',
      loadView: function(){
        this.setView('#tab-1-view-1', true);
      },

      /*
       * If we create a 'clicked' property, we can define a
       * callback to be executed when the view is clicked (or
       * more likey touched). 
      **/
      clicked: function(e){
        alert('Hello, MUI!');
      }
    })
  ]
})

/*
 * Make a couple of other navigation controllers,
 * just so we have something for our tabs to navigate to.
**/

HelloMUI.SecondNavController = new mui.NavigationController({
  NAME: 'section2',

  viewControllers: [
    new mui.ViewController({
      NAME: 'screen1',
      title: 'second tab',
      loadView: function(){
        this.setView('#tab-2-view-1', true);
      }
    })
  ]
})

HelloMUI.ThirdNavController = new mui.NavigationController({
  NAME: 'section3',

  viewControllers: [
    new mui.ViewController({
      NAME: 'screen1',
      title: 'third tab',
      loadView: function(){
        this.setView('#tab-3-view-1', true);
      }
    })
  ]
})


/* Initialize the application controller for the HelloMUI app. */
HelloMUI.AppController = new mui.ApplicationController(HelloMUI.AppConfig);

/*
 * If you have any work that should only be done when all of the application's
 * components have been initialized, you should put it in the application 
 * controller's appDidFinishLaunching property.
**/
HelloMUI.AppController.appDidFinishLaunching = function(){
  this.setTabsElement('#tabs');

  this.registerController(HelloMUI.FirstNavController, '#first');
  this.registerController(HelloMUI.SecondNavController, '#second');
  this.registerController(HelloMUI.ThirdNavController, '#third');

  /* Tell the app to load the initial view */
  this.restore('/section1/screen1');
}

/* Finally, initalize the app when the DOM is done loaded */
mui.on(document, 'DOMContentLoaded', mui.bind(HelloMUI.AppController.initialize, HelloMUI.AppController));
