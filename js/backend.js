'use strict';

(function () {

  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram/'
  };

  var Code = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var TIMEOUT = 10000; // 10s

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.OK:
          onSuccess(xhr.response);
          break;
        case Code.INTERNAL_SERVER_ERROR:
          onError('INTERNAL SERVER ERROR: ' + xhr.status);
          break;
        case Code.NOT_FOUND:
          onError('NOT FOUND:' + xhr.status);
          break;
        default:
          onError('SERVER STATUS: ' + xhr.status);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      // console.log(xhr.status);
      switch (xhr.status) {
        case Code.OK:
          onSuccess(xhr.response);
          break;
        case Code.INTERNAL_SERVER_ERROR:
          onError('INTERNAL SERVER ERROR: ' + xhr.status);
          break;
        case Code.NOT_FOUND:
          onError('NOT FOUND:' + xhr.status);
          break;
        default:
          onError('SERVER STATUS: ' + xhr.status);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
