require.config ({
  paths: {
    'Model': 'model',
    'View': 'view',
    'Controller': 'controller',
  }
});

var required = ['Model', 'View', 'Controller']
require(required, function(Model, View, Controller) {
  var TodoList;
  TodoList = (function () {
    'use strict';
    function TodoList () {
      this.model = new Model();
      this.view = new View();
      this.controller = new Controller(this.model, this.view);
    }

    return TodoList;
  })();

  new TodoList();
});