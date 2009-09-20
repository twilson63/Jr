/* Jr a light framework for single page javascript apps */
(function(){
  var
    window = this,
    undefined,
    _Jr = window.Jr,
    Jr = window.Jr = function () {
      switch(arguments.length) {
        case 1: 
          return Jr.fn[arguments[0]];
        case 2:
          if(arguments[0] == "container") {
            Jr.fn[arguments[0]] = arguments[1];
            return Jr.fn[arguments[0]];
          } else {
            Jr.fn[arguments[0]](arguments[1]);
            return Jr.fn[arguments[0]];
          }
        case 3:
          Jr.fn[arguments[0]](arguments[1], arguments[2]);
          return Jr.fn;
        default:
          return Jr.fn;
      }
    }
    
  Jr.fn = Jr.prototype = {
    Specifications: {
      
    },
    container: "#main",
    controller: function(name, fn) {
      this[name] = fn;
    },
    route: function() { with(this) {
      _unbind();
      try {
        var rte = arguments[0].replace(/#\//,'').split('/');
        switch(rte.length) {
          case 1:
            this[rte[0]].index();
            break;
          case 2:
            this[rte[0]][rte[1]]();
            break;
          case 3:
            this[rte[0]][rte[2]](rte[1]);
            break;
          case 4:
            this[rte[0]][rte[2]](rte[3], rte[1]);
            break;            
        }

      } catch(err) {
        if(console){
          console.error('Routing Error:' + err);
        }
      }
      
      _bind();
      // set location
      //window.location = arguments[0];
    }},
    html: function(content) {
      $(this.container).html(content);
    },
    _bind: function() {
      // bind routes
      $('a:href=#').bind('click', function() {
        Jr('route', '#' + this.href.split(/#/)[1]);
      });
      
      // bind forms
      $('form').bind('submit', function() {
        Jr('route', '#' + this.action.split(/#/)[1]);
      });
    },
    _unbind: function () {
      $('a:href=#').unbind();
      $('form').unbind();
    }
    
  }
})();