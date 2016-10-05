define('Controller',['Model', 'View'], function(Model, View) {
  var ENTER_CODE;

  ENTER_CODE = 13;

  var Controller = function(model, view) {
    this.init();
    this._createOptions(model, view);
  }
console.log(View())
  Controller.prototype.init = function () {
    console.log(this)
    this.view.newTodo.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_CODE) {
        event.preventDefault();
      }
    });

    this.view.newTodo.addEventListener('keyup', function (event) {
      if (event.keyCode === ENTER_CODE) {
        this.view.addTask();
      }
    }.bind(this));
  };

  Controller.prototype.counter = function () { //controller
    var count = 0;
    TodoList.prototype.getItems().filter(function(item) {
      if (!item.checked) {
        count++;
      }
    });

   return count;
  };

  Controller.prototype.initEvent = function () {
    this.view.toggleAllButtonEvent();
    this.view.allTasksEvent();
    this.view.activeButtonEvent();
    this.view.completedButtonEvent(); 
    this.view.allItemsEvent(); 
    this.view.clearButtonEvent(); 
    this.view.appEvent();
  };

  Controller.prototype._createOptions = function(model, view) {
    this.model = model;
    this.view = view;
    
    return this;
  };

  return Controller;

})
