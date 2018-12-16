'use strict';

var effectsList = imgUploadOverlay.querySelector('.effects__list');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var loadedImage = imgUploadPreview.querySelector('img');
var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');

var removePreviousEffect = function () {
  loadedImage.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
};

var showSlider = function () {
  imgUploadEffectLevel.classList.remove('hidden');
};

effectsList.addEventListener('click', function (evt) {
  evt.stopPropagation();
  var target = evt.target;
  if (target.classList.contains('effects__preview--none')) {
    removePreviousEffect();
    imgUploadEffectLevel.classList.add('hidden');
  } else if (target.classList.contains('effects__preview--chrome')) {
    removePreviousEffect();
    showSlider();
    loadedImage.classList.add('effects__preview--chrome');
  } else if (target.classList.contains('effects__preview--sepia')) {
    removePreviousEffect();
    showSlider();
    loadedImage.classList.add('effects__preview--sepia');
  } else if (target.classList.contains('effects__preview--marvin')) {
    removePreviousEffect();
    showSlider();
    loadedImage.classList.add('effects__preview--marvin');
  } else if (target.classList.contains('effects__preview--phobos')) {
    removePreviousEffect();
    showSlider();
    loadedImage.classList.add('effects__preview--phobos');
  } else if (target.classList.contains('effects__preview--heat')) {
    removePreviousEffect();
    showSlider();
    loadedImage.classList.add('effects__preview--heat');
  }
  return false;
});

var pinPosition;
console.log(pinPosition);

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };
    var currentPinX = effectLevelPin.offsetLeft - shift.x;
    var currentPinMaxX = effectLevelLine.offsetWidth;
    currentPinX = Math.min(Math.max(0, currentPinX), currentPinMaxX);
    effectLevelPin.style.left = currentPinX + 'px';
    var pinPositionPersent = currentPinX / currentPinMaxX;
    console.log(pinPositionPersent);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
