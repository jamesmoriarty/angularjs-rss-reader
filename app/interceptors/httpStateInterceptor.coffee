# http://stackoverflow.com/a/11870892

# register the interceptor as a service, intercepts ALL angular ajax http calls
angular.module("httpStateInterceptor", []).config(($httpProvider) ->
  $httpProvider.responseInterceptors.push "httpStateInterceptor"
  spinnerFunction = (data, headersGetter) ->
    data

  $httpProvider.defaults.transformRequest.push spinnerFunction
  return
).factory "httpStateInterceptor", ($q, $rootScope) ->
  (promise) ->
    $rootScope.polling = true
    $rootScope.networkError = false
    promise.then ((response) ->
      $rootScope.polling = false
      response
    ), (response) ->
      $rootScope.polling = false
      $rootScope.networkError = true
      $q.reject response
