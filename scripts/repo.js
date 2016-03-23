(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url:'https://api.github.com/users/Brandon-Parker/repos?per_page=3&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {
        repos.all = data;

        callback();
      }
    });
  };

  repos.with = function(attribute) {
    return repos.all.filter(function(repo) {
      return repo[attribute];
    });
  };


  module.repos = repos;
})(window);
