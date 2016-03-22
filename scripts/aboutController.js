(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').show();
    $('#projects').hide();
    $('#home').hide();
  };


  module.aboutController = aboutController;
})(window);
