Jr('controller', 'widgets', {
  widgets: ["WidgetA","WidgetB"],
  
  index: function () {
    var widget_list = [];
    $.each(this.widgets, function(i,e) {
      widget_list.push(
        jLink(e, '#widgets/?/show'.replace(/\?/, i))
      );
    });
    
    Jr('html',
      jList(widget_list) + _br +
      jLink('New Widget','#widgets/add') 
    );
  },
  add: function () {
    Jr('html',
      jTag('form',
        jLabel('name', "Name" + _br +
        jText('name')) + _br +
        jSubmit('Add Widget'),
        jAt('action', '#widgets/create')
      )  
    );
  },
  create: function () {
    this.widgets.push($('#name').val());
    this.index();
  },
  show: function(id) {
    Jr('html', 
      jTag('h2', this.widgets[id]) + _br +
      jLink('Edit', '#widgets/?/edit'.replace(/\?/, id)) + _space + 
      jLink('Delete', '#widgets/?/destroy'.replace(/\?/, id)) + _space +
      jLink('Return', '#widgets')
    );
  },
  edit: function (id) {
    Jr('html',
      jTag('form',
        jLabel('name', "Name" + _br +
        jText('name', this.widgets[id])) + _br +
        jSubmit('Update Widget'),
        jAt('action', '#widgets/?/update'.replace(/\?/, id))
      )  
    );    
  },
  update: function (id) {
    this.widgets[id] = $('#name').val();
    this.show(id);
  },
  destroy: function(id) {
    this.widgets.splice(id,1);
    this.index();
  }
});

$(document).ready(function(){
  // Setup div Container
  Jr('container', '#main');
  // Invoke Default Controller to Run and setup history
  Jr('run', 'widgets');
});