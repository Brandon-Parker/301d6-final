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
  var $newProject = $('.template').clone();
  $newProject.removeClass('template');
  if (!this.publishedOn) {
    $newProject.addClass('draft');
  }

  $newProject.find('h1:first').text(this.title);
  $newProject.find('.byline a').attr('data-author', this.author);
  $newProject.find('.byline a').html(this.author);
  $newProject.attr('data-authorUrl', this.authorUrl);
  $newProject.find('.project-body').html(this.body);
  $newProject.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);

  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.append('<hr>');

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
