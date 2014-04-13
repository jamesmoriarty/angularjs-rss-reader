rssReader.controller "rssController", rssController = ($scope, $http, $timeout, $location, feedService) ->
  $scope.rssUrls    ?= []
  $scope.rssEntries ?= []

  # create
  $scope.create = ->
    feedService.parseFeed($scope.rssUrl).success (response) ->
      if response.responseData?
        $scope.rssUrls.pushUnique $scope.rssUrl
        for entry in response.responseData.feed.entries
          $scope.rssEntries.pushUnique entry, (a, b) ->
            a.link is b.link
      else
        alert response.responseDetails

  # destroy
  $scope.destroy = (index) ->
    $scope.rssUrls.splice index, 1

  # refresh
  $scope.refresh = ->
    $scope.rssUrls.map (obj) ->
      $scope.rssUrl = obj
      $scope.create()
