require 'sinatra'
require 'haml'

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
end

get '*' do
  haml :index
end

__END__

@@ layout
%html(ng-app)
  %head
    %meta(charset="utf-8")
    %meta(name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1")
    %script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.5/angular.min.js")
%body
  = yield

@@ index
:javascript
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
:css
  // http://paulirish.com/2012/box-sizing-border-box-ftw/
  * { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .clear{clear:both;}

  /*
   * Clearfix: contain floats
   *
   * For modern browsers
   * 1. The space content is one way to avoid an Opera bug when the
   *    `contenteditable` attribute is included anywhere else in the document.
   *    Otherwise it causes space to appear at the top and bottom of elements
   *    that receive the `clearfix` class.
   * 2. The use of `table` rather than `block` is only necessary if using
   *    `:before` to contain the top-margins of child elements.
   */
  .clearfix:before,
  .clearfix:after {
      content: " "; /* 1 */
      display: table; /* 2 */
  }
  .clearfix:after {
      clear: both;
  }
  /*
   * For IE 6/7 only
   * Include this rule to trigger hasLayout and contain floats.
   */
  .clearfix {
      *zoom: 1;
  }

:css
  body { margin: 1em; }
  body, input, textarea {
    color: #333333;
    font-family: Georgia, Times, serif;
    font-size: 1.35em;
    font-weight: 300;
    line-height: 1.6em;
  }
  form { margin: 1em 1em 5em 1em; text-align: center; }
  form input[type="text"] { width: 50%; }
  form input[type="submit"] { display: inline-block; background: #FFF; }
  input { padding: 5px 10px; border-style: dotted; border-color: #333; }
  .rss-entry { margin-bottom: 1em; }
  .rss-entry .header h2.title { display: inline; }

%div(ng-controller="RssController")

  %form(ng-submit="fetchRss()")
    %input(type="text" ng-model="rssUrl" placeholder="e.g. http://digg.com/rss/top.rss")
    %input(type="submit" value="Fetch")

  %ul.rss-entries
    %li.rss-entry(ng-repeat="rssEntry in rssEntries")
      .header
        %h2.title
          %a(href="{{rssEntry.link}}")
            {{rssEntry.title}}
        &middot;
        %i.published-date
          {{rssEntry.publishedDate}}
      .body
        {{rssEntry.content}}


