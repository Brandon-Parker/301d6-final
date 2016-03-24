(function(module) {
  function Project(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    }, this);
  }

  Project.all = [];

  Project.prototype.toHtml = function() {
    var source = $('#project-template').html();
    var template = Handlebars.compile(source);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Project.loadAll = function(projectData) {
    if (Project.all.length === 0) {
      projectData.forEach(function(ele) {
        Project.all.push(new Project(ele));
      });
    }
  };

  Project.fetchAll = function(next) {
    var localEtag;
    $.ajax({
      type: 'HEAD',
      url: '/data/projectData.json',
      success: function(data, message, xhr) {
        localEtag = xhr.getResponseHeader('eTag');
        localStorage.setItem('eTag', localEtag);
        if (localStorage.eTag === xhr.getResponseHeader('eTag') && localStorage.projectData) {
          Project.loadAll(JSON.parse(localStorage.projectData));
          next();
        } else {
          $.getJSON('/data/projectData.json', function(projectData) {
            Project.loadAll(projectData);
            localStorage.projectData = JSON.stringify(projectData);
            next();
          });
        }
      }
    });
  };

  Project.uniqueAuthors = function() {
    return Project.all.map(function(eachProject) {
      return eachProject.author;
      console.log(eachProject);
    })
    .reduce(function(author, cur) {
      if (author.indexOf(cur) < 0) author.push(cur);
      console.log(author);
      console.log(cur);
      return author;
    }, []);
  };

  module.Project = Project;
})(window);
