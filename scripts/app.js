(function(module) {                       //REVIEW: Initating the IIFE statement for this JS page to be private and can be called when necessary

  function Project(opts) {                //REVIEW:
    this.title = opts.title;              //This whole section is setting up the constructor function Project
    this.author = opts.author;            //to be later used for dynamic data input.
    this.authorUrl = opts.authorUrl;
    this.publishedOn = opts.publishedOn;
    this.body = opts.body;                //This will be refactored for a more Functional Programming aspect, similar to the Pair-Assignment blog
    this.imgLink = opts.imgLink;
  }

  Project.all = [];                       //REVIEW: This is creating an array called to push data too in the next area

  Project.prototype.toHtml = function() {         //REVIEW: Creating a method from the Project constructor prototype to
    var source = $('#project-template').html();   //set up the templates utilizing Handlebars and pushing it to the section
    var template = Handlebars.compile(source);    //in the HTML with the ID of project-template and calling the compile method to initiate

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);         //REVIEW: Creating a days ago element with native JS Date for each element added
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';    //Creating a publishStatus operator, with a ? (Ternary Operator) which evaluates if the statement before the ? is true and the finished with the statment after the ":"
    this.body = marked(this.body);                                                                    //This uses the current body element and adds the marked method(from marked.js) to clean up the content visually

    return template(this);        //REVIEW: Return the template from this instance.
  };

  Project.loadAll = function(projectData) {                                //REVIEW: creating a loadAll method to pass a function with a parameter of projectData
    projectData.sort(function(a, b) {                                      //The sort method is called and passed a function with two parameters of a and b for the next two elements following
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));        //We are returning the constructor Date arrays from publishedOn and doing a calculation on what I believe is subtracting from the actual publish date in comparison to the current date
    });

    projectData.forEach(function(ele) {                                   //REVIEW: For each element in projectData I am running a function and passing an element of 'ele'
      Project.all.push(new Project(ele));                                 //The empty Project array that I defined on line 12, will push each new iteration in the Project constructor to the array.
    });
  };

  Project.fetchAll = function(next) {                        //REVIEW: Create a fetchAll method to grab all of the data that I need/want to be used in the DOM or to be stored
    var localEtag;                                           //Right here I am creating a new variable called localEtag which I will use to directly reference the eTag in the HEAD to check for any updates to any projects
    $.ajax({                                                 //Initiating an HTTP request
      type: 'HEAD',                                          //Both type and url are the specific keys that are being targeted to tell the server that I need to check just the HEAD section of the page not the whole page
      url: '/data/projectData.json',                         //relates to the specific location of where our data is coming from
      success: function(data, message, xhr) {                //This success function is necessary and requires all three arguments in order to work
        localEtag = xhr.getResponseHeader('eTag');           //Setting localEtag to the response from the HEAD request that was just made through the AJAX call and grabbing the 'eTag'
        localStorage.setItem('eTag', localEtag);             //This method is setting the 'eTag' as localEtag in our localStorage
        if (localStorage.eTag === xhr.getResponseHeader('eTag') && localStorage.projectData) {  //REVIEW: This statement says that if the localStorage.eTag is the exact same as what our HEAD request has and if the projectData exists in the local storage already,
          // console.log(localStorage.eTag);                                                    //(this console.log will be deleted)
          Project.loadAll(JSON.parse(localStorage.projectData));                                //then we need to load everything from the JSON file and parse it from it's original format in the JSON,
          next();                                                                               //and then we use our callback 'next()', which was passed as an parameter in the function at the beginning of fetchAll, to move to the next argument in the function,
        } else {
          $.getJSON('/data/projectData.json', function(projectData) {                           //REVIEW:If our eTag is not the same as before or the projectData do not already exist in local storage than we need to do our getJSON function to grab everything
            Project.loadAll(projectData);                                                       //and here the loadAll method that was defined up above is being called and passing in the projectData through it
            localStorage.projectData = JSON.stringify(projectData);                             //This last line is telling our JSON to update from being an object and return it as a string and then save it to local storage
            next();                                                                             //and then moving to the next method
          });
        }
      }
    });
  };

  Project.uniqueAuthors = function() {                                //REVIEW: Right here this functionality was to practice using
    return Project.all.map(function(eachProject) {                    //the .map and . reduce methods to sort through an assortment of data and get
      return eachProject.author;                                      //back only specific elements that I wanted to. Using .map creates a new array of data for uniqueAuthors
      console.log(eachProject);                                       //without manipulating the original array and the return each author
    })
    .reduce(function(author, cur) {                                   //REVIEW: the .reduce method here is passing an accumulator as author and then current item
      if (author.indexOf(cur) < 0) author.push(cur);                  //Run an if statment checking if there is an index of the current element of author and checking if it exists (<0), if so push that current element to the new author array
      console.log(author);                                            //This array is defined as empty at line 68 currently.
      console.log(cur);                                               //These console.logs will get deleted
      return author;                                                  //Now here we return this new author array after our .map and .reduce chain have been completed
    }, []);
  };

  module.Project = Project;                                           //REVIEW: Closing requirements for an IIFE statement where we are setting the module of our Project array to the window so that this entire section of code will run when it is referenced else where.
})(window);
