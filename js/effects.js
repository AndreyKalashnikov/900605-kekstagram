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

  var Effects = {
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
    loadedImage.classList.remove(Effects.chrome.CLASS, Effects.sepia.CLASS, Effects.marvin.CLASS, Effects.phobos.CLASS, Effects.heat.CLASS);
    loadedImage.style.filter = '';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var showFullSlider = function () {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

  var setEffect = function (percent) {
    if (loadedImage.classList.contains(Effects.chrome.CLASS)) {
      loadedImage.style.filter = Effects.chrome.PROPERTY + '(' + (percent * (Effects.chrome.MAX_VALUE - Effects.chrome.MIN_VALUE) + Effects.chrome.MIN_VALUE) + Effects.chrome.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effects.sepia.CLASS)) {
      loadedImage.style.filter = Effects.sepia.PROPERTY + '(' + (percent * (Effects.sepia.MAX_VALUE - Effects.sepia.MIN_VALUE) + Effects.sepia.MIN_VALUE) + Effects.sepia.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effects.marvin.CLASS)) {
      loadedImage.style.filter = Effects.marvin.PROPERTY + '(' + (percent * (Effects.marvin.MAX_VALUE - Effects.marvin.MIN_VALUE) + Effects.marvin.MIN_VALUE) + Effects.marvin.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effects.phobos.CLASS)) {
      loadedImage.style.filter = Effects.phobos.PROPERTY + '(' + (percent * (Effects.phobos.MAX_VALUE - Effects.phobos.MIN_VALUE) + Effects.phobos.MIN_VALUE) + Effects.phobos.MEASURE + ')';
    } else if (loadedImage.classList.contains(Effects.heat.CLASS)) {
      loadedImage.style.filter = Effects.heat.PROPERTY + '(' + (percent * (Effects.heat.MAX_VALUE - Effects.heat.MIN_VALUE) + Effects.heat.MIN_VALUE) + Effects.heat.MEASURE + ')';
    }
  };

  effectsList.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    removePreviousEffect();

    var target = evt.target;

    if (target.classList.contains(Effects.none.CLASS)) {
      imgUploadEffectLevel.classList.add('hidden');
    } else if (target.classList.contains(Effects.chrome.CLASS)) {
      loadedImage.classList.add(Effects.chrome.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effects.sepia.CLASS)) {
      loadedImage.classList.add(Effects.sepia.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effects.marvin.CLASS)) {
      loadedImage.classList.add(Effects.marvin.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effects.phobos.CLASS)) {
      loadedImage.classList.add(Effects.phobos.CLASS);
      showFullSlider();
    } else if (target.classList.contains(Effects.heat.CLASS)) {
      loadedImage.classList.add(Effects.heat.CLASS);
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
