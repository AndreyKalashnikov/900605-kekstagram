'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var imgUpload = document.querySelector('.img-upload');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

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
  scaleControlValue.value = '100%';
  scaleControlValue.setAttribute('value', '100%');
  console.log(uploadFile, scaleControlValue);
};

imgUploadCancel.addEventListener('click', closeUploadOverlay);
imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadOverlay();
  }
});

uploadFile.addEventListener('change', openUploadOverlay);

var imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
var numericScaleControlValue = parseInt(scaleControlValue.value, 10);

imgUploadScale.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('scale__control--smaller')) {
    numericScaleControlValue = Math.max(0, numericScaleControlValue - 25);
  } else if (target.classList.contains('scale__control--bigger')) {
    numericScaleControlValue = Math.min(100, numericScaleControlValue + 25);
  }
  scaleControlValue.value = numericScaleControlValue + '%';
  scaleControlValue.setAttribute('value', numericScaleControlValue + '%');

  var scale = 'scale(' + numericScaleControlValue / 100 + ')';
  imgUploadPreview.querySelector('img').style.transform = scale;

  console.log(uploadFile, scaleControlValue);
});

