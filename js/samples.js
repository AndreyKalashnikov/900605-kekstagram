'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      window.bigPicture.showBigPicture(photo);
      window.bigPicture.openBigPicture();
      window.bigPicture.showComments(photo);
    });

    return photoElement;
  };

  var onSuccess = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    samples = data;
    window.filter.changeFilter(samples);
    showSamples(samples);
  };

  var onError = function (text) {
    window.error.openErrorPopup(text);
  };

  var samples = [];

  var showSamples = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPhoto(array[i]));
    }
    pictures.appendChild(fragment);
  };

  window.backend.load(onSuccess, onError);

  window.samples = {
    showSamples: showSamples
  };

})();
