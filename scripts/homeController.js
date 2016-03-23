(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show();
    $('#projects').hide();
    $('#about').hide();
  };

  module.homeController = homeController;
})(window);
