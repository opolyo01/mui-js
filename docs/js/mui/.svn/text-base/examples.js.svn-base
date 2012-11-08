(function(){
  // addClass
  mui.on("#addClassDemo","click",function(){
    mui.addClass("#addClass .peekaboo","hidden");
  }, this);

  //toggleClass
  mui.on("#toggleClassDemo","click",function(){
    mui.toggleClass("#toggleClass .peekaboo","hidden");
  });

  // on
  mui.on("#onDemo","touchend",function(){
    alert("I've been clicked!!");
  })

  // one
  mui.one("#oneDemo","touchend",function(){
    alert("I've been clicked!!");
  })

  // removeEventListener
  mui.on("#removeListenerDemo","touchend",function(){
    alert("I'm touched!!");
  });

  mui.one("#stopAlerts","touchend",function(){
    mui.removeEventListener("#removeListenerDemo","touchend");
  });

  // io
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

  mui.on("#updateDemo","touchend",function(){
    mui.io('/ajaxtest.php',{
      method: 'get',
      update: '#ioData'
    })
  });

  // getScript
  mui.on("#getScriptDemo","touchend",function(){
    mui.getScript('http://api.twitter.com/1/statuses/public_timeline.json?count=1&skip_user=true&callback=?',
                  function(e){console.log(e)},this);
  });

  // ActionSheet
  mui.on("#actionSheetDemo","touchend",function(){
    var oldYPos = window.scrollY;
    window.scroll(0,0);
    new mui.ActionSheet({
      title: "ActionSheet test",
      cancelButton: {title: 'Cancel'},
      destructiveButton: { title: 'Initiate Launch Sequence', 
                           action: function(){alert("boom.")
                                              window.scroll(0,oldYPos)} 
                         }
    }).show();
  })
  
  // Anim
  var box = mui.get("#animBox");
  mui.on(box,"click",function(e){
    mui.animate(box,{
      properties: {
        left: '300px',
      },
      easing: 'ease-out',
      duration: '0.5s'
    });
  });
})()
