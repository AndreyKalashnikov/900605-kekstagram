'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var pictures = document.querySelector('.pictures');
  var imgUpload = pictures.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var loadedImage = imgUploadPreview.querySelector('img');
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var textDescriprion = imgUploadOverlay.querySelector('.text__description');
  var uploadFile = imgUpload.querySelector('#upload-file');

  var openUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEcsPress);
  };

  var closeUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEcsPress);
    cleanOverlayData();
  };

  var onUploadOverlayEcsPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      imgUploadOverlay.classList.add('hidden');
      cleanOverlayData();
    }
  };

  var cleanOverlayData = function () {
    console.log('+');
    uploadFile.value = uploadFile.defaultValue;
    textHashtags.value = textHashtags.defaultValue;
    textDescriprion.value = textDescriprion.defaultValue;
    loadedImage.style.transform = 'scale(1)';
    window.effects.removePreviousEffect();
  };

  imgUploadCancel.addEventListener('click', closeUploadOverlay);
  imgUploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeUploadOverlay();
    }
  });

  uploadFile.addEventListener('change', openUploadOverlay);

  textHashtags.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onUploadOverlayEcsPress);
  });

  textHashtags.addEventListener('focusout', function () {
    document.addEventListener('keydown', onUploadOverlayEcsPress);
  });

  textDescriprion.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onUploadOverlayEcsPress);
  });

  textDescriprion.addEventListener('focusout', function () {
    document.addEventListener('keydown', onUploadOverlayEcsPress);
  });

  window.upload = {
    closeUploadOverlay: closeUploadOverlay
  };

})();
