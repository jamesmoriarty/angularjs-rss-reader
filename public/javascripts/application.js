// taken from Adam Webber - http://jsfiddle.net/niden/86L5p/ but added pure javascript show/hide.
angular.module('SharedServices', [])
  .config(function ($httpProvider) {
      $httpProvider.responseInterceptors.push('myHttpInterceptor');
      var spinnerFunction = function (data, headersGetter) {
        document.getElementById('loading').style.display = ''; // show
        return data;
      };
      $httpProvider.defaults.transformRequest.push(spinnerFunction);
  })
  // register the interceptor as a service, intercepts ALL angular ajax http calls
  .factory('myHttpInterceptor', function ($q, $window) {
      return function (promise) {
          return promise.then(function (response) {
              document.getElementById('loading').style.display = 'none'; // hide
              return response;
          }, function (response) {
              document.getElementById('loading').style.display = 'none'; // hide
              return $q.reject(response);
          });
      };
  })

angular.module('rssReader', ['ngCookies', 'SharedServices']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:RssController}).
      otherwise({redirectTo:'/'});
  });

function RssController($scope, $http, $cookieStore, $timeout) {

  // create
  $scope.create = function() {
    var requestUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=' + encodeURIComponent($scope.rssUrl);
    $http.jsonp(requestUrl).
      success(function(data) {
        if(data.responseData != null) {
          $scope.rssUrls.pushUnique($scope.rssUrl);
          $cookieStore.put("rssUrls", $scope.rssUrls)
          var rssEntries = data.responseData.feed.entries;
          for(var n = 0; n < rssEntries.length; n++) {
            var date = Date.parse(rssEntries[n].publishedDate)
            if(isNaN(date)) date = Date.parse(Date());
            rssEntries[n].publishedDate = date;
            $scope.rssEntries.pushUniqueBy(rssEntries[n], function(a, b) { return a.link === b.link; });
          }
        } else {
          alert(data.responseDetails);
        };
      })
  };

  // destroy
  $scope.destroy = function(index) {
    $scope.rssUrls.splice(index, 1)
    $cookieStore.put("rssUrls", $scope.rssUrls)
  }

  $scope.onTimeout = function(){
    refresh();
    refreshTimeout = $timeout($scope.onTimeout, 60000);
  }
  var refreshTimeout = $timeout($scope.onTimeout, 60000);

  // refresh
  function refresh() {
    $scope.rssUrls    = $cookieStore.get("rssUrls") || [];
    $scope.rssEntries = $scope.rssEntries || [];
    $scope.rssUrls.map(function(obj) {
      $scope.rssUrl = obj
      $scope.create()
    });
  }

  // initialize
  refresh();

  // TODO - find where this belongs.
  $scope.feedsDisplay = 'none'
  $scope.toggleFeeds = function() {
    $scope.feedsDisplay === 'none' ? $scope.feedsDisplay = '' : $scope.feedsDisplay = 'none';
  };

}

Array.prototype.pushUnique = function (obj) {
  if(this.indexOf(obj) == -1) {
    this.push(obj);
    return true;
  }
  return false;
}

Array.prototype.pushUniqueBy = function (obj, equalityFunction) {
  for(var n = 0; n < this.length; n++) {
    if(equalityFunction(this[n], obj)) { // contains
      return false;
    }
  }
  this.push(obj);
  return true;
}
