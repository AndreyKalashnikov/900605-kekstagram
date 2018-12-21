'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var imgUpload = pictures.querySelector('.img-upload');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');

  var onSuccess = function () {
    window.upload.closeUploadOverlay();
    window.success.showSuccessPopup();
  };

  var onError = function (message) {
    window.upload.closeUploadOverlay();
    window.error.openErrorPopup(message);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(imgUploadForm), onSuccess, onError);
    window.upload.closeUploadOverlay();
    console.log('=-=')
    evt.preventDefault();
  });

})();
