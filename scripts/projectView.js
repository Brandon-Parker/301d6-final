(function(module) {                                         //REVIEW:Begin by wrapping contents of the page in an IIFE statment

  var projectView = {};                                     //REVIEW:Creating an empty object with the variable of projectView which will be referenced later

  projectView.handleMainNav = function() {                  //REVIEW:Create a new method which controls all of the navigation between tabs
    $('.main-nav').on('click', '.tab', function(e) {        //This whole section will target the main-nav by its ID and adds a jQuery on click event
      $('.tab-content').hide();                             //When the button is clicked we want to hide all of the irrelevant tab contents and just show
      $('#' + $(this).data('content')).fadeIn();            //what was clicked on and the fade in which is called on line 10
    });
    $('.main-nav .tab:first').click();
  };

  projectView.initNewProjectPage = function() {             //REVIEW:Create a new method to Initalize our new projects for the new.html page
    $('.tab-content').show();                               //First query the DOM to find the section with a class of .tab-content and show it
    $('#export-field').hide();                              //and then hide the section by ID export-field
    $('#project-json').on('focus', function() {             //When the user is adding a new project
      this.select();                                        //
    });                                                     //
    $('#new-form').on('change', 'input', 'textarea', projectView.create); //
  };

  projectView.create = function() {                         //REVIEW:Create a new method which is designed to create the new project
    var newProject;                                         //Defining a new variable which is specifically for the new Projects
    $('#projects').empty();                                 //And now will query the DOM to find the section by ID of projects and empty its current field

    newProject = new Project({                              //REVIEW: This section is creating the objects within the Project constructor setting
      title: $('#project-title').val(),                     //the values of the respective parameters (title, author) set to the value that was entered
      body: $('#project-body').val(),
      author: $('#project-author').val(),
      authorUrl: $('#project-author-url').val(),
      publishedOn: $('#project-published:checked').length ? new Date() : null
    });
    $('#projects').append(newProject.toHtml());             //REVIEW:Query the DOM to find the ID of projects and append each of the newly created Projects
    $('#projects').each(function(i, block) {                //to the HTML page and for each iteration run a function to using Highlight.js to give some styling
      hljs.highlightBlock(block);                           //and structure to them
    });

    $('#export-field').show();                              //REVIEW: This section will show what was entered export-field(user inputed project)
    $('#project-json').val(JSON.stringify(newProject));     //and give a string at the bottom of the page after hitting published to copy and then paste into the JSON file to be saved
  };

  projectView.initIndexPage = function() {                  //REVIEW: This method is what Initalizes the index/landing page and appends all of the current projects to the HTML
    Project.all.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });

    projectView.handleMainNav();                            //REVIEW:This method's purpose is what calls the early defined Main nav section and to hide the blank template when called
    $('#project-template').hide();
  };

  module.projectView = projectView;                         //REVIEW:Closing statement for an IIFE which will link our ProjectView page and functionality to the window
})(window);
