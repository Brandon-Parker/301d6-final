(function(module) {

  var projectView = {};

  projectView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

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
      hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#project-json').val(JSON.stringify(newProject));
  };

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });

    projectView.handleMainNav();
    $('#project-template').hide();
  };

  module.projectView = projectView;
})(window);
