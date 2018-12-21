'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var imgUpload = pictures.querySelector('.img-upload');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');
  // var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  // var imgUploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');

  var onSuccess = function () {
    window.upload.closeUploadOverlay();
    window.success.showSuccessPopup();
    // console.log('+++');
  };

  var onError = function (message) {
    window.upload.closeUploadOverlay();
    window.error.openErrorPopup(message);
    // console.log('---');
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(imgUploadForm), onSuccess, onError);
    window.upload.closeUploadOverlay();
    evt.preventDefault();
  });

})();
