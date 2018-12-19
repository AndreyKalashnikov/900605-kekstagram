'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var showBigPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showComments = function (picture) {
    var commentTemplate = document.querySelector('#comments').content.querySelector('li');
    console.log(commentTemplate);
    var commentElement = commentTemplate.clonNode(true);
    commentElement.querySelector('.social__picture').src = picture.avatar;
  };

  bigPictureCancel.addEventListener('click', closeBigPicture);
  bigPictureCancel.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEYCODE) {
      closeBigPicture();
    }
  });

  window.bigPicture = {
    showBigPicture: showBigPicture,
    openBigPicture: openBigPicture,
    showComments: showComments
  };

})();
