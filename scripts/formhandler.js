(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.reloadData = function (data) {
    this.$formElement.each(function () {
      $(this.elements).each(function (i, el) {
        if (data[el.name]) {
          if (el.type !== 'radio') el.value = data[el.name];
          else el.checked = el.value === data[el.name];
        }
      });
    });
  };

  FormHandler.prototype.addSubmitHandler = function (fn) {
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this)
        .serializeArray()
        .forEach(function (item) {
          data[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
      console.log(data);

      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
