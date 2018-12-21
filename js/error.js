'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorPopup();
    }
  };

  var onDocumentClick = function () {
    closeErrorPopup();
  };

  var closeErrorPopup = function () {
    var errorPopup = main.querySelector('.error__popup');
    main.removeChild(errorPopup);
    errorPopup.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onErrorPopupEscPress);
  };

  var openErrorPopup = function (text) {
    main.appendChild(errorTemplate);
    errorTemplate.querySelector('.error__title').textContent = text;
    errorTemplate.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onErrorPopupEscPress);
  };

  window.error = {
    openErrorPopup: openErrorPopup
  };

})();
