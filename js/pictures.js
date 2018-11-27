'use strict';

var TOTAL_SAMPLES = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

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

var getRandomOrder = function (number) {
  var numberArray = [];
  for (var i = 0; i < number; i++) {
    numberArray[i] = i + 1;
  }
  var randomArray = [];
  for (var j = 0; j < number; j++) {
    var currentIndex = getRandomFromDiaposon(0, numberArray.length - 1);
    var currentNumber = numberArray[currentIndex];
    randomArray[j] = currentNumber;
    numberArray.splice(currentIndex, 1);
  }
  return randomArray;
};


