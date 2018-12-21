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

  var getRandomArray = function (array) {
    var cloneArray = [];
    for (var j = 0; j < array.length; j++) {
      cloneArray.push(array[j]);
    }

    var result = [];

    for (var i = 0; i < cloneArray.length; i++) {
      var random = getRandomFromDiaposon(0, cloneArray.length - 1);
      result.push(cloneArray[random]);
      cloneArray.splice(random, 1);
      i--;
    }
    return result;
  };

  var removeChildren = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  window.main = {
    getByIndex: getByIndex,
    getAll: getAll,
    getRandomFromDiaposon: getRandomFromDiaposon,
    getRandomArray: getRandomArray,
    removeChildren: removeChildren
  };

})();
