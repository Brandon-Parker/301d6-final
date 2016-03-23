(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').show();
    $('#projects').hide();
    $('#home').hide();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
