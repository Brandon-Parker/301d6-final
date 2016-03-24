(function(module) {
  var repoView = {};

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    $('#repo-projects ul').empty();
    $('#repo-projects ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
