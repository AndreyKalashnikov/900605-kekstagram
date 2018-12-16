'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

  var setScaleValue = function (diff) {
    var numericScaleControlValue = parseInt(scaleControlValue.value, 10);
    numericScaleControlValue += diff;
    numericScaleControlValue = Math.min(100, Math.max(0, numericScaleControlValue));
    scaleControlValue.value = numericScaleControlValue + '%';

    var scale = 'scale(' + numericScaleControlValue / 100 + ')';
    imgUploadPreview.querySelector('img').style.transform = scale;
  };

  scaleControlSmaller.addEventListener('click', function () {
    setScaleValue(-25);
  });
  scaleControlBigger.addEventListener('click', function () {
    setScaleValue(25);
  });

})();
