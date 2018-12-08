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

// var getAll = function (array, count) {
//   var arrayData = [];
//   for (var i = 0; i < count; i++) {
//     arrayData.push(getByIndex(array, getRandomFromDiaposon(0, array.length - 1)));
//   }
//   return arrayData;
// };

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

var randomUrls = getRandomOrder(TOTAL_SAMPLES);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.message;
  return photoElement;
};

var fragment = document.createDocumentFragment();

var photos = [];

for (var i = 0; i < TOTAL_SAMPLES; i++) {
  photos.push({
    url: 'photos/' + randomUrls[i] + '.jpg',
    likes: getRandomFromDiaposon(15, 200),
    message: getByIndex(COMMENTS, getRandomFromDiaposon(0, COMMENTS.length - 1)),
    name: getByIndex(NAMES, getRandomFromDiaposon(0, NAMES.length - 1))
  });

  var newPhoto = renderPhoto(photos[i]);
  fragment.appendChild(newPhoto);
}

var pictures = document.querySelector('.pictures');
pictures.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('img').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.comments-count').textContent = photos[0].message;
bigPicture.querySelector('.social__caption').textContent = getByIndex(DESCRIPTIONS, getRandomFromDiaposon(0, DESCRIPTIONS.length - 1));
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var bigPictureComments = bigPicture.querySelector('.social__comments');
var bigPicturePreviousComments = bigPictureComments.querySelectorAll('.social__comment');
var countPreviousComments = bigPicturePreviousComments.length;

for (var k = 0; k < countPreviousComments; k++) {
  bigPictureComments.removeChild(bigPicturePreviousComments[k]);
}

var commentsFragment = document.createDocumentFragment();
var countComments = getRandomFromDiaposon(1, 6);
for (var j = 0; j < countComments; j++) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.innerHTML = '<img class="social__picture" src="img/avatar-' +
  getRandomFromDiaposon(1, 6) +
  '.svg"' +
  'alt="Аватар комментатора фотографии"' +
  'width="35" height="35">' +
  '<p class="social__text">' +
  'текст комментария' +
  '</p>';
  commentsFragment.appendChild(newComment);
}

bigPictureComments.appendChild(commentsFragment);

