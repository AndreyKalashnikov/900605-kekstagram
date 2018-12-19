'use strict';

(function () {

  var TOTAL_SAMPLES = 25;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  // Создает массив с числами от 1 до number в случайном порядке без повторений
  var getRandomOrder = function (number) {
    var numberArray = [];
    for (var i = 0; i < number; i++) {
      numberArray[i] = i + 1;
    }
    var randomArray = [];
    for (var j = 0; j < number; j++) {
      var currentIndex = window.main.getRandomFromDiaposon(0, numberArray.length - 1);
      var currentNumber = numberArray[currentIndex];
      randomArray[j] = currentNumber;
      numberArray.splice(currentIndex, 1);
    }
    return randomArray;
  };

  var randomUrls = getRandomOrder(TOTAL_SAMPLES);

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.messages;
    return photoElement;
  };

  var fragment = document.createDocumentFragment();

  var photos = [];

  for (var i = 0; i < TOTAL_SAMPLES; i++) {
    var totalLikes = window.main.getRandomFromDiaposon(15, 200);
    var totalMessages = window.main.getRandomFromDiaposon(7, 15);
    var messagesArr = window.main.getAll(COMMENTS, totalMessages);

    photos.push({
      url: 'photos/' + randomUrls[i] + '.jpg',
      likes: totalLikes,
      messages: totalMessages,
      message: messagesArr,
      name: window.main.getByIndex(NAMES, window.main.getRandomFromDiaposon(0, NAMES.length - 1)),
      description: window.main.getByIndex(DESCRIPTIONS, window.main.getRandomFromDiaposon(0, DESCRIPTIONS.length - 1)),
      author: window.main.getByIndex(NAMES, window.main.getRandomFromDiaposon(0, NAMES.length - 1)),
      avatar: window.main.getRandomFromDiaposon(1, 6)
    });

    var newPhoto = renderPhoto(photos[i]);
    fragment.appendChild(newPhoto);
  }

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);

  window.samples = {
    TOTAL_SAMPLES: TOTAL_SAMPLES,
    photos: photos
  };

})();
