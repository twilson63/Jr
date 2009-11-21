/* Jr a light framework for single page javascript apps v.0.1*/
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
          if((arguments[0] == "container") || (arguments[0] == "db")) {
            Jr.fn[arguments[0]] = arguments[1];
            return Jr.fn[arguments[0]];
          } else {
            Jr.fn[arguments[0]](arguments[1]);
            return Jr.fn[arguments[0]];
          }
        case 3:
          Jr.fn[arguments[0]](arguments[1], arguments[2]);
          return Jr.fn;
        case 4:
          Jr.fn[arguments[0]](arguments[1], arguments[2], arguments[3]);
          return Jr.fn;

        default:
          return Jr.fn;
      }
    }
    
  Jr.fn = Jr.prototype = {
    container: "#main",
    db: null,
    views: {},
    models: {},
    run: function() {
      $('a:href=#').live('click', function() {
        $.history.load(this.href.split(/#/)[1]);
        return false;
      });

      // bind forms
      $('form').live('submit', function() {
        $.history.load(this.action.split(/#/)[1]);
        return false;
      });
      
      $.history.init(Jr().route);
      $.history.load(arguments[0]);
    },
    controller: function(name, fn) {
      this[name] = fn;
    },
    view: function(controller, name, fn) {
      if (this.views[controller] == undefined ) {
        this.views[controller] = {};
      }
      this.views[controller][name] = fn;
    },
    model: function(name, fn) {
      this.models[name] = fn;      
    },
    route: function() { with(Jr()) {
      try {
        var rte = arguments[0].replace(/#/,'').split('/');
        
        switch(rte.length) {
          case 1:
            Jr()[rte[0]].index();
            break;
          case 2:
            Jr()[rte[0]][rte[1]]();
            break;
          case 3:
            Jr()[rte[0]][rte[2]](rte[1]);
            break;
          case 4:
            Jr()[rte[0]][rte[2]](rte[3], rte[1]);
            break;            
        }

      } catch(err) {
        if(console){
          console.error('Routing Error:' + err + ' ' + rte);
        }
      }
      
    }},
    html: function(content) {
      $(this.container).html(content);
    },
    redirect: function(path) {
      $.history.load(path);
    },
    flash: function(display_text, options) {
      
      $(this.container).prepend(
        jDiv('flash', 
          jTag('p', display_text),
          jAttribute('class', options.flash_type || 'notice'))
      );
      setTimeout(function () { $('#flash')[options.animation || 'fadeOut']('slow') }, options.timeout || 3000);
    }
    
  }
})();