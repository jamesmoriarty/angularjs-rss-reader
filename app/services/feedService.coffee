rssReader.factory "feedService", [
  "$http"
  ($http) ->
    return parseFeed: (url) ->
      $http.jsonp "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=#{ encodeURIComponent(url) }"
]
