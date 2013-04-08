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

angular.module('rssReader', ['SharedServices']).
config(function($routeProvider) {
  $routeProvider.
    when('/', {controller:RssController}).
    otherwise({redirectTo:'/'});
});

function RssController($scope, $http) {
  $scope.historyDisplay = 'none'

  $scope.toggleHistory = function() {
    $scope.historyDisplay === 'none' ? $scope.historyDisplay = '' : $scope.historyDisplay = 'none';
  };

  $scope.rssUrls    = [];
  $scope.rssEntries = [];

  $scope.fetchRss = function() {
    var requestUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=' + encodeURIComponent($scope.rssUrl);
    $http.jsonp(requestUrl).
      success(function(data) {
        if(data.responseData != null) {
          $scope.rssUrls.pushUnique($scope.rssUrl);
          var rssEntries = data.responseData.feed.entries;
          for(var n = 0; n < rssEntries.length; n++) {
            $scope.rssEntries.pushUniqueBy(rssEntries[n], function(a, b) { return a.link === b.link; });
          }
        } else {
          alert(data.responseDetails);
        };
      })
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
