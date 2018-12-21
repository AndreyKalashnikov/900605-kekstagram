'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var Messages = {
    FIRST_SYMBOL: 'Хэштег должен начинаться с #. Используйте пробелы только для разделения хэштегов',
    ONLY_HASHTAG: 'Хэштег не может состоять только из символа #',
    MAX_LENGTH: 'Максимальная длина хэштега - 20 символов',
    MAX_COUNT: 'Максимальное количество хэштегов - 5',
    SAME: 'Введите, пожалуйста, разные хэштеги',
    NO_SPACE: 'Введите, пожалуйста, следующий хэштег через пробел'
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
        textHashtags.setCustomValidity(Messages.FIRST_SYMBOL);
        mistakes.firstSymbol = true;
      } else if (array[i].length === 1) {
        textHashtags.setCustomValidity(Messages.ONLY_HASHTAG);
        mistakes.onlyHashtag = true;
      } else if (array[i].length > MAX_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity(Messages.MAX_LENGTH);
        mistakes.maxLength = true;
      } else if (array.length > MAX_HASHTAGS_COUNT) {
        textHashtags.setCustomValidity(Messages.MAX_COUNT);
        mistakes.maxCount = true;
      } else if (checkSameHashtags(array)) {
        textHashtags.setCustomValidity(Messages.SAME);
        mistakes.same = true;
      } else if ((array[i].indexOf('#', 1)) > -1) {
        textHashtags.setCustomValidity(Messages.NO_SPACE);
        mistakes.noSpace = true;
      } else {
        counter++;
      }
      if (counter === array.length) {
        textHashtags.setCustomValidity('');
      } else {
        if (mistakes.firstSymbol) {
          textHashtags.setCustomValidity(Messages.FIRST_SYMBOL);
        } else if (mistakes.onlyHashtag) {
          textHashtags.setCustomValidity(Messages.ONLY_HASHTAG);
        } else if (mistakes.maxLength) {
          textHashtags.setCustomValidity(Messages.MAX_LENGTH);
        } else if (mistakes.maxCount) {
          textHashtags.setCustomValidity(Messages.MAX_COUNT);
        } else if (mistakes.same) {
          textHashtags.setCustomValidity(Messages.SAME);
        } else if (mistakes.noSpace) {
          textHashtags.setCustomValidity(Messages.NO_SPACE);
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
