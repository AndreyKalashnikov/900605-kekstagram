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

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

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

// Создает массив с числами от 1 до number в случайном порядке без повторений
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

// Обратная задача - по выдернутому номеру узнать номер элемента в массиве
var getNumberInArray = function (val, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].url === val) {
      var match = i;
    }
  }
  return match;
};

var removeChildren = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
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
  var totalLikes = getRandomFromDiaposon(15, 200);
  var totalMessages = getRandomFromDiaposon(7, 15);
  var messagesArr = getAll(COMMENTS, totalMessages);

  photos.push({
    url: 'photos/' + randomUrls[i] + '.jpg',
    likes: totalLikes,
    messages: totalMessages,
    message: messagesArr,
    name: getByIndex(NAMES, getRandomFromDiaposon(0, NAMES.length - 1)),
    description: getByIndex(DESCRIPTIONS, getRandomFromDiaposon(0, DESCRIPTIONS.length - 1)),
    author: getByIndex(NAMES, getRandomFromDiaposon(0, NAMES.length - 1)),
    avatar: getRandomFromDiaposon(1, 6)
  });

  var newPhoto = renderPhoto(photos[i]);
  fragment.appendChild(newPhoto);
}

var pictures = document.querySelector('.pictures');
pictures.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var clickedPhotoNumber;

var bigPictureComments = bigPicture.querySelector('.social__comments');

pictures.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    var targetSrc = target.src;

    for (var pic = 1; pic <= TOTAL_SAMPLES; pic++) {
      var currentPic = 'photos/' + pic + '.jpg';

      if (targetSrc.indexOf(currentPic) > 0) {
        clickedPhotoNumber = getNumberInArray(currentPic, photos);

        bigPicture.querySelector('img').src = target.src;
        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.social__picture').src = 'img/avatar-' + photos[clickedPhotoNumber].avatar + '.svg';
        bigPicture.querySelector('.likes-count').textContent = photos[clickedPhotoNumber].likes;
        bigPicture.querySelector('.comments-count').textContent = photos[clickedPhotoNumber].messages;

        var commentsFragment = document.createDocumentFragment();
        var commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
        var countComments = photos[clickedPhotoNumber].messages;

        for (var j = 0; j < countComments; j++) {
          var commentsElement = commentsTemplate.cloneNode(true);
          commentsElement.querySelector('img').src = 'img/avatar-' + getRandomFromDiaposon(1, 6) + '.svg';
          commentsElement.querySelector('p').textContent = photos[clickedPhotoNumber].message[j];
          commentsFragment.appendChild(commentsElement);
        }
        bigPictureComments.appendChild(commentsFragment);

        bigPicture.querySelector('.social__caption').textContent = photos[clickedPhotoNumber].description;
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

