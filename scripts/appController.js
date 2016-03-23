(function(module) {
  var appController = {};

  appController.index = function() {
    $('#projects').show();
    $('#about').hide();
    $('#home').hide();
    Project.fetchAll(projectView.initIndexPage);
  };

  module.appController = appController;
})(window);
