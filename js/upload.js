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
imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadOverlay();
  }
});

var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
var numericScaleControlValue = parseInt(scaleControlValue.value, 10);

imgUploadOverlay.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('scale__control--smaller')) {
    numericScaleControlValue = Math.max(0, numericScaleControlValue - 25);
    scaleControlValue.value = numericScaleControlValue + '%';
  } else if (target.classList.contains('scale__control--bigger')) {
    numericScaleControlValue = Math.min(100, numericScaleControlValue + 25);
    scaleControlValue.value = numericScaleControlValue + '%';
  }

  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

  scaleControlValue.addEventListener('input', function () {
    console.log('+++');
    imgUploadPreview.classList.add('effect-level transform: scale(0.75)');
  });

});
