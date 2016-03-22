(function(module) {
  var appController = {};

  Project.fetchAll(projectView.initIndexPage);

  appController.index = function() {
    $('#projects').show();
    $('#about').hide();
    $('#home').hide();
  };

  module.appController = appController;
})(window);
