var liveProjects = [];

function Project (opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
  this.imgLink = opts.imgLink;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();

  $newProject.attr('data-category', this.category);
  $newProject.find('h1').attr('data-title', this.title);
  $newProject.find('h1').html(this.title);
  $newProject.find('a').attr('data-author', this.author);
  $newProject.find('a').html(this.author);
  $newProject.attr('data-authorUrl', this.authorUrl);
  $newProject.find('.project-body').html(this.body);
  
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);

  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.append('<hr>');

  $newProject.removeClass('template');
  return $newProject;
};

projectDetails.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectDetails.forEach(function(ele) {
  liveProjects.push(new Project(ele));
});

liveProjects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
