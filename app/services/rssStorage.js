/*global rssReader */
'use strict';

rssReader.factory('rssStorage', function () {
  var STORAGE_ID = 'rss-angularjs';

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function (obj) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(obj));
    }
  };
});
