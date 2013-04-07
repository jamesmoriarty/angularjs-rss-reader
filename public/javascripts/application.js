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
              // do something on error
              // todo hide the spinner
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
  $scope.rssEntries = [];
  $scope.fetchRss = function() {
    var requestUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=' + encodeURIComponent($scope.rssUrl);
    $http.jsonp(requestUrl).
      success(function(data){
        if(data.responseData != null){
          $scope.rssEntries = data.responseData.feed.entries
        } else {
          alert(data.responseDetails);
        };
      }).
      error(function(data, status, headers, config) {
      alert("Error");
    });
  };
}


