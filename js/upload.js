'use strict';

var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

var imgUpload = document.querySelector('.img-upload');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

var uploadFile = imgUpload.querySelector('#upload-file');

var openUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEcsPress);
};

var closeUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEcsPress);
};

var onUploadOverlayEcsPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
  }
};

uploadFile.addEventListener('change', openUploadOverlay);

imgUploadCancel.addEventListener('click', closeUploadOverlay);
// imgUploadCancel.addEventListener('keydown', function (evt) {
//   console.log(evt.keyCode);

// });
