'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var MESSAGES = {
    firstSymbol: 'Хэштег должен начинаться с #. Используйте пробелы только для разделения хэштегов',
    onlyHashtag: 'Хэштег не может состоять только из символа #',
    maxLength: 'Максимальная длина хэштега - 20 символов',
    maxCount: 'Максимальное количество хэштегов - 5',
    same: 'Введите, пожалуйста, разные хэштеги',
    noSpace: 'Введите, пожалуйста, следующий хэштег через пробел'
  };

  var checkSameHashtags = function (array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[j] === array[i]) {
          return true;
        }
      }
    }
    return false;
  };

  var checkHashtags = function (array) {
    var counter = 0;
    var mistakes = {};
    for (var i = 0; i < array.length; i++) {
      if ((array[i][0] !== '#') && (array[i][0] !== ' ')) {
        textHashtags.setCustomValidity(MESSAGES.firstSymbol);
        mistakes.firstSymbol = true;
      } else if (array[i].length === 1) {
        textHashtags.setCustomValidity(MESSAGES.onlyHashtag);
        mistakes.onlyHashtag = true;
      } else if (array[i].length > MAX_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity(MESSAGES.maxLength);
        mistakes.maxLength = true;
      } else if (array.length > MAX_HASHTAGS_COUNT) {
        textHashtags.setCustomValidity(MESSAGES.maxCount);
        mistakes.maxCount = true;
      } else if (checkSameHashtags(array)) {
        textHashtags.setCustomValidity(MESSAGES.same);
        mistakes.same = true;
      } else if ((array[i].indexOf('#', 1)) > -1) {
        textHashtags.setCustomValidity(MESSAGES.noSpace);
        mistakes.noSpace = true;
      } else {
        counter++;
      }
      if (counter === array.length) {
        textHashtags.setCustomValidity('');
      } else {
        if (mistakes.firstSymbol) {
          textHashtags.setCustomValidity(MESSAGES.firstSymbol);
        } else if (mistakes.onlyHashtag) {
          textHashtags.setCustomValidity(MESSAGES.onlyHashtag);
        } else if (mistakes.maxLength) {
          textHashtags.setCustomValidity(MESSAGES.maxLength);
        } else if (mistakes.maxCount) {
          textHashtags.setCustomValidity(MESSAGES.maxCount);
        } else if (mistakes.same) {
          textHashtags.setCustomValidity(MESSAGES.same);
        } else if (mistakes.noSpace) {
          textHashtags.setCustomValidity(MESSAGES.noSpace);
        }
      }
    }
  };

  textHashtags.addEventListener('input', function () {
    var hashtagMessage = textHashtags.value;
    var hashtags = hashtagMessage.toLowerCase().split(' ');
    if (hashtagMessage === '') {
      textHashtags.setCustomValidity('');
    } else {
      checkHashtags(hashtags);
    }
  });

})();
