define('View', ['Model'], function() {

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
    console.log(this.toggleAllButton)
  View.prototype.createLabel = function (todoTask) {
    var newTaskElement       = document.createElement('label');
    newTaskElement.className = 'todo-list__item';
    newTaskElement.innerHTML = this.model.getTemplate(todoTask);
    this.allTasks.appendChild(newTaskElement);

  }

  View.prototype.toggleLine = function (line, type) {
    line.parentElement.style.display = type === 'hide' ? 'none' : 'block';
  };

  View.prototype.addTask = function () {
    var newTodoTask = this.newTodo.value.trim(); 

    if (newTodoTask) { 
      this.createLabel(newTodoTask); 
    } 

    this.newTodo.value          = '';
    this.countElement.innerHTML = this.controller.counter(); 
  }; 

  View.prototype.getItems = function () {
    return [].slice.apply(document.getElementsByClassName('todo-list__cb'));
  };

  View.prototype.toggleAllButtonEvent = function () {
    var self = this;
    this.toggleAllButton.addEventListener('click', function () {
      var checkBoxesArr = self.getItems();

      if (this.toggleAllButton.classList.contains('active')) {
        this.toggleAllButton.classList.remove('active');
        
        checkBoxesArr.forEach(function(item) {
          item.checked = false;
        });
        return;
      }

      this.toggleAllButton.classList.add('active');
      checkBoxesArr.forEach(function(item) {
        item.checked = true;
      });
    });
  }.bind(this);
    

  View.prototype.allTasksEvent = function () {
    this.allTasks.addEventListener('click', function (event) {
      var target = event.target;

      if (target.className !== 'close-item') { return; }

      var item = target.closest('.todo-list__item');
      this.allTasks.removeChild(item);
    });
  };

  View.prototype.activeButtonEvent = function () {
    var self = this;
    this.activeButton.addEventListener('click', function (event) {
      self.getItems().filter(function(item) {
        this.toggleLine(item, 'show');

        if (item.checked) {
          this.toggleLine(item, 'hide');
        }
     });
    });
  }.bind(this);

  View.prototype.completedButtonEvent = function () {
    var self = this;
    this.completedButton.addEventListener('click', function (event) {
      self.getItems().filter(function(item) {
        this.toggleLine(item, 'show');

        if (!item.checked) {
          this.toggleLine(item, 'hide');
        }
     });
    });
  }.bind(this);

  View.prototype.allItemsEvent = function () {
    var self = this;
    this.allItems.addEventListener('click', function (event) {
      self.getItems().filter(function(item) {
        this.toggleLine(item, 'show');
     });
    });
  }.bind(this);

  View.prototype.clearButtonEvent = function () {
    var self = this;
    this.clearButton.addEventListener('click', function (event) {
      self.getItems().filter(function(item) {
        if (item.checked) {
          item.parentNode.remove();
        }
     });
    });
  }.bind(this);

  View.prototype.appEvent = function () {
    _app.addEventListener('change', function () {
      this.countElement.innerHTML = Controller.prototype.counter();
    });
  };

  return View;
});
