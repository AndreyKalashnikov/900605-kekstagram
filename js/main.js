'use strict';

(function () {

  var getByIndex = function (array, index) {
    if (typeof index === 'number' && index >= 0 && !(index % 1)) {
      return array[index];
    } else {
      return array[0];
    }
  };

  var getAll = function (array, count) {
    var arrayData = [];
    for (var i = 0; i < count; i++) {
      arrayData.push(getByIndex(array, getRandomFromDiaposon(0, array.length - 1)));
    }
    return arrayData;
  };

  var getRandomFromDiaposon = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.main = {
    getByIndex: getByIndex,
    getAll: getAll,
    getRandomFromDiaposon: getRandomFromDiaposon
  };

})();
