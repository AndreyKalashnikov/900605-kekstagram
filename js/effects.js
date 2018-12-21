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

  var effects = {
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
    loadedImage.classList.remove(effects.chrome.CLASS, effects.sepia.CLASS, effects.marvin.CLASS, effects.phobos.CLASS, effects.heat.CLASS);
    loadedImage.style.filter = '';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var showFullSlider = function () {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

  var setEffect = function (percent) {
    if (loadedImage.classList.contains(effects.chrome.CLASS)) {
      loadedImage.style.filter = effects.chrome.PROPERTY + '(' + (percent * (effects.chrome.MAX_VALUE - effects.chrome.MIN_VALUE) + effects.chrome.MIN_VALUE) + effects.chrome.MEASURE + ')';
    } else if (loadedImage.classList.contains(effects.sepia.CLASS)) {
      loadedImage.style.filter = effects.sepia.PROPERTY + '(' + (percent * (effects.sepia.MAX_VALUE - effects.sepia.MIN_VALUE) + effects.sepia.MIN_VALUE) + effects.sepia.MEASURE + ')';
    } else if (loadedImage.classList.contains(effects.marvin.CLASS)) {
      loadedImage.style.filter = effects.marvin.PROPERTY + '(' + (percent * (effects.marvin.MAX_VALUE - effects.marvin.MIN_VALUE) + effects.marvin.MIN_VALUE) + effects.marvin.MEASURE + ')';
    } else if (loadedImage.classList.contains(effects.phobos.CLASS)) {
      loadedImage.style.filter = effects.phobos.PROPERTY + '(' + (percent * (effects.phobos.MAX_VALUE - effects.phobos.MIN_VALUE) + effects.phobos.MIN_VALUE) + effects.phobos.MEASURE + ')';
    } else if (loadedImage.classList.contains(effects.heat.CLASS)) {
      loadedImage.style.filter = effects.heat.PROPERTY + '(' + (percent * (effects.heat.MAX_VALUE - effects.heat.MIN_VALUE) + effects.heat.MIN_VALUE) + effects.heat.MEASURE + ')';
    }
  };

  effectsList.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    removePreviousEffect();

    var target = evt.target;

    if (target.classList.contains(effects.none.CLASS)) {
      imgUploadEffectLevel.classList.add('hidden');
    } else if (target.classList.contains(effects.chrome.CLASS)) {
      loadedImage.classList.add(effects.chrome.CLASS);
      showFullSlider();
    } else if (target.classList.contains(effects.sepia.CLASS)) {
      loadedImage.classList.add(effects.sepia.CLASS);
      showFullSlider();
    } else if (target.classList.contains(effects.marvin.CLASS)) {
      loadedImage.classList.add(effects.marvin.CLASS);
      showFullSlider();
    } else if (target.classList.contains(effects.phobos.CLASS)) {
      loadedImage.classList.add(effects.phobos.CLASS);
      showFullSlider();
    } else if (target.classList.contains(effects.heat.CLASS)) {
      loadedImage.classList.add(effects.heat.CLASS);
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
