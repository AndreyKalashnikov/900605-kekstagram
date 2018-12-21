'use strict';

(function () {

  var changeFilter = function (data) {

    var imgFilters = document.querySelector('.img-filters');
    var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
    var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
    var pictures = document.querySelector('.pictures');

    var setFilterNew = function (array) {
      return window.main.getRandomArray(array.slice()).slice(0, 10);
    };

    var setFilterDiscussed = function (array) {
      return array.slice().sort(function (foo, bar) {
        return bar.comments.length - foo.comments.length;
      });
    };

    var setFilter = function (evt) {
      var target = evt.target;
      var picture = pictures.querySelectorAll('.picture');
      picture.forEach(function (item) {
        pictures.removeChild(item);
      });
      switch (target.id) {
        case 'filter-popular':
          window.samples.showSamples(data);
          break;
        case 'filter-new':
          window.samples.showSamples(setFilterNew(data));
          break;
        case 'filter-discussed':
          window.samples.showSamples(setFilterDiscussed(data));
          break;
      }
    };

    var debounceFilters = window.debounce.debounce(setFilter);
    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.tagName === 'BUTTON') {
        changeButton(target.id);
        debounceFilters(evt);
      }

    });
    var changeButton = function (id) {
      for (var i = 0; i < imgFiltersButton.length; i++) {
        imgFiltersButton[i].classList.remove('img-filters__button--active');
      }
      imgFiltersForm.querySelector('#' + id).classList.add('img-filters__button--active');
    };
  };

  window.filter = {
    changeFilter: changeFilter
  };

})();
