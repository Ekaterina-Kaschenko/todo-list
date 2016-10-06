define('Model', function() {
  
  function Model(storage) {

  }

  Model.prototype.getTemplate = function (text) {
    if (!text) { return; }
    return  '<input type="checkbox" class="todo-list__cb">' +
            '<span class="todo-list__mark"></span>' +
            '<span class="todo-list__desc">' + text + '</span>' +
            '<span class="close-item">×</span>';
  };

  return Model;
});