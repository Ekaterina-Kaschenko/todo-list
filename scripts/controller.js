define('Controller',['Model', 'View'], function(Model, View) {
  

  var Controller = function(model, view) {
    this._createOptions(model, view);
    this.init();
  }

  Controller.prototype.init = function () {
    this.initEvent();
  };

  Controller.prototype.updateCount = function () { 
    var count = 0;
    this.view.getItems().forEach(function(item) {
      if (!item.checked) {
        count++;
      }
    });
    
    this.view.updateCount(count);
   return count;
  };

 Controller.prototype.initEvent = function() {
    this.view.addEvent('addItem', function() {
      var val = this.view.getTodoTaskVal();
      var template = this.model.getTemplate(val);
      this.view.addTask(template);
      this.updateCount();
    }.bind(this));
    
    this.view.addEvent('removeItem', function(event) {
      this.view.removeItem(event);
      this.updateCount();  
    }.bind(this));
    
    this.view.addEvent('change', function() {
      this.updateCount();
    }.bind(this));
    
    this.view.addEvent('clearCompleted', function() {
      this.view.clearCompleted();      
    }.bind(this));

    this.view.addEvent('activeButtonEvent', function() {
      this.view.activeButtonEvent();      
    }.bind(this));

    this.view.addEvent('allItemsEvent', function() {
      this.view.allItemsEvent();      
    }.bind(this));

    this.view.addEvent('toggleAllButtonEvent', function() {
      this.view.toggleAllButtonEvent();  
      this.updateCount();
    }.bind(this));
    
    this.view.addEvent('completedButtonEvent', function() {
      this.view.completedButtonEvent();      
    }.bind(this));
  }

  Controller.prototype._createOptions = function(model, view) {
    this.model = model;
    this.view = view;
    
    return this;
  };

  return Controller;

})
