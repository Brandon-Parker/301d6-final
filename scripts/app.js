function Project(opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
  this.imgLink = opts.imgLink;
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
  projectData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  var localEtag;
  $.ajax({
    type: 'HEAD',
    url: '/data/projectData.json',
    success: function(data, message, xhr) {
      localEtag = xhr.getResponseHeader('eTag');
      localStorage.setItem('eTag', localEtag);
      if (localStorage.eTag === xhr.getResponseHeader('eTag') && localStorage.projectData) {
        console.log(localStorage.eTag);
        Project.loadAll(JSON.parse(localStorage.projectData));
        projectView.initIndexPage();
      } else {
        $.getJSON('/data/projectData.json', function(projectData){
          Project.loadAll(projectData);
          localStorage.projectData = JSON.stringify(projectData);
          projectView.initIndexPage();
        });
      }
    }
  });
};
