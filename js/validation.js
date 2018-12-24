'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var textDescription = imgUploadOverlay.querySelector('.text__description');
  var imgUploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var Messages = {
    FIRST_SYMBOL: 'Хэштег должен начинаться с #. Используйте пробелы только для разделения хэштегов',
    ONLY_HASHTAG: 'Хэштег не может состоять только из символа #',
    MAX_LENGTH: 'Максимальная длина хэштега - 20 символов',
    MAX_COUNT: 'Максимальное количество хэштегов - 5',
    SAME: 'Введите, пожалуйста, разные хэштеги',
    NO_SPACE: 'Введите, пожалуйста, хэштеги через пробел'
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

  var checkHashtags = function (hashtags) {
    var counter = 0;
    var mistakes = {};

    hashtags.forEach(function (item) {
      textHashtags.style.outline = 'none';
      if ((item.charAt(0) !== '#') && (item.charAt(0) !== ' ')) {
        textHashtags.setCustomValidity(Messages.FIRST_SYMBOL);
        mistakes.firstSymbol = true;
      } else if (item.length === 1) {
        textHashtags.setCustomValidity(Messages.ONLY_HASHTAG);
        mistakes.onlyHashtag = true;
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity(Messages.MAX_LENGTH);
        mistakes.maxLength = true;
      } else if (hashtags.length > MAX_HASHTAGS_COUNT) {
        textHashtags.setCustomValidity(Messages.MAX_COUNT);
        mistakes.maxCount = true;
      } else if (checkSameHashtags(hashtags)) {
        textHashtags.setCustomValidity(Messages.SAME);
        mistakes.same = true;
      } else if ((item.indexOf('#', 1)) > -1) {
        textHashtags.setCustomValidity(Messages.NO_SPACE);
        mistakes.noSpace = true;
      } else {
        counter++;
      }
    });

    if (counter === hashtags.length) {
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
  };

  var printBorder = function (textElement) {
    if (textElement.validity.valid) {
      textElement.style.outline = 'none';
    } else {
      textElement.style.outline = '3px dotted red';
    }
  };

  imgUploadSubmit.addEventListener('click', function () {
    printBorder(textHashtags);
    printBorder(textDescription);
  });

  textHashtags.addEventListener('input', function () {
    var hashtagMessage = textHashtags.value;
    var smallHashtags = hashtagMessage.toLowerCase().split(' ');
    if (hashtagMessage === '') {
      textHashtags.setCustomValidity('');
    } else {
      checkHashtags(smallHashtags);
    }
  });

})();
