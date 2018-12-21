'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onSuccessPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessPopup();
    }
  };

  var onDocumentClick = function () {
    closeSuccessPopup();
  };

  var closeSuccessPopup = function () {
    var successPopup = main.querySelector('.success__popup');
    main.removeChild(successPopup);
    successPopup.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onSuccessPopupEscPress);
  };

  var showSuccessPopup = function () {
    main.appendChild(successTemplate);
    successTemplate.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onSuccessPopupEscPress);
  };

  window.success = {
    showSuccessPopup: showSuccessPopup
  };

})();
