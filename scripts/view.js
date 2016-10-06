define('View', ['Model'], function() {

  var ENTER_CODE;

  ENTER_CODE = 13;

  var View;
  View = function () {
    'use strict';
    this.toggleAllButton   = document.getElementsByClassName('toggle-all')[0];
    this.newTodo           = document.getElementsByClassName('new-todo')[0];
    this.allTasks          = document.getElementsByClassName('todo-list')[0];
    this.allItems          = document.getElementsByClassName('all-items')[0];
    this.activeButton      = document.getElementsByClassName('active-item')[0];
    this.completedButton   = document.getElementsByClassName('completed-item')[0];
    this.clearButton       = document.getElementsByClassName('clear')[0];
    this.app               = document.getElementsByClassName('todo-app')[0];
    this.countElement      = document.getElementsByClassName('counter')[0];
  }
    
  View.prototype.createLabel = function (todoTask) {
    var newTaskElement       = document.createElement('label');
    newTaskElement.className = 'todo-list__item';
    newTaskElement.innerHTML = todoTask;
    this.allTasks.appendChild(newTaskElement);
  }

  View.prototype.getTodoTaskVal = function () {
   return this.newTodo.value.trim(); 
  }

  View.prototype.toggleLine = function (line, type) {
    line.parentElement.style.display = type === 'hide' ? 'none' : 'block';
  };

  View.prototype.addTask = function (template) {
    if (!template) return;
    
    this.createLabel(template); 
    this.newTodo.value = '';
  }; 

  View.prototype.getItems = function () {
    return [].slice.apply(document.getElementsByClassName('todo-list__cb'));
  };

  View.prototype.toggleAllButtonEvent = function () {
      var self = this;
      var checkBoxesArr = self.getItems();

      if (self.toggleAllButton.classList.contains('active')) {
        self.toggleAllButton.classList.remove('active');
        
        checkBoxesArr.forEach(function(item) {
          item.checked = false;
        });
        return;
      }

      this.toggleAllButton.classList.add('active');
      checkBoxesArr.forEach(function(item) {
        item.checked = true;
      });
  };
    

  View.prototype.removeItem = function (event) {
      var target = event.target;

      if (target.className !== 'close-item') { return; }

      var item = target.closest('.todo-list__item');
      this.allTasks.removeChild(item);
  };

  View.prototype.completedButtonEvent = function () {
    var self = this;
    self.getItems().filter(function(item) {
      self.toggleLine(item, 'show');
      if (!item.checked) {
        self.toggleLine(item, 'hide');
      }
    })
  };

  View.prototype.allItemsEvent = function () {
    var self = this;
    self.getItems().filter(function(item) {
      self.toggleLine(item, 'show');
    });
  };

  View.prototype.clearCompleted = function() {
    this.getItems().forEach(function(item) {
      if (item.checked) {
        item.parentNode.remove();
      }
   });
  }

  View.prototype.activeButtonEvent = function () {
    var self = this;
    this.getItems().filter(function(item) {
      self.toggleLine(item, 'show');
      if (item.checked) {
        self.toggleLine(item, 'hide');
      }
    });
  };

  View.prototype.addEvent = function(type, callback) {
    if (type === 'addItem') {
      this.newTodo.addEventListener('keyup', function(event) {
        if (event.keyCode === ENTER_CODE) {
          callback();
        }
      });

    } else if (type === 'change') {
      this.app.addEventListener('change', function () {
        callback();
      });
       
    } else if (type === 'clearCompleted') {
      this.clearButton.addEventListener('click', function (event) {
        callback();
      });
      
    } else if (type === 'activeButtonEvent') {
      this.activeButton.addEventListener('click', function (event) {
        callback();
      });
      
    } else if (type === 'allItemsEvent') {
      this.allItems.addEventListener('click', function (event) {
        callback();
      });
      
    } else if (type === 'completedButtonEvent') {
      this.completedButton.addEventListener('click', function (event) {
        callback();
      });
      
    } else if (type === 'toggleAllButtonEvent') {
      this.toggleAllButton.addEventListener('click', function (event) {
        callback();
      });
      
    } else if (type === 'removeItem') {
      this.allTasks.addEventListener('click', function(event) {
         callback(event);
      });
    }

  };

  View.prototype.updateCount = function (n) {
    this.countElement.innerHTML = n;
  }

  return View;
});
