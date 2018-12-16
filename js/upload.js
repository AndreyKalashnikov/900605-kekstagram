'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var imgUpload = document.querySelector('.img-upload');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

var imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

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
  uploadFile.value = uploadFile.defaultValue;
  imgUploadPreview.querySelector('img').style.transform = 'scale(1)';
  scaleControlValue.value = scaleControlValue.defaultValue;
  scaleControlValue.setAttribute('value', '100%');
};

imgUploadCancel.addEventListener('click', closeUploadOverlay);
imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadOverlay();
  }
});

uploadFile.addEventListener('change', openUploadOverlay);

