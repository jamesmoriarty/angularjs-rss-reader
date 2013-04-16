// taken from Adam Webber - http://jsfiddle.net/niden/86L5p/ but added pure javascript show/hide.
angular.module('httpSpinner', [])
  .config(function ($httpProvider) {
      $httpProvider.responseInterceptors.push('httpSpinnerInterceptor');
      var spinnerFunction = function (data, headersGetter) {
        var el;
        if(el = document.getElementById('loading')) {
          el.style.display = ''; // show
        }
        return data;
      };
      $httpProvider.defaults.transformRequest.push(spinnerFunction);
  })
  // register the interceptor as a service, intercepts ALL angular ajax http calls
  .factory('httpSpinnerInterceptor', function ($q, $window) {
      return function (promise) {
          return promise.then(function (response) {
              var el;
              if(el = document.getElementById('loading')) {
                el.style.display = 'none'; // hide
              }
              return response;
          }, function (response) {
              var el;
              if(el = document.getElementById('loading')) {
                el.style.display = 'none'; // hide
              }
              return $q.reject(response);
          });
      };
  })
