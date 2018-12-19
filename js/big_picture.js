'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');

  var removeChildren = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  // По выдернутому номеру картинки узнать номер элемента в массиве
  var getNumberInArray = function (val, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].url === val) {
        var match = i;
      }
    }
    return match;
  };

  pictures.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      var targetSrc = target.src;

      for (var pic = 1; pic <= window.samples.TOTAL_SAMPLES; pic++) {
        var currentPic = 'photos/' + pic + '.jpg';

        if (targetSrc.indexOf(currentPic) > 0) {
          var clickedPhotoNumber = getNumberInArray(currentPic, window.samples.photos);

          bigPicture.querySelector('img').src = target.src;
          bigPicture.classList.remove('hidden');
          bigPicture.querySelector('.social__picture').src = 'img/avatar-' + window.samples.photos[clickedPhotoNumber].avatar + '.svg';
          bigPicture.querySelector('.likes-count').textContent = window.samples.photos[clickedPhotoNumber].likes;
          bigPicture.querySelector('.comments-count').textContent = window.samples.photos[clickedPhotoNumber].messages;

          var commentsFragment = document.createDocumentFragment();
          var commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
          var countComments = window.samples.photos[clickedPhotoNumber].messages;

          for (var j = 0; j < countComments; j++) {
            var commentsElement = commentsTemplate.cloneNode(true);
            commentsElement.querySelector('img').src = 'img/avatar-' + window.main.getRandomFromDiaposon(1, 6) + '.svg';
            commentsElement.querySelector('p').textContent = window.samples.photos[clickedPhotoNumber].message[j];
            commentsFragment.appendChild(commentsElement);
          }
          bigPictureComments.appendChild(commentsFragment);

          bigPicture.querySelector('.social__caption').textContent = window.samples.photos[clickedPhotoNumber].description;
          bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
          bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
        }
      }
    }
  });

  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    removeChildren(bigPictureComments);
  });

})();
