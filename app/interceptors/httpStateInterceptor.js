// http://stackoverflow.com/a/11870892
angular.module('httpStateInterceptor', [])
  .config(function ($httpProvider) {
      $httpProvider.responseInterceptors.push('httpStateInterceptor');
      var spinnerFunction = function (data, headersGetter) {
        return data;
      };
      $httpProvider.defaults.transformRequest.push(spinnerFunction);
  })
  // register the interceptor as a service, intercepts ALL angular ajax http calls
  .factory('httpStateInterceptor', function ($q, $rootScope) {
      return function (promise) {
          $rootScope.polling = true;
          $rootScope.networkError = false;
          return promise.then(function (response) {
            $rootScope.polling = false;
            return response;
          }, function (response) {
            $rootScope.polling = false;
            $rootScope.networkError = true;
            return $q.reject(response);
          });
      };
  })

