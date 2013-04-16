/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict';

  describe('RssController', function () {
    var controller, scope, $httpBackend;
 
      // Load the module containing the app, only 'ng' is loaded by default.
    beforeEach(module('rssReader'));

    beforeEach(inject(function ($injector, $controller, $rootScope) {
      scope       = $rootScope.$new();
      controller  = $controller('rssController', {$scope: scope});
      
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend
        .whenJSONP(/ajax.googleapis.com\/ajax\/services\/feed/)
        .respond({"responseData": {"feed":{"feedUrl":"https://news.ycombinator.com/rss","title":"Hacker News","link":"https://news.ycombinator.com/","author":"","description":"Links for the intellectually curious, ranked by readers.","type":"rss20","entries":[{"title":"Programmer Creates An AI To (Not Quite) Beat NES Games","link":"http://techcrunch.com/2013/04/14/nes-robot/","author":"","publishedDate":"","contentSnippet":"Comments","content":"\u003ca href\u003d\"https://news.ycombinator.com/item?id\u003d5548260\"\u003eComments\u003c/a\u003e","categories":[]}]}}, "responseDetails": null, "responseStatus": 200});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    // destroy
    it('remove rss url', function () {
      scope.rssUrls = ["http://example.com/rss.atom"]
      expect(scope.rssUrls.length).toBe(1);
      scope.destroy(0);
      expect(scope.rssUrls.length).toBe(0);
    });

    // create
    describe('having some saved RSS', function () {
      it("creates rssEntries", function () {
        expect(scope.rssEntries.length).toBe(0); 
        expect(scope.rssUrls.length).toBe(0);
        scope.rssUrl = ["http://example.com/rss.atom"]
        scope.create(); 
        $httpBackend.flush();
        expect(scope.rssEntries.length).toBe(1); 
        expect(scope.rssUrls.length).toBe(1);
      });

    });
  });
}());
