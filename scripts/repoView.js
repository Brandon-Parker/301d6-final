(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');

    // $about.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();

    $('#repo-projects ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
