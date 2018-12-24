'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var loadedImage = imgUploadPreview.querySelector('img');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');

  var Effect = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      MEASURE: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      MEASURE: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      MEASURE: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      MEASURE: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      MEASURE: ''
    },
    none: {
      CLASS: 'effects__preview--none'
    }
  };

  var removePreviousEffect = function () {
    loadedImage.classList.remove(Effect.chrome.CLASS, Effect.sepia.CLASS, Effect.marvin.CLASS, Effect.phobos.CLASS, Effect.heat.CLASS);
    loadedImage.style.filter = '';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var showFullSlider = function () {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

  var setEffect = function (percent) {
    if (loadedImage.classList.contains(Effect.chrome.CLASS)) {
      loadedImage.style.filter = Effect.chrome.PROPERTY + '(' + (percent * (Effect.chrome.MAX_VALUE - Effect.chrome.MIN_VALUE) + Effect.chrome.MIN_VALUE) + Effect.chrome.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effect.sepia.CLASS)) {
      loadedImage.style.filter = Effect.sepia.PROPERTY + '(' + (percent * (Effect.sepia.MAX_VALUE - Effect.sepia.MIN_VALUE) + Effect.sepia.MIN_VALUE) + Effect.sepia.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effect.marvin.CLASS)) {
      loadedImage.style.filter = Effect.marvin.PROPERTY + '(' + (percent * (Effect.marvin.MAX_VALUE - Effect.marvin.MIN_VALUE) + Effect.marvin.MIN_VALUE) + Effect.marvin.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effect.phobos.CLASS)) {
      loadedImage.style.filter = Effect.phobos.PROPERTY + '(' + (percent * (Effect.phobos.MAX_VALUE - Effect.phobos.MIN_VALUE) + Effect.phobos.MIN_VALUE) + Effect.phobos.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effect.heat.CLASS)) {
      loadedImage.style.filter = Effect.heat.PROPERTY + '(' + (percent * (Effect.heat.MAX_VALUE - Effect.heat.MIN_VALUE) + Effect.heat.MIN_VALUE) + Effect.heat.MEASURE + ')';
    }
  };

  effectsList.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    removePreviousEffect();

    var target = evt.target;

    if (target.classList.contains(Effect.none.CLASS)) {
      imgUploadEffectLevel.classList.add('hidden');
    } else if (target.classList.contains(Effect.chrome.CLASS)) {
      loadedImage.classList.add(Effect.chrome.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effect.sepia.CLASS)) {
      loadedImage.classList.add(Effect.sepia.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effect.marvin.CLASS)) {
      loadedImage.classList.add(Effect.marvin.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effect.phobos.CLASS)) {
      loadedImage.classList.add(Effect.phobos.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effect.heat.CLASS)) {
      loadedImage.classList.add(Effect.heat.CLASS);
      showFullSlider();
    }
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      var currentPinX = effectLevelPin.offsetLeft - shiftX;
      var sliderLine = effectLevelLine.getBoundingClientRect();
      var currentPinMaxX = sliderLine.right - sliderLine.left;

      currentPinX = Math.min(Math.max(0, currentPinX), currentPinMaxX);

      var pinPositionPercent = currentPinX / currentPinMaxX;

      effectLevelPin.style.left = currentPinX + 'px';
      effectLevelDepth.style.width = currentPinX + 'px';

      setEffect(pinPositionPercent);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.effects = {
    removePreviousEffect: removePreviousEffect
  };

})();
