(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get('github.com/users/Brandon-Parker/repos?per_page=3&sort=updated')
      .done(function(data, message, xhr){
        repos.all = data;
      })
      .done(callback);
  };

  repos.with = function(attribute) {
    return repos.all.filter(function(repo) {
      return repo[attribute];
    });
  };


  module.repos = repos;
})(window);
