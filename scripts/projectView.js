(function(module) {

  var projectView = {};

  projectView.initNewProjectPage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#project-json').on('focus', function() {
      this.select();
    });
    $('#new-form').on('change', 'input', 'textarea', projectView.create);
  };

  projectView.create = function() {
    var newProject;
    $('#projects').empty();

    newProject = new Project({
      title: $('#project-title').val(),
      body: $('#project-body').val(),
      author: $('#project-author').val(),
      authorUrl: $('#project-author-url').val(),
      publishedOn: $('#project-published:checked').length ? new Date() : null
    });
    $('#projects').append(newProject.toHtml());
    $('#projects').each(function(i, block) {
    });

    $('#export-field').show();
    $('#project-json').val(JSON.stringify(newProject));
  };

  projectView.initIndexPage = function() {
    $('#projects').empty();

    Project.all.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });

    $('#project-template').hide();
  };

  module.projectView = projectView;
})(window);
