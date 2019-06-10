/**
 * Convert field input on paste or form
 */
(function () {
  'use strict';

  // Get form element
  var form = document.getElementById('form');

  // Find input inside form
  var input = form.querySelector('input');

  // Convert link on form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var field = input.value.replace(/^@/, '');

    if (field.length > 0) {
      var parser = document.createElement('a');
      parser.href = field;

      var protocol = window.location.protocol + '//';
      input.value = protocol + window.location.host + parser.pathname;
      input.select();

      // Copy to clipboard
      if (document.execCommand('copy')) {
        // Show message
        form.classList.add('form--copied');

        setTimeout(function () {
          form.classList.remove('form--copied');
        }, 1000);
      }

      // Clear selection
      document.getSelection().removeAllRanges();
    }
  });

  // Show button if input not empty
  input.addEventListener('keyup', function () {
    var field = input.value.replace(/^@/, '');
    form.classList.remove('form--filled');

    if (field.length > 0) {
      form.classList.add('form--filled');
    }
  });
})();