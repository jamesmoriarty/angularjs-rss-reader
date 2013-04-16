/*global rssReader */
'use strict';

rssReader.controller('rssController', function rssController($scope, $http, $timeout, $location, rssStorage) {

  $scope.rssUrls    = rssStorage.get() || [];
  $scope.rssEntries = $scope.rssEntries || [];
  
  // create
  $scope.create = function() {
    var requestUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=' + encodeURIComponent($scope.rssUrl);
    $http.jsonp(requestUrl).
      success(function(data) {
        if(data.responseData != null) {
          // save new rss url
          $scope.rssUrls.pushUnique($scope.rssUrl);
          
          // persist
          rssStorage.put($scope.rssUrls);

          // save new rss entries
          var rssEntries = data.responseData.feed.entries;
          for(var n = 0; n < rssEntries.length; n++) {
            // check for published date to order by - default to now.
            var date = Date.parse(rssEntries[n].publishedDate);
            if(isNaN(date)) date = Date.parse(Date());
            rssEntries[n].publishedDate = date;
            // add entries with unique link.
            $scope.rssEntries.pushUniqueBy(rssEntries[n], function(a, b) { return a.link === b.link; });
          }
        } else {
          alert(data.responseDetails);
        };
      });
  }

  // destroy
  $scope.destroy = function(index) {
    $scope.rssUrls.splice(index, 1);
    rssStorage.put($scope.rssUrls);
  }

  // refresh
  $scope.refresh = function() {
    $scope.rssUrls.map(function(obj) {
      $scope.rssUrl = obj;
      $scope.create();
    });
  }

  // initialize
  var loadIn = $scope.rssUrls.length > 0 && $scope.rssEntries.length  === 0 ? 1000 : 60000

  // periodically refresh 
  $scope.onTimeout = function(){
    $scope.refresh();
    refreshTimeout = $timeout($scope.onTimeout, 60000);
  }
  var refreshTimeout = $timeout($scope.onTimeout, loadIn);

});
