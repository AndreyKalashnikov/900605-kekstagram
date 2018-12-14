'use strict';

var effectList = imgUploadOverlay.querySelector('.effects__list');
var loadedImage = imgUploadPreview.querySelector('img');

var removePreviousEffect = function () {
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
};

effectList.addEventListener('click', function (evt) {
  removePreviousEffect();
  var target = evt.target;
  if (target.classList.contains('effects__preview--chrome')) {
    loadedImage.classList.add('effects__preview--chrome');
    console.log(loadedImage);
  }
});
