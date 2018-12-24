'use strict';

(function () {

  var getRandomFromDiaposon = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (array) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      var random = getRandomFromDiaposon(0, array.length - 1);
      results.push(array[random]);
      array.splice(random, 1);
      i--;
    }
    return results;
  };

  var removeChildren = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  window.main = {
    getRandomFromDiaposon: getRandomFromDiaposon,
    getRandomArray: getRandomArray,
    removeChildren: removeChildren
  };

})();
